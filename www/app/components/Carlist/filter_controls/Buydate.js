import React from 'react';
import { DatePicker , Button , Row , Col} from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
import moment from "moment";
import {connect} from "dva";

class Buydate extends React.Component {
	 
	constructor(props) {
		super(props);
	}

	render() {
		const buydate = this.props.filters.buydate;
		return (
			<div>
				<Row>
					<Col span="6">
						<RangePicker 
							allowClear={false}
							value={[moment(buydate[0]) , moment(buydate[1])]}
							onChange={(value)=>{
								//value是数组，数组中的两个项都是moment对象
								this.props.dispatch({
									"type": "carlist/changeFilter" , 
									"propsname" : "buydate", 
									"value" : [value[0].unix() * 1000 , value[1].unix() * 1000]
								});
							}} 
							placeholder="adsf"
						/>
					</Col>
					<Col  span="1"></Col>
					<Col span="3">
						<Button onClick={()=>{
							this.props.dispatch({
								"type":"carlist/changeFilter" , 
								"propsname" : "buydate" , 
								"value" : [Date.parse(new Date()) - 365 * 86400 * 1000,Date.parse(new Date())]
							})
						}}>
							近1年的车
						</Button>
					</Col>
					<Col span="3">
						<Button onClick={()=>{
							this.props.dispatch({
								"type":"carlist/changeFilter" , 
								"propsname" : "buydate" , 
								"value" : [Date.parse(new Date()) - 2 * 365 * 86400 * 1000,Date.parse(new Date())]
							})
						}}>
							近2年的车
						</Button>
					</Col>
					<Col span="3">
						<Button onClick={()=>{
							this.props.dispatch({
								"type":"carlist/changeFilter" , 
								"propsname" : "buydate" , 
								"value" : [Date.parse(new Date()) - 3 * 365 * 86400 * 1000,Date.parse(new Date())]
							})
						}}>
							近3年的车
						</Button>
					</Col>
				</Row>
			</div>
		);
	}
}

export default connect(({carlist})=>({
	filters : carlist.filters
}))(Buydate);