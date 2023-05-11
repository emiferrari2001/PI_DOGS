import { useState } from "react";
import { useSelector } from "react-redux";
import Pagination from "../Pagination/Pagination";
import Cards from "../Cards/Cards";

const Home = () =>{
    const allDogsList = useSelector(state => state.allDogs);
    const dogsPerPage = 8;
    const totalPages = Math.ceil(allDogsList.length/dogsPerPage);

    const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
    return(
        <div>
            <h2>Home</h2>
            <Cards currentPage={currentPage} dogsPerPage={8} />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    )
}

export default Home;