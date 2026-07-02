(function(){

var CSS=`
#yl-loader{position:fixed;inset:0;background:#000;z-index:99999;display:flex;align-items:center;justify-content:center;flex-direction:column;overflow:hidden;}
#yl-loader canvas{position:absolute;inset:0;width:100%;height:100%;}
#yl-tagline{position:relative;z-index:2;text-align:center;opacity:0;transform:translateY(6px);transition:opacity 0.5s,transform 0.5s;pointer-events:none;}
#yl-tagline span{font-family:-apple-system,'PingFang SC','Noto Sans SC',sans-serif;font-size:clamp(0.7rem,2vw,0.85rem);letter-spacing:0.32em;color:rgba(129,216,208,0.82);}
#yl-logo{position:absolute;z-index:2;text-align:center;opacity:0;pointer-events:none;}
#yl-logo-text{font-family:'Playfair Display',Georgia,serif;font-size:clamp(2rem,6vw,3.2rem);font-weight:700;color:#fff;letter-spacing:0.14em;}
#yl-logo-sub{opacity:0;transition:opacity 0.8s 0.2s;margin-top:10px;}
#yl-logo-line{width:80px;height:1px;background:linear-gradient(90deg,transparent,#81D8D0,transparent);margin:0 auto 8px;}
#yl-logo-lab{font-family:-apple-system,'PingFang SC',sans-serif;font-size:clamp(0.62rem,1.5vw,0.72rem);color:rgba(129,216,208,0.6);letter-spacing:0.28em;}
`;

var s=document.createElement('style');s.textContent=CSS;document.head.appendChild(s);

var el=document.createElement('div');el.id='yl-loader';
el.innerHTML='<canvas id="yl-c"></canvas>'
  +'<div id="yl-tagline"><span id="yl-tg"></span></div>'
  +'<div id="yl-logo">'
  +'<div id="yl-logo-text"></div>'
  +'<div id="yl-logo-sub"><div id="yl-logo-line"></div><div id="yl-logo-lab">闫丽盈实验室 · 北医三院</div></div>'
  +'</div>';
function start(){
  document.body.insertBefore(el,document.body.firstChild);
  initPts();initGrid();
  st=Date.now();
  document.fonts.ready.then(function(){draw();});
}
if(document.body) start();
else document.addEventListener('DOMContentLoaded',start);

var c=document.getElementById('yl-c'),ctx=c.getContext('2d');
var W,H,cx,cy,raf,st;

function resize(){
  var p=c.parentElement;
  W=c.width=p.offsetWidth||window.innerWidth;
  H=c.height=p.offsetHeight||window.innerHeight;
  cx=W/2;cy=H/2;
}
resize();
window.addEventListener('resize',resize);

var COLS=['129,216,208','232,115,74','167,139,202','245,200,66'];
var BASES=['A','T','C','G'];
var BCOLORS={'A':'#81D8D0','T':'#E8734A','C':'#A78BCA','G':'#F5C842'};
var GLITCH='ATCG01アイウエABCDF∴∵◈◉';
var TAGLINE='准备迎接生命起点';
var WORD='YanLab';
var TOTAL=7200;

var pts=[],grid=[],meteors=[];

function initPts(){
  pts=[];
  for(var i=0;i<300;i++){
    var a=Math.random()*Math.PI*2,d=30+Math.random()*Math.min(W,H)*0.55;
    pts.push({a:a,d:d,spd:0.003+Math.random()*0.005,sz:0.4+Math.random()*1.6,
      op:0.1+Math.random()*0.7,col:COLS[i%4],ph:Math.random()*Math.PI*2,tw:0.3+Math.random()*0.7});
  }
}

function initGrid(){
  grid=[];
  var cols=Math.floor(W/28),rows=Math.floor(H/22);
  for(var r=0;r<rows;r++) for(var cc=0;cc<cols;cc++)
    grid.push({x:cc*28+14,y:r*22+11,ch:BASES[Math.floor(Math.random()*4)],
      col:BCOLORS[BASES[Math.floor(Math.random()*4)]],t:Math.random()*80,life:Math.random()});
}

function eio(t){return t<0.5?2*t*t:1-Math.pow(-2*t+2,2)/2;}
function ph(t,s,e){return Math.max(0,Math.min(1,(t-s)/(e-s)));}

function glitchStr(word,progress){
  var r='';
  for(var i=0;i<word.length;i++){
    if(progress>=(i+1)/word.length) r+=word[i];
    else if(progress>i/word.length) r+=GLITCH[Math.floor(Math.random()*GLITCH.length)];
    else r+=' ';
  }
  return r;
}

function draw(){
  var now=Date.now();
  var t=Math.min((now-st)/TOTAL,1);
  var dt=now*0.001;

  ctx.fillStyle='rgba(0,0,4,0.18)';ctx.fillRect(0,0,W,H);

  // stars / particles
  pts.forEach(function(p){
    p.a+=p.spd*(0.5+t*0.5);
    var conv=eio(Math.min(t*2,1));
    var r=p.d*(1-conv*0.4*(1+0.3*Math.sin(dt+p.ph)));
    var px=cx+Math.cos(p.a)*r,py=cy+Math.sin(p.a)*r;
    var tw=0.5+0.5*Math.sin(dt*p.tw*3+p.ph);
    ctx.beginPath();ctx.arc(px,py,p.sz*(0.7+tw*0.5),0,Math.PI*2);
    ctx.fillStyle='rgba('+p.col+','+(p.op*(0.4+t*0.6)*tw)+')';ctx.fill();
  });

  // ATCG matrix
  var matA=ph(t,0,0.35);matA=matA<0.2?matA/0.2:matA>0.72?(1-matA)/0.28:1;
  if(matA>0){
    ctx.save();
    grid.forEach(function(g){
      g.t--;
      if(g.t<=0){g.ch=BASES[Math.floor(Math.random()*4)];g.col=BCOLORS[g.ch];g.t=15+Math.random()*40;}
      var dc=Math.hypot(g.x-cx,g.y-cy)/Math.min(W,H);
      var wave=Math.sin(dt*2-dc*8+g.life*Math.PI);
      var a=matA*(0.05+wave*0.05+g.life*0.07)*(1-dc*0.6);
      if(a<0.015)return;
      ctx.globalAlpha=a;ctx.fillStyle=g.col;ctx.font='500 11px monospace';ctx.fillText(g.ch,g.x-5,g.y+4);
    });
    ctx.restore();
  }

  // meteors
  if(t>0.04&&t<0.5&&Math.random()<0.06)
    meteors.push({x:-50,y:Math.random()*H*0.65,len:80+Math.random()*120,
      spd:6+Math.random()*8,a:Math.PI*0.08+Math.random()*0.15,life:1,
      col:Math.random()<0.7?'129,216,208':'232,115,74'});
  ctx.save();
  meteors=meteors.filter(function(m){
    m.x+=Math.cos(m.a)*m.spd;m.y+=Math.sin(m.a)*m.spd;m.life-=0.035;
    if(m.life<=0||m.x>W+100)return false;
    var g=ctx.createLinearGradient(m.x,m.y,m.x-Math.cos(m.a)*m.len,m.y-Math.sin(m.a)*m.len);
    g.addColorStop(0,'rgba('+m.col+','+m.life+')');g.addColorStop(1,'rgba('+m.col+',0)');
    ctx.beginPath();ctx.moveTo(m.x,m.y);ctx.lineTo(m.x-Math.cos(m.a)*m.len,m.y-Math.sin(m.a)*m.len);
    ctx.strokeStyle=g;ctx.lineWidth=1.5;ctx.stroke();
    ctx.beginPath();ctx.arc(m.x,m.y,2,0,Math.PI*2);ctx.fillStyle='rgba('+m.col+','+m.life+')';ctx.fill();
    return true;
  });
  ctx.restore();

  // DNA helix
  var dnaA=ph(t,0.18,0.62);dnaA=dnaA<0.12?dnaA/0.12:dnaA>0.82?(1-dnaA)/0.18:1;
  if(dnaA>0){
    ctx.save();ctx.globalAlpha=dnaA;
    var dt2=eio(ph(t,0.18,0.62)),spin=t*6,nPts=40;
    var dnaH=Math.min(H*0.78,400),dnaW=Math.min(W*0.07,52)*dt2;
    for(var strand=0;strand<2;strand++){
      var sc=strand===0?'#81D8D0':'#E8734A';
      ctx.beginPath();
      for(var i=0;i<=nPts;i++){
        var f=i/nPts,a=f*Math.PI*6-spin+strand*Math.PI;
        ctx.lineTo(cx+Math.cos(a)*dnaW,cy-dnaH/2+f*dnaH);
      }
      ctx.shadowBlur=18;ctx.shadowColor=sc;ctx.strokeStyle=sc;ctx.lineWidth=2.5;ctx.lineCap='round';ctx.stroke();
      ctx.shadowBlur=4;ctx.lineWidth=1;ctx.strokeStyle='rgba(255,255,255,0.55)';ctx.stroke();ctx.shadowBlur=0;
    }
    for(var i=0;i<=nPts;i+=3){
      var f=i/nPts,a1=f*Math.PI*6-spin,a2=a1+Math.PI;
      var px1=cx+Math.cos(a1)*dnaW,py=cy-dnaH/2+f*dnaH,px2=cx+Math.cos(a2)*dnaW;
      var vis=Math.abs(Math.cos(a1));if(vis<0.1)continue;
      ctx.globalAlpha=dnaA*vis*0.3;
      ctx.beginPath();ctx.moveTo(px1,py);ctx.lineTo(px2,py);
      ctx.strokeStyle='rgba(255,255,255,0.35)';ctx.lineWidth=1;ctx.stroke();
      [[px1,'#81D8D0'],[px2,'#E8734A']].forEach(function(d){
        ctx.globalAlpha=dnaA*vis;ctx.beginPath();ctx.arc(d[0],py,4+vis*2,0,Math.PI*2);
        ctx.fillStyle=d[1];ctx.shadowBlur=12;ctx.shadowColor=d[1];ctx.fill();ctx.shadowBlur=0;
      });
    }
    var scanY=cy-dnaH/2+((dt*0.5%1)*dnaH);
    ctx.globalAlpha=dnaA*0.15;ctx.fillStyle='rgba(129,216,208,0.3)';
    ctx.fillRect(cx-dnaW*2.5,scanY,dnaW*5,2);
    ctx.restore();
  }

  // cell division
  var cellA=ph(t,0.48,0.82);
  if(cellA>0){
    ctx.save();
    var ct=eio(cellA),fadeA=cellA<0.1?cellA/0.1:cellA>0.88?(1-cellA)/0.12:1;
    ctx.globalAlpha=fadeA;
    var maxR=Math.min(W,H)*0.1;
    for(var ring=0;ring<3;ring++){
      var rp=Math.max(0,(ct-ring*0.15)/0.85);if(rp<=0)continue;
      ctx.beginPath();ctx.arc(cx,cy,rp*Math.min(W,H)*0.38,0,Math.PI*2);
      ctx.strokeStyle='rgba(129,216,208,'+(0.28*(1-rp))+')';
      ctx.lineWidth=1.5*(1-rp)+0.5;ctx.stroke();
    }
    function gc(x,y,r,a2){
      ctx.globalAlpha=fadeA*a2;
      var ng=ctx.createRadialGradient(cx+x,cy+y,0,cx+x,cy+y,r*2.8);
      ng.addColorStop(0,'rgba(129,216,208,'+(a2*0.18)+')');ng.addColorStop(1,'rgba(129,216,208,0)');
      ctx.fillStyle=ng;ctx.beginPath();ctx.arc(cx+x,cy+y,r*2.8,0,Math.PI*2);ctx.fill();
      var ig=ctx.createRadialGradient(cx+x-r*.2,cy+y-r*.2,r*.05,cx+x,cy+y,r);
      ig.addColorStop(0,'rgba(180,240,232,'+(a2*0.25)+')');ig.addColorStop(1,'rgba(129,216,208,0)');
      ctx.fillStyle=ig;ctx.beginPath();ctx.arc(cx+x,cy+y,r,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.arc(cx+x,cy+y,r,0,Math.PI*2);
      ctx.strokeStyle='rgba(129,216,208,'+(a2*0.9)+')';ctx.lineWidth=1.5;
      ctx.shadowBlur=14;ctx.shadowColor='#81D8D0';ctx.stroke();ctx.shadowBlur=0;
      ctx.beginPath();ctx.arc(cx+x,cy+y,r*.25,0,Math.PI*2);
      ctx.fillStyle='rgba(129,216,208,'+(a2*0.8)+')';ctx.shadowBlur=8;ctx.shadowColor='#81D8D0';ctx.fill();ctx.shadowBlur=0;
    }
    if(ct<0.25){gc(0,0,maxR*eio(ct/0.25),1);}
    else if(ct<0.5){var p=(ct-.25)/.25,sep=eio(p)*maxR*1.4;gc(-sep/2,0,maxR,1);gc(sep/2,0,maxR,1);}
    else if(ct<0.75){var p=(ct-.5)/.25,hs=eio(p)*maxR*.78,sx=maxR*1.35;[[-1,-1],[-1,1],[1,-1],[1,1]].forEach(function(d){gc(d[0]*sx/2,d[1]*hs,maxR*.84,1);});}
    else{
      var sx=maxR*1.35,sy=maxR*.78,gp=(ct-.75)/.25;
      [[-1,-1],[-1,1],[1,-1],[1,1]].forEach(function(d){gc(d[0]*sx/2,d[1]*sy,maxR*.84,1);});
      var bg=ctx.createRadialGradient(cx,cy,0,cx,cy,maxR*3.5*gp);
      bg.addColorStop(0,'rgba(129,216,208,'+(0.45*gp)+')');bg.addColorStop(1,'rgba(129,216,208,0)');
      ctx.globalAlpha=fadeA*gp*0.5;ctx.fillStyle=bg;ctx.beginPath();ctx.arc(cx,cy,maxR*4*gp,0,Math.PI*2);ctx.fill();
    }
    ctx.restore();
  }

  // tagline: glitch in 0.62→0.80, hold 0.80→0.88, fade out 0.88→0.96
  var tgEl=document.getElementById('yl-tagline');
  var tgTxt=document.getElementById('yl-tg');
  var tagIn=ph(t,0.62,0.80);
  var tagOut=ph(t,0.88,0.96);

  if(t>=0.62&&t<0.96){
    tgEl.style.opacity=tagOut>0?(1-tagOut):1;
    tgEl.style.transform='translateY(0)';
    if(tagOut===0){
      var cp=Math.min(tagIn/0.7,1);
      var rev='';
      for(var i=0;i<TAGLINE.length;i++){
        if(cp>=(i+1)/TAGLINE.length) rev+=TAGLINE[i];
        else if(cp>i/TAGLINE.length) rev+=GLITCH[Math.floor(Math.random()*GLITCH.length)];
        else rev+=' ';
      }
      tgTxt.textContent=rev;
      tgTxt.style.color=cp<1&&Math.random()<0.15?'#E8734A':'rgba(129,216,208,0.82)';
    } else {
      tgTxt.textContent=TAGLINE;
      tgTxt.style.color='rgba(129,216,208,0.82)';
    }
  } else {
    tgEl.style.opacity=0;
    if(t<0.62) tgEl.style.transform='translateY(6px)';
  }

  // logo: starts at 0.97 — after tagline fully gone
  var logoA=ph(t,0.97,1);
  var ltEl=document.getElementById('yl-logo-text');
  var llEl=document.getElementById('yl-logo-sub');
  var logoEl=document.getElementById('yl-logo');

  if(logoA>0){
    logoEl.style.opacity=1;
    var gp=Math.min(logoA/0.5,1);
    ltEl.textContent=glitchStr(WORD,gp);
    ltEl.style.color=gp<1?(Math.random()<0.3?'#81D8D0':Math.random()<0.5?'#E8734A':'#fff'):'#fff';
    ltEl.style.textShadow=gp<1?
      '0 0 30px rgba(129,216,208,0.8),2px 0 0 rgba(232,115,74,0.5),-2px 0 0 rgba(167,139,202,0.5)':
      '0 0 40px rgba(129,216,208,0.45)';
    if(gp>=1) llEl.style.opacity=1;
  } else {
    logoEl.style.opacity=0;
    ltEl.textContent='';llEl.style.opacity=0;
  }

  // vignette
  var vg=ctx.createRadialGradient(cx,cy,Math.min(W,H)*0.2,cx,cy,Math.min(W,H)*0.7);
  vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,4,0.55)');
  ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

  if(t<1){
    raf=requestAnimationFrame(draw);
  } else {
    // fade out entire loader
    var loader=document.getElementById('yl-loader');
    loader.style.transition='opacity 0.6s ease';
    loader.style.opacity=0;
    setTimeout(function(){if(loader.parentNode)loader.parentNode.removeChild(loader);},650);
  }
}



})();
