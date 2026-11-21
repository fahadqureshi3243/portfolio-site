/* Animated side panels around the hero video (desktop only) */
(function(){
 var bars=[].slice.call(document.querySelectorAll('#bars .bar')),ln=document.getElementById('ln'),kpi=document.getElementById('kpi'),tiles=[].slice.call(document.querySelectorAll('.pbi .t'));
 var rows=[].slice.call(document.querySelectorAll('#flow .row')),step=document.getElementById('step'),ok=document.getElementById('ok');
 function pbi(){bars.forEach(function(b){b.style.transition='none';b.style.height='0'});ln.style.transition='none';ln.style.strokeDashoffset=600;tiles.forEach(function(t){t.classList.remove('on')});kpi.textContent='SAR 0.0M';
  setTimeout(function(){bars.forEach(function(b,i){setTimeout(function(){b.style.transition='';b.style.height=b.dataset.h+'%'},i*160)});
   setTimeout(function(){ln.style.transition='';ln.style.strokeDashoffset=0},1100);
   var t0=performance.now();(function tick(t){var p=Math.min(1,(t-t0)/1800);kpi.textContent='SAR '+(18.4*(1-Math.pow(1-p,3))).toFixed(1)+'M';if(p<1)requestAnimationFrame(tick)})(t0);
   tiles.forEach(function(t,i){setTimeout(function(){t.classList.add('on')},2300+i*250)});},200)}
 function flow(){rows.forEach(function(r){r.classList.remove('on','done')});ok.classList.remove('on');step.textContent='Waiting for invoice…';
  rows.forEach(function(r,i){setTimeout(function(){if(i)rows[i-1].classList.replace('on','done');r.classList.add('on');step.textContent='Step '+(i+1)+'/'+rows.length},500+i*800)});
  setTimeout(function(){rows[rows.length-1].classList.replace('on','done');ok.classList.add('on');step.textContent='Run complete'},500+rows.length*800)}
 if(!kpi||!rows.length)return;
 var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(reduce){bars.forEach(function(b){b.style.height=b.dataset.h+'%'});ln.style.strokeDashoffset=0;kpi.textContent='SAR 18.4M';tiles.forEach(function(t){t.classList.add('on')});rows.forEach(function(r){r.classList.add('done')});ok.classList.add('on');step.textContent='Run complete';return;}
 function loop(){if(document.hidden)return;pbi();flow()} loop(); setInterval(loop,7000);
})();
