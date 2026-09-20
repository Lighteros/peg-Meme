(() => {
  const nav = document.getElementById("nav");
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");
  const halo = document.querySelector(".cursor-halo");
  const pig = document.getElementById("hero-pig");
  const well = document.getElementById("plush-well");
  const canvas = document.getElementById("bubbles");
  const ctx = canvas.getContext("2d");

  const onScroll = () => {
    nav.classList.toggle("scrolled", window.scrollY > 12);
  };

  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  window.addEventListener("mousemove", (event) => {
    halo.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;

    if (!well) return;
    const box = well.getBoundingClientRect();
    const cx = box.left + box.width / 2;
    const cy = box.top + box.height / 2;
    const dx = (event.clientX - cx) / box.width;
    const dy = (event.clientY - cy) / box.height;
    pig.style.transform = `scale(1.04) rotateX(${(-dy * 8).toFixed(2)}deg) rotateY(${(dx * 10).toFixed(2)}deg)`;
  });

  const bubbles = [];
  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  const spawn = () => {
    bubbles.push({
      x: Math.random() * canvas.width,
      y: canvas.height + 20,
      r: 3 + Math.random() * 7,
      s: 0.35 + Math.random() * 0.7,
      a: 0.12 + Math.random() * 0.22,
      drift: -0.35 + Math.random() * 0.7,
    });
  };

  const tick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (bubbles.length < 42) spawn();
    bubbles.forEach((b, i) => {
      b.y -= b.s;
      b.x += Math.sin(b.y / 40) * b.drift;
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${b.a})`;
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = `rgba(142,196,242,${b.a})`;
      ctx.stroke();
      if (b.y < -20) bubbles.splice(i, 1);
    });
    requestAnimationFrame(tick);
  };

  window.addEventListener("resize", resize);
  resize();
  tick();
})();
