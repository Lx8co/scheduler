var functions = require('firebase-functions');
var admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Start writing Firebase Functions
// // https://firebase.google.com/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// })

exports.welcomeMessage = functions
                        .database
                        .ref('/users/{user}')
                        .onWrite(event => {
                            // Grab the current value of what was written to the Realtime Database.
                            console.log(event.params);
                            const user = event.data.val();
                            console.log(user);
                            // require the Twilio module and create a REST client 
                            var accountSid = 'AC34bd7907fd7bc9ad332bcc40170baf5c'; 
                            var authToken = '18e0c1970cd229ea657dac5007ff1509'; 
                            var client = require('twilio')(accountSid, authToken);
                            //send message
                            client.messages.create({ 
                                to: "+" + user.phone, 
                                from: "+15097742811", //my account number
                                body: "Hi, " + user.name + ". Welcome to the Lx8 Scheduler.", 
                            }, function(err, message) { 
                                if (err)
                                    console.error(err);

                                if (message)
                                    console.log(message); 
                            });

                            return event.data.ref//.parent.set(original);
                        });

/*
exports.sendMessage = functions
                        .database
                        .ref('/appointments/{appt')
                        .onWrite(event => {

                        });
*/