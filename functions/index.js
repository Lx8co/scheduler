var functions = require('firebase-functions');
var admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
var db = admin.database(); // Get a database reference to our posts

// TWILIO SETTINGS
var accountSid = 'AC34bd7907fd7bc9ad332bcc40170baf5c'; 
var authToken = '18e0c1970cd229ea657dac5007ff1509'; 
var client = require('twilio')(accountSid, authToken);

exports.welcomeMessage = functions
                        .database
                        .ref('/users/{user}')
                        .onWrite(event => {
                            // Grab the current value of what was written to the Realtime Database.
                            
                            const user = event.data.val();
                            

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

exports.confirmAppointment = functions
                            .database
                            .ref('/appointments/{appt}')
                            .onWrite(event => {
                                const appt = event.data.val();
                                var user;

                                console.log("APPOINTMENT: ", appt);
                                var ref = db.ref("users/");
                                ref.off();

                                var findUser = function (data) {
                                    var name = appt.name;
                                    var val = data.val();
                                    console.log("VALUE: ", val);

                                    var user = val[appt.name].phone;
                                    console.log("USER: ", user);
                                    sendMessage(user); //user = phone #
                                    
                                }

                                ref.on('value', findUser);
                                


                                //send message
                                function sendMessage (phone) {
                                    client.messages.create({ 
                                        to: "+" + phone, 
                                        from: "+15097742811", //my account number
                                        body: "Hi, " + appt.name + ". Your appointment is confirmed.", 
                                    }, function(err, message) { 
                                        if (err)
                                            console.error(err);

                                        if (message)
                                            console.log(message); 
                                    });
                                }


                                return event.data.ref//.parent.set(original);

                            });

/*
exports.sendMessage = functions
                        .database
                        .ref('/appointments/{appt')
                        .onWrite(event => {

                        });
*/