import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminAddCategory = () => {
    const navigate = useNavigate()
    const [name,setName] = useState(null)

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

    const submitHandler = async(e)=>{
        e.preventDefault()
        Validate()

        await axios.post("https://localhost:7210/categories",{
            name
        }).then(n => navigate("/admin-categories"))
    }

  return (
    <div className="page-containerr px-5 w-100 h-header-100">
        <form onSubmit={submitHandler}>
            <label>Unesite naziv kategorije</label>
            <input value={name || ''} onChange={(e) => setName(e.target.value)} type='text'/><br></br>
            <input disabled={!name} className="dugme" type='submit' value={'DODAJ'}/>
        </form>
    </div>
  );
};

export default AdminAddCategory;
