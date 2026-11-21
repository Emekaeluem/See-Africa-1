# See Africa Calabar — direct checkout (Paystack TEST MODE)

This replaces the earlier proposed manual-approval flow for **eligible fixed-price** bookings. Admin approval is **not required** for these bookings. This is still a **Preview-only implementation** pending end-to-end testing. Previous instructions below describing mandatory admin approval are superseded by this section.

## Customer flow
1. Customer fills the booking form and checks package, travel dates, number of guests, email, transport and price.
2. Server saves the booking in Supabase. Eligible fixed-price bookings get `awaiting_payment`; variable supplier packages remain `awaiting_quote`.
3. Customer reviews the prefilled booking reference/email, checks the details-confirmation box and opens Paystack test checkout.
4. Paystack initialisation records a pending payment; an email marked pending is sent only when the email sender is configured.
5. On return, the site calls `/api/payments/verify?reference=...` and checks the transaction server-to-server. Success or definitive failure updates Supabase and sends the matching email; the signed Paystack success webhook independently verifies successful transactions.
6. Only a verified successful payment changes the booking to `confirmed`. Failed and pending attempts never do.

**Eligible for instant checkout:** packages `seat`, `stay`, `explore`, with Nigeria as travel origin, the standard 3-star hotel/shared room/two-night option and fixed-cost transport. **Not eligible:** `fly`, international origin, upgrades, extra nights, road pickup and all supplier-dependent quotations. This avoids charging a non-final flight or hotel price. Before going live, organisers must guarantee availability/capacity and approve pricing, package terms and refund policy for every instantly payable package.

## Critical one-time Supabase migration
Run `scripts/payment_notifications.sql` in the `see-africa-booking` SQL Editor. This creates a private, RLS-enabled `payment_notifications` table with unique payment/status notifications. Without it, emails cannot be deduplicated and may not send. No public grants or RLS policies.

## Transactional email setup (required for real notifications)
1. Set up a sending service at Resend and verify a domain controlled by the organiser.
2. In the **same Vercel project as the booking Preview**, add:
   - `RESEND_API_KEY` as a secret (not committed to GitHub)
   - `EMAIL_FROM_ADDRESS` as the verified sender address, e.g. `bookings@your-verified-domain.example`
3. Add both to Preview, redeploy Preview and test the three email types. Production requires distinct approved keys and formal go-live review.
4. The app sends a **pending** email at checkout initiation (meaning *not paid*), a **success** email only after Paystack server-side verification, and a **failed** email only when Paystack confirms definitive failure/abandonment at verification.
5. Paystack's standard transaction webhooks primarily report successes. A failure after someone closes their browser may not be detected until they revisit/return for verification. Add a scheduled reconciliation job to regularly check outstanding pending transactions before promising automatic failure/pending follow-up for users who never return. Delivery also depends on the verified sending domain and provider configuration.

## Paystack webhook
After a fresh Preview deployment and successful endpoint test, register its absolute `/api/paystack/webhook` URL as a **test** webhook without replacing an existing unrelated webhook. Confirm HMAC signature verification and idempotent delivery. Do not enable live keys or payments until all success, failure, pending, retry and duplicate-callback tests pass.

## Testing requirements before merging
- Run SQL migration.
- Set Resend variables and verify the sender domain.
- Submit an eligible fixed-price booking; confirm it saves as `awaiting_payment`.
- Check details and initiate Paystack test checkout.
- Verify pending email and payment record.
- Run success test: Paystack verification, Supabase status, email exactly once, signed webhook processing.
- Run fail/cancel test: failure status and email only when definitively verified.
- Test quote-only selection blocks checkout.
- Confirm repeated return/webhook doesn't send duplicate emails.
- Confirm capacity controls, refund terms, privacy policy, rate limiting/spam controls, email failure monitoring and post-checkout customer support.
- Keep all code on PR #2 and use Preview until verified.

---

# Calabar bookings — staged test integration

This branch is a **test-mode implementation**, not a live payment launch.

## Included
- `POST /api/bookings`: validates the existing form, computes an indicative total on the server, stores a customer and booking in Supabase with `pending` or `awaiting_quote` status, and returns a booking reference.
- `POST /api/payments/initialize`: only starts Paystack checkout for a booking that staff have explicitly changed to `awaiting_payment`. Requires the original customer email and uses the stored, staff-approved amount.
- `POST /api/paystack/webhook`: checks Paystack HMAC SHA-512 signature and verifies the transaction with Paystack before marking payment success and booking confirmation.
- `calabar.js`: sends form enquiries to the backend and shows the booking reference, retaining the existing website design and estimate display.

## Required Vercel settings (server-side only)
- `SUPABASE_URL`
- `SUPABASE_SECRET_KEY` (new `sb_secret_...`, **never** in frontend)
- `PAYSTACK_SECRET_KEY` (`sk_test_...` only)

Set up the environment variables before deploying. Redeploy after modifying environment variables.

## Before processing any actual payment
1. Confirm the exact agreed prices, inclusions, capacity, refund policy and availability with the See Africa/Okhma team.
2. Build the staff-only approval process that moves a specific booking from pending/awaiting_quote to `awaiting_payment` and sets an approved amount in kobo. Never allow public users to set this status or amount.
3. Test a complete Paystack transaction, webhook signature processing, repeat notifications, amount mismatch rejection, failed payments, supplier availability and customer receipt delivery in a Preview environment.
4. Configure a **new** dedicated **test-mode** Paystack webhook to `https://see-africa-1.vercel.app/api/paystack/webhook` **only after this endpoint has been deployed and verified**; do not replace another application's existing webhook.
5. Build notification emails, booking management, refunds/cancellation processing and automated expiry before accepting paid reservations at scale.
6. Ensure RLS is enabled on customers, bookings and payments. Confirm no anon/authenticated policy exposes customer data. A secret key is only held by server code.
7. Add anti-spam and rate-limiting controls for the public enquiry endpoint.

The public UI deliberately **does not start checkout automatically**; it saves an enquiry. The payment API is staged for approved bookings, and needs an operator-approved flow before use.

## Database
Requires the three tables previously created via SQL Editor: `customers`, `bookings`, `payments`, and their listed columns. There is currently no `email_sent` or tickets inventory system.

## Important
Do not mark the site as accepting confirmed bookings until the end-to-end test succeeds and business approval is given.

## Admin approval workflow (manual first; no public admin endpoint)
1. Staff reviews the enquiry in Supabase Table Editor: `customers` and `bookings`.
2. Confirm availability, package inclusions, supplier quotes, refund conditions, guest count and correct amount with the organiser. Do not approve just because the page calculated an estimate.
3. In Supabase Table Editor, find the exact `booking_reference`, correct `total_amount_kobo` if the approved price differs (e.g. ₦150,000 = 15,000,000 kobo), and change `booking_status` to `awaiting_payment`. Do not modify other bookings.
4. Send the customer their exact booking reference and the Preview checkout URL. Customer enters the *same email address* used on the enquiry, then presses Proceed to Paystack.
5. A booking that remains `pending` or `awaiting_quote` **cannot** start checkout; payment initiation returns HTTP 409. Do not approve travel packages until suppliers have confirmed availability.
6. For test transactions only, add a dedicated Paystack **test** webhook that targets the **deployed Preview** hostname `/api/paystack/webhook`, and verify it is being called successfully before running a test charge. The existing legacy webhook may belong to another app; never overwrite it.
7. Verify in Supabase: after a successful, verified webhook the `payments.payment_status` should be `success` and `bookings.booking_status` should be `confirmed`. Check failed, declined, pending, retry, and duplicate webhook cases too.

**Important:** An admin dashboard with authenticated staff accounts, audit trails, price-approval records, transaction reconciliation, and booking confirmations must be added before production acceptance of real payments. Supabase Table Editor is an interim internal approval tool only. Do not expose the Supabase secret or the service-role credentials to browsers.

## Checkout UI on Preview
The `calabar.html` booking summary includes an "Already approved to pay?" form. This doesn't charge anybody when the enquiry is first submitted. Staff must explicitly approve a specific reservation before any Paystack checkout can be initiated.
