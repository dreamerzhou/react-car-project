import React from 'react';
import {connect} from "dva";

class BigImgBox extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loaded: false
		}
	}
	// ★★★★★ 图片切换 懒加载功能
	componentWillReceiveProps(nextProps) {
		if(!nextProps.images) return;
		// 用小图充当
		$(this.refs.bigimg).attr("src", `carimages_small/${nextProps.nowid}/${nextProps.nowalbum}/${nextProps.images[nextProps.nowalbum][nextProps.nowidx]}`);

		// 发出对image的请求，得到image的load事件回调
		var image = new Image();
		image.src = `carimages/${nextProps.nowid}/${nextProps.nowalbum}/${nextProps.images[nextProps.nowalbum][nextProps.nowidx]}`;
		var self = this;
		image.onload = function () {
			$(self.refs.bigimg).attr("src", image.src);
			// 隐藏loading图片
			self.setState({
				loaded: true
			})
		}

		// **********实现预先加载***********
		// 数组concat方法把图片队列连接起来
		const allarr = nextProps.images.view.concat(nextProps.images.inner, nextProps.images.engine, nextProps.images.more);
		// 合并图集中找到当前总序号
		const zongxuhao = allarr.indexOf(nextProps.images[nextProps.nowalbum][nextProps.nowidx])
		// 循环终点
		const end = zongxuhao + 5 < allarr.length ? zongxuhao + 5 : allarr.length;
		// 文件夹数组
		const dirarr = [].concat(
			new Array(nextProps.images.view.length).fill("view"),
			new Array(nextProps.images.inner.length).fill("inner"),
			new Array(nextProps.images.engine.length).fill("engine"),
			new Array(nextProps.images.more.length).fill("more")
		);
		// 预先加载后面5张
		for (var i = zongxuhao; i < end; i++) {
			var _image = new Image();
			_image.src = `carimages/${nextProps.nowid}/${dirarr[i]}/${allarr[i]}`; 
		}
		// **********实现预先加载***********
		// 向函数外暴露两个数值。 副作用，可以使用在视图上
		this.zongxuhao = zongxuhao;
		this.zongshu = allarr.length;
	}


	render() {
		// !undefined
		if (!this.props.images) return null;
		return (
			<div className="bigImgBox">
				<div className="inner">
					{/*大图*/}
					<img ref="bigimg" className="bigimg" />

					{/*大图 上一页*/}
					<div className="leftbtn"
						onClick={()=>{
							this.props.dispatch({"type": "picshow/goPrev"})
							// 点击按钮时让文字出现
							this.setState({
								loaded: false
							})
						}}
					></div>
					{/*大图 下一页*/}
					<div className="rightbtn"
						onClick={()=>{
							this.props.dispatch({"type": "picshow/goNext"})
							// 点击按钮时让文字出现
							this.setState({
								loaded: false
							})
					}}
					></div>
					{
						!this.state.loaded
						?
						<div className="loadtip">努力加载中...</div>
						:
						null
					}
					<div className="nobox">
						{/*副作用*/}
						{this.zongshu} / {this.zongxuhao}
					</div>
				</div>	
			</div>
		);
	}
}
export default connect(
	({picshow}) => {
		return {
			nowid: picshow.nowid,
			nowidx: picshow.nowidx,
			nowalbum:picshow.nowalbum,
			images: picshow.carinfo.images

		}
	}
)(BigImgBox)
