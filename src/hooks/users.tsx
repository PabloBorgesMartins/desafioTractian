import React, {
  createContext, useState, useContext, useEffect, useCallback
} from 'react';

import api from '../services/api'
import { UserProps } from '../interfaces/User'

interface UserContextData {
  getUsers(): void;
  editUser: (user: UserProps) => void;
  addUser: (user: UserProps) => void;
  deleteUser: (id: number) => void;
  getUserById: (id: number) => Promise<UserProps>;
  users: UserProps[];
}

const UserContext = createContext<UserContextData>({} as UserContextData);

const UserProvider: React.FC = ({ children }) => {
  const [savedUsers, setSavedUsers] = useState<UserProps[]>([] as UserProps[]);
  const [users, setUsers] = useState<UserProps[]>([] as UserProps[]);

  const getIndex = useCallback((id: number) => {
    let index = -1;
    users.forEach((el, i) => {
      if (el.id === id) {
        index = i;
      }
    })
    return index;
  }, [users]);

  const getUsers = useCallback(async () => {
    let { data } = await api.get<UserProps[]>('users');
    // let aux = data.map((el) => {
    //   return { ...el, active: true }
    // })
    setUsers([...data, ...savedUsers])
  }, [savedUsers]);

  const getUserById = useCallback(async (id: number) => {
    let index = getIndex(id)
    return users[index];
  }, [users, getIndex]);

  const addUser = useCallback(async (user: UserProps) => {
    user.id = users.length + 1;
    await setSavedUsers([...savedUsers, user]);
    await setUsers([...users, user]);
  }, [users, savedUsers]);

  const editUser = useCallback(async (user: UserProps) => {
    let usersAux = [...users];
    try {
      usersAux[getIndex(user.id)] = user;
    } catch (err) {
      console.log("Error edit user", err)
    }
    setUsers(usersAux);
  }, [users, getIndex]);

  const deleteUser = useCallback(async (id: number) => {
    let usersAux = [...users];
    let index = getIndex(id)
    try {
      usersAux[index].active = false;
    } catch (err) {
      console.log("Error delete user", err)
    }
    setUsers(usersAux)
  }, [users, getIndex]);

  useEffect(() => {
    console.log("User Provider Iniciado")
  }, []);

  return (
    <UserContext.Provider
      value={{
        getUsers,
        getUserById,
        editUser,
        addUser,
        deleteUser,
        users
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

function useUser(): UserContextData {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within an UserProvider');
  }

  return context;
}

export { UserProvider, useUser };
