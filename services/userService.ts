import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../config/firebase";

export interface UserProfile {
  id?: string;
  account: string;
  name: string;
  gender: string;
  age: string;
  height: string;
  weight: string;
  units: string;
  badges?: BadgeStatus[];
  createdAt?: any;
  updatedAt?: any;
}

export interface BadgeStatus {
  name: string;
  unlocked: boolean;
}

const USERS_COLLECTION = "users";

/**
 * Get user profile by user ID
 */
export const getUserProfile = async (
  userId: string
): Promise<UserProfile | null> => {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() } as UserProfile;
    }
    return null;
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};

/**
 * Create or update user profile
 */
export const saveUserProfile = async (
  userId: string,
  profileData: Partial<UserProfile>
): Promise<void> => {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    const userSnap = await getDoc(userRef);

    const dataToSave = {
      ...profileData,
      updatedAt: new Date(),
    };

    if (userSnap.exists()) {
      // Update existing user
      await updateDoc(userRef, dataToSave);
    } else {
      // Create new user
      await setDoc(userRef, {
        ...dataToSave,
        createdAt: new Date(),
      });
    }
  } catch (error) {
    console.error("Error saving user profile:", error);
    throw error;
  }
};

/**
 * Update specific field in user profile
 */
export const updateUserField = async (
  userId: string,
  field: string,
  value: string | number
): Promise<void> => {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    await updateDoc(userRef, {
      [field]: value,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error updating user field:", error);
    throw error;
  }
};

/**
 * Update user badges
 */
export const updateUserBadges = async (
  userId: string,
  badges: BadgeStatus[]
): Promise<void> => {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    await updateDoc(userRef, {
      badges,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error updating user badges:", error);
    throw error;
  }
};

/**
 * Get user by account/email
 */
export const getUserByAccount = async (
  account: string
): Promise<UserProfile | null> => {
  try {
    const usersRef = collection(db, USERS_COLLECTION);
    const q = query(usersRef, where("account", "==", account));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() } as UserProfile;
    }
    return null;
  } catch (error) {
    console.error("Error getting user by account:", error);
    throw error;
  }
};
