var alexa = require("alexa-app");
var alexaApp = new alexa.app("test");

var fallbackIntents = ['What was that?', 'Hmm. I am not sure about that.', 'Sorry. I am not sure about that.', 'I dont know that'];
YesIntent = false;
StartConvIntent = false;
askforQualification = false;
askForAge = false;
askForAspiration = false;

alexaApp.launch(function (req, res) {
    res.say("Hey there, I’m Uni, your course adviser in Monash University. You can ask your questions like, What courses can you offer me?").shouldEndSession(false);
});

alexaApp.intent('StartConvIntent', function (req, res) {
    StartConvIntent = true;
    res.say("You mean, the courses available for you to join?").shouldEndSession(false);
});

alexaApp.intent('YesIntent', function (req, res) {
    if (StartConvIntent) {
        askforQualification = true;
        res.say("Sure. What is your qualification?").shouldEndSession(false);
        return res.send();
    }
    res.say(fallbackIntents[Math.floor(Math.random() * fallbackIntents.length)]).shouldEndSession(false);
});

alexaApp.intent('QualificationIntent', function (req, res) {
    if (askforQualification) {
        askForAge = true;
        res.say("Good! How old are you, may I know? Trust me! I will forget it!").shouldEndSession(false);
        return res.send();
    }
    res.say(fallbackIntents[Math.floor(Math.random() * fallbackIntents.length)]).shouldEndSession(false);
});

alexaApp.intent('AgeIntent', function (req, res) {
    if (askForAge) {
        askForAspiration = true;
        res.say("Your age is eligible for a masters. Can you tell me your aspiration?").shouldEndSession(false);
        return res.send();
    }
    res.say(fallbackIntents[Math.floor(Math.random() * fallbackIntents.length)]).shouldEndSession(false);
});

alexaApp.intent('NotSureIntent', function (req, res) {
    if (askForAspiration) {
        res.say("What is that you want to become?").shouldEndSession(false);
        return res.send();
    }
    res.say(fallbackIntents[Math.floor(Math.random() * fallbackIntents.length)]).shouldEndSession(false);
});

alexaApp.intent('AspirationIntent', function (req, res) {
    if (askForAspiration) {
        res.say("Great! What subjects did you like the most as a kid?").shouldEndSession(false);
        return res.send();
    }
    res.say(fallbackIntents[Math.floor(Math.random() * fallbackIntents.length)]).shouldEndSession(false);
});

module.exports = alexaApp;