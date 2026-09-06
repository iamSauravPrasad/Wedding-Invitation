const SHEET_ID = "1NYuS9B2HJcXQQn6Jy1Tvu-Z9qTl3H_wr3e50_fZqvgs";
const SHEET_NAME = "Engagement";

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, sheet: SHEET_NAME }),
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(event) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);

  if (!sheet) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: "Engagement tab not found" }),
    ).setMimeType(ContentService.MimeType.JSON);
  }

  sheet.appendRow([
    new Date(),
    event.parameter.name || "",
    event.parameter.attendance || "",
  ]);

  return ContentService.createTextOutput(
    JSON.stringify({ ok: true }),
  ).setMimeType(ContentService.MimeType.JSON);
}
