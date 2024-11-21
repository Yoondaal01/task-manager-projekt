import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define a TypeScript interface for user data
interface UserData {
  name: string;
  tasks: Task[];
}

// Define a TypeScript interface for a task
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

// Define the props for the UserProvider component
interface UserProviderProps {
  children: ReactNode;
}

// Create a new context for user data
const UserContext = createContext<UserContextProps | undefined>(undefined);

// Provider component that wraps the application or part of it to provide user data context
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  // State to manage user data, initialized with default values
  const [userData, setUserData] = useState<UserData>({
    name: 'Sara',
    tasks: [],
  });

  return (
    // Provide the user data and the function to update it to the context consumers
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext in functional components
export const useUser = () => {
  // Access the UserContext value
  const context = useContext(UserContext);
  // Throw an error if the hook is used outside of a UserProvider
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  
  return context;
};
