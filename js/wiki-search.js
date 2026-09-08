/**
 * CYBER-ELEMENTAL // MOTOR DE BÚSQUEDA INSTANTÁNEA GLOBAL
 * Permite buscar términos, mecánicas, eventos, habilidades, armas y bestiario
 * en tiempo real con atajos de teclado (Ctrl + K o /) y navegación directa.
 */

(function () {
    const data = window.WIKI_DATA;

    // Índices de búsqueda precomputados
    const searchIndex = [
        // Secciones Generales
        { title: "Visión General y Lore de Cyber-Elemental", category: "Sección", sectionId: "sec-overview", snippet: "Premisa, ambientación cyberpunk 2184, ascenso por la torre de 10 pisos y neutralización de la IA suprema TITAN-X." },
        { title: "Condiciones de Victoria y Derrota", category: "Mecánica", sectionId: "sec-overview-victory", snippet: "Victoria al derrotar a TITAN-X en piso 10. Game Over por caída total del escuadrón o explosión de reclutamiento élite." },
        { title: "Rueda de Afinidades Elementales", category: "Mecánica", sectionId: "sec-elements", snippet: "Fuego vence Tierra, Tierra vence Aire, Aire vence Agua, Agua vence Fuego. Multiplicadores 1.35x, 0.75x y 1.0x." },
        { title: "Combate en Escuadrón (Party Combat)", category: "Mecánica", sectionId: "sec-party-combat", snippet: "Despliegue de hasta 3 robots aliados simultáneos sobre pedestales holográficos y HUDs individuales." },
        { title: "Timeline de Iniciativa y Velocidad (SPD)", category: "Mecánica", sectionId: "sec-timeline", snippet: "Cola dinámica de turnos ordenada de mayor a menor velocidad al inicio de cada ronda de combate." },
        { title: "Acciones por Turno: Atacar, Defender, Suministros", category: "Mecánica", sectionId: "sec-combat-actions", snippet: "Habilidades con CD, reducción del 50% de daño al defender hasta el próximo turno y uso de objetos tácticos." },
        { title: "Matriz de Reacciones y Marcas Elementales", category: "Combos", sectionId: "sec-reactions", snippet: "Marcas con duración de 3 turnos y 12 reacciones cruzadas: Vaporización, Lodo, Ventisca, Tormenta Ígnea, etc." },
        { title: "Simulador de Reacciones en Tiempo Real", category: "Herramienta", sectionId: "sec-simulator", snippet: "Calculadora interactiva para probar combinaciones de Marca activa y Elemento atacante." },
        { title: "Los 4 Grandes Élites Especiales", category: "Bestiario", sectionId: "sec-special-elites", snippet: "Coloso Sísmico (Tierra), Berserker Térmico (Fuego), Cyber-Stalker (Aire) y Crio-Centinela (Agua/Aire)." },
        { title: "Catálogo de los 8 Enemigos Regulares", category: "Bestiario", sectionId: "sec-regular-enemies", snippet: "Dron Kamikaze, Baluarte Tectónico, Nanocirujano, Inhibidor Glitch, Drenador de Plasma, Francotirador Gauss, etc." },
        { title: "Jefes de Sector y Colosos de la Torre", category: "Bestiario", sectionId: "sec-bosses", snippet: "TITAN-X (Piso 10), TITAN-OMEGA (Piso 20), SINGULARIDAD-ZERO (Piso 30) y 6 jefes regionales aleatorios." },
        { title: "Armamento Cibernético y Mejoras Forjadas (+1)", category: "Arsenal", sectionId: "sec-weapons", snippet: "Daga (doble ataque), Hacha (perforación y verdugo), Báculo (regeneración) y Espada (daño puro y críticos)." },
        { title: "Bono de Afinidad Elemental en Armas", category: "Mecánica", sectionId: "sec-weapon-affinity", snippet: "Equipar un arma del mismo elemento que el robot otorga +20% HP Máximo y +20% ATQ." },
        { title: "Armas Doradas Legendarias", category: "Arsenal", sectionId: "sec-weapons-legendary", snippet: "Afinidad universal para cualquier robot (+25% ATQ y +15% HP Máx), daño 1.15x sin desventaja." },
        { title: "Chips de Habilidad Elemental (💾)", category: "Arsenal", sectionId: "sec-chips", snippet: "Lanzallamas, Geyser, Fisura y Tornado. 2.0x potencia, CD 3 y ranura modular única por robot." },
        { title: "Navegación Multitorre (Torres 1, 2 y 3)", category: "Progresión", sectionId: "sec-towers", snippet: "Estructura de 30 pisos: Torre Cibernética, Torre Cuántica y Torre de Singularidad con Llaves de acceso." },
        { title: "Guía Completa de los 21 Eventos Misteriosos", category: "Eventos", sectionId: "sec-mystery-events", snippet: "Tragamonedas Rota, Altar de Cristal, Fábrica de Chips, Portal Dimensional, Mina Terrestre y más." },
        { title: "Tasas de Dropeo y Probabilidades Matemáticas", category: "Economía", sectionId: "sec-probabilities", snippet: "Matemáticas exactas de dropeo de combate normal, élites, jefes, cofres de tesoro 50/50 y mercado." },
        { title: "Árbol de Habilidades Pasivas y Meta-Progresión", category: "Habilidades", sectionId: "sec-skill-tree", snippet: "50 pasivas divididas en 4 Tiers y 4 ramas (Asalto, Blindaje, Sintonía, Logística) por 14.525 Chatarra Global." },
        { title: "Persistencia en Supabase y Cero LocalStorage", category: "Técnica", sectionId: "sec-architecture", snippet: "Esquema de base de datos relacional, sesiones anónimas y seguridad por RLS contra trampas." }
    ];

    // Indexar también habilidades pasivas
    if (data && data.SKILLS_TREE) {
        data.SKILLS_TREE.forEach(skill => {
            searchIndex.push({
                title: `${skill.name} (Tier ${skill.tier} - ${skill.branchName})`,
                category: "Pasiva",
                sectionId: "sec-skill-tree",
                skillId: skill.id,
                snippet: `${skill.desc} Coste: ${skill.cost} ⚙️. Sinergia: ${skill.synergy}`
            });
        });
    }

    // Indexar los 21 eventos
    if (data && data.MYSTERY_EVENTS) {
        data.MYSTERY_EVENTS.forEach(ev => {
            searchIndex.push({
                title: `Evento: ${ev.icon} ${ev.title}`,
                category: "Evento ❓",
                sectionId: `sec-event-${ev.id}`,
                snippet: `${ev.desc} Opciones: ${ev.options.map(o => o.text).join(' // ')}`
            });
        });
    }

    // Indexar los Élites y Jefes
    if (data && data.SPECIAL_ELITES) {
        data.SPECIAL_ELITES.forEach(elite => {
            searchIndex.push({
                title: `Élite: ${elite.emoji} ${elite.name} (${elite.element})`,
                category: "Élite 💀",
                sectionId: "sec-special-elites",
                snippet: `${elite.role}. Habilidades: ${elite.skills.map(s => s.name).join(' | ')}. ${elite.danger}`
            });
        });
    }

    if (data && data.BOSSES) {
        data.BOSSES.forEach(boss => {
            searchIndex.push({
                title: `Jefe: ${boss.icon} ${boss.name} (${boss.title})`,
                category: "Jefe 👑",
                sectionId: "sec-bosses",
                snippet: `${boss.stats}. Habilidades: ${boss.skills.join(' ')}. Recompensa: ${boss.reward}`
            });
        });
    }

    // Controlador UI de búsqueda
    function initSearch() {
        const searchInput = document.getElementById('global-wiki-search');
        const resultsDropdown = document.getElementById('search-results-dropdown');
        const searchModal = document.getElementById('search-modal-backdrop');
        const openSearchButtons = document.querySelectorAll('[data-open-search]');

        if (!searchInput || !resultsDropdown) return;

        function performSearch(query) {
            const cleanQuery = query.toLowerCase().trim();
            if (!cleanQuery) {
                resultsDropdown.innerHTML = '';
                resultsDropdown.classList.remove('active');
                return;
            }

            const terms = cleanQuery.split(/\s+/);
            const matches = searchIndex.filter(item => {
                const searchStr = `${item.title} ${item.category} ${item.snippet}`.toLowerCase();
                return terms.every(term => searchStr.includes(term));
            }).slice(0, 10);

            if (matches.length === 0) {
                resultsDropdown.innerHTML = `
                    <div class="search-no-results">
                        <span class="search-empty-icon">⚠️</span>
                        <div>No se encontraron registros cibernéticos para "<em>${escapeHTML(query)}</em>"</div>
                    </div>
                `;
                resultsDropdown.classList.add('active');
                return;
            }

            resultsDropdown.innerHTML = matches.map(match => `
                <a href="#${match.sectionId}" class="search-result-item" data-section="${match.sectionId}" ${match.skillId ? `data-skill="${match.skillId}"` : ''}>
                    <div class="search-item-header">
                        <span class="search-item-title">${highlightTerms(match.title, terms)}</span>
                        <span class="search-category-badge badge-${match.category.toLowerCase().replace(/[^a-z]/g, '')}">${match.category}</span>
                    </div>
                    <div class="search-item-snippet">${highlightTerms(match.snippet, terms)}</div>
                </a>
            `).join('');

            resultsDropdown.classList.add('active');

            // Listeners de clics en resultados
            resultsDropdown.querySelectorAll('.search-result-item').forEach(el => {
                el.addEventListener('click', (e) => {
                    const secId = el.getAttribute('data-section');
                    const skillId = el.getAttribute('data-skill');
                    resultsDropdown.classList.remove('active');
                    if (searchModal) searchModal.classList.remove('active');

                    if (skillId && window.toggleSkillUnlock) {
                        const skillCard = document.querySelector(`.skill-card[data-id="${skillId}"]`);
                        if (skillCard) {
                            skillCard.classList.add('pulse-highlight');
                            setTimeout(() => skillCard.classList.remove('pulse-highlight'), 3000);
                        }
                    }

                    // Resaltar sección destino
                    const targetEl = document.getElementById(secId);
                    if (targetEl) {
                        targetEl.classList.add('section-highlight');
                        setTimeout(() => targetEl.classList.remove('section-highlight'), 2500);
                    }
                });
            });
        }

        searchInput.addEventListener('input', (e) => {
            performSearch(e.target.value);
        });

        // Cerrar dropdown al hacer click afuera
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !resultsDropdown.contains(e.target)) {
                resultsDropdown.classList.remove('active');
            }
        });

        // Atajos de teclado: Ctrl + K o barra diagonal "/"
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA')) {
                e.preventDefault();
                searchInput.focus();
                searchInput.select();
            } else if (e.key === 'Escape') {
                resultsDropdown.classList.remove('active');
                if (searchModal) searchModal.classList.remove('active');
                searchInput.blur();
            }
        });

        if (openSearchButtons) {
            openSearchButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    searchInput.focus();
                });
            });
        }
    }

    function highlightTerms(text, terms) {
        if (!text) return '';
        let safe = escapeHTML(text);
        terms.forEach(term => {
            if (!term) return;
            const reg = new RegExp(`(${escapeRegex(term)})`, 'gi');
            safe = safe.replace(reg, '<mark class="search-highlight">$1</mark>');
        });
        return safe;
    }

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag));
    }

    function escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    document.addEventListener('DOMContentLoaded', initSearch);
})();
