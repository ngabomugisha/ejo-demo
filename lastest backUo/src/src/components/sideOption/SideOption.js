import React from 'react'
import './SideOption.css'
import { useDispatch, connect } from 'react-redux';
import { useHistory } from "react-router-dom"
import { handleLogout } from '../../store/actions/auth.actions';

function SideOption({ active, text, Icon ,color}) {

  const [isLoading, setIsLoading] = React.useState(false);
  const [errMessage, setErrMessage] = React.useState('');

  const handleSubmit = async () => {
    sessionStorage.clear()
    try {
      await dispatch(handleLogout())}
      catch (err){ 
        alert("ERROR IN LOGOUT", err)
      }
    history.replace('/')
  };

  const history = useHistory();
  const dispatch = useDispatch();
    return (
      <div className={`sidebarOption ${active && "sidebarOption--active"}`}>
      <div className='side-icons'>
        <Icon className='side-icon'/>
        </div>
        {
          text == "Sign Out" ?
        <h2 onClick={handleSubmit}>{text}</h2> :
        <h2>{text}</h2>
        }
      </div>
    );
  }

  const mapStateToProps = (state) => ({
  })
  
  const mapDispatchToProps = {
  
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SideOption)
  