import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseconfig";

export const createUserDoc = async (user, defaultNickname) => {
  try {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    // Si el documento no existe, crearlo
    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        email: user.email,
        nickname: defaultNickname,
        points: 0,
        rewards: [],
        progress: {
          currentLevel: 1,
          lessonsCompleted: 0,
          quizzesCompleted: 0,
        },
      });
    }
  } catch (error) {
    console.error("Error creating user document:", error);
  }
};
