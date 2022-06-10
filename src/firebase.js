import firebase from "firebase"
const firebaseConfig = {
    apiKey: "AIzaSyBDg3XNcpNUx6fLDItbgrdKGDhrkV5U_88",
    authDomain: "drive-clone-59228.firebaseapp.com",
    projectId: "drive-clone-59228",
    storageBucket: "drive-clone-59228.appspot.com",
    messagingSenderId: "429772390458",
    appId: "1:429772390458:web:7082e09260faa2c601f503"
  };


  const firebaseApp=firebase.initializeApp(firebaseConfig);


  const db=firebaseApp.firestore();
  const storage=firebase.storage();
  const auth=firebase.auth();
  const provider=new firebase.auth.GoogleAuthProvider();

  export{ db,storage,auth,provider}