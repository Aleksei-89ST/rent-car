import React from "react";
import styles from "./Search.module.scss";
import { FiSearch } from "react-icons/fi";
import { GrClose } from "react-icons/gr";

const Search = ({ searchValue, setSearchValue }) => {
  return (
    <div className={styles.root}>
      <FiSearch className={styles.icon} />
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className={styles.input}
        placeholder="Поиск авто..."
      />
     {
      searchValue && <GrClose onClick={() => setSearchValue('')} className={styles.clearIcon}/>
     }
    </div>
  );
};

export default Search;