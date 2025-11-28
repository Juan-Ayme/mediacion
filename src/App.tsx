import { useState, useEffect, type ElementType } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Users, Scale, History, CheckCircle, Globe, Play, 
  ChevronRight, HeartHandshake, BrainCircuit, Gavel, Menu, X,
  Mic, Lightbulb, ArrowRight, Star,
  GraduationCap, Layout, Sparkles, Video,
  Download, Presentation, FileText, Eye, Folder, ClipboardCheck
} from 'lucide-react';

// --- DATOS DEL CONTENIDO ---

const teamMembers = [
  "OCHANTE CÁCERES, Brenda Aracely",
  "NIETO VILA, Heidy Mayli",
  "PEREZ MEJÍA, Marycielo",
  "PINO LIMACHE, Merly Bethzabé",
  "QUISPE ARONI, Agustin Juan",
  "TARRILLO NAVARRO, Jhoseline Sidney",
  "TORRES ÑAHUI, Maricruz Briyith",
  "URRIBURU BARRIENTOS, Ruth Marisol",
  "URRUTIA PUMAPILLO, Fiorela",
  "VEGA PALOMINO, Max Daniel",
  "VENTURA CÁRDENAS, Yanett Fiorella"
];

const mediatorSkills = [
  { title: "Empatía", desc: "Conectar emocionalmente y generar 'química' sin juzgar.", icon: <HeartHandshake className="w-6 h-6" /> },
  { title: "Flexibilidad", desc: "Adaptarse a los valores de las partes, sin rigidez.", icon: <BrainCircuit className="w-6 h-6" /> },
  { title: "Creatividad", desc: "Generar nuevas perspectivas para desbloquear el conflicto.", icon: <Lightbulb className="w-6 h-6" /> },
  { title: "Imparcialidad", desc: "Mantener el equilibrio y no tomar partido.", icon: <Scale className="w-6 h-6" /> }
];

const phrases = {
  negative: [
    "Cuénteme el problema...",
    "Usted tiene la razón...",
    "¡Eso es un chantaje!",
    "Discusión / Pelea"
  ],
  positive: [
    "Cuénteme sus preocupaciones...",
    "¿Cómo le afecta esto?",
    "¿Qué necesitaría para...?",
    "Diferencias / Situación"
  ]
};

const comparativeLaw = [
  { country: "España", desc: "Ley 5/2012. Ámbito civil/mercantil. Registro oficial de mediadores.", flag: "🇪🇸" },
  { country: "Colombia", desc: "Ley 906 (2004). Justicia restaurativa en penal. Previa al juicio oral.", flag: "🇨🇴" },
  { country: "Argentina", desc: "Ley 26.589. Mediación prejudicial obligatoria en casi todos los fueros.", flag: "🇦🇷" },
  { country: "ONU", desc: "Directrices: Preparación, consentimiento y carácter inclusivo.", flag: "🇺🇳" }
];

const schools = [
  { name: "Tradicional-Lineal", author: "Fisher y Ury (Harvard)", focus: "El Acuerdo", desc: "Centrado en intereses, no posiciones. Busca disminuir diferencias. El mediador es un facilitador directivo." },
  { name: "Transformativa", author: "Bush y Folger", focus: "La Relación", desc: "Busca la revalorización (empowerment) y el reconocimiento del otro. El acuerdo es secundario; importa el crecimiento moral." },
  { name: "Circular-Narrativa", author: "Sara Cobb", focus: "La Comunicación", desc: "Trabaja sobre las historias. Busca deconstruir la narrativa del conflicto y crear una historia alternativa mejor." },
  { name: "Evaluativa", author: "Riskin y Alfini", focus: "Resultado Justo", desc: "El mediador tiene un rol más activo, evalúa el caso y sugiere soluciones basadas en la ley (parecido a conciliación)." },
  { name: "Holística", author: "Lederach", focus: "Globalidad", desc: "Interdisciplinario. Considera dimensiones emocionales, sociales y espirituales. Busca una cultura de paz profunda." }
];

const stages = [
  { number: 1, title: "Identificación", desc: "Recepción del caso y registro. Análisis inicial de viabilidad.", steps: ["Contacto inicial", "Recopilación de datos"] },
  { number: 2, title: "Análisis", desc: "Evaluación profunda del conflicto y sus actores.", steps: ["Mapeo de actores", "Historia del conflicto"] },
  { number: 3, title: "Diseño", desc: "Preparación del escenario y convocatoria.", steps: ["Objetivos", "Invitación a las partes"] },
  { number: 4, title: "Conducción", desc: "El corazón del proceso: diálogo y negociación.", steps: ["Discurso de apertura", "Lluvia de ideas", "Negociación"] },
  { number: 5, title: "Cierre", desc: "Formalización de acuerdos y seguimiento.", steps: ["Redacción del acta", "Firma", "Evaluación"] }
];

const videoLinks = [
  { 
    id: "1t37L9NyOd5Ht0e09s4MskBnyDT59n4-S", 
    title: "Video 1: Cortometraje", 
    desc: "Video corto explicativo del tema.",
    thumbnail: "https://lh3.googleusercontent.com/d/1t37L9NyOd5Ht0e09s4MskBnyDT59n4-S=w800"
  },
  { 
    id: "1tHmsfYj3gLWN6BDI_DtFiMoi0E_djH-a", 
    title: "Video 2: Introducción", 
    desc: "Video explicativo de la introducción del tema.",
    thumbnail: "https://lh3.googleusercontent.com/d/1tHmsfYj3gLWN6BDI_DtFiMoi0E_djH-a=w800"
  },
  { 
    id: "1nGMXbJQQ30GiSID3UN0Kk-ZThXDbt9yn", 
    title: "Video 3: Mediación vs Conciliación", 
    desc: "Video explicativo sobre la diferencia entre mediación y conciliación.",
    thumbnail: "https://lh3.googleusercontent.com/d/1nGMXbJQQ30GiSID3UN0Kk-ZThXDbt9yn=w800"
  }
];

const historyData = {
  ancient: [
    { year: "4500 a.C.", title: "Sumeria", desc: "Los 'mashkim' mediaban sin interés personal. Si fallaban, se iba a tribunales." },
    { year: "960 a.C.", title: "Hebrea", desc: "Rey Salomón: Uso de sabiduría para resolver desacuerdos civiles entre ciudadanos." },
    { year: "551 a.C.", title: "China", desc: "Confucio: La armonía moral sobre la ley. Solución aceptada y respetada por las partes." },
    { year: "753 a.C.", title: "Roma", desc: "'Consilium domesticum': El pater familias resolvía conflictos internos." }
  ],
  modern: [
    { year: "1935", title: "EE.UU. (Laboral)", desc: "National Labor Relations Act. Impulso tras la Gran Depresión y el New Deal." },
    { year: "1960s", title: "EE.UU. (Civil)", desc: "Lucha por derechos civiles. Mediación comunitaria para conflictos raciales y vecinales." },
    { year: "1976", title: "Conf. Pound", desc: "Nace el movimiento ADR (Resolución Alternativa) ante la saturación judicial." },
    { year: "1980s", title: "Europa", desc: "Recomendaciones del Consejo de Europa. Inicio en España (País Vasco)." }
  ]
};

// --- COMPONENTES UI ATÓMICOS (RESPONSIVE) ---

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  icon?: ElementType;
  dark?: boolean;
}

const SectionHeader = ({ title, subtitle, icon: Icon, dark = false }: SectionHeaderProps) => (
  <div className="text-center mb-12 md:mb-16 relative z-10 px-4">
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4 transition-transform hover:scale-105 ${dark ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20' : 'bg-violet-50 text-violet-800 border border-violet-100'}`}>
      {Icon && <Icon className="w-3 h-3 md:w-4 md:h-4" />}
      <span>{subtitle}</span>
    </div>
    <h2 className={`text-3xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 md:mb-6 ${dark ? 'text-white' : 'text-zinc-900'}`}>
      {title}
    </h2>
    <div className="relative h-1.5 w-16 md:w-24 mx-auto bg-zinc-200/50 rounded-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-400 w-1/2 animate-shimmer"></div>
    </div>
  </div>
);

// --- SECCIONES PRINCIPALES ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const links = [
    { name: 'Historia', href: '#historia' },
    { name: 'Teoría', href: '#escuelas' },
    { name: 'Proceso', href: '#proceso' },
    { name: 'Comparación', href: '#comparativo' },
    { name: 'Recursos', href: '#recursos' },
    { name: 'Equipo', href: '#equipo' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled && !isOpen ? 'bg-white/90 backdrop-blur-md border-b border-zinc-200/50 py-3' : 'bg-transparent py-4 md:py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center relative z-50">
        <div className={`flex items-center gap-2 font-black text-lg md:text-xl tracking-tighter transition-colors ${scrolled && !isOpen ? 'text-zinc-900' : 'text-white'}`}>
          <div className="bg-gradient-to-br from-violet-500 to-fuchsia-600 p-1.5 md:p-2 rounded-xl shadow-lg shadow-violet-500/20">
            <Scale className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
          <span>MEDIACIÓN<span className="text-violet-500">.UNSCH</span></span>
        </div>

        <div className="hidden md:flex gap-1">
          {links.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`px-4 lg:px-5 py-2 rounded-full text-xs lg:text-sm font-bold transition-all ${scrolled ? 'text-zinc-600 hover:bg-zinc-100 hover:text-violet-600' : 'text-zinc-300 hover:bg-white/10 hover:text-white'}`}
            >
              {link.name}
            </a>
          ))}
        </div>

        <button className={`md:hidden p-2 rounded-lg transition-colors ${scrolled && !isOpen ? 'text-zinc-900' : 'text-white'}`} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      <div className={`fixed inset-0 bg-zinc-900/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        {links.map(link => (
          <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-2xl md:text-3xl font-black text-white hover:text-violet-400 transition-colors">
            {link.name}
          </a>
        ))}
      </div>
    </nav>
  );
};

const Hero = () => (
  <div className="relative min-h-screen flex items-center justify-center bg-zinc-900 overflow-hidden pt-20 px-4 md:px-6">
    <div className="absolute inset-0">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-10%] w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-violet-500/20 rounded-full blur-[80px] md:blur-[120px] mix-blend-screen"
        ></motion.div>
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-20%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-indigo-600/20 rounded-full blur-[80px] md:blur-[100px] mix-blend-screen"
        ></motion.div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
    </div>

    <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center lg:text-left space-y-6 md:space-y-8"
      >
        <div className="inline-flex items-center gap-3 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-violet-300 text-[10px] md:text-xs font-bold tracking-widest uppercase">
          <GraduationCap className="w-3 h-3 md:w-4 md:h-4" /> Facultad de Derecho y Ciencias Políticas
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] lg:leading-[0.95] tracking-tight">
          Paz Social y<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-300 to-indigo-400">Resolución</span>
        </h1>
        
        <p className="text-base md:text-xl text-zinc-400 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light">
          Un enfoque humano y estratégico para transformar conflictos en oportunidades. Teoría, práctica y normativa.
        </p>

        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
          <a href="#historia" className="px-6 md:px-8 py-3 md:py-4 bg-violet-500 hover:bg-violet-400 text-zinc-900 font-black rounded-2xl shadow-lg shadow-violet-500/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 text-sm md:text-base">
            Iniciar Recorrido <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </a>
          <div className="px-6 md:px-6 py-3 md:py-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 text-zinc-300 font-medium flex items-center justify-center gap-2 text-sm md:text-base">
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse"></span>
            Serie 300-II
          </div>
        </div>
      </motion.div>

      <div className="relative hidden lg:block perspective-1000">
        <motion.div 
          initial={{ opacity: 0, x: 50, rotateY: 30 }}
          animate={{ opacity: 1, x: 0, rotateY: 12 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 bg-gradient-to-br from-zinc-800 to-zinc-900 p-3 rounded-[2.5rem] shadow-2xl border border-zinc-700 transform hover:rotate-y-0 hover:rotate-x-0 transition-all duration-700 group"
        >
          <div className="absolute inset-0 bg-violet-500/20 blur-2xl -z-10 rounded-[2.5rem]"></div>
          <img 
            src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Mediación" 
            className="rounded-[2rem] w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          />
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-xl max-w-xs animate-float border border-zinc-100 hidden xl:block"
          >
             <div className="flex items-center gap-2 mb-2 text-violet-600">
                <Sparkles className="w-5 h-5 fill-current" />
                <span className="font-bold text-xs uppercase tracking-wider">Cita Clave</span>
             </div>
             <p className="text-zinc-800 font-serif italic text-lg leading-snug">
               "El mediador construye puentes donde otros ven abismos."
             </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </div>
);

const TimelineSection = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof historyData>('ancient');

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-zinc-50 relative overflow-hidden" id="historia">
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-100/50 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader title="Línea de Tiempo" subtitle="Evolución Histórica" icon={History} />
        
        {/* Botones Responsivos */}
        <div className="flex justify-center mb-12 md:mb-16">
            <div className="bg-white p-1.5 md:p-2 rounded-full shadow-lg border border-zinc-100 inline-flex relative w-full max-w-xs md:max-w-md">
                <div 
                    className={`absolute top-1.5 bottom-1.5 md:top-2 md:bottom-2 w-[calc(50%-6px)] md:w-[calc(50%-8px)] bg-zinc-900 rounded-full transition-all duration-500 ease-spring ${activeTab === 'ancient' ? 'left-1.5 md:left-2' : 'left-[calc(50%+3px)] md:left-[calc(50%+4px)]'}`}
                ></div>
                <button 
                    onClick={() => setActiveTab('ancient')}
                    className={`flex-1 relative z-10 px-4 py-2.5 md:px-8 md:py-3 rounded-full text-xs md:text-sm font-bold tracking-wide transition-colors duration-300 ${activeTab === 'ancient' ? 'text-white' : 'text-zinc-500 hover:text-zinc-900'}`}
                >
                    Edad Antigua
                </button>
                <button 
                    onClick={() => setActiveTab('modern')}
                    className={`flex-1 relative z-10 px-4 py-2.5 md:px-8 md:py-3 rounded-full text-xs md:text-sm font-bold tracking-wide transition-colors duration-300 ${activeTab === 'modern' ? 'text-white' : 'text-zinc-500 hover:text-zinc-900'}`}
                >
                    Edad Moderna
                </button>
            </div>
        </div>
        
        <div className="relative min-h-[500px]">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-violet-200 via-violet-400 to-violet-200 hidden md:block"></div>
            
            <div className="space-y-8 md:space-y-12 transition-all duration-500">
                {historyData[activeTab].map((item, idx) => (
                    <div key={idx} className={`flex items-center justify-between flex-col md:flex-row group ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''} animate-fade-in-up`} style={{animationDelay: `${idx * 100}ms`}}>
                        
                        <div className="w-full md:w-5/12 mb-4 md:mb-0">
                            <div className={`p-6 md:p-8 bg-white rounded-2xl md:rounded-3xl shadow-lg shadow-zinc-200/50 border border-zinc-100 hover:border-violet-200 active:border-violet-200 active:scale-[0.98] transition-all duration-300 transform hover:-translate-y-1 ${idx % 2 === 0 ? 'text-left' : 'md:text-right text-left'}`}>
                                <span className="inline-block px-3 py-1 bg-violet-100 text-violet-700 rounded-lg text-xs md:text-sm font-black mb-3">{item.year}</span>
                                <h3 className="text-lg md:text-xl font-bold text-zinc-900 mb-2">{item.title}</h3>
                                <p className="text-zinc-600 leading-relaxed text-sm">{item.desc}</p>
                            </div>
                        </div>
                        
                        <div className="z-10 bg-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-4 border-violet-100 shadow-lg order-first md:order-none mb-4 md:mb-0 group-hover:scale-110 transition-transform duration-300">
                            <div className="w-3 h-3 md:w-4 md:h-4 bg-violet-500 rounded-full"></div>
                        </div>
                        
                        <div className="w-full md:w-5/12 hidden md:block"></div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

const SchoolsSection = () => (
  <section className="py-16 md:py-24 px-4 md:px-6 bg-zinc-900 text-white" id="escuelas">
    <div className="max-w-7xl mx-auto">
      <SectionHeader title="Escuelas y Modelos" subtitle="Fundamentos Teóricos" icon={BookOpen} dark />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {schools.map((school, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group relative bg-zinc-800 rounded-[2rem] p-6 md:p-8 border border-zinc-700/50 hover:bg-zinc-800/80 active:bg-zinc-800/80 active:scale-[0.98] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-violet-500/20 transition-all duration-500"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="inline-block px-3 py-1 bg-zinc-900/50 backdrop-blur-md rounded-lg border border-zinc-600 text-violet-400 text-[10px] md:text-xs font-bold uppercase tracking-wider">
                  {school.focus}
                </div>
                <Star className="w-5 h-5 md:w-6 md:h-6 text-zinc-600 group-hover:text-yellow-400 transition-colors fill-current" />
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold mb-2 text-white group-hover:text-violet-300 transition-colors">{school.name}</h3>
              <p className="text-zinc-400 text-xs font-bold uppercase tracking-wide mb-4 md:mb-6">Autor: {school.author}</p>
              
              <div className="mt-auto">
                <p className="text-zinc-300 leading-relaxed text-sm border-l-2 border-violet-500/30 pl-4 group-hover:border-violet-500 transition-colors">
                    {school.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ProcessSection = () => (
  <section className="py-16 md:py-24 px-4 md:px-6 bg-white" id="proceso">
    <div className="max-w-6xl mx-auto">
      <SectionHeader title="El Camino del Acuerdo" subtitle="Etapas del Proceso" icon={Layout} />
      
      <div className="grid md:grid-cols-5 gap-4 relative">
        {/* Connecting Line for Desktop */}
        <div className="hidden md:block absolute top-10 left-0 right-0 h-1 bg-zinc-100 -z-0">
           <div className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 w-full opacity-20"></div>
        </div>

        {stages.map((stage, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15 }}
            className="group relative bg-white md:bg-transparent rounded-2xl p-6 md:p-4 shadow-lg md:shadow-none border md:border-none border-zinc-100 flex flex-col items-center text-center z-10 hover:bg-zinc-50 active:bg-zinc-50 active:scale-[0.98] transition-all"
          >
            <div className="w-20 h-20 rounded-2xl bg-white border-4 border-violet-100 md:border-zinc-50 shadow-xl flex items-center justify-center text-3xl font-black text-violet-500 md:text-zinc-300 group-hover:text-violet-500 group-hover:border-violet-100 transition-all duration-300 mb-6 relative">
              {stage.number}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-1 bg-violet-500 rounded-full opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            
            <h3 className="text-lg font-bold text-zinc-900 mb-2">{stage.title}</h3>
            <p className="text-xs text-zinc-500 font-medium mb-4 leading-relaxed">{stage.desc}</p>
            
            <div className="flex flex-wrap justify-center gap-1.5">
              {stage.steps.map((step, sIdx) => (
                <span key={sIdx} className="px-2 py-0.5 text-[10px] rounded-md font-bold uppercase tracking-wide bg-violet-50 text-violet-600 border-violet-100 md:bg-zinc-100 md:text-zinc-500 md:border-zinc-200 border group-hover:bg-violet-50 group-hover:text-violet-600 group-hover:border-violet-100 transition-colors">
                  {step}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);



const RoleSection = () => (
  <section className="py-16 md:py-24 px-4 md:px-6 bg-zinc-50 overflow-hidden" id="rol">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative order-2 lg:order-1"
      >
        <div className="absolute top-10 -left-10 w-40 h-40 bg-violet-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 -right-10 w-40 h-40 bg-fuchsia-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl border border-zinc-100">
           <div className="flex items-center gap-4 mb-8 border-b border-zinc-100 pb-6">
              <div className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600">
                 <HeartHandshake className="w-8 h-8" />
              </div>
              <div>
                 <h3 className="text-2xl font-black text-zinc-900">El Mediador</h3>
                 <p className="text-zinc-500 font-medium">Facilitador Imparcial</p>
              </div>
           </div>
           
           <div className="space-y-6">
              {[
                { icon: CheckCircle, text: "Facilita la comunicación sin imponer soluciones.", color: "text-violet-500" },
                { icon: BrainCircuit, text: "Identifica intereses ocultos tras las posiciones.", color: "text-fuchsia-500" },
                { icon: Gavel, text: "No tiene poder de decisión (a diferencia del juez).", color: "text-indigo-500" }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start group">
                   <div className={`mt-1 p-1.5 rounded-lg bg-zinc-50 group-hover:bg-white group-hover:shadow-md transition-all ${item.color}`}>
                     <item.icon className="w-5 h-5" />
                   </div>
                   <p className="text-zinc-600 leading-relaxed text-sm md:text-base">{item.text}</p>
                </div>
              ))}
           </div>

           <div className="mt-8 pt-6 border-t border-zinc-100">
              <div className="bg-violet-50 rounded-xl p-4 border border-violet-100">
                 <h4 className="font-bold text-violet-800 mb-2 text-sm uppercase tracking-wide flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" /> Habilidad Clave
                 </h4>
                 <p className="text-violet-700/80 text-sm italic">
                    "Escucha activa: Oír no solo lo que se dice, sino lo que se calla."
                 </p>
              </div>
           </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="order-1 lg:order-2 text-center lg:text-left"
      >
        <SectionHeader title="El Rol del Mediador" subtitle="Perfil Profesional" icon={Users} />
        <p className="text-lg text-zinc-500 mb-8 leading-relaxed">
          El mediador no es un juez ni un árbitro. Su poder radica en la capacidad de 
          <span className="font-bold text-violet-600"> empoderar a las partes</span> para que ellas mismas construyan su solución.
        </p>
        
        <div className="grid grid-cols-2 gap-4">
           {mediatorSkills.map((skill, idx) => (
             <div key={idx} className="p-6 bg-white rounded-2xl shadow-lg border border-zinc-100 hover:border-violet-200 transition-colors">
                <div className="text-violet-500 mb-2">{skill.icon}</div>
                <h4 className="font-bold text-zinc-900">{skill.title}</h4>
             </div>
           ))}
        </div>
        
        {/* Phrases */}
        <div className="mt-12">
           <div className="bg-zinc-900 text-white rounded-[2.5rem] p-6 md:p-8 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-violet-500/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
             
             <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-black mb-6 flex items-center gap-3">
                    <Mic className="w-6 h-6 text-violet-400" /> 
                    Comunicación
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                    {/* Don'ts */}
                    <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                      <div className="flex items-center gap-2 mb-3 text-red-400">
                          <X className="w-4 h-4"/>
                          <span className="font-bold uppercase tracking-wider text-[10px]">Evitar</span>
                      </div>
                      <ul className="space-y-2">
                          {phrases.negative.slice(0, 3).map((p, i) => (
                          <li key={i} className="text-zinc-400 text-xs">"{p}"</li>
                          ))}
                      </ul>
                    </div>

                    {/* Do's */}
                    <div className="bg-violet-500/10 backdrop-blur-md p-4 rounded-2xl border border-violet-500/20">
                      <div className="flex items-center gap-2 mb-3 text-violet-400">
                          <CheckCircle className="w-4 h-4"/>
                          <span className="font-bold uppercase tracking-wider text-[10px]">Usar</span>
                      </div>
                      <ul className="space-y-2">
                          {phrases.positive.slice(0, 3).map((p, i) => (
                          <li key={i} className="text-white text-xs">"{p}"</li>
                          ))}
                      </ul>
                    </div>
                </div>
             </div>
           </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const ComparisonSection = () => (
  <section className="py-16 md:py-24 px-4 md:px-6 bg-white" id="comparativo">
    <div className="max-w-6xl mx-auto">
      <SectionHeader title="Duelo de Conceptos" subtitle="Mediación vs. Conciliación" icon={Scale} />
      
      <div className="relative grid md:grid-cols-2 gap-6 items-stretch">
        {/* VS Badge */}
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex w-16 h-16 md:w-20 md:h-20 bg-white rounded-full items-center justify-center border-4 border-zinc-100 text-xl md:text-2xl font-black text-zinc-900 shadow-xl"
        >
          VS
        </motion.div>

        {/* Mediation Card */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-violet-50 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-violet-100 hover:shadow-xl transition-all duration-300 group"
        >
          <div className="flex items-center gap-4 mb-6 md:mb-8">
             <div className="w-12 h-12 md:w-14 md:h-14 bg-violet-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-violet-500/30 group-hover:scale-110 transition-transform shrink-0">
                <HeartHandshake className="w-6 h-6 md:w-8 md:h-8"/>
             </div>
             <div>
                 <span className="text-violet-600 font-bold tracking-wider text-[10px] md:text-xs uppercase">Autocomposición Pura</span>
                 <h3 className="text-2xl md:text-3xl font-black text-zinc-900">MEDIACIÓN</h3>
             </div>
          </div>
          <ul className="space-y-6">
            <li className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded-full bg-violet-200 flex items-center justify-center font-bold text-xs text-violet-800 mt-1 shrink-0">1</div>
              <div>
                  <strong className="text-zinc-900 block text-sm uppercase mb-1">Rol del Tercero</strong>
                  <p className="text-zinc-600 text-sm">Facilitador pasivo. <span className="font-bold text-violet-600 bg-violet-100 px-1 rounded">NO propone</span> soluciones.</p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded-full bg-violet-200 flex items-center justify-center font-bold text-xs text-violet-800 mt-1 shrink-0">2</div>
              <div>
                  <strong className="text-zinc-900 block text-sm uppercase mb-1">Poder</strong>
                  <p className="text-zinc-600 text-sm">Las partes tienen control total.</p>
              </div>
            </li>
          </ul>
        </motion.div>

        {/* Conciliation Card */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-zinc-50 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-zinc-200 hover:shadow-xl transition-all duration-300 group"
        >
          <div className="flex items-center gap-4 mb-6 md:mb-8">
             <div className="w-12 h-12 md:w-14 md:h-14 bg-zinc-800 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform shrink-0">
                <Gavel className="w-6 h-6 md:w-8 md:h-8"/>
             </div>
             <div>
                 <span className="text-zinc-500 font-bold tracking-wider text-[10px] md:text-xs uppercase">Intervención Activa</span>
                 <h3 className="text-2xl md:text-3xl font-black text-zinc-900">CONCILIACIÓN</h3>
             </div>
          </div>
          <ul className="space-y-6">
            <li className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded-full bg-zinc-200 flex items-center justify-center font-bold text-xs text-zinc-600 mt-1 shrink-0">1</div>
              <div>
                  <strong className="text-zinc-900 block text-sm uppercase mb-1">Rol del Tercero</strong>
                  <p className="text-zinc-600 text-sm">Activo. <span className="font-bold text-zinc-900 bg-zinc-200 px-1 rounded">SÍ propone</span> fórmulas.</p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded-full bg-zinc-200 flex items-center justify-center font-bold text-xs text-zinc-600 mt-1 shrink-0">2</div>
              <div>
                  <strong className="text-zinc-900 block text-sm uppercase mb-1">Poder</strong>
                  <p className="text-zinc-600 text-sm">El conciliador influye en el resultado final.</p>
              </div>
            </li>
          </ul>
        </motion.div>
      </div>
      
      {/* Comparative Law */}
      <div className="mt-16 md:mt-20">
        <h4 className="text-center text-zinc-400 uppercase tracking-[0.2em] text-xs font-bold mb-8">Perspectiva Internacional</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {comparativeLaw.map((item, idx) => (
            <motion.div 
              key={idx} 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + (idx * 0.1) }}
              className="bg-white p-6 rounded-2xl border border-zinc-100 text-center hover:border-violet-200 hover:shadow-lg transition-all"
            >
              <div className="text-3xl md:text-4xl mb-3 transform hover:scale-110 transition-transform duration-300">{item.flag}</div>
              <div className="font-bold text-zinc-900 text-sm mb-2">{item.country}</div>
              <div className="text-xs text-zinc-500 leading-relaxed">{item.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// --- VIDEO MODAL ---

const VideoModal = ({ videoId, isOpen, onClose }: { videoId: string | null, isOpen: boolean, onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && videoId && (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-zinc-800"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <iframe 
            src={`https://drive.google.com/file/d/${videoId}/preview`} 
            width="100%" 
            height="100%" 
            allow="autoplay; fullscreen" 
            allowFullScreen
            className="absolute inset-0 border-0"
            title="Video Player"
          ></iframe>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const VideosSection = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-zinc-50 overflow-hidden" id="multimedia">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Galería Multimedia" subtitle="Recursos Audiovisuales" icon={Video} />
        
        {/* Container: Horizontal scroll on mobile, Grid on desktop */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-4 px-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0 md:mx-0 md:px-0 scrollbar-hide">
          {videoLinks.map((video, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="w-[80vw] sm:w-96 md:w-auto shrink-0 snap-center group relative bg-white rounded-3xl overflow-hidden shadow-xl shadow-zinc-200/50 border border-zinc-100 hover:shadow-2xl active:scale-[0.98] transition-all duration-500 md:hover:-translate-y-2 cursor-pointer"
              onClick={() => setSelectedVideo(video.id)}
            >
              <div className="aspect-video w-full bg-zinc-900 relative group-hover:opacity-90 transition-opacity">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent"></div>
                
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform border border-white/20">
                        <Play className="w-8 h-8 text-white fill-current" />
                    </div>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold rounded border border-white/10 z-10">
                    VER VIDEO
                </div>
              </div>
              <div className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center shrink-0">
                          <Play className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                      </div>
                      <h3 className="font-bold text-zinc-900 text-base md:text-lg leading-tight">{video.title}</h3>
                  </div>
                  <p className="text-zinc-500 text-xs md:text-sm ml-11 md:ml-13 border-l-2 border-violet-100 pl-3">{video.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <VideoModal 
        videoId={selectedVideo} 
        isOpen={!!selectedVideo} 
        onClose={() => setSelectedVideo(null)} 
      />
    </section>
  );
};

const TeamSection = () => {
  const [activeMember, setActiveMember] = useState(0);

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-zinc-900 text-white overflow-hidden" id="equipo">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="Nuestro Equipo" subtitle="Grupo 03 - Serie 300-II" icon={Users} dark />
        
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center">
          {/* List */}
          <div className="w-full lg:w-1/2 space-y-2 md:space-y-3 h-[300px] md:h-[450px] overflow-y-auto pr-2 md:pr-4 custom-scrollbar">
            {teamMembers.map((member, idx) => (
              <motion.button
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setActiveMember(idx)}
                onMouseEnter={() => setActiveMember(idx)}
                className={`w-full text-left p-4 md:p-5 rounded-2xl transition-all duration-300 flex items-center justify-between group border ${
                  activeMember === idx 
                    ? 'bg-violet-600 border-violet-500 shadow-lg shadow-violet-900/50' 
                    : 'bg-white/5 border-white/5 hover:bg-white/10'
                }`}
              >
                <span className={`font-bold text-xs md:text-base leading-tight ${activeMember === idx ? 'text-white' : 'text-zinc-400 group-hover:text-white'}`}>
                  {member}
                </span>
                {activeMember === idx && <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-violet-200 animate-pulse shrink-0" />}
              </motion.button>
            ))}
          </div>

          {/* Card Preview */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/2 flex justify-center"
          >
            <div className="relative bg-gradient-to-br from-zinc-800 to-zinc-900 p-2 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl w-full max-w-sm transform transition-all duration-500 hover:scale-105 border border-zinc-700">
              <div className="absolute inset-0 bg-violet-500/20 blur-3xl -z-10 rounded-full"></div>
              <div className="bg-zinc-950 rounded-[1.8rem] md:rounded-[2.3rem] p-8 md:p-10 text-center h-full flex flex-col items-center justify-center min-h-[350px] md:min-h-[420px] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeMember}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10 flex flex-col items-center"
                  >
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-violet-400 to-fuchsia-600 rounded-full flex items-center justify-center text-4xl md:text-6xl font-black text-white mb-6 md:mb-8 shadow-xl shadow-violet-500/30">
                      {teamMembers[activeMember].charAt(0)}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight px-2">
                      {teamMembers[activeMember]}
                    </h3>
                    <p className="text-violet-400 font-bold uppercase tracking-widest text-[10px] md:text-xs mb-6 md:mb-8 bg-violet-900/30 px-3 py-1 rounded-full border border-violet-500/30">
                      Futuro Abogado
                    </p>
                  </motion.div>
                </AnimatePresence>
                
                <div className="relative z-10 flex gap-2">
                   <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
                   <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
                   <div className="w-2 h-2 rounded-full bg-violet-500 animate-ping"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ResourcesSection = () => (
  <section className="py-16 md:py-24 px-4 md:px-6 bg-zinc-900 text-white relative overflow-hidden" id="recursos">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
    <div className="max-w-4xl mx-auto relative z-10">
      <SectionHeader title="Material de Estudio" subtitle="Descargas" icon={Download} dark />
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* PPT Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-800 p-8 rounded-3xl border border-zinc-700 hover:border-violet-500/50 transition-all group flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 bg-violet-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Presentation className="w-8 h-8 text-violet-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">Diapositivas del Curso</h3>
          <p className="text-zinc-400 text-sm mb-6">Presentación completa utilizada en las sesiones.</p>
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <a href="/La Mediación _A.pdf" target="_blank" rel="noopener noreferrer" className="flex-1 py-3 bg-zinc-700 hover:bg-zinc-600 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 text-white">
              <Eye className="w-4 h-4" /> Visualizar
            </a>
            <a href="/La Mediación _A.pdf" download className="flex-1 py-3 bg-violet-600 hover:bg-violet-500 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> Descargar
            </a>
          </div>
        </motion.div>

        {/* PDF Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-800 p-8 rounded-3xl border border-zinc-700 hover:border-red-500/50 transition-all group flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <FileText className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">Trabajo Monográfia</h3>
          <p className="text-zinc-400 text-sm mb-6">Documento PDF con teoría y casos prácticos.</p>
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <a href="/Trabajo semestral de Teoría del Conflicto y Mecanismos de Resolución.pdf" target="_blank" rel="noopener noreferrer" className="flex-1 py-3 bg-zinc-700 hover:bg-zinc-600 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 text-white">
              <Eye className="w-4 h-4" /> Visualizar
            </a>
            <a href="/Trabajo semestral de Teoría del Conflicto y Mecanismos de Resolución.pdf" download className="flex-1 py-3 bg-red-600 hover:bg-red-500 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> Descargar
            </a>
          </div>
        </motion.div>

        {/* Proceso Folder */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-zinc-800 p-8 rounded-3xl border border-zinc-700 hover:border-blue-500/50 transition-all group flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Layout className="w-8 h-8 text-blue-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">Carpeta del Proceso</h3>
          <p className="text-zinc-400 text-sm mb-6">Documentación detallada de las etapas.</p>
          <div className="flex flex-col sm:flex-row gap-3 w-full">
             <button className="flex-1 py-3 bg-zinc-700/50 text-zinc-500 rounded-xl font-bold cursor-not-allowed flex items-center justify-center gap-2">
              <Folder className="w-4 h-4" /> Próximamente
            </button>
          </div>
        </motion.div>

        {/* Expediente Folder */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="bg-zinc-800 p-8 rounded-3xl border border-zinc-700 hover:border-yellow-500/50 transition-all group flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Folder className="w-8 h-8 text-yellow-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">Expediente Completo</h3>
          <p className="text-zinc-400 text-sm mb-6">Recopilación de todos los actuados.</p>
          <div className="flex flex-col sm:flex-row gap-3 w-full">
             <button className="flex-1 py-3 bg-zinc-700/50 text-zinc-500 rounded-xl font-bold cursor-not-allowed flex items-center justify-center gap-2">
              <Folder className="w-4 h-4" /> Próximamente
            </button>
          </div>
        </motion.div>

        {/* Acta Final Folder */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="bg-zinc-800 p-8 rounded-3xl border border-zinc-700 hover:border-emerald-500/50 transition-all group flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <ClipboardCheck className="w-8 h-8 text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">Acta Final</h3>
          <p className="text-zinc-400 text-sm mb-6">Modelo de acta de conciliación/mediación.</p>
          <div className="flex flex-col sm:flex-row gap-3 w-full">
             <button className="flex-1 py-3 bg-zinc-700/50 text-zinc-500 rounded-xl font-bold cursor-not-allowed flex items-center justify-center gap-2">
              <Folder className="w-4 h-4" /> Próximamente
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

// --- APP PRINCIPAL ---

const App = () => {
  return (
    <div className="font-sans antialiased text-zinc-600 selection:bg-violet-500 selection:text-white bg-white">
      <Navbar />
      <Hero />
      <TimelineSection />
      <SchoolsSection />
      <ProcessSection />
      <RoleSection />
      <ComparisonSection />
      
      {/* Intercultural Highlight */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-violet-600 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 md:w-20 md:h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 backdrop-blur-sm"
          >
             <Globe className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </motion.div>
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-6xl font-black mb-6 md:mb-8 tracking-tight"
          >
            Perú: Un Reto Intercultural
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl lg:text-2xl font-light mb-8 md:mb-12 text-violet-50 max-w-2xl mx-auto leading-relaxed"
          >
            Con <strong>54 pueblos indígenas</strong> y <strong>47 lenguas</strong>, la mediación es el único camino hacia una justicia real y accesible para todos.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-violet-900">
            {[
                { icon: "🗣️", title: "Diálogo", desc: "Superar barreras lingüísticas." },
                { icon: "🤝", title: "Respeto", desc: "Valorar cosmovisiones distintas." },
                { icon: "⚖️", title: "Paz", desc: "Justicia sin violencia." }
            ].map((card, i) => (
                <motion.div 
                  key={i} 
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  className="bg-white p-6 md:p-8 rounded-3xl shadow-xl transform hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="text-4xl md:text-5xl mb-4">{card.icon}</div>
                  <h4 className="font-black text-lg md:text-xl mb-2">{card.title}</h4>
                  <p className="text-xs md:text-sm font-medium text-violet-800/70">{card.desc}</p>
                </motion.div>
            ))}
          </div>
        </div>
      </section>

      <VideosSection />
      
      <ResourcesSection />

      <TeamSection />
      
      <footer className="bg-zinc-950 text-zinc-500 py-12 md:py-16 px-4 md:px-6 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
          <div className="text-center md:text-left">
            <h4 className="text-white font-bold text-base md:text-lg mb-2 flex items-center gap-2 justify-center md:justify-start">
              <Scale className="w-4 h-4 md:w-5 md:h-5 text-violet-500"/> UNSCH
            </h4>
            <p className="text-xs md:text-sm text-zinc-400">Teoría del Conflicto y Mecanismos de Resolución</p>
          </div>
          <div className="text-center md:text-right">
             <p className="text-[10px] md:text-xs text-zinc-600 mb-2">Docente: Paola Capcha Cabrera</p>
             <p className="text-[10px] md:text-xs text-zinc-600">&copy; 2025 Grupo 03. Ayacucho, Perú.</p>
          </div>
        </div>
      </footer>
      
      {/* Global Styles for Custom Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
          background-size: 200% 100%; 
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.8);
        }
      `}</style>
    </div>
  );
};

export default App;