const path = require('path');

module.exports = {
	entry: "./www/app/main", 		//入口文件
	output: {
		path: path.resolve(__dirname, "www/dist"),  //出口文件的路径
		filename: "bundle.js" 						//出口文件的文件名
	},
	mode: "development",
	watch : true,
	module: {
		rules: [
			{
				test: /\.js$/,
				include: [
					path.resolve(__dirname, "www/app")
				],
				exclude: [
					path.resolve(__dirname, "node_modules")
				],
				loader: "babel-loader",
				options: {
          			presets: ["env","react"],
          			plugins : ["transform-object-rest-spread","transform-runtime"]
        		}
			},
			{
				test : /\.less$/,
			
				use: [
					{
	                	loader: "style-loader" // creates style nodes from JS strings
	            	}, 
	            	{
	                	loader: "css-loader" // translates CSS into CommonJS
	            	}, 
	            	{
	                	loader: "less-loader"
	            	}
            	]
			}
		]
	}
}