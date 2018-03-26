var mongoose = require("mongoose");

// model文件，参数一是model名 参数二是一个schema，定义数据结构的
module.exports = mongoose.model("Car" , {
	"id" : Number , 
	"brand" : String,
	"series" : String,
	"color" : String,
	"price" : Number,
	"km" : Number,
	"gearbox" : String,
	"displacement" : String,
	"fuel" : String,
	"buydate" : Number,
	"licence" : Boolean,
	"locality" : Boolean,
	"environmental" : String,
	"images" : Object,
	"type": String
});