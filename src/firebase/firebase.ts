import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged,signInAnonymously  } from "firebase/auth";
import { getFirestore, collection, addDoc, query, orderBy, getDocs, where } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD2N-DBd1w-akmB61nXcB63r097Ch7uON0",
  authDomain: "rais-calcu.firebaseapp.com",
  projectId: "rais-calcu",
  storageBucket: "rais-calcu.firebasestorage.app",
  messagingSenderId: "578414830079",
  appId: "1:578414830079:web:8f22b36b21973d9e6387ca",
  measurementId: "G-YSV7MZ0L9Q"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 



export async function addCalculationToHistory(calculation, result) {
    try {
      const user = auth.currentUser;
      
      if (!user) {
        console.log("No user found, attempting anonymous sign in");
        try {
          const userCredential = await signInAnonymously(auth);
          console.log("Anonymous sign in successful");
        } catch (authError) {
          console.error("Anonymous sign in failed:", authError);
          return;
        }
      }
      
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.error("Still no authenticated user after sign-in attempt");
        return;
      }
      
      console.log("Adding calculation to history for user:", currentUser.uid);
      const docRef = await addDoc(collection(db, "calculationHistory"), {
        userId: currentUser.uid,
        calculation,
        result,
        timestamp: new Date()
      });
      
      console.log("Calculation saved with ID:", docRef.id);
    } catch (error) {
      console.error("Error adding calculation to history:", error);
    }
  }
     
  
  // Get user's calculation history
  export async function getUserCalculationHistory() {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("User not authenticated");
        return [];
      }
      
      const historyQuery = query(
        collection(db, "calculationHistory"),
        where("userId", "==", user.uid),
        orderBy("timestamp", "desc")
      );
      
      const querySnapshot = await getDocs(historyQuery);
      const history = [];
      
      querySnapshot.forEach((doc) => {
        history.push({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp.toDate()
        });
      });
      
      return history;
    } catch (error) {
      console.error("Error getting calculation history:", error);
      return [];
    }
  }
  

  
  
  // Get current user
  export function getCurrentUser() {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        resolve(user);
      });
    });
  }
  

  