import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminCategories = () => {
  const [cats, setCats] = useState(null);
  const [render, setRerender] = useState(false);

  const fetchCats = async () => {
    const response = await axios.get("https://localhost:7210/Categories");
    setCats(response.data);
  };

  const removeHandler = async (id) => {
    if(window.confirm("Da li ste sigurni?")){
        await axios.delete("https://localhost:7210/Categories/" + id);
        setRerender(true);
    }
  };

  useEffect(() => {
    if (render) setRerender(false);
    fetchCats();
  }, [render]);
  return (
    <div className="page-containerr px-5 w-100 h-header-100">
      <table>
        <tr>
          <th>Naziv kategorije</th>
          <th></th>
        </tr>
        {cats &&
          cats.map((n) => (
            <tr>
              <td>{n.caption}</td>
              <td>
                <button className="dugme" onClick={() => removeHandler(n.id)}>Obrisi</button>
              </td>
            </tr>
          ))}
      </table>
    </div>
  );
};

export default AdminCategories;
