import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Movies = () => {
  const navigate = useNavigate()

  const [result, setResult] = useState([]);
  const [cats, setCats] = useState(null);
  const [filter, setFilter] = useState({
    duration: null,
    category: null,
    ratingsAsc: null,
    pageSize: 10,
    page: 1,
  });

  const navHandler = id => navigate(`/movies/${id}`)

  useEffect(() => {
    fetchResult();
    fetchCats()
  }, [filter]);

  const fetchResult = async () => {
    try {
      var query = `PageSize=${filter.pageSize}&Page=${filter.page}&`;

      if (filter.duration) query += `Duration=${filter.duration}&`;
      if (filter.category) query += `Category=${filter.category}&`;
      if (filter.ratingsAsc) query += `RatingsAsc=${filter.ratingsAsc}&`;

      const response = await axios.get(
        "https://localhost:7210/movies/list?" + query
      );

      setResult(response.data);
    } catch (error) {
      console.error("Error fetching movies", error);
    }
  };

  const fetchCats = async () =>{
    const response = await axios.get('https://localhost:7210/Categories')
    setCats(response.data)
  }

  const handleDurationChange = (event) => {
    setFilter({ ...filter, duration: event.target.value });
  };

  const handleCategoryChange = (event) => {
    setFilter({ ...filter, category: event.target.value });
  };

  const handleRatingsAscChange = (event) => {
    setFilter({ ...filter, ratingsAsc: event.target.checked });
  };

  const handleNextPage = (event) => {
    setFilter({ ...filter, page: filter.page + 1 });
  };

  const handlePreviousPage = (event) => {
    setFilter({ ...filter, page: filter.page - 1 });
  };

  return (
    <div className="page-container px-5 w-100 d-flex justify-content-center align-items-start">
      {/* Filter form */}
      <form className="w-25">
        <label>
          Duration:
          <input
            type="number"
            value={filter.duration || ""}
            onChange={handleDurationChange}
          />
        </label>
        <br />
        <label>
          Category:
          <select value={filter.category || ""} onChange={handleCategoryChange}>
          <option value={0}>All</option>
            {cats && cats.map(n => <option value={n.id}>{n.caption}</option>)}
            {/* Add other categories */}
          </select>
        </label>
        <br />
        <label>
          Ratings Ascending:
          <input className="cekk"
            type="checkbox"
            checked={filter.ratingsAsc || false}
            onChange={handleRatingsAscChange}
          />
        </label>
      </form>

      {/* Display result */}
      <div className="px-5 gap-1 w-75 d-flex justify-content-start align-items-start flex-wrap">
      {result &&
          result.items &&
          result.items.map((movie) => (
            <div onClick={() => navHandler(movie.id)} className="w-32 p-3 bg-light cursor-pointer text-dark" key={movie.id}>
              <img className="img-fluid" src={`https://localhost:7210/Images/${movie.cover}`} height={'150px'}/>
              <h3>{movie.name} <span className="text-muted">({movie.year})</span></h3>
              <h4>Ocena: {movie.avgRating}</h4>
              {/* Display other movie details */}
            </div>
          ))}
        {result && result.hasPreviousPage ? (
          <button className="mt-4" onClick={handlePreviousPage}>
            Prev
          </button>
        ) : (
          ""
        )}
        {result && result.hasNextPage ? (
          <button className="mt-4" onClick={handleNextPage}>
            Next
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Movies;
