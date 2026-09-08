# ⚡ CYBER-ELEMENTAL // Wiki Táctica Oficial

Bienvenido al repositorio oficial de la **Wiki de Cyber-Elemental**, diseñada con una interfaz cibernética inmersiva, herramientas y simuladores interactivos, y optimizada para su publicación instantánea en **GitHub Pages**.

🔗 **Repositorio de la Wiki:** [Explodingcat/WikiCiberElemental](https://github.com/Explodingcat/WikiCiberElemental)  
🎮 **Juego Principal:** [Explodingcat/CiberElemental](https://github.com/Explodingcat/CiberElemental)

---

## 🌟 Características de la Wiki

- ⚡ **Diseño Neón Cyberpunk & HUD Táctico:** Paleta elemental pura (Fuego 🔥, Agua 💦, Tierra 🪨, Aire 💨, Legendario 👑), efectos de scanlines, halos de texto y tipografías futuristas (*Orbitron*, *Rajdhani*, *Share Tech Mono*).
- 📱 **100% Responsivo:** Menú lateral sticky en escritorio, drawer táctico desplegable en móviles y adaptación a cualquier resolución.
- 🔍 **Buscador Global Instantáneo:** Búsqueda en vivo de términos, mecánicas, enemigos y habilidades con atajos de teclado (`Ctrl + K` o `/`).
- ⚡ **Simulador de Reacciones Elementales en Tiempo Real:** Selector dinámico de Marca activa + Ataque elemental que calcula instantáneamente el combo, multiplicador (1.2x a 1.5x) y efectos de estado.
- 🌳 **Calculadora del Árbol de Habilidades (50 Pasivas):** Filtro interactivo por rama (Asalto, Blindaje, Sintonía, Logística) y Tier (1 al 4) con simulación de desbloqueo y contador de chatarra global.
- ❓ **Guía de los 21 Eventos Misteriosos:** Base de datos completa con costos en chatarra, decisiones, riesgos y porcentajes matemáticos exactos.
- 🤖 **Bestiario & Jefes de Sector:** Especificación de los 4 Grandes Élites (Coloso Sísmico, Berserker Térmico, Cyber-Stalker, Crio-Centinela), los 8 enemigos regulares y los 7 jefes de sector (incluyendo a TITAN-X, TITAN-OMEGA y SINGULARIDAD-ZERO).
- 📊 **Tablas de Probabilidad:** Fórmulas de apertura de cofres 50/50, probabilidades de armas (3.125%), dropeo de consumibles y spawn de armas enemigas por piso.

---

## 🚀 Despliegue en GitHub Pages

Para publicar esta wiki en GitHub Pages:

1. Ve a la pestaña **Settings** (Configuración) de tu repositorio en GitHub:  
   `https://github.com/Explodingcat/WikiCiberElemental/settings/pages`
2. En la sección **Build and deployment**:
   - **Source:** Selecciona `Deploy from a branch`.
   - **Branch:** Selecciona `main` y carpeta `/ (root)`.
3. Haz clic en **Save**.
4. ¡Listo! En pocos segundos tu wiki estará activa y disponible públicamente en:  
   `https://explodingcat.github.io/WikiCiberElemental/`

---

## 🏗️ Estructura del Proyecto

```
WikiCiberElemental/
├── index.html                   # Página principal (Single Page Application táctica)
├── README.md                    # Documentación y guía de despliegue
├── .gitignore                   # Archivos ignorados por Git
├── assets/                      # Fondos cyberpunk en alta resolución
│   ├── arena_bg.jpg
│   ├── boss_bg.jpg
│   ├── elite_bg.jpg
│   ├── gameover_bg.jpg
│   └── victory_bg.jpg
├── css/
│   ├── wiki-theme.css           # Variables de color neón, fuentes y animaciones
│   ├── wiki-layout.css          # Estructura del sidebar, topbar y barra de scroll
│   ├── wiki-components.css      # Tarjetas HUD, tablas estilizadas, simulador y badges
│   └── wiki-responsive.css      # Adaptabilidad para móviles y tablets
└── js/
    ├── wiki-data.js             # Base de datos JSON de habilidades, eventos y stats
    ├── wiki-simulator.js        # Lógica del simulador de reacciones y árbol de talentos
    ├── wiki-search.js           # Motor de búsqueda instantánea global
    └── wiki-main.js             # Controlador de navegación, drawer móvil y scroll spy
```

---

## 📜 Licencia & Créditos

Desarrollado para la comunidad de **Cyber-Elemental**.  
Distribuido bajo la Licencia MIT.
