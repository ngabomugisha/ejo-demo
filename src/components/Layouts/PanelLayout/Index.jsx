import React from 'react'
import { connect } from 'react-redux'
import './PanelLayout.css'
import SideMenu from '../../sideMenu/SideMenu'
import RightSide from '../../rightSide/RightSide'
import StickyBox from "react-sticky-box";
import FeedHead from '../../feed/FeedHead';
import { TEACHER, SCHOOLADMIN } from '../../../pages/Auth/Users'

const PanelLayout = (props) => {

    function renderSwitch(role) {
        switch (role) {
            case TEACHER:
                return <>
                    <div className='feed'>
                        <FeedHead />
                        {props.children}
                    </div>
                    <div className='right-side'>
                        <StickyBox>
                            <RightSide />
                        </StickyBox>
                    </div>
                </>
                break;

            default:
                return <>
                    <div className='main-panel'>
                        {props.children}
                    </div>
                </>
                break;
        }
    }

    return (
        <div className="panel-layout-container">
            <div className='side-menu'>

                <StickyBox>
                    <SideMenu selected={props.selected} role={props.state.auth.user.role} />
                </StickyBox>
            </div>
            {renderSwitch(props.state.auth.user.role)}
        </div>
    )
}

const mapStateToProps = (state) => ({
    state: state
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(PanelLayout)
