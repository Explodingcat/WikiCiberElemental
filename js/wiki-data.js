/**
 * CYBER-ELEMENTAL // BASE DE DATOS ESTRUCTURADA DE LA WIKI
 * Recopila todos los datos numéricos, mecánicas, eventos, habilidades y bestiario
 * documentados en GAME_OVERVIEW, GAME_MANUAL, PROBABILIDADES_RECOMPENSAS,
 * PROPUESTA_ENEMIGOS y SKILL_TREE_MANUAL.
 */

window.WIKI_DATA = {
    // -------------------------------------------------------------
    // 1. RUEDA ELEMENTAL Y MULTIPLICADORES
    // -------------------------------------------------------------
    ELEMENTS: {
        FUEGO: {
            name: "Fuego",
            icon: "🔥",
            color: "#ff6b6b",
            glow: "rgba(255, 107, 107, 0.7)",
            beats: "TIERRA",
            weakTo: "AGUA",
            description: "Poder ofensivo concentrado, ignición y quemaduras continuas. Afinidad de arma: +15% ATQ Base y +15% daño extra contra objetivos con Marca o Quemadura."
        },
        AGUA: {
            name: "Agua",
            icon: "💦",
            color: "#48dbfb",
            glow: "rgba(72, 219, 251, 0.7)",
            beats: "FUEGO",
            weakTo: "AIRE",
            description: "Barreras energéticas, mitigación absoluta y control hidrodinámico. Afinidad de arma: +15% HP Máximo y +25% a la potencia y absorción de barreras/escudos."
        },
        TIERRA: {
            name: "Tierra",
            icon: "🪨",
            color: "#feca57",
            glow: "rgba(254, 202, 87, 0.7)",
            beats: "AIRE",
            weakTo: "FUEGO",
            description: "Blindaje colosal, provocación de objetivos y reflejo de daño. Afinidad de arma: +25% HP Máximo y -10% de reducción pasiva permanente de todo daño recibido."
        },
        AIRE: {
            name: "Aire",
            icon: "💨",
            color: "#c8d6e5",
            glow: "rgba(200, 214, 229, 0.7)",
            beats: "AGUA",
            weakTo: "TIERRA",
            description: "Velocidad extrema de iniciativa, evasión cuántica y prioridad de turno. Afinidad de arma: +15% ATQ Base, +2 de Velocidad (SPD) fija y +10% de Esquiva pasiva."
        },
        NEUTRO: {
            name: "Neutro",
            icon: "⚙️",
            color: "#8395a7",
            glow: "rgba(131, 149, 167, 0.5)",
            beats: null,
            weakTo: null,
            description: "Sin ventajas ni desventajas directas (1.0x fijo). Elemento de apoyo y de colosos cuánticos avanzados."
        },
        LEGENDARIO: {
            name: "Legendario",
            icon: "👑",
            color: "#ffd700",
            glow: "rgba(255, 215, 0, 0.8)",
            beats: null,
            weakTo: null,
            description: "Afinidad universal para cualquier robot (+25% ATQ y +15% HP Máximo). Daño 1.15x sin penalizaciones contra ningún elemento."
        }
    },

    ELEMENT_MULTIPLIERS: {
        advantage: { value: 1.35, label: "Ventaja Elemental (+35%)" },
        disadvantage: { value: 0.75, label: "Desventaja Elemental (-25%)" },
        neutral: { value: 1.0, label: "Neutro / Mismo Elemento (100%)" }
    },

    // -------------------------------------------------------------
    // 2. MATRIZ DE REACCIONES ELEMENTALES (COMBOS)
    // -------------------------------------------------------------
    REACTIONS: [
        {
            mark: "AGUA",
            attacker: "FUEGO",
            name: "¡Vaporización!",
            multiplier: 1.50,
            effectBadge: "Daño Masivo 1.5x",
            description: "La combustión instantánea sobre el agua sobrecalienta el blindaje objetivo causando una explosión de vapor térmico a presión.",
            cssClass: "reaction-vaporize"
        },
        {
            mark: "AGUA",
            attacker: "TIERRA",
            name: "¡Lodo!",
            multiplier: 1.20,
            effectBadge: "Ralentización (-50% Vel, 2T)",
            description: "La tierra densa se mezcla con el agua, atascando los servomotores y reduciendo la velocidad de iniciativa a la mitad durante 2 turnos.",
            cssClass: "reaction-mud"
        },
        {
            mark: "AGUA",
            attacker: "AIRE",
            name: "¡Ventisca!",
            multiplier: 1.35,
            effectBadge: "Congelación Leve (-20% Precisión, 2T)",
            description: "Ráfagas gélidas congelan la humedad sobre los sensores del rival, entorpeciendo su puntería por 2 rondas.",
            cssClass: "reaction-blizzard"
        },
        {
            mark: "FUEGO",
            attacker: "AIRE",
            name: "¡Tormenta Ígnea!",
            multiplier: 1.30,
            effectBadge: "Renueva Quemadura (3T)",
            description: "El flujo de oxígeno aviva las llamas, reiniciando y extendiendo el estado de Quemadura a 3 turnos completos (8% HP/turno).",
            cssClass: "reaction-firestorm"
        },
        {
            mark: "FUEGO",
            attacker: "AGUA",
            name: "¡Choque Térmico!",
            multiplier: 1.45,
            effectBadge: "Purga Total de Ventajas y Bufos",
            description: "El cambio brusco de temperatura colapsa los módulos electromagnéticos del objetivo, eliminando todas sus ventajas de estadísticas y barreras activas.",
            cssClass: "reaction-thermalshock"
        },
        {
            mark: "FUEGO",
            attacker: "TIERRA",
            name: "¡Erupción!",
            multiplier: 1.40,
            effectBadge: "Rompearmaduras (-25% Def, 2T)",
            description: "La fundición telúrica agrieta el chasis blindado, reduciendo las defensas del enemigo un 25% durante 2 turnos.",
            cssClass: "reaction-eruption"
        },
        {
            mark: "TIERRA",
            attacker: "FUEGO",
            name: "¡Cristalización!",
            multiplier: 1.20,
            effectBadge: "Escudo +25% HP Actual",
            description: "El calor extremo vitrifica la corteza de tierra, generando una placa protectora para el usuario equivalente al 25% de su vida actual.",
            cssClass: "reaction-crystallize"
        },
        {
            mark: "TIERRA",
            attacker: "AGUA",
            name: "¡Erosión!",
            multiplier: 1.30,
            effectBadge: "Drenaje Vampírico (+30% Robo de Vida)",
            description: "La corriente disuelve los componentes estructurales del defensor y absorbe un 30% del daño infligido para reparar al robot atacante.",
            cssClass: "reaction-erosion"
        },
        {
            mark: "TIERRA",
            attacker: "AIRE",
            name: "¡Tormenta de Arena!",
            multiplier: 1.30,
            effectBadge: "Ceguera Táctica (-50% Precisión siguiente ataque)",
            description: "Una nube de micropartículas silíceas satura las cámaras ópticas rivales, induciendo un 50% de probabilidad de fallo en su siguiente turno.",
            cssClass: "reaction-sandstorm"
        },
        {
            mark: "AIRE",
            attacker: "FUEGO",
            name: "¡Deflagración!",
            multiplier: 1.45,
            effectBadge: "Daño Directo Puro",
            description: "Detonación neumática instantánea que propaga una onda expansiva de fuego puro sin requerir efectos de estado persistentes.",
            cssClass: "reaction-deflagration"
        },
        {
            mark: "AIRE",
            attacker: "AGUA",
            name: "¡Ciclón!",
            multiplier: 1.35,
            effectBadge: "Retraso al Final de la Ronda",
            description: "Un vórtice hidrodinámico desestabiliza la trayectoria del enemigo, mandando su turno inmediatamente al último lugar de la cola de iniciativa.",
            cssClass: "reaction-cyclone"
        },
        {
            mark: "AIRE",
            attacker: "TIERRA",
            name: "¡Colapso Sísmico!",
            multiplier: 1.40,
            effectBadge: "Aturdimiento Condicional (40% Probabilidad)",
            description: "El impacto de rocas arrojadas por corrientes de aire causa una contusión electromagnética con 40% de chance de aturdir al enemigo por 1 turno.",
            cssClass: "reaction-seismic"
        }
    ],

    // -------------------------------------------------------------
    // 3. ROBOTS DEL JUGADOR Y BESTIARIO
    // -------------------------------------------------------------
    ROBOTS: [
        {
            id: "ignis",
            name: "Ignis",
            element: "FUEGO",
            role: "Carry Ofensivo / Daño Por Quemadura",
            emoji: "🤖",
            hp: 90,
            hpPerLevel: "+5% HP",
            atk: 28,
            atkPerLevel: "+5% ATQ",
            spd: 11,
            dodge: "5%",
            acc: "100%",
            crit: "10%",
            skills: [
                { name: "Ataque Básico", cd: 0, power: "1.0x ATQ", desc: "Golpe frontal con ignición estándar. Puede asestar impacto crítico (+50% daño)." },
                { name: "Ignición", cd: 3, power: "1.2x ATQ", desc: "Ataque de fuego concentrado. Aplica Marca de Fuego (3T) y Quemadura activa (8% HP/turno por 2 rondas)." }
            ],
            strategy: "Ideal como causante principal de daño. Combina de forma letal con marcas de Agua para desatar Vaporizaciones masivas de 1.5x."
        },
        {
            id: "aqua",
            name: "Aqua",
            element: "AGUA",
            role: "Soporte Protector / Mitigación y Marcas",
            emoji: "🤖",
            hp: 130,
            hpPerLevel: "+5% HP",
            atk: 14,
            atkPerLevel: "+5% ATQ",
            spd: 9,
            dodge: "5%",
            acc: "95%",
            crit: "5%",
            skills: [
                { name: "Ataque Básico", cd: 0, power: "1.0x ATQ", desc: "Disparo presurizado de agua que impacta de forma moderada." },
                { name: "Barrera Plasma", cd: 3, power: "0x Daño", desc: "Aplica una barrera protectora sobre cualquier aliado: anula el 100% del siguiente daño, restaura 5% HP Máx y adhiere Marca de Agua (3T) al atacante que intente romperla." }
            ],
            strategy: "El mejor guardián defensivo para neutralizar ataques destructivos de Élites y Jefes, preparando combos simultáneamente mediante su Retribución Protectora."
        },
        {
            id: "terra",
            name: "Terra",
            element: "TIERRA",
            role: "Tanque Colosal / Provocación y Reflejo",
            emoji: "🤖",
            hp: 175,
            hpPerLevel: "+5% HP",
            atk: 12,
            atkPerLevel: "+5% ATQ",
            spd: 4,
            dodge: "0%",
            acc: "85%",
            crit: "5%",
            skills: [
                { name: "Ataque Básico", cd: 0, power: "1.0x ATQ", desc: "Golpe contundente con masa tectónica pesada." },
                { name: "Coraza de Espinas", cd: 2, power: "Reflejo 50%", desc: "Provocación absoluta: fuerza a todos los enemigos a atacarle, reduce 50% el daño recibido, devuelve el 50% al agresor y le adhiere 3 Marcas de Tierra." }
            ],
            strategy: "Insuperable absorbiendo castigo. Con baja velocidad, su coraza dura todo el ciclo de ataques enemigos protegiendo a los aliados frágiles."
        },
        {
            id: "zephyr",
            name: "Zephyr",
            element: "AIRE",
            role: "Iniciador Supersónico / Evasión y Críticos",
            emoji: "🤖",
            hp: 80,
            hpPerLevel: "+5% HP",
            atk: 22,
            atkPerLevel: "+5% ATQ",
            spd: 16,
            dodge: "25%",
            acc: "95%",
            crit: "15%",
            skills: [
                { name: "Ataque Básico", cd: 0, power: "1.0x ATQ", desc: "Corte aerodinámico de alta frecuencia con alta tasa crítica." },
                { name: "Ráfaga Cortante", cd: 2, power: "1.4x ATQ", desc: "Embestida ciclónica con prioridad absoluta: garantiza actuar en primer lugar en el turno de activación e inflige daño pesado de Aire con Marca de Aire (3T)." }
            ],
            strategy: "Domina el timeline de iniciativa. Su alta velocidad le permite rematar enemigos antes de que estos ejecuten sus turnos o aplicar marcas antes de que actúen los compañeros."
        }
    ],

    // -------------------------------------------------------------
    // 4. LOS 4 GRANDES ÉLITES ESPECIALES
    // -------------------------------------------------------------
    SPECIAL_ELITES: [
        {
            id: "coloso_sismico",
            name: "Coloso Sísmico",
            emoji: "🦍",
            element: "TIERRA",
            role: "Tanque Colosal // Control de Masas Total en Área",
            stats: { hp: "Muy Alto (~220+ Nv10)", atk: "28 Base (~39 Nv10)", spd: "3 (Muy Lento)", dodge: "0%" },
            skills: [
                {
                    name: "💥 Terremoto Cataclísmico (CD: 4 - Apertura Turno 1)",
                    desc: "Se ejecuta de inmediato en el Turno 1: Golpea a todos los rivales en área (1.2x daño), aplica ATURDIMIENTO (STUN) garantizado de 1 turno a todo el escuadrón aliado y estampa 3 Marcas de Tierra a cada objetivo."
                },
                {
                    name: "⚔️ Impacto Tectónico (CD: 0)",
                    desc: "Golpe frontal demoledor individual de 1.5x potencia con daño físico telúrico puro."
                }
            ],
            danger: "Apertura letal en Turno 1 con Stun masivo garantizado. Si no se purga o mitiga con barreras, deja al escuadrón indefenso.",
            recruitBenefit: "El controlador de masas supremo. Reclutarlo otorga la mejor apertura grupal para frenar hordas y preparar Cristalizaciones o Tormentas de Arena."
        },
        {
            id: "berserker_termico",
            name: "Berserker Térmico",
            emoji: "👹",
            element: "FUEGO",
            role: "Daño Hiper-Creciente // Amenaza Crítica en Agonía",
            stats: { hp: "Alto (~180+ Nv10)", atk: "30 Base (+Escala Agónica)", spd: "10 (Media)", dodge: "5%" },
            skills: [
                {
                    name: "🔥 Furia Sobrecalentada (Pasiva Continua)",
                    desc: "Todo el % de salud perdida se traduce en daño y crítico exponencial: +1.25% de Daño y +0.60% de Crítico por cada 1% de HP faltante. Genera un halo rojo neón creciente."
                },
                {
                    name: "⚔️ Tajo Incandescente (CD: 0)",
                    desc: "Ataque básico de fuego (1.2x) que amplifica brutalmente la furia agónica acumulada, logrando impactos de daño críticos masivos."
                }
            ],
            danger: "Dejarlo con vida residual (ej: 10-20% HP) provocará que su siguiente ataque destruya a cualquier robot aliado de un solo golpe crítico.",
            recruitBenefit: "El carry ofensivo más devastador contra Jefes Colosales de alta vida."
        },
        {
            id: "cyber_stalker",
            name: "Cyber-Stalker",
            emoji: "🥷",
            element: "AIRE",
            role: "Asesino Espectral // Evasión Absoluta y Ejecución",
            stats: { hp: "Bajo-Medio (~130 Nv10)", atk: "26 Base (~36 Nv10)", spd: "22+ (Supersónico)", dodge: "40% Base" },
            skills: [
                {
                    name: "👻 Desfase Cuántico (CD: 3 - Apertura Turno 1)",
                    desc: "Se ejecuta de inmediato en el Turno 1: Activa un escudo de desfase que eleva su Evasión al 100% durante 1 turno completo (inmunidad total a ataques directos)."
                },
                {
                    name: "🗡️ Tajo Asesino de Frecuencia (CD: 0)",
                    desc: "Ataque quirúrgico con multiplicador demoledor (1.8x - 2.2x) que ignora una gran porción de las barreras enemigas."
                }
            ],
            danger: "Ataca primero debido a su velocidad (SPD 22+), se vuelve intangible en turnos clave y neutraliza objetivos clave antes de que puedan defenderse.",
            recruitBenefit: "El mejor ejecutor quirúrgico para aniquilar amenazas antes de que lancen habilidades en área."
        },
        {
            id: "crio_centinela",
            name: "Crio-Centinela",
            emoji: "🧊",
            element: "AGUA",
            secondaryElement: "AIRE",
            role: "Controlador de Velocidad // Auto-Detonador de Combos",
            stats: { hp: "Alto (~190 Nv10)", atk: "20 Base (~28 Nv10)", spd: "7 (Media-Baja)", dodge: "5%" },
            skills: [
                {
                    name: "❄️ Ventisca Cero Absoluto (CD: 3 - Apertura Turno 1)",
                    desc: "Se ejecuta de inmediato en el Turno 1: Ataque de hielo en área a todo el escuadrón: reduce la velocidad de todos los enemigos a 1 (SPD = 1) por 2 turnos y adhiere 3 Marcas de Agua."
                },
                {
                    name: "💨 Ráfaga Gélida (Básico Tipo Aire)",
                    desc: "Ataque clasificado como elemento Aire (1.0x). Al impactar sobre objetivos con su propia Marca de Agua previa, ¡detona automáticamente el combo de VENTISCA! (1.35x daño + Congelación)."
                }
            ],
            danger: "Arrebata por completo la iniciativa del combate congelando a todo tu escuadrón al fondo de la ronda mientras detona sus propios combos.",
            recruitBenefit: "Autosuficiencia táctica: ralentiza a todos los enemigos y activa combos de Ventisca sin necesitar ayuda de otros robots de Aire."
        }
    ],

    // -------------------------------------------------------------
    // 5. ENEMIGOS REGULARES, JEFES Y SIRVIENTES
    // -------------------------------------------------------------
    REGULAR_ENEMIES: [
        { name: "Dron Kamikaze", icon: "💣", elem: "FUEGO / NEUTRO", desc: "Sonda de alta velocidad con microprocesador suicida que detona causando daño masivo si no es eliminado a tiempo." },
        { name: "Baluarte Tectónico", icon: "🗿", elem: "TIERRA", desc: "Gólem mecanizado que proyecta barreras defensivas sobre sus aliados y absorbe fuego concentrado." },
        { name: "Nanocirujano", icon: "💉", elem: "AGUA", desc: "Dron médico autónomo que regenera vida a unidades heridas y purga estados alterados como Quemadura." },
        { name: "Inhibidor Glitch", icon: "📡", elem: "AIRE / NEUTRO", desc: "Unidad de guerra electrónica que desincroniza cooldowns de habilidades e inflige ceguera en los sensores." },
        { name: "Drenador de Plasma", icon: "🩸", elem: "AGUA / TIERRA", desc: "Androide con bombas de vacío que se repara absorbiendo un porcentaje del daño asestado a tu escuadrón." },
        { name: "Francotirador Gauss", icon: "🎯", elem: "FUEGO / AIRE", desc: "Torreta bípeda que telegrafía un disparo perforante con 100% de precisión y alta probabilidad crítica." },
        { name: "Mímico Prisma", icon: "🔮", elem: "ADAPTABLE", desc: "Núcleo camaleónico que muta su elemento nativo al elemento que tiene ventaja sobre quien lo ataca." },
        { name: "Matriz Comandante", icon: "🛰️", elem: "FUEGO / NEUTRO", desc: "Baliza táctica que otorga +25% de ATQ pasivo a todo su bando y puede desplegar refuerzos menores." }
    ],

    BOSSES: [
        {
            name: "TITAN-X",
            title: "Coloso Defensor del Núcleo (Torre 1 - Piso 10)",
            icon: "👑",
            element: "FUEGO",
            stats: "350 HP Base (~507 HP en Nivel 10) // 26 ATQ Base (~37 Nv10) // VEL: 3 // ESQ: 10% // PREC: 100% // CRÍT: 12%",
            partyBattle: "Combate 3v3 contra TITAN-X asistido por 2 sirvientes: 🪼 Ciber-Medusa y 🛰️ Drone Catalizador.",
            skills: [
                "Golpe Titánico (CD 0): 1.4x Daño ígneo penetrante con sacudida térmica.",
                "Pulso PEM Titánico (CD 3): 0.8x Daño en área a todo el escuadrón, destruye todas las barreras y escudos activos.",
                "Protocolo Exterminio (CD 4): 2.2x Daño térmico balístico infalible (fijación absoluta: ignora evasión y no puede fallar)."
            ],
            reward: "Desbloquea la Llave Cuántica 🔑 hacia la Torre 2 y garantiza 1 Arma Legendaria Dorada 👑 + 500 XP fija."
        },
        {
            name: "TITAN-OMEGA",
            title: "Núcleo Cuántico Supremo (Torre 2 - Piso 20)",
            icon: "⚛️",
            element: "NEUTRO",
            stats: "420 HP Base (~819 HP en Nivel 20) // 28 ATQ Base (~54 Nv20) // VEL: 5 // ESQ: 12% // PREC: 100% // CRÍT: 15%",
            partyBattle: "Combate 3v3 contra el núcleo cuántico potenciado y drones centinelas de soporte.",
            skills: [
                "Golpe Cuántico: 1.5x Daño electromagnético puro.",
                "Sobrecarga Cuántica (CD 3): 1.0x Daño en área que destruye escudos y aplica Rompearmaduras (-25% Def).",
                "Protocolo Aniquilación (CD 4): 2.5x Daño devastador infalible con sacudida dimensional."
            ],
            reward: "Desbloquea la Llave de Singularidad 🗝️ hacia la Torre 3 y garantiza 1 Arma Legendaria Dorada 👑 + 500 XP fija."
        },
        {
            name: "SINGULARIDAD-ZERO",
            title: "La Entidad Absoluta (Torre 3 - Piso 30)",
            icon: "🌌",
            element: "NEUTRO",
            stats: "500 HP Base (~1225 HP en Nivel 30) // 32 ATQ Base (~78 Nv30) // VEL: 8 // ESQ: 15% // PREC: 100% // CRÍT: 20%",
            partyBattle: "El encuentro final de la campaña 3v3 en el vórtice de singularidad.",
            skills: [
                "Colapso Gravitatorio: 1.6x Daño por aplastamiento dimensional.",
                "Tormenta del Vacío (CD 3): 1.2x Daño en área total, purga barreras y deja conmoción.",
                "Protocolo Singularidad (CD 4): 3.0x Daño cataclísmico garantizado absoluto."
            ],
            reward: "Victoria Suprema de la Campaña: Certificado de Incursión Completa y acceso al Salón de la Fama."
        },
        {
            name: "Pyro-Leviathan",
            title: "Jefe Regional Aleatorio (Torres 1 y 2)",
            icon: "🐲",
            element: "FUEGO",
            stats: "Dragón de fusión reactivo",
            skills: [
                "Inunda la arena con Quemadura global y gana +10% ATQ permanente con cada golpe no acuático recibido."
            ],
            reward: "Arma Forjada +1 de Fuego / Botín Élite."
        },
        {
            name: "Abyssal-Kraken",
            title: "Jefe Regional Aleatorio (Torres 1 y 2)",
            icon: "🐙",
            element: "AGUA",
            stats: "Marea cibernética subacuática",
            skills: [
                "Desata Tsunamis hidrodinámicos que ralentizan en área y proyecta triples barreras de plasma."
            ],
            reward: "Arma Forjada +1 de Agua / Botín Élite."
        },
        {
            name: "Tectón-9000",
            title: "Jefe Regional Aleatorio (Torres 1 y 2)",
            icon: "🏔️",
            element: "TIERRA",
            stats: "Fortaleza móvil blindada",
            skills: [
                "Blindaje de 100 HP y Cataclismo Telúrico telegrafiado con 60% de probabilidad de aturdimiento grupal."
            ],
            reward: "Arma Forjada +1 de Tierra / Botín Élite."
        },
        {
            name: "Cyclone-Valkyrie",
            title: "Jefe Regional Aleatorio (Torres 1 y 2)",
            icon: "🦅",
            element: "AIRE",
            stats: "Caza supersónico",
            skills: [
                "Velocidad 25 con 40% de evasión constante; desordena por completo la cola del timeline."
            ],
            reward: "Arma Forjada +1 de Aire / Botín Élite."
        }
    ],

    BOSS_MINIONS: [
        {
            id: "ciber_medusa",
            name: "Ciber-Medusa",
            emoji: "🪼",
            element: "AGUA",
            role: "Sirviente Táctico // Control de Velocidad y Aplicador de Agua",
            stats: { hp: "95 Base (~137 Nv10)", atk: "12 Base (~17 Nv10)", spd: "10 (Rápida)", dodge: "5%", acc: "95%", crit: "5%" },
            skills: [
                {
                    name: "🌊 Salpicadura Corrosiva (CD: 3 - Turno 1 Inmediato)",
                    desc: "Ataque en área (AoE) de 0.75x a todo el escuadrón aliado. Aplica Marca de Agua (3 turnos) y Ralentización (-50% SPD por 1 turno). Prepara combos de Vaporización 1.5x para TITAN-X."
                },
                {
                    name: "💧 Chorro de Hidro-Plasma (CD: 0)",
                    desc: "Disparo individual de 1.0x potencia de daño directo de Agua que renueva la Marca de Agua (3 turnos)."
                }
            ],
            strategy: "Actúa antes que TITAN-X (SPD 10 vs 3) para inundar a tu escuadrón con Marcas de Agua, permitiendo que TITAN-X detone Vaporizaciones brutales de 1.5x daño."
        },
        {
            id: "drone_catalizador",
            name: "Drone Catalizador",
            emoji: "🛰️",
            element: "NEUTRO",
            role: "Sirviente Táctico // Soporte Defensivo y Amplificador Térmico",
            stats: { hp: "85 Base (~123 Nv10)", atk: "10 Base (~14 Nv10)", spd: "10 (Rápida)", dodge: "0%", acc: "100%", crit: "0%" },
            skills: [
                {
                    name: "🛡️ Matriz de Escudo Térmico (CD: 3 - Activa en Turno 2)",
                    desc: "Proyecta sobre TITAN-X un Escudo de Plasma del 20% de su HP Máximo (~101 HP de escudo) y le otorga el estado de Sobrealimentación Térmica (+20% ATQ) durante 2 turnos."
                },
                {
                    name: "🎯 Láser de Fijación (CD: 0)",
                    desc: "Disparo balístico individual de 0.9x con 25% de probabilidad de aplicar Rompearmaduras (-25% DEF por 2 turnos) al objetivo aliado."
                }
            ],
            strategy: "Prioridad táctica de eliminación: destruirlo rápido evita que proyecte escudos sobre TITAN-X ni aumente su poder de ataque."
        }
    ],

    // -------------------------------------------------------------
    // 6. ARMAS, CHIPS Y SUMINISTROS
    // -------------------------------------------------------------
    WEAPONS: [
        {
            id: "daga",
            name: "Daga Cibernética",
            icon: "🗡️",
            basePassive: "25% de probabilidad de asestar un segundo ataque consecutivo en el mismo turno.",
            upgradedPassive: "40% de probabilidad de doble ataque consecutivo en el mismo turno.",
            scrapValue: "+20 ⚙️ al desmantelar",
            affinityBonus: "Afinidad Especializada según Elemento: Fuego (+15% ATQ / +15% a Marcados), Agua (+15% HP / +25% Escudos), Tierra (+25% HP / -10% Daño recibido), Aire (+15% ATQ, +2 VEL, +10% Esquiva)."
        },
        {
            id: "hacha",
            name: "Hacha de Plasma",
            icon: "🪓",
            basePassive: "+10% ATQ base pasivo, 20% prob. de Rompearmaduras (-25% Def, 2T) y perfora el 50% de barreras enemigas. Verdugo: +35% Daño a enemigos con ≤40% HP.",
            upgradedPassive: "Perfora el 75% de defensas y barreras. Verdugo Potenciado: +45% Daño a enemigos con ≤40% HP. Conserva el +10% ATQ y 20% Rompearmaduras.",
            scrapValue: "+20 ⚙️ al desmantelar",
            affinityBonus: "Afinidad Especializada según Elemento: Fuego (+15% ATQ / +15% a Marcados), Agua (+15% HP / +25% Escudos), Tierra (+25% HP / -10% Daño recibido), Aire (+15% ATQ, +2 VEL, +10% Esquiva)."
        },
        {
            id: "baculo",
            name: "Báculo Nanotécnico",
            icon: "🪄",
            basePassive: "Repara automáticamente un 5% del HP Máximo del portador al final de cada turno (potenciado por afinidad de Agua).",
            upgradedPassive: "Repara un 7% del HP Máximo del portador + cura un 5% HP al aliado más herido. 20% de probabilidad de reducir 1 turno de Cooldown a una habilidad propia o aliada.",
            scrapValue: "+20 ⚙️ al desmantelar",
            affinityBonus: "Afinidad Especializada según Elemento: Fuego (+15% ATQ / +15% a Marcados), Agua (+15% HP / +25% Escudos), Tierra (+25% HP / -10% Daño recibido), Aire (+15% ATQ, +2 VEL, +10% Esquiva)."
        },
        {
            id: "espada",
            name: "Espada Energizada",
            icon: "⚔️",
            basePassive: "+15% Daño base pasivo y +10% de Golpe Crítico en ataques básicos. Críticos activan Racha (+10% ATQ temporal).",
            upgradedPassive: "+30% Daño base pasivo y +20% de Golpe Crítico en ataques básicos. Críticos activan Racha (+10% ATQ temporal).",
            scrapValue: "+20 ⚙️ al desmantelar",
            affinityBonus: "Afinidad Especializada según Elemento: Fuego (+15% ATQ / +15% a Marcados), Agua (+15% HP / +25% Escudos), Tierra (+25% HP / -10% Daño recibido), Aire (+15% ATQ, +2 VEL, +10% Esquiva)."
        },
        {
            id: "legendaria",
            name: "Armas Doradas Legendarias",
            icon: "👑",
            basePassive: "Afinidad Universal: Otorga +25% ATQ y +15% HP Máximo a cualquier robot sin importar su elemento nativo.",
            upgradedPassive: "1.15x Daño Universal sin desventajas elementales. Al forjarse a +1 suma +20% de Golpe Crítico adicional. Otorga +100 ⚙️ al desmantelar.",
            scrapValue: "+100 ⚙️ al desmantelar",
            affinityBonus: "Afinidad Universal Automática: Se activa con cualquier robot (Fuego, Agua, Tierra o Aire), otorgando +25% ATQ Base y +15% HP Máximo."
        }
    ],

    CHIPS: [
        {
            id: "chip_fuego",
            name: "Chip de Fuego",
            icon: "💾",
            element: "FUEGO",
            skillName: "Lanzallamas",
            cd: 3,
            power: "2.0x ATQ",
            desc: "Dispara una ráfaga abrasadora que aplica Marca de Fuego (3T). Permite preparar Tormentas Ígneas o detonar Vaporizaciones con robots de otro elemento nativo."
        },
        {
            id: "chip_agua",
            name: "Chip de Agua",
            icon: "💾",
            element: "AGUA",
            skillName: "Geyser",
            cd: 3,
            power: "2.0x ATQ",
            desc: "Torrente de alta presión que adhiere Marca de Agua (3T). Habilita combinaciones híbridas de Lodo o Ventisca sin requerir un robot de agua inicial."
        },
        {
            id: "chip_tierra",
            name: "Chip de Tierra",
            icon: "💾",
            element: "TIERRA",
            skillName: "Fisura",
            cd: 3,
            power: "2.0x ATQ",
            desc: "Quiebre tectónico contundente que aplica Marca de Tierra (3T). Prepara combos de Cristalización o Erosión."
        },
        {
            id: "chip_aire",
            name: "Chip de Aire",
            icon: "💾",
            element: "AIRE",
            skillName: "Tornado",
            cd: 3,
            power: "2.0x ATQ",
            desc: "Ciclón cortante que adhiere Marca de Aire (3T). Abre paso a Deflagraciones explosivas o Colapsos Sísmicos."
        }
    ],

    CONSUMABLES: [
        {
            id: "nanobots",
            name: "Kit de Nanobots",
            icon: "🩹",
            timing: "Fuera de combate (Mochila)",
            effect: "Repara instantáneamente un 40% del HP Máximo de cualquier robot del escuadrón.",
            marketPrice: "25 ⚙️ (21 ⚙️ con descuento)"
        },
        {
            id: "pem",
            name: "Bomba PEM",
            icon: "💥",
            timing: "En combate (Gasta el turno)",
            effect: "Sobrecarga electromagnética que deja al enemigo Aturdido (STUN) durante 1 turno completo.",
            marketPrice: "25 ⚙️ (21 ⚙️ con descuento)"
        },
        {
            id: "overcharge",
            name: "Núcleo de Sobrecarga",
            icon: "🔋",
            timing: "En combate (Acción Gratuita / No gasta turno)",
            effect: "Reduce instantáneamente 1 turno de Cooldown a todas las habilidades del robot activo.",
            marketPrice: "25 ⚙️ (21 ⚙️ con descuento)"
        }
    ],

    // -------------------------------------------------------------
    // 7. LOS 21 EVENTOS MISTERIOSOS (TERMINALES NARRATIVAS)
    // -------------------------------------------------------------
    MYSTERY_EVENTS: [
        {
            id: 1,
            title: "Tragamonedas Rota",
            icon: "🎰",
            desc: "Una máquina expendedora blindada averiada que parpadea invitando a apostar chatarra.",
            options: [
                { text: "Apostar 20 Chatarra (Requiere ≥20 ⚙️)", result: "50% Éxito: 1 Arma base aleatoria // 50% Fallo: Pierdes los 20 ⚙️ sin botín." },
                { text: "Ignorar la máquina", result: "Sin costo ni consecuencias." }
            ]
        },
        {
            id: 2,
            title: "Mercenario Moribundo",
            icon: "🤖",
            desc: "Un autómata aliado con el blindaje desgarrado solicita refacciones urgentes para no apagarse.",
            options: [
                { text: "Ayudar (Cuesta 30 Chatarra)", result: "100% Garantizado: Te entrega 1 Arma base aleatoria como muestra de agradecimiento." },
                { text: "Robarle piezas", result: "100% Garantizado: Cosechas sus restos y ganas +20 ⚙️ Chatarra." }
            ]
        },
        {
            id: 3,
            title: "Altar de Cristal",
            icon: "🔮",
            desc: "Un monolito ancestral alimentado por pulsos electromagnéticos que ofrece poder a cambio de energía biológica.",
            options: [
                { text: "Tocar el Altar (-20% HP a todo el equipo)", result: "Todo el escuadrón activo pierde el 20% de HP Máx (mínimo 1 HP). Recibes 1 🔋 Núcleo de Sobrecarga." },
                { text: "Ignorar el monolito", result: "Te retiras con la salud intacta." }
            ]
        },
        {
            id: 4,
            title: "Charco de Ácido",
            icon: "🧪",
            desc: "Una fisura en tuberías industriales derrama un químico corrosivo que anega el pasillo principal.",
            options: [
                { text: "Cruzar corriendo (-15% HP al líder)", result: "El robot en cabeza sufre un 15% de daño de HP Máx para cruzar rápidamente." },
                { text: "Rodear por un ducto alterno", result: "Ruta segura sin daño ni pérdida de recursos." }
            ]
        },
        {
            id: 5,
            title: "Datos Encriptados",
            icon: "💾",
            desc: "Un mainframe militar abandonado cuyos discos duros aún contienen bancos de datos tácticos.",
            options: [
                { text: "Descargar Datos (+200 XP al activo)", result: "100% Garantizado: El robot activo recibe +200 XP de combate." },
                { text: "Desguazar el servidor (+15 Chatarra)", result: "100% Garantizado: Extraes componentes valiosos y ganas +15 ⚙️." }
            ]
        },
        {
            id: 6,
            title: "El Nómada",
            icon: "🧥",
            desc: "Un comerciante clandestino con túnica aislante ofrece un contenedor hermético sellado.",
            options: [
                { text: "Comprar Objeto Secreto (Cuesta 30 ⚙️)", result: "100% Garantizado: Recibes 1 artículo aleatorio (57% Chip Elemental / 43% Consumible)." },
                { text: "Declinar la oferta", result: "El nómada se desvanece en las sombras." }
            ]
        },
        {
            id: 7,
            title: "Emboscada Sensorial",
            icon: "🚨",
            desc: "Una baliza de disuasión emite un chirrido ultrasónico que sobrecarga los procesadores del escuadrón.",
            options: [
                { text: "Apagar Módulo Sensorial (-30% HP activo)", result: "El robot activo sufre 30% de daño de HP Máx por la onda sónica." },
                { text: "Sobrecargar circuitos (Cuesta 10 ⚙️)", result: "Aíslas los sensores pagando 10 ⚙️ y sales ileso sin daño." }
            ]
        },
        {
            id: 8,
            title: "Fábrica de Chips",
            icon: "🏭",
            desc: "Una estación automatizada de ensamblaje con nanolitografía lista para imprimir un microchip.",
            options: [
                { text: "Imprimir Chip Elemental", result: "100% Garantizado: Obtienes 1 Chip Elemental aleatorio (25% Fuego, 25% Agua, 25% Tierra, 25% Aire)." }
            ]
        },
        {
            id: 9,
            title: "Repuestos Militares",
            icon: "📦",
            desc: "Un cajón reforzado con cerrojo biométrico que contiene pertrechos bélicos intactos.",
            options: [
                { text: "Forzar Cerradura (-10% HP activo)", result: "El robot activo sufre 10% de daño por la descarga del cerrojo, pero obtienes 1 Arma base aleatoria." },
                { text: "Dejar el contenedor", result: "Continúas la marcha sin percances." }
            ]
        },
        {
            id: 10,
            title: "Cápsula de Curación",
            icon: "🩹",
            desc: "Una cámara médica estéril con suministro residual de nanorobots reparadores de chasis.",
            options: [
                { text: "Activar Protocolo Médico (+50% HP a todos)", result: "100% Garantizado: Todo el escuadrón activo se repara un 50% de su salud máxima." }
            ]
        },
        {
            id: 11,
            title: "Ruleta Rusa Robótica",
            icon: "🔫",
            desc: "Un autómata corrompido desafía a tu escuadrón a un juego de alta tensión electromagnética.",
            options: [
                { text: "Aceptar Reto de Alta Tensión", result: "50% Éxito: Ganas el bote de +50 ⚙️ Chatarra // 50% Fallo: El robot activo sufre 50% de daño de HP Máx." },
                { text: "Rechazar el reto", result: "Te alejas del demente sin sufrir represalias." }
            ]
        },
        {
            id: 12,
            title: "Campo Magnético",
            icon: "🧲",
            desc: "Una bobina de inducción rota genera un poderoso campo electroimán que retiene las placas metálicas.",
            options: [
                { text: "Sacrificar 1 Arma de la Mochila", result: "Requiere ≥1 arma en mochila. Desprendes un arma para anular la atracción y sales ileso." },
                { text: "Forzar Salida con Propulsores (-25% HP a todos)", result: "Todo el escuadrón activo sufre un 25% de daño estructural para romper la tracción magnética." }
            ]
        },
        {
            id: 13,
            title: "Oasis Cibernético",
            icon: "🌴",
            desc: "Un invernadero geotérmico protegido de la intemperie y de las patrullas enemigas.",
            options: [
                { text: "Descansar en el Oasis (+20% HP a todos)", result: "100% Garantizado: Todos los robots aliados recuperan un 20% de su HP Máximo." },
                { text: "Cosechar Piezas (+20 Chatarra)", result: "100% Garantizado: Recolectas cables de cobre y chatarra por +20 ⚙️." }
            ]
        },
        {
            id: 14,
            title: "Actualización de Firmware",
            icon: "⚡",
            desc: "Un terminal corporativo que ofrece flashear un firmware no homologado con prestaciones militares.",
            options: [
                { text: "Instalar Firmware (Sube 1 Nivel, -25% HP)", result: "100% Garantizado: El robot activo sube 1 nivel completo al instante, pero sufre 25% de daño por sobretensión." },
                { text: "Ignorar la consola", result: "Evitas alterar el microcódigo de tus procesadores." }
            ]
        },
        {
            id: 15,
            title: "Portal Dimensional",
            icon: "🌀",
            desc: "Una anomalía cuántica circular que oscila distorsionando la luz del pasillo.",
            options: [
                { text: "Introducir Manipulador en el Vórtice", result: "30% Éxito: Extraes 1 Arma Mejorada (+1) // 70% Fallo: Descarga de radiación que inflige 20% HP al robot activo." },
                { text: "Cerrar la compuerta", result: "Te apartas de la inestabilidad cuántica." }
            ]
        },
        {
            id: 16,
            title: "Mina Terrestre",
            icon: "💥",
            desc: "¡Click! El sensor de presión bajo la suela del robot activo ha armado un artefacto antitanque.",
            options: [
                { text: "Salto de Evasión (50% Suerte)", result: "50% Éxito: Esquiva acrobática ilesa (0 daño) // 50% Fallo: Explosión brutal de 40% de HP Máx." },
                { text: "Interponer 1 Arma de la Mochila", result: "Requiere ≥1 arma en mochila. Detonas la mina usando un arma como escudo; sales ileso sin daño." }
            ]
        },
        {
            id: 17,
            title: "Refugiado",
            icon: "🧹",
            desc: "Un pequeño dron limpiador no bélico se oculta asustado bajo una consola pidiendo protección.",
            options: [
                { text: "Proteger y Escortar (+100 XP a todos)", result: "100% Garantizado: Tu escuadrón aprende de la cartografía del dron ganando +100 XP cada uno." },
                { text: "Desguazarlo por Repuestos (+15 Chatarra)", result: "100% Garantizado: Desmantelas la unidad pacífica para obtener +15 ⚙️ Chatarra." }
            ]
        },
        {
            id: 18,
            title: "Armería Antigua",
            icon: "🏛️",
            desc: "Una vitrina blindada de titanio sellada con un dispensador de pago electromagnético.",
            options: [
                { text: "Pagar Acceso (Cuesta 40 Chatarra)", result: "Requiere ≥40 ⚙️. 100% Garantizado: La compuerta se abre entregando 2 Armas base aleatorias." },
                { text: "Seguir adelante", result: "Dejas atrás el arsenal blindado." }
            ]
        },
        {
            id: 19,
            title: "Lluvia de Meteoros",
            icon: "☄️",
            desc: "Fragmentos en llamas de satélites desorbitados impactan en el domo acristalado del sector.",
            options: [
                { text: "Buscar Refugio Inmediato", result: "100% Seguro: El escuadrón se guarece sin sufrir ningún rasguño." },
                { text: "Rastrear Cráteres de Impacto", result: "50% Éxito: Encuentras 1 Chip Elemental intacto // 50% Fallo: Esquirlas impactan al equipo (-10% HP a todos)." }
            ]
        },
        {
            id: 20,
            title: "Entidad Digital",
            icon: "🤖",
            desc: "Un holograma de una IA precursora emerge del suelo formulando un dilema cibernético.",
            options: [
                { text: "Pedir Conocimiento (+300 XP al activo)", result: "100% Garantizado: Transmite algoritmos avanzados otorgando +300 XP al robot líder." },
                { text: "Pedir Poder Bélico (1 Arma aleatoria)", result: "100% Garantizado: Materializa 1 Arma base en tu inventario." }
            ]
        },
        {
            id: 21,
            title: "Chatarrero de Androides Caídos",
            icon: "♻️",
            desc: "Un camión recolector automatizado ofrece desmantelar restos de unidades caídas del escuadrón.",
            options: [
                { text: "Reciclar Robots Desactivados", result: "Requiere ≥1 robot muerto y ≥1 robot vivo. Purga a los caídos, devuelve sus armas/chips y da +15 ⚙️ por robot." },
                { text: "Conservar Carcasas para el Taller", result: "Mantienes los chasis en reserva para intentar repararlos en campamentos." }
            ]
        }
    ],

    // -------------------------------------------------------------
    // 8. LAS 50 HABILIDADES PASIVAS (ÁRBOL DE TALENTOS)
    // -------------------------------------------------------------
    SKILLS_TREE: [
        // RAMA 1: PROTOCOLO ASALTO (13 pasivas)
        { id: "atk_up_1", name: "Calibración de Potencia I", branch: "assault", branchName: "Protocolo Asalto", tier: 1, cost: 100, prereq: null, desc: "Aumenta el ATQ de todos los aliados en un +5%.", modifier: "atk_pct: 0.05", synergy: "Incrementa el daño de ataques básicos y habilidades especiales." },
        { id: "atk_up_2", name: "Calibración de Potencia II", branch: "assault", branchName: "Protocolo Asalto", tier: 2, cost: 200, prereq: "atk_up_1", desc: "Aumenta el ATQ de todos los aliados en un +10% adicional (+15% acumulado).", modifier: "atk_pct: 0.10", synergy: "Acumulativo con Calibración I." },
        { id: "atk_up_3", name: "Calibración de Potencia III", branch: "assault", branchName: "Protocolo Asalto", tier: 3, cost: 375, prereq: "atk_up_2", desc: "Aumenta el ATQ de todos los aliados en un +15% adicional (+30% total acumulado).", modifier: "atk_pct: 0.15", synergy: "Bono colosal de daño puro para todo el escuadrón." },
        { id: "crit_rate_1", name: "Sensores Ópticos I", branch: "assault", branchName: "Protocolo Asalto", tier: 1, cost: 125, prereq: null, desc: "+3% de Probabilidad de Impacto Crítico en ataques básicos.", modifier: "crit_rate: 3", synergy: "Afecta los golpes básicos de todos los combatientes aliados." },
        { id: "crit_rate_2", name: "Sensores Ópticos II", branch: "assault", branchName: "Protocolo Asalto", tier: 2, cost: 225, prereq: "crit_rate_1", desc: "+5% de Probabilidad Crítica adicional (+8% total).", modifier: "crit_rate: 5", synergy: "Acumulativo. Vital para composiciones basadas en Espadas." },
        { id: "crit_rate_3", name: "Sensores Ópticos III", branch: "assault", branchName: "Protocolo Asalto", tier: 3, cost: 400, prereq: "crit_rate_2", desc: "+7% de Probabilidad Crítica adicional (+15% total extra).", modifier: "crit_rate: 7", synergy: "Permite asestar impactos críticos con frecuencia demoledora." },
        { id: "crit_dmg_1", name: "Sobrecarga Crítica I", branch: "assault", branchName: "Protocolo Asalto", tier: 2, cost: 250, prereq: "crit_rate_1", desc: "Los golpes críticos infligen un +15% de daño extra (Total 1.65x).", modifier: "crit_dmg_pct: 0.15", synergy: "Amplifica la recompensa de los impactos de precisión." },
        { id: "crit_dmg_2", name: "Sobrecarga Crítica II", branch: "assault", branchName: "Protocolo Asalto", tier: 3, cost: 450, prereq: "crit_dmg_1", desc: "Los golpes críticos infligen un +25% adicional (Total 1.90x).", modifier: "crit_dmg_pct: 0.25", synergy: "Casi duplica el daño en cada impacto crítico conectado." },
        { id: "acc_up_1", name: "Algoritmo de Puntería I", branch: "assault", branchName: "Protocolo Asalto", tier: 1, cost: 100, prereq: null, desc: "+5% de Precisión en todos los ataques del escuadrón.", modifier: "acc: 5", synergy: "Reduce fallos contra enemigos con alta tasa de esquiva." },
        { id: "acc_up_2", name: "Algoritmo de Puntería II", branch: "assault", branchName: "Protocolo Asalto", tier: 2, cost: 200, prereq: "acc_up_1", desc: "+10% de Precisión adicional (+15% acumulado).", modifier: "acc: 10", synergy: "Asegura impactos consistentes eliminando el factor de fallo." },
        { id: "dagger_mastery", name: "Dagas de Frecuencia", branch: "assault", branchName: "Protocolo Asalto", tier: 3, cost: 350, prereq: "atk_up_2", desc: "+10% de probabilidad de ataque doble al portar Dagas (hasta 35% base o 50% con +1).", modifier: "dagger_double_chance: 0.10", synergy: "Convierte a las dagas en armas con 1 de cada 2 ataques duplicados." },
        { id: "axe_mastery", name: "Hachas de Plasma", branch: "assault", branchName: "Protocolo Asalto", tier: 3, cost: 350, prereq: "atk_up_2", desc: "Las Hachas perforan un +15% de defensas y barreras enemigas adicional.", modifier: "axe_penetration: 0.15", synergy: "Perfora 65% de barreras (o 90% con hachas forjadas a +1)." },
        { id: "sword_mastery", name: "Filos Energizados", branch: "assault", branchName: "Protocolo Asalto", tier: 4, cost: 550, prereq: "atk_up_3", desc: "Las Espadas otorgan un +10% de daño base y +5% de crítico adicional.", modifier: "sword_bonus_dmg: 0.10, sword_bonus_crit: 5", synergy: "Corona a la Espada como el arma suprema de daño puro." },

        // RAMA 2: BLINDAJE ESTRUCTURAL (13 pasivas)
        { id: "hp_up_1", name: "Aleación Reforzada I", branch: "defense", branchName: "Blindaje Estructural", tier: 1, cost: 100, prereq: null, desc: "Aumenta el HP Máximo de todos los aliados en un +10%.", modifier: "hp_pct: 0.10", synergy: "Mayor margen de supervivencia ante emboscadas tempranas." },
        { id: "hp_up_2", name: "Aleación Reforzada II", branch: "defense", branchName: "Blindaje Estructural", tier: 2, cost: 200, prereq: "hp_up_1", desc: "Aumenta el HP Máximo de todos los aliados en un +15% adicional (+25% total).", modifier: "hp_pct: 0.15", synergy: "Incrementa significativamente la reserva de vida del escuadrón." },
        { id: "hp_up_3", name: "Aleación Reforzada III", branch: "defense", branchName: "Blindaje Estructural", tier: 3, cost: 375, prereq: "hp_up_2", desc: "Aumenta el HP Máximo de todos los aliados en un +20% adicional (+45% total acumulado).", modifier: "hp_pct: 0.20", synergy: "Permite soportar ataques devastadores de jefes como el Pulso PEM." },
        { id: "dodge_up_1", name: "Propulsores de Evasión I", branch: "defense", branchName: "Blindaje Estructural", tier: 1, cost: 125, prereq: null, desc: "+3% de Probabilidad de Esquiva para todo el escuadrón.", modifier: "dodge: 3", synergy: "Oportunidad de anular por completo ataques enemigos sin daño." },
        { id: "dodge_up_2", name: "Propulsores de Evasión II", branch: "defense", branchName: "Blindaje Estructural", tier: 2, cost: 225, prereq: "dodge_up_1", desc: "+5% de Probabilidad de Esquiva adicional (+8% total).", modifier: "dodge: 5", synergy: "Excelente sinergia con unidades veloces como Zephyr." },
        { id: "dodge_up_3", name: "Propulsores de Evasión III", branch: "defense", branchName: "Blindaje Estructural", tier: 3, cost: 400, prereq: "dodge_up_2", desc: "+7% de Probabilidad de Esquiva adicional (+15% total extra).", modifier: "dodge: 7", synergy: "Alcanza hasta un 40% de esquiva pasiva en unidades de Aire." },
        { id: "barrier_boost", name: "Blindaje de Plasma", branch: "defense", branchName: "Blindaje Estructural", tier: 2, cost: 275, prereq: "hp_up_1", desc: "Las Barreras protectoras duran +1 turno adicional antes de disiparse.", modifier: "barrier_extra_duration: 1", synergy: "Extiende la Barrera de Plasma de Aqua a 3 turnos activos." },
        { id: "staff_mastery", name: "Báculos de Regeneración", branch: "defense", branchName: "Blindaje Estructural", tier: 3, cost: 325, prereq: "hp_up_2", desc: "Los Báculos regeneran un +2% extra del HP Máximo al final del turno.", modifier: "staff_extra_heal: 0.02", synergy: "Eleva la curación pasiva a 7% (o 9% con báculos +1)." },
        { id: "defend_boost", name: "Modo Fortaleza", branch: "defense", branchName: "Blindaje Estructural", tier: 2, cost: 225, prereq: "hp_up_1", desc: "La acción de Defender reduce el daño recibido un 10% adicional (60% mitigación total).", modifier: "defend_bonus_reduction: 0.10", synergy: "Convierte la defensa en una herramienta clave ante golpes anunciados de Jefes." },
        { id: "first_aid_core", name: "Nanobots de Emergencia", branch: "defense", branchName: "Blindaje Estructural", tier: 3, cost: 375, prereq: "hp_up_2", desc: "Todas las curaciones recibidas por el escuadrón aumentan un +25%.", modifier: "healing_received_pct: 0.25", synergy: "Potencia kits médicos, talleres de reparación y báculos." },
        { id: "revive_resilience", name: "Protocolo Lázaro", branch: "defense", branchName: "Blindaje Estructural", tier: 3, cost: 350, prereq: "hp_up_2", desc: "Al revivir un robot en el campamento, reaparece con 25% HP en vez de 10%.", modifier: "revive_hp_pct: 0.25", synergy: "Reincorporación segura sin riesgo de caída inmediata en el siguiente piso." },
        { id: "burn_resist", name: "Disipadores Térmicos", branch: "defense", branchName: "Blindaje Estructural", tier: 2, cost: 225, prereq: "hp_up_1", desc: "Reduce el daño sufrido por Quemaduras enemigas en un 30%.", modifier: "burn_damage_reduction: 0.30", synergy: "Contrarresta la letalidad de Pyro-Leviathan y robots de Fuego." },
        { id: "stun_resist", name: "Firmeza Giroscópica", branch: "defense", branchName: "Blindaje Estructural", tier: 4, cost: 500, prereq: "hp_up_3", desc: "25% de probabilidad de ignorar por completo los aturdimientos enemigos.", modifier: "stun_resist_chance: 0.25", synergy: "Evita la pérdida crítica de turnos ante Colosos Sísmicos y Bombas PEM." },

        // RAMA 3: SINTONÍA ELEMENTAL (12 pasivas)
        { id: "elem_fire_up", name: "Condensadores Ígneos", branch: "elemental", branchName: "Sintonía Elemental", tier: 1, cost: 125, prereq: null, desc: "+15% de daño infligido con habilidades y ataques de FUEGO.", modifier: "elem_boost_FUEGO: 0.15", synergy: "Potencia a Ignis y chips de Lanzallamas." },
        { id: "elem_water_up", name: "Bombas Hidráulicas", branch: "elemental", branchName: "Sintonía Elemental", tier: 1, cost: 125, prereq: null, desc: "+15% de daño infligido con habilidades y ataques de AGUA.", modifier: "elem_boost_AGUA: 0.15", synergy: "Potencia a Aqua y chips de Geyser." },
        { id: "elem_earth_up", name: "Martillos Sísmicos", branch: "elemental", branchName: "Sintonía Elemental", tier: 1, cost: 125, prereq: null, desc: "+15% de daño infligido con habilidades y ataques de TIERRA.", modifier: "elem_boost_TIERRA: 0.15", synergy: "Potencia a Terra y chips de Fisura." },
        { id: "elem_air_up", name: "Turbinas Eólicas", branch: "elemental", branchName: "Sintonía Elemental", tier: 1, cost: 125, prereq: null, desc: "+15% de daño infligido con habilidades y ataques de AIRE.", modifier: "elem_boost_AIRE: 0.15", synergy: "Potencia a Zephyr y chips de Tornado." },
        { id: "combo_damage_up", name: "Resonancia Reaccionaria", branch: "elemental", branchName: "Sintonía Elemental", tier: 2, cost: 300, prereq: "elem_fire_up", desc: "Las Reacciones Elementales y Combos infligen un +20% de daño adicional.", modifier: "combo_damage_pct: 0.20", synergy: "Multiplica brutalmente Vaporizaciones, Erupciones y Deflagraciones." },
        { id: "burn_duration_up", name: "Napalm Sintético", branch: "elemental", branchName: "Sintonía Elemental", tier: 2, cost: 250, prereq: "elem_fire_up", desc: "Las Quemaduras aplicadas por el escuadrón duran +1 turno extra (3T total / 24% HP).", modifier: "burn_duration_extra: 1", synergy: "Garantiza un desgaste prolongado contra Élites y Jefes." },
        { id: "affinity_mastery_1", name: "Sintonía de Chasis I", branch: "elemental", branchName: "Sintonía Elemental", tier: 2, cost: 275, prereq: "elem_earth_up", desc: "El bono de Afinidad de Arma otorga +5% extra de HP y ATQ (+25% total).", modifier: "affinity_bonus_extra: 0.05", synergy: "Recompensa equipar armas del mismo elemento del robot." },
        { id: "affinity_mastery_2", name: "Sintonía de Chasis II", branch: "elemental", branchName: "Sintonía Elemental", tier: 3, cost: 425, prereq: "affinity_mastery_1", desc: "El bono de Afinidad de Arma otorga un +10% adicional (+35% HP y ATQ total).", modifier: "affinity_bonus_extra: 0.10", synergy: "Convierte a los robots con afinidad perfecta en potencias de combate." },
        { id: "mark_damage_up", name: "Neuro-Marcadores", branch: "elemental", branchName: "Sintonía Elemental", tier: 3, cost: 400, prereq: "combo_damage_up", desc: "+10% de daño infligido contra objetivos que tengan una Marca activa.", modifier: "marked_target_damage: 0.10", synergy: "Premia las rotaciones coordinadas de habilidades entre aliados." },
        { id: "starter_fire_buff", name: "Núcleo Volcánico", branch: "elemental", branchName: "Sintonía Elemental", tier: 3, cost: 375, prereq: "elem_fire_up", desc: "Las unidades de Fuego inician cada combate con un +10% de ATQ adicional.", modifier: "fire_starter_atk_pct: 0.10", synergy: "Permite eliminar enemigos prioritarios en la primera ronda." },
        { id: "starter_water_buff", name: "Batería Térmica", branch: "elemental", branchName: "Sintonía Elemental", tier: 3, cost: 375, prereq: "elem_water_up", desc: "Las unidades de Agua inician cada combate con una Barrera protectora activa.", modifier: "water_starter_barrier: true", synergy: "Inmunidad total al primer golpe recibido en cada encuentro." },
        { id: "starter_earth_buff", name: "Blindaje Tectónico", branch: "elemental", branchName: "Sintonía Elemental", tier: 4, cost: 550, prereq: "affinity_mastery_2", desc: "Las unidades de Tierra ganan un +20% de HP Máximo permanente adicional.", modifier: "earth_bonus_hp_pct: 0.20", synergy: "Transforma a Terra en un titán indestructible." },

        // RAMA 4: LOGÍSTICA Y TÁCTICA (12 pasivas)
        { id: "start_scrap_1", name: "Reserva de Chatarra I", branch: "logistics", branchName: "Logística y Táctica", tier: 1, cost: 100, prereq: null, desc: "Inicias cada incursión con +30 de Chatarra disponible.", modifier: "start_scrap: 30", synergy: "Permite comprar armas o consumibles en la primera tienda." },
        { id: "start_scrap_2", name: "Reserva de Chatarra II", branch: "logistics", branchName: "Logística y Táctica", tier: 2, cost: 225, prereq: "start_scrap_1", desc: "Inicias cada incursión con +60 de Chatarra adicional (+90 total).", modifier: "start_scrap: 60", synergy: "Fondo inicial sólido para comprar chips elementales temprano." },
        { id: "start_scrap_3", name: "Reserva de Chatarra III", branch: "logistics", branchName: "Logística y Táctica", tier: 3, cost: 400, prereq: "start_scrap_2", desc: "Inicias cada incursión con +100 de Chatarra adicional (+190 total inicial).", modifier: "start_scrap: 100", synergy: "Capacidad de compra masiva desde los primeros pisos." },
        { id: "scrap_gain_1", name: "Imanes de Chatarrero I", branch: "logistics", branchName: "Logística y Táctica", tier: 1, cost: 125, prereq: null, desc: "+15% de Chatarra recolectada en todas las victorias de combate.", modifier: "scrap_gain_pct: 0.15", synergy: "Acelera la economía tanto de la run actual como del pozo global." },
        { id: "scrap_gain_2", name: "Imanes de Chatarrero II", branch: "logistics", branchName: "Logística y Táctica", tier: 2, cost: 250, prereq: "scrap_gain_1", desc: "+25% de Chatarra recolectada en combate adicional (+40% total).", modifier: "scrap_gain_pct: 0.25", synergy: "Bono gigantesco para acumular chatarra global rápidamente." },
        { id: "shop_discount_1", name: "Negociación Cibernética I", branch: "logistics", branchName: "Logística y Táctica", tier: 2, cost: 250, prereq: "start_scrap_1", desc: "-10% de descuento en todos los artículos de las Tiendas de Mercado.", modifier: "shop_discount_pct: 0.10", synergy: "Facilita la compra de armas raras y chips." },
        { id: "shop_discount_2", name: "Negociación Cibernética II", branch: "logistics", branchName: "Logística y Táctica", tier: 3, cost: 425, prereq: "shop_discount_1", desc: "-20% de descuento adicional en Tiendas de Mercado (-30% total).", modifier: "shop_discount_pct: 0.20", synergy: "Descuento permanente masivo en todo el catálogo de mercado." },
        { id: "xp_boost_1", name: "Chips de Aprendizaje I", branch: "logistics", branchName: "Logística y Táctica", tier: 1, cost: 125, prereq: null, desc: "+15% de Experiencia (XP) ganada por todo el escuadrón en combates.", modifier: "xp_gain_pct: 0.15", synergy: "Sube de nivel a tus robots con menor número de pisos recorridos." },
        { id: "xp_boost_2", name: "Chips de Aprendizaje II", branch: "logistics", branchName: "Logística y Táctica", tier: 2, cost: 275, prereq: "xp_boost_1", desc: "+25% de XP ganada adicional para todo el escuadrón (+40% total).", modifier: "xp_gain_pct: 0.25", synergy: "Llega al piso del Jefe con robots de nivel considerablemente superior." },
        { id: "elite_recruit_up", name: "Algoritmo de Hackeo", branch: "logistics", branchName: "Logística y Táctica", tier: 3, cost: 450, prereq: "xp_boost_2", desc: "La probabilidad de reclutar robots Élite con éxito sube de 50% a 75%.", modifier: "elite_recruit_chance: 0.75", synergy: "Reduce drásticamente el riesgo de detonación por sobrecarga (del 50% al 25%)." },
        { id: "repair_efficiency", name: "Kits Optimizados", branch: "logistics", branchName: "Logística y Táctica", tier: 3, cost: 375, prereq: "shop_discount_1", desc: "El Taller de Reparación repara un 40% de HP a todos los aliados (en vez de 30%).", modifier: "repair_shop_heal_pct: 0.40", synergy: "Sostenimiento y curación superior en cada visita a campamentos." },
        { id: "dismantle_bonus", name: "Reciclaje Estructural", branch: "logistics", branchName: "Logística y Táctica", tier: 4, cost: 550, prereq: "scrap_gain_2", desc: "Desmantelar robots derrotados otorga +50 Chatarra fija y +15% de curación al equipo.", modifier: "dismantle_scrap_bonus: 20, dismantle_heal_pct: 0.15", synergy: "Mejora sustancial frente a la recompensa base (+30 ⚙️ / 10% curación)." }
    ],

    // -------------------------------------------------------------
    // 9. PROBABILIDADES Y MATEMÁTICAS EXACTAS
    // -------------------------------------------------------------
    PROBABILITIES: {
        normalEncounter: {
            scrap: "10 - 19 ⚙️ (Aleatorio)",
            xp: "Nivel x 50 XP por robot vivo",
            weaponDrop: "1.00% (Arma Base de elemento coincidente: 0.25% cada tipo)",
            consumableDrop: "30.00% (10% Kit, 10% Bomba PEM, 10% Núcleo)",
            recruitment: "100% Garantizado (Entra con 50% HP, máx 3 miembros)",
            dismantle: "+30 ⚙️ Chatarra y +10% Curación a todo el escuadrón"
        },
        eliteEncounter: {
            scrap: "20 - 38 ⚙️ (Doble botín: 2x random(10, 19))",
            xp: "(Piso + 2) x 50 XP por robot vivo",
            loot1: "33% Arma Forjada +1 // 33% Chip Elemental // 34% Sin equipo extra",
            loot2: "100% Consumible Táctico Garantizado (33.3% Kit, 33.3% PEM, 33.3% Núcleo)",
            recruitment: "50% Éxito // 50% Fallo: Sobrecarga Crítica (Explota e inflige 10% HP a todo el escuadrón)",
            modifiers: "Espinas (refleja 30%), Regenerador (cura 10% HP/turno), Rabia (+10% ATQ acumulable por golpe)"
        },
        bossEncounter: {
            scrap: "20 - 38 ⚙️",
            xp: "500 XP fija",
            loot: "100% Botín Superior: 50% Arma Dorada/Forjada +1 o 50% Chip Elemental + 1 Consumible garantizado",
            key: "Llave de Acceso Cuántica / Singularidad"
        },
        chests: {
            purityFloor: "Piso 5 / 15 / 25: 100% Cofres de Tesoro garantizados sin combate",
            weaponChance: "50.00% (Arma Mejorada +1: 12.5% cada tipo de arma, 3.125% cada arma elemental específica)",
            chipChance: "50.00% (Chip Elemental: 12.5% cada elemento Fuego/Agua/Tierra/Aire)"
        },
        shop: {
            slots1and2: "2 Armas Base (Costo: random(35, 49) ⚙️)",
            slots3and4: "2 Chips o Consumibles (14.29% prob por artículo, Costo: 25-30 ⚙️)",
            decommission: "Servicio de Desguace de Robot: 30 ⚙️ (1 por tienda, devuelve armas y chips)"
        },
        enemyWeaponsByTower: [
            { tower: "Torre 1 (Pisos 1 - 10)", chance: "0.00%", note: "Luchan a mano limpia con estadísticas base" },
            { tower: "Torre 2 (Piso 11)", chance: "30.00%", note: "Comienzan a equipar armas elementales" },
            { tower: "Torre 2 (Piso 12 - 14)", chance: "40% - 60%", note: "+10% acumulativo por cada piso ascendido" },
            { tower: "Torre 2 (Piso 18 - 20)", chance: "100.00%", note: "Todos los enemigos estándar van armados" },
            { tower: "Torre 3 (Pisos 21 - 30)", chance: "100.00%", note: "Máxima hostilidad y letalidad de armamento" }
        ]
    },

    // -------------------------------------------------------------
    // 10. SISTEMA DE OVERDRIVE // HABILIDADES DEFINITIVAS
    // -------------------------------------------------------------
    OVERDRIVE: {
        unlockLevel: 5,
        name: "Protocolo Overdrive // Habilidades Definitivas",
        description: "Al alcanzar el Nivel 5, los autómatas desbloquean su medidor de energía Overdrive (0% a 100%). Al llenarse al 100%, el robot puede desatar su técnica definitiva suprema.",
        chargeMechanics: [
            { source: "Ataque Básico o Habilidad Ejecutada", gain: "+15% Overdrive" },
            { source: "Daño Sufrido / Absorción por Escudo", gain: "+10% Overdrive" }
        ],
        persistence: "Persistencia entre Combates: La barra de Overdrive NO se reinicia a 0% al ganar un combate. Toda la energía acumulada se conserva íntegramente para el siguiente piso o encuentro de la torre.",
        ultimates: [
            {
                robot: "Ignis",
                name: "Infierno Cataclísmico",
                element: "FUEGO",
                desc: "Detona una tormenta ígnea masiva que inflige 2.5x daño a todos los enemigos y aplica Quemadura de 3 turnos (8% HP/turno)."
            },
            {
                robot: "Aqua",
                name: "Maremoto Cuántico",
                element: "AGUA",
                desc: "Despliega una mega-barrera protectora de plasma sobre todo el escuadrón (anula el 100% del siguiente impacto a todos) y adhiere Marca de Agua a todos los rivales."
            },
            {
                robot: "Terra",
                name: "Falla Tectónica Absoluta",
                element: "TIERRA",
                desc: "Fractura dimensional que inflige 1.8x daño en área, activa Coraza de Espinas Colosal (75% mitigación y 75% reflejo) y aturde (STUN) con 60% de probabilidad."
            },
            {
                robot: "Zephyr",
                name: "Hiper-Vórtice Ciclónico",
                element: "AIRE",
                desc: "Ejecuta 3 cortes consecutivos de 1.2x cada uno sobre el enemigo más débil, eleva la Evasión de Zephyr al 75% por 2 turnos y reordena la cola de iniciativa."
            }
        ]
    },

    // -------------------------------------------------------------
    // 11. CATÁLOGO DE RELIQUIAS Y ARTEFACTOS PASIVOS (34)
    // -------------------------------------------------------------
    RELIC_RARITIES: {
        COMUN: { id: 'COMUN', name: 'Común', color: '#a4b0be', glow: 'rgba(164, 176, 190, 0.4)' },
        RARO: { id: 'RARO', name: 'Raro', color: '#48dbfb', glow: 'rgba(72, 219, 251, 0.5)' },
        EPICO: { id: 'EPICO', name: 'Épico', color: '#a55eea', glow: 'rgba(165, 94, 234, 0.6)' },
        LEGENDARIO: { id: 'LEGENDARIO', name: 'Legendario', color: '#fed330', glow: 'rgba(254, 211, 48, 0.7)' },
        CORRUPTA: { id: 'CORRUPTA', name: 'Corrupta', color: '#eb4d4b', glow: 'rgba(235, 77, 75, 0.7)' }
    },

    RELIC_CATEGORIES: {
        ELEMENTAL: { id: 'ELEMENTAL', name: 'Sinergias Elementales', icon: '✨' },
        WEAPONS: { id: 'WEAPONS', name: 'Armas & Maestrías', icon: '⚔️' },
        SURVIVAL: { id: 'SURVIVAL', name: 'Supervivencia & Blindaje', icon: '🛡️' },
        SPEED: { id: 'SPEED', name: 'Velocidad & Iniciativa', icon: '⚡' },
        ECONOMY: { id: 'ECONOMY', name: 'Economía & Taller', icon: '⚙️' },
        CORRUPTED: { id: 'CORRUPTED', name: 'Reliquias Corruptas', icon: '☣️' }
    },

    RELICS: [
        // 1. SINERGIAS ELEMENTALES (10)
        { id: 'catalizador_termico', name: 'Catalizador Térmico', category: 'ELEMENTAL', rarity: 'RARO', icon: '🔥', desc: 'Al detonar Vaporización o Tormenta Ígnea, aplica 1 acumulación de Quemadura (3 turnos) a todos los demás enemigos vivos.', lore: 'Dispositivo pirotécnico que redirecciona el exceso de calor térmico a la telemetría enemiga circundante.' },
        { id: 'prisma_escarcha', name: 'Prisma de Escarcha', category: 'ELEMENTAL', rarity: 'COMUN', icon: '🧊', desc: 'La reacción Ventisca reduce la precisión rival en un -35% (en lugar de -20%) y extiende su duración a 3 turnos.', lore: 'Cristal ultra-refinado que intensifica la refracción del frío absoluto cegando los sensores ópticos.' },
        { id: 'condensador_plasma', name: 'Condensador de Plasma', category: 'ELEMENTAL', rarity: 'RARO', icon: '⚡', desc: 'Al detonar Choque Térmico, además de purgar ventajas enemigas, descarga 20 de daño directo a todos los enemigos en el campo.', lore: 'Condensador de alta capacidad que descarga pulsos electromagnéticos residuales tras cada colisión térmica.' },
        { id: 'fision_volcanica', name: 'Fisión Volcánica', category: 'ELEMENTAL', rarity: 'RARO', icon: '🌋', desc: 'La reacción Erupción reduce la defensa enemiga un -40% (en lugar de -25%) y salpica Marca de Fuego a los demás enemigos.', lore: 'Micro-reactor magmático capaz de fracturar aleaciones pesadas con calor de fisión instantáneo.' },
        { id: 'geoda_resonancia', name: 'Geoda de Resonancia', category: 'ELEMENTAL', rarity: 'COMUN', icon: '💎', desc: 'Al activar Cristalización, el escudo de plasma generado aumenta al 35% del HP actual (en lugar del 25%).', lore: 'Estructura cristalina resonante que cataliza el impacto de tierra en una densa barrera fotónica.' },
        { id: 'sifon_biotelurico', name: 'Sifón Biotelúrico', category: 'ELEMENTAL', rarity: 'EPICO', icon: '🌿', desc: 'La reacción Erosión drena y cura el 50% del daño infligido en HP al robot atacante (en lugar del 30%).', lore: 'Bomba osmótica que transmuta la energía cinética del impacto mineral en micro-reparaciones inmediatas.' },
        { id: 'turbina_torbellino', name: 'Turbina Torbellino', category: 'ELEMENTAL', rarity: 'RARO', icon: '🌪️', desc: 'La Tormenta de Arena aplica Ceguera durante 2 turnos (en lugar de 1) y reduce la Velocidad (SPD) del rival en -3.', lore: 'Turboventilador de alta frecuencia que prolonga vórtices de partículas abrasivas en la arena de combate.' },
        { id: 'inyector_nanomarcas', name: 'Inyector de Nanomarcas', category: 'ELEMENTAL', rarity: 'EPICO', icon: '💉', desc: 'Al inicio de cada combate, inyecta una Marca Elemental aleatoria (3 turnos) a todos los enemigos desplegados.', lore: 'Micro-drones invisibles que marcan las firmas electromagnéticas enemigas antes del primer cruce de disparos.' },
        { id: 'lente_refraccion', name: 'Lente de Refracción', category: 'ELEMENTAL', rarity: 'COMUN', icon: '🔮', desc: 'Todas las Reacciones y Combinaciones Elementales infligen un +20% de daño adicional.', lore: 'Lente focalizadora que amplifica exponencialmente las ondas de choque en colisiones elementales.' },
        { id: 'ignicion_perpetua', name: 'Ignición Perpetua', category: 'ELEMENTAL', rarity: 'EPICO', icon: '🕯️', desc: 'Si un enemigo muere teniendo Quemadura activa, transfiere su Quemadura con 3 turnos completos a otro enemigo vivo.', lore: 'Fórmula incendiaria auto-replicante que salta de un chasis destruido al siguiente hostil.' },

        // 2. ARMAS Y MAESTRÍAS (8)
        { id: 'giroscopio_frecuencia', name: 'Giroscopio de Frecuencia', category: 'WEAPONS', rarity: 'COMUN', icon: '🌀', desc: 'Los aliados que porten Daga obtienen +15% de probabilidad adicional de ejecutar un doble ataque consecutivo.', lore: 'Micro-giroscopio de aleación ligera que equilibra el filo para una cadencia de estocadas vertiginosa.' },
        { id: 'afilador_neutrones', name: 'Afilador de Neutrones', category: 'WEAPONS', rarity: 'RARO', icon: '✨', desc: 'El bufo de Racha de Espada (tras asestar un crítico) otorga +25% de ATQ (en lugar del +10%).', lore: 'Haz de neutrones continuos que pule el filo térmico de la espada a nivel atómico.' },
        { id: 'valvula_hidraulica', name: 'Válvula Hidráulica de Asalto', category: 'WEAPONS', rarity: 'RARO', icon: '🪓', desc: 'El efecto Verdugo del Hacha se activa contra rivales con ≤50% HP (en lugar de ≤40%) y su bonificación de daño aumenta en +15%.', lore: 'Pistones de compresión que liberan toda la fuerza de impacto cuando el objetivo muestra debilidad estructural.' },
        { id: 'nucleo_canalizador', name: 'Núcleo Canalizador', category: 'WEAPONS', rarity: 'EPICO', icon: '🪄', desc: 'Los escudos y curaciones de Báculos son un 50% más potentes y purgan 1 debuff del aliado beneficiado.', lore: 'Canalizador cuántico que filtra frecuencias corruptas y estabiliza el plasma defensivo de los báculos.' },
        { id: 'chip_punteria_laser', name: 'Chip de Puntería Láser', category: 'WEAPONS', rarity: 'COMUN', icon: '🎯', desc: 'Todo el escuadrón gana +15% de Precisión (ACC) fija y sus impactos nunca fallan contra enemigos bajo estados alterados o marcas.', lore: 'Sensor óptico infrarrojo con telemetría de bloqueo continuo sobre objetivos alterados.' },
        { id: 'modulo_critico_mk2', name: 'Módulo Crítico MK-II', category: 'WEAPONS', rarity: 'RARO', icon: '💥', desc: 'Otorga +10% de Probabilidad Crítica a todo el escuadrón y aumenta el multiplicador de Daño Crítico a 1.75x (o +25% al multiplicador actual).', lore: 'Algoritmo de cálculo balístico que localiza las junturas débiles de los chasis enemigos.' },
        { id: 'guantelete_plasma_dual', name: 'Guantelete de Plasma Dual', category: 'WEAPONS', rarity: 'EPICO', icon: '🥊', desc: 'Cualquier aliado que no porte Daga tiene un 25% de probabilidad de asestar un segundo impacto básico consecutivo al 50% de daño.', lore: 'Guantelete servo-asistido que descarga una segunda ráfaga de plasma antes de retraer el brazo.' },
        { id: 'reciclador_energia', name: 'Reciclador de Energía', category: 'WEAPONS', rarity: 'COMUN', icon: '♻️', desc: 'Usar una Habilidad Especial justo en el turno siguiente a un ataque básico otorga +15% de daño a dicha habilidad.', lore: 'Batería auxiliar que almacena la inercia cinética del ataque básico para sobrecargar la habilidad táctica.' },

        // 3. SUPERVIVENCIA, BLINDAJE Y ESCUDOS (8)
        { id: 'blindaje_nanografeno', name: 'Blindaje de Nanografeno', category: 'SURVIVAL', rarity: 'RARO', icon: '🛡️', desc: 'Al iniciar cada combate, todos los aliados despliegan un Escudo de plasma equivalente al 15% de su HP Máximo por 2 turnos.', lore: 'Capas de nanografeno auto-ensamblables que amortiguan la primera andanada de hostilidades.' },
        { id: 'deflector_reflectante', name: 'Deflector Reflectante', category: 'SURVIVAL', rarity: 'COMUN', icon: '🪞', desc: 'Al usar la acción Defender, el aliado refleja el 40% del daño recibido de vuelta al atacante.', lore: 'Espejo electromagnético que repele los proyectiles hacia su punto de origen mientras se mantiene la guardia.' },
        { id: 'manto_espinas_reactivas', name: 'Manto de Espinas Reactivas', category: 'SURVIVAL', rarity: 'RARO', icon: '🌵', desc: 'La Coraza de Espinas dura 1 turno adicional y refleja el 70% del daño recibido (en lugar del 50%).', lore: 'Espinas de tungsteno imantadas que devuelven el impacto con letalidad reforzada.' },
        { id: 'celula_regenerativa', name: 'Célula Regenerativa', category: 'SURVIVAL', rarity: 'RARO', icon: '🔋', desc: '1 vez por combate: En el primer turno de acción de cada robot aliado, este repara y recupera un 4% de su HP Máximo.', lore: 'Célula electroquímica de reserva que se auto-descarga en el arranque de sistemas para sellar fugas.' },
        { id: 'protocolo_fenix', name: 'Protocolo Fénix', category: 'SURVIVAL', rarity: 'LEGENDARIO', icon: '🦅', desc: '1 sola vez por incursión: Si un aliado recibe daño letal, sobrevive con 1 HP y despliega Barrera de Plasma por 1 turno.', lore: 'Protocolo cibernético de emergencia militar que niega la desactivación total mediante un pulso de reinicio crítico.' },
        { id: 'aislante_electrostatico', name: 'Aislante Electroestático', category: 'SURVIVAL', rarity: 'COMUN', icon: '🔌', desc: 'Todo el escuadrón es totalmente inmune al Aturdimiento (STUN) y a la Ralentización extrema.', lore: 'Conexión a tierra con bobinas superconductoras que anulan descargas y parálisis en los servomotores.' },
        { id: 'disipador_criogenico', name: 'Disipador Criogénico', category: 'SURVIVAL', rarity: 'COMUN', icon: '❄️', desc: 'El daño recibido por Quemaduras o efectos residuales por turno se reduce en un 50% en todos los aliados.', lore: 'Tuberías de nitrógeno líquido que enfrían inmediatamente el fuselaje ante aumentos críticos de temperatura.' },
        { id: 'condensador_rocio', name: 'Condensador de Rocío', category: 'SURVIVAL', rarity: 'RARO', icon: '💧', desc: 'Cuando un aliado protegido por Rocío Protector es atacado, además de salpicar Marca de Agua, aplica Ceguera (-50% PREC) al atacante por 1 turno.', lore: 'Vaporizador hidrostático que dispara niebla densa a los sensores del agresor al recibir un impacto.' },

        // 4. VELOCIDAD, INICIATIVA Y TURNOS (3)
        { id: 'propulsor_iones', name: 'Propulsor de Iones', category: 'SPEED', rarity: 'COMUN', icon: '🚀', desc: 'Todo el escuadrón gana +2 de Velocidad (SPD) permanente, mejorando su posición en la cola de iniciativa.', lore: 'Micro-toberas de propulsión iónica instaladas en los chasis para una respuesta táctica inmediata.' },
        { id: 'impulsor_asalto', name: 'Impulsor de Asalto', category: 'SPEED', rarity: 'EPICO', icon: '⚡', desc: 'En la Ronda 1 de cada combate, el aliado más veloz realiza dos turnos consecutivos antes de que actúen los enemigos.', lore: 'Inyector de sobrevoltaje que duplica los ciclos de procesamiento del combatiente líder al desplegarse.' },
        { id: 'cronometro_sobredrive', name: 'Cronómetro de Sobredrive', category: 'SPEED', rarity: 'LEGENDARIO', icon: '⏱️', desc: 'Cuando un aliado elimina a un enemigo, obtiene inmediatamente un turno adicional instantáneo (máx. 1 vez por ronda).', lore: 'Reloj cuántico que comprime el flujo temporal al detectar una firma hostil neutralizada.' },

        // 5. ECONOMÍA, EXPLORACIÓN Y TALLER (3)
        { id: 'iman_chatarra', name: 'Imán de Chatarra', category: 'ECONOMY', rarity: 'COMUN', icon: '🧲', desc: 'Aumenta toda la Chatarra ⚙️ obtenida en combates y eventos en un +35%.', lore: 'Electroimán de alto alcance que recolecta aleaciones valiosas de los escombros de combate.' },
        { id: 'tarjeta_acceso_vip', name: 'Tarjeta de Acceso VIP', category: 'ECONOMY', rarity: 'RARO', icon: '💳', desc: 'Reduce todos los precios en la Tienda de Mercaderes en un 25% adicional.', lore: 'Credencial corporativa codificada que desbloquea tarifas preferenciales en terminales comerciales.' },
        { id: 'kit_forja_avanzada', name: 'Kit de Forja Avanzada', category: 'ECONOMY', rarity: 'EPICO', icon: '🧰', desc: 'Los Campamentos Tácticos permiten realizar 2 operaciones de mantenimiento en lugar de solo 1.', lore: 'Conjunto de herramientas neumáticas modulares que duplican la eficiencia de los talleres de campo.' },

        // 6. RELIQUIAS CORRUPTAS (2)
        { id: 'nucleo_hipercaliente', name: 'Núcleo Hipercaliente', category: 'CORRUPTED', rarity: 'CORRUPTA', icon: '☣️', desc: '+35% de Daño para todo el escuadrón en todas sus acciones. A cambio, cada aliado pierde el 3% de su HP actual al inicio de su turno.', lore: 'Núcleo inestable que irradia un poder devastador a costa de la integridad estructural de sus portadores.' },
        { id: 'pacto_desguazador', name: 'Pacto del Desguazador', category: 'CORRUPTED', rarity: 'CORRUPTA', icon: '💀', desc: '+100% de Chatarra ⚙️ (duplica ganancias) y la Forja de armas en Campamentos es gratis. Sin embargo, los Campamentos no pueden reparar ni curar HP.', lore: 'Un acuerdo clandestino con chatarreros de la periferia: recursos ilimitados a cambio de prescindir de protocolos médicos.' }
    ]
};
