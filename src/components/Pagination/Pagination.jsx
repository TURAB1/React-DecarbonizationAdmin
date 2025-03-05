import { useState } from "react";
import styles from './pagination.module.scss';

const Pagination = ({ totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange(page);
  };

  return (
    <div className={styles["pagination"]}>
      {/* 맨 처음 페이지 이동 */}
        <button 
        onClick={() => handlePageChange(1)} 
        disabled={currentPage === 1}
        className={styles["pagination__first"]}
      >
        맨처음
      </button>
      <button 
        onClick={() => handlePageChange(currentPage - 1)} 
        disabled={currentPage === 1}
        className={styles["pagination__prev"]}
      >
        이전
      </button>
      
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`${styles["pagination__btn"]} ${page === currentPage ? styles["pagination__btn--active"] : ""}`}
        >
          {page}
        </button>
      ))}
      
      <button 
        onClick={() => handlePageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
        className={styles["pagination__next"]}
      >
        다음
      </button>

      {/* 맨 마지막 페이지 이동 */}
      <button 
        onClick={() => handlePageChange(totalPages)} 
        disabled={currentPage === totalPages}
        className={styles["pagination__last"]}
      >
        맨끝
      </button>

    </div>
  );
};

export default Pagination;
