import React from 'react'
import imgReact from "../assets/react.svg"
import LangSelector from "./LangSelector.jsx";
const Header = ()=>{
    return(
        <header style={{textAlign: "center"}}>
            <img src={imgReact} style={{width:'200px'}}/>
        </header>
    )
}

export default Header