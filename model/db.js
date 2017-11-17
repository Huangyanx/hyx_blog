/**
 * Created by Administrator on 2017/10/8.
 */
var mysql=require('mysql');

var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'h_blog',
    charset:'utf8'
});
exports.connection=connection;
