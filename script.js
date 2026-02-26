const API_KEY = '61e775f1137d42609e012016be39bf36';
const BASE_URL = 'https://newsapi.org/v2/everything';

const btnBuscar = document.getElementById('btn-buscar');
const contenedor = document.getElementById('resultados');

btnBuscar.addEventListener('click', buscarNoticias);

function buscarNoticias() {
    const q    = document.getElementById('q').value.trim();
    const from = document.getElementById('from').value;
    const to   = document.getElementById('to').value;

    if (!q) {
        mostrarMensaje('Por favor ingresa un término de búsqueda.', 'warning');
        return;
    }

    // Construcción dinámica de la URL
    let url = `${BASE_URL}?q=${encodeURIComponent(q)}&sortBy=popularity&apiKey=${API_KEY}`;
    if (from) url += `&from=${from}`;
    if (to)   url += `&to=${to}`;

    contenedor.innerHTML = '';
    mostrarMensaje('Buscando noticias...', 'info');

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            contenedor.innerHTML = '';

            if (data.status !== 'ok') {
                mostrarMensaje('Error de la API: ' + (data.message || 'Respuesta no válida.'), 'danger');
                return;
            }

            if (!data.articles || data.articles.length === 0) {
                mostrarMensaje('No se encontraron noticias para esa búsqueda.', 'warning');
                return;
            }

            data.articles.forEach(function(articulo) {
                const card = crearTarjeta(articulo);
                contenedor.appendChild(card);
            });
        })
        .catch(function(error) {
            contenedor.innerHTML = '';
            mostrarMensaje('Ocurrió un error al realizar la búsqueda: ' + error.message, 'danger');
        });
}

function crearTarjeta(articulo) {
    // Columna wrapper
    const col = document.createElement('div');
    col.className = 'col';

    // Card
    const card = document.createElement('div');
    card.className = 'card h-100 shadow-sm';

    // Imagen (solo si existe)
    if (articulo.urlToImage) {
        const img = document.createElement('img');
        img.src = articulo.urlToImage;
        img.className = 'card-img-top';
        img.alt = articulo.title || 'Imagen de la noticia';
        img.style.objectFit = 'cover';
        img.style.maxHeight = '200px';
        // Fallback si la imagen falla al cargar
        img.onerror = function() { this.remove(); };
        card.appendChild(img);
    }

    // Card body
    const body = document.createElement('div');
    body.className = 'card-body d-flex flex-column';

    // Título
    const titulo = document.createElement('h5');
    titulo.className = 'card-title';
    titulo.innerText = articulo.title || 'Sin título';
    body.appendChild(titulo);

    // Descripción
    const descripcion = document.createElement('p');
    descripcion.className = 'card-text flex-grow-1';
    descripcion.innerText = articulo.description || 'Sin descripción disponible.';
    body.appendChild(descripcion);

    // Fuente y fecha
    const meta = document.createElement('ul');
    meta.className = 'list-unstyled text-muted small mb-3';

    const liFuente = document.createElement('li');
    const fuenteLabel = document.createElement('strong');
    fuenteLabel.innerText = 'Fuente: ';
    liFuente.appendChild(fuenteLabel);
    liFuente.appendChild(document.createTextNode(
        (articulo.source && articulo.source.name) ? articulo.source.name : 'Desconocida'
    ));
    meta.appendChild(liFuente);

    const liFecha = document.createElement('li');
    const fechaLabel = document.createElement('strong');
    fechaLabel.innerText = 'Publicado: ';
    liFecha.appendChild(fechaLabel);
    liFecha.appendChild(document.createTextNode(
        articulo.publishedAt ? new Date(articulo.publishedAt).toLocaleDateString('es-MX') : 'Sin fecha'
    ));
    meta.appendChild(liFecha);

    body.appendChild(meta);

    // Enlace a la noticia original
    const enlace = document.createElement('a');
    enlace.href = articulo.url || '#';
    enlace.target = '_blank';
    enlace.rel = 'noopener noreferrer';
    enlace.className = 'btn btn-outline-primary mt-auto';
    enlace.innerText = 'Leer noticia completa';
    body.appendChild(enlace);

    card.appendChild(body);
    col.appendChild(card);

    return col;
}

function mostrarMensaje(texto, tipo) {
    contenedor.innerHTML = '';
    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo} col-12`;
    alerta.setAttribute('role', 'alert');
    alerta.innerText = texto;
    contenedor.appendChild(alerta);
}