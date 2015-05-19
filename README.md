# gulp-ystamp
gulp插件gulp-ystamp，给样式中的背景图片添加时间戳等参数设置。
## 安装
```
npm install --save-dev gulp-ystamp
```
## 参数
stamp：参数对象，可以设置任意想添加的参数key和value

callback(stream, backgroundImgs)：回调函数，返回stream流和每个样式文件中的所有图片数组集合
## 使用
```Javascript
var gulp = require('gulp');
var yStamp = require('gulp-ystamp');

gulp.src('style/*.css').pipe(yStamp({
    stamp: {
        max_age: '2592000',
        d: (new Date()).format("yyyyMMddhhmmss")
    },
    callback: function(stream, backgroundImgs){
        stream.pipe(gulp.dest('style/output'));
    }
}));

Date.prototype.format = function(fmt){ 
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)))   
  return fmt;   
}
```
## 效果
使用前样式：
```
.test {background-image:url(slice/black_btn_play.png)}
```
使用后样式：
```
.test {background-image:url(slice/black_btn_play.png)?max_age=2592000&d=20150514221347}
```
