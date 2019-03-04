//node + mysql后台设定
var express = require('express');   //引入express模块
var mysql = require('mysql');     //引入mysql模块
var app = express();        //创建express的实例
var cors = require('cors')
var url=require('url');

const bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })


var connection = mysql.createConnection({      //创建mysql实例
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'number_game',
    port: '3306'
});




connection.connect(function (err) {
    if (err) {
        console.log('error when connecting to db:', err);
        setTimeout(handleError , 2000);
    }
});

connection.on('error', function (err) {
    console.log('db error', err);
    // 如果是连接断开，自动重新连接
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        handleError();
    } else {
        throw err;
    }
});

var sql = 'SELECT * FROM memo';
var str = " ";
connection.query(sql, function (err,result) {
    if(err){
        console.log('[SELECT ERROR]:',err.message);
    }
    str = JSON.stringify(result);
    //数据库查询的数据保存在result中，但浏览器并不能直接读取result中的结果，因此需要用JSON进行解析
    //console.log(result);   //数据库查询结果返回到result中
    console.log(str);
});








app.use(cors({
    origin:['http://localhost:8888'],
    methods:['GET','POST'],
    alloweHeaders:['Conten-Type', 'Authorization']
}));

app.use(bodyParser.urlencoded({
    extended: false
  }))

app.get('/',function (req,res) {
    res.send(str);  //服务器响应请求
    return res;
});



//POST 一次记录
app.post('/add', urlencodedParser, function (req, res) {

    var sql = 'SELECT * FROM memo';
    // 输出 JSON 格式
    response = {
        memo:req.body.time,
        level:req.body.level,
        step:req.body.step1,
        time:req.body.time1,
    };
    console.log(response.memo)
    connection.query("insert into memo(memo,level,step,time) values('"+response.memo+"','"+ response.level+"','"+response.step+"','"+response.time +"')",function(err,rows){
        if(err){
            res.send("新增失败"+err);
        }else {
            res.send("新增成功")
        }
    });
    var modSql = "UPDATE memo SET level = '"+response.level+"',step = '"+response.step+"',time='"+response.time+"' WHERE memo ='"+response.memo+"' ?";
    connection.query(modSql,modSqlParams,function (err, result) {
     if(err){
         console.log('[UPDATE ERROR] - ',err.message);
         return;
   }        

});
     return;
 })
 


app.listen(3000);