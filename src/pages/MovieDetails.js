import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import RatingStars from "../components/RatingStars";
import { IdentityContext } from "../contexts/identityContext";

const MovieDetails = () => {
  const { id } = useParams();
  const [rate, setRate] = useState(1);
  const { user } = useContext(IdentityContext);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rerender, setRerender] = useState(false);

  const watchHandler = async () => {
    try {
      console.log(user);
      await axios.post("https://localhost:7210/Movies/watch", {
        userId: user.id,
        movieId: id,
      });

      setRerender(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchMovie = async (id) => {
      try {
        const res = await axios.get("https://localhost:7210/Movies/" + id);
        setMovie(res.data);
        console.log(res.data);
        setLoading(false);
      } catch (e) {
        setError(e);
      }
    };

    if (rerender) setRerender(false);

    fetchMovie(id);
  }, [rerender]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://localhost:7210/Ratings/" + id, {
        rating: rate,
        raterId: user.id,
      });

      setRerender(true);
    } catch (e) {
      setError(e);
    }
  };

  const watchListHandler = async () => {
    try {
      await axios.post("https://localhost:7210/watchlist", {
        userId: user.id,
        movieId: id,
      });

      alert("Added!");
    } catch (err) {
      alert("Error!");
    }
  };

  return (
    <div className="page-container w-100">
      {loading ? (
        "Loading..."
      ) : error ? (
        "Error!"
      ) : (
        <div className="container p-0">
          <div className="row g-0">
            <div className="col-6">
              <img
                className="img-fluid"
                src={`https://localhost:7210/Images/${movie.cover}`}
              />
            </div>
            <div className="col-6 p-5">
              {user && user.role !== "Admin" && (
                <button onClick={watchListHandler}>Add to WatchList</button>
              )}
              <h1 className="display-3 w-100 border-bottom py-2 pb-3">
                {movie.name}
              </h1>
              <h3 className="w-100 border-bottom py-2 pb-3">
                {movie.category.caption}
              </h3>
              <h3 className="w-100 border-bottom py-2 pb-3 d-flex gap-3 align-items-center">
                Average Rating: <RatingStars avgRating={movie.avgRating} />
              </h3>
              {user &&
              movie &&
              !movie.haveWatched.some((us) => us.id === user.id) ? (
                <button onClick={watchHandler} className="btn btn-danger px-4">
                  Watch now
                </button>
              ) : (
                <div>
                  Rate now
                  <form onSubmit={submitHandler}>
                    <input
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                      type="number"
                      min={1}
                      max={5}
                    />
                    <input type="submit" value={"Rate"} />
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
