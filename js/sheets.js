/**
 * YanLab Website — Google Sheets Data Loader
 * 
 * Sheet ID: 1cUrnhyRFKKQFK2AwbuOE8yBYbff5xkFcc1ZzlPe8Hyc
 * 
 * Tab结构:
 *   基本信息 | 团队成员 | 论文 | 新闻 | LabLife | 研究方向
 */

(function(){
if(window.__ADMIN_PAGE__) return;

var SHEET_ID = '1cUrnhyRFKKQFK2AwbuOE8yBYbff5xkFcc1ZzlPe8Hyc';
var BASE = 'https://docs.google.com/spreadsheets/d/'+SHEET_ID+'/gviz/tq?tqx=out:csv&sheet=';

// Image base URL (GitHub raw)
var IMG_BASE = 'https://raw.githubusercontent.com/morysazzzz/YanLiyingLab/main/images/';

function imgUrl(path){
  if(!path||path.trim()==='') return '';
  if(path.startsWith('http')) return path;
  return IMG_BASE + path.trim();
}

// Parse CSV → array of objects
function parseCSV(text){
  var lines = text.trim().split('\n');
  if(lines.length < 2) return [];
  var headers = splitCSVLine(lines[0]).map(function(h){ return h.trim(); });
  return lines.slice(1).map(function(line){
    var vals = splitCSVLine(line);
    var obj = {};
    headers.forEach(function(h,i){ obj[h] = (vals[i]||'').trim(); });
    return obj;
  }).filter(function(row){
    return Object.values(row).some(function(v){ return v !== ''; });
  });
}

function splitCSVLine(line){
  var result = [], cur = '', inQ = false;
  for(var i=0; i<line.length; i++){
    var ch = line[i];
    if(ch==='"'){ inQ=!inQ; }
    else if(ch===','&&!inQ){ result.push(cur); cur=''; }
    else { cur+=ch; }
  }
  result.push(cur);
  return result;
}

async function fetchTab(tab){
  try{
    var res = await fetch(BASE + encodeURIComponent(tab));
    if(!res.ok) return null;
    return parseCSV(await res.text());
  } catch(e){ console.warn('Sheets: failed to load tab:', tab, e); return null; }
}

function isZh(){ return !document.body.classList.contains('lang-en'); }

// ── Apply basic info to ALL pages ─────────────────────────────
function applyBasicInfo(rows){
  if(!rows) return;
  var info = {};
  rows.forEach(function(row){
    if(row['键'] && row['值_中文']) info[row['键']] = row;
  });

  function set(key, selector){
    var row = info[key]; if(!row) return;
    var zh = row['值_中文']||'', en = row['值_英文']||zh;
    document.querySelectorAll(selector+'[data-zh]').forEach(function(el){ if(zh) el.textContent=zh; });
    document.querySelectorAll(selector+'[data-en]').forEach(function(el){ if(en) el.textContent=en; });
    // Also replace by content matching
    document.querySelectorAll('[data-zh]').forEach(function(el){
      if(el.children.length===0 && el.getAttribute('data-cms')===key) el.textContent=isZh()?zh:en;
    });
  }

  // Set email everywhere
  var emailRow = info['email'];
  if(emailRow && emailRow['值_中文']){
    var email = emailRow['值_中文'];
    document.querySelectorAll('a[href^="mailto:"]').forEach(function(a){
      a.href='mailto:'+email;
      if(a.textContent.indexOf('@')!==-1) a.textContent=email;
    });
  }

  // Replace text content by key matching
  rows.forEach(function(row){
    var key=row['键'], zh=row['值_中文']||'', en=row['值_英文']||zh;
    if(!key||!zh) return;
    var orig_zh=row['原文_中文']||'', orig_en=row['原文_英文']||'';
    if(orig_zh){
      document.querySelectorAll('[data-zh]').forEach(function(el){
        if(el.children.length===0&&el.textContent.trim()===orig_zh.trim()) el.textContent=isZh()?zh:en;
      });
    }
    if(orig_en){
      document.querySelectorAll('[data-en]').forEach(function(el){
        if(el.children.length===0&&el.textContent.trim()===orig_en.trim()) el.textContent=en;
      });
    }
  });
}

// ── Team page ─────────────────────────────────────────────────
function renderTeam(members){
  var c=document.getElementById('members-container'); if(!c||!members) return;
  var zh=isZh();
  var COLORS={PI:'#E8734A',Postdoc:'#81D8D0',PhD:'#A78BCA',Master:'#5BA8D8',Undergrad:'#F5C842',Staff:'#81D8D0'};
  var RZH={PI:'PI · 研究员',Postdoc:'博士后',PhD:'博士生',Master:'硕士生',Undergrad:'本科生',Staff:'科研人员'};
  var REN={PI:'PI · Professor',Postdoc:'Postdoc',PhD:'PhD Student',Master:"Master's",Undergrad:'Undergrad',Staff:'Staff'};
  var GZH={PI:'课题组长',Postdoc:'博士后',PhD:'博士研究生',Master:'硕士研究生',Undergrad:'本科生',Staff:'科研人员'};
  var GEN={PI:'Principal Investigator',Postdoc:'Postdoctoral Researchers',PhD:'PhD Students',Master:"Master's Students",Undergrad:'Undergraduate',Staff:'Research Staff'};
  var order=['PI','Postdoc','PhD','Master','Undergrad','Staff'], groups={};
  order.forEach(function(r){groups[r]=[];});
  members.forEach(function(m){var r=m['角色']||'Staff';if(!groups[r])groups[r]=[];groups[r].push(m);});
  var html='';
  order.forEach(function(role){
    if(!groups[role].length) return;
    var col=COLORS[role]||'#81D8D0';
    html+='<div class="group-label">'+(zh?GZH[role]:GEN[role])+'</div><div class="member-grid">';
    groups[role].forEach(function(m){
      var name=zh?(m['姓名_中文']||m['姓名_英文']):(m['姓名_英文']||m['姓名_中文'])||'';
      var focus=zh?(m['研究方向_中文']||m['研究方向_英文']):(m['研究方向_英文']||m['研究方向_中文'])||'';
      var email=m['邮箱']||'';
      var photo=imgUrl(m['照片']||'');
      var letter=(m['姓名_中文']||m['姓名_英文']||'?')[0];
      html+='<div class="member-card">'
        +'<div class="member-stripe" style="height:5px;background:'+col+';"></div>'
        +'<div class="member-body">'
        +'<div class="member-avatar" style="'+(photo?'background:url('+photo+') center/cover no-repeat;':'background:'+col+';')+'">'+( photo?'':letter)+'</div>'
        +'<div class="member-name">'+name+'</div>'
        +'<div class="member-role"><span class="tag" style="background:'+col+'22;color:'+col+';">'+(zh?RZH[role]:REN[role])+'</span></div>'
        +'<div class="member-focus">'+focus+'</div>'
        +(email?'<a href="mailto:'+email+'" style="font-size:0.75rem;color:var(--tiffany-dark);">✉ '+email+'</a>':'')
        +'</div></div>';
    });
    html+='</div>';
  });
  c.innerHTML=html;
}

// ── Publications page ─────────────────────────────────────────
function renderPubs(papers){
  var c=document.getElementById('pubs-container'); if(!c||!papers) return;
  var zh=isZh();
  var filterBar=c.querySelector('.filter-bar');
  var byY={};
  papers.forEach(function(p){
    var y=p['年份']||'2024';
    if(!byY[y]) byY[y]=[];
    byY[y].push(p);
  });
  var html=filterBar?filterBar.outerHTML:'';
  Object.keys(byY).sort(function(a,b){return b-a;}).forEach(function(y){
    html+='<div class="year-divider">'+y+'</div>';
    byY[y].forEach(function(p){
      var badges=[];
      if(p['封面']==='TRUE'||p['封面']==='是') badges.push('<span class="tag badge-cover">Cover</span>');
      if(p['高被引']==='TRUE'||p['高被引']==='是') badges.push('<span class="tag badge-cited">'+(zh?'高被引':'Highly Cited')+'</span>');
      if(p['十大进展']==='TRUE'||p['十大进展']==='是') badges.push('<span class="tag badge-advance">'+(zh?'中国科学十大进展':'Top-10 Advance')+'</span>');
      if(p['期刊']) badges.push('<span class="tag badge-nature">'+p['期刊']+'</span>');
      var doi=p['DOI']||'';
      var title=p['标题']||'';
      html+='<div class="paper-card">'
        +(badges.length?'<div class="paper-badges">'+badges.join('')+'</div>':'')
        +'<div class="paper-title">'+(doi?'<a href="'+doi+'" target="_blank">'+title+'</a>':title)+'</div>'
        +'<div class="paper-authors">'+(p['作者']||'')+'</div>'
        +'<div class="paper-journal"><span class="journal-name">'+(p['期刊']||'')+'</span><span class="paper-year">'+y+'</span>'
        +(doi?'<a href="'+doi+'" target="_blank" style="font-size:0.78rem;color:var(--tiffany-dark);margin-left:auto;">DOI ↗</a>':'')
        +'</div></div>';
    });
  });
  c.innerHTML=html;
}

// ── News page ─────────────────────────────────────────────────
function renderNews(items){
  var c=document.getElementById('news-container'); if(!c||!items) return;
  var zh=isZh();
  var months=['','一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
  var monthsEn=['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var html='';
  items.sort(function(a,b){ return (b['日期']||'').localeCompare(a['日期']||''); });
  items.forEach(function(n){
    var title=zh?(n['标题_中文']||n['标题_英文']):(n['标题_英文']||n['标题_中文'])||'';
    var desc=zh?(n['内容_中文']||n['内容_英文']):(n['内容_英文']||n['内容_中文'])||'';
    var tag=zh?(n['标签_中文']||n['标签_英文']):(n['标签_英文']||n['标签_中文'])||'';
    var parts=(n['日期']||'').split('-');
    var mNum=parseInt(parts[1])||0;
    var monthStr=zh?(months[mNum]||parts[1]):(monthsEn[mNum]||parts[1]);
    var photo=imgUrl(n['图片']||'');
    html+='<div class="news-item">'
      +'<div class="news-date">'
      +'<div class="news-date-month">'+monthStr+'</div>'
      +'<div class="news-date-day">'+(parts[2]||'—')+'</div>'
      +'<div style="font-size:0.7rem;color:var(--text-light);">'+(parts[0]||'')+'</div>'
      +'</div>'
      +'<div class="news-content">'
      +(photo?'<div style="background:url('+photo+') center/cover;height:160px;border-radius:8px;margin-bottom:12px;"></div>':'')
      +(tag?'<div style="margin-bottom:8px;"><span class="tag tag-coral">'+tag+'</span></div>':'')
      +'<h4>'+title+'</h4><p>'+desc+'</p>'
      +'</div></div>';
  });
  if(html) c.innerHTML=html;
}

// ── Lab Life page ─────────────────────────────────────────────
function renderLabLife(photos, traditions){
  var zh=isZh();
  // Polaroid wall
  var c=document.getElementById('lablife-container');
  if(c&&photos){
    var rots=[-2,1.5,-1,2,-2.5,1,-1.5,2.5,-0.5,1.8];
    var bgs=['var(--mint-light)','var(--coral-light)','var(--gold-light)','var(--purple-light)','var(--sky-light)'];
    var html='';
    photos.forEach(function(p,i){
      var cap=zh?(p['说明_中文']||p['说明_英文']):(p['说明_英文']||p['说明_中文'])||'';
      var photo=imgUrl(p['图片']||'');
      var style=photo?'background:url('+photo+') center/cover no-repeat':'background:'+bgs[i%bgs.length];
      html+='<div class="polaroid-item"><div class="polaroid-card" style="--rot:'+rots[i%rots.length]+'deg;">'
        +'<div class="polaroid-img" style="'+style+';">'
        +(!photo?'<span style="font-size:0.7rem;color:var(--text-light);padding:8px;text-align:center;">📸</span>':'')
        +'</div><div class="polaroid-cap">'+cap+'</div></div></div>';
    });
    if(html) c.innerHTML=html;
  }
  // Traditions
  if(traditions){
    var tradCards=document.querySelectorAll('.tradition-card');
    traditions.forEach(function(t,i){
      if(!tradCards[i]) return;
      var nameEl=tradCards[i].querySelector('[data-zh]');
      var nameEnEl=tradCards[i].querySelector('[data-en]');
      var descEl=tradCards[i].querySelectorAll('[data-zh]')[1];
      var descEnEl=tradCards[i].querySelectorAll('[data-en]')[1];
      if(nameEl&&t['名称_中文']) nameEl.textContent=t['名称_中文'];
      if(nameEnEl&&t['名称_英文']) nameEnEl.textContent=t['名称_英文'];
      if(descEl&&t['描述_中文']) descEl.textContent=t['描述_中文'];
      if(descEnEl&&t['描述_英文']) descEnEl.textContent=t['描述_英文'];
    });
  }
}

// ── Research page ─────────────────────────────────────────────
function renderResearch(areas){
  if(!areas) return;
  var zh=isZh();
  var cards=document.querySelectorAll('.research-card, .direction-card, [data-direction]');
  areas.forEach(function(a,i){
    if(!cards[i]) return;
    var titleZh=cards[i].querySelector('h3[data-zh], h2[data-zh]');
    var titleEn=cards[i].querySelector('h3[data-en], h2[data-en]');
    var descZh=cards[i].querySelector('p[data-zh]');
    var descEn=cards[i].querySelector('p[data-en]');
    if(titleZh&&a['标题_中文']) titleZh.textContent=a['标题_中文'];
    if(titleEn&&a['标题_英文']) titleEn.textContent=a['标题_英文'];
    if(descZh&&a['描述_中文']) descZh.textContent=a['描述_中文'];
    if(descEn&&a['描述_英文']) descEn.textContent=a['描述_英文'];
  });
}

// ── PI page ───────────────────────────────────────────────────
function renderPI(info){
  if(!info||!info.length) return;
  var row={};
  info.forEach(function(r){ if(r['键']) row[r['键']]=r; });
  var zh=isZh();
  function get(key){ var r=row[key]; if(!r) return ''; return zh?(r['值_中文']||r['值_英文']):(r['值_英文']||r['值_中文'])||''; }

  // Name
  var nameEl=document.querySelector('[data-zh].pi-name, h1[data-zh]');
  if(nameEl&&get('姓名_中文')) { if(zh) nameEl.textContent=get('姓名_中文'); }

  // Bio - find by partial match
  if(get('简介')){
    document.querySelectorAll('[data-zh]').forEach(function(el){
      if(el.children.length===0&&el.textContent.indexOf('闫丽盈研究员现任职于')!==-1) el.textContent=get('简介');
    });
  }

  // Photo
  var piPhotoPath=row['照片']?row['照片']['值_中文']:'';
  if(piPhotoPath){
    var url=imgUrl(piPhotoPath);
    document.querySelectorAll('.pi-photo, .hero-photo, [data-cms="pi-photo"]').forEach(function(el){
      el.style.backgroundImage='url('+url+')';
      el.style.backgroundSize='cover';
      var img=el.querySelector('img'); if(img) img.src=url;
    });
  }
}

// ── Main loader ───────────────────────────────────────────────
async function loadAndRender(){
  var pg=location.pathname.split('/').pop()||'index.html';
  var promises=[];

  // Always load basic info
  promises.push(fetchTab('基本信息'));

  if(pg==='team.html') promises.push(fetchTab('团队成员'));
  else promises.push(Promise.resolve(null));

  if(pg==='publications.html') promises.push(fetchTab('论文'));
  else promises.push(Promise.resolve(null));

  if(pg==='news.html') promises.push(fetchTab('新闻'));
  else promises.push(Promise.resolve(null));

  if(pg==='lablife.html'){
    promises.push(fetchTab('LabLife照片'));
    promises.push(fetchTab('实验室传统'));
  } else {
    promises.push(Promise.resolve(null));
    promises.push(Promise.resolve(null));
  }

  if(pg==='research.html') promises.push(fetchTab('研究方向'));
  else promises.push(Promise.resolve(null));

  if(pg==='pi.html') promises.push(fetchTab('PI信息'));
  else promises.push(Promise.resolve(null));

  var results=await Promise.all(promises);
  var basicInfo=results[0], team=results[1], pubs=results[2], news=results[3];
  var lifePhotos=results[4], lifeTrad=results[5], research=results[6], piInfo=results[7];

  applyBasicInfo(basicInfo);
  if(team) renderTeam(team);
  if(pubs) renderPubs(pubs);
  if(news) renderNews(news);
  if(lifePhotos||lifeTrad) renderLabLife(lifePhotos, lifeTrad);
  if(research) renderResearch(research);
  if(piInfo) renderPI(piInfo);
}

document.addEventListener('DOMContentLoaded', function(){
  loadAndRender();
  document.querySelectorAll('.lang-btn').forEach(function(btn){
    btn.addEventListener('click', function(){ setTimeout(loadAndRender, 100); });
  });
});
})();
