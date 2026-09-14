/**
 * CYBER-ELEMENTAL // CONTROLADOR PRINCIPAL DE LA WIKI
 * Gestión de scroll-spy, drawer móvil, renderizado de componentes dinámicos
 * (Eventos, Bestiario, Arsenal) y utilidades interactivas.
 */

(function () {
    const data = window.WIKI_DATA;

    // -------------------------------------------------------------
    // 1. GESTIÓN DEL DRAWER MÓVIL Y MENÚ HAMBURGUESA
    // -------------------------------------------------------------
    function initMobileNav() {
        const toggleBtn = document.getElementById('btn-nav-toggle');
        const sidebar = document.getElementById('wiki-sidebar');
        const backdrop = document.getElementById('sidebar-backdrop');
        const navLinks = document.querySelectorAll('.nav-link');

        if (!toggleBtn || !sidebar) return;

        function toggleSidebar(open) {
            const isOpen = open !== undefined ? open : !sidebar.classList.contains('open');
            sidebar.classList.toggle('open', isOpen);
            if (backdrop) backdrop.classList.toggle('active', isOpen);
            toggleBtn.setAttribute('aria-expanded', isOpen);
            document.body.classList.toggle('sidebar-locked', isOpen);
        }

        toggleBtn.addEventListener('click', () => toggleSidebar());
        if (backdrop) backdrop.addEventListener('click', () => toggleSidebar(false));

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 992) {
                    toggleSidebar(false);
                }
            });
        });
    }

    // -------------------------------------------------------------
    // 2. SCROLL SPY (INDICADOR DE SECCIÓN ACTIVA EN SIDEBAR)
    // -------------------------------------------------------------
    function initScrollSpy() {
        const sections = document.querySelectorAll('section.wiki-section');
        const navLinks = document.querySelectorAll('.wiki-nav .nav-link');

        if (!sections.length || !navLinks.length) return;

        function onScroll() {
            let currentId = '';
            const scrollPos = window.scrollY + 140;

            sections.forEach(sec => {
                const top = sec.offsetTop;
                const height = sec.offsetHeight;
                if (scrollPos >= top && scrollPos < top + height) {
                    currentId = sec.id;
                }
            });

            if (currentId) {
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === `#${currentId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    // -------------------------------------------------------------
    // 3. BOTÓN "VOLVER ARRIBA" (BACK TO TOP) CON PROGRESO
    // -------------------------------------------------------------
    function initBackToTop() {
        const btn = document.getElementById('btn-back-to-top');
        const progressFill = document.getElementById('scroll-progress-bar');

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

            if (progressFill) {
                progressFill.style.width = `${progress}%`;
            }

            if (btn) {
                if (scrollY > 400) {
                    btn.classList.add('visible');
                } else {
                    btn.classList.remove('visible');
                }
            }
        }, { passive: true });

        if (btn) {
            btn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    // -------------------------------------------------------------
    // 4. RENDERIZADO DINÁMICO DE LOS 21 EVENTOS MISTERIOSOS
    // -------------------------------------------------------------
    function renderMysteryEvents() {
        const container = document.getElementById('mystery-events-grid');
        const filterInput = document.getElementById('events-filter-input');
        if (!container || !data || !data.MYSTERY_EVENTS) return;

        function filterEvents() {
            const query = filterInput ? filterInput.value.toLowerCase().trim() : '';

            const matches = data.MYSTERY_EVENTS.filter(ev => {
                if (!query) return true;
                const searchStr = `${ev.id} ${ev.title} ${ev.desc} ${ev.options.map(o => `${o.text} ${o.result}`).join(' ')}`.toLowerCase();
                return searchStr.includes(query);
            });

            if (matches.length === 0) {
                container.innerHTML = `
                    <div class="no-results-card">
                        <span class="no-results-icon">📡</span>
                        <h4>No hay eventos que coincidan con "${escapeHTML(query)}"</h4>
                    </div>
                `;
                return;
            }

            container.innerHTML = matches.map(ev => `
                <div class="mystery-event-card" id="sec-event-${ev.id}">
                    <div class="event-card-header">
                        <div class="event-icon-badge">${ev.icon}</div>
                        <div class="event-meta">
                            <span class="event-id-tag">Evento #${ev.id} (4.76%)</span>
                            <h4 class="event-title">${ev.title}</h4>
                        </div>
                    </div>

                    <p class="event-desc">${ev.desc}</p>

                    <div class="event-options-list">
                        ${ev.options.map((opt, idx) => `
                            <div class="event-option-box">
                                <div class="option-title">
                                    <span class="option-bullet">${String.fromCharCode(65 + idx)}</span>
                                    <span>${opt.text}</span>
                                </div>
                                <div class="option-outcome">➔ ${opt.result}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('');
        }

        if (filterInput) {
            filterInput.addEventListener('input', filterEvents);
        }

        filterEvents();
    }

    // -------------------------------------------------------------
    // 5. RENDERIZADO DEL BESTIARIO: ROBOTS, ÉLITES Y JEFES
    // -------------------------------------------------------------
    function renderBestiary() {
        // Render 4 Grandes Élites
        const elitesContainer = document.getElementById('special-elites-grid');
        if (elitesContainer && data.SPECIAL_ELITES) {
            elitesContainer.innerHTML = data.SPECIAL_ELITES.map(elite => `
                <div class="elite-card elite-${elite.element.toLowerCase()}" id="elite-${elite.id}">
                    <div class="elite-card-header">
                        <div class="elite-avatar-box">
                            <span class="elite-avatar-emoji">${elite.emoji}</span>
                        </div>
                        <div class="elite-title-box">
                            <span class="elite-badge badge-${elite.element}">${data.ELEMENTS[elite.element]?.icon || ''} ${elite.element} ${elite.secondaryElement ? `/ ${elite.secondaryElement}` : ''}</span>
                            <h3 class="elite-name">${elite.name}</h3>
                            <div class="elite-role-subtitle">${elite.role}</div>
                        </div>
                    </div>

                    <div class="elite-stats-strip">
                        <div class="elite-stat-item"><span>HP:</span> <strong>${elite.stats.hp}</strong></div>
                        <div class="elite-stat-item"><span>ATQ:</span> <strong>${elite.stats.atk}</strong></div>
                        <div class="elite-stat-item"><span>VEL:</span> <strong>${elite.stats.spd}</strong></div>
                        <div class="elite-stat-item"><span>ESQ:</span> <strong>${elite.stats.dodge}</strong></div>
                    </div>

                    <div class="elite-skills-block">
                        <h5>⚡ Técnicas y Pasivas de Combate</h5>
                        ${elite.skills.map(s => `
                            <div class="elite-skill-box">
                                <div class="skill-name-tag">${s.name}</div>
                                <div class="skill-desc-text">${s.desc}</div>
                            </div>
                        `).join('')}
                    </div>

                    <div class="elite-tactics-grid">
                        <div class="tactic-box danger-box">
                            <strong>⚠️ Factor de Amenaza:</strong>
                            <p>${elite.danger}</p>
                        </div>
                        <div class="tactic-box recruit-box">
                            <strong>🤖 Utilidad al Reclutarlo (50% éxito):</strong>
                            <p>${elite.recruitBenefit}</p>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Render 8 Enemigos Regulares
        const regularContainer = document.getElementById('regular-enemies-grid');
        if (regularContainer && data.REGULAR_ENEMIES) {
            regularContainer.innerHTML = data.REGULAR_ENEMIES.map(en => `
                <div class="regular-enemy-card">
                    <div class="enemy-icon">${en.icon}</div>
                    <div class="enemy-info">
                        <div class="enemy-name">${en.name}</div>
                        <span class="enemy-elem-tag">${en.elem}</span>
                        <p class="enemy-desc">${en.desc}</p>
                    </div>
                </div>
            `).join('');
        }

        // Render Sirvientes de Jefes
        const minionsContainer = document.getElementById('boss-minions-grid');
        if (minionsContainer && data.BOSS_MINIONS) {
            minionsContainer.innerHTML = data.BOSS_MINIONS.map(minion => `
                <div class="elite-card elite-${minion.element.toLowerCase()}" id="minion-${minion.id}">
                    <div class="elite-card-header">
                        <div class="elite-avatar-box">
                            <span class="elite-avatar-emoji">${minion.emoji}</span>
                        </div>
                        <div class="elite-title-box">
                            <span class="elite-badge badge-${minion.element}">${data.ELEMENTS[minion.element]?.icon || ''} ${minion.element}</span>
                            <h3 class="elite-name">${minion.name}</h3>
                            <div class="elite-role-subtitle">${minion.role}</div>
                        </div>
                    </div>

                    <div class="elite-stats-strip">
                        <div class="elite-stat-item"><span>HP:</span> <strong>${minion.stats.hp}</strong></div>
                        <div class="elite-stat-item"><span>ATQ:</span> <strong>${minion.stats.atk}</strong></div>
                        <div class="elite-stat-item"><span>VEL:</span> <strong>${minion.stats.spd}</strong></div>
                        <div class="elite-stat-item"><span>ESQ:</span> <strong>${minion.stats.dodge}</strong></div>
                    </div>

                    <div class="elite-skills-block">
                        <h5>⚡ Técnicas y Habilidades Especiales</h5>
                        ${minion.skills.map(s => `
                            <div class="elite-skill-box">
                                <div class="skill-name-tag">${s.name}</div>
                                <div class="skill-desc-text">${s.desc}</div>
                            </div>
                        `).join('')}
                    </div>

                    <div class="elite-tactics-grid">
                        <div class="tactic-box danger-box" style="grid-column: 1 / -1;">
                            <strong>💡 Sinergia Táctica con TITAN-X:</strong>
                            <p>${minion.strategy}</p>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Render Jefes de Sector
        const bossesContainer = document.getElementById('bosses-grid');
        if (bossesContainer && data.BOSSES) {
            bossesContainer.innerHTML = data.BOSSES.map(boss => `
                <div class="boss-card">
                    <div class="boss-card-header">
                        <div class="boss-icon">${boss.icon}</div>
                        <div>
                            <span class="boss-element-tag">${boss.element}</span>
                            <h4 class="boss-name">${boss.name}</h4>
                            <div class="boss-subtitle">${boss.title}</div>
                        </div>
                    </div>

                    <div class="boss-stats-text"><strong>📊 Perfil:</strong> ${boss.stats}</div>
                    ${boss.partyBattle ? `<div class="boss-party-battle-text"><strong>⚔️ Formato:</strong> ${boss.partyBattle}</div>` : ''}

                    <div class="boss-skills-list">
                        <strong>Técnicas Especiales:</strong>
                        <ul>
                            ${boss.skills.map(s => `<li>${s}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="boss-reward-box">
                        <strong>👑 Recompensa Garantizada:</strong> ${boss.reward}
                    </div>
                </div>
            `).join('');
        }
    }

    // -------------------------------------------------------------
    // 6. RENDERIZADO DEL ARSENAL, CHIPS Y CONSUMIBLES
    // -------------------------------------------------------------
    function renderArsenal() {
        const weaponsContainer = document.getElementById('weapons-catalog-grid');
        if (weaponsContainer && data.WEAPONS) {
            weaponsContainer.innerHTML = data.WEAPONS.map(w => `
                <div class="weapon-spec-card">
                    <div class="weapon-header">
                        <span class="weapon-icon">${w.icon}</span>
                        <div>
                            <h4 class="weapon-name">${w.name}</h4>
                            <span class="weapon-scrap-badge">${w.scrapValue}</span>
                        </div>
                    </div>

                    <div class="weapon-passives">
                        <div class="passive-row">
                            <span class="tier-tag">Nivel Base:</span>
                            <p>${w.basePassive}</p>
                        </div>
                        <div class="passive-row upgraded">
                            <span class="tier-tag tier-plus">Forjada (+1):</span>
                            <p>${w.upgradedPassive}</p>
                        </div>
                    </div>

                    <div class="weapon-affinity-box">
                        <strong>🌟 Bono de Afinidad:</strong> ${w.affinityBonus}
                    </div>
                </div>
            `).join('');
        }

        const chipsContainer = document.getElementById('chips-catalog-grid');
        if (chipsContainer && data.CHIPS) {
            chipsContainer.innerHTML = data.CHIPS.map(c => `
                <div class="chip-card chip-${c.element.toLowerCase()}">
                    <div class="chip-header">
                        <span class="chip-icon">${c.icon}</span>
                        <div>
                            <h4 class="chip-name">${c.name}</h4>
                            <span class="badge-elem badge-${c.element}">${c.element}</span>
                        </div>
                    </div>

                    <div class="chip-skill-info">
                        <div class="chip-skill-title">⚡ Habilidad Otorgada: <strong>${c.skillName}</strong></div>
                        <div class="chip-skill-stats">Cooldown: ${c.cd} turnos // Potencia: ${c.power}</div>
                        <p class="chip-desc">${c.desc}</p>
                    </div>

                    <div class="chip-rule-note">
                        💡 Límite de ranura: 1 Chip por robot. Si instalas otro, el anterior regresa intacto a la mochila.
                    </div>
                </div>
            `).join('');
        }

        const consumablesContainer = document.getElementById('consumables-catalog-grid');
        if (consumablesContainer && data.CONSUMABLES) {
            consumablesContainer.innerHTML = data.CONSUMABLES.map(item => `
                <div class="consumable-card">
                    <div class="consumable-header">
                        <span class="consumable-icon">${item.icon}</span>
                        <div>
                            <h4 class="consumable-name">${item.name}</h4>
                            <span class="consumable-timing">${item.timing}</span>
                        </div>
                    </div>
                    <p class="consumable-effect">${item.effect}</p>
                    <div class="consumable-price">🛒 Precio de Mercado: ${item.marketPrice}</div>
                </div>
            `).join('');
        }
    }

    // -------------------------------------------------------------
    // 7. RENDERIZADO DEL SISTEMA OVERDRIVE
    // -------------------------------------------------------------
    function renderOverdrive() {
        const ultimatesContainer = document.getElementById('overdrive-ultimates-grid');
        if (ultimatesContainer && data.OVERDRIVE && data.OVERDRIVE.ultimates) {
            ultimatesContainer.innerHTML = data.OVERDRIVE.ultimates.map(ult => `
                <div class="overdrive-ult-card border-${ult.element.toLowerCase()}">
                    <div class="ult-card-header">
                        <span class="badge-elem badge-${ult.element}">${data.ELEMENTS[ult.element]?.icon || ''} ${ult.robot}</span>
                        <h4 class="ult-name">${ult.name}</h4>
                    </div>
                    <p class="ult-desc">${ult.desc}</p>
                    <div class="ult-footer">
                        <span class="ult-cost-badge">⚡ Requiere: 100% Overdrive</span>
                        <span class="ult-unlock-badge">🔓 Desbloqueo: Nivel 5</span>
                    </div>
                </div>
            `).join('');
        }
    }

    // -------------------------------------------------------------
    // 8. RENDERIZADO DEL CATÁLOGO DE RELIQUIAS (34)
    // -------------------------------------------------------------
    function renderRelics() {
        const container = document.getElementById('relics-catalog-grid');
        const catFilter = document.getElementById('relic-category-filter');
        const rarityFilter = document.getElementById('relic-rarity-filter');
        const searchInput = document.getElementById('relic-search-input');
        const counterEl = document.getElementById('relic-counter');
        if (!container || !data || !data.RELICS) return;

        function updateRelicsList() {
            const cat = catFilter ? catFilter.value : 'all';
            const rarity = rarityFilter ? rarityFilter.value : 'all';
            const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

            const filtered = data.RELICS.filter(relic => {
                if (cat !== 'all' && relic.category !== cat) return false;
                if (rarity !== 'all' && relic.rarity !== rarity) return false;
                if (query) {
                    const str = `${relic.name} ${relic.desc} ${relic.lore} ${relic.category} ${relic.rarity}`.toLowerCase();
                    if (!str.includes(query)) return false;
                }
                return true;
            });

            if (counterEl) {
                counterEl.textContent = `${filtered.length} de ${data.RELICS.length} Reliquias`;
            }

            if (filtered.length === 0) {
                container.innerHTML = `
                    <div class="no-results-card" style="grid-column: 1 / -1;">
                        <span class="no-results-icon">🔍</span>
                        <h4>No se encontraron reliquias con los filtros seleccionados</h4>
                    </div>
                `;
                return;
            }

            container.innerHTML = filtered.map(relic => {
                const rarityInfo = data.RELIC_RARITIES[relic.rarity] || { name: relic.rarity, color: '#66fcf1' };
                const catInfo = data.RELIC_CATEGORIES[relic.category] || { name: relic.category, icon: '✨' };

                return `
                    <div class="relic-card rarity-${relic.rarity.toLowerCase()}" id="relic-${relic.id}">
                        <div class="relic-header">
                            <div class="relic-icon-wrapper">${relic.icon}</div>
                            <div class="relic-meta">
                                <div class="relic-badges-row">
                                    <span class="badge-rarity badge-rarity-${relic.rarity.toLowerCase()}">${rarityInfo.name}</span>
                                    <span class="relic-cat-tag">${catInfo.icon} ${catInfo.name}</span>
                                </div>
                                <h4 class="relic-name">${relic.name}</h4>
                            </div>
                        </div>
                        <div class="relic-effect">${relic.desc}</div>
                        <div class="relic-lore">"${relic.lore}"</div>
                    </div>
                `;
            }).join('');
        }

        if (catFilter) catFilter.addEventListener('change', updateRelicsList);
        if (rarityFilter) rarityFilter.addEventListener('change', updateRelicsList);
        if (searchInput) searchInput.addEventListener('input', updateRelicsList);

        updateRelicsList();
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

    // -------------------------------------------------------------
    // 9. INICIALIZACIÓN GLOBAL
    // -------------------------------------------------------------
    document.addEventListener('DOMContentLoaded', () => {
        initMobileNav();
        initScrollSpy();
        initBackToTop();
        renderMysteryEvents();
        renderBestiary();
        renderArsenal();
        renderOverdrive();
        renderRelics();
    });
})();
