var alexa = require("alexa-app");
var alexaApp = new alexa.app("test");

var fallbackIntents = ['What was that?', 'Hmm. I am not sure about that.', 'Sorry. I am not sure about that.', 'I dont know that'];
YesIntent = false;
StartConvIntent = false;
askforQualification = false;
askForAspiration = false;
AspirationIntent = false;
SubjectsIntent = false;
PercentageIntent = false;
elaborateAstronautSkills = false;
askAboutSwimming = false;
askAboutSuperAdventureRides = false;
askABoutSpaceResearch = false;
askForOtherCourses = false;
askIfAnythingElse = false;

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
        askForAspiration = true;
        res.say("Good! Can you tell me your aspiration, like what do you want to become?").shouldEndSession(false);
        return res.send();
    }
    res.say(fallbackIntents[Math.floor(Math.random() * fallbackIntents.length)]).shouldEndSession(false);
});

alexaApp.intent('AspirationIntent', function (req, res) {
    if (askForAspiration) {
        AspirationIntent = true;
        res.say("Great! What subjects did you like the most as a kid?").shouldEndSession(false);
        return res.send();
    }
    res.say(fallbackIntents[Math.floor(Math.random() * fallbackIntents.length)]).shouldEndSession(false);
});

alexaApp.intent('SubjectsIntent', function (req, res) {
    if (AspirationIntent) {
        SubjectsIntent = true;
        res.say("That’s in line with an Astronaut. What’s your grade in bachelor of physics?").shouldEndSession(false);
        return res.send();
    }
    res.say(fallbackIntents[Math.floor(Math.random() * fallbackIntents.length)]).shouldEndSession(false);
});

alexaApp.intent('PercentageIntent', function (req, res) {
    if (SubjectsIntent) {
        PercentageIntent = true;
        elaborateAstronautSkills = true;
        res.say("Wow, A high distinction! I recommend that you pursue a Master in Astronomy and Astrophysics. BTW, do you know there are additional attributes that are mandatory to become an astronaut?").shouldEndSession(false);
        return res.send();
    }
    res.say(fallbackIntents[Math.floor(Math.random() * fallbackIntents.length)]).shouldEndSession(false);
});

alexaApp.intent('NotSureIntent', function (req, res) {
    if (elaborateAstronautSkills) {
        askAboutSwimming = true;
        res.say("Sure. Do you like swimming? Most part of your astronaut training is going to be under water.");
        return res.send();
    }
    res.say(fallbackIntents[Math.floor(Math.random() * fallbackIntents.length)]).shouldEndSession(false);
});

alexaApp.intent('SwimUnderwaterIntent', function (req, res) {
    if (askAboutSwimming) {
        askAboutSuperAdventureRides = true;
        res.say("How about riding a roller coaster or other super adventure rides?");
        return res.send();
    }
    res.say(fallbackIntents[Math.floor(Math.random() * fallbackIntents.length)]).shouldEndSession(false);
});

alexaApp.intent('HateIntent', function (req, res) {
    if (askAboutSuperAdventureRides) {
        askABoutSpaceResearch = true;
        res.say("Are you interested in observing and researching deep space?");
        return res.send();
    }
    res.say(fallbackIntents[Math.floor(Math.random() * fallbackIntents.length)]).shouldEndSession(false);
});

alexaApp.intent('LoveIntent', function (req, res) {
    if (askABoutSpaceResearch) {
        askForOtherCourses = true;
        res.say("Great! I think you may want to reconsider being an astronaut. You can still become a good scientist in space research by taking up Master in Astronomy and Astrophysics. Do you have a question?");
        return res.send();
    }
    res.say(fallbackIntents[Math.floor(Math.random() * fallbackIntents.length)]).shouldEndSession(false);
});

alexaApp.intent('LoveIntent', function (req, res) {
    if (askForOtherCourses) {
        askIfAnythingElse = true;
        res.say("This program opens you up to positions with space and defense companies like Lockheed Martin, Northrup Gruman, Boeing, and National Space Agencies. I’ve sent you more details to your email. Is there anything else you’d like to know?");
        return res.send();
    }
    res.say(fallbackIntents[Math.floor(Math.random() * fallbackIntents.length)]).shouldEndSession(false);
});

alexaApp.intent('ThankIntent', function (req, res) {
    YesIntent = false;
    StartConvIntent = false;
    askforQualification = false;
    askForAspiration = false;
    AspirationIntent = false;
    SubjectsIntent = false;
    PercentageIntent = false;
    elaborateAstronautSkills = false;
    askAboutSwimming = false;
    askAboutSuperAdventureRides = false;
    askABoutSpaceResearch = false;
    askForOtherCourses = false;
    askIfAnythingElse = false;

    if (askIfAnythingElse) {
        res.say("All the very best! See you soon in the classes");
        return res.send();
    }
    res.say(fallbackIntents[Math.floor(Math.random() * fallbackIntents.length)]).shouldEndSession(false);
});

module.exports = alexaApp;
