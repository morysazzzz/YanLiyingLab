/* cms.js — reads content from admin panel and applies to pages */

function getCMS() {
  try {
    return JSON.parse(localStorage.getItem('yanlab_cms') || 'null');
  } catch(e) { return null; }
}

document.addEventListener('DOMContentLoaded', () => {
  const S = getCMS();
  if (!S) return; // no saved content, use HTML defaults

  const page = location.pathname.split('/').pop();
  const lang = document.body.classList.contains('lang-en') ? 'en' : 'zh';

  // Re-apply on language switch
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setTimeout(() => applyCMS(S, page, btn.dataset.lang), 60);
    });
  });

  applyCMS(S, page, lang);
});

function applyCMS(S, page, lang) {
  const zh = lang === 'zh';

  if (page === 'index.html' || page === '') {
    setText('[data-cms="slogan"]', zh ? S.home?.slogan_zh : S.home?.slogan_en);
    setText('[data-cms="desc"]',   zh ? S.home?.desc_zh   : S.home?.desc_en);
  }

  if (page === 'pi.html') {
    setText('[data-cms="pi-name"]',  zh ? S.pi?.name_zh  : S.pi?.name_en);
    setText('[data-cms="pi-title"]', zh ? S.pi?.title_zh : S.pi?.title_en);
    setText('[data-cms="pi-tag1"]',  zh ? S.pi?.tag1_zh  : S.pi?.tag1_en);
    setText('[data-cms="pi-tag2"]',  zh ? S.pi?.tag2_zh  : S.pi?.tag2_en);
    setText('[data-cms="pi-bio"]',   zh ? S.pi?.bio_zh   : S.pi?.bio_en);
    setText('[data-cms="pi-quote"]', zh ? S.pi?.quote_zh : S.pi?.quote_en);
    if (S.pi?.email) {
      document.querySelectorAll('[data-cms="pi-email"]').forEach(el => {
        el.textContent = S.pi.email;
        if (el.tagName === 'A') el.href = 'mailto:' + S.pi.email;
      });
    }
  }

  if (page === 'team.html' && S.team?.members) {
    renderTeam(S.team.members, lang);
  }

  if (page === 'publications.html' && S.publications?.papers) {
    renderPubs(S.publications.papers, lang);
  }

  if (page === 'news.html' && S.news?.items) {
    renderNews(S.news.items, lang);
  }

  if (page === 'lablife.html' && S.lablife?.photos) {
    renderLabLife(S.lablife.photos, lang);
  }

  if (page === 'contact.html') {
    setText('[data-cms="contact-email"]', S.contact?.email);
    setText('[data-cms="contact-address"]', zh ? S.contact?.address_zh : S.contact?.address_en);
    setText('[data-cms="contact-dept"]',    zh ? S.contact?.dept_zh    : S.contact?.dept_en);
    document.querySelectorAll('a[href^="mailto:"]').forEach(a => {
      if (S.contact?.email) a.href = 'mailto:' + S.contact.email;
    });
  }

  if (page === 'joinus.html') {
    setText('[data-cms="joinus-intro"]',   zh ? S.joinus?.intro_zh   : S.joinus?.intro_en);
    setText('[data-cms="joinus-phd"]',     zh ? S.joinus?.phd_zh     : S.joinus?.phd_en);
    setText('[data-cms="joinus-postdoc"]', zh ? S.joinus?.postdoc_zh : S.joinus?.postdoc_en);
  }
}

function setText(selector, value) {
  if (!value) return;
  document.querySelectorAll(selector).forEach(el => el.textContent = value);
}

const ROLE_COLORS = {
  PI:'#E8734A', Postdoc:'#81D8D0', PhD:'#A78BCA', Master:'#5BA8D8', Undergrad:'#F5C842', Staff:'#81D8D0'
};
const ROLE_LABELS = {
  PI:{zh:'PI · 研究员',en:'PI · Professor'}, Postdoc:{zh:'博士后',en:'Postdoc'},
  PhD:{zh:'博士生',en:'PhD Student'}, Master:{zh:'硕士生',en:"Master's Student"},
  Undergrad:{zh:'本科生',en:'Undergraduate'}, Staff:{zh:'科研人员',en:'Research Staff'}
};
const GROUP_LABELS = {
  PI:{zh:'课题组长',en:'Principal Investigator'}, Postdoc:{zh:'博士后',en:'Postdoctoral Researchers'},
  PhD:{zh:'博士研究生',en:'PhD Students'}, Master:{zh:'硕士研究生',en:"Master's Students"},
  Undergrad:{zh:'本科生',en:'Undergraduate'}, Staff:{zh:'科研人员',en:'Research Staff'}
};

function renderTeam(members, lang) {
  const container = document.getElementById('members-container');
  if (!container) return;
  const zh = lang === 'zh';
  const order = ['PI','Postdoc','PhD','Master','Undergrad','Staff'];
  const groups = {};
  order.forEach(r => groups[r] = []);
  members.forEach(m => { const r = m.role||'Staff'; if(!groups[r]) groups[r]=[]; groups[r].push(m); });

  let html = '';
  order.forEach(role => {
    if (!groups[role].length) return;
    const color = ROLE_COLORS[role] || '#81D8D0';
    const gl = GROUP_LABELS[role] || {zh:role,en:role};
    const rl = ROLE_LABELS[role] || {zh:role,en:role};
    html += `<div class="group-label">${zh?gl.zh:gl.en}</div><div class="member-grid">`;
    groups[role].forEach(m => {
      const name = zh ? (m.name_zh||m.name_en) : (m.name_en||m.name_zh);
      const focus = zh ? (m.focus_zh||m.focus_en) : (m.focus_en||m.focus_zh);
      const letter = (m.name_zh||m.name_en||'?')[0];
      html += `<div class="member-card">
        <div class="member-stripe" style="height:5px;background:${color};"></div>
        <div class="member-body">
          <div class="member-avatar" style="background:${m.photo?`url('${m.photo}') center/cover`:color};">
            ${m.photo?'':letter}
          </div>
          <div class="member-name">${name||''}</div>
          <div class="member-role"><span class="tag" style="background:${color}22;color:${color};">${zh?rl.zh:rl.en}</span></div>
          <div class="member-focus">${focus||''}</div>
          ${m.email?`<a href="mailto:${m.email}" style="font-size:0.75rem;color:var(--tiffany-dark);">✉ ${m.email}</a>`:''}
        </div>
      </div>`;
    });
    html += `</div>`;
  });
  container.innerHTML = html;
}

function renderPubs(papers, lang) {
  const container = document.getElementById('pubs-container');
  if (!container) return;
  const zh = lang === 'zh';
  const byYear = {};
  papers.forEach(p => { const y=p.year||'2024'; if(!byYear[y]) byYear[y]=[]; byYear[y].push(p); });
  let html = '';
  Object.keys(byYear).sort((a,b)=>b-a).forEach(year => {
    html += `<div class="year-divider">${year}</div>`;
    byYear[year].forEach(p => {
      const badges = [];
      if (p.cover)   badges.push(`<span class="tag badge-cover">Cover</span>`);
      if (p.cited)   badges.push(`<span class="tag badge-cited">${zh?'高被引':'Highly Cited'}</span>`);
      if (p.advance) badges.push(`<span class="tag badge-advance">${zh?'中国科学十大进展':'Top-10 Advance'}</span>`);
      if (p.journal) badges.push(`<span class="tag badge-nature">${p.journal}</span>`);
      html += `<div class="paper-card ${p.cover?'featured':''} ${p.cited?'high-cited':''} ${p.advance?'top-advance':''}">
        ${badges.length?`<div class="paper-badges">${badges.join('')}</div>`:''}
        <div class="paper-title">${p.doi?`<a href="${p.doi}" target="_blank">${p.title}</a>`:p.title}</div>
        <div class="paper-authors">${p.authors||''}</div>
        <div class="paper-journal"><span class="journal-name">${p.journal||''}</span><span class="paper-year">${p.year||''}</span>${p.doi?`<a href="${p.doi}" target="_blank" style="font-size:0.78rem;color:var(--tiffany-dark);margin-left:auto;">DOI ↗</a>`:''}</div>
      </div>`;
    });
  });
  container.innerHTML = html || '<p style="text-align:center;padding:40px;color:var(--text-light);">暂无论文数据</p>';
}

function renderNews(items, lang) {
  const container = document.getElementById('news-container');
  if (!container) return;
  const zh = lang === 'zh';
  let html = '';
  items.forEach(n => {
    const title = zh?(n.title_zh||n.title_en):(n.title_en||n.title_zh);
    const desc  = zh?(n.desc_zh||n.desc_en):(n.desc_en||n.desc_zh);
    const tag   = zh?(n.tag_zh||n.tag_en):(n.tag_en||n.tag_zh);
    const parts = (n.date||'').split('-');
    html += `<div class="news-item">
      <div class="news-date">
        <div class="news-date-month">${parts[1]||''}</div>
        <div class="news-date-day">${parts[2]||'—'}</div>
        <div style="font-size:0.7rem;color:var(--text-light);">${parts[0]||''}</div>
      </div>
      <div class="news-content">
        ${tag?`<div style="margin-bottom:8px;"><span class="tag tag-coral">${tag}</span></div>`:''}
        <h4>${title||''}</h4>
        <p>${desc||''}</p>
      </div>
    </div>`;
  });
  if (html) container.innerHTML = html;
}

function renderLabLife(photos, lang) {
  const container = document.getElementById('lablife-container');
  if (!container) return;
  const zh = lang === 'zh';
  const rots = [-2,1.5,-1,2,-2.5,1,-1.5,2.5];
  const bgs = ['var(--mint-light)','var(--coral-light)','var(--gold-light)','var(--purple-light)','var(--sky-light)','var(--tiffany-light)'];
  let html = '';
  photos.forEach((p,i) => {
    const cap = zh?(p.caption_zh||p.caption_en):(p.caption_en||p.caption_zh);
    html += `<div class="polaroid-item"><div class="polaroid-card" style="--rot:${rots[i%rots.length]}deg;">
      <div class="polaroid-img" style="${p.url?`background:url('${p.url}') center/cover no-repeat`:`background:${bgs[i%bgs.length]}`};">
        ${!p.url?`<span style="font-size:0.7rem;color:var(--text-light);padding:8px;text-align:center;">📸 ${zh?'照片待上传':'Photo coming'}</span>`:''}
      </div>
      <div class="polaroid-cap">${cap||''}</div>
    </div></div>`;
  });
  if (html) container.innerHTML = html;
}
