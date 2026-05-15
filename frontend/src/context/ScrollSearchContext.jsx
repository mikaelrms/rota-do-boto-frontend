/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useRef, } from "react";

const ScrollSearchContext = createContext();

export function ScrollSearchProvider({ children }) {
  const searchRef = useRef(null);

  const scrollToSearch = () => {
    if (!searchRef.current) return;

    const offset = window.innerWidth < 768 ? 40 : 100;

    const y =
    searchRef.current.getBoundingClientRect().top +
    window.pageYOffset -
    offset;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  return (
    <ScrollSearchContext.Provider
      value={{
        searchRef,
        scrollToSearch,
      }}
    >
      {children}
    </ScrollSearchContext.Provider>
  );
}

export function useScrollSearch() {
  return useContext(ScrollSearchContext);
}
