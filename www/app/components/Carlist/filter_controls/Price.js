import React from 'react';
import {Slider, Row, Col, Button} from "antd";
import {connect} from "dva";

class Price extends React.Component {

	constructor(props) {
		super(props);
		// 重新“过继”一下全局price到内部state
		this.state = {
			price: props.price
		}
	}
	// 当全局数据要改变的时候
	componentWillReceiveProps(props) {
		// 重新“过继”一下全局price到内部state
		this.setState({"price": props.filters.price})
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
							value={this.state.price}
							onChange={(value) => {
								this.setState({"price": value})
							}}
							// 全局state
							defaultValue={this.props.filters.price}
							onAfterChange={(value)=>{
								// value是获取到最新值，通过dispatch(action)刺激reducers，更新全局数据price
								this.props.dispatch({"type": "carlist/changeFilter", "propsname": "price", value})
							}}
						></Slider>
					</Col>
					<Col span={3}>
						<Button
							onClick={() => {
								this.props.dispatch({"type": "carlist/changeFilter", "propsname": "price", "value": [0, 10]})
								this.setState({"price": [0, 10]})
							}}
						>0到10万元</Button>
					</Col>
					<Col span={3}>
						<Button
							onClick={() => {
								this.props.dispatch({"type": "carlist/changeFilter", "propsname": "price", "value": [10, 30]})
								this.setState({"price": [10, 30]})
							}}
						>10到30万元</Button>
					</Col>
					<Col span={3}>
						<Button
							onClick={() => {
								this.props.dispatch({"type": "carlist/changeFilter", "propsname": "price", "value": [30, 50]})
								this.setState({"price": [30, 50]})
							}}
						>30到50万元</Button>
					</Col>
					<Col span={3}>
						<Button
							onClick={() => {
								this.props.dispatch({"type": "carlist/changeFilter", "propsname": "price", "value": [50, 100]})
								this.setState({"price": [50, 100]})
							}}
						>50万元到100万元</Button>
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
)(Price)
