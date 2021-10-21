# happines-rating
Workspace AddOn for Google which allows for easy collection of Supporter Feedback.

### Setup
1. Create a Spreadsheet, take note its Id
1. Create a Sheet within that Spreadsheet, note its name
1. Create a Apps Script Project
1. Paste Code.js your Apps Script Project
    1. Set the `TARGET_SHEET_ID` to your note from **step 1**
    1. Set the `SHEET_NAME` to your note from **step 2**
1. Paste and Modify appsscript.json (the manifest file) into your appsscript.json 
    1. Change the `name`
    1. Change the `logoUrl`
    1. Change the `openLink` to **step 1**
    1. Change colors if you like

In regard to 5: You may need to go to the gear icon (settings) in your Apps Script Project > Show "appsscript.json" manifest file in editor to see this file.

###  Publishing a Workspace AddOn
[See this link for the official resource](https://developers.google.com/apps-script/add-ons/how-tos/publish-add-on-overview)

1. Create a new Project on [GCP](https://console.cloud.google.com/), note its `Id` (Project Number)
1. Enter the `Id` into the Apps Script Project > Gear Icon (Settings) > GCP Project
1. In the GCP, go to `Marketplace`and search for `Google Workspace Marketplace SDK`. Enable it. Manage it.
1. Click on `App Configuratio`
    1. Enable `Google Workspace AddOn`
    1. Enable `Deploy using Apps Script deployment Id`
    1. If you have a deployment, use its `Id` otherwise create a new deployment first in the Apps Script Project and enter it here
1. Scroll down to `oAuthScopes`and copy the values in there from the `appsscript.json`
1. Scroll down and add the Developer Links
1. Click on the `Store Listings` menu item (in the Google Workspace Marketplace SDK) and fill it out. This part sucks, but you only have to do it once.
1. Save and celebrate (I hope, otherwise troubleshoot until you go cray)
