import React from 'react';
import {connect} from "dva";

class Carinfo extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				{/*组件1：车的信息*/}
				<div className="carinfo">
					<h1>
						{this.props.carinfo.brand}
						{this.props.carinfo.series}
						<small>[{this.props.nowid}]</small>
					</h1>
					<h3>
						{this.props.carinfo.color}色
						{this.props.carinfo.price}万
						{new Date(this.props.carinfo.buydate).getFullYear()}年
						{Math.round(this.props.carinfo.km / 10000)}万公里
						{this.props.carinfo.displacement}
					</h3>
				</div>
			</div>
		);
	}
}

export default connect(
	({picshow}) => {
		return {
			carinfo: picshow.carinfo,
			nowid: picshow.nowid
		}
	}
)(Carinfo)
