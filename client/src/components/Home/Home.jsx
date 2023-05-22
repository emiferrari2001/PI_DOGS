import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../Pagination/Pagination";
import Cards from "../Cards/Cards";

import { setPageNumber } from "../../redux/actions";

import styles from './Home.module.css'

const Home = () =>{
    const allDogsList = useSelector(state => state.someDogs);
    const page = useSelector(state => state.currentPage);

    const dispatch = useDispatch();

    const dogsPerPage = 8;
    const totalPages = Math.ceil(allDogsList.length/dogsPerPage);

    const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    dispatch(setPageNumber(pageNumber))

  };

  useEffect(() =>{
    setCurrentPage(1) //cuando se actualiza la lista de perros, la pagina de paginacion se vuelve 1
    dispatch(setPageNumber(1))
  },[allDogsList, dispatch])

  useEffect(()=>{
    setCurrentPage(page)
    //cuando se desmonta el componente le paso page
    return page;
  }, [])


    return(
        <div className={styles.homeContainer}>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            <Cards currentPage={currentPage} dogsPerPage={dogsPerPage} />
        </div>
    )
}

export default Home;