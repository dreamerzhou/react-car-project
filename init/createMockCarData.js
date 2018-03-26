/**
 * 这个文件用来创建汽车的数据，以carbasedata.json文件为基本数据，拓展数据
 */

const path = require("path");
const fs= require("fs");
const _ = require("lodash");

//基数据的文件的路径
const carbasedataFilePath = path.resolve(__dirname , "./carbasedata.json");
//生成的文件的路径
const writeDataFilePath = path.resolve(__dirname , "./cardata.json");
//图集的目录的路径
const carimagesPath = path.resolve(__dirname , "../www/carimages/");


//用fs模块读取这个基数据文件，为了避免回调套回调，此时我们采用同步命令readFileSync
var arr = JSON.parse(fs.readFileSync(carbasedataFilePath).toString());

//arr是一个长度是100的数组，遍历，补充一些属性
for(var i = 0 ; i < arr.length ; i++){
	arr[i].price = _.random(0 , 1000) / 10;														//售价（万元）
	arr[i].km = _.random(0 , 1000000);															//公里数（公里）
	arr[i].gearbox = _.sample(["自动挡","手动挡","手自一体"]);									//变速箱
	arr[i].displacement  = _.sample(["1.0L","1.2L","1.6L","1.6T","2.0L","2.0T","5.0L"]);		//排量
	arr[i].fuel = _.sample(["纯电动","油电混合","汽油车","柴油车"]);							//燃料
	arr[i].buydate = Date.parse(new Date(2018,0,1)) - _.random(0 , 20 * 365 * 86400 * 1000);	//购买日期（时间戳，是最近20年的一个随机日期）
	arr[i].licence = _.sample([true , false]);													//是否有牌照
	arr[i].locality = _.sample([true , false]);													//是否是本地车
	arr[i].environmental = _.sample(["国一","国二","国三","国四","国五"]);					//环保等级
	arr[i].images = {
		"view" 		: fs.readdirSync(carimagesPath + "/" + arr[i].id + "/view"),
		"inner" 	: fs.readdirSync(carimagesPath + "/" + arr[i].id + "/inner"),
		"engine" 	: fs.readdirSync(carimagesPath + "/" + arr[i].id + "/engine"),
		"more" 		: fs.readdirSync(carimagesPath + "/" + arr[i].id + "/more")
	}
}

//写入一个文件
for(var i = 0 ; i < arr.length ; i++){
	fs.appendFileSync(writeDataFilePath , JSON.stringify(arr[i]) + "\r\n");
}

console.log("文件创建完毕");