import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
 import { db } from "../firebase";
import Message from "./message";
import { ChatContext } from "../context/chatContext";
function Messages()
{
    const {data} = useContext(ChatContext);
    const [messages,setMessages] = useState([]);

    useEffect(()=>
    {
        const unSub = onSnapshot(doc(db,"chats",data.chatId),(doc)=>
        {
            doc.exists() && setMessages(doc.data().messages)
            
        })
        return()=>
        {
            unSub();
        }

    },[data.chatId])
    return(
        <div className="messages">
            {messages.map((m)=>(
                <Message message={m} key={m.id}/>
            ))}
        </div>

    )

}

export default Messages;