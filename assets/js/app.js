/* ==========================================================================
   JobNest Demo — Shared behaviour
   Static demo only: no data is sent anywhere, nothing is stored on a server.
   All links are relative so the site works from any GitHub Pages subfolder.
   ========================================================================== */

(function () {
  'use strict';

  const D = window.JOBNEST_DATA;
  const page = document.body.dataset.page || '';

  /* ---------- helpers ---------- */

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function dateFromToday(days) {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  function param(name) {
    return new URLSearchParams(window.location.search).get(name) || '';
  }

  function initial(name) {
    return (name || 'C').trim().charAt(0).toUpperCase();
  }

  const locations = Array.from(new Set(D.jobs.map(j => j.location))).sort();

  /* ---------- toast ---------- */

  function toast(message, icon = 'fa-circle-info') {
    let stack = $('.toast-stack');
    if (!stack) {
      stack = document.createElement('div');
      stack.className = 'toast-stack';
      stack.setAttribute('role', 'status');
      stack.setAttribute('aria-live', 'polite');
      document.body.appendChild(stack);
    }
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = '<i class="fas ' + icon + '"></i><div>' + message + '</div>';
    stack.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity .3s'; }, 4200);
    setTimeout(() => t.remove(), 4600);
  }
  window.jobnestToast = toast;

  /* ---------- chrome: demo strip, header, footer ---------- */

  const NAV = [
    { href: 'index.html', label: 'Home', key: 'home' },
    { href: 'about.html', label: 'About Us', key: 'about' },
    { href: 'jobs.html', label: 'Find Jobs', key: 'jobs' },
    { href: 'company-dashboard.html', label: 'Company Dashboard', key: 'company' },
    { href: 'admin-dashboard.html', label: 'Admin', key: 'admin' }
  ];

  const DEMO_TEXT = '<i class="fas fa-flask"></i>Static demo version &mdash; sample data only. No real accounts, applications or payments are processed.';

  function renderChrome() {
    const top = document.createElement('div');
    top.className = 'site-top';

    if (document.body.dataset.chrome === 'minimal') {
      top.innerHTML = '<div class="demo-strip">' + DEMO_TEXT + '</div>';
      document.body.prepend(top);
      return;
    }

    const activeKey = page === 'details' ? 'jobs' : page;
    const navLinks = NAV.map(n =>
      '<a href="' + n.href + '"' + (n.key === activeKey ? ' class="active" aria-current="page"' : '') + '>' + n.label + '</a>'
    ).join('');

    top.innerHTML =
      '<div class="demo-strip">' + DEMO_TEXT + '</div>' +
      '<header class="global-header' + (document.body.dataset.header === 'solid' ? ' solid' : '') + '">' +
        '<a href="index.html" class="logo" aria-label="JobNest home"><span class="logo-icon">💼</span><span>JobNest</span></a>' +
        '<button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false"><i class="fas fa-bars"></i></button>' +
        '<nav class="main-nav" aria-label="Main">' + navLinks + '</nav>' +
        '<div class="auth">' +
          '<a href="login.html" class="pill-btn login">Login</a>' +
          '<a href="register.html" class="pill-btn signup">Sign Up</a>' +
        '</div>' +
      '</header>';
    document.body.prepend(top);

    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML =
      '<div class="footer-container">' +
        '<div class="footer-box"><h3>JobNest</h3><p>Find your dream job and connect with top companies in Sri Lanka.</p></div>' +
        '<div class="footer-box"><h3>Quick Links</h3>' +
          '<a href="index.html">Home</a><a href="about.html">About Us</a><a href="jobs.html">Find Jobs</a>' +
          '<a href="login.html">Login</a><a href="register.html">Sign Up</a></div>' +
        '<div class="footer-box"><h3>For Employers</h3>' +
          '<a href="company-dashboard.html">Company Dashboard</a><a href="login.html?role=company">Company Login</a>' +
          '<a href="register.html?role=company">Register a Company</a><a href="admin-dashboard.html">Admin Dashboard</a></div>' +
        '<div class="footer-box"><h3>Contact Us</h3><p>📧 support@jobportal.com</p><p>📞 +94 77 123 4567</p><p>📍 Colombo, Sri Lanka</p></div>' +
      '</div>' +
      '<div class="footer-bottom">© ' + new Date().getFullYear() + ' JobNest | Static demo with sample data &mdash; all companies and people shown are fictional.</div>';
    document.body.appendChild(footer);

    const header = $('.global-header');
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const toggle = $('.menu-toggle');
    toggle.addEventListener('click', () => {
      const open = header.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.innerHTML = open ? '<i class="fas fa-xmark"></i>' : '<i class="fas fa-bars"></i>';
    });
  }

  /* ---------- modals ---------- */

  function openModal(id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.classList.add('open');
    const first = m.querySelector('input, select, textarea, button:not(.modal-close)');
    if (first) setTimeout(() => first.focus(), 50);
  }
  function closeModal(m) { if (m) m.classList.remove('open'); }
  window.jobnestOpenModal = openModal;

  function initModals() {
    document.addEventListener('click', (e) => {
      const opener = e.target.closest('[data-open-modal]');
      if (opener) { e.preventDefault(); openModal(opener.dataset.openModal); return; }
      if (e.target.closest('.modal-close')) { closeModal(e.target.closest('.modal')); return; }
      if (e.target.classList && e.target.classList.contains('modal')) closeModal(e.target);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') $$('.modal.open').forEach(closeModal);
    });
  }

  /* ---------- generic demo forms & buttons ---------- */

  function initDemoForms() {
    $$('form[data-demo-form]').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        toast(form.dataset.demoForm, 'fa-flask');
        const modal = form.closest('.modal');
        form.reset();
        if (modal) closeModal(modal);
        if (form.dataset.redirect) setTimeout(() => { window.location.href = form.dataset.redirect; }, 1400);
      });
    });
    document.addEventListener('click', (e) => {
      const b = e.target.closest('[data-demo-click]');
      if (b) { e.preventDefault(); toast(b.dataset.demoClick, 'fa-flask'); }
    });
    $$('.toggle-pass').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = btn.parentElement.querySelector('input');
        const show = input.type === 'password';
        input.type = show ? 'text' : 'password';
        btn.innerHTML = show ? '<i class="fas fa-eye-slash"></i>' : '<i class="fas fa-eye"></i>';
        btn.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
      });
    });
  }

  /* ---------- counters & reveal ---------- */

  function initCounters() {
    const counters = $$('.stat-counter');
    if (!counters.length) return;
    const run = (el) => {
      const target = +el.dataset.target || 0;
      const suffix = el.dataset.suffix == null ? '+' : el.dataset.suffix;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min(1, (now - start) / 1600);
        el.textContent = Math.round(target * p).toLocaleString() + (p === 1 ? suffix : '');
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if (!('IntersectionObserver' in window)) { counters.forEach(run); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.4 });
    counters.forEach(c => io.observe(c));
  }

  function initReveal() {
    const els = $$('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('active')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('active'); io.unobserve(en.target); } });
    }, { threshold: 0.08 });
    els.forEach(el => io.observe(el));
  }

  /* ---------- job card ---------- */

  function jobCard(job) {
    return '' +
      '<article class="job-card" data-category="' + esc(job.category) + '">' +
        '<div class="job-card-top">' +
          '<div class="company-logo" aria-hidden="true">' + esc(initial(job.company)) + '</div>' +
          '<div><h3>' + esc(job.title) + '</h3><p class="company-name">' + esc(job.company) + '</p></div>' +
        '</div>' +
        '<div class="job-meta">' +
          '<span>📍 ' + esc(job.location) + '</span>' +
          '<span>🗂️ ' + esc(job.type) + '</span>' +
          '<span>💼 ' + esc(job.category) + '</span>' +
          '<span>👥 ' + esc(job.vacancies) + ' vacanc' + (job.vacancies === 1 ? 'y' : 'ies') + '</span>' +
          '<span>📅 Closes: ' + esc(dateFromToday(job.closesIn)) + '</span>' +
        '</div>' +
        '<div class="job-tags"><span class="tag">' + esc(job.category) + '</span><span class="salary-tag">Rs ' + esc(job.salary) + '</span></div>' +
        '<div class="btn-group">' +
          '<a href="job-details.html?id=' + job.id + '" class="details-btn">View Details</a>' +
          '<a href="job-details.html?id=' + job.id + '&apply=1" class="apply-btn">Apply Now</a>' +
        '</div>' +
      '</article>';
  }

  function optionList(items, selected) {
    return items.map(i => '<option value="' + esc(i) + '"' + (i === selected ? ' selected' : '') + '>' + esc(i) + '</option>').join('');
  }

  /* ---------- HOME ---------- */

  function initHome() {
    const slider = $('#cinematic-slider');
    if (slider) {
      const images = [
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1920&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1920&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1556761175-5973dc0f32d7?q=80&w=1920&auto=format&fit=crop'
      ];
      images.forEach((src, i) => {
        const s = document.createElement('div');
        s.className = 'hero-slide' + (i === 0 ? ' active' : '');
        s.style.backgroundImage = "url('" + src + "')";
        slider.appendChild(s);
      });
      const slides = $$('.hero-slide', slider);
      let cur = 0;
      setInterval(() => {
        slides[cur].classList.remove('active');
        cur = (cur + 1) % slides.length;
        slides[cur].classList.add('active');
      }, 8000);
    }

    $('#home-category').insertAdjacentHTML('beforeend', optionList(D.categories));
    $('#home-location').insertAdjacentHTML('beforeend', optionList(locations));

    $('#stat-jobs').dataset.target = D.stats.activeJobs;
    $('#stat-companies').dataset.target = D.stats.companies;
    $('#stat-candidates').dataset.target = D.stats.candidates;

    // Category slider → jobs page filtered by category
    const grid = $('#cat-grid');
    grid.innerHTML = '<a class="cat active" href="jobs.html">All Jobs</a>' +
      D.categories.map(c => '<a class="cat" href="jobs.html?category=' + encodeURIComponent(c) + '">' + esc(c) + '</a>').join('');
    const prev = $('#cat-prev'), next = $('#cat-next');
    const upd = () => {
      prev.disabled = grid.scrollLeft <= 0;
      next.disabled = grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 1;
    };
    prev.addEventListener('click', () => grid.scrollBy({ left: -280, behavior: 'smooth' }));
    next.addEventListener('click', () => grid.scrollBy({ left: 280, behavior: 'smooth' }));
    grid.addEventListener('scroll', upd, { passive: true });
    window.addEventListener('resize', upd);
    upd(); setTimeout(upd, 150);

    // Featured = most recently posted
    const featured = D.jobs.slice().sort((a, b) => a.postedAgo - b.postedAgo).slice(0, 6);
    $('#featured-list').innerHTML = featured.map(jobCard).join('');
  }

  /* ---------- JOB LISTINGS ---------- */

  function initJobs() {
    const q = $('#f-search'), cat = $('#f-category'), loc = $('#f-location'), type = $('#f-type');
    cat.insertAdjacentHTML('beforeend', optionList(D.categories, param('category')));
    loc.insertAdjacentHTML('beforeend', optionList(locations, param('location')));
    type.insertAdjacentHTML('beforeend', optionList(D.jobTypes, param('type')));
    q.value = param('search');

    const list = $('#job-results'), count = $('#result-count');

    function apply(pushState) {
      const terms = q.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
      const results = D.jobs.filter(j => {
        const hay = [j.title, j.company, j.category, j.type, j.location, j.skills.join(' ')].join(' ').toLowerCase();
        return (!terms.length || terms.some(t => hay.includes(t))) &&
          (!cat.value || j.category === cat.value) &&
          (!loc.value || j.location === loc.value) &&
          (!type.value || j.type === type.value);
      }).sort((a, b) => a.postedAgo - b.postedAgo);

      count.textContent = results.length + ' job' + (results.length === 1 ? '' : 's') + ' found';
      list.innerHTML = results.length ? results.map(jobCard).join('') :
        '<div class="empty-state"><i class="fas fa-magnifying-glass"></i><strong>No jobs match your filters.</strong>' +
        '<p>Try a different keyword or <a href="jobs.html" style="color:var(--primary);font-weight:700;">clear all filters</a>.</p></div>';

      if (pushState) {
        const p = new URLSearchParams();
        if (q.value.trim()) p.set('search', q.value.trim());
        if (cat.value) p.set('category', cat.value);
        if (loc.value) p.set('location', loc.value);
        if (type.value) p.set('type', type.value);
        const qs = p.toString();
        history.replaceState(null, '', qs ? '?' + qs : window.location.pathname);
      }
    }

    $('#filter-form').addEventListener('submit', (e) => { e.preventDefault(); apply(true); });
    [cat, loc, type].forEach(el => el.addEventListener('change', () => apply(true)));
    let timer;
    q.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(() => apply(true), 250); });
    $('#clear-filters').addEventListener('click', () => {
      q.value = ''; cat.value = ''; loc.value = ''; type.value = ''; apply(true);
    });
    apply(false);
  }

  /* ---------- JOB DETAILS ---------- */

  function initDetails() {
    const id = parseInt(param('id'), 10);
    const job = D.jobs.find(j => j.id === id);
    const root = $('#details-root');

    if (!job) {
      $('#banner-title').textContent = 'Job not found';
      $('#banner-sub').textContent = 'This job may have been removed, or the link is incorrect.';
      root.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><i class="fas fa-briefcase"></i>' +
        '<strong>We couldn\'t find that job.</strong><p style="margin:10px 0 18px">Browse all open positions instead.</p>' +
        '<a href="jobs.html" class="btn-primary">Browse Jobs</a></div>';
      return;
    }

    document.title = job.title + ' – ' + job.company + ' | JobNest Demo';
    $('#banner-crumb').innerHTML = '<a href="index.html">Home</a> / <a href="jobs.html">Jobs</a> / ' + esc(job.title);
    $('#banner-title').innerHTML =
      '<span class="detail-head"><span class="company-logo">' + esc(initial(job.company)) + '</span><span>' + esc(job.title) +
      '<span style="display:block;font-size:1.1rem;font-weight:600;color:#cbd5e1;margin-top:6px">' + esc(job.company) + '</span></span></span>';
    $('#banner-sub').remove();
    $('#banner-meta').innerHTML =
      '<span>📍 ' + esc(job.location) + '</span><span>🗂️ ' + esc(job.type) + '</span><span>💼 ' + esc(job.category) + '</span>' +
      '<span>💰 Rs ' + esc(job.salary) + '</span><span>🕒 Posted ' + (job.postedAgo === 1 ? '1 day' : job.postedAgo + ' days') + ' ago</span>';

    const li = arr => arr.map(x => '<li>' + esc(x) + '</li>').join('');
    root.innerHTML =
      '<div>' +
        '<div class="detail-card"><h2><i class="fas fa-file-lines"></i> Job Description</h2><p>' + esc(job.description) + '</p></div>' +
        '<div class="detail-card"><h2><i class="fas fa-list-check"></i> Responsibilities</h2><ul class="check-list">' + li(job.responsibilities) + '</ul></div>' +
        '<div class="detail-card"><h2><i class="fas fa-graduation-cap"></i> Requirements</h2><ul class="check-list">' + li(job.requirements) + '</ul></div>' +
        '<div class="detail-card"><h2><i class="fas fa-screwdriver-wrench"></i> Key Skills</h2><div class="skill-chips">' +
          job.skills.map(s => '<span class="tag">' + esc(s) + '</span>').join('') + '</div></div>' +
      '</div>' +
      '<aside class="sticky-side">' +
        '<div class="detail-card"><h2><i class="fas fa-circle-info"></i> Job Summary</h2><ul class="summary-list">' +
          '<li><span><i class="fas fa-building"></i>Company</span><span>' + esc(job.company) + '</span></li>' +
          '<li><span><i class="fas fa-location-dot"></i>Location</span><span>' + esc(job.location) + '</span></li>' +
          '<li><span><i class="fas fa-clock"></i>Job Type</span><span>' + esc(job.type) + '</span></li>' +
          '<li><span><i class="fas fa-money-bill-wave"></i>Salary</span><span>Rs ' + esc(job.salary) + '</span></li>' +
          '<li><span><i class="fas fa-briefcase"></i>Experience</span><span>' + esc(job.experience) + '</span></li>' +
          '<li><span><i class="fas fa-users"></i>Vacancies</span><span>' + esc(job.vacancies) + '</span></li>' +
          '<li><span><i class="fas fa-calendar-day"></i>Deadline</span><span>' + esc(dateFromToday(job.closesIn)) + '</span></li>' +
        '</ul>' +
        '<div style="display:flex;flex-direction:column;gap:10px;margin-top:20px">' +
          '<button class="btn-primary" type="button" data-open-modal="apply-modal"><i class="fas fa-paper-plane"></i> Apply Now</button>' +
          '<button class="btn-action btn-ghost" type="button" style="justify-content:center" data-demo-click="Demo only: saved jobs are not stored in this static version."><i class="far fa-bookmark"></i> Save Job</button>' +
          '<a href="jobs.html" class="btn-action btn-ghost" style="justify-content:center"><i class="fas fa-arrow-left"></i> Back to Jobs</a>' +
        '</div></div>' +
      '</aside>';

    $('#apply-job-title').textContent = job.title + ' at ' + job.company;

    const similar = D.jobs.filter(j => j.id !== job.id && (j.category === job.category || j.company === job.company)).slice(0, 3);
    const fallback = D.jobs.filter(j => j.id !== job.id && !similar.includes(j)).slice(0, 3 - similar.length);
    $('#similar-list').innerHTML = similar.concat(fallback).map(jobCard).join('');

    // Demo "smart matching" preview on apply
    $('#apply-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const picked = $$('#apply-skills input:checked').length;
      const score = Math.round(40 + (picked / job.skills.length) * 55);
      $('#apply-form').reset();
      $('#apply-modal').classList.remove('open');
      toast('<strong>Demo application recorded on this page only.</strong><br>Nothing was sent to ' + esc(job.company) +
        '. Sample match score: <strong>' + score + '%</strong>.', 'fa-flask');
    });
    $('#apply-skills').innerHTML = job.skills.map(s =>
      '<label style="display:inline-flex;align-items:center;gap:6px;margin:0 12px 8px 0;font-weight:500"><input type="checkbox" style="width:auto"> ' + esc(s) + '</label>'
    ).join('');

    if (param('apply') === '1') openModal('apply-modal');
  }

  /* ---------- LOGIN / REGISTER role tabs ---------- */

  function initRoleTabs() {
    const tabs = $$('.role-tabs button');
    if (!tabs.length) return;
    const form = $('#auth-form');
    function select(role) {
      const btn = tabs.find(t => t.dataset.role === role) || tabs[0];
      tabs.forEach(t => { t.classList.toggle('active', t === btn); t.setAttribute('aria-selected', String(t === btn)); });
      const r = btn.dataset.role;
      $$('[data-role-only]').forEach(el => { el.hidden = !el.dataset.roleOnly.split(' ').includes(r); });
      $$('[data-role-text]').forEach(el => {
        const map = JSON.parse(el.dataset.roleText);
        if (map[r]) el.textContent = map[r];
      });
      form.dataset.role = r;
    }
    tabs.forEach(t => t.addEventListener('click', () => select(t.dataset.role)));
    select(param('role') || tabs[0].dataset.role);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const r = form.dataset.role;
      const dest = { seeker: 'jobs.html', company: 'company-dashboard.html', admin: 'admin-dashboard.html' };
      if (page === 'login') {
        toast('Demo sign-in &mdash; no password was checked or stored. Opening the ' +
          (r === 'seeker' ? 'job listings' : r + ' dashboard') + '…', 'fa-flask');
        setTimeout(() => { window.location.href = dest[r]; }, 1300);
      } else {
        toast('Demo registration &mdash; no account was created and nothing was saved. Taking you to the login page…', 'fa-flask');
        setTimeout(() => { window.location.href = 'login.html?role=' + r; }, 1600);
      }
    });
  }

  /* ---------- COMPANY DASHBOARD ---------- */

  function statusPill(s) { return '<span class="status-pill st-' + s.toLowerCase() + '">' + esc(s) + '</span>'; }

  function initCompany() {
    const company = 'Lanka TechWorks (Pvt) Ltd';
    $('#plan-valid').textContent = dateFromToday(214);
    const myJobs = D.jobs.filter(j => j.company === company);
    const apps = D.applications.map(a => Object.assign({}, a));

    function renderApps() {
      $('#apps-body').innerHTML = apps.map((a, i) =>
        '<tr><td>' + esc(a.name) + '</td><td>' + esc(a.job) + '</td>' +
        '<td><span class="score">' + a.score + '%</span><span class="score-bar"><span style="width:' + a.score + '%"></span></span></td>' +
        '<td>' + a.skills + '%</td><td>' + statusPill(a.status) + '</td>' +
        '<td><select class="status-select" data-i="' + i + '" aria-label="Change status for ' + esc(a.name) + '">' +
          ['Pending', 'Shortlisted', 'Selected', 'Rejected'].map(s => '<option' + (s === a.status ? ' selected' : '') + '>' + s + '</option>').join('') +
        '</select></td></tr>'
      ).join('');
      const c = { total: apps.length, Selected: 0, Pending: 0, Shortlisted: 0 };
      apps.forEach(a => { if (c[a.status] != null) c[a.status]++; });
      $('#c-apps').textContent = c.total;
      $('#c-selected').textContent = c.Selected;
      $('#c-pending').textContent = c.Pending + c.Shortlisted;
    }

    function renderJobs() {
      $('#c-jobs').textContent = myJobs.length;
      $('#c-jobs-limit').textContent = myJobs.length + ' / 20';
      $('#jobs-body').innerHTML = myJobs.map(j =>
        '<tr><td><a href="job-details.html?id=' + j.id + '" style="color:var(--primary);font-weight:600">' + esc(j.title) + '</a></td>' +
        '<td>' + esc(j.type) + '</td><td>' + esc(j.location) + '</td><td>' + esc(dateFromToday(j.closesIn)) + '</td>' +
        '<td>' + statusPill(j.demoNew ? 'Pending' : 'Active') + '</td></tr>'
      ).join('');
    }

    $('#apps-body').addEventListener('change', (e) => {
      const sel = e.target.closest('.status-select');
      if (!sel) return;
      apps[+sel.dataset.i].status = sel.value;
      renderApps();
      toast('Status changed to <strong>' + esc(sel.value) + '</strong> (demo &mdash; no email was sent to the applicant).', 'fa-flask');
    });

    $('#post-job-cat').insertAdjacentHTML('beforeend', optionList(D.categories));
    $('#post-job-type').insertAdjacentHTML('beforeend', optionList(D.jobTypes));
    $('#post-job-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const f = e.target;
      myJobs.unshift({
        id: 0, title: f.title.value.trim() || 'Untitled role', type: f.type.value || 'Full Time',
        location: f.location.value.trim() || 'Colombo', closesIn: 30, demoNew: true
      });
      renderJobs();
      f.reset();
      $('#post-job-modal').classList.remove('open');
      toast('Job added to this page only (demo). It is not published and will disappear when you reload.', 'fa-flask');
    });

    renderApps();
    renderJobs();
  }

  /* ---------- ADMIN DASHBOARD ---------- */

  function initAdmin() {
    const users = D.users.map(u => Object.assign({}, u));
    const companies = D.companies.map(c => Object.assign({}, c));
    const payments = D.payments.map(p => Object.assign({}, p));

    const totalVacancies = D.jobs.reduce((s, j) => s + j.vacancies, 0);
    const revenue = () => payments.filter(p => p.status === 'Verified').reduce((s, p) => s + p.amount, 0);

    function setStats() {
      $('#a-users').dataset.target = users.length;
      $('#a-companies').dataset.target = companies.length;
      $('#a-jobs').dataset.target = D.jobs.length;
      $('#a-vacancies').dataset.target = totalVacancies;
      $('#a-apps').dataset.target = D.applications.length + users.reduce((s, u) => s + u.apps, 0);
      $('#a-revenue').dataset.target = revenue();
      $('#a-verified').textContent = payments.filter(p => p.status === 'Verified').length + ' Verified';
    }

    function renderUsers(filter = '') {
      const f = filter.toLowerCase();
      $('#users-body').innerHTML = users.filter(u => !f || (u.name + u.email + u.location).toLowerCase().includes(f)).map(u =>
        '<tr><td>' + esc(u.name) + '</td><td>' + esc(u.email) + '</td><td>' + esc(u.location) + '</td><td>' + u.apps + '</td>' +
        '<td>' + esc(dateFromToday(-u.joined)) + '</td><td>' + statusPill(u.status) + '</td></tr>'
      ).join('') || '<tr><td colspan="6" style="text-align:center">No users match.</td></tr>';
    }

    function renderCompanies() {
      $('#companies-body').innerHTML = companies.map((c, i) =>
        '<tr><td>' + esc(c.name) + '</td><td>' + esc(c.industry) + '</td><td>' + esc(c.email) + '</td><td>' + c.jobs + '</td>' +
        '<td>' + esc(c.plan) + '</td><td>' + statusPill(c.status) + '</td><td>' +
        (c.status === 'Pending'
          ? '<button class="btn-action btn-success btn-sm" data-approve="' + i + '"><i class="fas fa-check"></i> Approve</button>'
          : '<span style="color:var(--text-tertiary)">—</span>') +
        '</td></tr>'
      ).join('');
    }

    function renderJobsTable(filter = '') {
      const f = filter.toLowerCase();
      $('#admin-jobs-body').innerHTML = D.jobs.filter(j => !f || (j.title + j.company + j.category + j.location).toLowerCase().includes(f)).map(j =>
        '<tr><td><a href="job-details.html?id=' + j.id + '" style="color:var(--primary);font-weight:600">' + esc(j.title) + '</a></td>' +
        '<td>' + esc(j.company) + '</td><td>' + esc(j.category) + '</td><td>' + esc(j.location) + '</td><td>' + j.vacancies + '</td>' +
        '<td>' + esc(dateFromToday(j.closesIn)) + '</td></tr>'
      ).join('') || '<tr><td colspan="6" style="text-align:center">No jobs match.</td></tr>';
    }

    function renderPayments() {
      $('#payments-body').innerHTML = payments.map((p, i) =>
        '<tr><td>' + esc(p.ref) + '</td><td>' + esc(p.company) + '</td><td>' + esc(p.plan) + '</td>' +
        '<td>Rs. ' + p.amount.toLocaleString() + '</td><td>' + esc(p.method) + '</td><td>' + esc(dateFromToday(-p.daysAgo)) + '</td>' +
        '<td>' + statusPill(p.status) + '</td><td>' +
        (p.status === 'Pending'
          ? '<button class="btn-action btn-success btn-sm" data-pay="' + i + '" data-to="Verified">Verify</button> ' +
            '<button class="btn-action btn-danger btn-sm" data-pay="' + i + '" data-to="Rejected">Reject</button>'
          : '<span style="color:var(--text-tertiary)">—</span>') +
        '</td></tr>'
      ).join('');
    }

    function renderReports() {
      const byCat = {};
      D.jobs.forEach(j => {
        byCat[j.category] = byCat[j.category] || { jobs: 0, vacancies: 0 };
        byCat[j.category].jobs++;
        byCat[j.category].vacancies += j.vacancies;
      });
      $('#reports-body').innerHTML = Object.keys(byCat).sort((a, b) => byCat[b].vacancies - byCat[a].vacancies).map(c =>
        '<tr><td>' + esc(c) + '</td><td>' + byCat[c].jobs + '</td><td>' + byCat[c].vacancies + '</td></tr>'
      ).join('');
      const plans = {};
      payments.filter(p => p.status === 'Verified').forEach(p => { plans[p.plan] = (plans[p.plan] || 0) + p.amount; });
      $('#revenue-body').innerHTML = Object.keys(plans).map(pl =>
        '<tr><td>' + esc(pl) + '</td><td>Rs. ' + plans[pl].toLocaleString() + '</td></tr>'
      ).join('') + '<tr><td><strong>Total</strong></td><td><strong>Rs. ' + revenue().toLocaleString() + '</strong></td></tr>';
    }

    document.addEventListener('click', (e) => {
      const ap = e.target.closest('[data-approve]');
      if (ap) {
        const c = companies[+ap.dataset.approve];
        c.status = 'Approved';
        renderCompanies();
        toast(esc(c.name) + ' approved (demo &mdash; nothing was saved).', 'fa-flask');
      }
      const pb = e.target.closest('[data-pay]');
      if (pb) {
        const p = payments[+pb.dataset.pay];
        p.status = pb.dataset.to;
        renderPayments(); renderReports();
        $('#a-revenue').dataset.target = revenue();
        $('#a-revenue').textContent = revenue().toLocaleString();
        $('#a-verified').textContent = payments.filter(x => x.status === 'Verified').length + ' Verified';
        toast('Payment ' + esc(p.ref) + ' marked <strong>' + esc(p.status) + '</strong> (demo &mdash; no real payment exists).', 'fa-flask');
      }
    });

    $('#user-search').addEventListener('input', (e) => renderUsers(e.target.value));
    $('#job-search').addEventListener('input', (e) => renderJobsTable(e.target.value));

    // Sidebar / quick-action tab switching
    const panels = $$('.admin-panel');
    const navBtns = $$('[data-panel]');
    function show(name) {
      if (!document.getElementById('panel-' + name)) name = 'dashboard';
      panels.forEach(p => p.classList.toggle('active', p.id === 'panel-' + name));
      $$('.side-nav [data-panel]').forEach(b => b.classList.toggle('active', b.dataset.panel === name));
      if (window.location.hash !== '#' + name) history.replaceState(null, '', '#' + name);
      window.scrollTo({ top: 0 });
    }
    navBtns.forEach(b => b.addEventListener('click', () => show(b.dataset.panel)));

    setStats();
    renderUsers(); renderCompanies(); renderJobsTable(); renderPayments(); renderReports();
    show((window.location.hash || '#dashboard').slice(1));
  }

  /* ---------- boot ---------- */

  document.addEventListener('DOMContentLoaded', () => {
    renderChrome();
    initModals();
    initDemoForms();
    if (page === 'home') initHome();
    if (page === 'jobs') initJobs();
    if (page === 'details') initDetails();
    if (page === 'login' || page === 'register') initRoleTabs();
    if (page === 'company') initCompany();
    if (page === 'admin') initAdmin();
    initCounters();
    initReveal();
  });
})();
