import React  from "react";
import Nav from "../components/navbar";
import Search from "./search";
import CHATS from "./CHATS";

function Sidebar()
{
    return(
        <div className="sidebar">

        <Nav/>
        <Search/>
        <CHATS/>

        </div>
    )
}

export default Sidebar;