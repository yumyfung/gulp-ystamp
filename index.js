// PLUGIN_NAME: gulp-ystamp
// Vision: 1.0.0
// author: yumyfung
// date: 2015-05-07
var through = require('through-gulp');
var fs = require('fs');
var _path = require('path');

function yStamp(option) {

  var reg = /(\b(?=background|background-image)[^;{}\n]+?url\([^;{}\n]+?)\)/g;
  var sourceArr = [];

  var stream = through(function(file, encoding, callback) {
      if (file.isNull()) {

      }
      if (file.isBuffer()) {
        sourceArr.push(file);
      }
      if(file.isStream()) {

      }
      callback();
    }, function(callback){
        var backgroundImgs = [];
        var that = this;
        for(var i = 0, len = sourceArr.length; i < len; i++){
          var source = sourceArr[i].contents.toString().replace(reg, function($0, $1){
            var arr = [];
            if(option && option.stamp && typeof option.stamp == 'object'){
              for(var key in option.stamp){
                if(option.stamp[key] && typeof option.stamp[key] == 'string'){
                  arr.push(key + '=' + option.stamp[key]);
                }
              }
            }
            if(arr.length){
              $0 = $0.replace($1, $1 + '?' + arr.join('&'));
            }
            $1.replace(/\(.*?(\S.+\b)/, function($s0, $s1){
                backgroundImgs.push(getBackgroundImgPath(sourceArr[i].path, $s1));
                return $s0;
            })
            console.log('add stamp-->'+$0);
            return $0;
        });
        sourceArr[i].contents = new Buffer(source);
        that.push(sourceArr[i]);
      }
      callback();
      option.callback && typeof option.callback == 'function' ? option.callback(stream, backgroundImgs) : '';
    });

  return stream;
      
}

//寻找背景图片的绝对路径
function getBackgroundImgPath(cssPath, imgPath){
  var imgPathArr = imgPath.split('/');
  var newImgPathArr = [];
  cssPath = _path.dirname(cssPath);
  for(var i = 0, len = imgPathArr.length; i < len; i++){
    if(imgPathArr[i] == '..'){
      cssPath = _path.dirname(cssPath);
    }else {
      newImgPathArr.push(imgPathArr[i]);
    }
  }
  return _path.normalize(_path.join(cssPath, newImgPathArr.join('/')));
}


module.exports = yStamp;