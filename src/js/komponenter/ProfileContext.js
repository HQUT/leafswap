import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, update, onValue } from "firebase/database";
import { app } from '../../firebaseConfig';

export const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const auth = getAuth(app);
  const db = getDatabase(app);
  const [profileData, setProfileData] = useState({
    name: '',
    profilePic: '',
    email: '', 
    phone: '',
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = ref(db, `users/${user.uid}`);
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            console.log('Profildata hämtad från Firebase:', data);
            setProfileData(data);
          }
        });
      } else {
        setProfileData({
            name: '',
            avatar: '',
            email: '', 
            phone: '',
          });
      }
    });

    return unsubscribe; 
  }, [auth, db]);

  const updateProfileData = (newData) => {
    if (!profileData) {
      console.error('Ingen inloggad användare, kan inte uppdatera profilen.');
      return;
    }


    setProfileData((prevData) => ({
      ...prevData,
      ...newData,
    }));


    const userRef = ref(db,` users/${auth.currentUser.uid}`);
    update(userRef, newData)
      .then(() => {
        console.log('Profil uppdaterad i Firebase');
      })
      .catch((error) => {
        console.error('Ett fel inträffade vid uppdatering av profil i Firebase', error);
      });
  };
  
  const contextValue = { profileData, updateProfileData };

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}