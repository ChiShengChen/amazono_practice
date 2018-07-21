/*
建立完後在資料夾中運行 npm init、將該資料夾轉成一個 node 專案。
npm init 的動作會為此專案創建一些設定，並將這些資訊存在一個叫 package.json 的檔案中。
在 package.json 這個檔案中，使用者可以定義應用名稱 (name)、應用描述 (description)、關鍵字 (keywords)、版本號 (version)、應用配置 (config)、主頁 (homepage)、作者(author)、版本庫 (repository)、bug的提交地址 (bugs)、授權方式(licenses)… 等。
*/

const express = require('express'); //express是node.js中一個web開發框架
const morgan = require('morgan');  //morgan是express默認的日誌模組，也可以脫離express，作為node.js的日誌組件單獨使用
const bodyParser = require('body-parser'); //body-parser是非常常用的一個express模組，作用是對post請求的請求體進行解析。
const mongoose = require('mongoose'); //mangoDB的ORM
const cors = require('cors');


const config = require('./config'); //使用同路徑下的config.js

const app = express(); //建立一個Express伺服器


mongoose.connect(config.database, err => {      // 等於(箭頭函式)： => { return expression; }
	if (err) {
		console.log(err);
	} 
	else {
		console.log('Connected to the database successedfully');
	}
});


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false}));
app.use(morgan('dev'));
app.use(cors());

//http://localhost:3030 網頁會顯示 app.get 中的東西
/*req 是 Request 物件，存放這此請求的所有資訊
res 是 Response 物件，用來回應該請求
next 用來控制流程*/
app.get('/', (req, res, next) => {
	res.json({
		user: 'Michael Meow'
	});
});


//開啟server 監聽port3030  在cmd server資料夾下 node server.js執行server
app.listen(3030, err => {
	console.log('Meow magic www on port' + config.port);
});