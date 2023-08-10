import { useContext } from "react";
import { useHistory } from "react-router-dom";

// Custom hook to provide access to useHistory
export function useHistoryWrapper() {
  return useHistory();
}
