import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();
//authcontext used for log out purposes 
export const AuthContextProvider = ({children})=>
{
    const [currentUser,setCurrentUser] = useState({});
    // checking there is a user already registered - 
    useEffect(()=> 
    {
        const unsub = onAuthStateChanged(auth,(user)=>{
                setCurrentUser(user);
                console.log(user)
            });
            return() =>
            {
                unsub();
            }
    }, []);
    return(
    <AuthContext.Provider value={{currentUser}}>
        {children}
    </AuthContext.Provider>
    )

};