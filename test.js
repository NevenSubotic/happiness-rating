function logToSheet_TEST() {
  const input = {
    formInput: {
      feedback : "positive",
      subject : "test subject",
      body : "test body",
      type : "test type"
    },
    messageMetadata: {
      messageId : "test message id",
      threadId : "test thread id"
    }
  };

  logToSheet(input);
  
}
