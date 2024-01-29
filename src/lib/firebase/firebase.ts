import { getDatabase } from "firebase/database";
import { initializeApp, getApps, getApp} from 'firebase/app';
import { getAuth } from 'firebase/auth';
// setPersistence(auth, inMemoryPersistence)

const firebaseConfig = {
    apiKey: String(import.meta.env.VITE_API_KEY),
    authDomain: String(import.meta.env.VITE_AUTH_DOMAIN),
    databaseURL: String(import.meta.env.VITE_DATABASE_URL),
    projectId: String(import.meta.env.VITE_PROJECT_ID),
    storageBucket: String(import.meta.env.VITE_STORAGE_BUCKET),
    messagingSenderId: String(import.meta.env.VITE_MESSAGING_SENDER_ID),
    appId: String(import.meta.env.VITE_APP_ID),
    measurementId: String(import.meta.env.VITE_MEASUREMENT_ID),
};

let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}


const authtest = getAuth(app);
const db = getDatabase(app);

//export default app;

export {
    db,
    app,
    authtest,
};
