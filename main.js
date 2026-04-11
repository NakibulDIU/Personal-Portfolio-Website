/* ═══════════════════════════════════════
   NAKIBUL ISLAM — PORTFOLIO JS
   Three.js background + interactions
═══════════════════════════════════════ */

/* ─── Three.js Background ─── */
(function initThree() {
  const canvas = document.getElementById('bg-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
  camera.position.z = 30;

  // ── Particle Field ──
  const particleCount = 1800;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);

  const palettes = [
    new THREE.Color(0x00e5c8), // teal
    new THREE.Color(0xf5a623), // amber
    new THREE.Color(0x7c4dff), // violet
    new THREE.Color(0x3b82f6), // blue
  ];

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 100;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 80;

    const col = palettes[Math.floor(Math.random() * palettes.length)];
    colors[i * 3]     = col.r;
    colors[i * 3 + 1] = col.g;
    colors[i * 3 + 2] = col.b;

    sizes[i] = Math.random() * 1.5 + 0.2;
  }

  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particleMat = new THREE.PointsMaterial({
    size: 0.18,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true,
  });

  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // ── Floating Geometric Meshes ──
  const geometries = [
    new THREE.IcosahedronGeometry(1.2, 1),
    new THREE.OctahedronGeometry(1),
    new THREE.TetrahedronGeometry(1.1),
    new THREE.IcosahedronGeometry(0.8, 0),
    new THREE.OctahedronGeometry(1.3),
  ];

  const meshes = geometries.map((geo, i) => {
    const mat = new THREE.MeshBasicMaterial({
      color: [0x00e5c8, 0xf5a623, 0x7c4dff, 0x3b82f6, 0x00e5c8][i],
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(
      (Math.random() - 0.5) * 40,
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 20 - 10
    );
    mesh.userData.rotSpeed = {
      x: (Math.random() - 0.5) * 0.008,
      y: (Math.random() - 0.5) * 0.012,
    };
    mesh.userData.floatSpeed = Math.random() * 0.003 + 0.001;
    mesh.userData.floatOffset = Math.random() * Math.PI * 2;
    scene.add(mesh);
    return mesh;
  });

  // ── Mouse Parallax ──
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // ── Clock ──
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Smooth mouse
    targetX += (mouseX - targetX) * 0.04;
    targetY += (mouseY - targetY) * 0.04;

    // Rotate particles slowly
    particles.rotation.x = t * 0.015 + targetY * 0.08;
    particles.rotation.y = t * 0.02  + targetX * 0.1;

    // Float and rotate meshes
    meshes.forEach(mesh => {
      mesh.rotation.x += mesh.userData.rotSpeed.x;
      mesh.rotation.y += mesh.userData.rotSpeed.y;
      mesh.position.y += Math.sin(t * mesh.userData.floatSpeed * 10 + mesh.userData.floatOffset) * 0.005;
    });

    // Camera gentle drift
    camera.position.x += (targetX * 2 - camera.position.x) * 0.02;
    camera.position.y += (-targetY * 1.5 - camera.position.y) * 0.02;

    renderer.render(scene, camera);
  }

  animate();

  // Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();

/* ─── Custom Cursor ─── */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  let fx = 0, fy = 0, cx = 0, cy = 0;

  document.addEventListener('mousemove', e => {
    cx = e.clientX;
    cy = e.clientY;
    cursor.style.left = cx + 'px';
    cursor.style.top  = cy + 'px';
  });

  function updateFollower() {
    fx += (cx - fx) * 0.12;
    fy += (cy - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    requestAnimationFrame(updateFollower);
  }
  updateFollower();

  // Grow on hover
  const interactables = document.querySelectorAll('a, button, input, textarea, .project-card, .blog-card');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2)';
      follower.style.width = '56px';
      follower.style.height = '56px';
      follower.style.borderColor = 'rgba(0,229,200,0.7)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      follower.style.width = '36px';
      follower.style.height = '36px';
      follower.style.borderColor = 'rgba(0,229,200,0.4)';
    });
  });
})();

/* ─── Navbar Scroll ─── */
(function initNav() {
  const nav = document.getElementById('navbar');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');

    // Active link
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 200) current = sec.id;
    });
    links.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  });

  // Hamburger
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  document.querySelectorAll('.mob-link').forEach(l => {
    l.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
})();

/* ─── Scroll Reveal ─── */
(function initReveal() {
  const revealEls = document.querySelectorAll(
    '.timeline-item, .project-card, .blog-card, .contact-card, .about-grid, .skill-bar-item, .edu-timeline, .section-header'
  );
  revealEls.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => observer.observe(el));
})();

/* ─── Blog Data ─── */
const BLOG_POSTS = [
  {
    tag: "JavaScript",
    title: "JavaScript Signals: The Future of Reactive State Management",
    desc: "Exploring the emerging Signals proposal for JavaScript — how it compares to React hooks and Vue's reactivity, and why it could change how we build UIs.",
    date: "Mar 2026",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    tag: "Laravel",
    title: "Laravel 12: New Features Every Developer Should Know",
    desc: "Laravel 12 ships with enhanced authentication, Vite as the default asset bundler, and significant DX improvements. Here's a practical breakdown.",
    date: "Feb 2026",
    url: "https://laravel.com/blog",
  },
  {
    tag: "Web Dev",
    title: "8 Web Development Trends in 2026 Every Laravel Developer Should Know",
    desc: "From AI integration to serverless deployments, the web dev landscape is shifting fast. These are the trends shaping Laravel apps in 2026.",
    date: "Jan 2026",
    url: "https://medium.com/@developerawam/8-web-development-trends-in-2026-every-laravel-developer-should-know-dea3b178252f",
  },
  {
    tag: "Laravel",
    title: "Building Real-Time Apps with Laravel Reverb & Echo",
    desc: "Laravel Reverb brings first-party WebSocket support. Learn how to set up real-time broadcasting with Echo for live dashboards and notifications.",
    date: "Jan 2026",
    url: "https://laravel-news.com",
  },
  {
    tag: "JavaScript",
    title: "ES2025 Features You Can Start Using Today",
    desc: "Array grouping, Promise.withResolvers, and the new Iterator helpers — a practical guide to ES2025 features with real code examples.",
    date: "Dec 2025",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    tag: "Laravel",
    title: "Laravel Pulse: Monitor Your Application in Real-Time",
    desc: "Laravel Pulse provides a beautiful real-time dashboard for monitoring exceptions, slow queries, job queues, and server health — out of the box.",
    date: "Dec 2025",
    url: "https://laravel.com/docs/pulse",
  },
  {
    tag: "PHP",
    title: "PHP 8.4 Property Hooks: A Game Changer for OOP",
    desc: "PHP 8.4 introduces property hooks that bring getter/setter syntax directly into property declarations — cleaner, leaner domain models.",
    date: "Nov 2025",
    url: "https://www.php.net/releases/8.4/en.php",
  },
  {
    tag: "Web Dev",
    title: "Vite 6 + Laravel: Supercharging Your Frontend Build",
    desc: "Vite is now the default bundler in Laravel. This post covers advanced configuration, HMR optimizations, and production build best practices.",
    date: "Nov 2025",
    url: "https://laravel-news.com",
  },
  {
    tag: "JavaScript",
    title: "Understanding JavaScript's Event Loop (Visually)",
    desc: "A visual deep-dive into the call stack, task queue, microtask queue, and how async/await really works under the hood.",
    date: "Oct 2025",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop",
  },
  {
    tag: "Laravel",
    title: "Serverless Laravel with Vapor: Deploy Without a Server",
    desc: "Laravel Vapor lets you deploy to AWS Lambda in minutes. We walk through a full setup, environment config, and cost breakdown for a real app.",
    date: "Oct 2025",
    url: "https://vapor.laravel.com",
  },
];

(function renderBlog() {
  const grid = document.getElementById('blog-grid');
  BLOG_POSTS.forEach(post => {
    const card = document.createElement('article');
    card.className = 'blog-card reveal';
    card.innerHTML = `
      <span class="blog-card__tag">${post.tag}</span>
      <h3 class="blog-card__title">${post.title}</h3>
      <p class="blog-card__desc">${post.desc}</p>
      <div class="blog-card__footer">
        <span class="blog-card__date">${post.date}</span>
        <a href="${post.url}" target="_blank" class="blog-card__link">Read more →</a>
      </div>
    `;
    grid.appendChild(card);
  });

  // Re-observe new cards
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  grid.querySelectorAll('.blog-card').forEach(el => observer.observe(el));
})();

/* ─── Contact Form ─── */
(function initForm() {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  const btn = document.getElementById('submit-btn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    btn.disabled = true;
    btn.querySelector('span').textContent = 'Sending...';

    // Simulate send (replace with actual API call / EmailJS)
    await new Promise(r => setTimeout(r, 1200));

    success.classList.add('show');
    form.reset();
    btn.disabled = false;
    btn.querySelector('span').textContent = 'Send Message';

    setTimeout(() => success.classList.remove('show'), 5000);
  });
})();

/* ─── Smooth nav click ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ─── Skill bars animate on scroll ─── */
(function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'bar-grow 1.5s ease forwards';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => {
    b.style.animation = 'none';
    b.style.transform = 'scaleX(0)';
    observer.observe(b);
  });
})();
