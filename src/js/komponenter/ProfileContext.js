import React, { createContext, useContext} from 'react';
import { useModelProperty } from '../useModelProperty';

export const ProfileContext = createContext();

export function ProfileProvider({ children, model }) {
  const profileData = useModelProperty(model, 'profileData');
  const contextValue = { profileData };
  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
}
export function useProfile() {
  return useContext(ProfileContext);
}