import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminDirectors = () => {
  const [dirs, setDirs] = useState(null);
  const [render, setRerender] = useState(false);
  const [first, setFirst] = useState(null);
  const [last, setLast] = useState(null);

  const fetchdirs = async () => {
    const response = await axios.get("https://localhost:7210/MovieDirectors");
    setDirs(response.data);
  };
  const Validate = () => {
    const inputs = document.getElementsByTagName("input");
  
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value.trim() === "") {
        alert("Morate popuniti sva polja");
        return false;
      }
    }
  
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    Validate()
    await axios.post("https://localhost:7210/MovieDirectors", {
      firstName: first,
      lastName: last,
    });
    setRerender(true);
  };

  useEffect(() => {
    if (render) {
      setRerender(false);
      setFirst("");
      setLast("");
    }
    fetchdirs();
  }, [render]);
  return (
    <div className="page-containerr px-5 w-100 h-header-100">
      <hr></hr>
      <form onSubmit={submitHandler}>
        <label>Ime:</label>
        <br></br>
        <input
          value={first || ""}
          onChange={(e) => setFirst(e.target.value)}
          type="text"
        />
        <br></br>
        <label>Prezime:</label>
        <br></br>
        <input
          value={last || ""}
          onChange={(e) => setLast(e.target.value)}
          type="text"
        />
        <br></br>
        <input className="dugme" type="submit" value={"Dodaj"} />
      </form>
      <hr></hr>
      {dirs &&
        dirs.map((n) => (
          <div>
            {n.firstName} {n.lastName}
          </div>
        ))}
    </div>
  );
};

export default AdminDirectors;
