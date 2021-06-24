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

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const users = localStorage.getItem('@tractian:users')
      console.log(" USERS CARREGADPS _>>>", users)
      if (users) {
        await setSavedUsers(JSON.parse(users));
      }
    }
    loadStoragedData();
  }, []);

  const getUsers = useCallback(async () => {
    console.log(" entrou")
    let { data } = await api.get<UserProps[]>('users');
    let aux = data.map((el) => {
      return { ...el, active: true }
    })
    setUsers([
      ...aux,
      ...savedUsers,
    ])
  }, [savedUsers]);

  const getUserById = useCallback(async (id: number) => {
    let index = getIndex(id)
    return users[index];
  }, [users]);

  const addUser = useCallback(async (user: UserProps) => {
    user.id = users.length + 1;
    await setSavedUsers([...savedUsers, user]);
    await setUsers([...users, user]);
  }, [users, savedUsers]);

  const editUser = useCallback(async (user: UserProps) => {
    let usersAux = [...users];
    usersAux[getIndex(user.id)] = user;
    setUsers(usersAux);
  }, [users]);

  const deleteUser = useCallback(async (id: number) => {
    let usersAux = [...users];
    let index = getIndex(id)
    try {
      usersAux[index].active = false;
    } catch (err) {
      console.log("Error delete user", err)
    }
    verifyIfSaved(usersAux[index]);
    setUsers(usersAux)
  }, [users]);

  const verifyIfSaved = useCallback(async (user: UserProps) => {
    let index = -1;
    savedUsers.forEach((el, i) => {
      if (el.id == user.id) {
        index = i;
      }
    })
    if (index >= 0) {
      let usersAux = [...savedUsers];
      usersAux[index] = user;
      setSavedUsers(usersAux);
      localStorage.setItem('@tractian:users', JSON.stringify(usersAux));
    }
  }, [savedUsers]);

  const getIndex = (id: number) => {
    let index = -1;
    users.forEach((el, i) => {
      if (el.id == id) {
        index = i;
      }
    })
    return index;
  }

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
