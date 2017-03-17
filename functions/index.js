var functions = require('firebase-functions');
var admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Start writing Firebase Functions
// // https://firebase.google.com/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// })

exports.addAccount = functions
                        .database
                        .ref('/users/{user}')
                        .onWrite(event => {
                            // Grab the current value of what was written to the Realtime Database.
                            console.log(event.params);
                                
                            return event.data.ref//.parent.set(original);
                        });

exports.sendMessage = functions
                        .database
                        .ref('')