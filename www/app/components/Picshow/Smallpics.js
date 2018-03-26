import React from 'react';
import {connect} from "dva";
import classnames from "classnames";

class Smallpics extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		// ★★★★★
		if (!this.props.images) return null;
		// 显示当前页数
		const nowpage = parseInt(this.props.nowidx / 4);
		// 显示总页数
		const pageamount = Math.ceil(this.props.images[this.props.nowalbum].length / 4);

		
		// 显示ul 和 li
		const showUlLis = () => {
			var ARR = [];
			var arr = this.props.images[this.props.nowalbum]
			for (let i = 0; i < arr.length / 4; i++) {
				ARR.push(
					<ul key={i}>
						{
							arr.slice(i*4, i*4+4).map((item, index)=>{
								return <li 
									key={index} 
									className={classnames({
										"cur": this.props.nowidx == i*4 + index
									})}
									onClick={()=>{this.props.dispatch({"type":"picshow/changeNowidx" , "nowidx" : i * 4 + index})}}

								>
									<img src={`carimages_small/${this.props.nowid}/${this.props.nowalbum}/${item}`} />
								</li>
							})
						}
					</ul>
				)
			}
			return ARR;
		}
		// 显示span
		const showSpans = () => {
			var ARR = [];
			for (let i = 0; i < pageamount; i++) {
				ARR.push(
					<span 
						key={i} 
						style={{"width": 100 / pageamount + "%"}}
						className={classnames({"cur": i == nowpage})}
						onMouseEnter={(e) => {
							// 用dom拉动unit
							$(this.refs.unit).css("left", -290 * i + "px");
							$(e.target).addClass('cur').siblings().removeClass('cur');
						}}
					></span>)
			}
			return ARR;
		}

		return (
			<div>
				{/*组件4：小图展示*/}
				<div className="smallpics"
					onMouseLeave={()=>{
						// 当前所在的页
						const nowpage = parseInt(this.props.nowidx / 4);
						// DOM方法拉动unit
						$(this.refs.unit).css("left" , -290 * nowpage + "px");
						// DOM方法改变cur
						$(this.refs.pagenav).find("span").eq(nowpage).addClass('cur').siblings().removeClass('cur');

					}}
				>
					<div className="unit" ref="unit" style={{"left": -290 * nowpage + "px"}}>
						{
							showUlLis()
						}
					</div>
					<div className="pagenav" ref="pagenav">
						{
							showSpans()
						}
					</div>
				</div>
			</div>
		);
	}
}

export default connect(
	({picshow}) => {
		return {
			images: picshow.carinfo.images,
			nowalbum: picshow.nowalbum,
			nowidx: picshow.nowidx,
			nowid: picshow.nowid
		}
	}
)(Smallpics)
