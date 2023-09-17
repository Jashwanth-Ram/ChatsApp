
import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

// useNavigate is a hook for navigation purpose like login to register
import { useNavigate,Link } from "react-router-dom";


const Register =()=>{
  // creating a hook state here err is state variable and setErr is getter function for err.
  // we are initializing it to false because there is no error.
  // when there is an error, we will use setErr function to set it to true.
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];


    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
     
      const date = new Date().getTime();
      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef,file);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/")
          }
          catch(err)
          {
            console.log(err);
            setErr(true);
          }
        });
      });
    }
    catch(err)
    {
      setErr(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">TalkTrek</span>
        <span className="title">Register</span>

        <form action="" onSubmit={handleSubmit}>
          <input type="text" placeholder="Name:" />
          <input type="text" placeholder="Email:" />
          <input type="password" placeholder="Password:" />
          <input style={{ display: "none" }} type="file" id="file" />

          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button>Sign Up</button>
          {err && <span>Something went wrong.</span>}
        </form>
        <p>Already Registered? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

export default Register;
