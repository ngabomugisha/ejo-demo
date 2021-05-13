import './SideMenu.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch, connect } from 'react-redux';
import logo from '../../assets/icons/logo.svg';
import { TEACHER, SCHOOLADMIN, SUPERADMIN, HEADSTUDY } from '../../pages/Auth/Users'
import { Link, useHistory } from 'react-router-dom';
import SideOption from '../sideOption/SideOption';
import { BiHome, BiDoorOpen, BiCalendar, BiTime, BiCopyAlt } from 'react-icons/bi';
import { RiBookletLine, RiDashboardLine, RiGroup2Line } from 'react-icons/ri';
import { IoSettingsOutline } from 'react-icons/io5'
import { MdPeopleOutline, MdDateRange, MdPermDeviceInformation } from "react-icons/md";
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import { HiOutlineDocumentReport, HiOutlineCollection } from "react-icons/hi";
import { GrWorkshop } from "react-icons/gr";

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
                <Link to="/teacher/workscheme"><SideOption Icon={GrWorkshop} text="Scheme Of Work" /></Link>
                <Link to="/teacher/lessonPlan"><SideOption Icon={RiBookletLine} text="Lesson Plan" /></Link>
                <Link to="/teacher/prints"><SideOption Icon={MdPermDeviceInformation} text="Prints" /></Link>
                <SideOption Icon={IoSettingsOutline} text="Settings" /></>,
            2:
              <><Link to="/teacher"><SideOption Icon={BiHome} text="Home" /></Link>
                <Link to="/teacher/assignment"><SideOption Icon={AssignmentTurnedInOutlinedIcon} text="Assignment" active /></Link>
                <Link to="/teacher/workscheme"><SideOption Icon={GrWorkshop} text="Scheme Of Work" /></Link>
                <Link to="/teacher/lessonPlan"><SideOption Icon={RiBookletLine} text="Lesson Plan" /></Link>
                <Link to="/teacher/prints"><SideOption Icon={MdPermDeviceInformation} text="Prints" /></Link>
                <SideOption Icon={IoSettingsOutline} text="Settings" /></>,
            3:
              <><Link to="/teacher"><SideOption Icon={BiHome} text="Home" /></Link>
                <Link to="/teacher/assignment"><SideOption Icon={AssignmentTurnedInOutlinedIcon} text="Assignment" /></Link>
                <Link to="/teacher/workscheme"><SideOption Icon={GrWorkshop} text="Scheme Of Work" active/></Link>
                <Link to="/teacher/lessonPlan"><SideOption Icon={RiBookletLine} text="Lesson Plan"  /></Link>
                <Link to="/teacher/prints"><SideOption Icon={MdPermDeviceInformation} text="Prints" /></Link>
                <SideOption Icon={IoSettingsOutline} text="Settings" /></>,
            4:
              <><Link to="/teacher"><SideOption Icon={BiHome} text="Home"  /></Link>
                <Link to="/teacher/assignment"><SideOption Icon={AssignmentTurnedInOutlinedIcon} text="Assignment" /></Link>
                <Link to="/teacher/workscheme"><SideOption Icon={GrWorkshop} text="Scheme Of Work" /></Link>
                <Link to="/teacher/lessonPlan"><SideOption Icon={RiBookletLine} text="Lesson Plan" active/></Link>
                <Link to="/teacher/prints"><SideOption Icon={MdPermDeviceInformation} text="Prints"  /></Link>
                <SideOption Icon={IoSettingsOutline} text="Settings" /></>,
            5:
              <><Link to="/teacher"><SideOption Icon={BiHome} text="Home"  /></Link>
                <Link to="/teacher/assignment"><SideOption Icon={AssignmentTurnedInOutlinedIcon} text="Assignment" /></Link>
                <Link to="/teacher/workscheme"><SideOption Icon={GrWorkshop} text="Scheme Of Work" /></Link>
                <Link to="/teacher/lessonPlan"><SideOption Icon={RiBookletLine} text="Lesson Plan" /></Link>
                <Link to="/teacher/prints"><SideOption Icon={MdPermDeviceInformation} text="Prints" active /></Link>
                <SideOption Icon={IoSettingsOutline} text="Settings"  /></>,
            6:
            <><Link to="/teacher"><SideOption Icon={BiHome} text="Home"  /></Link>
              <Link to="/teacher/assignment"><SideOption Icon={AssignmentTurnedInOutlinedIcon} text="Assignment" /></Link>
              <Link to="/teacher/workscheme"><SideOption Icon={GrWorkshop} text="Scheme Of Work" /></Link>
              <Link to="/teacher/lessonPlan"><SideOption Icon={RiBookletLine} text="Lesson Plan" /></Link>
              <Link to="/teacher/prints"><SideOption Icon={MdPermDeviceInformation} text="Prints"  /></Link>
              <SideOption Icon={IoSettingsOutline} text="Settings" active /></>
          }[selected]
        }
      </>
      break;
    case HEADSTUDY:
      return <>
        {
          {
            1:
              <><Link to="/headStudy"><SideOption Icon={BiHome} text="Announcement" active /></Link>
                <Link to="/headStudy/checkInOut"><SideOption Icon={AssignmentTurnedInOutlinedIcon} text="Check In/Out" /></Link>
                <Link to="/headStudy/timetable"><SideOption Icon={RiBookletLine} text="Time Table" /></Link>
                <Link to="/headStudy/report"><SideOption Icon={HiOutlineDocumentReport} text="Report" /></Link></>,
            2:
              <><Link to="/headStudy"><SideOption Icon={BiHome} text="Announcement" /></Link>
                <Link to="/headStudy/checkInOut"><SideOption Icon={AssignmentTurnedInOutlinedIcon} text="Check In/Out" active /></Link>
                <Link to="/headStudy/timetable"><SideOption Icon={RiBookletLine} text="Time Table" /></Link>
                <Link to="/headStudy/report"><SideOption Icon={HiOutlineDocumentReport} text="Report" /></Link></>,
            3:
              <><Link to="/headStudy"><SideOption Icon={BiHome} text="Announcement" /></Link>
                <Link to="/headStudy/checkInOut"><SideOption Icon={AssignmentTurnedInOutlinedIcon} text="Check In/Out" /></Link>
                <SideOption Icon={RiBookletLine} text="Time Table" active />
                <Link to="/headStudy/report"><SideOption Icon={HiOutlineDocumentReport} text="Report" /></Link></>,
            4:
              <><Link to="/"><SideOption Icon={BiHome} text="Announcement" /></Link>
                <Link to="/headStudy/checkInOut"><SideOption Icon={AssignmentTurnedInOutlinedIcon} text="Check In/Out" /></Link>
                <Link to="/headStudy/timetable"><SideOption Icon={RiBookletLine} text="Time Table" /></Link>
                <Link to="/headStudy/report"><SideOption Icon={HiOutlineDocumentReport} text="Report" active /></Link></>
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
                <Link to="/schoolAdmin/classes"><SideOption Icon={RiGroup2Line} text="Classes" /></Link>
                <Link to="/schoolAdmin/discipline"><SideOption Icon={BiCopyAlt} text="Discipline" /></Link>
                <Link to="/schoolAdmin/term"><SideOption Icon={MdDateRange} text="Term" /></Link>
                <Link to="/schoolAdmin/timeTable"><SideOption Icon={BiTime} text="Time Table" /></Link>
                <Link to="/schoolAdmin/questions"><SideOption Icon={HiOutlineCollection} text="Questions Bank" /></Link>
                <Link to="/schoolAdmin/report"><SideOption Icon={HiOutlineDocumentReport} text="Report" /></Link></>,
            2:
              <><Link to="/schoolAdmin"><SideOption Icon={RiDashboardLine} text="Dashboard" /></Link>
                <Link to="/schoolAdmin/students"><SideOption Icon={MdPeopleOutline} text="Students" active /></Link>
                <Link to="/schoolAdmin/teachers"><SideOption Icon={RiBookletLine} text="Teachers" /></Link>
                <Link to="/schoolAdmin/classes"><SideOption Icon={RiGroup2Line} text="Classes" /></Link>
                <Link to="/schoolAdmin/discipline"><SideOption Icon={BiCopyAlt} text="Discipline" /></Link>
                <Link to="/schoolAdmin/term"><SideOption Icon={MdDateRange} text="Term" /></Link>
                <Link to="/schoolAdmin/timeTable"><SideOption Icon={BiTime} text="Time Table" /></Link>
                <Link to="/schoolAdmin/questions"><SideOption Icon={HiOutlineCollection} text="Questions Bank" /></Link>
                <Link to="/schoolAdmin/report"><SideOption Icon={HiOutlineDocumentReport} text="Report" /></Link></>,
            3:
              <><Link to="/schoolAdmin"><SideOption Icon={RiDashboardLine} text="Dashboard" /></Link>
                <Link to="/schoolAdmin/students"><SideOption Icon={MdPeopleOutline} text="Students" /></Link>
                <Link to="/schoolAdmin/teachers"><SideOption Icon={RiBookletLine} text="Teachers" active /></Link>
                <Link to="/schoolAdmin/classes"><SideOption Icon={RiGroup2Line} text="Classes" /></Link>
                <Link to="/schoolAdmin/discipline"><SideOption Icon={BiCopyAlt} text="Discipline" /></Link>
                <Link to="/schoolAdmin/term"><SideOption Icon={MdDateRange} text="Term" /></Link>
                <Link to="/schoolAdmin/timeTable"><SideOption Icon={BiTime} text="Time Table" /></Link>
                <Link to="/schoolAdmin/questions"><SideOption Icon={HiOutlineCollection} text="Questions Bank" /></Link>
                <Link to="/schoolAdmin/report"><SideOption Icon={HiOutlineDocumentReport} text="Report" /></Link></>,
            4:
              <><Link to="/schoolAdmin"><SideOption Icon={RiDashboardLine} text="Dashboard" /></Link>
                <Link to="/schoolAdmin/students"><SideOption Icon={MdPeopleOutline} text="Students" /></Link>
                <Link to="/schoolAdmin/teachers"><SideOption Icon={RiBookletLine} text="Teachers" /></Link>
                <Link to="/schoolAdmin/classes"><SideOption Icon={RiGroup2Line} text="Classes" active /></Link>
                <Link to="/schoolAdmin/discipline"><SideOption Icon={BiCopyAlt} text="Discipline" /></Link>
                <Link to="/schoolAdmin/term"><SideOption Icon={MdDateRange} text="Term" /></Link>
                <Link to="/schoolAdmin/timeTable"><SideOption Icon={BiTime} text="Time Table" /></Link>
                <Link to="/schoolAdmin/questions"><SideOption Icon={HiOutlineCollection} text="Questions Bank" /></Link>
                <Link to="/schoolAdmin/report"><SideOption Icon={HiOutlineDocumentReport} text="Report" /></Link></>,
            5:
              <><Link to="/schoolAdmin"><SideOption Icon={RiDashboardLine} text="Dashboard" /></Link>
                <Link to="/schoolAdmin/students"><SideOption Icon={MdPeopleOutline} text="Students" /></Link>
                <Link to="/schoolAdmin/teachers"><SideOption Icon={RiBookletLine} text="Teachers" /></Link>
                <Link to="/schoolAdmin/classes"><SideOption Icon={RiGroup2Line} text="Classes" /></Link>
                <Link to="/schoolAdmin/discipline"><SideOption Icon={BiCopyAlt} text="Discipline" active /></Link>
                <Link to="/schoolAdmin/term"><SideOption Icon={MdDateRange} text="Term" /></Link>
                <Link to="/schoolAdmin/timeTable"><SideOption Icon={BiTime} text="Time Table" /></Link>
                <Link to="/schoolAdmin/questions"><SideOption Icon={HiOutlineCollection} text="Questions Bank" /></Link>
                <Link to="/schoolAdmin/report"><SideOption Icon={HiOutlineDocumentReport} text="Report" /></Link></>,
            6:
              <><Link to="/schoolAdmin"><SideOption Icon={RiDashboardLine} text="Dashboard" /></Link>
                <Link to="/schoolAdmin/students"><SideOption Icon={MdPeopleOutline} text="Students" /></Link>
                <Link to="/schoolAdmin/teachers"><SideOption Icon={RiBookletLine} text="Teachers" /></Link>
                <Link to="/schoolAdmin/classes"><SideOption Icon={RiGroup2Line} text="Classes" /></Link>
                <Link to="/schoolAdmin/discipline"><SideOption Icon={BiCopyAlt} text="Discipline" /></Link>
                <Link to="/schoolAdmin/term"><SideOption Icon={MdDateRange} text="Term" active /></Link>
                <Link to="/schoolAdmin/timeTable"><SideOption Icon={BiTime} text="Time Table" /></Link>
                <Link to="/schoolAdmin/questions"><SideOption Icon={HiOutlineCollection} text="Questions Bank" /></Link>
                <Link to="/schoolAdmin/report"><SideOption Icon={HiOutlineDocumentReport} text="Report" /></Link></>,
            7:
              <><Link to="/schoolAdmin"><SideOption Icon={RiDashboardLine} text="Dashboard" /></Link>
                <Link to="/schoolAdmin/students"><SideOption Icon={MdPeopleOutline} text="Students" /></Link>
                <Link to="/schoolAdmin/teachers"><SideOption Icon={RiBookletLine} text="Teachers" /></Link>
                <Link to="/schoolAdmin/classes"><SideOption Icon={RiGroup2Line} text="Classes" /></Link>
                <Link to="/schoolAdmin/discipline"><SideOption Icon={BiCopyAlt} text="Discipline" /></Link>
                <Link to="/schoolAdmin/term"><SideOption Icon={MdDateRange} text="Term" /></Link>
                <Link to="/schoolAdmin/timeTable"><SideOption Icon={BiTime} text="Time Table" active /></Link>
                <Link to="/schoolAdmin/questions"><SideOption Icon={HiOutlineCollection} text="Questions Bank" /></Link>
                <Link to="/schoolAdmin/report"><SideOption Icon={HiOutlineDocumentReport} text="Report" /></Link></>,
            8:
              <><Link to="/schoolAdmin"><SideOption Icon={RiDashboardLine} text="Dashboard" /></Link>
                <Link to="/schoolAdmin/students"><SideOption Icon={MdPeopleOutline} text="Students" /></Link>
                <Link to="/schoolAdmin/teachers"><SideOption Icon={RiBookletLine} text="Teachers" /></Link>
                <Link to="/schoolAdmin/classes"><SideOption Icon={RiGroup2Line} text="Classes" /></Link>
                <Link to="/schoolAdmin/discipline"><SideOption Icon={BiCopyAlt} text="Discipline" /></Link>
                <Link to="/schoolAdmin/term"><SideOption Icon={MdDateRange} text="Term" /></Link>
                <Link to="/schoolAdmin/timeTable"><SideOption Icon={BiTime} text="Time Table" /></Link>
                <Link to="/schoolAdmin/questions"><SideOption Icon={HiOutlineCollection} text="Questions Bank" active /></Link>
                <Link to="/schoolAdmin/report"><SideOption Icon={HiOutlineDocumentReport} text="Report" /></Link></>,
            9:
              <><Link to="/schoolAdmin"><SideOption Icon={RiDashboardLine} text="Dashboard" /></Link>
                <Link to="/schoolAdmin/students"><SideOption Icon={MdPeopleOutline} text="Students" /></Link>
                <Link to="/schoolAdmin/teachers"><SideOption Icon={RiBookletLine} text="Teachers" /></Link>
                <Link to="/schoolAdmin/classes"><SideOption Icon={RiGroup2Line} text="Classes" /></Link>
                <Link to="/schoolAdmin/discipline"><SideOption Icon={BiCopyAlt} text="Discipline" /></Link>
                <Link to="/schoolAdmin/term"><SideOption Icon={MdDateRange} text="Term" /></Link>
                <Link to="/schoolAdmin/timeTable"><SideOption Icon={BiTime} text="Time Table" /></Link>
                <Link to="/schoolAdmin/questions"><SideOption Icon={HiOutlineCollection} text="Questions Bank" /></Link>
                <Link to="/schoolAdmin/report"><SideOption Icon={HiOutlineDocumentReport} text="Report" active /></Link></>,
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
              <><Link to="/admin"><SideOption Icon={RiDashboardLine} text="Dashboard" /></Link>
                <Link to="/admin/schools"><SideOption Icon={MdPeopleOutline} text="Schools" active /></Link>
                <Link to="/admin/courses"><SideOption Icon={RiBookletLine} text="Courses" /></Link>
                <Link to="/admin"><SideOption Icon={HiOutlineDocumentReport} text="Report" /></Link></>,
            3:
              <><Link to="/admin"><SideOption Icon={RiDashboardLine} text="Dashboard" /></Link>
                <Link to="/admin/schools"><SideOption Icon={MdPeopleOutline} text="Schools" /></Link>
                <Link to="/admin/courses"><SideOption Icon={RiBookletLine} text="Courses" active /></Link>
                <Link to="/admin"><SideOption Icon={HiOutlineDocumentReport} text="Report" /></Link></>,
            4:
              <><Link to="/admin"><SideOption Icon={RiDashboardLine} text="Dashboard" /></Link>
                <Link to="/admin/schools"><SideOption Icon={MdPeopleOutline} text="Schools" /></Link>
                <Link to="/admin/courses"><SideOption Icon={RiBookletLine} text="Courses" /></Link>
                <Link to="/admin"><SideOption Icon={HiOutlineDocumentReport} text="Report" active /></Link></>,
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
