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
