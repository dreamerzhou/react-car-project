import React from 'react';
import {connect} from "dva";
import classnames from "classnames";

class Albums extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		// ★★★★★  this.props.carinfo.images第一次返回undefined，就不在渲染了
		if (!this.props.carinfo.images) return null;
		return (
			<div>
				{/*组件2：车的图片集*/}
				<div className="albums">
					<ul>
						<li
							onClick={()=>{this.props.dispatch({"type": "picshow/changealbum", "nowalbum": "view"})}}
							className={classnames({"cur": this.props.nowalbum == "view"})}>外观({this.props.carinfo.images.view.length})</li>
						<li 
							onClick={()=>{this.props.dispatch({"type": "picshow/changealbum", "nowalbum": "inner"})}}
							className={classnames({"cur": this.props.nowalbum == "inner"})}>内饰({this.props.carinfo.images.inner.length})</li>
						<li 
							onClick={()=>{this.props.dispatch({"type": "picshow/changealbum", "nowalbum": "engine"})}}
							className={classnames({"cur": this.props.nowalbum == "engine"})}>结构及发动机({this.props.carinfo.images.engine.length})</li>
						<li 
							onClick={()=>{this.props.dispatch({"type": "picshow/changealbum", "nowalbum": "more"})}}
							className={classnames({"cur": this.props.nowalbum == "more"})}>更多细节({this.props.carinfo.images.more.length})</li>
					</ul>
				</div>
			</div>
		);
	}
}

export default connect(
	({picshow}) => ({
		carinfo: picshow.carinfo,
		nowalbum: picshow.nowalbum

	})
)(Albums)
