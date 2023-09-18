import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IdentityContext } from "../contexts/identityContext";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(null)

  const { loginUser, user } = useContext(IdentityContext);

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
    setError(null)
    Validate();
    try {
      var res = await axios.post("https://localhost:7210/Identity/login", {
        username,
        password: pass,
      });

      console.log(res.data);
      loginUser(res.data);
    } catch (e) {
      setError(e.response.data)
    }
  };

  useEffect(() => {
    if (user !== null) navigate("/");
  }, [user]);

  return (
      
    <div className="page-containerr w-100">
      <form onSubmit={submitHandler}>
      <h1>Log in</h1>
      {error && error.error}
      <label>Username:</label>
        <input
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />
        <br></br>
        <label>Password:</label>
        <input
          placeholder="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
        />
        <br></br>
        <input className="dugme" type="submit" value={"Log in"} content="Submit" />
      </form>
      <Link className="lin" to="/register">Sign up</Link>
    </div>
    
  );
};

export default Login;
