import { Product, BrandingSettings } from './types';

export const INITIAL_BRANDING: BrandingSettings = {
  brandName: "STEAGG",
  luxurySlogan: "MINIMALISMO ARQUITECTÓNICO. FORMA SIN CONCESIONES.",
  kawaiiSlogan: "PARAÍSO PASTEL. DULCES CONJUNTOS DE ENSUEÑO.",
  heroTitle: "METAMORFOSIS ELEVADA",
  heroSubtitle: "Una selección curada de siluetas vanguardistas de caída fluida y dulces estéticas de alta costura.",
  heroImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&auto=format&fit=crop&q=80",
  announcementText: "ENVÍO MUNDIAL GRATUITO EN COMPRAS SUPERIORES A $300 USD",
  promotionBanner: "ESPECIAL DE TEMPORADA: DESCUBRE TU LADO MÁS SUAVE CON 15% DE DESCUENTO EN TODO EL PUNTO STE AGG. CÓDIGO: SWEET15",
  qrText: "DESCARGA LA APP DE STEAGG PARA LOS LANZAMIENTOS DE ARCHIVO",
  qrSubtext: "Consigue reservas prioritarias al instante, probadores de realidad aumentada y piezas sonoras personalizadas sincronizadas con cada lanzamiento."
};

export const INITIAL_PRODUCTS: Product[] = [
  // STEAGG - Premium / Elegante / Editorial / Minimalista
  {
    id: "p1",
    name: "Trench Deconstruido de Archivo",
    price: 380,
    originalPrice: 450,
    description: "Confeccionado en gabardina técnica de doble tejido y gran gramaje, este trench presenta caídas asimétricas, tapetas anti-tormenta totalmente desmontables y detalles de borde crudo utilitario.",
    category: "Abrigos",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=800&auto=format&fit=crop&q=80"
    ],
    brandMode: "STEAGG",
    rating: 4.9,
    reviews: [
      {
        id: "r1",
        user: "Amélie V.",
        rating: 5,
        text: "Las líneas arquitectónicas de este abrigo son extraordinarias. Pesado pero fluye como el agua al caminar. Una verdadera obra maestra.",
        date: "2026-05-18"
      },
      {
        id: "r2",
        user: "Kenji S.",
        rating: 4.8,
        text: "Calidad de material increíble. Los botones asimétricos ofrecen tres siluetas de estilo completamente distintas.",
        date: "2026-05-22"
      }
    ],
    features: ["Mezcla de algodón y gabardina de gran gramaje repelente al agua", "Sistema modular de tapetas anti-tormenta superpuestas", "Acabado de borde crudo cortado a láser", "Hebillas estructurales de metal grabado"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colorHexes: ["#1c1917", "#78716c", "#e7e5e4"],
    isNew: true,
    isFeatured: true,
    stock: 12
  },
  {
    id: "p2",
    name: "Punto Acanalado Estructurado de Galga Gruesa",
    price: 195,
    description: "Jersey de cuello tipo perkins de altura media con mangas extralargas abiertas. Tejido con lana merino orgánica cardada a mano, ofrece un peso estructurado con una caída sorprendentemente fresca.",
    category: "Punto",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80"
    ],
    brandMode: "STEAGG",
    rating: 4.7,
    reviews: [
      {
        id: "r3",
        user: "Marcus Thorne",
        rating: 5,
        text: "Los puños abiertos son preciosos. Ajusta en el pecho pero se relaja en la cintura. Un precioso tono crema cálido.",
        date: "2026-05-10"
      }
    ],
    features: ["100% lana merino orgánica de micraje fino", "Escote arquitectónico acanalado", "Puños extendidos de doble pliegue", "Silueta ligeramente cropped"],
    sizes: ["S", "M", "L"],
    colorHexes: ["#fafaf9", "#292524", "#a8a29e"],
    isNew: false,
    isFeatured: true,
    stock: 18
  },
  {
    id: "p3",
    name: "Vestido Lencero Cocoon de Caída Arquitectónica",
    price: 260,
    originalPrice: 310,
    description: "Un elegante vestido minimalista de crepé de seda cortado al bies. Abraza suavemente las curvas manteniendo una espalda con abertura geométrica y un bajo drapeado estructurado.",
    category: "Vestidos",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800&auto=format&fit=crop&q=80"
    ],
    brandMode: "STEAGG",
    rating: 4.8,
    reviews: [
      {
        id: "r4",
        user: "Viviana L.",
        rating: 4,
        text: "Absolutamente impresionante. Los tirantes son algo delicados, pero cae como un drapeado de mármol en movimiento.",
        date: "2026-05-14"
      }
    ],
    features: ["100% crepé de china de seda mulberry de gran gramaje", "Corte diagonal al bies", "Tirantes de hombro sin costuras ni herrajes", "Cola drapeada suave que reposa en el tobillo"],
    sizes: ["XXS", "XS", "S", "M", "L"],
    colorHexes: ["#1c1917", "#eae6df"],
    isNew: true,
    isFeatured: false,
    stock: 8
  },
  {
    id: "p4",
    name: "Blazer Monolito Estructurado Asimétrico",
    price: 420,
    description: "Una chaqueta entallada que desafía las estructuras de cuello tradicionales. Presenta solapas de pico superpuestas a medida que abrochan descentradas, bolsillos laterales internos ocultos y forro interior de satén.",
    category: "Abrigos",
    image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80"
    ],
    brandMode: "STEAGG",
    rating: 5.0,
    reviews: [],
    features: ["Tejido de lana virgen peinada", "Forro interior de seda Bemberg antiestático", "Cierre único descentrado de asta", "Estructura de hombreras acolchadas reforzadas a medida"],
    sizes: ["S", "M", "L", "XL"],
    colorHexes: ["#1c1917", "#44403c"],
    isNew: false,
    isFeatured: false,
    stock: 9
  },

  // STEAGG_KAWAII - Tierno / Pastel / Lila / Rosa / Elegante
  {
    id: "p5",
    name: "Sudadera Nube de Crema de Fresa",
    price: 135,
    originalPrice: 165,
    description: "Ríndete al confort esponjoso de esta sudadera oversize en tonos pastel caramelo. Presenta bordados de flor de cerezo personalizados, lazos de cinta bicolor en las muñecas y mangas sueltas de hada.",
    category: "Urbano",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1574169208507-84376144848b?w=800&auto=format&fit=crop&q=80"
    ],
    brandMode: "STEAGG_KAWAII",
    rating: 4.9,
    reviews: [
      {
        id: "r10",
        user: "Momo-chan",
        rating: 5,
        text: "¡AY MADRE MÍA! ¡Se siente como una nube cálida envolviéndome! ¡Los lacitos de conejito son tan pequeñitos y perfectos! ⸜(｡˃ ᵕ ˂ )⸝",
        date: "2026-05-29",
        avatar: "🐰"
      },
      {
        id: "r11",
        user: "Sophie B.",
        rating: 4.8,
        text: "La calidad del bordado es altísima. No pica nada por dentro. Los colores pastel son preciosos.",
        date: "2026-05-30",
        avatar: "🍡"
      }
    ],
    features: ["Algodón peinado y cepillado ultrasuave tipo felpa", "Fibras internas de poliéster tipo nube", "Cordones laterales de satén kawaii con estrellas de cristal", "Bolsillo frontal en forma de corazón con pespunte"],
    sizes: ["Talla única (S-L)", "XL"],
    colorHexes: ["#fbcfe8", "#e0f2fe", "#f5f5f4"],
    isNew: true,
    isFeatured: true,
    stock: 25
  },
  {
    id: "p6",
    name: "Vestido Chifón Sorbete de Ensueño",
    price: 215,
    description: "Un elegante y adorable vestido pastel por capas que celebra la dulce elegancia. Diseñado con tul lila personalizado, mangas abullonadas de organza translúcida y diminutos bordados de constelaciones.",
    category: "Vestidos",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80"
    ],
    brandMode: "STEAGG_KAWAII",
    rating: 4.9,
    reviews: [
      {
        id: "r12",
        user: "Airi H.",
        rating: 5,
        text: "Lo compré para una fiesta de té y recibí cumplidos sin fin. Silueta de ensueño perfecta (๑>ᴗ<๑)",
        date: "2026-05-25",
        avatar: "🌸"
      }
    ],
    features: ["Organza de seda lila pastel por capas", "Cordón ajustable de corsé en terciopelo rosa en la espalda", "Bordados celestiales en miniatura con brillos", "Cinta de escote ondulado simétrico"],
    sizes: ["XS", "S", "M", "L"],
    colorHexes: ["#e0e7ff", "#fbcfe8", "#fafaf9"],
    isNew: true,
    isFeatured: true,
    stock: 14
  },
  {
    id: "p7",
    name: "Cárdigan de Punto Malvavisco con Encaje",
    price: 155,
    originalPrice: 180,
    description: "Un cárdigan oversize súper grueso de hilo nube en tono pastel. Adornado con botones de estrella translúcidos, delicados bordes de encaje festoneado y flores tejidas a mano cerca del cuello.",
    category: "Punto",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=80"
    ],
    brandMode: "STEAGG_KAWAII",
    rating: 4.6,
    reviews: [
      {
        id: "r13",
        user: "Yuki-chan",
        rating: 4,
        text: "Súper cómodo, pero enganché el hilo con mi pulsera. ¡Hay que tratarlo con cariño! Pero en estilo es un 10/10.",
        date: "2026-05-11",
        avatar: "🐱"
      }
    ],
    features: ["Mezcla de hilo de alpaca súper suave", "Botones de estrella de auténtico nácar", "Costura fina de encaje festoneado", "Encantador corte cropped y holgado"],
    sizes: ["S-M", "M-L"],
    colorHexes: ["#fae8ff", "#bae6fd", "#faf5ff"],
    isNew: false,
    isFeatured: false,
    stock: 20
  },
  {
    id: "p8",
    name: "Falda Peto Pradera Pastel",
    price: 98,
    description: "Falda de pana de tiro alto en un magnífico cuadro de azul cielo suave y rosa empolvado. Presenta tirantes de peto modulares con mini volantes y lindas hebillas metálicas de ajuste.",
    category: "Faldas",
    image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&auto=format&fit=crop&q=80"
    ],
    brandMode: "STEAGG_KAWAII",
    rating: 4.7,
    reviews: [],
    features: ["Pana de canalé fino de terciopelo peinado", "Tirantes de peto desmontables con volantes", "Bolsillos laterales profundos ocultos", "Bolsillos traseros en forma de corazón"],
    sizes: ["S", "M", "L"],
    colorHexes: ["#bae6fd", "#fbcfe8"],
    isNew: false,
    isFeatured: false,
    stock: 35
  }
];

export const CATEGORIES_STEAGG = ["Todos", "Abrigos", "Punto", "Vestidos"];
export const CATEGORIES_KAWAII = ["Todos", "Vestidos", "Punto", "Urbano", "Faldas"];
