import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_ID_KEY = "@myexr:userId";

/**
 * Get or create current user ID
 * In a real app, this would handle authentication
 */
export const getCurrentUserId = async (): Promise<string> => {
  try {
    let userId = await AsyncStorage.getItem(USER_ID_KEY);

    if (!userId) {
      // Create a new user ID (in real app, this would be after authentication)
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      await AsyncStorage.setItem(USER_ID_KEY, userId);
    }

    return userId;
  } catch (error) {
    console.error("Error getting user ID:", error);
    // Return a temporary ID if storage fails
    return `temp_${Date.now()}`;
  }
};

/**
 * Set current user ID (useful after authentication)
 */
export const setCurrentUserId = async (userId: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(USER_ID_KEY, userId);
  } catch (error) {
    console.error("Error setting user ID:", error);
  }
};

/**
 * Clear user ID (useful for logout)
 */
export const clearCurrentUserId = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(USER_ID_KEY);
  } catch (error) {
    console.error("Error clearing user ID:", error);
  }
};
