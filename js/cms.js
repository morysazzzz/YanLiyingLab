(function(){
if(window.__ADMIN_PAGE__) return;

var S=null;
try{ S=JSON.parse(localStorage.getItem('yanlab_cms')||'null'); }catch(e){}
if(!S) return;

var lang='zh';
function isZh(){return !document.body.classList.contains('lang-en');}

// Replace text in ALL matching elements (data-zh or data-en)
function rZh(oldText, newText){
  if(!newText||newText===oldText) return;
  document.querySelectorAll('[data-zh]').forEach(function(el){
    if(el.children.length===0 && el.textContent.trim()===oldText.trim()) el.textContent=newText;
  });
}
function rEn(oldText, newText){
  if(!newText||newText===oldText) return;
  document.querySelectorAll('[data-en]').forEach(function(el){
    if(el.children.length===0 && el.textContent.trim()===oldText.trim()) el.textContent=newText;
  });
}
function r(zhOld,enOld,zhNew,enNew){ rZh(zhOld,zhNew); rEn(enOld,enNew); }

// Set by data-cms attribute (most reliable)
function sc(key,zh,en){
  document.querySelectorAll('[data-cms="'+key+'"]').forEach(function(el){
    if(el.hasAttribute('data-zh')&&zh) el.textContent=zh;
    if(el.hasAttribute('data-en')&&en) el.textContent=en;
  });
}

function applyAll(){
  var h=S.home||{}, p=S.pi||{}, re=S.research||{}, l=S.life||{}, j=S.join||{}, c=S.contact||{};
  var pg=location.pathname.split('/').pop()||'index.html';

  // ══ INDEX ══════════════════════════════════════════════════
  if(pg==='index.html'||pg===''){
    // Hero
    sc('slogan',h.slogan_zh,h.slogan_en);
    sc('desc',h.desc_zh,h.desc_en);
    r('探索生命起点的奥秘','Decoding the origins of life',h.slogan_zh,h.slogan_en);
    r('我们致力于揭示人类早期生命发育的遗传与表观遗传调控规律，让更多家庭实现健康生育的梦想。',
      'We unravel the genetic and epigenetic logic of early human development, helping more families realize the dream of healthy reproduction.',
      h.desc_zh,h.desc_en);
    // Stats labels
    r('发表论文','Publications',h.stats_papers_zh,h.stats_papers_en);
    r('论文被引次数','Citations',h.stats_cited_zh,h.stats_cited_en);
    r('入选中国科学十大进展','China Top-10 Science Advances',h.stats_advance_zh,h.stats_advance_en);
    r('实验室成员','Lab Members',h.stats_members_zh,h.stats_members_en);
    // Research section
    r('我们在探索什么','What we explore',h.research_title_zh,h.research_title_en);
    r('聚焦人类早期胚胎发育、遗传与表观遗传调控，推动辅助生殖技术的科学突破。',
      'Focusing on human early embryo development, genetic and epigenetic regulation, advancing breakthroughs in assisted reproduction.',
      h.research_desc_zh,h.research_desc_en);
    // Research cards on homepage
    if(re.areas&&re.areas[0]){r('生殖遗传与胚胎诊断','Reproductive Genetics & Embryo Diagnosis',re.areas[0].title_zh,re.areas[0].title_en);}
    if(re.areas&&re.areas[1]){r('表观遗传调控机制','Epigenetic Regulation Mechanisms',re.areas[1].title_zh,re.areas[1].title_en);}
    if(re.areas&&re.areas[2]){r('辅助生殖技术转化','Translational Assisted Reproduction',re.areas[2].title_zh,re.areas[2].title_en);}
    // News title
    r('实验室最新动态','Latest from the lab',h.news_title_zh,h.news_title_en);
    // Life section
    r('不只是科研，也是家人',"More than research — we're family",h.life_title_zh,h.life_title_en);
    r('团建、聚餐、旅行、节日……闫老师带着大家一起工作，也一起生活。',
      'Team building, dinners, trips, celebrations — Prof. Yan leads us in work and in life.',
      h.life_desc_zh,h.life_desc_en);
    // Join section
    r('我们欢迎有热情的你','We welcome passionate minds',h.join_title_zh,h.join_title_en);
    r('无论你是博士生、硕士生、博士后，还是对生殖发育充满好奇的本科生，都欢迎来聊聊。',
      "Whether PhD, master's, postdoc, or an undergrad curious about reproductive biology — we'd love to hear from you.",
      h.join_desc_zh,h.join_desc_en);
  }

  // ══ PI PAGE ════════════════════════════════════════════════
  if(pg==='pi.html'){
    r('闫丽盈','Liying Yan',p.name_zh,p.name_en);
    r('研究员 · 博士生导师 · 科研处处长','Principal Investigator · PhD Supervisor · Director of Research Office',p.title_zh,p.title_en);
    r('国家杰出青年科学基金获得者','NSFC Distinguished Young Scholar',p.tag1_zh,p.tag1_en);
    r('辅助生殖教育部重点实验室副主任','Deputy Director, MOE Key Lab of ART',p.tag2_zh,p.tag2_en);
    // Bio - match by partial content
    document.querySelectorAll('[data-zh]').forEach(function(el){
      if(el.children.length===0&&el.textContent.indexOf('闫丽盈研究员现任职于')!==-1&&p.bio_zh) el.textContent=p.bio_zh;
    });
    document.querySelectorAll('[data-en]').forEach(function(el){
      if(el.children.length===0&&el.textContent.indexOf('Prof. Liying Yan is')!==-1&&p.bio_en) el.textContent=p.bio_en;
    });
    r('请在这里填写闫老师的寄语或座右铭。',"A quote from Prof. Yan — to be filled.",p.quote_zh,p.quote_en);
    // Photo
    if(p.photo&&p.photo.length>10){
      document.querySelectorAll('.pi-avatar, .hero-avatar, [data-cms="pi-photo"]').forEach(function(el){
        el.style.backgroundImage='url('+p.photo+')';
        el.style.backgroundSize='cover';
        el.style.backgroundPosition='center';
        var img=el.querySelector('img');
        if(img) img.src=p.photo;
      });
    }
    if(p.email){
      document.querySelectorAll('a[href^="mailto:"]').forEach(function(a){
        a.href='mailto:'+p.email; a.textContent=p.email;
      });
    }
  }

  // ══ RESEARCH ═══════════════════════════════════════════════
  if(pg==='research.html'&&re.areas){
    r('我们在探索什么','What we explore',re.page_title_zh||'我们在探索什么',re.page_title_en||'What we explore');
    r('围绕人类早期胚胎发育与生殖遗传，我们的研究横跨基础科学与临床转化，致力于让更多家庭受益。',
      'Spanning basic science and clinical translation, our work on early human embryo development aims to benefit more families.',
      re.page_desc_zh,re.page_desc_en);
    var defs=[
      ['生殖遗传与胚胎诊断','Reproductive Genetics & Embryo Diagnosis'],
      ['表观遗传调控机制','Epigenetic Regulation Mechanisms'],
      ['辅助生殖技术临床转化','Translational Assisted Reproduction']
    ];
    var descDefs=[
      ['开发基于转录组测序的胚胎着床前遗传学检测（PGT）新方法，利用滋养外胚层细胞中丰富的mRNA转录拷贝进行突变检测，同步评估胚胎着床潜能，提高单基因病阻断的准确性与适用范围。','Developing novel PGT methods using transcriptome sequencing.'],
      ['系统研究人类早期胚胎及原始生殖细胞发育过程中的DNA甲基化调控机制，解析卵母细胞减数分裂染色体重组的遗传特征，揭示表观遗传对基因表达的精准调控规律。','Systematically studying DNA methylation regulation.'],
      ['将基础研究成果成功转化为临床应用，包括胚胎植入前单基因疾病诊断、提高疑难不孕患者治疗成功率等，推动辅助生殖技术的精准化与个体化。','Translating basic findings into clinical applications.']
    ];
    re.areas.forEach(function(a,i){
      if(defs[i]) r(defs[i][0],defs[i][1],a.title_zh,a.title_en);
      if(descDefs[i]) r(descDefs[i][0],descDefs[i][1],a.desc_zh,a.desc_en);
    });
  }

  // ══ CONTACT ════════════════════════════════════════════════
  if(pg==='contact.html'){
    r('随时欢迎联系',"We'd love to hear from you",c.page_title_zh,c.page_title_en);
    r('无论是学术合作、招聘咨询，还是只是想了解我们的研究，都欢迎来信.',
      'Whether for academic collaboration, joining the lab, or simply learning about our research — write to us.',
      c.page_desc_zh,c.page_desc_en);
    r('北京大学第三医院（北医三院）','Peking University Third Hospital (PUTH)',c.dept_zh,c.dept_en);
    r('北京市海淀区花园北路49号','49 North Garden Road, Haidian District',c.address_zh,c.address_en);
    if(c.email){
      document.querySelectorAll('a[href^="mailto:"]').forEach(function(a){a.href='mailto:'+c.email;a.textContent=c.email;});
      rZh('yanliying@bjmu.edu.cn',c.email);
    }
  }

  // ══ JOIN ═══════════════════════════════════════════════════
  if(pg==='joinus.html'){
    r('和我们一起探索生命的奥秘',"Explore life's mysteries with us",j.page_title_zh,j.page_title_en);
    r('我们欢迎充满好奇心、勤奋踏实的伙伴加入。无论你处于学术生涯的哪个阶段，都真诚欢迎你来聊聊.',
      "We welcome curious, dedicated people at any stage of their academic career.",
      j.intro_zh,j.intro_en);
    r('感兴趣？直接联系我们！','Interested? Reach out directly!',j.cta_zh,j.cta_en);
    r('请将个人简历和一封简短的自我介绍发送至闫老师邮箱。我们会认真阅读每一封邮件.',
      "Send your CV and a brief self-introduction to Prof. Yan's email. We read every message carefully.",
      j.cta_desc_zh,j.cta_desc_en);
    // Requirements - replace list items
    var reqMap=[
      {old_zh:'生命科学相关方向博士学位',new_zh:j.postdoc_req_zh},
      {old_zh:'生命科学/医学相关背景',new_zh:j.phd_req_zh},
      {old_zh:'相关专业本科背景',new_zh:j.master_req_zh},
    ];
  }

  // ══ LAB LIFE ═══════════════════════════════════════════════
  if(pg==='lablife.html'){
    r('不只是科研，也是家人',"More than research — we're family",l.title_zh,l.title_en);
    r('团建、聚餐、旅行、节日、毕业……每一刻都值得被记录.',
      'Team activities, dinners, trips, celebrations, graduations — every moment worth remembering.',
      l.desc_zh,l.desc_en);
    r('我们的小传统','Our little traditions',l.trad_title_zh,l.trad_title_en);
    if(l.traditions) l.traditions.forEach(function(t,i){
      var names=[['年度团建','Annual Retreat'],['生日惊喜','Birthday Surprises'],['毕业庆典','Graduation Celebration'],['实验室聚餐','Lab Dinners'],['学术会议','Conferences']];
      var descs=[
        ['每年一次，一起出游放松，增进感情。','Once a year, we travel together to relax and bond.'],
        ['每个成员的生日都会被记住，闫老师总会送上惊喜。',"Every member's birthday is remembered — Prof. Yan always has a surprise."],
        ['送别每一位毕业生，留住最美好的回忆。','Celebrating each graduate and preserving the most beautiful memories.'],
        ['节日、新生入学、项目完成……总有理由一起吃饭。','Holidays, new members, project completions — always a reason to dine together.'],
        ['一起出席学术会议，顺道探索新城市。','Attending conferences together and exploring new cities along the way.']
      ];
      if(names[i]) r(names[i][0],names[i][1],t.name_zh,t.name_en);
      if(descs[i]) r(descs[i][0],descs[i][1],t.desc_zh,t.desc_en);
    });
    if(l.photos&&l.photos.length) renderLabLife(l.photos);
  }

  // ══ DYNAMIC PAGES ══════════════════════════════════════════
  if(pg==='team.html'&&S.team&&S.team.members) renderTeam(S.team.members);
  if(pg==='publications.html'&&S.pubs&&S.pubs.papers) renderPubs(S.pubs.papers);
  if(pg==='news.html'&&S.news&&S.news.items) renderNews(S.news.items);
}

// ── Render functions ─────────────────────────────────────────
var COLORS={PI:'#E8734A',Postdoc:'#81D8D0',PhD:'#A78BCA',Master:'#5BA8D8',Undergrad:'#F5C842',Staff:'#81D8D0'};
var RZH={PI:'PI · 研究员',Postdoc:'博士后',PhD:'博士生',Master:'硕士生',Undergrad:'本科生',Staff:'科研人员'};
var REN={PI:'PI · Professor',Postdoc:'Postdoc',PhD:'PhD Student',Master:"Master's",Undergrad:'Undergrad',Staff:'Staff'};
var GZH={PI:'课题组长',Postdoc:'博士后',PhD:'博士研究生',Master:'硕士研究生',Undergrad:'本科生',Staff:'科研人员'};
var GEN={PI:'Principal Investigator',Postdoc:'Postdoctoral Researchers',PhD:'PhD Students',Master:"Master's Students",Undergrad:'Undergraduate',Staff:'Research Staff'};

function renderTeam(members){
  var c=document.getElementById('members-container'); if(!c) return;
  var zh=isZh();
  var order=['PI','Postdoc','PhD','Master','Undergrad','Staff'],groups={};
  order.forEach(function(r){groups[r]=[];});
  members.forEach(function(m){var role=m.role||'Staff';if(!groups[role])groups[role]=[];groups[role].push(m);});
  var html='';
  order.forEach(function(role){
    if(!groups[role].length) return;
    var col=COLORS[role]||'#81D8D0';
    html+='<div class="group-label">'+(zh?GZH[role]:GEN[role])+'</div><div class="member-grid">';
    groups[role].forEach(function(m){
      var name=zh?(m.name_zh||m.name_en):(m.name_en||m.name_zh)||'';
      var focus=zh?(m.focus_zh||m.focus_en):(m.focus_en||m.focus_zh)||'';
      var letter=(m.name_zh||m.name_en||'?')[0];
      var avatarStyle=m.photo&&m.photo.length>10?'background:url('+m.photo+') center/cover no-repeat;':'background:'+col+';';
      html+='<div class="member-card">'
        +'<div class="member-stripe" style="height:5px;background:'+col+';"></div>'
        +'<div class="member-body">'
        +'<div class="member-avatar" style="'+avatarStyle+'">'+(m.photo&&m.photo.length>10?'':letter)+'</div>'
        +'<div class="member-name">'+name+'</div>'
        +'<div class="member-role"><span class="tag" style="background:'+col+'22;color:'+col+';">'+(zh?RZH[role]:REN[role])+'</span></div>'
        +'<div class="member-focus">'+focus+'</div>'
        +(m.email?'<a href="mailto:'+m.email+'" style="font-size:0.75rem;color:var(--tiffany-dark);">✉ '+m.email+'</a>':'')
        +'</div></div>';
    });
    html+='</div>';
  });
  c.innerHTML=html;
}

function renderPubs(papers){
  var c=document.getElementById('pubs-container'); if(!c) return;
  var zh=isZh();
  // Keep filter bar if it exists
  var filterBar=c.querySelector('.filter-bar');
  var byY={};
  papers.forEach(function(p){var y=p.year||'2024';if(!byY[y])byY[y]=[];byY[y].push(p);});
  var html=filterBar?filterBar.outerHTML:'';
  Object.keys(byY).sort(function(a,b){return b-a;}).forEach(function(y){
    html+='<div class="year-divider">'+y+'</div>';
    byY[y].forEach(function(p){
      var badges=[];
      if(p.cover) badges.push('<span class="tag badge-cover">Cover</span>');
      if(p.cited) badges.push('<span class="tag badge-cited">'+(zh?'高被引':'Highly Cited')+'</span>');
      if(p.advance) badges.push('<span class="tag badge-advance">'+(zh?'中国科学十大进展':'Top-10 Advance')+'</span>');
      if(p.journal) badges.push('<span class="tag badge-nature">'+p.journal+'</span>');
      html+='<div class="paper-card'+(p.cover?' featured':'')+(p.cited?' high-cited':'')+(p.advance?' top-advance':'')+'">'
        +(badges.length?'<div class="paper-badges">'+badges.join('')+'</div>':'')
        +'<div class="paper-title">'+(p.doi?'<a href="'+p.doi+'" target="_blank">'+p.title+'</a>':(p.title||''))+'</div>'
        +'<div class="paper-authors">'+(p.authors||'')+'</div>'
        +'<div class="paper-journal"><span class="journal-name">'+(p.journal||'')+'</span><span class="paper-year">'+(p.year||'')+'</span>'
        +(p.doi?'<a href="'+p.doi+'" target="_blank" style="font-size:0.78rem;color:var(--tiffany-dark);margin-left:auto;">DOI ↗</a>':'')
        +'</div></div>';
    });
  });
  c.innerHTML=html;
}

function renderNews(items){
  var c=document.getElementById('news-container'); if(!c) return;
  var zh=isZh();
  var html='';
  items.forEach(function(n){
    var title=zh?(n.title_zh||n.title_en):(n.title_en||n.title_zh)||'';
    var desc=zh?(n.desc_zh||n.desc_en):(n.desc_en||n.desc_zh)||'';
    var tag=zh?(n.tag_zh||n.tag_en):(n.tag_en||n.tag_zh)||'';
    var parts=(n.date||'').split('-');
    var months=['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var monthZh=['','一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
    var mNum=parseInt(parts[1])||0;
    var monthStr=zh?(monthZh[mNum]||parts[1]):(months[mNum]||parts[1]);
    var photoHtml=n.photo&&n.photo.length>10?'<div class="news-photo" style="background:url('+n.photo+') center/cover no-repeat;height:180px;border-radius:8px;margin-bottom:12px;"></div>':'';
    html+='<div class="news-item">'
      +'<div class="news-date">'
      +'<div class="news-date-month">'+monthStr+'</div>'
      +'<div class="news-date-day">'+(parts[2]||'—')+'</div>'
      +'<div style="font-size:0.7rem;color:var(--text-light);">'+(parts[0]||'')+'</div>'
      +'</div>'
      +'<div class="news-content">'
      +photoHtml
      +(tag?'<div style="margin-bottom:8px;"><span class="tag tag-coral">'+tag+'</span></div>':'')
      +'<h4>'+title+'</h4><p>'+desc+'</p>'
      +'</div></div>';
  });
  if(html) c.innerHTML=html;
}

function renderLabLife(photos){
  var c=document.getElementById('lablife-container'); if(!c) return;
  var zh=isZh();
  var rots=[-2,1.5,-1,2,-2.5,1,-1.5,2.5,-0.5,1.8];
  var bgs=['var(--mint-light)','var(--coral-light)','var(--gold-light)','var(--purple-light)','var(--sky-light)','var(--tiffany-light)'];
  var html='';
  photos.forEach(function(p,i){
    var cap=zh?(p.caption_zh||p.caption_en):(p.caption_en||p.caption_zh)||'';
    var hasImg=p.url&&p.url.length>10;
    var imgStyle=hasImg?'background:url('+p.url+') center/cover no-repeat':'background:'+bgs[i%bgs.length];
    html+='<div class="polaroid-item"><div class="polaroid-card" style="--rot:'+rots[i%rots.length]+'deg;">'
      +'<div class="polaroid-img" style="'+imgStyle+';">'
      +(!hasImg?'<span style="font-size:0.7rem;color:var(--text-light);padding:8px;text-align:center;">📸</span>':'')
      +'</div><div class="polaroid-cap">'+cap+'</div></div></div>';
  });
  if(html) c.innerHTML=html;
}

// Boot
document.addEventListener('DOMContentLoaded',function(){
  applyAll();
  // Re-apply on language switch
  document.querySelectorAll('.lang-btn').forEach(function(btn){
    btn.addEventListener('click',function(){setTimeout(applyAll,80);});
  });
});
})();
