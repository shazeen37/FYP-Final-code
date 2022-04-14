const path = require('path');
const readline = require('readline');
const GoogleAssistant = require('google-assistant');
global.globalString = "This can be accessed anywhere!";
const config = {
    auth: {
        keyFilePath: path.resolve(__dirname, './client_secret_10075981362-tknddt7nn50fs7ep4nij4vjr7veutb5p.apps.googleusercontent.com.json'),
        savedTokensPath: path.resolve(__dirname, './tokens.json'), // where you want the tokens to be saved
       // oauth2Client: "Web client 2"
      },
      conversation: {
        lang: 'en-US', // defaults to en-US, but try other ones, it's fun!
        showDebugInfo: false, // default is false, bug good for testing AoG things
      },
 
};

const assistant = new GoogleAssistant(config.auth);

// starts a new conversation with the assistant
const startConversation = (conversation) => {
  // setup the conversation and send data to it
  // for a full example, see `examples/mic-speaker.js`
globalString = "Check me out now";
  conversation
    .on('response', text =>{
        globalString = text;
    console.log(globalString)
    conversation.end();
    return
})
    .on('debug-info', info => console.log('Debug Info:', info))
    // if we've requested a volume level change, get the percentage of the new level
    .on('volume-percent', percent => console.log('New Volume Percent:', percent))
    // the device needs to complete an action
    .on('device-action', action => console.log('Device Action:', action))
    // once the conversation is ended, see if we need to follow up
    .on('ended', (error, continueConversation) => {
      if (error) {
        console.log('Conversation Ended Error:', error);
      } else if (continueConversation) {
        conversation.end();
      } else {
        console.log('Conversation Complete');
        conversation.end();
      }
    })
    // catch any errors
    .on('error', (error) => {
      console.log('Conversation Error:', error);
    });
};


function Assist(text){
    var promptForInput = function () {

    // type what you want to ask the assistant

  
   
      config.conversation.textQuery = text;
      assistant.start(config.conversation, startConversation);
  
    
  };
  
    assistant
      .on('ready', promptForInput)
      .on('error', (error) => {
        console.log('Assistant Error:', error);
      });

console.log(globalString)
      return globalString
    }


    module.exports = Assist;
    exports.globalString = this.globalString;