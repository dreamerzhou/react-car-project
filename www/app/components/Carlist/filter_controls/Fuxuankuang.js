import React from 'react';
import {connect} from "dva";
import {Checkbox} from "antd";
const CheckboxGroup = Checkbox.Group;


class Fuxuankuang extends React.Component {

	constructor({options, propsname}) {
		super();
	}

	render() {
		return (
			<div>
				<CheckboxGroup
					options={
						// 遍历父组件传递来的 数组，返回JSON对象
						this.props.options.map((item) => {
							return {label: item, value: item}
						})
					}
					onChange={(value)=>{
						this.props.dispatch({"type": "carlist/changeFilter", "propsname": this.props.propsname, value})
					}}
					value={this.props.filters[this.props.propsname]}
				></CheckboxGroup>
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
)(Fuxuankuang)
