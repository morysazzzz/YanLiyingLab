/* sheets.js — Google Sheets content loader for YanLab
 * 
 * HOW TO USE:
 * 1. Create a Google Sheet with tabs: Members, Publications, News, LabLife
 * 2. Publish it: File → Share → Publish to web → CSV format
 * 3. Replace SHEET_ID below with your actual sheet ID
 * 4. Each tab's CSV URL follows the pattern in SHEETS config
 */

const SHEET_ID = '1cUrnhyRFKKQFK2AwbuOE8yBYbff5xkFcc1ZzlPe8Hyc';

const SHEETS = {
  members:      `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=Members`,
  publications: `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=Publications`,
  news:         `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=News`,
  lablife:      `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=LabLife`,
  pi:           `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=PI`,
};

// Parse CSV text into array of objects
function parseCSV(text) {
  const lines = text.trim().split('\n');
  if (lines.length < 2) return [];
  
  const headers = lines[0].split(',').map(h => h.replace(/^"|"$/g, '').trim());
  return lines.slice(1).map(line => {
    // Handle quoted fields with commas inside
    const values = [];
    let inQuote = false, current = '';
    for (let i = 0; i < line.length; i++) {
      if (line[i] === '"') { inQuote = !inQuote; continue; }
      if (line[i] === ',' && !inQuote) { values.push(current.trim()); current = ''; continue; }
      current += line[i];
    }
    values.push(current.trim());
    
    const obj = {};
    headers.forEach((h, i) => obj[h] = values[i] || '');
    return obj;
  }).filter(row => Object.values(row).some(v => v)); // skip empty rows
}

// Fetch a sheet tab
async function fetchSheet(name) {
  try {
    const res = await fetch(SHEETS[name]);
    if (!res.ok) throw new Error('fetch failed');
    return parseCSV(await res.text());
  } catch (e) {
    console.warn(`Could not load sheet: ${name}`, e);
    return null;
  }
}

// Role color mapping
const ROLE_CONFIG = {
  'PI':       { stripe: 'var(--coral)',   tag: 'tag-coral',  label_zh: 'PI · 研究员',   label_en: 'PI · Professor' },
  'Postdoc':  { stripe: 'var(--tiffany)', tag: 'tag-mint',   label_zh: '博士后',        label_en: 'Postdoc' },
  'PhD':      { stripe: 'var(--purple)',  tag: 'tag-purple', label_zh: '博士生',        label_en: 'PhD Student' },
  'Master':   { stripe: 'var(--sky)',     tag: 'tag-sky',    label_zh: '硕士生',        label_en: "Master's Student" },
  'Undergrad':{ stripe: 'var(--gold)',    tag: 'tag-gold',   label_zh: '本科生',        label_en: 'Undergraduate' },
  'Staff':    { stripe: 'var(--tiffany-dark)', tag: 'tag-blue', label_zh: '科研人员',  label_en: 'Research Staff' },
};

// ── RENDER: Team page ──────────────────────────────────────────
function renderMembers(members, lang) {
  const container = document.getElementById('members-container');
  if (!container || !members) return;

  // Group by role
  const groups = {};
  const roleOrder = ['PI','Postdoc','PhD','Master','Undergrad','Staff'];
  roleOrder.forEach(r => groups[r] = []);
  members.forEach(m => {
    const role = m.Role || 'Staff';
    if (!groups[role]) groups[role] = [];
    groups[role].push(m);
  });

  const groupLabels = {
    PI:       { zh: '课题组长', en: 'Principal Investigator' },
    Postdoc:  { zh: '博士后',   en: 'Postdoctoral Researchers' },
    PhD:      { zh: '博士研究生', en: 'PhD Students' },
    Master:   { zh: '硕士研究生', en: "Master's Students" },
    Undergrad:{ zh: '本科生',   en: 'Undergraduate Students' },
    Staff:    { zh: '科研人员', en: 'Research Staff' },
  };

  let html = '';
  roleOrder.forEach(role => {
    const group = groups[role];
    if (!group.length) return;
    const cfg = ROLE_CONFIG[role] || ROLE_CONFIG['Staff'];
    const label = groupLabels[role];

    html += `<div class="group-label">
      <span data-zh>${label.zh}</span>
      <span data-en>${label.en}</span>
    </div>
    <div class="member-grid">`;

    group.forEach(m => {
      const name = lang === 'zh' ? (m.Name_ZH || m.Name_EN || '') : (m.Name_EN || m.Name_ZH || '');
      const focus = lang === 'zh' ? (m.Focus_ZH || m.Focus_EN || '') : (m.Focus_EN || m.Focus_ZH || '');
      const avatarLetter = (m.Name_ZH || m.Name_EN || '?')[0];
      const avatarStyle = m.Photo 
        ? `background:url('${m.Photo}') center/cover no-repeat`
        : `background:${cfg.stripe}`;

      html += `<div class="member-card">
        <div class="member-stripe" style="height:5px;background:${cfg.stripe};"></div>
        <div class="member-body">
          <div class="member-avatar" style="${avatarStyle};">
            ${m.Photo ? '' : avatarLetter}
          </div>
          <div class="member-name">${name}</div>
          <div class="member-role">
            <span class="tag ${cfg.tag}">
              ${lang === 'zh' ? cfg.label_zh : cfg.label_en}
            </span>
          </div>
          <div class="member-focus">${focus}</div>
          ${m.Email ? `<a href="mailto:${m.Email}" style="font-size:0.75rem;color:var(--tiffany-dark);">✉ ${m.Email}</a>` : ''}
        </div>
      </div>`;
    });

    html += `</div>`;
  });

  container.innerHTML = html || '<p style="color:var(--text-light);text-align:center;padding:40px;">内容加载中...</p>';
}

// ── RENDER: Publications page ──────────────────────────────────
function renderPublications(pubs, lang) {
  const container = document.getElementById('pubs-container');
  if (!container || !pubs) return;

  // Group by year
  const byYear = {};
  pubs.forEach(p => {
    const y = p.Year || '2024';
    if (!byYear[y]) byYear[y] = [];
    byYear[y].push(p);
  });

  const years = Object.keys(byYear).sort((a,b) => b-a);
  let html = '';

  years.forEach(year => {
    html += `<div class="year-divider">${year}</div>`;
    byYear[year].forEach(p => {
      const badges = [];
      if (p.Cover === 'TRUE' || p.Cover === '1') badges.push(`<span class="tag badge-cover">Cover</span>`);
      if (p.HighlyCited === 'TRUE' || p.HighlyCited === '1') badges.push(`<span class="tag badge-cited">${lang==='zh'?'高被引':'Highly Cited'}</span>`);
      if (p.TopAdvance === 'TRUE' || p.TopAdvance === '1') badges.push(`<span class="tag badge-advance">${lang==='zh'?'中国科学十大进展':'Top-10 Advance'}</span>`);
      if (p.Journal) badges.push(`<span class="tag badge-nature">${p.Journal}</span>`);

      html += `<div class="paper-card ${p.Cover==='TRUE'?'featured':''} ${p.HighlyCited==='TRUE'?'high-cited':''} ${p.TopAdvance==='TRUE'?'top-advance':''}">
        ${badges.length ? `<div class="paper-badges">${badges.join('')}</div>` : ''}
        <div class="paper-title">${p.DOI ? `<a href="${p.DOI}" target="_blank">${p.Title}</a>` : p.Title}</div>
        <div class="paper-authors">${p.Authors}</div>
        <div class="paper-journal">
          <span class="journal-name">${p.Journal}</span>
          <span class="paper-year">${p.Year}</span>
          ${p.DOI ? `<a href="${p.DOI}" target="_blank" style="font-size:0.78rem;color:var(--tiffany-dark);margin-left:auto;">DOI ↗</a>` : ''}
        </div>
      </div>`;
    });
  });

  container.innerHTML = html || `<p style="text-align:center;color:var(--text-light);padding:40px;">${lang==='zh'?'论文列表加载中...':'Loading publications...'}</p>`;
}

// ── RENDER: News page ──────────────────────────────────────────
function renderNews(news, lang) {
  const container = document.getElementById('news-container');
  if (!container || !news) return;

  const tagColors = { '论文发表':'tag-coral', 'Publication':'tag-coral', '荣誉奖项':'tag-mint', 'Award':'tag-mint', '活动':'tag-purple', 'Event':'tag-purple', '招生':'tag-gold', 'Recruitment':'tag-gold' };

  let html = '';
  news.forEach(n => {
    const title = lang==='zh' ? (n.Title_ZH||n.Title_EN||'') : (n.Title_EN||n.Title_ZH||'');
    const desc  = lang==='zh' ? (n.Desc_ZH||n.Desc_EN||'')   : (n.Desc_EN||n.Desc_ZH||'');
    const tag   = lang==='zh' ? (n.Tag_ZH||n.Tag_EN||'')     : (n.Tag_EN||n.Tag_ZH||'');
    const date  = n.Date || '';
    const parts = date.split('-');
    const tagColor = tagColors[tag] || 'tag-sky';

    html += `<div class="news-item">
      <div class="news-date">
        <div class="news-date-month">${parts[1]||''}</div>
        <div class="news-date-day">${parts[2]||'—'}</div>
        <div style="font-size:0.7rem;color:var(--text-light);">${parts[0]||''}</div>
      </div>
      <div class="news-content">
        ${tag ? `<div style="margin-bottom:8px;"><span class="tag ${tagColor}">${tag}</span></div>` : ''}
        <h4>${title}</h4>
        <p>${desc}</p>
      </div>
    </div>`;
  });

  container.innerHTML = html || `<p style="text-align:center;color:var(--text-light);padding:40px;">${lang==='zh'?'动态加载中...':'Loading news...'}</p>`;
}

// ── RENDER: Lab Life page ──────────────────────────────────────
function renderLabLife(photos, lang) {
  const container = document.getElementById('lablife-container');
  if (!container || !photos) return;

  const rots = [-2, 1.5, -1, 2, -2.5, 1, -1.5, 2.5, -0.5, 1.8];
  const bgColors = ['var(--mint-light)','var(--coral-light)','var(--gold-light)','var(--purple-light)','var(--sky-light)','var(--tiffany-light)'];

  let html = '';
  photos.forEach((p, i) => {
    const caption = lang==='zh' ? (p.Caption_ZH||p.Caption_EN||'') : (p.Caption_EN||p.Caption_ZH||'');
    const rot = rots[i % rots.length];
    const bg  = bgColors[i % bgColors.length];

    html += `<div class="polaroid-item">
      <div class="polaroid-card" style="--rot:${rot}deg;">
        <div class="polaroid-img" style="${p.URL ? `background:url('${p.URL}') center/cover no-repeat` : `background:${bg}`};">
          ${!p.URL ? `<span style="font-size:0.7rem;color:var(--text-light);padding:8px;text-align:center;">📸 ${lang==='zh'?'照片待上传':'Photo coming'}</span>` : ''}
        </div>
        <div class="polaroid-cap">${caption}</div>
      </div>
    </div>`;
  });

  container.innerHTML = html;
}

// ── MAIN: auto-detect page and load ───────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  const page = location.pathname.split('/').pop();
  const lang = document.body.classList.contains('lang-en') ? 'en' : 'zh';

  // Listen for language changes
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const newLang = btn.dataset.lang;
      setTimeout(() => rerender(page, newLang), 50);
    });
  });

  await rerender(page, lang);
});

async function rerender(page, lang) {
  if (page === 'team.html') {
    const data = await fetchSheet('members');
    renderMembers(data, lang);
  } else if (page === 'publications.html') {
    const data = await fetchSheet('publications');
    renderPublications(data, lang);
  } else if (page === 'news.html') {
    const data = await fetchSheet('news');
    renderNews(data, lang);
  } else if (page === 'lablife.html') {
    const data = await fetchSheet('lablife');
    renderLabLife(data, lang);
  }
}
