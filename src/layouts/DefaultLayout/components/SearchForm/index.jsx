import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import clsx from "clsx";

import styles from "./SearchForm.module.scss";
import SearchResult from "./SearchResult";

const SearchForm = ({ className, onOpen, onClose, isOpen }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setInputValue(searchParams.get("q") || "");
  }, [searchParams]);

  const handleInputChange = (e) => {
    let newValue = e.target.value;
    if (newValue.startsWith(" ")) {
      newValue = newValue.slice(1);
    }
    if (newValue) {
      setSearchParams({ q: newValue });
      onOpen("result");
    } else {
      setSearchParams({});
      onClose();
    }
  };

  const handleClearInput = () => (onClose(), setSearchParams({}));

  const handleFocus = () => {
    if (inputValue) {
      onOpen(null);
      onOpen("result");
    } else {
      onClose();
    }
  };

  return (
    <div className={clsx(styles["search-wrapper"], className)}>
      <div className={clsx(styles["search-form"])}>
        <div className={clsx(styles["search-icon"])}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        <input
          className={clsx(styles.input)}
          spellCheck="false"
          name="inputSearch"
          placeholder="Tìm kiếm khóa học, bài viết, video, ..."
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
        />
        <div className={clsx(styles["close"])} onClick={handleClearInput}>
          <svg
            className={clsx(styles["close-result"], {
              [styles["open-btn"]]: inputValue,
            })}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <path
              strokeWidth={2}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>

      <SearchResult
        isOpen={isOpen}
        onModalClose={onClose}
        clearInput={handleClearInput}
      />
    </div>
  );
};

SearchForm.displayName = "SearchForm";

export default SearchForm;
