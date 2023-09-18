import React, { useContext, useEffect, useState } from "react";
import { IdentityContext } from "../contexts/identityContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const WatchList = () => {
  const { user } = useContext(IdentityContext);
  const [res, setRes] = useState(null);
  const [render, setRender] = useState(false);
  const navigate = useNavigate()

  const getRes = async () => {
    try {
      var response = await axios.get(
        "https://localhost:7210/watchlist/" + user.id
      );

      setRes(response.data);
    } catch (err) {
      alert("Error");
    }
  };

  const removeWatchlist = async (id) => {
    try {
      await axios.delete("https://localhost:7210/watchlist", {
        data: {
          userId: user.id,
          movieId: id,
        },
      });

      setRender(true);
      alert("removed!");
    } catch (err) {}
  };

  useEffect(() => {
    if (render) setRender(true);
    if (user) getRes();
  }, [user, render]);

  return (
    <div className="page-container w-100 px-5">
      {res &&
        res.list &&
        res.list.map((n) => (
          <div className="d-flex align-items-center">
            <h2 className="p-0 m-0">{n.name}</h2>
            <button
              onClick={() => navigate("/movies/" + n.id)}
              className="ms-3 btn btn-warning"
            >
              watch now
            </button><button
              onClick={() => removeWatchlist(n.id)}
              className="ms-3 btn btn-danger"
            >
              remove
            </button>
          </div>
        ))}
    </div>
  );
};

export default WatchList;
