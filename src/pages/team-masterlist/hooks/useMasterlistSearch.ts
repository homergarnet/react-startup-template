import { useState, useCallback } from "react";
import debounce from "lodash/debounce"; // Ensure lodash is installed: npm install lodash
import useTeamMasterlistContext from "../../../store/team-masterlist/useTeamMasterlistContext";

const useMasterlistSearch = (initialValue: string) => {
  const { zSetTeamSearchText } = useTeamMasterlistContext();
  const [teamSearchText, setTeamSearchText] = useState("");

  // Function to handle the state update logic
  const updateMasterlistSearchText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e?.target?.value;

      setTeamSearchText(value); // Update the state with the parsed value (filteredValue);

      zSetTeamSearchText(value);
    },
    [zSetTeamSearchText] // Dependencies of the callback
  );

  // Debounced version of the update function
  const debouncedMasterlistSearchOnChange = useCallback(
    debounce(updateMasterlistSearchText, 500), // Debouncing for 200ms
    [updateMasterlistSearchText]
  );

  return { teamSearchText, debouncedMasterlistSearchOnChange };
};

export default useMasterlistSearch;
