import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'

const app = firebase.initializeApp({
    apiKey: "AIzaSyATXnG-0-CXzmQCUB46B_rpTHt-YC9c2Uo",
    authDomain: "todoapp-ca23f.firebaseapp.com",
    databaseURL: "https://todoapp-ca23f-default-rtdb.firebaseio.com",
    projectId: "todoapp-ca23f",
    storageBucket: "todoapp-ca23f.appspot.com",
    messagingSenderId: "429722728213",
    appId: "1:429722728213:web:179a90752247cefa929b1c",
    measurementId: "G-CL1R6MCPQJ"
})

const storage = app.storage()

export { storage }