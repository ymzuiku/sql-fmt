!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).fmt=t()}(this,function(){"use strict";var t,r,e,f,n="v"+Date.now(),i="insert into "+n,o="update "+n+" ? set "+n+"=1",u=new RegExp("(update "+n+"|set "+n+"=1)","g"),c={string:1,boolean:1,number:1},s=require("sqlutils/mysql/format"),l=require("sqlutils/mysql/escape"),a=require("sqlutils/mysql/buildWhereFromQuery");return t=s,r=a,e=l,(f=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var r=e[0],l=e.slice(1),a="";return r.forEach(function(e,t){a+=e;var r=l[t],n=e.toLocaleLowerCase(),i=n.length,o=n.lastIndexOf("where"),u=n.lastIndexOf("set"),s=n.lastIndexOf("insert into");void 0!==r&&(c[typeof r]?"#"===r[0]?a+=r.replace("#",""):a+=f.escape(r):0<o&&i-7<o?a+=f.where(r):0<u&&i-5<u?a+=f.set(r):-1<s&&(a+=f.set(r)))}),a}).values=function(e){return t(i+"?",e).replace(i,"").trim()},f.set=function(e){return t(o,e).replace(u,"").trim()},f.where=function(e){return r(e).replace("WHERE ","").trim()},f.escape=e,f.createQuery=function(r){return function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return r(f.apply(void 0,e))}},f});
//# sourceMappingURL=mysql.js.map
