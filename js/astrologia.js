// Signos zodiacales con fechas aproximadas
const signosZodiacales = [
    { nombre: "Aries", fechaInicio: "03-21", fechaFin: "04-19", elemento: "Fuego", planeta: "Marte" },
    { nombre: "Tauro", fechaInicio: "04-20", fechaFin: "05-20", elemento: "Tierra", planeta: "Venus" },
    { nombre: "Géminis", fechaInicio: "05-21", fechaFin: "06-20", elemento: "Aire", planeta: "Mercurio" },
    { nombre: "Cáncer", fechaInicio: "06-21", fechaFin: "07-22", elemento: "Agua", planeta: "Luna" },
    { nombre: "Leo", fechaInicio: "07-23", fechaFin: "08-22", elemento: "Fuego", planeta: "Sol" },
    { nombre: "Virgo", fechaInicio: "08-23", fechaFin: "09-22", elemento: "Tierra", planeta: "Mercurio" },
    { nombre: "Libra", fechaInicio: "09-23", fechaFin: "10-22", elemento: "Aire", planeta: "Venus" },
    { nombre: "Escorpio", fechaInicio: "10-23", fechaFin: "11-21", elemento: "Agua", planeta: "Plutón" },
    { nombre: "Sagitario", fechaInicio: "11-22", fechaFin: "12-21", elemento: "Fuego", planeta: "Júpiter" },
    { nombre: "Capricornio", fechaInicio: "12-22", fechaFin: "01-19", elemento: "Tierra", planeta: "Saturno" },
    { nombre: "Acuario", fechaInicio: "01-20", fechaFin: "02-18", elemento: "Aire", planeta: "Urano" },
    { nombre: "Piscis", fechaInicio: "02-19", fechaFin: "03-20", elemento: "Agua", planeta: "Neptuno" }
];

// Planetas para simulación
const planetas = [
    { nombre: "Sol", significado: "Tu esencia, ego, identidad" },
    { nombre: "Luna", significado: "Tus emociones, instintos, interior" },
    { nombre: "Mercurio", significado: "Tu mente, comunicación, aprendizaje" },
    { nombre: "Venus", significado: "Amor, belleza, valores, dinero" },
    { nombre: "Marte", significado: "Acción, deseo, energía, conflicto" },
    { nombre: "Júpiter", significado: "Expansión, suerte, filosofía" },
    { nombre: "Saturno", significado: "Responsabilidad, límites, karma" }
];

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-astral');
    if (form) {
        form.addEventListener('submit', calcularCartaAstral);
    }
});

function calcularCartaAstral(e) {
    e.preventDefault();
    
    const fecha = document.getElementById('fecha-nac').value;
    const hora = document.getElementById('hora-nac').value;
    const lugar = document.getElementById('lugar-nac').value;
    
    if (!fecha || !hora || !lugar) {
        alert('Por favor completa todos los campos');
        return;
    }
    
    // Calcular signo solar
    const signoSolar = calcularSignoSolar(fecha);
    
    // Generar posiciones "simuladas" pero coherentes
    const carta = generarCartaAstral(fecha, hora, signoSolar);
    
    mostrarResultadoAstral(carta, fecha, hora, lugar);
}

function calcularSignoSolar(fechaStr) {
    const fecha = new Date(fechaStr);
    const mes = fecha.getMonth() + 1;
    const dia = fecha.getDate();
    
    // Formato MM-DD para comparar
    const fechaComp = `${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
    
    for (const signo of signosZodiacales) {
        // Lógica especial para Capricornio (cruza año)
        if (signo.nombre === "Capricornio") {
            if (fechaComp >= signo.fechaInicio || fechaComp <= signo.fechaFin) {
                return signo;
            }
        } else {
            if (fechaComp >= signo.fechaInicio && fechaComp <= signo.fechaFin) {
                return signo;
            }
        }
    }
    
    return signosZodiacales[0]; // Default Aries
}

function generarCartaAstral(fechaStr, horaStr, signoSolar) {
    // Usar la fecha como "semilla" para generar resultados consistentes
    const semilla = new Date(fechaStr + 'T' + horaStr).getTime();
    
    const carta = {
        signoSolar: signoSolar,
        posiciones: []
    };
    
    // Generar posiciones para cada planeta
    planetas.forEach((planeta, index) => {
        // "Aleatorio" basado en semilla para que sea consistente
        const pseudoRandom = ((semilla * (index + 1)) % 12);
        const signo = signosZodiacales[pseudoRandom];
        
        carta.posiciones.push({
            planeta: planeta.nombre,
            signo: signo.nombre,
            elemento: signo.elemento,
            significado: planeta.significado,
            casa: (pseudoRandom % 12) + 1
        });
    });
    
    // Determinar ascendente (simulado basado en hora)
    const hora = parseInt(horaStr.split(':')[0]);
    const ascendenteIndex = (hora + Math.floor(semilla % 12)) % 12;
    carta.ascendente = signosZodiacales[ascendenteIndex];
    
    return carta;
}

function mostrarResultadoAstral(carta, fecha, hora, lugar) {
    const contenedor = document.getElementById('resultado-astral');
    
    let html = `
        <div class="carta-astral-resultado" style="margin-top:40px; padding:30px; background:var(--color-card); border-radius:20px; border:2px solid var(--color-primario);">
            <h3 style="color:var(--color-primario); text-align:center; margin-bottom:30px; font-family:var(--fuente-titulo);">
                🌟 Tu Carta Astral 🌟
            </h3>
            
            <div style="text-align:center; margin-bottom:30px; color:var(--color-texto-oscuro);">
                <p>Nacido el ${new Date(fecha).toLocaleDateString('es-ES')} a las ${hora}</p>
                <p>en ${lugar}</p>
            </div>
            
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(250px, 1fr)); gap:20px; margin-bottom:30px;">
                <div style="text-align:center; padding:20px; background:var(--color-fondo); border-radius:10px;">
                    <h4 style="color:var(--color-secundario); margin-bottom:10px;">☉ Signo Solar</h4>
                    <p style="font-size:1.5rem; color:var(--color-primario); font-weight:bold;">${carta.signoSolar.nombre}</p>
                    <p style="font-size:0.9rem;">${carta.signoSolar.elemento} • Regente: ${carta.signoSolar.planeta}</p>
                    <p style="margin-top:10px; font-size:0.9rem;">Tu esencia, cómo brillas</p>
                </div>
                
                <div style="text-align:center; padding:20px; background:var(--color-fondo); border-radius:10px;">
                    <h4 style="color:var(--color-secundario); margin-bottom:10px;">↑ Ascendente</h4>
                    <p style="font-size:1.5rem; color:var(--color-primario); font-weight:bold;">${carta.ascendente.nombre}</p>
                    <p style="font-size:0.9rem;">${carta.ascendente.elemento}</p>
                    <p style="margin-top:10px; font-size:0.9rem;">Tu máscara, cómo te ven otros</p>
                </div>
            </div>
            
            <h4 style="color:var(--color-primario); margin-bottom:20px; text-align:center;">Posiciones Planetarias</h4>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:15px;">
    `;
    
    carta.posiciones.forEach(pos => {
        html += `
            <div style="padding:15px; background:var(--color-fondo); border-radius:8px; border-left:3px solid var(--color-secundario);">
                <strong style="color:var(--color-primario);">${pos.planeta}</strong> en <em>${pos.signo}</em>
                <p style="font-size:0.85rem; margin-top:5px; color:var(--color-texto-oscuro);">${pos.significado}</p>
            </div>
        `;
    });
    
    html += `
            </div>
            
            <div style="text-align:center; margin-top:30px;">
                <p style="font-style:italic; color:var(--color-texto-oscuro); margin-bottom:20px;">
                    Esta es una interpretación básica. Para un análisis completo de tu carta natal...
                </p>
                <a href="index.html#contacto" class="btn-primary">Agenda tu lectura personalizada</a>
            </div>
        </div>
    `;
    
    contenedor.innerHTML = html;
    contenedor.style.display = 'block';
    contenedor.scrollIntoView({ behavior: 'smooth' });
}