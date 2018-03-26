import React from 'react';
import {Menu, Dropdown , Button , Icon} from "antd";
import {connect} from "dva";

class Xiala extends React.Component {
	 
	constructor(props) {
		super(props);
	}

	render() {
		const menu = (
			<Menu onClick={(value)=>{
				this.props.dispatch({"type":"carlist/changeFilter" , "propsname" : this.props.propsname , "value" : value.key})
			}}>
				{
					this.props.options.map(item=>{
						return <Menu.Item key={item}>{item}</Menu.Item>
					})
				}
			</Menu>
		);

		return (
			<div>
				{this.props.chinese}：
				<Dropdown overlay={menu}>
					<Button style={{ marginLeft: 8 }}>
						{this.props.filters[this.props.propsname] || "无所谓"} 
						<Icon type="down" />
					</Button>
				</Dropdown>
			</div>
		);
	}
}

export default connect(
	({carlist}) => ({
		filters : carlist.filters
	})
)(Xiala);