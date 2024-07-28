// storage.js
export function loadState(key) {
    try {
      const serializedState = localStorage.getItem(key);
      if (!serializedState) return undefined;
      return JSON.parse(serializedState);
    } catch (e) {
      console.error("Error loading state from localStorage:", e);
      return undefined;
    }
  }
  
  export function saveState(key, state) {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(key, serializedState);
    } catch (e) {
      console.error("Error saving state to localStorage:", e);
    }
  }
  