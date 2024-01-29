import { getDatabase } from "firebase/database";
import { getApps, initializeApp, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: String("AIzaSyB3RrHPok4NzoDs_toscHBHQjWlen80OhE"),
  authDomain: String("andromeda-dev-e7193.firebaseapp.com"),
  databaseURL: String("https://andromeda-dev-e7193-default-rtdb.europe-west1.firebasedatabase.app"),
  projectId: String("andromeda-dev-e7193"),
  storageBucket: String("andromeda-dev-e7193.appspot.com"),
  messagingSenderId: String("1006764802246"),
  appId: String("1:1006764802246:web:d0fb14bce811da5939d7c7"),
  measurementId: String("G-GCC4GS586T")
};
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}
getAuth(app);
const db = getDatabase(app);
export {
  db as d
};
