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
                  <div
                    className={`p-3 rounded-2 mb-2 result ${
                      item.checked ? "bg-secondary bg-opacity-25" : "bg-light"
                    }`}
                    key={item.cacheId}
                    onClick={() => handleItemCheck(item)}
                    role="button"
                  >
                    <div className="form-check">
                      <input
                        className="form-check-input mt-2"
                        type="checkbox"
                        onChange={() => handleItemCheck(item)}
                        checked={item.checked}
                      />
                      <a href={item.link} target="_blank" rel="noreferrer">
                        <span className="fs-5 fw-bold">{item.title}</span>
                      </a>
                      <div>{item.snippet}</div>
                    </div>
                  </div>
                );
              return null;
            })}
          </div>
          <nav aria-label="...">
            <ul className="pagination justify-content-center">
              <li
                className={"page-item " + (index - 10 <= 0 ? "disabled" : "")}
              >
                <span className="page-link" onClick={handlePreviousClick}>
                  Previous
                </span>
              </li>
              <li className="page-item">
                <span className="page-link" onClick={handleNextClick}>
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
