import React from 'react';
import {Slider, Row, Col, Button} from "antd";
import {connect} from "dva";

class Km extends React.Component {

	constructor(props) {
		super(props);
		// 重新“过继”一下全局km到内部state
		this.state = {
			km: props.km
		}
	}
	// 当全局数据要改变的时候
	componentWillReceiveProps(props) {
		// 重新“过继”一下全局km到内部state
		this.setState({km : props.filters.km.map(i => {
			return i / 10000;
		})})
	}

	render() {
		return (
			<div>
				<Row gutter={8}>
					<Col span={10}>
						<Slider 
							range 
							min={0} 
							max={100}
							// 自己state
							value={this.state.km}
							onChange={(value) => {
								this.setState({"km": value})
							}}
							// 全局state
							defaultValue={this.props.filters.km.map(i => {
								return i / 10000
							})}
							onAfterChange={(value)=>{
								// value是获取到最新值，通过dispatch(action)刺激reducers，更新全局数据km
								this.props.dispatch({"type":"carlist/changeFilter" , "propsname" : "km" , "value" : value.map(i=>{
									return i * 10000;
								})})
							}}
						></Slider>
					</Col>
					<Col span={4}>
						<Button
							onClick={() => {
								this.props.dispatch({"type": "carlist/changeFilter", "propsname": "km", "value": [0, 100000]})
								this.setState({"km": [0, 10]})
							}}
						>0到10万公里</Button>
					</Col>
					<Col span={4}>
						<Button
							onClick={() => {
								this.props.dispatch({"type": "carlist/changeFilter", "propsname": "km", "value": [100000,300000]})
								this.setState({"km": [10, 30]})
							}}
						>10到30万公里</Button>
					</Col>
					
				</Row>
			</div>
		);
	}
}

export default connect(
	({carlist}) => {
		return {
			filters: carlist.filters
		}
	}
)(Km)
