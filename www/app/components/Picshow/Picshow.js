import React from 'react';
import {connect} from "dva";

import "./Picshow.less";


import Carinfo from "./Carinfo.js";
import Albums from "./Albums.js";
import Carlikes from "./Carlikes.js";
import Smallpics from "./Smallpics.js";
import BigImgBox from "./BigImgBox.js";

class Picshow extends React.Component {

	constructor(props) {
		super(props);
		//★★★★★ 构造函数中发出请求，请求服务器的默认数据
		// 在models->picshow.js 外引用 加上模块名 picshow
		props.dispatch({"type": "picshow/init", "nowid": props.nowid});
	}


	render() {
		return (
			<div>
				<div className="picshow">
					<BigImgBox></BigImgBox>

					<div className="rightpart">

						<Carinfo></Carinfo>
						<Albums></Albums>
						<Carlikes></Carlikes>
						<Smallpics></Smallpics>

					</div>
				</div>
			</div>
		);
	}
}

export default connect(
	({picshow}) => {
		return {
			nowid: picshow.nowid
		}
	}
)(Picshow);
