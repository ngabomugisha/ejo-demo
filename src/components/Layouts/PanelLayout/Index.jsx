import React from "react";
import { connect } from "react-redux";
import "./PanelLayout.css";
import SideMenu from "../../sideMenu/SideMenu";
import RightSide from "../../rightSide/RightSide";
import StickyBox from "react-sticky-box";
import FeedHead from "../../feed/FeedHead";
import { TEACHER, SCHOOLADMIN } from "../../../pages/Auth/Users";

const PanelLayout = (props) => {
	let school = null;
	let role = null;
	if (props.state.auth != undefined) {
		if (props.state.auth.user != undefined) {
			school = props.state.auth.user.school;
			role = props.state.auth.user.role;
		}
	}
	function renderSwitch(role) {
		switch (role) {
			case TEACHER:
				return (
					<>
						<div className="feed">
							<FeedHead />
							{props.children && props.children}
						</div>
						<div className="right-side">
							<StickyBox>
								<RightSide />
							</StickyBox>
						</div>
					</>
				);
				break;
			default:
				return (
					<>
						<div className="main-panel">{props.children && props.children}</div>
					</>
				);
				break;
		}
	}
	return (
		<div className="panel-layout-container">
			<div className="side-menu">
				<SideMenu selected={props.selected} role={role} />
			</div>
			{renderSwitch(role)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	state: state,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PanelLayout);
