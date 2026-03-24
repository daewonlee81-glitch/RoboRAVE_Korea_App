# Google Sheet Save Setup

1. Create a Google Sheet.
2. Open [Apps Script](https://script.google.com/).
3. Create a new script project and paste the contents of `google-apps-script-sheet-save.gs`.
4. Replace `PUT_YOUR_SPREADSHEET_ID_HERE` with your Google Sheet ID.
5. Deploy the script as a Web App.
6. Set `Execute as` to your account and choose an access level that matches your event.
7. Copy the deployed `/exec` URL.
8. Open `ranking.html` or `bracket.html`, paste the URL into `Apps Script Web App URL`, click `저장 URL 기억`, then click `Google Sheet로 저장`.

The app stores the Apps Script URL in browser local storage so you only need to paste it once per browser.
