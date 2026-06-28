
const CONFIG = {
  name: "Lorenzo Celoria - 16",
  role: "Programmer",
  location: "Italia -> Desana (VC)",
  tagline: "Che magia quel quadratino di cartone, vero?",
  available: true, // true = "online, disponibile" / false = "occupato"

  bio: [
    'Sono uno sviluppatore software con la passione di creare nuovi siti <span class="tok-string">puliti</span>, <span class="tok-string">performanti</span> e che siano coinvolgenti fino alla fine.',
    'Mi piace lavorare <span class="tok-keyword">full-stack</span>: dal database alla UI, passando per API e architettura.',
    'Quando non scrivo codice, probabilmente sto leggendo documentazione, sperimentando un nuovo framework o bevendo troppo caffè. ☕',
    'Credo nel codice leggibile, nei commit ben scritti e nel non fare mai il <span class="tok-keyword">deploy</span> di venerdì alle 18:00.'
  ],

  skills: [
    {
      category: "Linguaggi",
      items: [
        { name: "Html - JavaScript - Css", level: 70 },
        { name: "C - C++", level: 80 },
        { name: "Python", level: 10 },
      ]
    },
    {
      category: "Strumenti",
      items: [
        { name: "Git & GitHub", level: 92 },
        { name: "VScode", level: 70 },
        { name: "Linux", level: 22 },
      ]
    }
  ],

  projects: [
    {
      name: "Robotica",
      description: "Sito web fatto interamente da me per la visualizzazione del nostro gruppo di robotica (2026): un robottino seguilinea per completare diverse domande e arrivare fino alla fine.",
      tech: ["React", "Node.js", "MongoDB", "Socket.io"],
      demo: "https://lorenzoceloria09-arch.github.io/Cappello-di-Robot/",
      code: "https://github.com/lorenzoceloria09-arch/Cappello-di-Robot"
    },
    {
      name: "weather-cli.py",
      description: "Tool da terminale per consultare le previsioni meteo di qualsiasi città, con cache locale e output colorato.",
      tech: ["Python", "Click", "REST API"],
      demo: "#",
      code: "#"
    },
    {
      name: "devfolio-generator",
      description: "Generatore di portfolio statici per sviluppatori a partire da un semplice file di configurazione JSON.",
      tech: ["JavaScript", "Vite", "HTML/CSS"],
      demo: "#",
      code: "#"
    }
  ],

  socials: {
    email: "lorenzo.celoria.09@gmail.com",
    github: "https://github.com/lorenzoceloria09-arch",
    linkedin: "https://linkedin.com/in/tuo-username",
    instagram: "https://instagram.com/lorenzo.celoria.09"
  }
};

/* =========================================================================
   UTILI
   ========================================================================= */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* =========================================================================
   HERO — typewriter + output
   ========================================================================= */
function renderHero() {
  const heroCommand = $('#heroCommand');
  const heroOutput = $('#heroOutput');

  const statusLabel = CONFIG.available ? 'online — disponibile per nuovi progetti' : 'occupato al momento';

  const outputHTML = `
    <div class="line" style="animation-delay:.05s">
      <p class="hero__name">${CONFIG.name}</p>
    </div>
    <div class="line" style="animation-delay:.15s">
      <p class="hero__role">${CONFIG.role}</p>
    </div>
    <div class="line hero__meta" style="animation-delay:.25s">
      <span><span class="status-dot"></span>${statusLabel}</span>
      <span>📍 ${CONFIG.location}</span>
    </div>
    <div class="line" style="animation-delay:.35s">
      <p class="hero__tagline">${CONFIG.tagline}</p>
    </div>
    <div class="line hero__actions" style="animation-delay:.45s">
      <a href="#about" class="btn btn--primary">About me →</a>
      <a href="#contact" class="btn btn--ghost">Social →</a>
    </div>
  `;

  if (prefersReducedMotion) {
    heroCommand.textContent = 'whoami';
    heroOutput.innerHTML = outputHTML;
    return;
  }

  const text = 'Who Am I';
  let i = 0;
  const typeSpeed = 90;

  function typeChar() {
    if (i < text.length) {
      heroCommand.textContent += text[i];
      i++;
      setTimeout(typeChar, typeSpeed);
    } else {
      setTimeout(() => { heroOutput.innerHTML = outputHTML; }, 350);
    }
  }
  typeChar();
}

/* =========================================================================
   ABOUT — code block con numeri di riga
   ========================================================================= */
function renderAbout() {
  const block = $('#aboutBlock');
  block.innerHTML = CONFIG.bio
    .map(line => `<div class="code-line">${line}</div>`)
    .join('');
}

/* =========================================================================
   SKILLS — card con barre di livello
   ========================================================================= */
function renderSkills() {
  const grid = $('#skillsGrid');
  grid.innerHTML = CONFIG.skills.map(group => `
    <div class="skill-card">
      <p class="skill-card__title">"${group.category}": [</p>
      ${group.items.map(item => `
        <div class="skill-row">
          <div class="skill-row__top">
            <span>${item.name}</span>
            <span>${item.level}%</span>
          </div>
          <div class="skill-bar">
            <div class="skill-bar__fill" data-level="${item.level}"></div>
          </div>
        </div>
      `).join('')}
    </div>
  `).join('');

  // Anima le barre quando entrano in viewport
  const fills = $$('.skill-bar__fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.level + '%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  fills.forEach(f => observer.observe(f));
}

/* =========================================================================
   PROJECTS
   ========================================================================= */
function renderProjects() {
  const grid = $('#projectsGrid');
  grid.innerHTML = CONFIG.projects.map(p => `
    <article class="project-card">
      <h3 class="project-card__name">${p.name}</h3>
      <p class="project-card__desc">${p.description}</p>
      <div class="project-card__tech">
        ${p.tech.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
      <div class="project-card__links">
        <a href="${p.demo}" target="_blank" rel="noopener">Demo ↗</a>
        <a href="${p.code}" target="_blank" rel="noopener">Codice ↗</a>
      </div>
    </article>
  `).join('');
}

/* =========================================================================
   CONTACT — script "bash" statico
   ========================================================================= */
function renderContactScript() {
  const pre = $('#contactScript');
  pre.innerHTML =
`<span class="tok-comment">#!/bin/bash</span>
<span class="tok-comment"># contact.sh — i modi più rapidi per contattarmi</span>

<span class="tok-fn">echo</span> <span class="tok-string">"📧 Email:    ${CONFIG.socials.email}"</span>
<span class="tok-fn">echo</span> <span class="tok-string">"💼 LinkedIn: ${CONFIG.socials.linkedin.replace('https://','')}"</span>
<span class="tok-fn">echo</span> <span class="tok-string">"🐙 GitHub:   ${CONFIG.socials.github.replace('https://','')}"</span>

<span class="tok-fn">echo</span> <span class="tok-string">"Contattami per nuovi progeti!✅"</span>`;
}

/* =========================================================================
   TERMINALE INTERATTIVO
   ========================================================================= */
function setupTerminal() {
  const body = $('#terminalBody');
  const input = $('#terminalInput');
  const history = [];
  let historyIndex = -1;

  const files = ['about-me', 'skills', 'projects', 'contact'];

  function print(html) {
    const p = document.createElement('p');
    p.innerHTML = html;
    body.appendChild(p);
    body.scrollTop = body.scrollHeight;
  }

  function printCommand(cmd) {
    print(`<span class="out-cmd">visitatore@portfolio:~$ ${escapeHTML(cmd)}</span>`);
  }

  function escapeHTML(str) {
    return str.replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
  }

  const commands = {
    help: () => `Comandi disponibili: <strong>whoami</strong>, <strong>about</strong>, <strong>skills</strong>, <strong>projects</strong>, <strong>contact</strong>, <strong>ls</strong>, <strong>cat &lt;file&gt;</strong>, <strong>date</strong>, <strong>echo &lt;testo&gt;</strong>, <strong>clear</strong>.`,
    whoami: () => `visitatore (cioè tu). Se invece vuoi sapere chi sono io, prova <strong>about</strong>.`,
    about: () => CONFIG.bio.map(l => l.replace(/<[^>]+>/g, '')).join('<br>'),
    skills: () => CONFIG.skills.map(g => `<strong>${g.category}:</strong> ${g.items.map(i => i.name).join(', ')}`).join('<br>'),
    projects: () => CONFIG.projects.map(p => `<strong>${p.name}</strong> — ${p.description}`).join('<br>'),
    contact: () => `📧 ${CONFIG.socials.email} · 💼 ${CONFIG.socials.linkedin} · 🐙 ${CONFIG.socials.github}`,
    social: () => commands.contact(),
    ls: () => files.join('&nbsp;&nbsp;&nbsp;'),
    date: () => new Date().toLocaleString('it-IT'),
    clear: () => { body.innerHTML = ''; return null; },
  };

  function run(raw) {
    const cmd = raw.trim();
    if (!cmd) return;

    history.push(cmd);
    historyIndex = history.length;
    printCommand(cmd);

    const [name, ...rest] = cmd.split(' ');
    const arg = rest.join(' ');
    const key = name.toLowerCase();

    if (key === 'sudo') {
      print(`<span class="out-err">Bel tentativo. Permesso negato: anche da root, qui non c'è niente da elevare. 😄</span>`);
      return;
    }

    if (key === 'echo') {
      print(escapeHTML(arg) || '');
      return;
    }

    if (key === 'cat') {
      const file = arg.trim();
      const fileToSection = {
        'about-me.js': 'about',
        'skills.json': 'skills',
        'projects.md': 'projects',
        'contact.sh': 'contact'
      };
      if (files.includes(file)) {
        const sectionId = fileToSection[file];
        document.getElementById(sectionId)?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        print(`Apro <strong>${file}</strong>… <span class="out-muted">scorri la pagina per leggerlo.</span>`);
      } else {
        print(`<span class="out-err">cat: ${escapeHTML(file)}: file non trovato</span>`);
      }
      return;
    }

    if (commands[key]) {
      const result = commands[key]();
      if (result !== null && result !== undefined) print(result);
      return;
    }

    print(`<span class="out-err">comando non trovato: ${escapeHTML(key)}</span> — digita <strong>help</strong> per la lista dei comandi.`);
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      run(input.value);
      input.value = '';
    } else if (e.key === 'ArrowUp') {
      if (historyIndex > 0) { historyIndex--; input.value = history[historyIndex] || ''; }
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      if (historyIndex < history.length) { historyIndex++; input.value = history[historyIndex] || ''; }
      e.preventDefault();
    }
  });

  // Focus rapido sul terminale cliccando ovunque nel suo corpo
  $('#terminal').addEventListener('click', () => input.focus());
}

/* =========================================================================
   NAV — tab attivo + menu mobile
   ========================================================================= */
function setupNav() {
  const tabs = $$('.tab');
  const sections = $$('.section');
  const tabsContainer = $('#tabs');
  const menuToggle = $('#menuToggle');

  menuToggle.addEventListener('click', () => {
    const isOpen = tabsContainer.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabsContainer.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        tabs.forEach(t => t.classList.toggle('is-active', t.dataset.tab === id));
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px' });

  sections.forEach(s => observer.observe(s));
}

/* =========================================================================
   STATUS BAR — orologio live
   ========================================================================= */
function setupClock() {
  const clock = $('#clock');
  function tick() {
    clock.textContent = new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }
  tick();
  setInterval(tick, 1000);
}

/* =========================================================================
   MATRIX RAIN — sfondo decorativo della hero
   ========================================================================= */
function setupMatrixRain() {
  if (prefersReducedMotion) return;

  const canvas = $('#matrix-canvas');
  const ctx = canvas.getContext('2d');
  const chars = '01{}<>;=/#+-*'.split('');
  let columns, drops, width, height;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    columns = Math.floor(width / 18);
    drops = Array.from({ length: columns }, () => Math.random() * -50);
  }

  function draw() {
    ctx.fillStyle = 'rgba(11, 14, 20, 0.18)';
    ctx.fillRect(0, 0, width, height);
    ctx.font = '14px monospace';

    for (let i = 0; i < columns; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillStyle = Math.random() > 0.95 ? '#ff6ac1' : '#5ccfe6';
      ctx.fillText(text, i * 18, drops[i] * 18);

      if (drops[i] * 18 > height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 60);
}

function renderFooterSocials() {
  const container = document.querySelector('#socialIcons');
  if (!container) return;

  const icons = {
    github: `<svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>`,
    instagram: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.5" y1="6.5" y2="6.5"></line></svg>`
  };

  const links = [
    { href: CONFIG.socials.github, label: 'Profilo GitHub', icon: icons.github },
    { href: CONFIG.socials.instagram, label: 'Profilo Instagram', icon: icons.instagram }
  ];

  container.innerHTML = links.map(l => `
    <a href="${l.href}" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="${l.label}" title="${l.label}">
      ${l.icon}
    </a>
  `).join('');
}

/* =========================================================================
   INIT
   ========================================================================= */
document.addEventListener('DOMContentLoaded', () => {
  renderHero();
  renderAbout();
  renderSkills();
  renderProjects();
  renderContactScript();
  setupTerminal();
  setupNav();
  setupClock();
  setupMatrixRain();
  renderFooterSocials();
});
