import React from 'react';
import {connect} from "dva";
import {Row, Col} from "antd";

import Tags from "./filter_controls/Tags.js";
import Fuxuankuang from "./filter_controls/Fuxuankuang.js";
import Price from "./filter_controls/Price.js";
import Km from "./filter_controls/Km.js";
import Brand from "./filter_controls/Brand.js";
import Series from "./filter_controls/Series.js";
import Buydata from "./filter_controls/Buydate.js";
import Xiala from "./filter_controls/Xiala.js";

import "./Carlist.less";

export default class FilterBox extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			nowseries: []
		}
	}
	// 父组件中该函数传递给Brand组件，Brand组件中将自己的数据作为该函数参数，传递给父组件，
	// 父组件通过改变setState来影响Series组件 ★★★★★
	setNowseries(nowseries) {
		this.setState({nowseries})
	}

	render() {
		return (
			<div>
				{/*0 品牌*/}
				<Row className="row1">
					<Col span={2}>品牌：</Col>
					<Col span={22}>
						{/*封装组件 Brand*/}
						<Brand setNowseries={this.setNowseries.bind(this)}></Brand>
					</Col>
				</Row>
				{/*0 车系*/}
				<Row>
					<Col span={2}>车系：</Col>
					<Col span={22}>
						{/*封装组件 Series*/}
						<Series 
							nowseries={this.state.nowseries}
							setNowseries={this.setNowseries.bind(this)}
						></Series>
					</Col>
				</Row>
				{/*0 车型*/}
				<Row>
					<Col span={2}>车型：</Col>
					<Col span={22}>
						{/*封装组件 Fuxuankuang*/}
						<Fuxuankuang
							options={["高档轿车", "中档轿车", "经济轿车", "大型SUV", "中型SUV", "小型SUV", "面包车", "跑车"]}
							propsname="type"
						></Fuxuankuang>
					</Col>
				</Row>
				{/*1 颜色*/}
				<Row>
					<Col span={2}>颜色：</Col>
					<Col span={22}>
						{/*封装组件 Fuxuankuang*/}
						<Fuxuankuang
							// 父子组件 传递 数据，体现组件封装性
							options={['红', '白', '黑', '银', '橙', '蓝', '黄', '绿']}
							propsname="color"
						></Fuxuankuang>
					</Col>
				</Row>
				{/*2 排放标准*/}
				<Row>
					<Col span={2}>排放标准：</Col>
					<Col span={22}>
						{/*封装组件 Fuxuankuang*/}
						<Fuxuankuang
							options={['国一', '国二', '国三', '国四', '国五']}
							propsname="environmental"
						></Fuxuankuang>
					</Col>
				</Row>
				{/*3 变速箱*/}
				<Row>
					<Col span={2}>变速箱：</Col>
					<Col span={22}>
						{/*封装组件 Fuxuankuang*/}
						<Fuxuankuang
							options={["自动挡","手动挡","手自一体"]}
							propsname="gearbox"
						></Fuxuankuang>
					</Col>
				</Row>
				{/*4 排量*/}
				<Row>
					<Col span={2}>排量：</Col>
					<Col span={22}>
						{/*封装组件 Fuxuankuang*/}
						<Fuxuankuang
							options={["1.0L","1.2L","1.6L","1.6T","2.0L","2.0T","5.0L"]}
							propsname="displacement"
						></Fuxuankuang>
					</Col>
				</Row>
				{/*5 燃料*/}
				<Row>
					<Col span={2}>燃料：</Col>
					<Col span={22}>
						{/*封装组件 Fuxuankuang*/}
						<Fuxuankuang
							options={["纯电动","油电混合","汽油车","柴油车"]}
							propsname="fuel"
						></Fuxuankuang>
					</Col>
				</Row>
				{/*6 售价*/}
				<Row>
					<Col span={2}>售价：</Col>
					<Col span={22}>
						<Price></Price>
					</Col>
				</Row>
				{/*6 公里数*/}
				<Row>
					<Col span={2}>万公里：</Col>
					<Col span={22}>
						<Km></Km>
					</Col>
				</Row>
				{/*7 购买日期*/}
				<Row>
					<Col span={2}>购买日期：</Col>
					<Col span={22}>
						<Buydata></Buydata>
					</Col>
				</Row>
				{/*8 杂项*/}
				<Row>
					<Col span={2}>杂项：</Col>
					<Row>
						<Col span="6">
							<Xiala chinese="是否上牌" options={["是","否"]} propsname="licence"></Xiala>
						</Col>
						<Col span="6">
							<Xiala chinese="是否本地车" options={["是","否"]} propsname="locality"></Xiala>
						</Col>
					</Row>
				</Row>
				{/*所有 选项信息*/}
				<Row>
					<Col span={2}>当前：</Col>
					<Col span={22}>
						{/*封装组件 Tags*/}
						<Tags></Tags>
					</Col>
				</Row>
				
			</div>
		);
	}
}

