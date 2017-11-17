/**
 * Created by Administrator on 2017/10/16.
 */
exports.htmlspecialchars_decode=htmlspecialchars_decode;
exports.htmlspecialchars=htmlspecialchars;

//将HTML字符串转成HTML
function htmlspecialchars_decode(str){
             str = str.replace(/&amp;/g, '&');
             str = str.replace(/&lt;/g, '<');
             str = str.replace(/&gt;/g, '>');
             str = str.replace(/&quot;/g, "''");
             str = str.replace(/&#039;/g, "'");
             return str;
   }
//将HTML转成HTML字符串
function htmlspecialchars(str) {
              var s = "";
              if (str.length == 0) return "";
              for   (var i=0; i<str.length; i++)
              {
                  switch (str.substr(i,1))
                  {
                      case "<": s += "&lt;"; break;
                      case ">": s += "&gt;"; break;
                      case "&": s += "&amp;"; break;
                      case " ":
                          if(str.substr(i + 1, 1) == " "){
                              s += " &nbsp;";
                              i++;
                          } else s += " ";
                          break;
                      case "\"": s += "&quot;"; break;
                      case "\n": s += "<br>"; break;
                      default: s += str.substr(i,1); break;
                  }
              }
    return s;
}