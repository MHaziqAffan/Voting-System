import { createContext, useContext, useState, useEffect } from "react";

const SharedPropsContext = createContext();

export function useSharedProps() {
  return useContext(SharedPropsContext);
}

export function SharedPropsProvider({ children }) {
  const [sharedProps, setSharedProps] = useState(() => {
    const storedSharedProps = localStorage.getItem("sharedProps");
    return storedSharedProps ? JSON.parse(storedSharedProps) : {};
  });

  useEffect(() => {
    const storedCNIC = localStorage.getItem("userid"); // Use "userid" here
    
    if (storedCNIC !== sharedProps.usercnic) {
      // Clear the local storage and log the user out
      localStorage.removeItem("userid"); // Clear userid instead of "sharedProps"
      localStorage.removeItem("token"); // Clear userid instead of "sharedProps"
      setSharedProps({});
    }
  }, [sharedProps.usercnic]);

  return (
    <SharedPropsContext.Provider value={{ sharedProps, setSharedProps }}>
      {children}
    </SharedPropsContext.Provider>
  );
}
