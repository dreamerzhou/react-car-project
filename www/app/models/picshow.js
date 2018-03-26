import * as R from "ramda";

export default {
	namespace: "picshow",
	state: {
		// 信号量
		nowid: 1000068,
		nowalbum: "view",
		nowidx: 0,
		// 数据 (数据库中请求过来的)
		carinfo: {},
		carlike: []
	},
	// 同步操作
	reducers: {
		//改变state中的nowid
		changeId(state , action){
			return R.set(R.lensProp("nowid") , action.nowid , state);
		},
		// 改变state中的carinfo
		changeCarinfo(state, action) {
			return R.set(R.lensProp("carinfo"), action.carinfo, state);
		},
		// 改变state中的nowalbum
		changeNowalbum(state, action) {
			return R.set(R.lensProp("nowalbum"), action.nowalbum, state);
		},
		// 改变state中的nowidx
		changeNowidx(state, action) {
			return R.set(R.lensProp("nowidx"), action.nowidx, state);
		},
		// 改变state中的carlike
		changeCarlike(state, action) {
			return R.set(R.lensProp("carlike"), action.carlike, state);
		}
	},
	// 异步操作
	effects: {
		*init(action, {put, call, select}) {
			//改变nowid，根据action携带的载荷改变nowid
			yield put({"type":"changeId", "nowid": action.nowid});
			// 请求服务器上 carinfo接口的数据
			const {result} = yield fetch("/carinfo/" + action.nowid).then(data=>data.json());
			// 改变state中的carinfo,  通过payload将数据库中数据传递过来更新state中的carinfo
			yield put({"type": "changeCarinfo", "carinfo": result})
			// 请求服务器上 carlike接口的数据
			const {results} = yield fetch("/carlike/" + action.nowid).then(data=>data.json());
			// 改变state中的carlike
			yield put({"type": "changeCarlike", "carlike": results})

			//改变state中的nowalbume
			yield put({"type":"changeNowalbum","nowalbum":"view"});
			//改变state中的nowidx
			yield put({"type":"changeNowidx","nowidx":0});
		},
		*changealbum(action, {put, call, select}) {
			// 改变图集
			yield put({"type": "changeNowalbum", "nowalbum": action.nowalbum});
			// 序号归零
			yield put({"type": "changeNowidx", "nowidx": 0});
		},
		// 下一页
		*goNext(action, {put, call, select}) {
			// 得到nowidx
			const {nowidx} = yield select(state=>state.picshow);
			// 得到nowalbum
			const {nowalbum} = yield select(state=>state.picshow);
			// 得到images
			const {carinfo: {images}} = yield select(state=>state.picshow);

			if (nowidx < images[nowalbum].length - 1) {
				
				yield put({"type": "changeNowidx", "nowidx": nowidx + 1})
			} else {
				// 图集顺序
				const albumarr = ["view", "inner", "engine", "more"];
				// 当前图集在数组中的位置
				var _now = albumarr.indexOf(nowalbum);
				_now++;
				// 改变到 下一个图集
				yield put({"type": "changeNowalbum", "nowalbum": albumarr[_now % 4]})
				// 序号归零
				yield put({"type": "changeNowidx", "nowidx": 0})
			}
		},
		// 上一页
		*goPrev(action, {put, call, select}) {
			// 得到nowidx
			const {nowidx} = yield select(state=>state.picshow);
			// 得到nowalbum
			const {nowalbum} = yield select(state=>state.picshow);
			// 得到images
			const {carinfo: {images}} = yield select(state=>state.picshow);
			
			if (nowidx > 0) {
				yield put({"type": "changeNowidx", "nowidx": nowidx - 1})
			} else {
				// 图集顺序
				const albumarr = ["view", "inner", "engine", "more"];
				// 当前图集在数组中的位置
				var _now = albumarr.indexOf(nowalbum);
				_now--;
				if (_now == -1) {
					_now = 3;
				}
				// 改变到 上一个图集
				yield put({"type": "changeNowalbum", "nowalbum": albumarr[_now]})
				// 序号归零
				yield put({"type": "changeNowidx", "nowidx": images[albumarr[_now]].length - 1})
				
			}
		} 
	}
}