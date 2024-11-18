import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define a TypeScript interface for user data
interface UserData {
  name: string;
  tasks: Task[];
}

interface Task {
  id: number;
  title: string;
  category: string;
  priority: 'lav' | 'medium' | 'høj';
  color: 'pink' | 'coral' | 'lavender' | 'teal' | 'yellow' | 'mint';
  date: string;
  time?: string;
  isComplete: boolean;
}


// Define the context value type
interface UserContextProps {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

interface UserProviderProps {
  children: ReactNode;
}

// Create a new context
const UserContext = createContext<UserContextProps | undefined>(undefined);

// Provider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>({
    name: 'Sara',
    tasks: [],
  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  
  return context;
};
