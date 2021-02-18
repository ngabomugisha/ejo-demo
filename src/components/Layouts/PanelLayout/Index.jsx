import React from 'react'
import './PanelLayout.css'
import SideMenu from '../../sideMenu/SideMenu'
import RightSide from '../../rightSide/RightSide'
import StickyBox from "react-sticky-box";
import FeedHead from '../../feed/FeedHead';


const PanelLayout = (props) => {


    return (
        <div className="container">
            <div className='side-menu'>

                <StickyBox>
                    <SideMenu selected={props.selected} role={props.role} />
                </StickyBox>
            </div>
            {
                props.role === "teacher" ? 
                <>
                    <div className='feed'>
                        <FeedHead />
                        {props.children}
                    </div>
                    <div className='right-side'>
                        <StickyBox>
                            <RightSide />
                        </StickyBox>
                    </div></> :
                <>
                <div className='main-panel'>
                    {props.children}
                </div>
                </>
            }
        </div>
    )
}

export default PanelLayout
