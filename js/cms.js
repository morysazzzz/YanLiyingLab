(function(){
if(window.__ADMIN_PAGE__) return;

function get(){ try{return JSON.parse(localStorage.getItem('yanlab_cms')||'null');}catch(e){return null;} }

function rt(zhOld, enOld, zhNew, enNew){
  if(!zhNew&&!enNew) return;
  document.querySelectorAll('[data-zh]').forEach(function(el){
    var t=el.textContent.trim();
    if(t===zhOld&&zhNew) el.textContent=zhNew;
  });
  document.querySelectorAll('[data-en]').forEach(function(el){
    var t=el.textContent.trim();
    if(t===enOld&&enNew) el.textContent=enNew;
  });
}

function sc(key,zh,en){
  document.querySelectorAll('[data-cms="'+key+'"]').forEach(function(el){
    if(el.hasAttribute('data-zh')&&zh) el.textContent=zh;
    if(el.hasAttribute('data-en')&&en) el.textContent=en;
  });
}

function apply(S){
  var pg=location.pathname.split('/').pop()||'index.html';
  var h=S.home, p=S.pi, r=S.research, l=S.life, j=S.join, c=S.contact;

  if(pg==='index.html'||pg===''){
    if(h){
      sc('slogan',h.slogan_zh,h.slogan_en);
      rt('探索生命起点的奥秘','Decoding the origins of life',h.slogan_zh,h.slogan_en);
      rt('我们致力于揭示人类早期生命发育的遗传与表观遗传调控规律，让更多家庭实现健康生育的梦想。',
        'We unravel the genetic and epigenetic logic of early human development, helping more families realize the dream of healthy reproduction.',
        h.desc_zh,h.desc_en);
      rt('发表论文','Publications',h.stats_papers_zh,h.stats_papers_en);
      rt('论文被引次数','Citations',h.stats_cited_zh,h.stats_cited_en);
      rt('入选中国科学十大进展','China Top-10 Science Advances',h.stats_advance_zh,h.stats_advance_en);
      rt('实验室成员','Lab Members',h.stats_members_zh,h.stats_members_en);
      rt('我们在探索什么','What we explore',h.research_title_zh,h.research_title_en);
      rt('聚焦人类早期胚胎发育、遗传与表观遗传调控，推动辅助生殖技术的科学突破。',
        'Focusing on human early embryo development, genetic and epigenetic regulation, advancing breakthroughs in assisted reproduction.',
        h.research_desc_zh,h.research_desc_en);
      rt('实验室最新动态','Latest from the lab',h.news_title_zh,h.news_title_en);
      rt('不只是科研，也是家人',"More than research — we're family",h.life_title_zh,h.life_title_en);
      rt('团建、聚餐、旅行、节日……闫老师带着大家一起工作，也一起生活。',
        'Team building, dinners, trips, celebrations — Prof. Yan leads us in work and in life.',
        h.life_desc_zh,h.life_desc_en);
      rt('我们欢迎有热情的你','We welcome passionate minds',h.join_title_zh,h.join_title_en);
      rt('无论你是博士生、硕士生、博士后，还是对生殖发育充满好奇的本科生，都欢迎来聊聊。',
        "Whether PhD, master's, postdoc, or an undergrad curious about reproductive biology — we'd love to hear from you.",
        h.join_desc_zh,h.join_desc_en);
    }
  }

  if(pg==='pi.html'&&p){
    rt('闫丽盈','Liying Yan',p.name_zh,p.name_en);
    rt('研究员 · 博士生导师 · 科研处处长','Principal Investigator · PhD Supervisor · Director of Research Office',p.title_zh,p.title_en);
    rt('国家杰出青年科学基金获得者','NSFC Distinguished Young Scholar',p.tag1_zh,p.tag1_en);
    rt('辅助生殖教育部重点实验室副主任','Deputy Director, MOE Key Lab of ART',p.tag2_zh,p.tag2_en);
    rt('请在这里填写闫老师的寄语或座右铭。','A quote or message from Prof. Yan — to be filled.',p.quote_zh,p.quote_en);
    rt('北京大学第三医院 科研处处长','Director of Research Office, PUTH',p.tl1_zh,p.tl1_en);
    rt('辅助生殖教育部重点实验室副主任','Deputy Director, MOE Key Lab of ART',p.tl1_sub_zh,p.tl1_sub_en);
    rt('北京大学 研究员','Principal Investigator, Peking University',p.tl2_zh,p.tl2_en);
    rt('生殖发育与遗传研究','Research on reproductive development and genetics',p.tl2_sub_zh,p.tl2_sub_en);
    document.querySelectorAll('[data-zh]').forEach(function(el){
      if(el.textContent.indexOf('闫丽盈研究员现任职于')!==-1&&p.bio_zh) el.textContent=p.bio_zh;
    });
    document.querySelectorAll('[data-en]').forEach(function(el){
      if(el.textContent.indexOf('Prof. Liying Yan is a Principal')!==-1&&p.bio_en) el.textContent=p.bio_en;
    });
    if(p.email) document.querySelectorAll('a[href^="mailto:"]').forEach(function(a){a.href='mailto:'+p.email;a.textContent=p.email;});
  }

  if(pg==='research.html'&&r){
    rt('我们在探索什么',"What we explore",r.page_title_zh,r.page_title_en);
    rt('围绕人类早期胚胎发育与生殖遗传，我们的研究横跨基础科学与临床转化，致力于让更多家庭受益。',
      'Spanning basic science and clinical translation, our work on early human embryo development and reproductive genetics aims to benefit more families.',
      r.page_desc_zh,r.page_desc_en);
    if(r.areas) r.areas.forEach(function(a,i){
      var def=[
        ['生殖遗传与胚胎诊断','Reproductive Genetics & Embryo Diagnosis'],
        ['表观遗传调控机制','Epigenetic Regulation Mechanisms'],
        ['辅助生殖技术临床转化','Translational Assisted Reproduction']
      ];
      if(def[i]) rt(def[i][0],def[i][1],a.title_zh,a.title_en);
    });
  }

  if(pg==='lablife.html'&&l){
    rt('不只是科研，也是家人',"More than research — we're family",l.title_zh,l.title_en);
    rt('团建、聚餐、旅行、节日、毕业……每一刻都值得被记录。',
      'Team activities, dinners, trips, celebrations, graduations — every moment worth remembering.',
      l.desc_zh,l.desc_en);
    rt('我们的小传统','Our little traditions',l.trad_title_zh,l.trad_title_en);
    if(l.traditions) l.traditions.forEach(function(t,i){
      var defs=[
        ['年度团建','Annual Retreat'],['生日惊喜','Birthday Surprises'],['毕业庆典','Graduation Celebration'],
        ['实验室聚餐','Lab Dinners'],['学术会议','Conferences']
      ];
      if(defs[i]){ rt(defs[i][0],defs[i][1],t.name_zh,t.name_en); }
      var descs=[
        ['每年一次，一起出游放松，增进感情。','Once a year, we travel together to relax and bond.'],
        ['每个成员的生日都会被记住，闫老师总会送上惊喜。',"Every member's birthday is remembered, and Prof. Yan always has a surprise ready."],
        ['送别每一位毕业生，留住最美好的回忆。','Celebrating each graduate and preserving the most beautiful memories.'],
        ['节日、新生入学、项目完成……总有理由一起吃饭。','Holidays, new members, project completions — always a reason to dine together.'],
        ['一起出席学术会议，顺道探索新城市。','Attending academic conferences together and exploring new cities along the way.']
      ];
      if(descs[i]) rt(descs[i][0],descs[i][1],t.desc_zh,t.desc_en);
    });
    if(l.photos) renderLabLife(l.photos);
  }

  if(pg==='joinus.html'&&j){
    rt('和我们一起探索生命的奥秘',"Explore life's mysteries with us",j.page_title_zh,j.page_title_en);
    rt('我们欢迎充满好奇心、勤奋踏实的伙伴加入。无论你处于学术生涯的哪个阶段，都真诚欢迎你来聊聊。',
      "We welcome curious, dedicated people at any stage of their academic career. We'd genuinely love to hear from you.",
      j.intro_zh,j.intro_en);
    rt('博士后研究员','Postdoctoral Researcher',j.postdoc_title_zh,j.postdoc_title_en);
    rt('博士研究生','PhD Student',j.phd_title_zh,j.phd_title_en);
    rt('硕士研究生',"Master's Student",j.master_title_zh,j.master_title_en);
    rt('为什么加入我们','Why join us',j.why_title_zh,j.why_title_en);
    rt('感兴趣？直接联系我们！','Interested? Reach out directly!',j.cta_zh,j.cta_en);
    rt('请将个人简历和一封简短的自我介绍发送至闫老师邮箱。我们会认真阅读每一封邮件。',
      "Send your CV and a brief self-introduction to Prof. Yan's email. We read every message carefully.",
      j.cta_desc_zh,j.cta_desc_en);
    [['why1','顶尖科研平台','Top research platform'],['why2','严谨的科研训练','Rigorous research training'],
     ['why3','温暖的实验室文化','Warm lab culture'],['why4','国际交流机会','International opportunities'],
     ['why5','优秀的团队伙伴','Outstanding teammates'],['why6','丰富的课外活动','Rich extracurricular life']
    ].forEach(function(w){
      rt(w[1],w[2],j[w[0]+'_zh'],j[w[0]+'_en']);
    });
  }

  if(pg==='contact.html'&&c){
    rt('随时欢迎联系',"We'd love to hear from you",c.page_title_zh,c.page_title_en);
    rt('无论是学术合作、招聘咨询，还是只是想了解我们的研究，都欢迎来信。',
      'Whether for academic collaboration, joining the lab, or simply learning about our research — write to us anytime.',
      c.page_desc_zh,c.page_desc_en);
    rt('北京大学第三医院（北医三院）','Peking University Third Hospital (PUTH)',c.dept_zh,c.dept_en);
    rt('🚇 地铁：4号线/16号线 海淀黄庄站，步行约15分钟\n🚌 公交：多路公交直达北医三院站',
      '🚇 Metro: Line 4/16, Haidian Huangzhuang Station, ~15 min walk\n🚌 Bus: Multiple routes to PUTH stop',
      c.transit_zh,c.transit_en);
    if(c.email) document.querySelectorAll('a[href^="mailto:"]').forEach(function(a){a.href='mailto:'+c.email;a.textContent=c.email;});
  }

  if(pg==='team.html'&&S.team&&S.team.members) renderTeam(S.team.members);
  if(pg==='publications.html'&&S.pubs&&S.pubs.papers) renderPubs(S.pubs.papers);
  if(pg==='news.html'&&S.news&&S.news.items) renderNews(S.news.items);
}

var COLORS={PI:'#E8734A',Postdoc:'#81D8D0',PhD:'#A78BCA',Master:'#5BA8D8',Undergrad:'#F5C842',Staff:'#81D8D0'};
var RZH={PI:'PI·研究员',Postdoc:'博士后',PhD:'博士生',Master:'硕士生',Undergrad:'本科生',Staff:'科研人员'};
var REN={PI:'PI·Professor',Postdoc:'Postdoc',PhD:'PhD Student',Master:"Master's",Undergrad:'Undergrad',Staff:'Staff'};
var GZH={PI:'课题组长',Postdoc:'博士后',PhD:'博士研究生',Master:'硕士研究生',Undergrad:'本科生',Staff:'科研人员'};
var GEN={PI:'Principal Investigator',Postdoc:'Postdoctoral Researchers',PhD:'PhD Students',Master:"Master's Students",Undergrad:'Undergraduate',Staff:'Research Staff'};
function isZh(){return !document.body.classList.contains('lang-en');}

function renderTeam(members){
  var c=document.getElementById('members-container');if(!c)return;
  var zh=isZh(),order=['PI','Postdoc','PhD','Master','Undergrad','Staff'],groups={};
  order.forEach(function(r){groups[r]=[];});
  members.forEach(function(m){var r=m.role||'Staff';if(!groups[r])groups[r]=[];groups[r].push(m);});
  var html='';
  order.forEach(function(role){
    if(!groups[role].length)return;
    var col=COLORS[role]||'#81D8D0';
    html+='<div class="group-label">'+(zh?GZH[role]:GEN[role])+'</div><div class="member-grid">';
    groups[role].forEach(function(m){
      var name=zh?(m.name_zh||m.name_en):(m.name_en||m.name_zh)||'';
      var focus=zh?(m.focus_zh||m.focus_en):(m.focus_en||m.focus_zh)||'';
      var letter=(m.name_zh||m.name_en||'?')[0];
      html+='<div class="member-card">'
        +'<div class="member-stripe" style="height:5px;background:'+col+';"></div>'
        +'<div class="member-body">'
        +'<div class="member-avatar" style="'+(m.photo?'background:url('+m.photo+') center/cover no-repeat;':'background:'+col+';')+'">'+( m.photo?'':letter)+'</div>'
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
  var c=document.getElementById('pubs-container');if(!c)return;
  var zh=isZh(),byY={};
  papers.forEach(function(p){var y=p.year||'2024';if(!byY[y])byY[y]=[];byY[y].push(p);});
  var html='';
  Object.keys(byY).sort(function(a,b){return b-a;}).forEach(function(y){
    html+='<div class="year-divider">'+y+'</div>';
    byY[y].forEach(function(p){
      var b=[];
      if(p.cover)b.push('<span class="tag badge-cover">Cover</span>');
      if(p.cited)b.push('<span class="tag badge-cited">'+(zh?'高被引':'Highly Cited')+'</span>');
      if(p.advance)b.push('<span class="tag badge-advance">'+(zh?'中国科学十大进展':'Top-10 Advance')+'</span>');
      if(p.journal)b.push('<span class="tag badge-nature">'+p.journal+'</span>');
      html+='<div class="paper-card">'
        +(b.length?'<div class="paper-badges">'+b.join('')+'</div>':'')
        +'<div class="paper-title">'+(p.doi?'<a href="'+p.doi+'" target="_blank">'+p.title+'</a>':(p.title||''))+'</div>'
        +'<div class="paper-authors">'+(p.authors||'')+'</div>'
        +'<div class="paper-journal"><span class="journal-name">'+(p.journal||'')+'</span><span class="paper-year">'+(p.year||'')+'</span></div>'
        +'</div>';
    });
  });
  c.innerHTML=html||'<p style="text-align:center;padding:40px;color:var(--text-light);">暂无论文</p>';
}

function renderNews(items){
  var c=document.getElementById('news-container');if(!c)return;
  var zh=isZh(),html='';
  items.forEach(function(n){
    var title=zh?(n.title_zh||n.title_en):(n.title_en||n.title_zh)||'';
    var desc=zh?(n.desc_zh||n.desc_en):(n.desc_en||n.desc_zh)||'';
    var tag=zh?(n.tag_zh||n.tag_en):(n.tag_en||n.tag_zh)||'';
    var parts=(n.date||'').split('-');
    html+='<div class="news-item">'
      +'<div class="news-date">'
      +'<div class="news-date-month">'+(parts[1]||'')+'</div>'
      +'<div class="news-date-day">'+(parts[2]||'—')+'</div>'
      +'<div style="font-size:0.7rem;color:var(--text-light);">'+(parts[0]||'')+'</div>'
      +'</div>'
      +'<div class="news-content">'
      +(tag?'<div style="margin-bottom:8px;"><span class="tag tag-coral">'+tag+'</span></div>':'')
      +'<h4>'+title+'</h4><p>'+desc+'</p>'
      +'</div></div>';
  });
  if(html)c.innerHTML=html;
}

function renderLabLife(photos){
  var c=document.getElementById('lablife-container');if(!c)return;
  var zh=isZh();
  var rots=[-2,1.5,-1,2,-2.5,1,-1.5,2.5];
  var bgs=['var(--mint-light)','var(--coral-light)','var(--gold-light)','var(--purple-light)','var(--sky-light)','var(--tiffany-light)'];
  var html='';
  photos.forEach(function(p,i){
    var cap=zh?(p.caption_zh||p.caption_en):(p.caption_en||p.caption_zh)||'';
    var imgStyle=p.url?'background:url('+p.url+') center/cover no-repeat':'background:'+bgs[i%bgs.length];
    html+='<div class="polaroid-item"><div class="polaroid-card" style="--rot:'+rots[i%rots.length]+'deg;">'
      +'<div class="polaroid-img" style="'+imgStyle+';">'
      +(!p.url?'<span style="font-size:0.7rem;color:var(--text-light);padding:8px;text-align:center;">📸</span>':'')
      +'</div>'
      +'<div class="polaroid-cap">'+cap+'</div>'
      +'</div></div>';
  });
  if(html)c.innerHTML=html;
}

document.addEventListener('DOMContentLoaded',function(){
  var S=get();if(!S)return;
  apply(S);
  document.querySelectorAll('.lang-btn').forEach(function(btn){
    btn.addEventListener('click',function(){setTimeout(function(){apply(S);},80);});
  });
});
})();
