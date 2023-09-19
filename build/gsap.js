const scroll = document.getElementById("scroll");

// Crear la animación
const animacion = gsap.timeline({ repeat: -1 })
    .fromTo(
        scroll, // Elemento a animar
        {
            y: 100, // Posición inicial
            opacity: 0 // Opacidad inicial
        }, {
            y: 0, // Posición final
            opacity: 1, // Opacidad final
            duration: 4, // Duración de la animación en segundos
            ease: "power4.out" // Efecto de easing
        }
    );

// Añadir la animación al evento de scroll
window.addEventListener("scroll", () => {
    gsap.to(scroll, { opacity: 0, duration: 0.5 });
    animacion.pause();
});