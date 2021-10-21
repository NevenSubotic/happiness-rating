/**
 * Whenever a new Version needs to be deployed
 * 1. Deploy > Manage Deployments > Click on the pen > Create new Version (of existing Deployment)
 * 2. Add the descriptions for the new version and publish it
 * 3. Users may need to refresh to see the Changes
 * 
 * In other cases (not sure when), a total new deployment can be created
 * but then it needs to be manually added to the GCP Project
 * 2. Go to the GCP Project -> Workspace SDK -> App Configuration and insert the Deployment Id
 */


/**
 * Callback for rendering the homepage card.
 * @return {CardService.Card} The card to show to the user.
 */
function onHomepage(e) {
  const message = 'This is the HostApp: ' + e.hostApp;
  return createCatCard(message, true);
}


/**
* Displays message speficic contextual Card
* @param {Object} Event - Contains Gmail Message specific information
* @return {Object} GmailCard - Contextual-Card with a pre-filled Form 
*/
function onGmailMessage(e){
  GmailApp.setCurrentMessageAccessToken(e.gmail.accessToken);
  const message = GmailApp.getMessageById(e.gmail.messageId);
  
  const email = {
    body: message.getPlainBody(),
    subject: message.getThread().getFirstMessageSubject(),
    date : message.getDate().toISOString().substr(0,10)   
  }
  
  return createGmailCard(email);
}

/**
* When Form is submitted, values are loged to the Sheet
*/
function logToSheet(e){
  // Grab this from the URL of the Spreadsheet File
  const TARGET_SHEET_ID = "1MLkyIc3Kd7EFZAV-yxiuSPO95HiWwm-8TTs9gmgAj08";
  // Set this to the name of the specific Sheet
  const SHEET_NAME = "Feedback";
  const targetSheet = SpreadsheetApp.openById(TARGET_SHEET_ID).getSheetByName(SHEET_NAME);

  // console.log(e.formInput);
  const form = e.formInput;
  const feedback = form.feedback || "";
  const subject = form.subject || "";
  const body = form.body || "";
  const msgId = e.messageMetadata.messageId || "";
  const type = form.type || "";
  const threadId = e.messageMetadata.threadId || "";
  const date = form.date ? form.date : new Date().toISOString().substr(0,10);
  
  const output = [];
  output.push( date, feedback, type, subject, body, threadId );
  targetSheet.appendRow(output);
}

/**
* Displays Feedback-Form and populates with given Email
* @param {Object} Email - Contains email data (subject, body, date)
* @return {Object} Card - Feedback-Form
*/
function createGmailCard(email){
  email = email ? email : {subject:"test", body:"testMessage", date:"2018-02-02"};
  const subjectInput = CardService.newTextInput().setTitle("Subject").setFieldName("subject").setMultiline(true).setValue(email.subject);
  const textInput = CardService.newTextInput().setTitle("Nachricht").setFieldName("body").setMultiline(true).setValue(email.body.substr(0,300));
  const dateInput = CardService.newTextInput().setTitle("Date").setFieldName("date").setMultiline(false).setValue(email.date);
  const feedbackInput = CardService.newSelectionInput().setType(CardService.SelectionInputType.RADIO_BUTTON)
    .setTitle("Feedback")
    .setFieldName("feedback")
      .addItem("Positiv", "Positive", false)
      .addItem("Neutral", "Neutral", false)
      .addItem("Negativ", "Negative", false);

  const typeInput = CardService.newSelectionInput().setType(CardService.SelectionInputType.RADIO_BUTTON)
    .setTitle("Rubrik")
    .setFieldName("type")
      .addItem("Allgemein", "General", true)
      .addItem("Service", "Service", false)
      .addItem("Informationsbereitstellung", "Information", false)
      .addItem("Marketing / Newsletter", "Marketing", false)
      .addItem("Transparenz", "Transparency", false)
      .addItem("Sonstiges", "etc…", false);
    
  const saveAction = CardService.newAction().setFunctionName("logToSheet");
  const saveBtn = CardService.newTextButton().setText("Save").setTextButtonStyle(CardService.TextButtonStyle.FILLED).setOnClickAction(saveAction);
   
   const section = CardService.newCardSection()
     .addWidget( subjectInput )
     .addWidget( textInput )
     .addWidget( dateInput )
     .addWidget( typeInput )
     .addWidget( feedbackInput );
   const footer = CardService.newFixedFooter().setPrimaryButton(saveBtn);
   const card = CardService.newCardBuilder().addSection(section).setName("Feedback").setFixedFooter(footer);
   
   return card.build()
}