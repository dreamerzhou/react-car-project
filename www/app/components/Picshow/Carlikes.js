import React from 'react';
import {connect} from "dva";
import classnames from "classnames";

class Carlikes extends React.Component {

	constructor(props) {
		super(props);
	}
	componentDidMount() {
		// b滑块的top值
		var btop = 0;
		var self = this;
		// ul高度
		var ulheight = $(this.refs.ul).height();
		//  拖拽事件 jqueryUI draggable方法
		$(this.refs.b).draggable({
			containment: "parent",		// 限制在父盒子中拖拽
			drag(event , ui){
				btop = ui.position.top; 	//设置btop值
				//让ul上移，按比例移动
				$(self.refs.ul).css("top" , -btop * self.rate);
			} 
		});

		//鼠标滚轮
		$(this.refs.contentbox).mousewheel(function(event,delta){
			event.preventDefault();		//阻止默认事件
			btop -= delta * 8;
			//验收
			if(btop < 0) btop = 0;
			var maxtop = $(self.refs.contentbox).height() - $(self.refs.b).height();
			if(btop > maxtop) btop = maxtop;
			$(self.refs.ul).css("top" , -btop * self.rate);
			$(self.refs.b).css("top" , btop);
		});
	}
	componentDidUpdate() {
		var self = this;
		// 更新完，才有ul高度
		// 要this，是因为生命周期函数要通信
		this.ulheight = $(this.refs.ul).height();
		this.rate =  $(this.refs.ul).height() / $(this.refs.contentbox).height();
		// 按比例设置b的高度
		if (this.rate > 1) {
			$(this.refs.b).height($(this.refs.contentbox).height() / this.rate);
		} else {
			// 可省 因为b盒子没设置height
			$(this.refs.b).hide();
			$(this.refs.contentbox).mousewheel(function (event) {
				$(self.refs.ul).css("top" , 0);
				// 可省
				$(self.refs.b).css("top" , 0);
			
			})
		}

	}

	render() {

		return (
			<div>
				{/*组件3：相似类型的车*/}
				<div className="carlikes">
					<div className="headerbox">
						{
							this.props.carlike.map((item, index) => {
								return <h3 key={index}>
									更多-
									{item.brand}
									{item.series}
								</h3>
							})
						}
					</div>
					<div className="contentbox" ref="contentbox">
						<ul ref="ul">
							{
								this.props.carlike.map((item, index) => {
									return <li 
										key={item.id}
										className={classnames({
											"cur" : this.props.nowid == item.id
										})}
										onClick={()=>{
											this.props.dispatch({"type":"picshow/init" , "nowid" : item.id})
										}}
									>
										{item.color}色
										{item.price}万
										{new Date(item.buydate).getFullYear()}年
										{Math.round(item.km / 10000)}万公里
										{item.displacement}
									</li> 
								})         
							}
						</ul>
						<div className="bar">
							<b ref="b"></b>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(
	({picshow}) => {
		return {
			carlike: picshow.carlike,
			nowid: picshow.nowid
		}
	}
)(Carlikes)
