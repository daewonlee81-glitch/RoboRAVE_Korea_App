const SPREADSHEET_ID = "PUT_YOUR_SPREADSHEET_ID_HERE";
const DEFAULT_SHEET_NAME = "RankingResults";

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || "{}");
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheetName = payload.sheetName || DEFAULT_SHEET_NAME;
    const sheet = spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);
    const rows = Array.isArray(payload.rows) ? payload.rows : [];

    if (rows.length === 0) {
      return jsonResponse({ ok: false, error: "No rows to save." });
    }

    ensureHeader(sheet);

    const values = rows.map((row) => [
      payload.app || "",
      row.generatedAt || payload.generatedAt || "",
      row.eventTitle || payload.eventTitle || "",
      Array.isArray(payload.judges) ? payload.judges.join(", ") : (row.judges || ""),
      payload.stageLabel || row.stageLabel || "",
      payload.recordTypeLabel || row.recordTypeLabel || "",
      payload.rankModeLabel || row.rankModeLabel || "",
      payload.tiePolicyLabel || row.tiePolicyLabel || "",
      payload.teamCount || "",
      payload.formatTitle || "",
      row.rowType || "",
      row.rowLabel || "",
      row.groupName || "",
      row.roundName || "",
      row.matchId || "",
      row.rank || "",
      row.status || "",
      row.teamName || row.teamA || "",
      row.teamB || "",
      row.round1Score ?? "",
      row.round1Time ?? "",
      row.round2Score ?? "",
      row.round2Time ?? "",
      row.primaryMetric ?? "",
      row.primaryMetricDisplay || "",
      row.result || "",
      row.winner || "",
      row.note || ""
    ]);

    sheet.getRange(sheet.getLastRow() + 1, 1, values.length, values[0].length).setValues(values);
    return jsonResponse({ ok: true, count: values.length, sheetName });
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error) });
  }
}

function ensureHeader(sheet) {
  if (sheet.getLastRow() > 0) {
    return;
  }

  sheet.appendRow([
    "app",
    "generatedAt",
    "eventTitle",
    "judges",
    "stageLabel",
    "recordTypeLabel",
    "rankModeLabel",
    "tiePolicyLabel",
    "teamCount",
    "formatTitle",
    "rowType",
    "rowLabel",
    "groupName",
    "roundName",
    "matchId",
    "rank",
    "status",
    "teamA_or_teamName",
    "teamB",
    "round1Score",
    "round1Time",
    "round2Score",
    "round2Time",
    "primaryMetric",
    "primaryMetricDisplay",
    "result",
    "winner",
    "note"
  ]);
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
