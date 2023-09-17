import React from "react";
import Add from "../img/addAvatar.png"
import { useNavigate,Link} from "react-router-dom";
import { useState } from "react";
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login()
{
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {

       await signInWithEmailAndPassword( auth,email, password);
       navigate("/");
    }
    catch(err)
    {
      setErr(true);
    }
};
    return(
        <div className="formContainer">
        <div className="formWrapper">

            <span className="logo">TalkTrek</span>
            <span className="title">Login</span>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="email:"/>
                <input type="password" placeholder="password:" />
                <button>Sign In</button>
                {err && <span>Something went wrong.</span>}

            </form>
            <p>Create New Account ? <Link to="/register">Register</Link></p>
        </div>
        </div>
    )
}

export default Login;
