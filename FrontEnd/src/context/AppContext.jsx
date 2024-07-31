/* eslint-disable react/prop-types */
import React, { createContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyLoggedUser } from '../store/auth/thunks';
import { useLoad } from '../hooks/useLoad';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const dispatch = useDispatch();
  const { isLoading } = useLoad();

  const loggedUser = useSelector((state) => state.user.loggedUser);
  const statusAuth = useSelector((state) => state.user.statusAuth);

  useEffect(() => {
    dispatch(verifyLoggedUser());
  }, [dispatch]);

  return (
    <AppContext.Provider value={{ isLoading, loggedUser, statusAuth }}>
      {children}
    </AppContext.Provider>
  );
}
