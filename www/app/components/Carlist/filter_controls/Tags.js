import React from 'react';
import {connect} from "dva";
import {Tag} from "antd";
import moment from "moment";


class Tags extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		// 词典
		const dictionary = {
			color: "颜色",
			environmental: "排放标准",
			gearbox: "变速箱",
			displacement: "排量",
			fuel: "燃料",
			price: "售价",
			km: "公里",
			brand: "品牌",
			series: "车系",
			type: "车型" ,
			buydate: "购买日期",
			licence: "是否上牌",
			locality: "是否是本地车"
		}
		return (
			<div>
				{
					Object.keys(this.props.filters).map(item => {
						// 当前选项为空时，不再preventDefault 和 dispatch
						if(this.props.filters[item].length == 0) return null;
						
						if(item == "type" || item == "color" || item == "environmental" || item == "gearbox" || item == "displacement" || item == "fuel") {
							return <Tag 
								closable
								key={item}
								onClose={(e) => {
									// 阻止元素的默认行为。清空选项后，下次选择时继续弹出
									e.preventDefault();
									this.props.dispatch({"type": "carlist/changeFilter", "propsname": item, "value": []});
								}}
							>
								{dictionary[item]}
								：
								{this.props.filters[item].join(" 或 ")}
							</Tag>
							
						} else if(item == "price") {
							// 如果数组为[0, 100]，点击叉按钮就清除  注：对象不能用比较运算符进行判断
							if (this.props.filters.price[0] == 0 && this.props.filters.price[1] == 100) return null;
							return <Tag
								closable
								key={item}
								onClose={(e) => {
									// 阻止元素的默认行为。清空选项后，下次选择时继续弹出
									e.preventDefault();
									this.props.dispatch({"type": "carlist/changeFilter", "propsname": item, "value": [0, 100]})
								}}
							>
							{dictionary[item]}
							：
							{
								this.props.filters[item].map((i) => (i+"万元")).join(" 至 ")
							}
							</Tag>
						} else if(item == "km") {
							// 如果数组为[0, 100]，点击叉按钮就清除  注：对象不能用比较运算符进行判断
							if (this.props.filters.km[0] == 0 && this.props.filters.km[1] == 1000000) return null;
							return <Tag
								closable
								key={item}
								onClose={(e) => {
									// 阻止元素的默认行为。清空选项后，下次选择时继续弹出
									e.preventDefault();
									this.props.dispatch({"type": "carlist/changeFilter", "propsname": item, "value": [0, 1000000]})
								}}
							>
							{dictionary[item]}
							：
							{
								this.props.filters[item].map((i) => (i / 10000 +"万公里")).join(" 至 ")
							}
							</Tag>
						} else if(item == "brand" || item == "series" || item == "licence" || item == "locality"){
							return <Tag 
								closable
								onClose={(e)=>{
									e.preventDefault();
									this.props.dispatch({"type":"carlist/changeFilter" , "propsname" : item , "value" : ""});
									
								}}
								key={item}
							>
								{dictionary[item]}
								： 
								{
									this.props.filters[item]
								}
							</Tag>
						} else if(item == "buydate"){
							return <Tag 
								closable
								onClose={(e)=>{
									e.preventDefault();
									this.props.dispatch({"type":"carlist/changeFilter" , "propsname" : "buydate" , "value" : []});
								}}
								key={item}
							>
								{dictionary[item]}
								： 
								{
									this.props.filters[item].map(item=>{
										return moment(item).format("YYYY年MM月DD日")
									}).join(" 到 ")
								}
							</Tag>
						}
					})
				}
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
)(Tags)
