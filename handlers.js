var alexa = require("alexa-app");
var alexaApp = new alexa.app("test");
var Speech = require('ssml-builder');

var fallbackIntents = ['What was that?', 'Hmm. I am not sure about that.', 'Sorry. I am not sure about that.', 'I dont know that'];
askforQualification = false;
askForAspiration = false;
AspirationIntent = false;
PercentageIntent = false;
EnquireCourseIntent = false;
askForGrade = false;
askCourseOptions = false;

alexaApp.error = function (exception, req, res) {
    console.log("inside error handler");
    res.say("Sorry, something bad happened").shouldEndSession(false);
};

alexaApp.intent("AMAZON.HelpIntent", function (request, response) {
    console.log("Inside AMAZON.HelpIntent");
    var speech = new Speech();
    speech.sentence("You can ask me questions like");
    speech.prosody({ pitch: 'medium' }, 'What courses can you offer me').say("or");
    speech.prosody({ pitch: 'medium' }, 'What are the pre-requisites to enroll for a courses');
    speech.sentence("You can also say stop or exit to quit");
    var speechOutput = speech.ssml(true);
    var reprompt = "What would you like to do?";
    response.say(speechOutput).reprompt(reprompt).shouldEndSession(false);
});

alexaApp.intent("AMAZON.FallbackIntent", function (req, res) {
    console.log("AMAZON.FallbackIntent");
    res.say(fallbackIntents[Math.floor(Math.random() * fallbackIntents.length)]).shouldEndSession(false);
});

alexaApp.intent("AMAZON.StopIntent", function (request, response) {
    console.log("Inside AMAZON.StopIntent");
    var stopOutput = "Don't You Worry. I'll be back.";
    response.say(stopOutput);
});

alexaApp.intent("AMAZON.CancelIntent", function (request, response) {
    console.log("Inside AMAZON.CancelIntent");
    var cancelOutput = "No problem. Request cancelled.";
    response.say(cancelOutput);
});

alexaApp.launch(function (req, res) {
    console.log("App launched");
    var speech = new Speech();
    speech.say("Hey there").pause("500ms").say('I am Uni, your course adviser in U.W.W University').pause('500ms');
    speech.sentence("You can ask me questions like");
    speech.prosody({ pitch: 'medium' }, 'What courses can you offer me').say("or");
    speech.prosody({ pitch: 'medium' }, 'What are the pre-requisites to enroll for a courses')
    var speechOutput = speech.ssml(true);
    res.say(speechOutput).shouldEndSession(false);
});

alexaApp.intent('EnquireCourseIntent', function (req, res) {
    console.log("Inside EnquireCourseIntent");
    EnquireCourseIntent = true;
    askforQualification = true;
    res.say("Sure. What is your qualification?").shouldEndSession(false);
    return res.send();
    res.say(fallbackIntents[Math.floor(Math.random() * fallbackIntents.length)]).shouldEndSession(false);
});

alexaApp.intent('QualificationIntent', function (req, res) {
    console.log("Inside QualificationIntent");
    if (askforQualification) {
        askForAspiration = true;
        var speech = new Speech();
        speech.prosody({ pitch: 'loud' }, 'Good').sentence("Can you tell me your aspiration");
        speech.sentence("like what do you want to become");
        speech.prosody({ rate: 'fast' }, 'For example A doctor a computer scientist');
        var speechOutput = speech.ssml(true);
        res.say(speechOutput).shouldEndSession(false);
        return res.send();
    }
    res.say(fallbackIntents[Math.floor(Math.random() * fallbackIntents.length)]).shouldEndSession(false);
});

alexaApp.intent('AspirationIntent', function (req, res) {
    console.log("Inside AspirationIntent");
    if (askForAspiration) {
        askForGrade = true;
        res.say("What is your grade in bachelor of physics").shouldEndSession(false);
        return res.send();
    }
    res.say(fallbackIntents[Math.floor(Math.random() * fallbackIntents.length)]).shouldEndSession(false);
});

alexaApp.intent('PercentageIntent', function (req, res) {
    console.log("Inside PercentageIntent");
    console.log("Slots", req.slots);
    PercentageIntent = true;
    if (askForGrade) {
        askCourseOptions = true;
        var speech = new Speech();
        speech.prosody({ pitch: 'loud' }, 'Wow').prosody({ pitch: 'loud' }, "a high distinction");
        speech.sentence("I recommend that you pursue the following courses").pause('500ms');
        speech.emphasis('moderate', 'Master in Astronomy').say("and");
        speech.emphasis('moderate', 'Astrophysics');
        speech.prosody({ rate: 'fast' }, "Do you like to know the prerequites or career options for this course");
        var speechOutput = speech.ssml(true);
        res.say(speechOutput).shouldEndSession(false);
        return res.send();
    }
    res.say(fallbackIntents[Math.floor(Math.random() * fallbackIntents.length)]).shouldEndSession(false);
});

alexaApp.intent("CareerOptionIntent", function (req, res) {
    console.log("Inside CareerOptionIntent");
    if (askForGrade) {
        var speech = new Speech();
        speech.prosody({ rate: 'fast' }, "This program opens you up to positions with space and defense companies like Lockheed Martin, Northrup Gruman, Boeing, and National Space Agencies");
        speech.sentence("I have sent you more details to your emai");
        speech.prosody({ rate: 'fast' }, " Do you want to know about the pre-requisites of the course");
        var speechOutput = speech.ssml(true);
        res.say(speechOutput).shouldEndSession(false);
        return res.send();
    }
    res.say(fallbackIntents[Math.floor(Math.random() * fallbackIntents.length)]).shouldEndSession(false);
});

alexaApp.intent('ThankIntent', function (req, res) {
    clearContext();
    console.log("Inside ThankIntent");
    res.say("All the very best! See you soon in the classes").shouldEndSession(true);
    return res.send();
});

function clearContext() {
    askforQualification = false;
    askForAspiration = false;
    AspirationIntent = false;
    PercentageIntent = false;
    EnquireCourseIntent = false;
    askForGrade = false;
    askCourseOptions = false;
}

module.exports = alexaApp;
