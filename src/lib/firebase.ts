
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, collection, getDocs, query, where, limit, orderBy, type Firestore } from "firebase/firestore";

// Explicitly check for the API key and log a detailed error if it's missing.
if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  console.error("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  console.error("CRITICAL ERROR: NEXT_PUBLIC_FIREBASE_API_KEY is not defined in your environment.");
  console.error("This is required for Firebase to initialize correctly.");
  console.error("1. Ensure you have a '.env.local' file in the ROOT of your project.");
  console.error("2. Ensure it contains NEXT_PUBLIC_FIREBASE_API_KEY=\"YOUR_KEY_HERE\" and other Firebase config values.");
  console.error("3. You can find these values in your Firebase project settings (Project settings > General > Your apps > Web app).");
  console.error("4. IMPORTANT: After creating or modifying the .env.local file, YOU MUST RESTART your Next.js development server.");
  console.error("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth: Auth = getAuth(app);
const firestore: Firestore = getFirestore(app);
// const storage = getStorage(app);

export { app, auth, firestore, collection, getDocs, query, where, limit, orderBy };
