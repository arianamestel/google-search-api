import React, { useState } from "react";
import Title from "./Title";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";

export const GoogleApi = () => {
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);
  const [index, setIndex] = useState(0);

  const previousPage = () => {
    if (index >= 10) setIndex(index - 10);
  };

  const nextPage = (input) => {
    if (results.length <= index + 1 || input !== searchValue)
      return getResults(input);
    return setIndex(index + 10);
  };

  const getResults = (input) => {
    let start = index;
    if (input !== searchValue) start = 0;
    return fetch(
      `https://www.googleapis.com/customsearch/v1?key=AIzaSyBeij4Lmoz236_4aFUny5z1SLoWBgTvFIM&cx=91973357afe1446c1&q=${input}&start=${start}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data) return;
        let tranformedResults;
        // new search
        if (searchValue !== input) {
          tranformedResults = [...data.items].map((item) => ({
            ...item,
            checked: item?.checked || false,
          }));
          setIndex(10);
          setResults(tranformedResults);
        } else {
          tranformedResults = [...results, ...data.items].map((item) => ({
            ...item,
            checked: item?.checked || false,
          }));
          setIndex(index + 10);
          setResults(tranformedResults);
        }
        setSearchValue(input);
      });
  };

  const onSelectAll = () => {
    setResults(results.map((items) => ({ ...items, checked: true })));
  };

  const onUnselectAll = () => {
    setResults(results.map((items) => ({ ...items, checked: false })));
  };

  const handleItemCheck = (item) => {
    setResults(
      results.map((i) => {
        if (i.cacheId === item.cacheId) return { ...i, checked: !i.checked };
        return i;
      })
    );
  };

  return (
    <div className="container">
      <Title />
      <SearchInput getResults={getResults} />
      {!!results.length && (
        <SearchResults
          {...{
            results,
            searchValue,
            onSelectAll,
            onUnselectAll,
            handleItemCheck,
            previousPage,
            nextPage,
            index,
          }}
          loadMoreResults={getResults}
        />
      )}
    </div>
  );
};

export default GoogleApi;
