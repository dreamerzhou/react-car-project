import React from 'react';
import {Tabs} from "antd";
const TabPane = Tabs.TabPane;
import {connect} from "dva";
import classnames from "classnames";

class Brand extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			options: {}
		}
		// 拉取接口
		this.loadServer((result) => {			
			this.setState({
				options: result
			})
		});
	}
	// 拉取接口 将result中的数据 key和value 通过内部state 应用到 DOM中 ★★★★★
	async loadServer(callback) {
		const result = await fetch("/brandandseries").then(data=>data.json());
		callback(result)
	}

	render() {
		return (
			<div>
				<Tabs defaultActiveKey="1" onChange={()=>{}}>
					{
						Object.keys(this.state.options).map((keyname)=>{
							return <TabPane tab={keyname} key={keyname}>
								{
									this.state.options[keyname].map((item, index)=>{
										var k = Object.keys(item)[0];
										var v = Object.values(item)[0];
										return <em 
											key={index} 
											onClick={() => {
												this.props.setNowseries(v)
												// 全局数据
												this.props.dispatch({"type": "carlist/changeFilter", "propsname": "brand", "value": k})
											}}
											className={classnames({"cur" : this.props.filters.brand == k})}

										>
											{k}
										</em>
									})
								}
							</TabPane>
						})
					}
					
				</Tabs>
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
)(Brand)
