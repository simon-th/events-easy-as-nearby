import app from 'firebase/app';
import 'firebase/auth';
import apiKeys from '../../api-keys.json';

const config = {
    apiKey: apiKeys.firebaseAPI,
    authDomain: apiKeys.authDomain,
    databaseURL: apiKeys.databaseURL,
    projectId: apiKeys.projectId,
    storageBucket: apiKeys.storageBucket,
    messagingSenderId: apiKeys.messagingSenderId,
    appId: apiKeys.appId,
    measurementId: apiKeys.measurementId
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);
}

export default Firebase;
