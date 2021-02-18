import './SideMenu.css';
import React from 'react';
import { useSelector } from 'react-redux';
import logo from '../../assets/icons/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import SideOption from '../sideOption/SideOption';
import { BiHome } from 'react-icons/bi';
import { RiBookletLine } from 'react-icons/ri';
import { IoSettingsOutline } from 'react-icons/io5'
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import { BiDoorOpen } from "react-icons/bi";

const renderOptions = (active) => {
  switch (active) {
    case 1:

      break;

    default:
      break;
  }
}

function renderSwitch(role, selected) {
  switch (role) {
    case "teacher":
      return <>
        {
          {
            1:
              <><Link to="/teacher"><SideOption Icon={BiHome} text="Home" active /></Link>
                <Link to="/teacher/assignment"><SideOption Icon={AssignmentTurnedInOutlinedIcon} text="Assignment" /></Link>
                <SideOption Icon={RiBookletLine} text="Lesson Plan" />
                <SideOption Icon={IoSettingsOutline} text="Settings" /></>,
            2:
              <><Link to="/teacher"><SideOption Icon={BiHome} text="Home" /></Link>
                <Link to="/teacher/assignment"><SideOption Icon={AssignmentTurnedInOutlinedIcon} text="Assignment" active /></Link>
                <SideOption Icon={RiBookletLine} text="Lesson Plan" />
                <SideOption Icon={IoSettingsOutline} text="Settings" /></>,
            3:
              <><Link to="/teacher"><SideOption Icon={BiHome} text="Home" /></Link>
                <Link to="/teacher/assignment"><SideOption Icon={AssignmentTurnedInOutlinedIcon} text="Assignment" /></Link>
                <SideOption Icon={RiBookletLine} text="Lesson Plan" active />
                <SideOption Icon={IoSettingsOutline} text="Settings" /></>,
            4:
              <><Link to="/teacher"><SideOption Icon={BiHome} text="Home" active /></Link>
                <Link to="/teacher/assignment"><SideOption Icon={AssignmentTurnedInOutlinedIcon} text="Assignment" /></Link>
                <SideOption Icon={RiBookletLine} text="Lesson Plan" />
                <SideOption Icon={IoSettingsOutline} text="Settings" active /></>
          }[selected]
        }
      </>
      break;
    case "headteacher":
      return <>
        {
          {
            1:
              <><Link to="/teacher"><SideOption Icon={BiHome} text="Announcement" active /></Link>
                <Link to="/headteacher/checkio"><SideOption Icon={AssignmentTurnedInOutlinedIcon} text="Check In/Out" /></Link>
                <SideOption Icon={RiBookletLine} text="Time Table" />
                <Link to="/headteacher/report"><SideOption Icon={IoSettingsOutline} text="Report" /></Link></>,
            2:
              <><Link to="/teacher"><SideOption Icon={BiHome} text="Announcement" /></Link>
                <Link to="/headteacher/checkio"><SideOption Icon={AssignmentTurnedInOutlinedIcon} text="Check In/Out" active /></Link>
                <SideOption Icon={RiBookletLine} text="Time Table" />
                <Link to="/headteacher/report"><SideOption Icon={IoSettingsOutline} text="Report"  /></Link></>,
            3:
              <><Link to="/teacher"><SideOption Icon={BiHome} text="Announcement" /></Link>
                <Link to="/headteacher/checkio"><SideOption Icon={AssignmentTurnedInOutlinedIcon} text="Check In/Out" /></Link>
                <SideOption Icon={RiBookletLine} text="Time Table" active />
                <Link to="/headteacher/report"><SideOption Icon={IoSettingsOutline} text="Report"  /></Link></>,
            4:
              <><Link to="/"><SideOption Icon={BiHome} text="Announcement" /></Link>
                <Link to="/headteacher/checkio"><SideOption Icon={AssignmentTurnedInOutlinedIcon} text="Check In/Out" /></Link>
                <SideOption Icon={RiBookletLine} text="Time Table" />
                <Link to="/headteacher/report"><SideOption Icon={IoSettingsOutline} text="Report" active /></Link></>
          }[selected]
        }

      </>
      break;

    default:
      break;
  }
}


function SideMenu({ selected, role }) {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="side-menu-container">
      <img src={logo} className="logo" />
      <p className="label">For&nbsp;{role}</p>
      {renderSwitch(role, selected)}
      <div className="signout">
        <SideOption Icon={BiDoorOpen} text="Sign Out" />
      </div>
    </div>
  );
}

export default SideMenu;
