// CONFIGURACIÓN - Reemplaza con tus datos de Notion
const NOTION_TOKEN = 'tu-token-de-integracion';
const NOTION_DATABASE_ID = 'id-de-tu-base-de-datos';
const USE_MOCK_DATA = true; // Cambia a false cuando tengas Notion configurado

// Datos de ejemplo mientras configuras Notion
const postsMock = [
    {
        id: 1,
        titulo: "Cómo limpiar tu energía después de un mal día",
        fecha: "2024-01-15",
        excerpt: "A veces el mundo nos pesa. Aprende rituales simples para volver a centrarte.",
        imagen: "🧘‍♀️",
        slug: "limpiar-energia"
    },
    {
        id: 2,
        titulo: "La Luna Nueva y sus secretos",
        fecha: "2024-01-10",
        excerpt: "Cada ciclo lunar es una oportunidad. Descubre qué sembrar en esta oscuridad fértil.",
        imagen: "🌑",
        slug: "luna-nueva-secretos"
    },
    {
        id: 3,
        titulo: "Cocina mágica: Hierbas para proteger tu hogar",
        fecha: "2024-01-05",
        excerpt: "La albahaca no es solo para la pasta. Descubre sus usos espirituales.",
        imagen: "🌿",
        slug: "cocina-magica-hierbas"
    }
];

// Cargar posts al iniciar
document.addEventListener('DOMContentLoaded', cargarPosts);

async function cargarPosts() {
    const contenedor = document.getElementById('posts-container');
    
    if (USE_MOCK_DATA) {
        // Usar datos de ejemplo
        renderizarPosts(postsMock);
        return;
    }
    
    // Intentar cargar desde Notion
    try {
        const response = await fetch(`https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${NOTION_TOKEN}`,
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        const posts = transformarNotionAPosts(data.results);
        renderizarPosts(posts);
        
    } catch (error) {
        console.error('Error cargando desde Notion:', error);
        contenedor.innerHTML = '<p style="text-align:center;">Las energías están confusas... intenta más tarde.</p>';
    }
}

function transformarNotionAPosts(results) {
    return results.map(page => ({
        id: page.id,
        titulo: page.properties.Titulo?.title[0]?.text?.content || 'Sin título',
        fecha: page.properties.Fecha?.date?.start || new Date().toISOString(),
        excerpt: page.properties.Resumen?.rich_text[0]?.text?.content || '',
        imagen: page.properties.Icono?.select?.name || '✨',
        slug: page.properties.Slug?.formula?.string || page.id
    }));
}

function renderizarPosts(posts) {
    const contenedor = document.getElementById('posts-container');
    contenedor.innerHTML = '';
    
    posts.forEach(post => {
        const fechaFormateada = new Date(post.fecha).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        const postHTML = `
            <article class="post-card">
                <div class="post-image">${post.imagen}</div>
                <div class="post-content">
                    <div class="post-date">${fechaFormateada}</div>
                    <h3 class="post-title">${post.titulo}</h3>
                    <p class="post-excerpt">${post.excerpt}</p>
                    <a href="#" class="btn-small" onclick="alert('Próximamente: ${post.titulo}')">Leer más</a>
                </div>
            </article>
        `;
        
        contenedor.innerHTML += postHTML;
    });
}