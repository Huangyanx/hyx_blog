exports.get_dates=(req,res,next)=>{
    var has_num=req.query.has_num;
    var length=req.query.length;
    var tab=req.query.tab;
    var start=req.query.start;
        var sql2='select count(*) as num from '+tab;
        var num;
        var conn2= db.connection.query(sql2);
        conn2.on('result',function (row) {
            num=row.num;
        });

    var sql='select * from '+tab+' limit '+start+','+length;
    conn2.on('end',function () {

        var page_count=Math.ceil(num/length);
        db.connection.query(sql, function (err, result, fileds) {
            if (err) throw err;
            if (result) {
                res.json({'status': 1, 'date': result, page_count,tab});
            }
        });

    });
}