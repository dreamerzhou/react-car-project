var express = require("express");
var app = express();
var formidable = require("formidable");

// 链接数据库
var mongoose = require("mongoose");
mongoose.connect("localhost/ershouche");

// 引入模型文件
var Car = require("./models/Car.js"); 

app.use(express.static("www"));

// 接口1 实现汽车信息接口   查询某一个id车的信息
app.get("/carinfo/:id", (req, res)=>{
	var id = req.params.id;
	// 查询数据库
	Car.find({"id": id}).exec((err, results)=>{
		res.json({"result": results[0]})
	})
})

// 接口2
app.get("/carlike/:id", (req, res) => {
	var id = req.params.id;
	Car.find({id}).exec((err, results)=>{
		var brand = results[0].brand;
		var series = results[0].series;
		Car.find({brand, series}).exec((err, results)=>{
			res.json({results})
		})
	})
})

// 接口3 全部的品牌和车系
app.get("/brandandseries", function (req, res) {
	res.json({
		"A" : [
			{"奥迪": ["A4L", "A6L", "Q5", "Q7"]}
		],
		"B" : [
			{"宝马": ["3系", "5系", "X5", "X6"]},
			{"奔驰": ["A级", "C级", "E级", "GLK级"]}
		],
		"D" : [
			{"大众": ["高尔夫", "帕萨特"]}
		],
		"F" : [
			{"丰田": ["凯美瑞", "卡罗拉", "汉兰达"]}
		],
		"R" : [
			{"日产": ["骐达", "逍客", "天籁"]}
		]
	})
})
// 接口4 查询车辆 
app.post("/cars", function (req, res) {
	var form = new formidable.IncomingForm();
	form.parse(req , (err , {filters, pageinfo, sortinfo}) => {
		//查询对象
		var chaxunduixiang = {};
		//修正一些词语：将前端发来的“是”、“否”变为true、false
		if(filters.licence != ""){
			filters.licence = filters.licence == "是" ? true : false;
		}
		if(filters.locality != ""){
			filters.locality = filters.licence == "是" ? true : false;
		}
		//根据前端发来的对象，拼一个查询体
		for(var k in filters){
			// 精确匹配
			if(
				k == "brand" || 
				k == "series" ||
				k == "type" || 
				k == "color" || 
				k == "environmental" || 
				k == "gearbox" || 
				k == "displacement" || 
				k == "fuel"
			){
				if(filters[k].length != 0){
					chaxunduixiang[k] = filters[k];
				}
			}
			// 范围匹配
			if(
				k == "price" ||
				k == "km" ||
				k == "buydate"
			){
				if (filters[k].length != 0) {
					chaxunduixiang[k] = { "$gte": filters[k][0], "$lte": filters[k][1]}
				}
			}
		}
		// 得到页面的分页信息 ★★★★★
		var page = pageinfo.page;
		var pagesize = pageinfo.pagesize;
		// 得到页面的排序信息 ★★★★★
		var sortby = sortinfo.sortby;
		var sortdirection = sortinfo.sortdirection;
		// 进行总量的计算
		Car.count(chaxunduixiang, (err, count) => {
			//进行查询
			Car.find(chaxunduixiang).sort({[sortby]: sortdirection}).skip(pagesize * (page-1)).limit(pagesize).exec((err , docs) => {
				res.json({
					"count": count, // 数量 
					"results" : docs // 结果
				})
			})
		})
	});
})

app.listen(3000, (err) => {
	console.log("run at 3000 port");
})