import React from "react";
import DownloadModal from "./DownloadModal";

export const SearchResults = ({
  searchValue = undefined,
  results,
  loadMoreResults,
  onSelectAll,
  onUnselectAll,
  handleItemCheck,
  previousPage,
  nextPage,
  index,
}) => {
  const checkedItems = results.filter((item) => item.checked);
  const scrollToTop = () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };

  const handlePreviousClick = () => {
    previousPage();
    scrollToTop();
  };

  const handleNextClick = () => {
    nextPage(searchValue);
    scrollToTop();
  };

  return (
    <div>
      {searchValue && <h4 className="my-3 fs-4">Results for {searchValue}:</h4>}
      {results && (
        <>
          <div className="d-flex">
            <button
              className="btn btn-warning btn-sm me-2"
              onClick={onSelectAll}
            >
              Check All
            </button>
            <button className="btn btn-info btn-sm" onClick={onUnselectAll}>
              Uncheck All
            </button>
            <DownloadModal checkedItems={checkedItems} />
          </div>

          <div className="mt-3">
            {results.map((item, i) => {
              if (i >= index - 10 && i < index)
                return (
                  <div className="form-check mb-2" key={item.cacheId}>
                    <input
                      className="form-check-input mt-2"
                      type="checkbox"
                      id={item.cacheId}
                      onChange={() => handleItemCheck(item)}
                      checked={item.checked}
                    />
                    <a href={item.link} target="_blank" rel="noreferrer">
                      <span className="fs-5 fw-bold">{item.title}</span>
                    </a>
                    <div>{item.snippet}</div>
                  </div>
                );
              return null;
            })}
          </div>
          <nav aria-label="...">
            <ul class="pagination justify-content-center">
              <li class={"page-item " + (index - 10 <= 0 ? "disabled" : "")}>
                <span class="page-link" onClick={handlePreviousClick}>
                  Previous
                </span>
              </li>
              <li class="page-item">
                <span class="page-link" onClick={handleNextClick}>
                  Next
                </span>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default SearchResults;
