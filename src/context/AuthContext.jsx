import { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../utils/firebase';
import { saveUserProfile, getUserProfile } from '../services/firebaseService';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(true);
      
      if (user) {
        try {
          const profile = await getUserProfile(user.uid);
          setUserProfile(profile);
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setError('Failed to load user profile');
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setError(null);
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      setError('Failed to sign in with Google');
      throw error;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
      setUserProfile(null);
    } catch (error) {
      console.error('Error signing out:', error);
      setError('Failed to sign out');
      throw error;
    }
  };

  const updateProfile = async (profileData) => {
    try {
      setError(null);
      if (!currentUser) throw new Error('No user logged in');
      
      await saveUserProfile(currentUser.uid, profileData);
      setUserProfile(profileData);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile');
      throw error;
    }
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    error,
    signInWithGoogle,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
