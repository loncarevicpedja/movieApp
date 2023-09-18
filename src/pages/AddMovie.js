import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
  const navigate = useNavigate();
  const [cats, setCats] = useState(null);
  const [render, setRerender] = useState(false);
  const [dirs, setDirs] = useState(null);
  const [name, setName] = useState(null);
  const [desc, setDesc] = useState(null);
  const [dur, setDur] = useState(null);
  const [year, setYear] = useState(null);
  const [selectedCat, setSelectedCat] = useState(null);
  const [selectedDir, setSelectedDir] = useState(null);
  const [thumb, setThumb] = useState(null);

  const fetchCats = async () => {
    const response = await axios.get("https://localhost:7210/Categories");
    setCats(response.data);
  };

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
    if (Validate()) {
      const formData = new FormData();

      formData.append(`name`, name);
      formData.append(`description`, desc);
      formData.append(`duration`, parseInt(dur));
      formData.append(`year`, parseInt(year));
      formData.append(`movieDirectorId`, parseInt(selectedDir));
      formData.append(`categoryId`, parseInt(selectedCat));
      formData.append(`cover`, thumb);

      // console.log(body);

      await axios.post("https://localhost:7210/Movies", formData).then((n) => {
        navigate("/movies/" + n.data.id);
      });
    }
  };

  useEffect(() => {
    fetchdirs();
    fetchCats();
  }, []);
  return (
    <div className="page-containerr px-5 w-100 h-header-100">
      <hr></hr>
      <form onSubmit={submitHandler}>
        <label>Naziv</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        />
        <br></br>
        <label>Opis</label>
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
        <br></br>
        <label>Trajanje</label>
        <input
          value={dur}
          onChange={(e) => setDur(e.target.value)}
          type="number"
        />
        <br></br>
        <label>Godina</label>
        <input
          value={year}
          onChange={(e) => setYear(e.target.value)}
          type="number"
        />
        <br></br>
        <label>Kategorija</label>
        <select
          className="sel"
          value={selectedCat}
          onChange={(e) => setSelectedCat(e.target.value)}
        >
          {cats && cats.map((n) => <option value={n.id}>{n.caption}</option>)}
        </select>
        <br></br>
        <label>Reziser</label>
        <select
          className="sel"
          value={selectedDir}
          onChange={(e) => setSelectedDir(e.target.value)}
        >
          {dirs &&
            dirs.map((n) => (
              <option value={n.id}>
                {n.firstName} {n.lastName}
              </option>
            ))}
        </select>
        <br></br>
        <label>Cover slika:</label>
        <input
          accept="image/*"
          onChange={(e) => setThumb(e.target.files[0])}
          type="file"
          className="mt-3"
        />
        <br></br>
        <input className="dugme" type="submit" value={"DODAJ"} />
      </form>
      <hr></hr>
    </div>
  );
};

export default AddMovie;
