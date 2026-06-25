/* cms.js — YanLab content management system */
(function() {
  if (window.__ADMIN_PAGE__) return;

  function getCMS() {
    try { return JSON.parse(localStorage.getItem('yanlab_cms') || 'null'); }
    catch(e) { return null; }
  }

  function setText(selector, zhVal, enVal) {
    document.querySelectorAll('[data-cms="' + selector + '"]').forEach(function(el) {
      if (el.hasAttribute('data-zh') && zhVal) el.textContent = zhVal;
      if (el.hasAttribute('data-en') && enVal) el.textContent = enVal;
    });
  }

  function applyCMS(S) {
    var page = location.pathname.split('/').pop() || 'index.html';

    if (page === 'index.html' || page === '') {
      if (S.home) {
        setText('slogan', S.home.slogan_zh, S.home.slogan_en);
        setText('desc',   S.home.desc_zh,   S.home.desc_en);
      }
    }

    if (page === 'pi.html' && S.pi) {
      setText('pi-name',  S.pi.name_zh,  S.pi.name_en);
      setText('pi-title', S.pi.title_zh, S.pi.title_en);
      setText('pi-tag1',  S.pi.tag1_zh,  S.pi.tag1_en);
      setText('pi-tag2',  S.pi.tag2_zh,  S.pi.tag2_en);
      setText('pi-bio',   S.pi.bio_zh,   S.pi.bio_en);
      setText('pi-quote', S.pi.quote_zh, S.pi.quote_en);
    }

    if (page === 'team.html' && S.team && S.team.members) renderTeam(S.team.members);
    if (page === 'publications.html' && S.pubs && S.pubs.papers) renderPubs(S.pubs.papers);
    if (page === 'news.html' && S.news && S.news.items) renderNews(S.news.items);
    if (page === 'lablife.html' && S.life && S.life.photos) renderLabLife(S.life.photos);

    if (page === 'contact.html' && S.contact) {
      setText('contact-email',   S.contact.email,      S.contact.email);
      setText('contact-address', S.contact.address_zh, S.contact.address_en);
      setText('contact-dept',    S.contact.dept_zh,    S.contact.dept_en);
    }

    if (page === 'joinus.html' && S.join) {
      setText('joinus-intro',   S.join.intro_zh,   S.join.intro_en);
      setText('joinus-phd',     S.join.phd_zh,     S.join.phd_en);
      setText('joinus-postdoc', S.join.postdoc_zh, S.join.postdoc_en);
    }
  }

  var COLORS = { PI:'#E8734A', Postdoc:'#81D8D0', PhD:'#A78BCA', Master:'#5BA8D8', Undergrad:'#F5C842', Staff:'#81D8D0' };
  var RZH = { PI:'PI · 研究员', Postdoc:'博士后', PhD:'博士生', Master:'硕士生', Undergrad:'本科生', Staff:'科研人员' };
  var REN = { PI:'PI · Professor', Postdoc:'Postdoc', PhD:'PhD Student', Master:"Master's", Undergrad:'Undergrad', Staff:'Staff' };
  var GZH = { PI:'课题组长', Postdoc:'博士后', PhD:'博士研究生', Master:'硕士研究生', Undergrad:'本科生', Staff:'科研人员' };
  var GEN = { PI:'Principal Investigator', Postdoc:'Postdoctoral Researchers', PhD:'PhD Students', Master:"Master's Students", Undergrad:'Undergraduate', Staff:'Research Staff' };

  function isZh() { return !document.body.classList.contains('lang-en'); }

  function renderTeam(members) {
    var c = document.getElementById('members-container'); if (!c) return;
    var zh = isZh();
    var order = ['PI','Postdoc','PhD','Master','Undergrad','Staff'];
    var groups = {}; order.forEach(function(r){ groups[r]=[]; });
    members.forEach(function(m){ var r=m.role||'Staff'; if(!groups[r]) groups[r]=[]; groups[r].push(m); });
    var html = '';
    order.forEach(function(role) {
      if (!groups[role].length) return;
      var col = COLORS[role]||'#81D8D0';
      html += '<div class="group-label">'+(zh?GZH[role]:GEN[role])+'</div><div class="member-grid">';
      groups[role].forEach(function(m) {
        var name  = zh?(m.name_zh||m.name_en):(m.name_en||m.name_zh)||'';
        var focus = zh?(m.focus_zh||m.focus_en):(m.focus_en||m.focus_zh)||'';
        var letter = (m.name_zh||m.name_en||'?')[0];
        var avatarStyle = m.photo ? 'background:url('+m.photo+') center/cover no-repeat;' : 'background:'+col+';';
        html += '<div class="member-card">'
          + '<div class="member-stripe" style="height:5px;background:'+col+';"></div>'
          + '<div class="member-body">'
          + '<div class="member-avatar" style="'+avatarStyle+'">'+(m.photo?'':letter)+'</div>'
          + '<div class="member-name">'+name+'</div>'
          + '<div class="member-role"><span class="tag" style="background:'+col+'22;color:'+col+';">'+(zh?RZH[role]:REN[role])+'</span></div>'
          + '<div class="member-focus">'+focus+'</div>'
          + (m.email?'<a href="mailto:'+m.email+'" style="font-size:0.75rem;color:var(--tiffany-dark);">✉ '+m.email+'</a>':'')
          + '</div></div>';
      });
      html += '</div>';
    });
    c.innerHTML = html;
  }

  function renderPubs(papers) {
    var c = document.getElementById('pubs-container'); if (!c) return;
    var zh = isZh();
    var byY = {}; papers.forEach(function(p){ var y=p.year||'2024'; if(!byY[y]) byY[y]=[]; byY[y].push(p); });
    var html = '';
    Object.keys(byY).sort(function(a,b){return b-a;}).forEach(function(y) {
      html += '<div class="year-divider">'+y+'</div>';
      byY[y].forEach(function(p) {
        var b = [];
        if(p.cover)   b.push('<span class="tag badge-cover">Cover</span>');
        if(p.cited)   b.push('<span class="tag badge-cited">'+(zh?'高被引':'Highly Cited')+'</span>');
        if(p.advance) b.push('<span class="tag badge-advance">'+(zh?'中国科学十大进展':'Top-10 Advance')+'</span>');
        if(p.journal) b.push('<span class="tag badge-nature">'+p.journal+'</span>');
        html += '<div class="paper-card">'
          + (b.length?'<div class="paper-badges">'+b.join('')+'</div>':'')
          + '<div class="paper-title">'+(p.doi?'<a href="'+p.doi+'" target="_blank">'+p.title+'</a>':p.title||'')+'</div>'
          + '<div class="paper-authors">'+(p.authors||'')+'</div>'
          + '<div class="paper-journal"><span class="journal-name">'+(p.journal||'')+'</span><span class="paper-year">'+(p.year||'')+'</span></div>'
          + '</div>';
      });
    });
    c.innerHTML = html || '<p style="text-align:center;padding:40px;color:var(--text-light);">暂无论文数据</p>';
  }

  function renderNews(items) {
    var c = document.getElementById('news-container'); if (!c) return;
    var zh = isZh();
    var html = '';
    items.forEach(function(n) {
      var title = zh?(n.title_zh||n.title_en):(n.title_en||n.title_zh)||'';
      var desc  = zh?(n.desc_zh||n.desc_en):(n.desc_en||n.desc_zh)||'';
      var tag   = zh?(n.tag_zh||n.tag_en):(n.tag_en||n.tag_zh)||'';
      var parts = (n.date||'').split('-');
      html += '<div class="news-item">'
        + '<div class="news-date">'
        + '<div class="news-date-month">'+(parts[1]||'')+'</div>'
        + '<div class="news-date-day">'+(parts[2]||'—')+'</div>'
        + '<div style="font-size:0.7rem;color:var(--text-light);">'+(parts[0]||'')+'</div>'
        + '</div>'
        + '<div class="news-content">'
        + (tag?'<div style="margin-bottom:8px;"><span class="tag tag-coral">'+tag+'</span></div>':'')
        + '<h4>'+title+'</h4><p>'+desc+'</p>'
        + '</div></div>';
    });
    if (html) c.innerHTML = html;
  }

  function renderLabLife(photos) {
    var c = document.getElementById('lablife-container'); if (!c) return;
    var zh = isZh();
    var rots = [-2,1.5,-1,2,-2.5,1,-1.5,2.5];
    var bgs = ['var(--mint-light)','var(--coral-light)','var(--gold-light)','var(--purple-light)','var(--sky-light)','var(--tiffany-light)'];
    var html = '';
    photos.forEach(function(p, i) {
      var cap = zh?(p.caption_zh||p.caption_en):(p.caption_en||p.caption_zh)||'';
      var imgStyle = p.url ? 'background:url('+p.url+') center/cover no-repeat' : 'background:'+bgs[i%bgs.length];
      html += '<div class="polaroid-item"><div class="polaroid-card" style="--rot:'+rots[i%rots.length]+'deg;">'
        + '<div class="polaroid-img" style="'+imgStyle+';">'
        + (!p.url ? '<span style="font-size:0.7rem;color:var(--text-light);padding:8px;text-align:center;">📸</span>' : '')
        + '</div>'
        + '<div class="polaroid-cap">'+cap+'</div>'
        + '</div></div>';
    });
    if (html) c.innerHTML = html;
  }

  document.addEventListener('DOMContentLoaded', function() {
    var S = getCMS();
    if (!S) return;
    applyCMS(S);

    document.querySelectorAll('.lang-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        setTimeout(function(){ applyCMS(S); }, 80);
      });
    });
  });

})();
