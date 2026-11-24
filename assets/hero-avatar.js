/* Fahad avatar intro: waves, says hi, points at the board screen, then the explainer video plays */
(function(){
 var box=document.getElementById('fqa'); if(!box) return;
 var v=box.parentNode.querySelector('video');
 var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(reduce){box.parentNode.removeChild(box);return;}
 if(v){try{v.removeAttribute('autoplay');v.pause();v.currentTime=0;}catch(e){}}
 box.classList.add('on');
 var $=function(id){return document.getElementById(id)};
 var arm=$('fqa-armR'),fore=$('fqa-foreR'),mo=$('fqa-mouthOpen'),teeth=$('fqa-teeth'),lids=[$('fqa-lidL'),$('fqa-lidR')],pup=$('fqa-pup'),brows=$('fqa-brows'),ptr=$('fqa-ptr'),bub=$('fqa-bub'),msg=$('fqa-msg'),glow=$('fqa-glow'),av=$('fqa-avatar');
 var pre="Let's make your numbers work ",word="smarter",post=".",full=pre+word+post;
 var T_TYPE=0.95,CPS=24,T_DONE=T_TYPE+(pre.length+word.length)/CPS,T_POINT=3.6,T_END=6.9;
 var t0=null,ex=0,ey=0,done=false,lastN=-1,lastUl=-1;
 function cl(x){return Math.min(1,Math.max(0,x))}
 function ease(x){x=cl(x);return 1-Math.pow(1-x,3)}
 function back(x){x=cl(x);var c=1.7;return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2)}
 function rot(el,a,cx,cy){el.setAttribute('transform','rotate('+a.toFixed(2)+' '+cx+' '+cy+')')}
 function sy(el,s,cy){el.setAttribute('transform','translate(0 '+(cy*(1-s)).toFixed(2)+') scale(1 '+s.toFixed(3)+')')}
 function render(t,now){
  var b=back((t-0.45)/0.4),bo=1-cl((t-T_POINT-0.3)/0.3);bub.style.opacity=(cl((t-0.45)/0.2)*bo).toFixed(2);bub.style.transform='scale('+(Math.max(0,b)*(0.9+0.1*bo)).toFixed(3)+')';
  var n=Math.max(0,Math.min(full.length,Math.floor((t-T_TYPE)*CPS)));
  var ul=n>=pre.length+word.length?Math.round(ease((t-T_DONE)/0.5)*100):0;
  var caret=n<full.length||(t<T_DONE+1.6&&Math.floor(t*2)%2);
  if(n!==lastN||ul!==lastUl||true){var a=Math.min(n,pre.length),w=Math.min(Math.max(n-pre.length,0),word.length),c=Math.max(n-pre.length-word.length,0);
   msg.innerHTML=pre.slice(0,a)+(w?'<em>'+word.slice(0,w)+'<i style="width:'+ul+'%"></i></em>':'')+post.slice(0,c)+(caret?'<span class="fqa-caret"></span>':'');lastN=n;lastUl=ul;}
  var fr=0;if(t>0.3&&t<2.5){fr=Math.sin((t-0.3)*9)*15*cl((2.5-t)*2)*cl((t-0.3)*4)}
  rot(fore,fr,492,418);rot(arm,0,408,505);
  var k=ease((t-T_POINT)/0.55);arm.style.opacity=(1-cl((t-T_POINT)/0.12)).toFixed(2);
  ptr.setAttribute('opacity',cl((t-T_POINT)/0.1).toFixed(2));
  var pk=back((t-T_POINT)/0.6);rot(ptr,(1-pk)*120,324,782);
  var talk=t>0.5&&t<T_DONE+0.2?Math.abs(Math.sin(t*17))*0.9+0.08:0.08;sy(mo,talk,372);teeth.style.opacity=talk>0.55?1:0;
  var r=(t>T_DONE-0.4&&t<T_DONE+0.6)?-8*Math.sin(cl((t-(T_DONE-0.4)))*Math.PI):0;brows.setAttribute('transform','translate(0 '+r.toFixed(1)+')');
  var bt=(now/1000)%4.4,bl=bt<0.08?bt/0.08:bt<0.18?1-(bt-0.08)/0.1:0;lids.forEach(function(l){sy(l,bl,232)});
  pup.setAttribute('transform','translate('+ex.toFixed(1)+' '+ey.toFixed(1)+')');
  var g=t>T_POINT+0.45?Math.sin(cl((t-T_POINT-0.45)/1.2)*Math.PI):0;glow.style.opacity=g.toFixed(2);
 }
 function finish(){if(done)return;done=true;box.classList.add('out');if(v){var p=v.play();if(p&&p.catch)p.catch(function(){});}
  setTimeout(function(){if(box.parentNode)box.parentNode.removeChild(box)},700);}
 function frame(now){if(done)return;if(t0===null)t0=now;var t=(now-t0)/1000;render(t,now);if(t>=T_END){finish();return}requestAnimationFrame(frame)}
 sy(mo,0.08,372);lids.forEach(function(l){sy(l,0,232)});
 // start when the scene is on screen (or right away if already visible)
 var started=false;function go(){if(started)return;started=true;requestAnimationFrame(frame)}
 if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){go();io.disconnect()}})},{threshold:0.4});io.observe(box)}else go();
 box.addEventListener('click',finish);
 document.addEventListener('mousemove',function(e){var r=av.getBoundingClientRect();if(!r.width)return;var cx=r.left+r.width*0.5,cy=r.top+r.height*0.26,dx=e.clientX-cx,dy=e.clientY-cy,d=Math.hypot(dx,dy)||1,m=Math.min(7,d/30);ex=dx/d*m;ey=dy/d*m});
})();
