export function loadState(key) {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) return undefined; 
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Could not load state:", error);
    return undefined;
  }
}

export async function saveState(key, state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Could not save state:", error);
  }
}
