// Base de datos de los 22 Arcanos Mayores
const arcanosMayores = [
    { id: 0, nombre: "El Loco", numero: "0", significado: "Nuevos comienzos, aventura, potencial ilimitado. Confía en el universo y da el salto.", imagen: "https://via.placeholder.com/200x350/1a1a2e/d4af37?text=El+Loco" },
    { id: 1, nombre: "El Mago", numero: "I", significado: "Manifestación, poder personal, concentración. Tienes todas las herramientas que necesitas.", imagen: "https://via.placeholder.com/200x350/1a1a2e/d4af37?text=El+Mago" },
    { id: 2, nombre: "La Sacerdotisa", numero: "II", significado: "Intuición, misterio, sabiduría interior. Escucha tu voz interna.", imagen: "https://via.placeholder.com/200x350/1a1a2e/d4af37?text=La+Sacerdotisa" },
    { id: 3, nombre: "La Emperatriz", numero: "III", significado: "Abundancia, fertilidad, creatividad. Conecta con la naturaleza.", imagen: "https://via.placeholder.com/200x350/1a1a2e/d4af37?text=La+Emperatriz" },
    { id: 4, nombre: "El Emperador", numero: "IV", significado: "Autoridad, estructura, estabilidad. Es momento de tomar el control.", imagen: "https://via.placeholder.com/200x350/1a1a2e/d4af37?text=El+Emperador" },
    { id: 5, nombre: "El Sumo Sacerdote", numero: "V", significado: "Tradición, espiritualidad, guía. Busca consejo de alguien sabio.", imagen: "https://via.placeholder.com/200x350/1a1a2e/d4af37?text=Sumo+Sacerdote" },
    { id: 6, nombre: "Los Enamorados", numero: "VI", significado: "Amor, armonía, elecciones importantes. Sigue a tu corazón.", imagen: "https://via.placeholder.com/200x350/1a1a2e/d4af37?text=Los+Enamorados" },
    { id: 7, nombre: "El Carro", numero: "VII", significado: "Determinación, voluntad, victoria. Avanza con confianza.", imagen: "https://via.placeholder.com/200x350/1a1a2e/d4af37?text=El+Carro" },
    { id: 8, nombre: "La Fuerza", numero: "VIII", significado: "Coraje, paciencia, control interior. Tu fuerza está en la suavidad.", imagen: "https://via.placeholder.com/200x350/1a1a2e/d4af37?text=La+Fuerza" },
    { id: 9, nombre: "El Ermitaño", numero: "IX", significado: "Introspección, soledad, búsqueda de verdad. Retírate para encontrar luz.", imagen: "https://via.placeholder.com/200x350/1a1a2e/d4af37?text=El+Ermitaño" },
    { id: 10, nombre: "La Rueda de la Fortuna", numero: "X", significado: "Ciclos, destino, cambio. Todo cambia, aprovecha el momento.", imagen: "https://via.placeholder.com/200x350/1a1a2e/d4af37?text=Rueda+Fortuna" },
    { id: 11, nombre: "La Justicia", numero: "XI", significado: "Equilibrio, verdad, consecuencias. La justicia se hará.", imagen: "https://via.placeholder.com/200x350/1a1a2e/d4af37?text=La+Justicia" },
    { id: 12, nombre: "El Colgado", numero: "XII", significado: "Sacrificio, nueva perspectiva, espera. A veces hay que dejar ir.", imagen: "https://via.placeholder.com/200x350/1a1a2e/d4af37?text=El+Colgado" },
    { id: 13, nombre: "La Muerte", numero: "XIII", significado: "Transformación, fin de ciclo, renacimiento. Algo termina para que algo mejor comience.", imagen: "https://via.placeholder.com/200x350/1a1a2e/d4af37?text=La+Muerte" },
    { id: 14, nombre: "La Templanza", numero: "XIV", significado: "Equilibrio, moderación, paciencia. Encuentra el punto medio.", imagen: "https://via.placeholder.com/200x350/1a1a2e/d4af37?text=La+Templanza" },
    { id: 15, nombre: "El Diablo", numero: "XV", significado: "Ataduras, tentación, materialismo. ¿Qué te está encadenando?", imagen: "https://via.placeholder.com/200x350/1a1a2e/d4af37?text=El+Diablo" },
    { id: 16, nombre: "La Torre", numero: "XVI", significado: "Cambio abrupto, revelación, destrucción necesaria. Lo falso cae.", imagen: "https://via.placeholder.com/200x350/1a1a2e/d4af37?text=La+Torre" },
    { id: 17, nombre: "La Estrella", numero: "XVII", significado: "Esperanza, inspiración, renovación. La luz regresa.", imagen: "https://via.placeholder.com/200x350/1a1a2e/d4af37?text=La+Estrella" },
    { id: 18, nombre: "La Luna", numero: "XVIII", significado: "Ilusiones, intuición, miedos. No todo es lo que parece.", imagen: "https://via.placeholder.com/200x350/1a1a2e/d4af37?text=La+Luna" },
    { id: 19, nombre: "El Sol", numero: "XIX", significado: "Alegría, éxito, vitalidad. Brilla con toda tu luz.", imagen: "https://via.placeholder.com/200x350/1a1a2e/d4af37?text=El+Sol" },
    { id: 20, nombre: "El Juicio", numero: "XX", significado: "Despertar, redención, llamado interior. Es momento de actuar.", imagen: "https://via.placeholder.com/200x350/1a1a2e/d4af37?text=El+Juicio" },
    { id: 21, nombre: "El Mundo", numero: "XXI", significado: "Completitud, integración, logro. Un ciclo se cierra exitosamente.", imagen: "https://via.placeholder.com/200x350/1a1a2e/d4af37?text=El+Mundo" }
];

// Estado del juego
let estado = {
    barajando: false,
    cartasSeleccionadas: [],
    pregunta: ''
};

// Función principal de barajar
function barajar() {
    if (estado.barajando) return;
    
    // Guardar pregunta
    const inputPregunta = document.getElementById('pregunta-input');
    estado.pregunta = inputPregunta ? inputPregunta.value : '';
    
    // Cambiar vistas
    document.getElementById('paso-1').style.display = 'none';
    document.getElementById('paso-2').style.display = 'none';
    document.getElementById('paso-3').style.display = 'block';
    
    estado.barajando = true;
    
    // Simular tiempo de barajado
    setTimeout(() => {
        seleccionarCartas();
    }, 2500);
}

// Seleccionar 3 cartas aleatorias sin repetición
function seleccionarCartas() {
    const seleccionadas = [];
    const disponibles = [...arcanosMayores];
    
    // Seleccionar 3 cartas únicas
    for (let i = 0; i < 3; i++) {
        const indiceAleatorio = Math.floor(Math.random() * disponibles.length);
        seleccionadas.push(disponibles[indiceAleatorio]);
        disponibles.splice(indiceAleatorio, 1); // Eliminar para no repetir
    }
    
    estado.cartasSeleccionadas = seleccionadas;
    mostrarResultado();
}

// Mostrar el resultado de la tirada
function mostrarResultado() {
    document.getElementById('paso-3').style.display = 'none';
    document.getElementById('paso-4').style.display = 'block';
    
    const contenedor = document.getElementById('tirada-cartas');
    contenedor.innerHTML = '';
    
    const posiciones = ['Pasado', 'Presente', 'Futuro'];
    const iconos = ['🌅', '⚡', '🔮'];
    
    estado.cartasSeleccionadas.forEach((carta, index) => {
        const cartaHTML = `
            <div class="carta-resultado" style="animation: aparecer 0.5s ease-out ${index * 0.3}s both;">
                <span class="posicion">${iconos[index]} ${posiciones[index]}</span>
                <img src="${carta.imagen}" alt="${carta.nombre}">
                <h3>${carta.nombre} <small style="color:var(--color-texto-oscuro)">(${carta.numero})</small></h3>
                <p>${carta.significado}</p>
            </div>
        `;
        contenedor.innerHTML += cartaHTML;
    });
    
    // Si hay pregunta, mostrarla
    if (estado.pregunta) {
        const preguntaDiv = document.createElement('div');
        preguntaDiv.style.cssText = 'width:100%; text-align:center; margin-bottom:20px; color:var(--color-secundario); font-style:italic;';
        preguntaDiv.innerHTML = `"${estado.pregunta}"`;
        contenedor.parentNode.insertBefore(preguntaDiv, contenedor);
    }
    
    // Scroll suave al resultado
    document.getElementById('paso-4').scrollIntoView({ behavior: 'smooth' });
}

// Nueva tirada
function nuevaTirada() {
    estado = {
        barajando: false,
        cartasSeleccionadas: [],
        pregunta: ''
    };
    
    // Limpiar pregunta mostrada si existe
    const preguntaMostrada = document.querySelector('.resultado-container div[style*="width:100%"]');
    if (preguntaMostrada) preguntaMostrada.remove();
    
    document.getElementById('paso-4').style.display = 'none';
    document.getElementById('paso-1').style.display = 'block';
    document.getElementById('paso-2').style.display = 'block';
    
    // Limpiar input
    const input = document.getElementById('pregunta-input');
    if (input) input.value = '';
}

// Agregar animación CSS dinámicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes aparecer {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);