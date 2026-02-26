# 📰 Aplicación Web de Consulta de Noticias

Esta aplicación web permite consultar noticias en tiempo real utilizando la **NewsAPI**, ofreciendo una interfaz sencilla para buscar artículos por palabras clave y rango de fechas, y mostrar los resultados en formato de tarjetas (cards).

---

## 📌 Objetivo del Proyecto

Desarrollar una aplicación web que consuma el endpoint:

https://newsapi.org/v2/everything

permitiendo al usuario realizar búsquedas personalizadas de noticias y visualizar los resultados de manera clara y organizada.

---

## ⚙️ Funcionalidades Principales

La aplicación permite al usuario:

1. Ingresar un **texto de búsqueda** (q)
2. Seleccionar una **fecha de inicio** (from)
3. Seleccionar una **fecha de fin** (to)
4. Enviar la consulta a la API de noticias
5. Visualizar los resultados en **tarjetas (cards)** con información relevante de cada noticia

---

## 🧩 Parámetros Utilizados en la API

| Parámetro | Descripción |
|----------|-------------|
| q | Palabra o frase a buscar |
| from | Fecha de inicio del rango de búsqueda |
| to | Fecha de fin del rango de búsqueda |
| apiKey | Clave personal de acceso a NewsAPI |

Ejemplo de petición:

https://newsapi.org/v2/everything?q=tecnologia&from=2024-01-01&to=2024-01-31&apiKey=TU_API_KEY

---

## 🖥️ Interfaz de Usuario

La interfaz incluye:

Campo de texto para la búsqueda
Selector de fecha inicial
Selector de fecha final
Botón para ejecutar la consulta
Sección de resultados mostrados como **cards**, cada una con:
  - Título de la noticia
  - Descripción
  - Fuente
  - Fecha de publicación
  - Enlace a la noticia completa

---

## 🛠️ Tecnologías Sugeridas

**HTML5** – Estructura de la aplicación
**CSS3** – Estilos y diseño de tarjetas
**JavaScript** – Lógica de la aplicación y consumo de la API
**Fetch API** – Peticiones HTTP
(Opcional) Frameworks como React, Vue o Angular

---

## 🔐 Configuración de la API Key

1. Registrarse en https://newsapi.org
2. Obtener una **API Key**
3. Configurar la clave en el proyecto (preferentemente usando variables de entorno)

Ejemplo en JavaScript:
js

const API_KEY = "TU_API_KEY";
