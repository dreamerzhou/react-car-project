import React from 'react';
import {connect} from "dva";
import {Table, Row, Col} from "antd";
import moment from "moment";

class TableBox extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const columns = [
			{
				title: '订单编号',
				dataIndex: 'id',
				key: 'id',
				"sorter": true,
				"sortOrder": (()=>{
					if (this.props.sortinfo.sortby == "id") {
						return this.props.sortinfo.sortdirection == 1 ? "ascend" : "descend"
					}
					return false;
				})()
			},
			{
				title: '缩略图',
				dataIndex: 'image',
				key: 'image',
				render(text, record) {
					return <div>
						<img
							className="presmallpic" 
							src={`/carimages_small/${record.id}/view/${record.images.view[0]}`}/>
					</div>
				}
			},
			{
			  title: '品牌',
			  dataIndex: 'brand',
			  key: 'brand',
			}, 
			{
			  title: '车系',
			  dataIndex: 'series',
			  key: 'series',
			},
			 {
			  title: '颜色',
			  dataIndex: 'color',
			  key: 'color',
			},
			{
				title: '购买日期',
				dataIndex: 'buydate',
				key: 'buydate',
				render(text, record, index) {
					return <span>
						{moment(text).format("YYYY年YY月DD日")}
					</span>
				},
				"sorter": true,
				"sortOrder": (()=>{
					if (this.props.sortinfo.sortby == "buydate") {
						return this.props.sortinfo.sortdirection == 1 ? "ascend" : "descend"
					}
					return false;
				})()
			},
			{
				title: '排量',
				dataIndex: 'displacement',
				key: 'displacement'
			},
			{
				title: '燃料',
				dataIndex: 'fuel',
				key: 'fuel'
			},
			{
				title: '价格(万元)',
				dataIndex: 'price',
				key: 'price',
				"sorter": true,
				"sortOrder": (()=>{
					if (this.props.sortinfo.sortby == "price") {
						return this.props.sortinfo.sortdirection == 1 ? "ascend" : "descend"
					}
					return false;
				})()
			},
			{
				title: '公里数',
				dataIndex: 'km',
				key: 'km',
				"sorter": true,
				"sortOrder": (()=>{
					if (this.props.sortinfo.sortby == "km") {
						return this.props.sortinfo.sortdirection == 1 ? "ascend" : "descend"
					}
					return false;
				})()
			},
			{
				title: '是否上牌',
				dataIndex: 'licence',
				key: 'licence',
				render(text, record) {
					return record.licence ? <span>是</span> : <span>否</span>
				}
			}
		]; 
		return (
			<div>
				<Row>
					<Col span={6}>
						共{this.props.count}辆车符合条件 当前{this.props.pageinfo.page} / {Math.ceil(this.props.count / this.props.pageinfo.pagesize)}
					</Col>
				</Row>
				<Table 
					dataSource={this.props.cars} 
					columns={columns}
					pagination = {{
	                    current : this.props.pageinfo.page,
	                    pageSize : this.props.pageinfo.pagesize,
	                    total: this.props.count,
	                    // 用户可选择分页
	                    showSizeChanger: true
	                }}
	                onChange={(pagination, filter, sorter)=>{
	                	this.props.dispatch({
	                		"type": "carlist/changePageOrSort",
	                		"page": pagination.current,
	                		"pagesize": pagination.pageSize,
							"sortby": sorter.columnKey,
							"sortdirection": sorter.order == "ascend" ? 1 : -1
	                	})
	                }}
	                rowKey="id"
				></Table>
			</div>
		);
	}
}

export default connect(
	({carlist}) => ({
		cars: carlist.cars,
		pageinfo: carlist.pageinfo,
		count: carlist.count,
		sortinfo: carlist.sortinfo
	})
)(TableBox)
