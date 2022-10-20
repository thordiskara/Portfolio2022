const ht=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}};ht();function pt(t,e){t.indexOf(e)===-1&&t.push(e)}const tt=(t,e,n)=>Math.min(Math.max(n,t),e),y={duration:.3,delay:0,endDelay:0,repeat:0,easing:"ease"},L=t=>typeof t=="number",E=t=>Array.isArray(t)&&!L(t[0]),mt=(t,e,n)=>{const i=e-t;return((n-t)%i+i)%i+t};function yt(t,e){return E(t)?t[mt(0,t.length,e)]:t}const et=(t,e,n)=>-n*t+n*e+t,nt=()=>{},T=t=>t,K=(t,e,n)=>e-t===0?1:(n-t)/(e-t);function it(t,e){const n=t[t.length-1];for(let i=1;i<=e;i++){const s=K(0,e,i);t.push(et(n,1,s))}}function gt(t){const e=[0];return it(e,t-1),e}function vt(t,e=gt(t.length),n=T){const i=t.length,s=i-e.length;return s>0&&it(e,s),r=>{let a=0;for(;a<i-2&&!(r<e[a+1]);a++);let o=tt(0,1,K(e[a],e[a+1],r));return o=yt(n,a)(o),et(t[a],t[a+1],o)}}const st=t=>Array.isArray(t)&&L(t[0]),N=t=>typeof t=="object"&&Boolean(t.createAnimation),x=t=>typeof t=="function",Tt=t=>typeof t=="string",_={ms:t=>t*1e3,s:t=>t/1e3},rt=(t,e,n)=>(((1-3*n+3*e)*t+(3*n-6*e))*t+3*e)*t,bt=1e-7,St=12;function At(t,e,n,i,s){let r,a,o=0;do a=e+(n-e)/2,r=rt(a,i,s)-t,r>0?n=a:e=a;while(Math.abs(r)>bt&&++o<St);return a}function R(t,e,n,i){if(t===e&&n===i)return T;const s=r=>At(r,0,1,t,n);return r=>r===0||r===1?r:rt(s(r),e,i)}const wt=(t,e="end")=>n=>{n=e==="end"?Math.min(n,.999):Math.max(n,.001);const i=n*t,s=e==="end"?Math.floor(i):Math.ceil(i);return tt(0,1,s/t)},G={ease:R(.25,.1,.25,1),"ease-in":R(.42,0,1,1),"ease-in-out":R(.42,0,.58,1),"ease-out":R(0,0,.58,1)},Ot=/\((.*?)\)/;function H(t){if(x(t))return t;if(st(t))return R(...t);if(G[t])return G[t];if(t.startsWith("steps")){const e=Ot.exec(t);if(e){const n=e[1].split(",");return wt(parseFloat(n[0]),n[1].trim())}}return T}class at{constructor(e,n=[0,1],{easing:i,duration:s=y.duration,delay:r=y.delay,endDelay:a=y.endDelay,repeat:o=y.repeat,offset:f,direction:h="normal"}={}){if(this.startTime=null,this.rate=1,this.t=0,this.cancelTimestamp=null,this.easing=T,this.duration=0,this.totalDuration=0,this.repeat=0,this.playState="idle",this.finished=new Promise((p,l)=>{this.resolve=p,this.reject=l}),i=i||y.easing,N(i)){const p=i.createAnimation(n);i=p.easing,n=p.keyframes||n,s=p.duration||s}this.repeat=o,this.easing=E(i)?T:H(i),this.updateDuration(s);const b=vt(n,f,E(i)?i.map(H):T);this.tick=p=>{var l;r=r;let m=0;this.pauseTime!==void 0?m=this.pauseTime:m=(p-this.startTime)*this.rate,this.t=m,m/=1e3,m=Math.max(m-r,0),this.playState==="finished"&&this.pauseTime===void 0&&(m=this.totalDuration);const A=m/this.duration;let I=Math.floor(A),g=A%1;!g&&A>=1&&(g=1),g===1&&I--;const w=I%2;(h==="reverse"||h==="alternate"&&w||h==="alternate-reverse"&&!w)&&(g=1-g);const D=m>=this.totalDuration?1:Math.min(g,1),d=b(this.easing(D));e(d),this.pauseTime===void 0&&(this.playState==="finished"||m>=this.totalDuration+a)?(this.playState="finished",(l=this.resolve)===null||l===void 0||l.call(this,d)):this.playState!=="idle"&&(this.frameRequestId=requestAnimationFrame(this.tick))},this.play()}play(){const e=performance.now();this.playState="running",this.pauseTime!==void 0?this.startTime=e-this.pauseTime:this.startTime||(this.startTime=e),this.cancelTimestamp=this.startTime,this.pauseTime=void 0,this.frameRequestId=requestAnimationFrame(this.tick)}pause(){this.playState="paused",this.pauseTime=this.t}finish(){this.playState="finished",this.tick(0)}stop(){var e;this.playState="idle",this.frameRequestId!==void 0&&cancelAnimationFrame(this.frameRequestId),(e=this.reject)===null||e===void 0||e.call(this,!1)}cancel(){this.stop(),this.tick(this.cancelTimestamp)}reverse(){this.rate*=-1}commitStyles(){}updateDuration(e){this.duration=e,this.totalDuration=e*(this.repeat+1)}get currentTime(){return this.t}set currentTime(e){this.pauseTime!==void 0||this.rate===0?this.pauseTime=e:this.startTime=performance.now()-e/this.rate}get playbackRate(){return this.rate}set playbackRate(e){this.rate=e}}class Et{setAnimation(e){this.animation=e,e==null||e.finished.then(()=>this.clearAnimation()).catch(()=>{})}clearAnimation(){this.animation=this.generator=void 0}}const C=new WeakMap;function ot(t){return C.has(t)||C.set(t,{transforms:[],values:new Map}),C.get(t)}function xt(t,e){return t.has(e)||t.set(e,new Et),t.get(e)}const Dt=["","X","Y","Z"],Mt=["translate","scale","rotate","skew"],V={x:"translateX",y:"translateY",z:"translateZ"},J={syntax:"<angle>",initialValue:"0deg",toDefaultUnit:t=>t+"deg"},Pt={translate:{syntax:"<length-percentage>",initialValue:"0px",toDefaultUnit:t=>t+"px"},rotate:J,scale:{syntax:"<number>",initialValue:1,toDefaultUnit:T},skew:J},F=new Map,X=t=>`--motion-${t}`,j=["x","y","z"];Mt.forEach(t=>{Dt.forEach(e=>{j.push(t+e),F.set(X(t+e),Pt[t])})});const Rt=(t,e)=>j.indexOf(t)-j.indexOf(e),_t=new Set(j),ct=t=>_t.has(t),Ft=(t,e)=>{V[e]&&(e=V[e]);const{transforms:n}=ot(t);pt(n,e),t.style.transform=It(n)},It=t=>t.sort(Rt).reduce($t,"").trim(),$t=(t,e)=>`${t} ${e}(var(${X(e)}))`,W=t=>t.startsWith("--"),Q=new Set;function qt(t){if(!Q.has(t)){Q.add(t);try{const{syntax:e,initialValue:n}=F.has(t)?F.get(t):{};CSS.registerProperty({name:t,inherits:!1,syntax:e,initialValue:n})}catch{}}}const U=(t,e)=>document.createElement("div").animate(t,e),Y={cssRegisterProperty:()=>typeof CSS<"u"&&Object.hasOwnProperty.call(CSS,"registerProperty"),waapi:()=>Object.hasOwnProperty.call(Element.prototype,"animate"),partialKeyframes:()=>{try{U({opacity:[1]})}catch{return!1}return!0},finished:()=>Boolean(U({opacity:[0,1]},{duration:.001}).finished),linearEasing:()=>{try{U({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0}},z={},O={};for(const t in Y)O[t]=()=>(z[t]===void 0&&(z[t]=Y[t]()),z[t]);const Lt=.015,Vt=(t,e)=>{let n="";const i=Math.round(e/Lt);for(let s=0;s<i;s++)n+=t(K(0,i-1,s))+", ";return n.substring(0,n.length-2)},k=(t,e)=>x(t)?O.linearEasing()?`linear(${Vt(t,e)})`:y.easing:st(t)?jt(t):t,jt=([t,e,n,i])=>`cubic-bezier(${t}, ${e}, ${n}, ${i})`;function Ct(t,e){for(let n=0;n<t.length;n++)t[n]===null&&(t[n]=n?t[n-1]:e());return t}const Ut=t=>Array.isArray(t)?t:[t];function B(t){return V[t]&&(t=V[t]),ct(t)?X(t):t}const q={get:(t,e)=>{e=B(e);let n=W(e)?t.style.getPropertyValue(e):getComputedStyle(t)[e];if(!n&&n!==0){const i=F.get(e);i&&(n=i.initialValue)}return n},set:(t,e,n)=>{e=B(e),W(e)?t.style.setProperty(e,n):t.style[e]=n}};function lt(t,e=!0){if(!(!t||t.playState==="finished"))try{t.stop?t.stop():(e&&t.commitStyles(),t.cancel())}catch{}}function zt(t,e){var n;let i=(e==null?void 0:e.toDefaultUnit)||T;const s=t[t.length-1];if(Tt(s)){const r=((n=s.match(/(-?[\d.]+)([a-z%]*)/))===null||n===void 0?void 0:n[2])||"";r&&(i=a=>a+r)}return i}function Nt(){return window.__MOTION_DEV_TOOLS_RECORD}function Wt(t,e,n,i={},s){const r=Nt(),a=i.record!==!1&&r;let o,{duration:f=y.duration,delay:h=y.delay,endDelay:b=y.endDelay,repeat:p=y.repeat,easing:l=y.easing,direction:m,offset:A,allowWebkitAcceleration:I=!1}=i;const g=ot(t),w=ct(e);let D=O.waapi();w&&Ft(t,e);const d=B(e),M=xt(g.values,d),v=F.get(d);return lt(M.animation,!(N(l)&&M.generator)&&i.record!==!1),()=>{const $=()=>{var c,P;return(P=(c=q.get(t,d))!==null&&c!==void 0?c:v==null?void 0:v.initialValue)!==null&&P!==void 0?P:0};let u=Ct(Ut(n),$);const Z=zt(u,v);if(N(l)){const c=l.createAnimation(u,e!=="opacity",$,d,M);l=c.easing,u=c.keyframes||u,f=c.duration||f}if(W(d)&&(O.cssRegisterProperty()?qt(d):D=!1),w&&!O.linearEasing()&&(x(l)||E(l)&&l.some(x))&&(D=!1),D){v&&(u=u.map(S=>L(S)?v.toDefaultUnit(S):S)),u.length===1&&(!O.partialKeyframes()||a)&&u.unshift($());const c={delay:_.ms(h),duration:_.ms(f),endDelay:_.ms(b),easing:E(l)?void 0:k(l,f),direction:m,iterations:p+1,fill:"both"};o=t.animate({[d]:u,offset:A,easing:E(l)?l.map(S=>k(S,f)):void 0},c),o.finished||(o.finished=new Promise((S,dt)=>{o.onfinish=S,o.oncancel=dt}));const P=u[u.length-1];o.finished.then(()=>{q.set(t,d,P),o.cancel()}).catch(nt),I||(o.playbackRate=1.000001)}else if(s&&w)u=u.map(c=>typeof c=="string"?parseFloat(c):c),u.length===1&&u.unshift(parseFloat($())),o=new s(c=>{q.set(t,d,Z?Z(c):c)},u,Object.assign(Object.assign({},i),{duration:f,easing:l}));else{const c=u[u.length-1];q.set(t,d,v&&L(c)?v.toDefaultUnit(c):c)}return a&&r(t,e,u,{duration:f,delay:h,easing:l,repeat:p,offset:A},"motion-one"),M.setAnimation(o),o}}const Bt=(t,e)=>t[e]?Object.assign(Object.assign({},t),t[e]):Object.assign({},t);function Kt(t,e){var n;return typeof t=="string"?e?((n=e[t])!==null&&n!==void 0||(e[t]=document.querySelectorAll(t)),t=e[t]):t=document.querySelectorAll(t):t instanceof Element&&(t=[t]),Array.from(t||[])}const Xt=t=>t(),ut=(t,e,n=y.duration)=>new Proxy({animations:t.map(Xt).filter(Boolean),duration:n,options:e},Gt),Zt=t=>t.animations[0],Gt={get:(t,e)=>{const n=Zt(t);switch(e){case"duration":return t.duration;case"currentTime":return _.s((n==null?void 0:n[e])||0);case"playbackRate":case"playState":return n==null?void 0:n[e];case"finished":return t.finished||(t.finished=Promise.all(t.animations.map(Ht)).catch(nt)),t.finished;case"stop":return()=>{t.animations.forEach(i=>lt(i))};case"forEachNative":return i=>{t.animations.forEach(s=>i(s,t))};default:return typeof(n==null?void 0:n[e])>"u"?void 0:()=>t.animations.forEach(i=>i[e]())}},set:(t,e,n)=>{switch(e){case"currentTime":n=_.ms(n);case"currentTime":case"playbackRate":for(let i=0;i<t.animations.length;i++)t.animations[i][e]=n;return!0}return!1}},Ht=t=>t.finished;function Jt(t,e,n){return x(t)?t(e,n):t}function Qt(t){return function(n,i,s={}){n=Kt(n);const r=n.length,a=[];for(let o=0;o<r;o++){const f=n[o];for(const h in i){const b=Bt(s,h);b.delay=Jt(b.delay,o,r);const p=Wt(f,h,i[h],b,t);a.push(p)}}return ut(a,s,s.duration)}}const Yt=Qt(at);function kt(t,e={}){return ut([()=>{const n=new at(t,[0,1],e);return n.finished.catch(()=>{}),n}],e,e.duration)}function te(t,e,n){return(x(t)?kt:Yt)(t,e,n)}te("body",{opacity:[0,1]},{duration:1});function ft(){for(var t=document.querySelectorAll(".reveal"),e=0;e<t.length;e++){var n=window.innerHeight,i=t[e].getBoundingClientRect().top,s=150;i<n-s?t[e].classList.add("active"):t[e].classList.remove("active")}}window.addEventListener("scroll",ft);ft();function ee(){let t=document.querySelector(".carousel__slider"),e=document.querySelector(".carousel__list");document.querySelectorAll(".carousel__item");let n;const i=1,s=e.offsetWidth;let r=0,a=s;function o(){n=e.cloneNode(!0),t.appendChild(n),n.style.left=`${s}px`}function f(){r-=i,s>=Math.abs(r)?e.style.left=`${r}px`:r=s}function h(){a-=i,n.offsetWidth>=Math.abs(a)?n.style.left=`${a}px`:a=s}o(),setInterval(f,10),setInterval(h,10)}ee();
