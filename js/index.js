function scheduler () {
    this.checkSetup();

    // Shortcuts to DOM Elements.
    //this.submitButton = document.getElementById('submit');
    this.signInButton = document.getElementById('sign-in');
    this.signOutButton = document.getElementById('sign-out');

    this.addUserForm = document.getElementById('addUser');
    this.addApptForm = document.getElementById('addAppt');
    //this.saveTaskButton = document.getElementById('saveTask');

    // Saves message on form submit.
    this.addUserForm.addEventListener('submit', this.addUser.bind(this));
    this.addApptForm.addEventListener('submit', this.addAppt.bind(this));
    this.signOutButton.addEventListener('click', this.signOut.bind(this));
    this.signInButton.addEventListener('click', this.signIn.bind(this));
    
    this.initFirebase();
}

// Sets up shortcuts to Firebase features and initiate firebase auth.
scheduler.prototype.initFirebase = function() {
    this.auth = firebase.auth();
    this.database = firebase.database();
    this.storage = firebase.storage();
    this.storageRef = this.storage.ref();
    this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this)); // Initiates Firebase auth and listen to auth state changes.
};

// Signs-in Friendly Chat.
scheduler.prototype.signIn = function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    this.auth.signInWithPopup(provider);
};

scheduler.prototype.signInFB = function () {
    var provider = new firebase.auth.FacebookAuthProvider();
    this.auth.signInWithPopup(provider);
}

// Signs-out of Friendly Chat.
scheduler.prototype.signOut = function() {
    console.log("signout");
    this.auth.signOut();
};

// Triggers when the auth state change for instance when the user signs-in or signs-out.
scheduler.prototype.onAuthStateChanged = function(user) {
  if (user) { // User is signed in!
    // Get profile pic and user's name from the Firebase user object.
    //var profilePicUrl = user.photoUrl;
    //var userName = user.displayName;

    // Set the user's profile pic and name.
    //this.userPic.style.backgroundImage = 'url(' + profilePicUrl + ')';
    //this.userName.textContent = userName;

    // Show user's profile and sign-out button.
    //this.userName.removeAttribute('hidden');
    //this.userPic.removeAttribute('hidden');
    this.signOutButton.removeAttribute('hidden');
    this.signInButton.setAttribute('hidden', 'true');
    
    // We save the Firebase Messaging Device token and enable notifications.
    
  } else { // User is signed out!
    console.log('authStateChanged');
    console.log(user)
    this.signOutButton.setAttribute('hidden', 'true');
    this.signInButton.removeAttribute('hidden');
  }
};

// Checks that the Firebase SDK has been correctly setup and configured.
scheduler.prototype.checkSetup = function() {
  if (!window.firebase || !(firebase.app instanceof Function) || !window.config) {
    window.alert('You have not configured and imported the Firebase SDK. ' +
        'Make sure you go through the codelab setup instructions.');
  } else if (config.storageBucket === '') {
    window.alert('Your Cloud Storage bucket has not been enabled. Sorry about that. This is ' +
        'actually a Firebase bug that occurs rarely. ' +
        'Please go and re-generate the Firebase initialisation snippet (step 4 of the codelab) ' +
        'and make sure the storageBucket attribute is not empty. ' +
        'You may also need to visit the Storage tab and paste the name of your bucket which is ' +
        'displayed there.');
  }
};

scheduler.prototype.addUser = function (e) {
    if (e)
        e.preventDefault();

    var name = e.target[0].value,
        email = e.target[1].value,
        password = e.target[3].value,
        phone = e.target[2].value

    var user = {
        name,
        email,
        password,
        phone
    };

    this.database.ref('users/' + name).set({
        name: user.name,
        email: user.email,
        password: user.password,
        phone: user.phone
    });

    $('#modal1').modal('close');

    console.log('form submit');
    console.log(e);
    console.log(e.target[0].value)
    console.log(e.target[1].value)
    console.log(e.target[2].value)
};

scheduler.prototype.addAppt = function (e) {
    if (e)
        e.preventDefault();

    var name = e.target[0].value,
        date = e.target[1].value;

    var appointment = {
        name,
        date
    };

    this.database.ref('appointments/' + name).set({
        name: appointment.name,
        appointment: appointment.date
    });

    $('#modal2').modal('close');
};

scheduler.prototype.updateTodo = function (todo) {
    console.log('update')
    console.log(todo)
    let id = (todo.name + todo.dueDate).replace(/\//g, '');

    this.database.ref('todos/' + id).update(todo);
};


window.onload = function() {
  window.scheduler = new scheduler();
};