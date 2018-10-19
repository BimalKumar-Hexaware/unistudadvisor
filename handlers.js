var alexa = require("alexa-app");
var alexaApp = new alexa.app("test");

alexaApp.launch(function (req, res) {
    res.say("Hey there, I’m Uni, your course adviser in Monash University. You can ask your questions like, What courses can you offer me?").shouldEndSession(false);
});

alexaApp.intent('StartConvIntent', function (req, res) {
    res.say("You mean, the courses available for you to join?").shouldEndSession(false);
});

module.exports = alexaApp;