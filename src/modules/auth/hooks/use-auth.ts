import { useState, useEffect, useCallback } from 'react';
import {  onAuthStateChanged, signOut, User } from 'firebase/auth';
import { googleProvider, auth } from '../services/firebase';
import { signInWithPopup } from 'firebase/auth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = useCallback(async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      localStorage.setItem('access_token', await result.user.getIdToken());
    } catch (error) {
      console.error('Google sign-in failed:', error);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem('access_token');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, []);

  return { user, signInWithGoogle, logout };
};
