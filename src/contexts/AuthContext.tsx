import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../firebase';
import { CartItem } from '../types';

interface FirebaseUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

interface AuthContextType {
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  saveUserCart: (cart: CartItem[]) => Promise<void>;
  saveUserWishlist: (wishlist: string[]) => Promise<void>;
  loadUserData: () => Promise<{ cart: CartItem[], wishlist: string[] } | null>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setFirebaseUser({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
      } else {
        setFirebaseUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Saves cart to Firestore for logged-in user
  const saveUserCart = async (cart: CartItem[]) => {
    if (!firebaseUser) return;
    try {
      await setDoc(doc(db, 'users', firebaseUser.uid), { cart }, { merge: true });
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  // Saves wishlist to Firestore for logged-in user
  const saveUserWishlist = async (wishlist: string[]) => {
    if (!firebaseUser) return;
    try {
      await setDoc(doc(db, 'users', firebaseUser.uid), { wishlist }, { merge: true });
    } catch (error) {
      console.error('Error saving wishlist:', error);
    }
  };

  // Loads cart + wishlist from Firestore when user logs in
  const loadUserData = async () => {
    if (!firebaseUser) return null;
    try {
      const snap = await getDoc(doc(db, 'users', firebaseUser.uid));
      if (snap.exists()) {
        const data = snap.data();
        return {
          cart: (data.cart as CartItem[]) || [],
          wishlist: (data.wishlist as string[]) || [],
        };
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
    return null;
  };

  return (
    <AuthContext.Provider value={{
      firebaseUser,
      loading,
      signInWithGoogle,
      logout,
      saveUserCart,
      saveUserWishlist,
      loadUserData,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
