import { createContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import app from '../firebase/firebase.config';
import useAxiosPublic from '../hooks/useAxiosPublic';

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const updateUserProfile = (name, photo) =>
    updateProfile(auth.currentUser, { displayName: name, photoURL: photo });

  const logOut = async () => {
    setLoading(true);
    await axiosPublic.post('/logout');
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          await axiosPublic.post('/jwt', { email: currentUser.email });
          await axiosPublic.post('/users', {
            email: currentUser.email,
            name: currentUser.displayName,
            photo: currentUser.photoURL,
          });
        } catch {
          // silent — user may already exist
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [axiosPublic]);

  const value = {
    user,
    loading,
    createUser,
    signIn,
    googleSignIn,
    updateUserProfile,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
