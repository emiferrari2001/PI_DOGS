import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Pagination from "../Pagination/Pagination";
import Cards from "../Cards/Cards";

const Home = () =>{
    const allDogsList = useSelector(state => state.someDogs);
    const dogsPerPage = 8;
    const totalPages = Math.ceil(allDogsList.length/dogsPerPage);

    const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() =>{
    console.log(allDogsList[0])
    setCurrentPage(1) //cuando se actualiza la lista de perros, la pagina de paginacion se vuelve 1
  },[allDogsList])


    return(
        <div>
            <h2>Home</h2>
            <Cards currentPage={currentPage} dogsPerPage={dogsPerPage} />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    )
}

export default Home;