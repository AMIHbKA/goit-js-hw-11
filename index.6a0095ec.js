!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},r={},i=n.parcelRequired7c6;null==i&&((i=function(e){if(e in t)return t[e].exports;if(e in r){var n=r[e];delete r[e];var i={id:e,exports:{}};return t[e]=i,n.call(i.exports,i,i.exports),i.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,n){r[e]=n},n.parcelRequired7c6=i),i.register("cHbiO",(function(e,n){var t=i("6qd2L"),r=i("1wVs5"),o=i("481Mb"),s=i("gwhML"),a=i("b5s1I").version,l=/(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/gm;function c(e){console.log("[dotenv@".concat(a,"][DEBUG] ").concat(e))}var u={config:function(e){var n,i=o.resolve(t.cwd(),".env"),a="utf8",l=Boolean(e&&e.debug),f=Boolean(e&&e.override);e&&(null!=e.path&&(i="~"===(n=e.path)[0]?o.join(s.homedir(),n.slice(1)):n),null!=e.encoding&&(a=e.encoding));try{var d=u.parse(r.readFileSync(i,{encoding:a}));return Object.keys(d).forEach((function(e){Object.prototype.hasOwnProperty.call(t.env,e)?(!0===f&&d[e],l&&c('"'.concat(e,!0===f?'" is already defined in `process.env` and WAS overwritten':'" is already defined in `process.env` and was NOT overwritten'))):d[e]})),{parsed:d}}catch(e){return l&&c("Failed to load ".concat(i," ").concat(e.message)),{error:e}}},parse:function(e){var n,t={},r=e.toString();for(r=r.replace(/\r\n?/gm,"\n");null!=(n=l.exec(r));){var i=n[1],o=n[2]||"",s=(o=o.trim())[0];o=o.replace(/^(['"`])([\s\S]*)\1$/gm,"$2"),'"'===s&&(o=(o=o.replace(/\\n/g,"\n")).replace(/\\r/g,"\r")),t[i]=o}return t}};e.exports.config=u.config,e.exports.parse=u.parse,e.exports=u})),i.register("6qd2L",(function(e,n){var t,r,i=e.exports={};function o(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function a(e){if(t===setTimeout)return setTimeout(e,0);if((t===o||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(n){try{return t.call(null,e,0)}catch(n){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:o}catch(e){t=o}try{r="function"==typeof clearTimeout?clearTimeout:s}catch(e){r=s}}();var l,c=[],u=!1,f=-1;function d(){u&&l&&(u=!1,l.length?c=l.concat(c):f=-1,c.length&&h())}function h(){if(!u){var e=a(d);u=!0;for(var n=c.length;n;){for(l=c,c=[];++f<n;)l&&l[f].run();f=-1,n=c.length}l=null,u=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===s||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(n){try{return r.call(null,e)}catch(n){return r.call(this,e)}}}(e)}}function g(e,n){this.fun=e,this.array=n}function p(){}i.nextTick=function(e){var n=new Array(arguments.length-1);if(arguments.length>1)for(var t=1;t<arguments.length;t++)n[t-1]=arguments[t];c.push(new g(e,n)),1!==c.length||u||a(h)},g.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=p,i.addListener=p,i.once=p,i.off=p,i.removeListener=p,i.removeAllListeners=p,i.emit=p,i.prependListener=p,i.prependOnceListener=p,i.listeners=function(e){return[]},i.binding=function(e){throw new Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(e){throw new Error("process.chdir is not supported")},i.umask=function(){return 0}})),i.register("1wVs5",(function(e,n){})),i.register("481Mb",(function(n,t){var r=i("l5bVx"),o=i("6qd2L");function s(e){if("string"!=typeof e)throw new TypeError("Path must be a string. Received "+JSON.stringify(e))}function a(e,n){for(var t,r="",i=0,o=-1,s=0,a=0;a<=e.length;++a){if(a<e.length)t=e.charCodeAt(a);else{if(47===t)break;t=47}if(47===t){if(o===a-1||1===s);else if(o!==a-1&&2===s){if(r.length<2||2!==i||46!==r.charCodeAt(r.length-1)||46!==r.charCodeAt(r.length-2))if(r.length>2){var l=r.lastIndexOf("/");if(l!==r.length-1){-1===l?(r="",i=0):i=(r=r.slice(0,l)).length-1-r.lastIndexOf("/"),o=a,s=0;continue}}else if(2===r.length||1===r.length){r="",i=0,o=a,s=0;continue}n&&(r.length>0?r+="/..":r="..",i=2)}else r.length>0?r+="/"+e.slice(o+1,a):r=e.slice(o+1,a),i=a-o-1;o=a,s=0}else 46===t&&-1!==s?++s:s=-1}return r}var l={resolve:function(){for(var e,n="",t=!1,r=arguments.length-1;r>=-1&&!t;r--){var i;r>=0?i=arguments[r]:(void 0===e&&(e=o.cwd()),i=e),s(i),0!==i.length&&(n=i+"/"+n,t=47===i.charCodeAt(0))}return n=a(n,!t),t?n.length>0?"/"+n:"/":n.length>0?n:"."},normalize:function(e){if(s(e),0===e.length)return".";var n=47===e.charCodeAt(0),t=47===e.charCodeAt(e.length-1);return 0!==(e=a(e,!n)).length||n||(e="."),e.length>0&&t&&(e+="/"),n?"/"+e:e},isAbsolute:function(e){return s(e),e.length>0&&47===e.charCodeAt(0)},join:function(){if(0===arguments.length)return".";for(var e,n=0;n<arguments.length;++n){var t=arguments[n];s(t),t.length>0&&(void 0===e?e=t:e+="/"+t)}return void 0===e?".":l.normalize(e)},relative:function(e,n){if(s(e),s(n),e===n)return"";if((e=l.resolve(e))===(n=l.resolve(n)))return"";for(var t=1;t<e.length&&47===e.charCodeAt(t);++t);for(var r=e.length,i=r-t,o=1;o<n.length&&47===n.charCodeAt(o);++o);for(var a=n.length-o,c=i<a?i:a,u=-1,f=0;f<=c;++f){if(f===c){if(a>c){if(47===n.charCodeAt(o+f))return n.slice(o+f+1);if(0===f)return n.slice(o+f)}else i>c&&(47===e.charCodeAt(t+f)?u=f:0===f&&(u=0));break}var d=e.charCodeAt(t+f);if(d!==n.charCodeAt(o+f))break;47===d&&(u=f)}var h="";for(f=t+u+1;f<=r;++f)f!==r&&47!==e.charCodeAt(f)||(0===h.length?h+="..":h+="/..");return h.length>0?h+n.slice(o+u):(o+=u,47===n.charCodeAt(o)&&++o,n.slice(o))},_makeLong:function(e){return e},dirname:function(e){if(s(e),0===e.length)return".";for(var n=e.charCodeAt(0),t=47===n,r=-1,i=!0,o=e.length-1;o>=1;--o)if(47===(n=e.charCodeAt(o))){if(!i){r=o;break}}else i=!1;return-1===r?t?"/":".":t&&1===r?"//":e.slice(0,r)},basename:function(e,n){if(void 0!==n&&"string"!=typeof n)throw new TypeError('"ext" argument must be a string');s(e);var t,r=0,i=-1,o=!0;if(void 0!==n&&n.length>0&&n.length<=e.length){if(n.length===e.length&&n===e)return"";var a=n.length-1,l=-1;for(t=e.length-1;t>=0;--t){var c=e.charCodeAt(t);if(47===c){if(!o){r=t+1;break}}else-1===l&&(o=!1,l=t+1),a>=0&&(c===n.charCodeAt(a)?-1==--a&&(i=t):(a=-1,i=l))}return r===i?i=l:-1===i&&(i=e.length),e.slice(r,i)}for(t=e.length-1;t>=0;--t)if(47===e.charCodeAt(t)){if(!o){r=t+1;break}}else-1===i&&(o=!1,i=t+1);return-1===i?"":e.slice(r,i)},extname:function(e){s(e);for(var n=-1,t=0,r=-1,i=!0,o=0,a=e.length-1;a>=0;--a){var l=e.charCodeAt(a);if(47!==l)-1===r&&(i=!1,r=a+1),46===l?-1===n?n=a:1!==o&&(o=1):-1!==n&&(o=-1);else if(!i){t=a+1;break}}return-1===n||-1===r||0===o||1===o&&n===r-1&&n===t+1?"":e.slice(n,r)},format:function(n){if(null===n||"object"!=typeof n)throw new TypeError('The "pathObject" argument must be of type Object. Received type '+(void 0===n?"undefined":e(r)(n)));return function(e,n){var t=n.dir||n.root,r=n.base||(n.name||"")+(n.ext||"");return t?t===n.root?t+r:t+e+r:r}("/",n)},parse:function(e){s(e);var n={root:"",dir:"",base:"",ext:"",name:""};if(0===e.length)return n;var t,r=e.charCodeAt(0),i=47===r;i?(n.root="/",t=1):t=0;for(var o=-1,a=0,l=-1,c=!0,u=e.length-1,f=0;u>=t;--u)if(47!==(r=e.charCodeAt(u)))-1===l&&(c=!1,l=u+1),46===r?-1===o?o=u:1!==f&&(f=1):-1!==o&&(f=-1);else if(!c){a=u+1;break}return-1===o||-1===l||0===f||1===f&&o===l-1&&o===a+1?-1!==l&&(n.base=n.name=0===a&&i?e.slice(1,l):e.slice(a,l)):(0===a&&i?(n.name=e.slice(1,o),n.base=e.slice(1,l)):(n.name=e.slice(a,o),n.base=e.slice(a,l)),n.ext=e.slice(o,l)),a>0?n.dir=e.slice(0,a-1):i&&(n.dir="/"),n},sep:"/",delimiter:":",win32:null,posix:null};l.posix=l,n.exports=l})),i.register("l5bVx",(function(e,n){"use strict";Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=function(e){return e&&e.constructor===Symbol?"symbol":typeof e}})),i.register("gwhML",(function(e,n){var t,r,i,o,s;t=e.exports,r="homedir",i=function(){return s},o=function(e){return s=e},Object.defineProperty(t,r,{get:i,set:o,enumerable:!0,configurable:!0}),s=function(){return"/"}})),i.register("b5s1I",(function(e,n){e.exports=JSON.parse('{"name":"dotenv","version":"16.0.3","description":"Loads environment variables from .env file","main":"lib/main.js","types":"lib/main.d.ts","exports":{".":{"require":"./lib/main.js","types":"./lib/main.d.ts","default":"./lib/main.js"},"./config":"./config.js","./config.js":"./config.js","./lib/env-options":"./lib/env-options.js","./lib/env-options.js":"./lib/env-options.js","./lib/cli-options":"./lib/cli-options.js","./lib/cli-options.js":"./lib/cli-options.js","./package.json":"./package.json"},"scripts":{"dts-check":"tsc --project tests/types/tsconfig.json","lint":"standard","lint-readme":"standard-markdown","pretest":"npm run lint && npm run dts-check","test":"tap tests/*.js --100 -Rspec","prerelease":"npm test","release":"standard-version"},"repository":{"type":"git","url":"git://github.com/motdotla/dotenv.git"},"keywords":["dotenv","env",".env","environment","variables","config","settings"],"readmeFilename":"README.md","license":"BSD-2-Clause","devDependencies":{"@types/node":"^17.0.9","decache":"^4.6.1","dtslint":"^3.7.0","sinon":"^12.0.1","standard":"^16.0.4","standard-markdown":"^7.1.0","standard-version":"^9.3.2","tap":"^15.1.6","tar":"^6.1.11","typescript":"^4.5.4"},"engines":{"node":">=12"}}')})),i("cHbiO").config(),console.log(void 0)}();
//# sourceMappingURL=index.6a0095ec.js.map
