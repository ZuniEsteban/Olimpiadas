const canvas = document.getElementById('galaxy-bg');
const ctx = canvas.getContext('2d');

let stars = [];
const STAR_COUNT = 500;

function randomStar() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.2,
    alpha: Math.random() * 0.7 + 0.3
  };
}

function createStars() {
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) stars.push(randomStar());
}

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createStars();
}
resize();
window.addEventListener('resize', resize);

// Galaxia espiral violeta mejorada
function drawGalaxy(cx, cy, radius, angle) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(-0.35); // Inclinación (ajusta el ángulo para más o menos inclinación)
  ctx.scale(1.6, 0.55); // Aplanar para vista lateral (ajusta para más o menos elipse)
  ctx.rotate(angle); // <-- Aplica la rotación aquí, después de inclinar y escalar
  ctx.translate(-cx, -cy);

  const ARMS = 4;
  const STARS_PER_ARM = 700;
  for (let arm = 0; arm < ARMS; arm++) {
    for (let i = 0; i < STARS_PER_ARM; i++) {
      const t = i / STARS_PER_ARM;
      // Los brazos siguen igual
      const spiralAngle = arm * (2 * Math.PI / ARMS) + t * 2.5 * Math.PI;
      const spiralRadius = radius * t;
      const spread = 28 * (1 - t);
      const x = cx + Math.cos(spiralAngle) * spiralRadius + (Math.random() - 0.5) * spread;
      const y = cy + Math.sin(spiralAngle) * spiralRadius + (Math.random() - 0.5) * spread;

      let color = `rgba(${180 + Math.floor(60 * t)},${100 + Math.floor(80 * (1-t))},255,${0.08 + 0.5 * (1-t)})`;
      ctx.beginPath();
      ctx.arc(x, y, 2.2 + 4 * (1-t), 0, 2 * Math.PI); // MÁS GRANDE
      ctx.fillStyle = color;
      ctx.shadowColor = "#b388ff";
      ctx.shadowBlur = 12 * (1-t);
      ctx.fill();
    }
  }

  // Núcleo brillante violeta
  // Aura grande y clara de la nebulosa
  // Gradiente exterior más grande y claro
  let grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 0.7);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.15, "rgba(255,200,255,0.9)");
  grad.addColorStop(0.35, "rgba(180,120,255,0.7)");
  grad.addColorStop(0.7, "rgba(180,120,255,0.25)");
  grad.addColorStop(1, "rgba(80,0,80,0)");
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 0.7, 0, 2 * Math.PI);
  ctx.fillStyle = grad;
  ctx.shadowColor = "#fff";
  ctx.shadowBlur = 180; // Aura mucho más grande y fuerte
  ctx.globalAlpha = 0.85;
  ctx.fill();
  ctx.globalAlpha = 1;

  ctx.restore();
}

let galaxyAngle = 0;
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Estrellas de fondo
  for (let s of stars) {
    ctx.globalAlpha = s.alpha * 1.2; // Más brillo
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff";
    ctx.shadowColor = "#b388ff";
    ctx.shadowBlur = 18; // Aura más visible
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Galaxia espiral en el centro
  let cx = canvas.width / 2;
  let cy = canvas.height / 2;
  let radius = Math.min(canvas.width, canvas.height) * 0.38;
  drawGalaxy(cx, cy, radius, galaxyAngle);

  // Rotación lenta
  galaxyAngle += 0.0015;

  requestAnimationFrame(animate);
}
animate();

// Nebulosas tipo nube de gas, sin forma definida
const NEBULAE_COUNT = 10;
let nebulae = [];
function randomNebulaCloud() {
  // Evita el centro (donde está la galaxia)
  let x, y, cx = window.innerWidth / 2, cy = window.innerHeight / 2;
  let radius = Math.min(window.innerWidth, window.innerHeight) * 0.45;
  do {
    x = Math.random() * window.innerWidth;
    y = Math.random() * window.innerHeight;
  } while (Math.hypot(x - cx, y - cy) < radius * 0.7);

  // Paleta de colores variados
  const palette = [
    [120, 120, 255], // azul
    [180, 100, 255], // violeta
    [255, 120, 220], // rosa
    [120, 255, 255], // celeste
    [255, 180, 255], // magenta claro
    [255, 80, 120],  // rosa fuerte
    [255, 120, 120], // rojo suave
    [120, 180, 255], // azul claro
    [180, 255, 255], // celeste claro
  ];
  const c = palette[Math.floor(Math.random() * palette.length)];
  return {
    x,
    y,
    size: 120 + Math.random() * 220,
    color: `rgba(${c[0]},${c[1]},${c[2]},1)`,
    alpha: 0.13 + Math.random() * 0.13
  };
}
function createNebulae() {
  nebulae = [];
  for (let i = 0; i < NEBULAE_COUNT; i++) nebulae.push(randomNebulaCloud());
}
createNebulae();
window.addEventListener('resize', createNebulae);

// Dibuja una nebulosa tipo nube de gas
function drawNebulaCloud(n) {
  const blobs = 40 + Math.floor(Math.random() * 30);
  for (let i = 0; i < blobs; i++) {
    const angle = Math.random() * 2 * Math.PI;
    const dist = Math.pow(Math.random(), 1.7) * n.size;
    const x = n.x + Math.cos(angle) * dist + (Math.random() - 0.5) * n.size * 0.2;
    const y = n.y + Math.sin(angle) * dist + (Math.random() - 0.5) * n.size * 0.2;
    const r = n.size * (0.18 + Math.random() * 0.22) * (0.6 + Math.random() * 0.7);
    ctx.save();
    ctx.globalAlpha = n.alpha * (0.18 + Math.random() * 0.18);
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = n.color;
    ctx.shadowColor = n.color;
    ctx.shadowBlur = r * 2.5;
    ctx.fill();
    ctx.restore();
  }
}