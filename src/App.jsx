import { useState, useEffect } from "react";
import MoviesCard from "./components/MoviesCard";
import { GoSearch } from "react-icons/go";
import "./App.css";

let API_URl = "http://www.omdbapi.com/?i=tt3896198&apikey=b6479099";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URl}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
    // console.log("data",data)
  };

  useEffect(() => {
    searchMovies("Dark");
  }, []);

  // console.log("movies",movies)

  return (
    <>
      <div className="app">
        <h1>MOVIES LAND HERE</h1>

        <div className="search">
          <input
            type="text"
            placeholder="Search for movies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <GoSearch className="searchIcon" style={{cursor:"pointer"}} onClick={() => searchMovies(searchTerm)} />
        </div>

        {movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie , i)=>(
              <MoviesCard key={i} movie={movie} />
            ))}
          </div>
        ): (
          <div className="empty">
            <h2>Sorry! Movie is Not Found</h2>
          </div>
        )}
      
      </div>
    </>
  );
}

export default App;
