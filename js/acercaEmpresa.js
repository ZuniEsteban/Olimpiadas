// Animación simple para el título
document.addEventListener('DOMContentLoaded', () => {
    const titulo = document.getElementById('titulo');
    setInterval(() => {
        titulo.style.color = titulo.style.color === 'gold' ? '#ffe066' : 'gold';
    }, 800);
});
