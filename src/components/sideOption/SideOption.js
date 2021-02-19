import React from 'react'
import './SideOption.css'
import { useHistory } from "react-router-dom"

function SideOption({ active, text, Icon ,color}) {
  let history = useHistory();
    return (
      <div className={`sidebarOption ${active && "sidebarOption--active"}`}>
      <div className='side-icons'>
        <Icon className='side-icon'/>
        </div>
        {
          text == "Sign Out" ?
        <h2 onClick={()=>history.replace('/')}>{text}</h2> :
        <h2>{text}</h2>
        }
      </div>
    );
  }

export default SideOption
