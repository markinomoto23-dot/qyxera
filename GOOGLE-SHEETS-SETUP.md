# QYXERA Inquiry → Google Sheets Setup

The website has already been updated to **email each inquiry as before** and, once configured, **also add it to a Google Sheet**.

## What will be saved

Each inquiry becomes one row with these columns:

- Date / Time
- Name
- Email
- Service
- Message
- Source Page
- Referrer
- Status (`New` by default)

## One-time setup

1. Go to Google Sheets and create a new spreadsheet. A suggested name is **QYXERA Website Inquiries**.
2. In that spreadsheet, open **Extensions → Apps Script**.
3. Delete the default code in Apps Script.
4. Open the website file `google-apps-script.gs`, copy all of it, and paste it into Apps Script.
5. Click **Save**.
6. In Apps Script, click **Deploy → New deployment**.
7. Click the gear icon next to **Select type**, then choose **Web app**.
8. Use these settings:
   - **Execute as:** Me
   - **Who has access:** Anyone
9. Click **Deploy** and authorize the script when Google asks.
10. Copy the **Web app URL**. It should look similar to:

   `https://script.google.com/macros/s/XXXXXXXXXXXX/exec`

11. Open `google-sheets-config.js` in your QYXERA website and replace:

   `PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE`

   with your real `/exec` URL.
12. Save the file and redeploy the QYXERA website to Vercel.

## Test

1. Open the live QYXERA Contact page.
2. Send a test inquiry.
3. Confirm the normal inquiry email still arrives.
4. Open the Google Sheet.
5. A sheet tab named **Inquiries** should be created automatically and your test inquiry should appear as a new row.

## Important when editing the Apps Script later

If you change `google-apps-script.gs` after deployment, go back to **Deploy → Manage deployments → Edit**, choose **New version**, and deploy again. You can keep the same Web app URL.

## Existing email behavior

The existing EmailJS + FormSubmit fallback remains in place. Google Sheets logging is an additional record of the inquiry; it does not replace your email notification.
