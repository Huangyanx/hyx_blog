function isNumberOrLetter( s ){//判断是否是数字或字母
    var regu = "^[0-9a-zA-Z]+$";
    var re = new RegExp(regu);
    if (re.test(s)) {
    return true;
    }else{
    return false;
    }
}
