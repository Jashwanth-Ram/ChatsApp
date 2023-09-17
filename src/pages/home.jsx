import React from "react";
import Sidebar from "../components/sidebar";
import Chat from "../components/chat";
import Search from "../components/search";
import CHATS from "../components/CHATS";
import Message from "../components/message";
import Input from "../components/input";

function Home()
{
    return(
        <div className="home">
            <div className="container">   
            <Sidebar/>
            <Chat/>
            </div>
        </div>
    )
}

export default Home;