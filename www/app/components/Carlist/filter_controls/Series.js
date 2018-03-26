import React from 'react';
import {connect} from "dva";
import classnames from "classnames";

class Series extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(nextProps){
		//思路：如果全局的brand是空白了，此时就要告诉父亲要把数组置位空
		//也通知全局将车系的过滤器变为""
		//为了防止死循环，必须验证brand这一次改变才置空
		if(nextProps.filters.brand == "" && this.props.filters.brand != ""){
			this.props.setNowseries([]);
			this.props.dispatch({"type":"carlist/changeFilter" , "propsname" : "series" , "value" : ""});
		}
	}

	render() {
		return (
			<div>
				{
					this.props.nowseries.map((item) => {
						return <em 
							key={item}
							onClick={() => {
								//告诉全局
								this.props.dispatch({"type": "carlist/changeFilter", "propsname": "series", "value": item})
							}}
							className={classnames({"cur" : this.props.filters.series == item})}
						>
							{item}
						</em>
					})
				}
			</div>
		);
	}
}
export default connect(({carlist})=>({
	filters : carlist.filters
}))(Series);
