(()=>{var e={10:()=>{const e=document.getElementById("canvas"),n=e.getContext("2d"),t=document.getElementById("score"),o=document.getElementById("high"),a=document.getElementById("fault_div"),l=(document.getElementById("elapsed_div"),document.getElementById("squashed_div")),i=(document.getElementById("start"),document.getElementById("start-section-wrapper")),r=document.getElementById("info"),s=(document.getElementById("keypad"),document.getElementById("themes")),c=(document.getElementById("showlog"),document.getElementById("game-canvas")),d=document.getElementById("logpanel"),g=document.getElementById("display_log"),h=(document.getElementById("about"),document.getElementById("aboutpanel")),p=document.getElementById("settingspanel"),u=document.getElementById("soundtoggle");document.getElementById("toggleSwitchCircle");let m=null===localStorage.getItem("sound")||JSON.parse(localStorage.getItem("sound"));function y(e){e?u.classList.add("on"):u.classList.remove("on")}y(m),u.onclick=function(){m=!m,y(m),localStorage.setItem("sound",m)};let f=new Howl({src:["./sounds/pops.wav"],volume:.2}),x=new Howl({src:["./sounds/dun-dun-dun.mp3"]}),b=new Howl({src:["./sounds/disable.mp3"],volume:.2}),w=new Howl({src:["./sounds/pfff.mp3"],volume:.2}),v=new Howl({src:["./sounds/fanfare.mp3"],volume:.2}),k=new Howl({src:["./sounds/switch-on.mp3"],volume:.2}),I=localStorage.getItem("high"),E=localStorage.getItem("ru"),S=localStorage.getItem("theme"),B=JSON.parse(localStorage.getItem("log")||"[]");I&&(o.innerText="Best Score: "+I),r.style.display="none",E?be():(xe(),localStorage.setItem("ru",!0));const C=window.devicePixelRatio;let M,T,N,P,z,L,A,H,j,D,F,O,R,q,_,J,X,$,U,W=[];const G={basic:{canvasBackground:"#eeeeee",color0:"#222222",color1:"#222222",explosionColor:["red","yellow","orange","white"]},grass:{canvasBackground:"green",color0:"lightyellow",color1:"lightyellow",explosionColor:["red","yellow","orange","white"]},homebrew:{canvasBackground:"#222",color0:"#39ff14",color1:"#39ff14",explosionColor:["red","yellow","orange","white"]},manpage:{canvasBackground:"#FFFAA0",color0:"#222",color1:"#222",explosionColor:["red","yellow","orange","white"]},ocean:{canvasBackground:"#113366",color0:"#eeeeee",color1:"#eeeeee",explosionColor:["red","yellow","orange","white"]},redsands:{canvasBackground:"#b35656",color0:"#dee0b0",color1:"#dee0b0",explosionColor:["red","yellow","orange","white"]},circles:{canvasBackground:"#444",background0:"#000",background1:"white",color0:"white",color1:"#000",explosionColor:["black","white"]}};function K(){M=[],T=!1,N=0,P=24,z=.4,L=2*P,A=L,W=[],H=null,j=0,D=[],F=[],R=0,q=0,J=G[_].explosionColor,X=G[_].color0,$=G[_].color1,e.style.backgroundColor=G[_].canvasBackground,U=0,t.classList.remove("best")}_=S||"circles",s.value=_,K();let Q=[{min:1,max:16,speed:.4},{min:1,max:32,speed:.5},{min:1,max:64,speed:.6},{min:1,max:128,speed:.7},{min:1,max:255,speed:.8}];const V=e=>e.toString(2).padStart(8,"0").split("");class Y{constructor(e,n,t,o,a){this.id=N++,this.x=e,this.y=n,this.decimal=t,this.bits=[],this.radius=a,this.binary=o,this.makeBits(o)}makeBits=function(e){for(const n of e){let e=new Z(this.x,this.y,n,this.radius);this.x=this.x+2*this.radius+1,this.bits.push(e)}};render=function(e){for(const n of this.bits)n.y=this.y,n.render(e)};move=function(e){this.y+=e}}class Z{constructor(e,n,t,o){this.x=e,this.y=n,this.value=t,this.radius=o}render=function(e){"circles"===_&&(e.beginPath(),e.arc(this.x,this.y,this.radius,0,2*Math.PI,!1),e.fillStyle="1"===this.value?G[_].background1:G[_].background0,e.fill(),e.lineWidth=1,e.strokeStyle="1"===this.value?$:X,e.stroke(),e.closePath()),e.fillStyle="1"===this.value?$:X,e.font="24px Helvetica",e.textAlign="center",e.textBaseline="middle",e.fillText(this.value,this.x,this.y)}}const ee=()=>{if(n){n.clearRect(0,0,n.canvas.width,n.canvas.height),R=parseInt((new Date-O)/1e3);let t=(e=>{let n=0;return n=e<=150?0:e<=250?1:e<=500?2:e<=1e3?3:4,n})(j),o=Q[t];if((n=>{if(L+=n.speed,L<A)return;L=0;let t=(o=n.min,a=n.max,Math.floor(Math.random()*(a-o+1)+o));var o,a;let l=e.width/(2*C)-7*P-3,i=-P,r=V(t),s=new Y(l,i,t,r,P);M.push(s)})(o),le(o.speed),H){let e=ie(H),n=0;if(e.length>0){de(e),n=H*e.length;for(const n of e)F.push({d:n.decimal,b:n.binary.join("")})}else n=-5,q++,r.innerText="FOUL!",m&&b.play();j+=n,H=null}pe();let a=window.requestAnimationFrame(ee),l=M[0];l&&l?.y+l?.radius>n.canvas.height/window.devicePixelRatio&&(window.cancelAnimationFrame(a),function(){T=!1,fe(),W=[],i.style.display="block",r.style.display="none",I||(I=0),j>parseInt(I)&&(I=j,localStorage.setItem("high",I.toString()),JSON.parse(localStorage.getItem("log")||"[]").length>0&&m&&v.play()),B.push({d:new Date,t:R,f:q,p:j,s:F.length}),localStorage.setItem("log",JSON.stringify(B));for(const e of M)for(const n of e?.bits)D.push(new he(n.x,n.y,20))}()),ne()}};function ne(){t.innerText=j.toString(),l.innerHTML=F.length,a.innerText=q.toString(),I&&(o.innerText="Best Score: "+I),j>(parseInt(I)||0)&&t.classList.add("best")}const te=e=>{if(n){let t=e;n.clearRect(0,0,n.canvas.width,n.canvas.height),oe(t,"white")}};function oe(e,t){n.fillStyle=t,n.font="40px monospace",n.textAlign="center",n.textBaseline="middle",n.fillText(e,n.canvas.width/window.devicePixelRatio/2-e.length/2,n.canvas.height/window.devicePixelRatio/2)}const ae=()=>{n.clearRect(0,0,n.canvas.width,n.canvas.height),oe("Squash Byte","rgba(255, 255, 255, "+U+")"),U+=.05,pe();let e=window.requestAnimationFrame(ae);D.length<=0&&(window.cancelAnimationFrame(e),ye(-1))},le=e=>{for(const t of M)t.move(e),t.render(n)},ie=e=>{let n=[];for(const[t,o]of M.entries())o.decimal===e&&o.y+o.radius>0&&(n.push(o),m&&f.play(),re(o),ce(t));return n},re=e=>{let n=e?.bits;if(n)for(const e of n)se(e.x,e.y,e.radius),D.push(new he(e.x,e.y,10))};function se(e,t,o){for(var a=0;a<Math.round(Math.PI*o);a++){var l=a/Math.round(Math.PI*o)*360;n.clearRect(e,t,Math.sin(l*(Math.PI/180))*o,Math.cos(l*(Math.PI/180))*o)}}const ce=e=>{for(let t=e;t>=0;t--){let e=M[t];e.y=e.y-2*e.radius,e.render(n)}},de=e=>{M=M.filter((n=>!e.find((({id:e})=>n.id===e))))};(e=>{const n=e.canvas;n&&(n.width=Math.floor(400*C),n.height=Math.floor(400*C),e.scale(C,C))})(n);class ge{constructor(e,n){this.x=e,this.y=n,this.xv=this.rand(1,5,!1),this.yv=this.rand(1,5,!1),this.size=this.rand(1,4,!0),this.r=this.rand(113,222),this.g="00",this.b=this.rand(105,255)}rand(e,n,t){let o;return!1===t?(o=Math.floor(Math.random()*n)-e,o*=1===Math.floor(2*Math.random())?1:-1):o=Math.floor(Math.random()*n)+e,o}}class he{constructor(e,n,t){this.particles=[],this.x=e,this.y=n;for(let o=0;o<t;o++)this.particles.push(new ge(e,n))}}function pe(){if(0!==D.length)for(let e=0;e<D.length;e++){const t=D[e],o=t.particles;if(0===o.length)return void D.splice(e,1);const a=o.slice();for(let e=0;e<o.length;e++){const t=o[e];t.size<=0?a.splice(e,1):(n.beginPath(),n.arc(t.x,t.y,t.size,2*Math.PI,0,!1),n.closePath(),n.fillStyle=J[Math.floor(Math.random()*J.length)],n.fill(),t.x+=t.xv,t.y+=t.yv,t.size-=.1)}t.particles=a}}const ue=e=>{H=parseInt(e)};function me(e){return new Promise((n=>setTimeout(n,e)))}function ye(e){K(),ne(),async function(e){for(let n=e;n>=-1;n--){let e=n<=0?"Squash Byte":n.toString();te(e),0===n&&m&&x.play(),await me(1e3)}}(e).then((()=>{T=!0,O=new Date,ee()}))}function fe(){Array.from(document.querySelectorAll(".key-pad-button")).forEach((e=>{e.classList.remove("clicked")})),r.innerText=""}function xe(){c.style.display="none",h.style.display="block"}function be(){c.style.display="block",h.style.display="none"}window.addEventListener("keydown",(e=>{const n=/^[0-9]$/i.test(e.key);m&&"Enter"!=e.key&&k.play(),T&&(n&&W.length<3&&W.push(e.key),"Enter"===e.key&&(W.length>0&&ue(W.join("")),W=[]),"Delete"!==e.key&&"Backspace"!==e.key||W.pop(),r.innerText=W.join(""))}),!0),document.addEventListener("input",(function(t){"themes"===t.target.id&&(_=t.target.value,(t=>{J=G[t].explosionColor,X=G[t].color0,$=G[t].color1,e.style.backgroundColor=G[t].canvasBackground,n.clearRect(0,0,n.canvas.width,n.canvas.height);let o=e.width/(2*C)-7*P-3,a=2*P,l=V(85);new Y(o,a,85,l,P).render(n),localStorage.setItem("theme",t)})(_))}),!1),document.addEventListener("click",(function(e){if(T&&e.target.classList.contains("key-pad-button")||"key-pad-button-submit"===e.target.className){let n=e.target.value;m&&"submit"!=n&&k.play(),/^[0-9]$/i.test(n)&&W.length<3&&W.push(n),"submit"===n&&(W.length>0&&ue(W.join("")),W=[]),"clear"===n&&W.pop(),r.innerText=W.join("")}T||"start"!==e.target.id||(fe(),i.style.display="none",r.style.display="block",D.length>0?(m&&w.play(),ae()):ye(3)),T||"showlog"!==e.target.id||function(){c.style.display="none",d.style.display="block",g.replaceChildren();let e=JSON.parse(localStorage.getItem("log")||"[]");if(e.length>0){let n=document.createElement("table"),t=document.createElement("tr"),o=document.createElement("th");o.innerText="#",o.className="left-align",t.appendChild(o);let a=document.createElement("th");a.innerText="Date",a.className="left-align",t.appendChild(a);let l=document.createElement("th");l.className="right-align",l.innerText="Duration",t.appendChild(l);let i=document.createElement("th");i.className="right-align",i.innerText="Squashes",t.appendChild(i);let r=document.createElement("th");r.className="right-align",r.innerText="Fouls",t.appendChild(r);let s=document.createElement("th");s.className="right-align",s.innerText="Score",t.appendChild(s),n.appendChild(t);let c=1;for(const t of e){let e=document.createElement("tr");t.p===(parseInt(I)||0)&&(e.className="high-score-row");let o=document.createElement("td");o.innerText=c.toString(),c++,e.appendChild(o);let a=document.createElement("td");const l=new Date(t.d);let i=l.toLocaleDateString("en",{year:"2-digit"}),r=l.getMonth()+"/"+l.getDate()+"/"+i+" "+("0"+l.getHours()).slice(-2)+":"+("0"+l.getMinutes()).slice(-2);a.innerText=r,e.appendChild(a);let s=document.createElement("td");s.className="right-align",s.innerText=t.t,e.appendChild(s);let d=document.createElement("td");d.className="right-align",d.innerText=t?.s,e.appendChild(d);let g=document.createElement("td");g.className="right-align",g.innerText=t.f,e.appendChild(g);let h=document.createElement("td");h.className="right-align",h.innerText=t.p,e.appendChild(h),n.appendChild(e)}g.appendChild(n)}else{let e=document.createElement("div");e.innerHTML="empty",g.appendChild(e)}}(),T||"about"!==e.target.id||xe(),"closeabout"===e.target.id&&be(),T||"settings"!==e.target.id||(c.style.display="none",p.style.display="block"),"closesettings"===e.target.id&&(c.style.display="block",p.style.display="none"),"back"===e.target.id&&(c.style.display="block",d.style.display="none")}),!1)},314:(e,n,t)=>{"use strict";var o=t(81),a=t.n(o),l=t(645);t.n(l)()(a()).push([e.id,'body {\n  font-family: "Courier New", Courier, monospace;\n}\n\nh2 {\n  text-align: center;\n  margin-bottom: 0;\n  margin-top: 10px;\n}\n\n* {\n  touch-action: manipulation;\n}\n\n.container {\n  max-width: 500px;\n  margin: auto;\n}\n\nmain {\n  border: 1px solid #222;\n  border-radius: 4px;\n  padding: 10px;\n  background-color: beige;\n  color: #222;\n}\n\n.canvas {\n  width: 100%;\n}\n\n.start-section {\n  margin-top: 8px;\n  display: grid;\n  gap: 4px;\n  grid-template-columns: repeat(8, 1fr);\n}\n.start-section-item {\n  font-size: 22px;\n  border-radius: 4px;\n  text-transform: uppercase;\n}\n\n#start {\n  background-color: darkred;\n  color: white;\n  width: 100%;\n  grid-column: span 5;\n}\n\n#settings,\n#showlog,\n#about {\n  background-color: transparent;\n  color: #222;\n}\n\n.score-card {\n  display: grid;\n  grid-template-columns: 1.3fr 1fr 1fr;\n  text-transform: lowercase;\n  background-color: #222;\n  color: white;\n  padding: 4px;\n  border-radius: 4px;\n  font-size: 14px;\n  align-items: center;\n  text-transform: capitalize;\n}\n\n.score-card-item {\n  display: flex;\n  gap: 1px;\n  align-items: center;\n}\n\n.flex-grow {\n  flex-grow: 1;\n}\n\n.input-button {\n  gap: 4px;\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n}\n\n.key-pad {\n  width: 100%;\n  margin: auto;\n  margin-top: 8px;\n}\n\n.key-pad-button {\n  height: 45px;\n  line-height: 45px;\n  border-radius: 4px;\n  background-color: #222;\n  color: white;\n  font-size: 32px;\n}\n\n.key-pad-button.hex {\n  background-color: lightseagreen;\n  color: #222;\n}\n\n#info {\n  color: #222;\n  font-weight: 600;\n  text-align: center;\n  margin-top: 8px;\n  font-size: 22px;\n  line-height: 28px;\n  height: 28px;\n  border-radius: 4px;\n  border: 1px solid #222;\n}\n\n.key-pad-button.submit {\n  background-color: darkgreen;\n}\n\n.hidden {\n  display: none;\n}\n\nbutton {\n  border: none;\n  box-shadow: none;\n}\n\n.clicked {\n  background-color: #666;\n}\n\n.log-header,\n.help-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  border-bottom: 1px double #222;\n  margin-bottom: 10px;\n  padding-bottom: 4px;\n}\n\n#back,\n#closeabout,\n#closesettings {\n  background-color: darkred;\n  color: white;\n  height: 25px;\n  line-height: 25px;\n  font-size: 20px;\n  border-radius: 4px;\n}\n#logpanel {\n  min-height: 500px;\n  font-size: 12px;\n  font-family: Arial, Helvetica, sans-serif;\n  color: black;\n}\n\n#aboutpanel {\n  font-size: 18px;\n  font-family: Arial, Helvetica, sans-serif;\n  color: black;\n}\n\ntable {\n  width: 100%;\n  border-collapse: collapse;\n}\n\ntable,\ntr,\nth,\ntd {\n  border: 1px solid #222;\n  padding: 4px;\n}\n\n.left-align {\n  text-align: left;\n}\n.right-align {\n  text-align: right;\n}\n\n.high-score-row {\n  color: firebrick;\n}\n\n.best {\n  color: gold;\n}\n\n.binarytable {\n  border: 0;\n  background-color: lightgrey;\n}\n\n.binarytable tr,\n.binarytable th,\n.binarytable td {\n  border: 0;\n}\n\n.ball {\n  border-radius: 50%;\n  width: 25px;\n  height: 25px;\n  background-color: #222;\n  border: 1px solid white;\n  color: white;\n  margin: auto;\n  font-size: 14px;\n  line-height: 25px;\n}\n\n.ball.one {\n  background-color: white;\n  border: 1px solid #222;\n  color: #222;\n}\n\n.binarytable td {\n  width: 50px;\n  text-align: center;\n}\n\n.binarytable td.highlight {\n  background-color: silver;\n}\n\n.toggleButton {\n  width: 54px;\n  min-width: 54px;\n  display: block;\n  border: 1px black solid;\n  border-radius: 30px;\n  transition: 0.5s;\n  background-color: gray;\n}\n.toggleSwitchCircle {\n  display: block;\n  width: 25px;\n  height: 25px;\n  border: 1px black solid;\n  background-color: white;\n  border-radius: 50%;\n  transition: 0.5s;\n  transform: translateX(0%);\n}\n\n.toggleButton.on {\n  background-color: green;\n}\n\n.toggleButton.on > .toggleSwitchCircle {\n  transform: translateX(100%);\n}\n\n.setting {\n  display: flex;\n  gap: 5px;\n  align-items: center;\n  justify-content: space-between;\n  height: 24px;\n  margin-bottom: 20px;\n  line-height: 24px;\n}\n\n.settinglabel {\n  font-weight: 600;\n}\n',""])},645:e=>{"use strict";e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t="",o=void 0!==n[5];return n[4]&&(t+="@supports (".concat(n[4],") {")),n[2]&&(t+="@media ".concat(n[2]," {")),o&&(t+="@layer".concat(n[5].length>0?" ".concat(n[5]):""," {")),t+=e(n),o&&(t+="}"),n[2]&&(t+="}"),n[4]&&(t+="}"),t})).join("")},n.i=function(e,t,o,a,l){"string"==typeof e&&(e=[[null,e,void 0]]);var i={};if(o)for(var r=0;r<this.length;r++){var s=this[r][0];null!=s&&(i[s]=!0)}for(var c=0;c<e.length;c++){var d=[].concat(e[c]);o&&i[d[0]]||(void 0!==l&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=l),t&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=t):d[2]=t),a&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=a):d[4]="".concat(a)),n.push(d))}},n}},81:e=>{"use strict";e.exports=function(e){return e[1]}}},n={};function t(o){var a=n[o];if(void 0!==a)return a.exports;var l=n[o]={id:o,exports:{}};return e[o](l,l.exports,t),l.exports}t.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return t.d(n,{a:n}),n},t.d=(e,n)=>{for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},t.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),t(10),t(314)})();