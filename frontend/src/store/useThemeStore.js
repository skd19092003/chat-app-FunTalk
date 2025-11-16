import { create } from "zustand";

export const useThemeStore = create((set) => ({

  theme: localStorage.getItem("chat-theme") || "light",

  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
  
}));
 
//these files are zustand stores , basically gloBAl state stores which we can use ,import anywhere in our react component or pages

//they often provide better re-render control than context api AND LIGHTER AND CLEANER THAN REDUX 

//BETTTER THAN REDUX TOOLKIT AND REDUX IN SMALL TO MEDIUM PROJECTS