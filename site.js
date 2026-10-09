(function () {
  var NUMERO = '5519992365415';
  var campanha = '';
  try { campanha = new URLSearchParams(location.search).get('utm_campaign') || ''; } catch (e) {}

  function track(nome, dados) {
    try { if (typeof window.fbq === 'function') window.fbq('trackCustom', nome, dados || {}); } catch (e) {}
  }

  // Links de WhatsApp: <a data-wa="mensagem" data-evento="nome">
  document.querySelectorAll('[data-wa]').forEach(function (a) {
    var msg = a.getAttribute('data-wa') || 'Olá! Vim pelo site da Prismma.';
    if (campanha) msg += '\nCampanha: ' + campanha;
    a.href = 'https://wa.me/' + NUMERO + '?text=' + encodeURIComponent(msg);
    a.target = '_blank';
    a.rel = 'noopener';
    a.addEventListener('click', function () { track(a.getAttribute('data-evento') || 'clique_whatsapp', {}); });
  });

  // Menu suspenso
  var grupos = document.querySelectorAll('.grupo');
  function fechar(exceto) {
    grupos.forEach(function (g) {
      if (g === exceto) return;
      var b = g.querySelector('button'), m = g.querySelector('.submenu');
      if (b && m) { b.setAttribute('aria-expanded', 'false'); m.hidden = true; }
    });
  }
  grupos.forEach(function (g) {
    var b = g.querySelector('button'), m = g.querySelector('.submenu');
    if (!b || !m) return;
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      var abrir = b.getAttribute('aria-expanded') !== 'true';
      fechar(g);
      b.setAttribute('aria-expanded', abrir ? 'true' : 'false');
      m.hidden = !abrir;
    });
    g.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { b.setAttribute('aria-expanded', 'false'); m.hidden = true; b.focus(); }
    });
  });
  document.addEventListener('click', function (e) { if (!e.target.closest('.grupo')) fechar(null); });

  // Menu do celular
  var menuBtn = document.querySelector('.menu-btn'), nav = document.querySelector('.nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var aberto = nav.classList.toggle('aberta');
      menuBtn.setAttribute('aria-expanded', aberto ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('aberta'); menuBtn.setAttribute('aria-expanded', 'false'); });
    });
  }
})();
(function () {
  var f = document.querySelector('.flutua'), alvo = document.querySelector('.hero .btn-acao, .p-topo .btn, .doc-topo');
  if (!f || !alvo || !('IntersectionObserver' in window)) return;
  f.classList.add('oculta');
  new IntersectionObserver(function (e) { f.classList.toggle('oculta', e[0].isIntersecting); }).observe(alvo);
})();
