import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { useAppStore } from "@/store";
import { SearchStatus } from "../search-status/SeachStatus";
import { SearchIcon } from "../shared/SearchIcon";

const SEARCH_QUERY_DEBOUNCE_TIME = 300; // ms

export const SearchInput = () => {
  const [query, setQuery] = useState("");
  const { usersStore } = useAppStore();
  const [debouncedQuery] = useDebounce(query, SEARCH_QUERY_DEBOUNCE_TIME);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    const abortController = new AbortController();
    if (query.length >= 3) {
      usersStore.actions.searchUsers(query, abortController.signal);
    } else {
      usersStore.actions.emptyEntities();
    }
    return () => {
      if (abortController) {
        abortController.abort();
      }
    };
  }, [debouncedQuery]);

  return (
    <>
      <div>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Typing at least 3 characters to search"
            onChange={onChange}
            value={query}
          />
          <SearchIcon />
        </label>
      </div>
      <SearchStatus query={debouncedQuery} />
    </>
  );
};
