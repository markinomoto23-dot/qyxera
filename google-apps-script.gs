/**
 * QYXERA Inquiry Tracker — Google Apps Script
 */

const QYXERA_SPREADSHEET_ID =
  '1-QVOFLaZCr2toUDCYRJAz4WgrrdxZ8iYYtFg5dfi06E';

const QYXERA_SHEET_NAME = 'Inquiries';

const QYXERA_HEADERS = [
  'Date / Time',
  'Name',
  'Email',
  'Service',
  'Message',
  'Source Page',
  'Referrer',
  'Status'
];


function doPost(e) {
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);

    const payload = parseQyxeraPayload_(e);

    validateQyxeraPayload_(payload);

    // Connect directly to your QYXERA spreadsheet
    const spreadsheet =
      SpreadsheetApp.openById(QYXERA_SPREADSHEET_ID);

    let sheet =
      spreadsheet.getSheetByName(QYXERA_SHEET_NAME);

    // Automatically create Inquiries tab
    if (!sheet) {
      sheet =
        spreadsheet.insertSheet(QYXERA_SHEET_NAME);
    }

    prepareQyxeraSheet_(sheet);

    const submittedAt =
      payload.submittedAt
        ? new Date(payload.submittedAt)
        : new Date();

    sheet.appendRow([
      submittedAt,
      safeCell_(payload.name),
      safeCell_(payload.email),
      safeCell_(payload.service),
      safeCell_(payload.message),
      safeCell_(payload.sourcePage),
      safeCell_(payload.referrer || 'Direct'),
      'New'
    ]);

    const lastRow = sheet.getLastRow();

    sheet
      .getRange(lastRow, 1)
      .setNumberFormat('yyyy-mm-dd hh:mm:ss');

    return jsonResponse_({
      ok: true,
      row: lastRow,
      message: 'Inquiry saved successfully.'
    });

  } catch (error) {

    console.error(error);

    return jsonResponse_({
      ok: false,
      error: String(error.message || error)
    });

  } finally {

    try {
      lock.releaseLock();
    } catch (_) {}

  }
}


function doGet() {
  return jsonResponse_({
    ok: true,
    service: 'QYXERA Inquiry Tracker',
    message: 'Endpoint is active.'
  });
}


function parseQyxeraPayload_(e) {

  if (
    !e ||
    !e.postData ||
    !e.postData.contents
  ) {
    throw new Error(
      'No inquiry payload received.'
    );
  }

  try {

    return JSON.parse(
      e.postData.contents
    );

  } catch (_) {

    throw new Error(
      'Invalid inquiry payload.'
    );

  }
}


function validateQyxeraPayload_(payload) {

  if (
    !payload ||
    typeof payload !== 'object'
  ) {
    throw new Error(
      'Invalid inquiry data.'
    );
  }

  if (
    !String(payload.name || '').trim()
  ) {
    throw new Error(
      'Name is required.'
    );
  }

  const email =
    String(payload.email || '').trim();

  if (
    !email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    throw new Error(
      'A valid email is required.'
    );
  }

  if (
    !String(payload.message || '').trim()
  ) {
    throw new Error(
      'Message is required.'
    );
  }
}


function prepareQyxeraSheet_(sheet) {

  if (sheet.getLastRow() === 0) {

    sheet
      .getRange(
        1,
        1,
        1,
        QYXERA_HEADERS.length
      )
      .setValues([
        QYXERA_HEADERS
      ]);

    sheet.setFrozenRows(1);

    const header =
      sheet.getRange(
        1,
        1,
        1,
        QYXERA_HEADERS.length
      );

    header.setFontWeight('bold');

    sheet.setColumnWidth(1, 150);
    sheet.setColumnWidth(2, 180);
    sheet.setColumnWidth(3, 220);
    sheet.setColumnWidth(4, 210);
    sheet.setColumnWidth(5, 420);
    sheet.setColumnWidth(6, 260);
    sheet.setColumnWidth(7, 260);
    sheet.setColumnWidth(8, 100);
  }
}


function safeCell_(value) {

  let text =
    String(
      value == null ? '' : value
    ).trim();

  if (text.length > 10000) {
    text =
      text.slice(0, 10000);
  }

  // Prevent formula injection
  if (/^[=+\-@]/.test(text)) {
    text = "'" + text;
  }

  return text;
}


function jsonResponse_(data) {

  return ContentService
    .createTextOutput(
      JSON.stringify(data)
    )
    .setMimeType(
      ContentService.MimeType.JSON
    );
}