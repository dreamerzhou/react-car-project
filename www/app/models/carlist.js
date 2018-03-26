import * as R from "ramda";
import {fetchServer} from "./utils/server.js";

export default {
	namespace: "carlist",
	state : {
		// 发送到服务器的数据
		"filters" : {
			"brand" : "",
			"series" : "",
			"type" : [],
			"color" : [] ,
			"environmental" : [] ,
			"gearbox" : [],
			"displacement" : [],
			"fuel" : [],
			"price" : [0,100],
			"km" : [0,1000000],
			"buydate" : [],
			"licence" : "",
			"locality" : ""
		},
		"pageinfo": {
			"page": 1,
			"pagesize": 10
		},
		"sortinfo": {
			"sortby": "id",
			"sortdirection": 1  // 1升序 -1倒序
		},
		// 得到服务器返回的数据
		"cars" : [],
		"count" : 0
	},

	reducers: {
		changeFilter_sync(state, {propsname, value}) {
			return R.set(R.lensProp("filters"), R.set(R.lensProp(propsname), value, state.filters), state);
		},
		changePage_sync(state, {page = state.pageinfo.page}) {
			return R.set(R.lensProp("pageinfo"), R.set(R.lensProp("page"), page, state.pageinfo), state);
		},
		changePagesize_sync(state, {pagesize = state.pageinfo.pagesize}) {
			return R.set(R.lensProp("pageinfo"), R.set(R.lensProp("pagesize"), pagesize, state.pageinfo), state);
		},
		changeSortby_sync(state, {sortby = state.sortinfo.sortby}) {
			return R.set(R.lensProp("sortinfo"), R.set(R.lensProp("sortby"), sortby, state.sortinfo), state);
		},
		changeSortdirection_sync(state, {sortdirection = state.sortinfo.sortdirection}) {
			return R.set(R.lensProp("sortinfo"), R.set(R.lensProp("sortdirection"), sortdirection, state.sortinfo), state);
		},

		changeCars(state, {cars}) {
			return R.set(R.lensProp("cars"), cars, state);
		},
		changeCount(state, {count}) {
			return R.set(R.lensProp("count"), count, state);
		}
	},
	effects: {
		* changeFilter({propsname, value}, {put, call, select}) {
			// 调用同步				① 改变筛选器
			yield put({"type": "changeFilter_sync", propsname, value})
			// 得到当前的过滤情况		② 得到最新的筛选器
			var {filters} = yield select(data=>data.carlist);
			// 得到当前的分页情况
			var {pageinfo} = yield select(data => data.carlist);
			// 得到当前的排序情况
			var {sortinfo} = yield select(data=>data.carlist);
			// 请求服务器提供cars 封装出去提高fetch方法的复用性，用call调用 ③ 发出请求带着最新的筛选器信息
			var {results, count} = yield call(fetchServer, filters, pageinfo, sortinfo);
			// 改变
			yield put({"type": "changeCars", "cars": results});
			yield put({"type": "changeCount", "count": count});
		},
		// 初始化
		* init (action, {put, call, select}) {
			// 得到当前过滤情况
			var {filters} = yield select(data=>data.carlist);
			// 得到当前的分页情况
			var {pageinfo} = yield select(data => data.carlist);
			// 得到当前的排序情况
			var {sortinfo} = yield select(data=>data.carlist);
			// 请求服务器提供cars
			var {results, count} = yield call(fetchServer, filters, pageinfo, sortinfo);
			// 改变
			yield put({"type": "changeCars", "cars": results})
			yield put({"type": "changeCount", "count": count})
		},
		// 改变分页和排序
		* changePageOrSort({page, pagesize, sortby, sortdirection}, {put, call, select}) {
			// 得到现在的pagesize情况，看看用户是不是要更改pagesize
			var {pageinfo} = yield select(data=>data.carlist);
			var {sortinfo} = yield select(data=>data.carlist);
			// 根据用户传入的pagesize值和当前的值进行比较，如果用户更改了pagesize，此时将page变为1
			if(pagesize) {
				// 如果pagesize存在
				page = pagesize != pageinfo.pagesize ? 1 : page;
			}
			// 根据用户传入的sortby值和当前的值进行比较，如果用户更改了sortby，此时将page变为1
			if(sortby) {
				page = sortby != sortinfo.sortby ? 1 : page;
			}
			if (sortdirection) {
				page = sortdirection != sortinfo.sortdirection ? 1 : page;
			}
			// 调用同步，改变page、pagesize 和 sortby、sortdirection  ① 改变筛选器
			yield put({"type": "changePage_sync", page});
			yield put({"type": "changePagesize_sync", pagesize});
			yield put({"type": "changeSortby_sync", sortby});
			yield put({"type": "changeSortdirection_sync", sortdirection});
			// 得到当前过滤情况		② 得到最新的筛选器
			var {filters} = yield select(data=>data.carlist);
			//得到当前的分页情况
			var {pageinfo} = yield select(data => data.carlist);
			// 得到当前的排序情况
			var {sortinfo} = yield select(data => data.carlist);
			// 请求服务器提供cars
			var {results, count} = yield call(fetchServer, filters, pageinfo, sortinfo);
			// 改变
			yield put({"type": "changeCars", "cars": results});
			yield put({"type": "changeCount", "count": count});
		},
	}
}