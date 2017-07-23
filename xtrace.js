'use strict';Object.defineProperty(exports,'__esModule',{value:!0});function _interopDefault(a){return a&&'object'==typeof a&&'default'in a?a['default']:a}var katsuCurry=require('katsu-curry'),tty=_interopDefault(require('tty')),util=_interopDefault(require('util')),fs=_interopDefault(require('fs')),net=_interopDefault(require('net'));function createCommonjsModule(a,b){return b={exports:{}},a(b,b.exports),b.exports}var s=1e3,m=60*s,h=60*m,d=24*h,y=365.25*d,index$1=function(a,b){b=b||{};var c=typeof a;if('string'==c&&0<a.length)return parse(a);if('number'==c&&!1===isNaN(a))return b.long?fmtLong(a):fmtShort(a);throw new Error('val is not a non-empty string or a valid number. val='+JSON.stringify(a))};function parse(a){if(a+='',!(100<a.length)){var b=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(a);if(b){var c=parseFloat(b[1]),e=(b[2]||'ms').toLowerCase();return'years'===e||'year'===e||'yrs'===e||'yr'===e||'y'===e?c*y:'days'===e||'day'===e||'d'===e?c*d:'hours'===e||'hour'===e||'hrs'===e||'hr'===e||'h'===e?c*h:'minutes'===e||'minute'===e||'mins'===e||'min'===e||'m'===e?c*m:'seconds'===e||'second'===e||'secs'===e||'sec'===e||'s'===e?c*s:'milliseconds'===e||'millisecond'===e||'msecs'===e||'msec'===e||'ms'===e?c:void 0}}}function fmtShort(a){var b=Math.round;return a>=d?b(a/d)+'d':a>=h?b(a/h)+'h':a>=m?b(a/m)+'m':a>=s?b(a/s)+'s':a+'ms'}function fmtLong(a){return plural(a,d,'day')||plural(a,h,'hour')||plural(a,m,'minute')||plural(a,s,'second')||a+' ms'}function plural(a,b,c){return a<b?void 0:a<1.5*b?Math.floor(a/b)+' '+c:Math.ceil(a/b)+' '+c+'s'}var debug$2=createCommonjsModule(function(a,b){function c(a){var c,d=0;for(c in a)d=(d<<5)-d+a.charCodeAt(c),d|=0;return b.colors[Math.abs(d)%b.colors.length]}function d(a){function d(){var a=arguments;if(d.enabled){var c=d,f=+new Date,g=f-(e||f);c.diff=g,c.prev=e,c.curr=f,e=f;for(var h=Array(arguments.length),j=0;j<h.length;j++)h[j]=a[j];h[0]=b.coerce(h[0]),'string'!=typeof h[0]&&h.unshift('%O');var i=0;h[0]=h[0].replace(/%([a-zA-Z%])/g,function(a,d){if('%%'===a)return a;i++;var e=b.formatters[d];if('function'==typeof e){var f=h[i];a=e.call(c,f),h.splice(i,1),i--}return a}),b.formatArgs.call(c,h);var k=d.log||b.log||console.log.bind(console);k.apply(c,h)}}return d.namespace=a,d.enabled=b.enabled(a),d.useColors=b.useColors(),d.color=c(a),'function'==typeof b.init&&b.init(d),d}b=a.exports=d.debug=d['default']=d,b.coerce=function(a){return a instanceof Error?a.stack||a.message:a},b.disable=function(){b.enable('')},b.enable=function(a){b.save(a),b.names=[],b.skips=[];for(var c=('string'==typeof a?a:'').split(/[\s,]+/),d=c.length,e=0;e<d;e++)c[e]&&(a=c[e].replace(/\*/g,'.*?'),'-'===a[0]?b.skips.push(new RegExp('^'+a.substr(1)+'$')):b.names.push(new RegExp('^'+a+'$')))},b.enabled=function(a){var c,d;for(c=0,d=b.skips.length;c<d;c++)if(b.skips[c].test(a))return!1;for(c=0,d=b.names.length;c<d;c++)if(b.names[c].test(a))return!0;return!1},b.humanize=index$1,b.names=[],b.skips=[],b.formatters={};var e}),browser=createCommonjsModule(function(a,b){function c(){var a;try{a=b.storage.debug}catch(a){}return!a&&'undefined'!=typeof process&&'env'in process&&(a=process.env.DEBUG),a}b=a.exports=debug$2,b.log=function(){return'object'==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)},b.formatArgs=function(a){var d=this.useColors;if(a[0]=(d?'%c':'')+this.namespace+(d?' %c':' ')+a[0]+(d?'%c ':' ')+'+'+b.humanize(this.diff),!!d){var e='color: '+this.color;a.splice(1,0,e,'color: inherit');var c=0,f=0;a[0].replace(/%[a-zA-Z%]/g,function(a){'%%'===a||(c++,'%c'===a&&(f=c))}),a.splice(f,0,e)}},b.save=function(a){try{null==a?b.storage.removeItem('debug'):b.storage.debug=a}catch(a){}},b.load=c,b.useColors=function(){return'undefined'!=typeof window&&window.process&&'renderer'===window.process.type||'undefined'!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||'undefined'!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||'undefined'!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&31<=parseInt(RegExp.$1,10)||'undefined'!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)},b.storage='undefined'!=typeof chrome&&'undefined'!=typeof chrome.storage?chrome.storage.local:function(){try{return window.localStorage}catch(a){}}(),b.colors=['lightseagreen','forestgreen','goldenrod','dodgerblue','darkorchid','crimson'],b.formatters.j=function(a){try{return JSON.stringify(a)}catch(a){return'[UnexpectedJSONParseError]: '+a.message}},b.enable(c())}),node=createCommonjsModule(function(a,b){function c(){return process.env.DEBUG}b=a.exports=debug$2,b.init=function(a){a.inspectOpts={};for(var c=Object.keys(b.inspectOpts),d=0;d<c.length;d++)a.inspectOpts[c[d]]=b.inspectOpts[c[d]]},b.log=function(){return e.write(util.format.apply(util,arguments)+'\n')},b.formatArgs=function(a){var d=this.namespace,e=this.useColors;if(e){var f=this.color,c='  \x1B[3'+f+';1m'+d+' \x1B[0m';a[0]=c+a[0].split('\n').join('\n'+c),a.push('\x1B[3'+f+'m+'+b.humanize(this.diff)+'\x1B[0m')}else a[0]=new Date().toUTCString()+' '+d+' '+a[0]},b.save=function(a){null==a?delete process.env.DEBUG:process.env.DEBUG=a},b.load=c,b.useColors=function(){return'colors'in b.inspectOpts?!!b.inspectOpts.colors:tty.isatty(d)},b.colors=[6,2,3,4,5,1],b.inspectOpts=Object.keys(process.env).filter(function(a){return /^debug_/i.test(a)}).reduce(function(a,b){var c=b.substring(6).toLowerCase().replace(/_([a-z])/g,function(a,b){return b.toUpperCase()}),d=process.env[b];return d=!!/^(yes|on|true|enabled)$/i.test(d)||!/^(no|off|false|disabled)$/i.test(d)&&('null'===d?null:+d),a[c]=d,a},{});var d=parseInt(process.env.DEBUG_FD,10)||2;1!==d&&2!==d&&util.deprecate(function(){},'except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)')();var e=1===d?process.stdout:2===d?process.stderr:function(a){var b,c=process.binding('tty_wrap');switch(c.guessHandleType(a)){case'TTY':b=new tty.WriteStream(a),b._type='tty',b._handle&&b._handle.unref&&b._handle.unref();break;case'FILE':b=new fs.SyncWriteStream(a,{autoClose:!1}),b._type='fs';break;case'PIPE':case'TCP':b=new net.Socket({fd:a,readable:!1,writable:!0}),b.readable=!1,b.read=null,b._type='pipe',b._handle&&b._handle.unref&&b._handle.unref();break;default:throw new Error('Implement me. Unknown stream file type!');}return b.fd=a,b._isStdio=!0,b}(d);b.formatters.o=function(a){return this.inspectOpts.colors=this.useColors,util.inspect(a,this.inspectOpts).replace(/\s*\n\s*/g,' ')},b.formatters.O=function(a){return this.inspectOpts.colors=this.useColors,util.inspect(a,this.inspectOpts)},b.enable(c())}),index=createCommonjsModule(function(a){a.exports='undefined'!=typeof process&&'renderer'===process.type?browser:node}),sideEffect=katsuCurry.curry(function(a,b,c,d){return a(b,c(d)),d}),xtrace=sideEffect(katsuCurry.$,katsuCurry.$,katsuCurry.I,katsuCurry.$),map=katsuCurry.curry(function(a,b){return b.map(a)}),pipe=function(){for(var a=[],b=arguments.length;b--;)a[b]=arguments[b];return function(b){if(!a.reduce)throw new TypeError('Expected functor to be foldable. Got: '+a);return a.reduce(function(a,b){var c=b(a);return c},b)}},wrap=katsuCurry.curry(function(c,a){return map(pipe(c,a))}),sideLog=wrap(katsuCurry.$,sideEffect),xLog=wrap(katsuCurry.$,xtrace),debugLog=xLog(index),debugInspect=sideLog(index),_debug=Object.freeze({wrap:wrap,sideLog:sideLog,xLog:xLog,debugLog:debugLog,debugInspect:debugInspect}),trace=xtrace(console.log),PLACEHOLDER=katsuCurry.$,$$1=katsuCurry.$,I$1=katsuCurry.I,debug=_debug;exports.PLACEHOLDER=PLACEHOLDER,exports.$=$$1,exports.I=I$1,exports.debug=debug,exports.sideEffect=sideEffect,exports.xtrace=xtrace,exports.trace=trace;
