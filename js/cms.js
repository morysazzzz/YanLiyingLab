/* cms.js — YanLab CMS, applies admin content to all pages */
(function() {
  if (window.__ADMIN_PAGE__) return;

  function getCMS() {
    try { return JSON.parse(localStorage.getItem('yanlab_cms') || 'null'); }
    catch(e) { return null; }
  }

  // Replace text in bilingual span pairs by matching current content
  function replaceText(zhText, enText, newZh, newEn) {
    if (!newZh && !newEn) return;
    document.querySelectorAll('[data-zh]').forEach(function(el) {
      if (el.textContent.trim() === zhText && newZh) el.textContent = newZh;
    });
    document.querySelectorAll('[data-en]').forEach(function(el) {
      if (el.textContent.trim() === enText && newEn) el.textContent = newEn;
    });
  }

  // Set by data-cms attribute
  function setCMS(key, zhVal, enVal) {
    document.querySelectorAll('[data-cms="'+key+'"]').forEach(function(el) {
      if (el.hasAttribute('data-zh') && zhVal) el.textContent = zhVal;
      if (el.hasAttribute('data-en') && enVal) el.textContent = enVal;
    });
  }

  function applyCMS(S) {
    var page = location.pathname.split('/').pop() || 'index.html';

    // ── 首页 ──────────────────────────────────────────
    if (page === 'index.html' || page === '') {
      var h = S.home;
      if (h) {
        setCMS('slogan', h.slogan_zh, h.slogan_en);
        setCMS('desc',   h.desc_zh,   h.desc_en);
        // Also replace by content matching (fallback)
        replaceText('探索生命起点的奥秘', 'Decoding the origins of life', h.slogan_zh, h.slogan_en);
        replaceText('我们致力于揭示人类早期生命发育的遗传与表观遗传调控规律，让更多家庭实现健康生育的梦想。',
          'We unravel the genetic and epigenetic logic of early human development, helping more families realize the dream of healthy reproduction.',
          h.desc_zh, h.desc_en);
      }
    }

    // ── 闫老师页 ──────────────────────────────────────
    if (page === 'pi.html') {
      var p = S.pi;
      if (p) {
        replaceText('闫丽盈', 'Liying Yan', p.name_zh, p.name_en);
        replaceText('研究员 · 博士生导师 · 科研处处长', 'Principal Investigator · PhD Supervisor · Director of Research Office', p.title_zh, p.title_en);
        replaceText('国家杰出青年科学基金获得者', 'NSFC Distinguished Young Scholar', p.tag1_zh, p.tag1_en);
        replaceText('辅助生殖教育部重点实验室副主任', 'Deputy Director, MOE Key Lab of ART', p.tag2_zh, p.tag2_en);
        replaceText('请在这里填写闫老师的寄语或座右铭。', "A quote or message from Prof. Yan — to be filled.", p.quote_zh, p.quote_en);
        // Bio is multi-paragraph, replace by partial match
        document.querySelectorAll('[data-zh]').forEach(function(el) {
          if (el.textContent.indexOf('闫丽盈研究员现任职于') !== -1 && p.bio_zh) el.textContent = p.bio_zh;
        });
        document.querySelectorAll('[data-en]').forEach(function(el) {
          if (el.textContent.indexOf('Prof. Liying Yan is a Principal') !== -1 && p.bio_en) el.textContent = p.bio_en;
        });
        // Email
        if (p.email) {
          document.querySelectorAll('a[href^="mailto:"]').forEach(function(a) { a.href = 'mailto:'+p.email; });
          document.querySelectorAll('[data-zh]').forEach(function(el) {
            if (el.textContent === 'yanliying@bjmu.edu.cn') el.textContent = p.email;
          });
        }
      }
    }

    // ── 研究方向 ──────────────────────────────────────
    if (page === 'research.html' && S.research && S.research.areas) {
      var areas = S.research.areas;
      var zhTitles = ['生殖遗传与胚胎诊断','表观遗传调控机制','辅助生殖技术临床转化'];
      var enTitles = ['Reproductive Genetics & Embryo Diagnosis','Epigenetic Regulation Mechanisms','Translational Assisted Reproduction'];
      areas.forEach(function(a, i) {
        if (zhTitles[i]) replaceText(zhTitles[i], enTitles[i], a.title_zh, a.title_en);
      });
    }

    // ── 联系方式 ──────────────────────────────────────
    if (page === 'contact.html' && S.contact) {
      var ct = S.contact;
      if (ct.email) {
        document.querySelectorAll('a[href^="mailto:"]').forEach(function(a) { a.href = 'mailto:'+ct.email; a.textContent = ct.email; });
      }
      replaceText('北京市海淀区花园北路49号\n北京大学第三医院 生殖医学科\n邮编：100191',
        '49 North Garden Road, Haidian District\nReproductive Medicine Center, PUTH\nBeijing 100191, China',
        ct.address_zh, ct.address_en);
    }

    // ── 加入我们 ──────────────────────────────────────
    if (page === 'joinus.html' && S.join) {
      var j = S.join;
      replaceText('我们欢迎充满好奇心、勤奋踏实的伙伴加入。无论你处于学术生涯的哪个阶段，都真诚欢迎你来聊聊。',
        "We welcome curious, dedicated people at any stage of their academic career. We'd genuinely love to hear from you.",
        j.intro_zh, j.intro_en);
    }

    // ── 实验室生活 Polaroid 墙 ────────────────────────
    if (page === 'lablife.html' && S.life && S.life.photos) renderLabLife(S.life.photos);

    // ── 团队成员 ──────────────────────────────────────
    if (page === 'team.html' && S.team && S.team.members) renderTeam(S.team.members);

    // ── 论文 ──────────────────────────────────────────
    if (page === 'publications.html' && S.pubs && S.pubs.papers) renderPubs(S.pubs.papers);

    // ── 新闻 ──────────────────────────────────────────
    if (page === 'news.html' && S.news && S.news.items) renderNews(S.news.items);
  }

  // ── Render functions ─────────────────────────────────────────
  var COLORS = {PI:'#E8734A',Postdoc:'#81D8D0',PhD:'#A78BCA',Master:'#5BA8D8',Undergrad:'#F5C842',Staff:'#81D8D0'};
  var RZH={PI:'PI·研究员',Postdoc:'博士后',PhD:'博士生',Master:'硕士生',Undergrad:'本科生',Staff:'科研人员'};
  var REN={PI:'PI·Professor',Postdoc:'Postdoc',PhD:'PhD Student',Master:"Master's",Undergrad:'Undergrad',Staff:'Staff'};
  var GZH={PI:'课题组长',Postdoc:'博士后',PhD:'博士研究生',Master:'硕士研究生',Undergrad:'本科生',Staff:'科研人员'};
  var GEN={PI:'Principal Investigator',Postdoc:'Postdoctoral Researchers',PhD:'PhD Students',Master:"Master's Students",Undergrad:'Undergraduate',Staff:'Research Staff'};

  function isZh(){ return !document.body.classList.contains('lang-en'); }

  function renderTeam(members) {
    var c = document.getElementById('members-container'); if (!c) return;
    var zh = isZh();
    var order=['PI','Postdoc','PhD','Master','Undergrad','Staff'];
    var groups={}; order.forEach(function(r){groups[r]=[];});
    members.forEach(function(m){ var r=m.role||'Staff'; if(!groups[r]) groups[r]=[]; groups[r].push(m); });
    var html='';
    order.forEach(function(role){
      if(!groups[role].length) return;
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

  function renderPubs(papers) {
    var c=document.getElementById('pubs-container'); if(!c) return;
    var zh=isZh();
    var byY={}; papers.forEach(function(p){var y=p.year||'2024';if(!byY[y])byY[y]=[];byY[y].push(p);});
    var html='';
    Object.keys(byY).sort(function(a,b){return b-a;}).forEach(function(y){
      html+='<div class="year-divider">'+y+'</div>';
      byY[y].forEach(function(p){
        var b=[];
        if(p.cover) b.push('<span class="tag badge-cover">Cover</span>');
        if(p.cited) b.push('<span class="tag badge-cited">'+(zh?'高被引':'Highly Cited')+'</span>');
        if(p.advance) b.push('<span class="tag badge-advance">'+(zh?'中国科学十大进展':'Top-10 Advance')+'</span>');
        if(p.journal) b.push('<span class="tag badge-nature">'+p.journal+'</span>');
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

  function renderNews(items) {
    var c=document.getElementById('news-container'); if(!c) return;
    var zh=isZh();
    var html='';
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
    if(html) c.innerHTML=html;
  }

  function renderLabLife(photos) {
    var c=document.getElementById('lablife-container'); if(!c) return;
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
    if(html) c.innerHTML=html;
  }

  // ── Boot ────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function() {
    var S = getCMS();
    if (!S) return;
    applyCMS(S);
    document.querySelectorAll('.lang-btn').forEach(function(btn){
      btn.addEventListener('click', function(){
        setTimeout(function(){ applyCMS(S); }, 80);
      });
    });
  });

})();
