// --- ESTRELLAS DE FONDO ---
const NUM_STARS = 200;
for (let i = 0; i < NUM_STARS; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * window.innerWidth}px`;
    star.style.top = `${Math.random() * window.innerHeight}px`;
    document.body.appendChild(star);
}

// --- FUNCIONES DE POLÍGONOS ---
function randomSmoothPolygon(points = 18, variance = 10) {
    const angleStep = (Math.PI * 2) / points;
    let path = [];
    for (let i = 0; i < points; i++) {
        let angle = i * angleStep;
        let r = 50 + Math.random() * variance - variance/2;
        let x = 50 + Math.cos(angle) * r;
        let y = 50 + Math.sin(angle) * r;
        path.push(`${x}% ${y}%`);
    }
    return `polygon(${path.join(',')})`;
}

// --- OBJETOS ESPACIALES ---
const MAX_ASTEROIDS = 5;
const MAX_COMETS = 2;
const MAX_OBJECTS = MAX_ASTEROIDS + MAX_COMETS;
let objects = [];

// --- GENERACIÓN DE OBJETOS ---
function randomSpawnEdge(size, isComet = false) {
    // Elige un borde aleatorio: 0=arriba, 1=izquierda, 2=derecha, 3=abajo
    const edge = Math.floor(Math.random() * 4);
    let x, y, targetX, targetY;
    if (edge === 0) { // Arriba
        x = Math.random() * (window.innerWidth - size);
        y = -size;
        targetX = Math.random() * (window.innerWidth - size);
        targetY = window.innerHeight + size;
    } else if (edge === 1) { // Izquierda
        x = -size;
        y = Math.random() * (window.innerHeight - size);
        targetX = window.innerWidth + size;
        targetY = Math.random() * (window.innerHeight - size);
    } else if (edge === 2) { // Derecha
        x = window.innerWidth;
        y = Math.random() * (window.innerHeight - size);
        targetX = -size;
        targetY = Math.random() * (window.innerHeight - size);
    } else { // Abajo
        x = Math.random() * (window.innerWidth - size);
        y = window.innerHeight;
        targetX = Math.random() * (window.innerWidth - size);
        targetY = -size;
    }
    const dxRaw = targetX - x;
    const dyRaw = targetY - y;
    const distance = Math.sqrt(dxRaw * dxRaw + dyRaw * dyRaw);
    const speed = isComet ? (Math.random() * 40 + 35) : (Math.random() * 3 + 4);
    const dx = (dxRaw / distance) * speed;
    const dy = (dyRaw / distance) * speed;
    return { x, y, dx, dy };
}

function createSpaceObject(isComet = false) {
    const obj = document.createElement('div');
    obj.className = isComet ? 'comet' : 'asteroid';
    const size = isComet ? (Math.random() * 60 + 70) : (Math.random() * 90 + 60);
    obj.style.width = `${size}px`;
    obj.style.height = `${size}px`;
    obj.style.position = 'absolute';
    obj.style.left = `0px`;
    obj.style.top = `0px`;
    obj.style.transform = `translate(-50%, -50%) scale(0.7)`;

    const { x, y, dx, dy } = randomSpawnEdge(size, isComet);

    let tail = null;
    if (isComet) {
        obj.style.background = `radial-gradient(circle at 60% 40%, #b8eaff 60%, #4ad2ff 100%)`;
        obj.style.boxShadow = `0 0 24px 6px #7eefff88, 0 0 0 4px #7eefff33 inset, 0 6px 24px 0 #000a`;
        obj.style.border = `2.5px solid #7eefff44`;
        obj.style.filter = `brightness(${Math.random()*0.2+1.1}) blur(0.2px)`;
        obj.style.clipPath = randomSmoothPolygon(18, 10);

        // Estela celeste en forma de fuego que sigue la dirección
        tail = document.createElement('div');
        tail.className = 'comet-tail';
        tail.style.position = 'absolute';
        tail.style.left = '50%';
        tail.style.top = '50%'; // CENTRADO en el cometa
        tail.style.transform = 'translate(-50%, 0)';
        tail.style.width = `${size}px`;
        tail.style.height = `250px`;
        tail.style.background = 'linear-gradient(180deg, #b8eaff 0%, #7eefff 30%, #00cfff 70%, #0099ff00 100%)';
        tail.style.opacity = 0; // <-- inicia invisible igual que el cometa
        tail.style.pointerEvents = 'none';
        tail.style.filter = 'blur(8px)';
        tail.style.zIndex = 0;
        tail.style.transition = 'opacity 0.5s, transform 0.5s'; // <-- transición igual que el cometa
        tail.style.clipPath = 'polygon(0% 0%, 100% 0%, 60% 100%, 50% 90%, 40% 100%)';
        obj.appendChild(tail);
    } else {
        const hue = Math.floor(Math.random() * 30 + 20);
        obj.style.background = `radial-gradient(circle at 60% 40%, hsl(${hue}, 12%, 25%) 60%, hsl(${hue}, 10%, 40%) 100%)`;
        obj.style.boxShadow = `0 0 24px 6px #fff2, 0 0 0 4px hsl(${hue}, 30%, 60%, 0.18) inset, 0 6px 24px 0 #000a`;
        obj.style.border = `2.5px solid hsl(${hue}, 20%, 80%, 0.22)`;
        obj.style.filter = `brightness(${Math.random()*0.2+0.95}) blur(0.2px)`;
        obj.style.clipPath = randomSmoothPolygon(18, 12);
    }

    obj.style.opacity = 0;
    obj.style.transition = 'opacity 0.5s, transform 0.5s';
    obj.style.transform = 'scale(0.7)';

    // Cráteres y detalles solo para asteroides
    if (!isComet) {
        const numCraters = Math.floor(Math.random()*2)+2;
        for (let j = 0; j < numCraters; j++) {
            const crater = document.createElement('div');
            crater.style.position = 'absolute';
            const csize = Math.random() * (size/3.5) + (size/8);
            crater.style.width = `${csize}px`;
            crater.style.height = `${csize}px`;
            crater.style.left = `${Math.random() * (size-csize)}px`;
            crater.style.top = `${Math.random() * (size-csize)}px`;
            crater.style.borderRadius = '50%';
            crater.style.background = `radial-gradient(circle at 60% 40%, #555 60%, #222 100%)`;
            crater.style.opacity = 0.7;
            crater.style.boxShadow = `0 0 8px 2px #0008 inset`;
            crater.style.border = '1.5px solid #8884';
            obj.appendChild(crater);
        }
        const numDots = Math.floor(Math.random()*4)+2;
        for (let k = 0; k < numDots; k++) {
            const dot = document.createElement('div');
            dot.style.position = 'absolute';
            const dsize = Math.random() * (size/18) + 2;
            dot.style.width = `${dsize}px`;
            dot.style.height = `${dsize}px`;
            dot.style.left = `${Math.random() * (size-dsize)}px`;
            dot.style.top = `${Math.random() * (size-dsize)}px`;
            dot.style.borderRadius = '50%';
            dot.style.background = '#444';
            dot.style.opacity = Math.random()*0.5+0.5;
            dot.style.boxShadow = '0 0 4px 1px #fff3';
            obj.appendChild(dot);
        }
    }

    // Glow exterior
    const glow = document.createElement('div');
    glow.style.position = 'absolute';
    glow.style.left = '0';
    glow.style.top = '0';
    glow.style.width = '100%';
    glow.style.height = '100%';
    glow.style.borderRadius = '50%';
    glow.style.pointerEvents = 'none';
    glow.style.boxShadow = isComet
        ? `0 0 32px 12px #7eefff33`
        : `0 0 32px 12px hsl(200, 80%, 80%, 0.13)`;
    obj.appendChild(glow);

    document.body.appendChild(obj);

    setTimeout(() => {
        obj.style.opacity = 1;
        obj.style.transform = 'translate(-50%, -50%) scale(1)';
        if (tail) {
            tail.style.opacity = 0.95; // <-- aparece junto al cometa
        }
    }, 80);

    // Guarda el ángulo de movimiento inicial
    const moveAngle = Math.atan2(dy, dx) * 180 / Math.PI;

    // Aplica el ángulo inicial a la estela
    if (isComet && tail) {
        tail.style.transform = `translateX(-50%) rotate(${moveAngle}deg)`;
    }

    return {
        el: obj,
        x, y, dx, dy,
        size,
        angle: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * (isComet ? 0.08 : 0.2),
        isComet,
        tail
    };
}

// --- PARTICULAS DE EXPLOSION ---
function createExplosion(x, y, color, isComet = false) {
    const numParticles = isComet
        ? Math.floor(Math.random() * 16) + 30 // 30-45 para cometa
        : Math.floor(Math.random() * 16) + 10; // 10-25 para asteroide
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = isComet ? 'comet-particle' : 'asteroid-particle';
        const size = isComet ? (Math.random() * 16 + 10) : (Math.random() * 8 + 4);
        particle.style.position = 'absolute';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.borderRadius = '50%';
        particle.style.background = color;
        particle.style.pointerEvents = 'none';
        particle.style.opacity = 1;
        particle.style.zIndex = 1;

        // Movimiento aleatorio
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * (isComet ? 140 : 80) + (isComet ? 80 : 40);
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;

        // Animación con transición
        particle.style.transition = 'opacity 0.8s, transform 3s cubic-bezier(.22,1.2,.58,1)';
        document.getElementById('particles-bg').appendChild(particle);

        // Fuerza el reflow para que la transición funcione
        void particle.offsetWidth;

        // Movimiento y desvanecimiento
        particle.style.transform = `translate(${dx}px, ${dy}px) scale(${Math.random() * 0.7 + 0.5})`;
        setTimeout(() => {
            particle.style.opacity = 0;
        }, 2200);

        // Elimina la partícula después de 3s
        setTimeout(() => {
            if (particle.parentNode) particle.parentNode.removeChild(particle);
        }, 3000);
    }
}

// --- SPAWN Y ANIMACIÓN ---
function spawnObjects() {
    // Mantén la proporción de cometas y asteroides
    let asteroidsCount = objects.filter(o => !o.isComet).length;
    let cometsCount = objects.filter(o => o.isComet).length;
    while (asteroidsCount < MAX_ASTEROIDS) {
        objects.push(createSpaceObject(false));
        asteroidsCount++;
    }
    while (cometsCount < MAX_COMETS) {
        objects.push(createSpaceObject(true));
        cometsCount++;
    }
}

function animateAll() {
    // --- Colisiones ---
    for (let i = 0; i < objects.length; i++) {
        for (let j = i + 1; j < objects.length; j++) {
            const a = objects[i];
            const b = objects[j];
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < (a.size + b.size) * 0.5) {
                // Rebote simple
                const tempDx = a.dx, tempDy = a.dy;
                a.dx = b.dx; a.dy = b.dy;
                b.dx = tempDx; b.dy = tempDy;
                // Separar
                const overlap = (a.size + b.size) * 0.5 - dist;
                const angle = Math.atan2(dy, dx);
                a.x -= Math.cos(angle) * overlap / 2;
                a.y -= Math.sin(angle) * overlap / 2;
                b.x += Math.cos(angle) * overlap / 2;
                b.y += Math.sin(angle) * overlap / 2;
                // Explosión especial si hay cometa involucrado
                if (a.isComet || b.isComet) {
                    createExplosion(
                        (a.x + b.x) / 2 + a.size / 2,
                        (a.y + b.y) / 2 + a.size / 2,
                        '#7eefff',
                        true
                    );
                } else {
                    createExplosion(
                        (a.x + b.x) / 2 + a.size / 2,
                        (a.y + b.y) / 2 + a.size / 2,
                        a.el.style.background || '#aaa',
                        false
                    );
                }
            }
        }
    }

    // --- Movimiento y borrado ---
    for (let i = objects.length - 1; i >= 0; i--) {
        const o = objects[i];
        o.x += o.dx;
        o.y += o.dy;
        o.angle += o.rotationSpeed;
        o.el.style.left = `${o.x}px`;
        o.el.style.top = `${o.y}px`;
        o.el.style.transform = `translate(-50%, -50%) scale(1) rotate(${o.angle}deg)`;

        // Si es cometa, actualiza la estela para que siga la dirección
        if (o.isComet && o.tail) {
            // Calcula el ángulo de movimiento actual
            const moveAngle = Math.atan2(o.dy, o.dx) * 180 / Math.PI;
            o.tail.style.transform = `translateX(-50%) rotate(${moveAngle}deg)`;
        }

        if (
            o.x < -o.size || o.x > window.innerWidth + o.size ||
            o.y < -o.size || o.y > window.innerHeight + o.size
        ) {
            if (o.el.parentNode) o.el.parentNode.removeChild(o.el);
            objects.splice(i, 1);
        }
    }

    // --- Respawn ---
    spawnObjects();

    requestAnimationFrame(animateAll);
}

// --- INICIALIZACIÓN ---
setInterval(spawnObjects, 7000);
spawnObjects();
animateAll();