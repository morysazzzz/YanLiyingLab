(function(){

var ICONS = {

  // ── 导航图标 ─────────────────────────────────────────────────

  // 闫老师 - 用手绘头像，不用SVG
  '👩‍🔬': null,

  // 研究方向 - 胖烧瓶
  '🧬': `<svg width="22" height="22" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-right:4px;">
    <path d="M18 4 L18 16 L6 34 Q4 40 22 40 Q40 40 38 34 L26 16 L26 4z" fill="#B5EAD7" stroke="#2D1B00" stroke-width="2.5" stroke-linejoin="round"/>
    <rect x="14" y="2" width="16" height="6" rx="3" fill="#D4F5E9" stroke="#2D1B00" stroke-width="2.2"/>
    <circle cx="14" cy="30" r="4" fill="white" stroke="#2D1B00" stroke-width="1.8"/>
    <circle cx="24" cy="24" r="3" fill="white" stroke="#2D1B00" stroke-width="1.5"/>
    <circle cx="18" cy="34" r="2" fill="white" stroke="#2D1B00" stroke-width="1.5"/>
    <path d="M10 28 Q8 20 10 14" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
  </svg>`,

  // 发表论文 - 书本
  '📄': `<svg width="22" height="22" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-right:4px;">
    <rect x="4" y="4" width="36" height="36" rx="5" fill="white" stroke="#2D1B00" stroke-width="2.5"/>
    <rect x="4" y="4" width="8" height="36" rx="5" fill="#81D8D0" stroke="#2D1B00" stroke-width="2.5"/>
    <rect x="24" y="4" width="8" height="8" rx="0" fill="#E8734A" stroke="#2D1B00" stroke-width="0"/>
    <path d="M24 4 L32 4 L32 16 L28 12 L24 16 Z" fill="#E8734A" stroke="#2D1B00" stroke-width="2"/>
    <line x1="16" y1="18" x2="34" y2="18" stroke="#C8E8E2" stroke-width="2" stroke-linecap="round"/>
    <line x1="16" y1="24" x2="34" y2="24" stroke="#C8E8E2" stroke-width="2" stroke-linecap="round"/>
    <line x1="16" y1="30" x2="28" y2="30" stroke="#C8E8E2" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  // 新闻动态 - 报纸
  '📢': `<svg width="22" height="22" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-right:4px;">
    <rect x="4" y="8" width="30" height="30" rx="4" fill="white" stroke="#2D1B00" stroke-width="2.5"/>
    <rect x="8" y="12" width="22" height="8" rx="2" fill="#0D9488" stroke="#2D1B00" stroke-width="1.8"/>
    <rect x="8" y="24" width="14" height="3" rx="1.5" fill="#D0EDE9"/>
    <rect x="8" y="29" width="16" height="3" rx="1.5" fill="#D0EDE9"/>
    <rect x="8" y="34" width="12" height="3" rx="1.5" fill="#D0EDE9"/>
    <rect x="24" y="24" width="8" height="10" rx="2" fill="#B5EAD7" stroke="#2D1B00" stroke-width="1.5"/>
    <path d="M34 28 L40 28 L40 38 Q40 42 36 42 L34 42z" fill="#E8E8E8" stroke="#2D1B00" stroke-width="2"/>
    <path d="M34 8 L34 28" stroke="#2D1B00" stroke-width="2"/>
  </svg>`,

  // 实验室生活 - 相机
  '🎉': `<svg width="22" height="22" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-right:4px;">
    <rect x="4" y="14" width="36" height="24" rx="6" fill="#FFB347" stroke="#2D1B00" stroke-width="2.5"/>
    <rect x="14" y="6" width="16" height="10" rx="4" fill="#FFB347" stroke="#2D1B00" stroke-width="2.2"/>
    <circle cx="22" cy="26" r="9" fill="#2D2D2D" stroke="#2D1B00" stroke-width="2.2"/>
    <circle cx="22" cy="26" r="5" fill="#444" stroke="#2D1B00" stroke-width="1.5"/>
    <circle cx="19" cy="23" r="2.5" fill="white" opacity="0.35"/>
    <rect x="30" y="10" width="8" height="6" rx="3" fill="white" stroke="#2D1B00" stroke-width="1.8"/>
    <circle cx="12" cy="10" r="3" fill="#E8734A" stroke="#2D1B00" stroke-width="1.5"/>
  </svg>`,

  // 联系方式 - 地图钉
  '📍': `<svg width="22" height="22" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-right:4px;">
    <path d="M22 4 C12 4 6 12 6 18 C6 28 22 42 22 42 C22 42 38 28 38 18 C38 12 32 4 22 4z" fill="#E8734A" stroke="#2D1B00" stroke-width="2.5"/>
    <circle cx="22" cy="18" r="7" fill="white" stroke="#2D1B00" stroke-width="2"/>
  </svg>`,

  // ── 实验室传统 ───────────────────────────────────────────────

  '🏕️': `<svg width="32" height="32" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M26 6 L46 42 L6 42 Z" fill="#B5EAD7" stroke="#2D1B00" stroke-width="2.8" stroke-linejoin="round"/>
    <path d="M26 6 L26 42" stroke="#2D1B00" stroke-width="2.2"/>
    <path d="M14 28 L38 28" stroke="#2D1B00" stroke-width="1.8"/>
    <path d="M16 34 L36 34" fill="none" stroke="#2D1B00" stroke-width="1.5" stroke-dasharray="3 2"/>
    <ellipse cx="26" cy="43" rx="20" ry="3" fill="#8BC4A0" stroke="#2D1B00" stroke-width="1.5"/>
    <circle cx="36" cy="14" r="4" fill="#FFE066" stroke="#2D1B00" stroke-width="2"/>
    <path d="M36 10 L36 7M40 11 L43 9M41 15 L44 15" stroke="#FFE066" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  '🎂': `<svg width="32" height="32" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="26" width="40" height="18" rx="5" fill="#FFD4A8" stroke="#2D1B00" stroke-width="2.5"/>
    <rect x="6" y="26" width="40" height="8" rx="5" fill="#FFBE7A" stroke="#2D1B00" stroke-width="2"/>
    <path d="M6 30 Q16 26 26 30 Q36 34 46 30" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"/>
    <rect x="12" y="18" width="10" height="10" rx="3" fill="#FFB4C2" stroke="#2D1B00" stroke-width="2"/>
    <rect x="30" y="18" width="10" height="10" rx="3" fill="#B5EAD7" stroke="#2D1B00" stroke-width="2"/>
    <path d="M17 18 Q15 12 17 8 Q19 12 17 18z" fill="#FFE066" stroke="#2D1B00" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M35 18 Q33 12 35 8 Q37 12 35 18z" fill="#E8734A" stroke="#2D1B00" stroke-width="1.8" stroke-linejoin="round"/>
    <circle cx="17" cy="7" r="2.5" fill="#FFD700" stroke="#2D1B00" stroke-width="1.5"/>
    <circle cx="35" cy="7" r="2.5" fill="#FFD700" stroke="#2D1B00" stroke-width="1.5"/>
  </svg>`,

  '🎓': `<svg width="32" height="32" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M26 10 L48 20 L26 30 L4 20 Z" fill="#0D9488" stroke="#2D1B00" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M40 24 L40 36 Q40 42 26 44 Q12 42 12 36 L12 24" fill="#B5EAD7" stroke="#2D1B00" stroke-width="2.2"/>
    <path d="M48 20 L48 32" stroke="#2D1B00" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="48" cy="34" r="3" fill="#E8734A" stroke="#2D1B00" stroke-width="2"/>
    <path d="M22 44 Q22 48 26 48 Q30 48 30 44" fill="none" stroke="#2D1B00" stroke-width="2"/>
  </svg>`,

  '🥢': `<svg width="32" height="32" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 4 Q8 26 10 48" fill="none" stroke="#8B4513" stroke-width="5" stroke-linecap="round"/>
    <path d="M18 4 Q20 26 18 48" fill="none" stroke="#8B4513" stroke-width="5" stroke-linecap="round"/>
    <path d="M10 4 Q8 26 10 48" fill="none" stroke="#C4956A" stroke-width="2" stroke-linecap="round"/>
    <path d="M18 4 Q20 26 18 48" fill="none" stroke="#C4956A" stroke-width="2" stroke-linecap="round"/>
    <rect x="26" y="4" width="7" height="28" rx="3.5" fill="#8B4513" stroke="#2D1B00" stroke-width="2"/>
    <path d="M26 32 Q26 44 30 48 Q34 44 34 32 L34 44 Q30 50 26 48z" fill="#8B4513" stroke="#2D1B00" stroke-width="1.8"/>
    <ellipse cx="14" cy="46" rx="10" ry="3" fill="#D4A06A" stroke="#2D1B00" stroke-width="1.5"/>
  </svg>`,

  '✈️': `<svg width="32" height="32" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M44 18 C44 14 40 8 28 12 L16 16 L6 12 L4 16 L12 22 L8 30 L14 32 L18 26 L26 28 L24 36 L28 38 L36 30 C44 26 44 22 44 18z" fill="#81D8D0" stroke="#2D1B00" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M28 12 C28 12 32 14 34 18" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
  </svg>`,

  '✨': `<svg width="32" height="32" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M26 4 L30 20 L46 24 L30 28 L26 44 L22 28 L6 24 L22 20 Z" fill="#FFE066" stroke="#2D1B00" stroke-width="2.5" stroke-linejoin="round"/>
    <circle cx="40" cy="10" r="4" fill="#FFE066" stroke="#2D1B00" stroke-width="2"/>
    <circle cx="12" cy="38" r="3" fill="#FFE066" stroke="#2D1B00" stroke-width="1.8"/>
  </svg>`,

  // ── 荣誉奖项 ─────────────────────────────────────────────────

  '🏆': `<svg width="32" height="32" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 6 L36 6 L36 28 Q36 40 26 42 Q16 40 16 28 Z" fill="#FFD700" stroke="#2D1B00" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M16 10 L8 10 Q4 10 4 18 Q4 26 16 26" fill="#FFE566" stroke="#2D1B00" stroke-width="2.2"/>
    <path d="M36 10 L44 10 Q48 10 48 18 Q48 26 36 26" fill="#FFE566" stroke="#2D1B00" stroke-width="2.2"/>
    <rect x="20" y="42" width="12" height="6" rx="2" fill="#C4956A" stroke="#2D1B00" stroke-width="2"/>
    <rect x="14" y="48" width="24" height="4" rx="2" fill="#8B4513" stroke="#2D1B00" stroke-width="2"/>
    <path d="M20 20 l2 6 6 0 -5 3.5 2 6 -5-3.5 -5 3.5 2-6 -5-3.5 6 0z" fill="white" stroke="#2D1B00" stroke-width="1.2"/>
  </svg>`,

  '⭐': `<svg width="32" height="32" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M26 4 L31 18 L46 18 L34 28 L38 42 L26 34 L14 42 L18 28 L6 18 L21 18 Z" fill="#FFD700" stroke="#2D1B00" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M26 10 L29 20 L22 20 Z" fill="white" opacity="0.4"/>
  </svg>`,

  '🌟': `<svg width="32" height="32" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M26 4 L30 18 L44 14 L34 26 L46 34 L30 32 L28 48 L22 34 L8 38 L18 26 L6 18 L22 20 Z" fill="#FFD700" stroke="#2D1B00" stroke-width="2.5" stroke-linejoin="round"/>
  </svg>`,

  // 科研成果 - 火箭
  '🎖️': `<svg width="32" height="32" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M26 4 Q38 6 38 18 L34 32 L26 34 L18 32 L18 18 Q18 6 26 4z" fill="#81D8D0" stroke="#2D1B00" stroke-width="2.5"/>
    <circle cx="26" cy="16" r="7" fill="white" stroke="#2D1B00" stroke-width="2"/>
    <circle cx="26" cy="16" r="4" fill="#B5EAD7" stroke="#2D1B00" stroke-width="1.5"/>
    <path d="M18 20 L8 32 L18 30z" fill="#0D9488" stroke="#2D1B00" stroke-width="2"/>
    <path d="M34 20 L44 32 L34 30z" fill="#0D9488" stroke="#2D1B00" stroke-width="2"/>
    <path d="M20 32 Q22 40 26 42 Q30 40 32 32z" fill="#FFB347" stroke="#2D1B00" stroke-width="2"/>
    <path d="M23 34 Q25 40 26 38 Q27 40 29 34z" fill="#FFE066"/>
  </svg>`,

};

function applyIcons(){
  // event cards (lab traditions)
  document.querySelectorAll('.event-emoji').forEach(function(el){
    var txt = el.textContent.trim();
    if(ICONS[txt]){
      el.innerHTML = ICONS[txt];
      el.style.cssText += ';display:flex;align-items:center;justify-content:center;';
    }
  });
  // award icons
  document.querySelectorAll('.award-icon').forEach(function(el){
    var txt = el.textContent.trim();
    if(ICONS[txt]){
      el.innerHTML = ICONS[txt];
      el.style.cssText += ';display:flex;align-items:center;justify-content:center;';
    }
  });
}

document.addEventListener('DOMContentLoaded', applyIcons);
})();
