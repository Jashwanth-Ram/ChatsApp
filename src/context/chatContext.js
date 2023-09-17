import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();
//authcontext used for log out purposes 
export const ChatContextProvider = ({children})=>
{
    const {currentUser}  = useContext(AuthContext);
    const INITIAL_STATE= {

        chatId:"null",
        user:{}
    }
    const chatReducer = (state,action)=>
    {
        switch(action.type)
        {
            // action  - here is a object that changes the state
            //action.payload-  data associated to action state
            case "CHANGE_USER":
                return{
                    user:action.payload,
                    chatId:
                    currentUser.uid > action.payload.uid
                    ?currentUser.uid+action.payload.uid
                    :action.payload.uid+currentUser.uid,
                }
            default:
                return state;
        }

    }


    const [state,dispatch] = useReducer(chatReducer,INITIAL_STATE);
    return(
    <ChatContext.Provider value={{data:state,dispatch}}>
        {children}
    </ChatContext.Provider>
    )

};