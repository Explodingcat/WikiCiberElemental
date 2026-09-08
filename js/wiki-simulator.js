/**
 * CYBER-ELEMENTAL // SIMULADOR INTERACTIVO DE COMBATE Y HERRAMIENTAS TÁCTICAS
 * Maneja el simulador de reacciones elementales en tiempo real,
 * calculador de daño y visor interactivo del árbol de habilidades.
 */

(function () {
    const data = window.WIKI_DATA;
    if (!data) return;

    // -------------------------------------------------------------
    // 1. SIMULADOR DE REACCIONES ELEMENTALES
    // -------------------------------------------------------------
    function initReactionSimulator() {
        const markSelect = document.getElementById('sim-mark-select');
        const attackerSelect = document.getElementById('sim-attacker-select');
        const resultContainer = document.getElementById('sim-result-card');

        if (!markSelect || !attackerSelect || !resultContainer) return;

        function updateReaction() {
            const mark = markSelect.value;
            const attacker = attackerSelect.value;

            if (mark === attacker) {
                resultContainer.innerHTML = `
                    <div class="sim-empty-state">
                        <div class="sim-warning-icon">⚠️</div>
                        <div class="sim-empty-title">Sin Reacción de Cambio de Fase</div>
                        <div class="sim-empty-desc">
                            El elemento atacante (${data.ELEMENTS[attacker]?.name || attacker}) coincide con la Marca activa (${data.ELEMENTS[mark]?.name || mark}).
                            Se inflige daño estándar <strong>1.0x</strong> y se renueva la duración de la marca a 3 turnos, pero no detona un combo elemental cruzado.
                        </div>
                    </div>
                `;
                return;
            }

            const reaction = data.REACTIONS.find(r => r.mark === mark && r.attacker === attacker);

            if (reaction) {
                const markElem = data.ELEMENTS[mark];
                const atkElem = data.ELEMENTS[attacker];

                resultContainer.innerHTML = `
                    <div class="reaction-result-display ${reaction.cssClass} animate-glitch-border">
                        <div class="reaction-header">
                            <div class="reaction-combo-badges">
                                <span class="badge-elem badge-${mark}">${markElem.icon} Marca: ${markElem.name}</span>
                                <span class="combo-plus">+</span>
                                <span class="badge-elem badge-${attacker}">${atkElem.icon} Golpe: ${atkElem.name}</span>
                            </div>
                            <div class="reaction-multiplier-tag">${reaction.multiplier.toFixed(2)}x DAÑO</div>
                        </div>

                        <h3 class="reaction-title">${reaction.name}</h3>
                        <div class="reaction-effect-badge">⚡ ${reaction.effectBadge}</div>
                        <p class="reaction-narrative">${reaction.description}</p>

                        <div class="reaction-tactical-tip">
                            <strong>💡 Sugerencia Táctica:</strong> 
                            ${getTacticalTip(reaction.name, mark, attacker)}
                        </div>
                    </div>
                `;
            } else {
                resultContainer.innerHTML = `<div class="sim-empty-state">Selecciona los elementos para calcular la reacción.</div>`;
            }
        }

        markSelect.addEventListener('change', updateReaction);
        attackerSelect.addEventListener('change', updateReaction);
        updateReaction();
    }

    function getTacticalTip(reactionName, mark, attacker) {
        switch (reactionName) {
            case '¡Vaporización!':
                return 'El multiplicador más alto del juego (1.5x). Úsalo con Ignis tras aplicar Barrera o Geyser con Aqua para liquidar Élites rápidamente.';
            case '¡Lodo!':
                return 'Reduce la velocidad del objetivo a la mitad durante 2 turnos, asegurando que todo tu escuadrón actúe antes que él en la siguiente ronda.';
            case '¡Ventisca!':
                return 'Reduce la precisión rival al 80%, aumentando la probabilidad de que falle habilidades de alto costo o ataques en área.';
            case '¡Tormenta Ígnea!':
                return 'Renueva la quemadura a 3 turnos (8% HP por turno = 24% HP garantizado). Devastador contra jefes colosales como TITAN-X.';
            case '¡Choque Térmico!':
                return 'Purga todas las ventajas y barreras enemigas. Esencial para desmantelar enemigos Élite que acumulen furia o escudos de plasma.';
            case '¡Erupción!':
                return 'Aplica Rompearmaduras (-25% Def). Los siguientes golpes de todo tu escuadrón infligirán daño amplificado masivo.';
            case '¡Cristalización!':
                return 'Otorga un escudo del 25% de la vida actual al atacante. Excelente para sostener a Ignis cuando está a la ofensiva.';
            case '¡Erosión!':
                return 'Cura al robot atacante el 30% del daño infligido. Ideal para que Aqua o Terra recuperen HP sin gastar nanobots.';
            case '¡Tormenta de Arena!':
                return 'Causa ceguera de -50% de precisión al próximo ataque enemigo. Combínalo con la evasión de Zephyr para garantizar que falle.';
            case '¡Deflagración!':
                return '1.45x de daño puro instantáneo. La mejor opción para rematar unidades enemigas que estén por actuar.';
            case '¡Ciclón!':
                return 'Desplaza al enemigo al último turno de la ronda. Arrebata la iniciativa y permite preparar defensas o curaciones.';
            case '¡Colapso Sísmico!':
                return '40% de chance de dejar al objetivo aturdido (STUN) perdiendo su turno. Alto valor de control de masas.';
            default:
                return 'Coordina los cooldowns de tu escuadrón para detonar combos elementales continuos.';
        }
    }

    // -------------------------------------------------------------
    // 2. VISOR Y CALCULADOR DEL ÁRBOL DE TALENTOS
    // -------------------------------------------------------------
    let simulatedUnlocked = new Set();

    function initSkillTreeViewer() {
        const container = document.getElementById('skill-tree-grid');
        const branchFilter = document.getElementById('skill-branch-filter');
        const tierFilter = document.getElementById('skill-tier-filter');
        const searchInput = document.getElementById('skill-search-input');
        const totalScrapDisplay = document.getElementById('skill-total-scrap');
        const resetBtn = document.getElementById('skill-reset-sim');

        if (!container) return;

        function renderSkills() {
            const branch = branchFilter ? branchFilter.value : 'all';
            const tier = tierFilter ? tierFilter.value : 'all';
            const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

            const filtered = data.SKILLS_TREE.filter(skill => {
                if (branch !== 'all' && skill.branch !== branch) return false;
                if (tier !== 'all' && skill.tier.toString() !== tier) return false;
                if (query) {
                    const matchName = skill.name.toLowerCase().includes(query);
                    const matchDesc = skill.desc.toLowerCase().includes(query);
                    const matchSynergy = skill.synergy.toLowerCase().includes(query);
                    if (!matchName && !matchDesc && !matchSynergy) return false;
                }
                return true;
            });

            if (filtered.length === 0) {
                container.innerHTML = `
                    <div class="no-results-card">
                        <span class="no-results-icon">🔍</span>
                        <h4>No se encontraron habilidades pasivas</h4>
                        <p>Prueba ajustando los filtros de rama, tier o término de búsqueda.</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = filtered.map(skill => {
                const isUnlocked = simulatedUnlocked.has(skill.id);
                const prereqSkill = skill.prereq ? data.SKILLS_TREE.find(s => s.id === skill.prereq) : null;
                const prereqMet = !skill.prereq || simulatedUnlocked.has(skill.prereq);

                return `
                    <div class="skill-card branch-${skill.branch} tier-${skill.tier} ${isUnlocked ? 'is-unlocked' : ''}" 
                         data-id="${skill.id}">
                        <div class="skill-card-header">
                            <div class="skill-tier-pill">Tier ${skill.tier}</div>
                            <span class="skill-branch-badge">${skill.branchName}</span>
                            <div class="skill-cost-badge">⚙️ ${skill.cost}</div>
                        </div>

                        <h4 class="skill-name">${skill.name}</h4>
                        <p class="skill-desc">${skill.desc}</p>

                        <div class="skill-meta-block">
                            <div class="skill-internal-mod">
                                <span class="meta-label">Modificador:</span> 
                                <code>${skill.modifier}</code>
                            </div>
                            <div class="skill-synergy">
                                <span class="meta-label">Sinergia:</span> ${skill.synergy}
                            </div>
                            ${skill.prereq ? `
                                <div class="skill-prereq ${prereqMet ? 'prereq-ok' : 'prereq-missing'}">
                                    <span class="meta-label">Requiere:</span> ${prereqSkill ? prereqSkill.name : skill.prereq}
                                </div>
                            ` : ''}
                        </div>

                        <div class="skill-card-footer">
                            <button type="button" class="btn-toggle-skill ${isUnlocked ? 'btn-active' : ''}" onclick="window.toggleSkillUnlock('${skill.id}')">
                                ${isUnlocked ? '✓ Desbloqueada (Simulada)' : '+ Desbloquear en Simulador'}
                            </button>
                        </div>
                    </div>
                `;
            }).join('');

            updateScrapCounter();
        }

        window.toggleSkillUnlock = function (id) {
            if (simulatedUnlocked.has(id)) {
                simulatedUnlocked.delete(id);
                // Remover también dependientes
                data.SKILLS_TREE.forEach(s => {
                    if (s.prereq === id) simulatedUnlocked.delete(s.id);
                });
            } else {
                simulatedUnlocked.add(id);
                // Auto-desbloquear pre-requisito si existe
                const target = data.SKILLS_TREE.find(s => s.id === id);
                if (target && target.prereq) {
                    simulatedUnlocked.add(target.prereq);
                    const grandTarget = data.SKILLS_TREE.find(s => s.id === target.prereq);
                    if (grandTarget && grandTarget.prereq) {
                        simulatedUnlocked.add(grandTarget.prereq);
                    }
                }
            }
            renderSkills();
        };

        function updateScrapCounter() {
            let total = 0;
            simulatedUnlocked.forEach(id => {
                const s = data.SKILLS_TREE.find(item => item.id === id);
                if (s) total += s.cost;
            });
            if (totalScrapDisplay) {
                totalScrapDisplay.textContent = `${total} ⚙️ / 14.525 ⚙️ (${simulatedUnlocked.size} de 50)`;
            }
        }

        if (branchFilter) branchFilter.addEventListener('change', renderSkills);
        if (tierFilter) tierFilter.addEventListener('change', renderSkills);
        if (searchInput) searchInput.addEventListener('input', renderSkills);
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                simulatedUnlocked.clear();
                renderSkills();
            });
        }

        renderSkills();
    }

    // -------------------------------------------------------------
    // 3. INICIALIZACIÓN GENERAL AL CARGAR DOM
    // -------------------------------------------------------------
    document.addEventListener('DOMContentLoaded', () => {
        initReactionSimulator();
        initSkillTreeViewer();
    });
})();
