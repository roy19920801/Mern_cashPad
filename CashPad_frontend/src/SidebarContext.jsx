import { useMemo } from "react";
import { createContext, useState } from "react";

const SidebarContext = createContext({
  updateUser: (user) => {},
});

export const useUserContext = () => {
  const [user, setUser] = useState(null);

  const userFunc = useMemo(
    () => ({
      updateUser: (u) => {
        // console.log(u)
        setUser(u)
      },
    }),
    []
  );
  return {
    user, userFunc
  };
};

export default SidebarContext;
