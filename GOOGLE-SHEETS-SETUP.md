# QYXERA Inquiry → Google Sheets Setup

The QYXERA Contact Form sends inquiries through the existing
email system and also saves each inquiry to Google Sheets.

## Google Sheet

Spreadsheet:
QYXERA Website Inquiries

Spreadsheet ID:

1-QVOFLaZCr2toUDCYRJAz4WgrrdxZ8iYYtFg5dfi06E

The Apps Script uses this Spreadsheet ID directly.

## Data saved

Each inquiry becomes a new row containing:

- Date / Time
- Name
- Email
- Service
- Message
- Source Page
- Referrer
- Status

Default status:

New

## Apps Script

The Apps Script should contain:

const QYXERA_SPREADSHEET_ID =
  '1-QVOFLaZCr2toUDCYRJAz4WgrrdxZ8iYYtFg5dfi06E';

const QYXERA_SHEET_NAME = 'Inquiries';

The script automatically creates the Inquiries tab if it
does not already exist.

## Web App Deployment

Deploy the Apps Script using:

Execute as:
Me

Who has access:
Anyone

Current Web App URL:

https://script.google.com/macros/s/AKfycbxHjrcSRTobEp544VTqRhjIe79guQyWthbofp6YrE1YmHXm2sbU8_xfZgC4ZL2bC4FDOg/exec

## Website Configuration

In google-sheets-config.js:

window.QYXERA_SHEETS = {
  webAppUrl:
    'https://script.google.com/macros/s/AKfycbxHjrcSRTobEp544VTqRhjIe79guQyWthbofp6YrE1YmHXm2sbU8_xfZgC4ZL2bC4FDOg/exec'
};

## Inquiry Flow

Customer submits Contact Form
        ↓
Email notification
        +
Google Apps Script
        ↓
QYXERA Website Inquiries
        ↓
Inquiries tab
        ↓
New row added

## Testing

1. Open the QYXERA Contact page.
2. Submit a test inquiry.
3. Confirm the normal inquiry email arrives.
4. Open QYXERA Website Inquiries.
5. Open the Inquiries tab.
6. Confirm the test submission appears as a new row.

## Updating Apps Script

Whenever the Apps Script code is changed:

Deploy
→ Manage deployments
→ Edit
→ Version: New version
→ Deploy

The existing Web App URL can remain the same when updating
the existing deployment.