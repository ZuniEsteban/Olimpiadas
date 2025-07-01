const canvas = document.getElementById('fondo-estrellado');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const NUM_ESTRELLAS = 600;

function random(min, max) {
    return Math.random() * (max - min) + min;
}

class Estrella {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = random(0, canvas.width);
        this.y = random(0, canvas.height);
        this.radio = random(0.5, 1.8);
        this.baseAlpha = random(0.3, 1);
        this.alpha = this.baseAlpha;
        this.tiempo = 0;
        this.velocidad = random(0.2, 0.5); // titilación base más lenta
        this.fase = random(0, Math.PI * 2);
        this.visible = true;
        this.tiempoDesaparecida = 0;
    }

    actualizar(dt) {
        if (this.visible) {
            // Titilación realista: mezcla de ondas lentas y rápidas + factor aleatorio
            this.tiempo += dt;
            const titilacionLenta = Math.sin(this.tiempo * this.velocidad + this.fase) * 0.5 + 0.5;
            const titilacionRapida = Math.sin(this.tiempo * (this.velocidad * 8) + this.fase * 2) * 0.5 + 0.5;
            // Factor aleatorio para que solo algunas estrellas cambien su brillo en cada frame
            const aleatorio = (Math.random() < 0.15) ? random(-0.15, 0.15) : 0;
            this.alpha = this.baseAlpha * (0.6 + titilacionLenta * 0.3 + titilacionRapida * 0.1 + aleatorio);

            // Limita alpha entre 0 y 1
            this.alpha = Math.max(0, Math.min(1, this.alpha));

            // 0.033% de probabilidad de desaparecer por frame (~1 en 3000 frames)
            if (Math.random() < 0.00003) {
                this.visible = false;
                this.tiempoDesaparecida = 0;
            }
        } else {
            // Esperar exactamente 5 segundos para reaparecer
            this.tiempoDesaparecida += dt;
            if (this.tiempoDesaparecida >= 5) {
                this.reset();
                this.visible = true;
            }
        }
    }

    dibujar(ctx) {
        if (!this.visible) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
    }
}

const estrellas = [];
for (let i = 0; i < NUM_ESTRELLAS; i++) {
    estrellas.push(new Estrella());
}

let ultimoTiempo = performance.now();

// --- COHETE SIEMPRE EN PANTALLA, MOVIMIENTO SUAVE Y CÍRCULOS PEQUEÑOS ---

// Inicializa el cohete en el centro de la pantalla
let coheteActivo = true;
let cohete = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    velocidad: 220,
    angulo: Math.random() * Math.PI * 2,
    curva: random(-2.5, 2.5),
    trail: []
};

function actualizarCohete(dt) {
    if (!coheteActivo) return;

    // Estados: "volando", "vueltita", "frenando", "quieto"
    if (!cohete.estado) {
        cohete.estado = "volando";
        cohete.tiempoEstado = 0;
        cohete.curva = random(-1, 1);
        cohete.velocidadActual = cohete.velocidad;
    }

    cohete.tiempoEstado += dt;

    // Cambios de estado aleatorios
    if (cohete.estado === "volando" && Math.random() < 0.005) {
        // 10% de probabilidad de hacer una vueltita, 90% de frenar
        if (Math.random() < 0.1) {
            cohete.estado = "vueltita";
            cohete.tiempoEstado = 0;
            cohete.curva = (Math.random() < 0.5 ? 1 : -1) * random(2, 3.5);
            cohete.tiempoVueltita = random(1.2, 2.2);
        } else {
            cohete.estado = "frenando";
            cohete.tiempoEstado = 0;
            cohete.velocidadInicial = cohete.velocidadActual;
        }
    }

    // Estado: vueltita (gira fuerte durante un tiempo)
    if (cohete.estado === "vueltita") {
        cohete.angulo += cohete.curva * dt;
        if (cohete.tiempoEstado > cohete.tiempoVueltita) {
            cohete.estado = "volando";
            cohete.tiempoEstado = 0;
            cohete.curva = random(-1, 1);
        }
    }
    // Estado: frenando (reduce velocidad suavemente)
    else if (cohete.estado === "frenando") {
        // Suaviza la frenada
        let t = Math.min(cohete.tiempoEstado / 0.7, 1);
        cohete.velocidadActual = cohete.velocidadInicial * (1 - t);
        if (cohete.velocidadActual < 10) cohete.velocidadActual = 0;
        if (t >= 1) {
            cohete.estado = "quieto";
            cohete.tiempoEstado = 0;
            cohete.velocidadActual = 0;
        }
    }
    // Estado: quieto (espera 2 segundos)
    else if (cohete.estado === "quieto") {
        cohete.velocidadActual = 0;
        if (cohete.tiempoEstado > 2) {
            cohete.estado = "volando";
            cohete.tiempoEstado = 0;
            cohete.curva = random(-1, 1);
            cohete.velocidadActual = cohete.velocidad;
        }
    }
    // Estado: volando (trayectoria aleatoria, curva suave)
    else if (cohete.estado === "volando") {
        if (Math.random() < 0.02) {
            cohete.curva = random(-1, 1);
        }
        cohete.angulo += cohete.curva * dt;
        cohete.velocidadActual = cohete.velocidad;
    }

    // Movimiento
    let nextX = cohete.x + Math.cos(cohete.angulo) * cohete.velocidadActual * dt;
    let nextY = cohete.y + Math.sin(cohete.angulo) * cohete.velocidadActual * dt;

    // Si se va a salir, gira hacia el centro y no avanza fuera
    const borde = 40;
    if (
        nextX < borde || nextX > canvas.width - borde ||
        nextY < borde || nextY > canvas.height - borde
    ) {
        const centroX = canvas.width / 2;
        const centroY = canvas.height / 2;
        const anguloCentro = Math.atan2(centroY - cohete.y, centroX - cohete.x);
        cohete.angulo += (anguloCentro - cohete.angulo) * 0.2;
        cohete.curva = random(-1, 1);
    } else {
        cohete.x = nextX;
        cohete.y = nextY;
    }

    // Guarda la posición para la estela
    cohete.trail.push({ x: cohete.x, y: cohete.y });
    if (cohete.trail.length > 60) cohete.trail.shift();
}

function dibujarEstela(ctx) {
    if (!coheteActivo || cohete.trail.length < 2) return;
    ctx.save();
    ctx.strokeStyle = "orange";
    ctx.lineWidth = 8;
    ctx.globalAlpha = 0.18;
    ctx.beginPath();
    ctx.moveTo(cohete.trail[0].x, cohete.trail[0].y);
    for (let i = 1; i < cohete.trail.length; i++) {
        ctx.lineTo(cohete.trail[i].x, cohete.trail[i].y);
    }
    ctx.stroke();
    ctx.restore();
}

function dibujarCohete(ctx) {
    if (!coheteActivo) return;
    const cx = cohete.x;
    const cy = cohete.y;
    const alto = 120;
    const ancho = 60;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(cohete.angulo + Math.PI / 2);

    // Sombra
    ctx.save();
    ctx.globalAlpha = 0.18;
    ctx.beginPath();
    ctx.ellipse(0, alto / 2 + 18, ancho * 0.45, 10, 0, 0, Math.PI * 2);
    ctx.fillStyle = "#222";
    ctx.fill();
    ctx.restore();

    // --- PUNTA ROJA (ancha, ocupa todo el ancho del cuerpo) ---
    ctx.beginPath();
    ctx.moveTo(0, -alto / 2 - 18); // punta superior
    ctx.bezierCurveTo(
        ancho / 2, -alto / 2 + 24, // derecha arriba
        ancho / 2, -alto / 2 + 54, // derecha abajo
        0, -alto / 2 + 54           // centro abajo
    );
    ctx.bezierCurveTo(
        -ancho / 2, -alto / 2 + 54, // izquierda abajo
        -ancho / 2, -alto / 2 + 24, // izquierda arriba
        0, -alto / 2 - 18            // punta superior
    );
    ctx.closePath();
    ctx.fillStyle = "#e53935";
    ctx.strokeStyle = "#222";
    ctx.lineWidth = 4;
    ctx.fill();
    ctx.stroke();

    // --- PROPUULSORES (aletas y patita central, más arriba y juntos) ---
    // Patita central roja (más arriba y pegada al cuerpo)
    ctx.beginPath();
    ctx.moveTo(-6, alto / 2 - 10);
    ctx.lineTo(-6, alto / 2 + 18);
    ctx.lineTo(6, alto / 2 + 18);
    ctx.lineTo(6, alto / 2 - 10);
    ctx.closePath();
    ctx.fillStyle = "#e53935";
    ctx.strokeStyle = "#222";
    ctx.lineWidth = 3;
    ctx.fill();
    ctx.stroke();

    // Aleta izquierda (más arriba y pegada)
    ctx.beginPath();
    ctx.moveTo(-ancho * 0.36, alto / 2 - 18);
    ctx.bezierCurveTo(
        -ancho * 0.75, alto / 2 + 2,
        -ancho * 0.65, alto / 2 + 38,
        -ancho * 0.22, alto / 2 + 18
    );
    ctx.lineTo(-ancho * 0.22, alto / 2 - 6);
    ctx.closePath();
    ctx.fillStyle = "#e53935";
    ctx.strokeStyle = "#222";
    ctx.fill();
    ctx.stroke();

    // Aleta derecha (más arriba y pegada)
    ctx.beginPath();
    ctx.moveTo(ancho * 0.36, alto / 2 - 18);
    ctx.bezierCurveTo(
        ancho * 0.75, alto / 2 + 2,
        ancho * 0.65, alto / 2 + 38,
        ancho * 0.22, alto / 2 + 18
    );
    ctx.lineTo(ancho * 0.22, alto / 2 - 6);
    ctx.closePath();
    ctx.fillStyle = "#e53935";
    ctx.strokeStyle = "#222";
    ctx.fill();
    ctx.stroke();

    // Fuego animado (ajustado a la nueva patita)
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(-8, alto / 2 + 18);
    ctx.lineTo(0, alto / 2 + 38 + Math.sin(performance.now()/120)*8);
    ctx.lineTo(8, alto / 2 + 18);
    ctx.closePath();
    ctx.fillStyle = "#ffeb3b";
    ctx.shadowColor = "#ff9800";
    ctx.shadowBlur = 18;
    ctx.globalAlpha = 0.85;
    ctx.fill();
    ctx.restore();

    // --- CUERPO BLANCO (más abajo) ---
    ctx.beginPath();
    ctx.ellipse(0, 14, ancho / 2, alto / 2, 0, 0, Math.PI * 2); // y=14 lo baja más
    ctx.fillStyle = "#f5f5f5";
    ctx.strokeStyle = "#222";
    ctx.lineWidth = 4;
    ctx.fill();
    ctx.stroke();

    // Ventana (círculo azul con borde negro y reflejo)
    ctx.beginPath();
    ctx.arc(0, alto * 0.13, 16, 0, Math.PI * 2); // también bajada
    ctx.fillStyle = "#b3e5fc";
    ctx.strokeStyle = "#222";
    ctx.lineWidth = 4;
    ctx.fill();
    ctx.stroke();

    // Reflejo ventana
    ctx.beginPath();
    ctx.arc(-5, alto * 0.10, 6, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.fill();

    ctx.restore();
}

// Si quieres volver a lanzar el cohete desde consola:
function reactivarCohete() {
    coheteActivo = true;
    cohete = generarCoheteFueraPantalla();
}

// --- PARTICULAS DE FUEGO ---
let particulasFuego = [];

function crearParticulaFuego(x, y, angulo) {
    const velocidad = random(60, 120);
    const dir = angulo + Math.PI / 2 + random(-0.3, 0.3);
    particulasFuego.push({
        x, y,
        vx: Math.cos(dir) * velocidad,
        vy: Math.sin(dir) * velocidad,
        alpha: 1,
        radio: random(2, 5),
        vida: random(0.3, 0.7)
    });
}

function actualizarParticulasFuego(dt) {
    for (let p of particulasFuego) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.vida -= dt;
        p.alpha = Math.max(0, p.vida * 1.5);
    }
    particulasFuego = particulasFuego.filter(p => p.vida > 0);
}

function dibujarParticulasFuego(ctx) {
    for (let p of particulasFuego) {
        ctx.save();
        ctx.globalAlpha = p.alpha * 0.7;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radio, 0, Math.PI * 2);
        ctx.fillStyle = "#ff9800";
        ctx.shadowColor = "#ffeb3b";
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.restore();
    }
}

function animar() {
    const ahora = performance.now();
    const dt = (ahora - ultimoTiempo) / 1000; // en segundos
    ultimoTiempo = ahora;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const estrella of estrellas) {
        estrella.actualizar(dt);
        estrella.dibujar(ctx);
    }

    actualizarCohete(dt);
    dibujarEstela(ctx);
    dibujarCohete(ctx);
    dibujarParticulasFuego(ctx); // Dibujar partículas de fuego

    requestAnimationFrame(animar);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Opcional: reposicionar cohete al centro si quieres
    // cohete.x = canvas.width / 2;
    // cohete.y = canvas.height / 2;
});

animar();