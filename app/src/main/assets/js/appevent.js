!function(a){function b(a,b){for(var c=a;c;){if(c.contains(b)||c==b)return c;c=c.parentNode}return null}function c(a,b,c){var d=i.createEvent("HTMLEvents");if(d.initEvent(b,!0,!0),"object"==typeof c)for(var e in c)d[e]=c[e];a.dispatchEvent(d)}function d(a,b,c,d,e,f,g,h){var i=Math.atan2(h-f,g-e)-Math.atan2(d-b,c-a),j=Math.sqrt((Math.pow(h-f,2)+Math.pow(g-e,2))/(Math.pow(d-b,2)+Math.pow(c-a,2))),k=[e-j*a*Math.cos(i)+j*b*Math.sin(i),f-j*b*Math.cos(i)-j*a*Math.sin(i)];return{rotate:i,scale:j,translate:k,matrix:[[j*Math.cos(i),-j*Math.sin(i),k[0]],[j*Math.sin(i),j*Math.cos(i),k[1]],[0,0,1]]}}function e(a){0===Object.keys(l).length&&(j.addEventListener("touchmove",f,!1),j.addEventListener("touchend",g,!1),j.addEventListener("touchcancel",h,!1));for(var d=0;d<a.changedTouches.length;d++){var e=a.changedTouches[d],i={};for(var m in e)i[m]=e[m];var n={startTouch:i,startTime:Date.now(),status:"tapping",element:a.srcElement,pressingHandler:setTimeout(function(b){return function(){"tapping"===n.status&&(n.status="pressing",c(b,"press",{touchEvent:a})),clearTimeout(n.pressingHandler),n.pressingHandler=null}}(a.srcElement),500)};l[e.identifier]=n}if(2==Object.keys(l).length){var o=[];for(var p in l)o.push(l[p].element);c(b(o[0],o[1]),"dualtouchstart",{touches:k.call(a.touches),touchEvent:a})}}function f(a){for(var e=0;e<a.changedTouches.length;e++){var f=a.changedTouches[e],g=l[f.identifier];if(!g)return;g.lastTouch||(g.lastTouch=g.startTouch),g.lastTime||(g.lastTime=g.startTime),g.velocityX||(g.velocityX=0),g.velocityY||(g.velocityY=0),g.duration||(g.duration=0);var h=Date.now()-g.lastTime,i=(f.clientX-g.lastTouch.clientX)/h,j=(f.clientY-g.lastTouch.clientY)/h,k=70;h>k&&(h=k),g.duration+h>k&&(g.duration=k-h),g.velocityX=(g.velocityX*g.duration+i*h)/(g.duration+h),g.velocityY=(g.velocityY*g.duration+j*h)/(g.duration+h),g.duration+=h,g.lastTouch={};for(var m in f)g.lastTouch[m]=f[m];g.lastTime=Date.now();var n=f.clientX-g.startTouch.clientX,o=f.clientY-g.startTouch.clientY,p=Math.sqrt(Math.pow(n,2)+Math.pow(o,2));"tapping"===g.status&&p>10&&(g.status="panning",g.isVertical=!(Math.abs(n)>Math.abs(o)),c(g.element,"panstart",{touch:f,touchEvent:a,isVertical:g.isVertical}),c(g.element,(g.isVertical?"vertical":"horizontal")+"panstart",{touch:f,touchEvent:a})),"panning"===g.status&&(g.panTime=Date.now(),c(g.element,"pan",{displacementX:n,displacementY:o,touch:f,touchEvent:a,isVertical:g.isVertical}),g.isVertical?c(g.element,"verticalpan",{displacementY:o,touch:f,touchEvent:a}):c(g.element,"horizontalpan",{displacementX:n,touch:f,touchEvent:a}))}if(2==Object.keys(l).length){for(var q,r=[],s=[],t=[],u=0;u<a.touches.length;u++){var v=a.touches[u],g=l[v.identifier];r.push([g.startTouch.clientX,g.startTouch.clientY]),s.push([v.clientX,v.clientY])}for(var w in l)t.push(l[w].element);q=d(r[0][0],r[0][1],r[1][0],r[1][1],s[0][0],s[0][1],s[1][0],s[1][1]),c(b(t[0],t[1]),"dualtouch",{transform:q,touches:a.touches,touchEvent:a})}}function g(a){if(2==Object.keys(l).length){var d=[];for(var e in l)d.push(l[e].element);c(b(d[0],d[1]),"dualtouchend",{touches:k.call(a.touches),touchEvent:a})}for(var i=0;i<a.changedTouches.length;i++){var n=a.changedTouches[i],e=n.identifier,o=l[e];if(o){if(o.pressingHandler&&(clearTimeout(o.pressingHandler),o.pressingHandler=null),"tapping"===o.status&&(o.timestamp=Date.now(),c(o.element,"tap",{touch:n,touchEvent:a}),m&&o.timestamp-m.timestamp<300&&c(o.element,"doubletap",{touch:n,touchEvent:a}),m=o),"panning"===o.status){var p=Date.now()-o.startTime,q=((n.clientX-o.startTouch.clientX)/p,(n.clientY-o.startTouch.clientY)/p,n.clientX-o.startTouch.clientX),r=n.clientY-o.startTouch.clientY,s=Math.sqrt(o.velocityY*o.velocityY+o.velocityX*o.velocityX),t=Date.now(),u=s>.5&&t-(o.lastTime<10);c(o.element,"panend",{isflick:u,touch:n,touchEvent:a,isVertical:o.isVertical}),u&&(c(o.element,"flick",{duration:p,velocityX:o.velocityX,velocityY:o.velocityY,displacementX:q,displacementY:r,touch:n,touchEvent:a,isVertical:o.isVertical}),o.isVertical?c(o.element,"verticalflick",{duration:p,velocityY:o.velocityY,displacementY:r,touch:n,touchEvent:a}):c(o.element,"horizontalflick",{duration:p,velocityX:o.velocityX,displacementX:q,touch:n,touchEvent:a}))}"pressing"===o.status&&c(o.element,"pressend",{touch:n,touchEvent:a}),delete l[e]}}0===Object.keys(l).length&&(j.removeEventListener("touchmove",f,!1),j.removeEventListener("touchend",g,!1),j.removeEventListener("touchcancel",h,!1))}function h(a){if(2==Object.keys(l).length){var d=[];for(var e in l)d.push(l[e].element);c(b(d[0],d[1]),"dualtouchend",{touches:k.call(a.touches),touchEvent:a})}for(var i=0;i<a.changedTouches.length;i++){var m=a.changedTouches[i],e=m.identifier,n=l[e];n&&(n.pressingHandler&&(clearTimeout(n.pressingHandler),n.pressingHandler=null),"panning"===n.status&&c(n.element,"panend",{touch:m,touchEvent:a}),"pressing"===n.status&&c(n.element,"pressend",{touch:m,touchEvent:a}),delete l[e])}0===Object.keys(l).length&&(j.removeEventListener("touchmove",f,!1),j.removeEventListener("touchend",g,!1),j.removeEventListener("touchcancel",h,!1))}var i=a.document,j=i.documentElement,k=Array.prototype.slice,l={},m=null;j.addEventListener("touchstart",e,!1)}(window);