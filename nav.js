// Navigation configuration - single source of truth
// Order is consistent across all pages
const navItems = [
  { href: 'index.html', icon: 'fas fa-home', text: 'Home', showOnHome: false },
  { href: 'podcasts.html', icon: 'fas fa-podcast', text: 'Podcasts', showOnHome: true },
  { href: 'library.html', icon: 'fas fa-book', text: 'Library', showOnHome: true },
  { href: 'https://www.linkedin.com/in/jordanbaucke', icon: 'fab fa-linkedin', text: 'LinkedIn', showOnHome: true },
  { href: 'https://github.com/jordanbaucke', icon: 'fab fa-github', text: 'GitHub', showOnHome: true },
  { href: 'mailto:jordan.baucke@gmail.com', icon: 'fas fa-envelope', text: 'Email', showOnHome: true },
  { href: 'https://t.me/jordanbaucke', icon: 'fab fa-telegram', text: 'Telegram', showOnHome: true }
];

function loadNavigation() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  // Determine if we're on the home page
  const path = window.location.pathname;
  const isHomePage = path.endsWith('index.html') || 
                    path.endsWith('/') ||
                    (path.split('/').pop() === '' && path.split('/').length <= 2);

  // Filter items based on page type and build navigation
  nav.innerHTML = navItems
    .filter(item => isHomePage ? item.showOnHome : true)
    .map(item => `<a href="${item.href}"><i class="${item.icon}"></i> ${item.text}</a>`)
    .join('');
}

// Load navigation when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadNavigation);
} else {
  loadNavigation();
}

// Popover functionality
function initPopover() {
  const popoverBtn = document.getElementById('aiboy-popover-btn');
  const popover = document.getElementById('aiboy-popover');
  const closeBtn = document.getElementById('aiboy-close-btn');

  if (!popoverBtn || !popover || !closeBtn) return;

  popoverBtn.addEventListener('click', () => {
    popover.classList.toggle('hidden');
  });

  closeBtn.addEventListener('click', () => {
    popover.classList.add('hidden');
  });

  // Close popover when clicking outside
  document.addEventListener('click', (e) => {
    if (!popover.contains(e.target) && !popoverBtn.contains(e.target)) {
      popover.classList.add('hidden');
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPopover);
} else {
  initPopover();
}
