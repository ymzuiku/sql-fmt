!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).fmt=t()}(this,function(){"use strict";var t,r,e,a,n="v"+Date.now(),u="insert into "+n,o="update "+n+" ? set "+n+"=1",i=new RegExp("(update "+n+"|set "+n+"=1)","g"),f={string:1,boolean:1,number:1},s=require("sqlutils/mysql/format"),l=require("sqlutils/mysql/escape"),c=require("sqlutils/mysql/buildWhereFromQuery");return t=s,r=c,e=l,(a=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var r=e[0],s=e.slice(1),l="";return r.forEach(function(e,t){l+=e;var r=s[t],n=e.toLocaleLowerCase(),u=n.length,o=n.lastIndexOf("where"),i=n.lastIndexOf("set");void 0!==r&&(f[typeof r]?"#"===r[0]?l+=r.replace("#",""):l+=a.escape(r):l+=0<o&&u-7<o?a.where(r):0<i&&u-5<i?a.set(r):a.values(r))}),l}).values=function(e){return t(u+"?",e).replace(u,"").trim()},a.set=function(e){return t(o,e).replace(i,"").trim()},a.where=function(e){return r(e).replace("WHERE ","").trim()},a.escape=e,a.createQuery=function(r){return function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return r(a.apply(void 0,e))}},a});
//# sourceMappingURL=mysql.js.map
