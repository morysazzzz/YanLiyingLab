/* nav-footer.js — injects shared navbar + footer into every page */
if (window.__ADMIN_PAGE__) { /* skip */ } else {

const NAV_HTML = `
<nav class="navbar">
  <div class="nav-inner">
    <a href="/index.html" class="nav-logo">
      <div class="nav-logo-mark">Y</div>
      <div class="nav-logo-text">
        <span class="main">YanLab</span>
        <span class="sub" data-zh>闫丽盈实验室</span>
        <span class="sub" data-en>Prof. Liying Yan's Lab</span>
      </div>
    </a>

    <ul class="nav-links">
      <li><a href="/index.html"><span data-zh>首页</span><span data-en>Home</span></a></li>
      <li><a href="/pages/pi.html"><span data-zh>关于闫老师</span><span data-en>About PI</span></a></li>
      <li><a href="/pages/research.html"><span data-zh>研究方向</span><span data-en>Research</span></a></li>
      <li><a href="/pages/team.html"><span data-zh>团队成员</span><span data-en>Team</span></a></li>
      <li><a href="/pages/publications.html"><span data-zh>学术成果</span><span data-en>Publications</span></a></li>
      <li><a href="/pages/news.html"><span data-zh>新闻动态</span><span data-en>News</span></a></li>
      <li><a href="/pages/lablife.html"><span data-zh>实验室生活</span><span data-en>Lab Life</span></a></li>
      <li><a href="/pages/joinus.html"><span data-zh>加入我们</span><span data-en>Join Us</span></a></li>
      <li><a href="/pages/contact.html"><span data-zh>联系我们</span><span data-en>Contact</span></a></li>
    </ul>

    <div class="nav-right">
      <div class="lang-toggle">
        <button class="lang-btn" data-lang="zh">中文</button>
        <button class="lang-btn" data-lang="en">EN</button>
      </div>
      <div class="nav-hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </div>
    </div>
  </div>
</nav>
`;

const FOOTER_HTML = `
<footer>
  <div class="container">
    <div class="footer-grid">
      <div>
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
          <div style="width:32px;height:32px;background:var(--tiffany);border-radius:8px;display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-weight:700;color:var(--nav-bg);font-size:1rem;">Y</div>
          <span style="font-weight:700;font-size:1rem;color:#fff;">YanLab</span>
        </div>
        <p style="font-size:0.82rem;line-height:1.7;max-width:280px;">
          <span data-zh>探索生殖发育奥秘，守护生命最初的奇迹。<br>北京大学第三医院生殖医学科</span>
          <span data-en>Exploring the mysteries of reproductive development.<br>Peking University Third Hospital</span>
        </p>
      </div>
      <div>
        <h4><span data-zh>快速导航</span><span data-en>Navigation</span></h4>
        <ul style="display:flex;flex-direction:column;gap:8px;">
          <li><a href="/index.html"><span data-zh>首页</span><span data-en>Home</span></a></li>
          <li><a href="/pages/research.html"><span data-zh>研究方向</span><span data-en>Research</span></a></li>
          <li><a href="/pages/team.html"><span data-zh>团队成员</span><span data-en>Team</span></a></li>
          <li><a href="/pages/publications.html"><span data-zh>学术成果</span><span data-en>Publications</span></a></li>
          <li><a href="/pages/lablife.html"><span data-zh>实验室生活</span><span data-en>Lab Life</span></a></li>
        </ul>
      </div>
      <div>
        <h4><span data-zh>联系我们</span><span data-en>Contact</span></h4>
        <ul style="display:flex;flex-direction:column;gap:8px;font-size:0.82rem;">
          <li>
            <span data-zh>📍 北京市海淀区花园北路49号<br>北京大学第三医院</span>
            <span data-en>📍 49 North Garden Road, Haidian<br>Beijing, China 100191</span>
          </li>
          <li>✉️ yanliying@bjmu.edu.cn</li>
          <li><a href="/pages/joinus.html"><span data-zh>🎓 招生信息</span><span data-en>🎓 Join Us</span></a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2025 YanLab · <span data-zh>北京大学第三医院</span><span data-en>Peking University Third Hospital</span></span>
      <span style="font-size:0.75rem;opacity:0.5;"><span data-zh>用❤️为闫老师建造</span><span data-en>Built with ❤️ for Prof. Yan</span></span>
    </div>
  </div>
</footer>
`;

document.addEventListener('DOMContentLoaded', () => {
  // inject nav before first child of body
  document.body.insertAdjacentHTML('afterbegin', NAV_HTML);
  // inject footer at end of body
  document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);
});
}
