import './SideMenu.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch, connect } from 'react-redux';
import logo from '../../assets/icons/logo.svg';
import { TEACHER, SCHOOLADMIN, SUPERADMIN } from '../../pages/Auth/Users'
import { Link, useHistory } from 'react-router-dom';
import SideOption from '../sideOption/SideOption';
import { BiHome, BiDoorOpen, BiCalendar, BiTime } from 'react-icons/bi';
import { RiBookletLine, RiDashboardLine } from 'react-icons/ri';
import { IoSettingsOutline } from 'react-icons/io5'
import { MdPeopleOutline } from "react-icons/md";
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import { HiOutlineDocumentReport } from "react-icons/hi";

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
    case TEACHER:
      return <>
        {
          {
            1:
              <><Link to="/teacher"><SideOption Icon={BiHome} text="Home" active /></Link>
                <Link to="/teacher/assignment"><SideOption Icon={AssignmentTurnedInOutlinedIcon} text="Assignment" /></Link>
                <Link to="/teacher/lessonPlan"><SideOption Icon={RiBookletLine} text="Lesson Plan" /></Link>
                <SideOption Icon={IoSettingsOutline} text="Settings" /></>,
            2:
              <><Link to="/teacher"><SideOption Icon={BiHome} text="Home" /></Link>
                <Link to="/teacher/assignment"><SideOption Icon={AssignmentTurnedInOutlinedIcon} text="Assignment" active /></Link>
                <Link to="/teacher/lessonPlan"><SideOption Icon={RiBookletLine} text="Lesson Plan" /></Link>
                <SideOption Icon={IoSettingsOutline} text="Settings" /></>,
            3:
              <><Link to="/teacher"><SideOption Icon={BiHome} text="Home" /></Link>
                <Link to="/teacher/assignment"><SideOption Icon={AssignmentTurnedInOutlinedIcon} text="Assignment" /></Link>
                <Link to="/teacher/lessonPlan"><SideOption Icon={RiBookletLine} text="Lesson Plan" active /></Link>
                <SideOption Icon={IoSettingsOutline} text="Settings" /></>,
            4:
              <><Link to="/teacher"><SideOption Icon={BiHome} text="Home" active /></Link>
                <Link to="/teacher/assignment"><SideOption Icon={AssignmentTurnedInOutlinedIcon} text="Assignment" /></Link>
                <Link to="/teacher/lessonPlan"><SideOption Icon={RiBookletLine} text="Lesson Plan" /></Link>
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
                <Link to="/headteacher/report"><SideOption Icon={HiOutlineDocumentReport} text="Report" /></Link></>,
            2:
              <><Link to="/teacher"><SideOption Icon={BiHome} text="Announcement" /></Link>
                <Link to="/headteacher/checkio"><SideOption Icon={AssignmentTurnedInOutlinedIcon} text="Check In/Out" active /></Link>
                <SideOption Icon={RiBookletLine} text="Time Table" />
                <Link to="/headteacher/report"><SideOption Icon={HiOutlineDocumentReport} text="Report" /></Link></>,
            3:
              <><Link to="/teacher"><SideOption Icon={BiHome} text="Announcement" /></Link>
                <Link to="/headteacher/checkio"><SideOption Icon={AssignmentTurnedInOutlinedIcon} text="Check In/Out" /></Link>
                <SideOption Icon={RiBookletLine} text="Time Table" active />
                <Link to="/headteacher/report"><SideOption Icon={HiOutlineDocumentReport} text="Report" /></Link></>,
            4:
              <><Link to="/"><SideOption Icon={BiHome} text="Announcement" /></Link>
                <Link to="/headteacher/checkio"><SideOption Icon={AssignmentTurnedInOutlinedIcon} text="Check In/Out" /></Link>
                <SideOption Icon={RiBookletLine} text="Time Table" />
                <Link to="/headteacher/report"><SideOption Icon={HiOutlineDocumentReport} text="Report" active /></Link></>
          }[selected]
        }

      </>
      break;
    case SCHOOLADMIN:
      return <>
        {
          {
            1:
              <><Link to="/schoolAdmin"><SideOption Icon={RiDashboardLine} text="Dashboard" active /></Link>
                <Link to="/schoolAdmin/students"><SideOption Icon={MdPeopleOutline} text="Students" /></Link>
                <Link to="/schoolAdmin/teachers"><SideOption Icon={RiBookletLine} text="Teachers" /></Link>
                <Link to="/schoolAdmin/timeTable"><SideOption Icon={BiTime} text="Time Table" /></Link>
                <Link to="/schoolAdmin"><SideOption Icon={HiOutlineDocumentReport} text="Report" /></Link></>,
            2:
              <><Link to="/schoolAdmin"><SideOption Icon={RiDashboardLine} text="Dashboard" /></Link>
                <Link to="/schoolAdmin/students"><SideOption Icon={MdPeopleOutline} text="Students" active /></Link>
                <Link to="/schoolAdmin/teachers"><SideOption Icon={RiBookletLine} text="Teachers" /></Link>
                <Link to="/schoolAdmin/timeTable"><SideOption Icon={BiTime} text="Time Table" /></Link>
                <Link to="/schoolAdmin"><SideOption Icon={HiOutlineDocumentReport} text="Report" /></Link></>,
            3:
              <><Link to="/schoolAdmin"><SideOption Icon={RiDashboardLine} text="Dashboard" /></Link>
                <Link to="/schoolAdmin/students"><SideOption Icon={MdPeopleOutline} text="Students" /></Link>
                <Link to="/schoolAdmin/teachers"><SideOption Icon={RiBookletLine} text="Teachers" active /></Link>
                <Link to="/schoolAdmin/timeTable"><SideOption Icon={BiTime} text="Time Table" /></Link>
                <Link to="/schoolAdmin"><SideOption Icon={HiOutlineDocumentReport} text="Report" /></Link></>,
            4:
              <><Link to="/schoolAdmin"><SideOption Icon={RiDashboardLine} text="Dashboard" /></Link>
                <Link to="/schoolAdmin/students"><SideOption Icon={MdPeopleOutline} text="Students" /></Link>
                <Link to="/schoolAdmin/teachers"><SideOption Icon={RiBookletLine} text="Teachers" /></Link>
                <Link to="/schoolAdmin/timeTable"><SideOption Icon={BiTime} text="Time Table"active /></Link>
                <Link to="/schoolAdmin"><SideOption Icon={HiOutlineDocumentReport} text="Report"  /></Link></>,
            5:
              <><Link to="/schoolAdmin"><SideOption Icon={RiDashboardLine} text="Dashboard" /></Link>
                <Link to="/schoolAdmin/students"><SideOption Icon={MdPeopleOutline} text="Students" /></Link>
                <Link to="/schoolAdmin/teachers"><SideOption Icon={RiBookletLine} text="Teachers" /></Link>
                <Link to="/schoolAdmin/timeTable"><SideOption Icon={BiTime} text="Time Table" /></Link>
                <Link to="/schoolAdmin"><SideOption Icon={HiOutlineDocumentReport} text="Report" active /></Link></>
          }[selected]
        }
      </>
      break;
    case SUPERADMIN:
      return <>
        {
          {
            1:
              <><Link to="/admin"><SideOption Icon={RiDashboardLine} text="Dashboard" active /></Link>
                <Link to="/admin/schools"><SideOption Icon={MdPeopleOutline} text="Schools" /></Link>
                <Link to="/admin/courses"><SideOption Icon={RiBookletLine} text="Courses" /></Link>
                <Link to="/admin"><SideOption Icon={HiOutlineDocumentReport} text="Report" /></Link></>,
            2:
            <><Link to="/admin"><SideOption Icon={RiDashboardLine} text="Dashboard"  /></Link>
              <Link to="/admin/schools"><SideOption Icon={MdPeopleOutline} text="Schools" active/></Link>
              <Link to="/admin/courses"><SideOption Icon={RiBookletLine} text="Courses" /></Link>
              <Link to="/admin"><SideOption Icon={HiOutlineDocumentReport} text="Report" /></Link></>,
            3:
            <><Link to="/admin"><SideOption Icon={RiDashboardLine} text="Dashboard"  /></Link>
              <Link to="/admin/schools"><SideOption Icon={MdPeopleOutline} text="Schools" /></Link>
              <Link to="/admin/courses"><SideOption Icon={RiBookletLine} text="Courses"active /></Link>
              <Link to="/admin"><SideOption Icon={HiOutlineDocumentReport} text="Report" /></Link></>,
            4:
            <><Link to="/admin"><SideOption Icon={RiDashboardLine} text="Dashboard"  /></Link>
              <Link to="/admin/schools"><SideOption Icon={MdPeopleOutline} text="Schools" /></Link>
              <Link to="/admin/courses"><SideOption Icon={RiBookletLine} text="Courses" /></Link>
              <Link to="/admin"><SideOption Icon={HiOutlineDocumentReport} text="Report" active/></Link></>,
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
      <div className="icon-role">
        <img src={logo} className="logo" />
        <div className='role'>
          <p className="label">For&nbsp;{role}</p>
        </div>
      </div>
      {renderSwitch(role, selected)}
      <div className="signout">
        <SideOption Icon={BiDoorOpen} text="Sign Out" />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  state: state
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu)
