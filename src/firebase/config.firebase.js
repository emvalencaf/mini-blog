
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAGMVAY5EEf6VjVl80QnDIbsI07B6TNwAg",
  authDomain: "mini-blog-react-65aeb.firebaseapp.com",
  projectId: "mini-blog-react-65aeb",
  storageBucket: "mini-blog-react-65aeb.appspot.com",
  messagingSenderId: "504882408823",
  appId: "1:504882408823:web:6b40fec75b84fffe26c572"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };