//userApi中的每个函数，连接到sqlMap.js里的一个sql语句进行对数据库的操作

var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();




// 增加记录
router.post('/addmemo', (req, res) => {
    var sql = $sql.memo.add;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.current_time, params.step1,params.time1], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

//将记录打印出来
router.get('/api/getmemo', (req, res, next) => {
    res.json({
        data: '后台返回结果 getArticle'
      })
  })

module.exports = router;