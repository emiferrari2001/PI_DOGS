import { useEffect } from "react";
import { useSelector } from "react-redux";

import styles from './Pagination.module.css'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {

  const pageNum = useSelector(state => state.currentPage)
  useEffect(()=>{
    console.log(pageNum)
    //actualizo el componente cuando cambia la cantidad de paginas
  }, [totalPages, pageNum])  
  
  const pageNumbers = [];
  
    // Rango de paginacion que se muestra

    //limite inferior
    let startPage = Math.max(1, currentPage - 2);
    //limite superior
    let endPage = Math.min(totalPages, startPage + 3);
    startPage = Math.max(1, endPage - 3);
  
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
  
    return (
      <div className={styles.paginationContainer}>
        <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        ‹
        </button>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            disabled={currentPage === pageNumber}
          >
            {pageNumber}
          </button>
        ))}
        <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        ›
        </button>
      </div>
    );
  };
  
  export default Pagination;