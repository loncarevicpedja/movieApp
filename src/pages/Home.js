import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [active, setActive] = useState(0);
  const [activeCat, setActiveCat] = useState(0);
  const [categories, setCategories] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const activeHandler = (num) => {
    setActive(num);
  };

  const activeCatHandler = (num) => {
    setActiveCat(num);
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://localhost:7210/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories().catch((error) => {
      console.error("Error handling category fetch:", error);
    });
  }, []);

  useEffect(() => {
    const fetchMoviesByCategoryId = async (categoryId) => {
      try {
        const response = await axios.get(
          `https://localhost:7210/Movies/list?Category=${categoryId}&RatingsAsc=false&Page=1&PageSize=6`
        );
        setActive(0);
        setFilteredMovies(response.data.items);
      } catch (error) {
        console.error("Error fetching movies by category ID:", error);
      }
    };

    if (categories.length > 0) {
      fetchMoviesByCategoryId(categories[activeCat].id);
    }
  }, [activeCat, categories]); 

  return (
    <div className="home-container">
      <div className="top-movies-categories">
        {categories &&
          categories.map((n, index) => (
            <button
              onClick={() => activeCatHandler(index)}
              className={`${activeCat === index ? "active" : ""}`}
            >
              {n.caption}
            </button>
          ))}
      </div>
      <div className="top-movies">
        {filteredMovies.map((n, index) => (
          <div
            key={n.id}
            className={`top-movie ${active === index ? "active" : ""}`}
            onClick={() => activeHandler(index)}
          >
            <div className="tm-inner" style={{background:"url('https://localhost:7210/Images/${movie.cover"}}>
              {active === index ? (
                <h1>
                  {n.name} ( {n.avgRating} )
                </h1>
              ) : (
                ""
              )}
              {active === index ? (
                <button
                  onClick={() => navigate(`/movies/${n.id}`)}
                  className="link"
                >
                  Watch now
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
      </div>
      {filteredMovies.length > 0 && (
        <div className="top-movies-title">
          Best Rated {categories[activeCat] && categories[activeCat].caption}{" "}
          Movies
        </div>
      )}
    </div>
  );
};

export default Home;
