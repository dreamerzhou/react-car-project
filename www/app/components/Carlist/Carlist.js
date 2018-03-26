import React from 'react';
import {connect} from "dva";

import FilterBox from "./FilterBox.js";
import TableBox from "./TableBox.js";

class Carlist extends React.Component {


	constructor(props) {
		super(props);
		//调用默认数据
		props.dispatch({"type": "carlist/init"})
	}

	render() {
		return (
			<div>
				<FilterBox></FilterBox>
				<TableBox></TableBox>
			</div>
		);
	}
}
export default connect(
	
)(Carlist)