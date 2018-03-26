import React from "react";
import dva from "dva";
import logger from "redux-logger";

import App from "./containers/App.js";
import picshow from "./models/picshow.js";
import carlist from "./models/carlist.js";

var app = dva({
	onAction: logger
});


// 注册路由
const router = () => <App></App>;
app.router(router);

// 注册model
app.model(picshow);
app.model(carlist);

// 挂载
app.start("#app");

