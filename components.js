(() => {
  const fallbackHeader = `
    <header class="site-header"><div class="header-inner">
      <a class="brand" href="./"><img class="brand-logo" src="assets/app_icon_512.png" alt="12Budget">12Budget</a>
      <nav class="site-nav" aria-label="Main navigation">
        <a href="./" data-page="home" data-i18n="home">Home</a>
        <a href="delete-account.html" data-page="deletion" data-i18n="deletion">Delete account</a>
        <a href="contact.html" data-page="contact" data-i18n="contact">Contact</a>
      </nav>
      <div class="controls"><select id="language-select" class="control" data-language aria-label="Language"><option value="en">EN</option><option value="ru">RU</option></select><button id="theme-toggle" class="control" data-theme-toggle type="button" aria-label="Use dark theme">◐</button></div>
    </div></header>`;
  const fallbackFooter = `
    <footer data-shared-footer><div class="footer-row">
      <span>© 2026 12Budget</span>
      <span><a href="contact.html" data-i18n="contact">Contact</a> · <a href="delete-account.html" data-i18n="deletion">Delete account</a></span>
    </div></footer>`;
  const mount = (selector, file) => {
    const target = document.querySelector(selector);
    if (!target) return;
    const request = new XMLHttpRequest();
    request.open('GET', file, false);
    request.send();
    if (request.status < 200 || request.status >= 300) throw new Error(`Could not load ${file}`);
    target.outerHTML = request.responseText;
  };
  try {
    mount('[data-site-header]', 'header.html');
    mount('[data-site-footer]', 'footer.html');
    document.querySelector(`[data-page="${document.body.dataset.page}"]`)?.setAttribute('aria-current', 'page');
    document.dispatchEvent(new Event('site-components-ready'));
  } catch (error) {
    const target = document.querySelector('[data-site-header]');
    if (target) target.outerHTML = fallbackHeader;
    const footerTarget = document.querySelector('[data-site-footer]');
    if (footerTarget) footerTarget.outerHTML = fallbackFooter;
    document.querySelector(`[data-page="${document.body.dataset.page}"]`)?.setAttribute('aria-current', 'page');
    document.dispatchEvent(new Event('site-components-ready'));
    console.error(error);
  }
})();
