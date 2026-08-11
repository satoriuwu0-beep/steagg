import { Product, BrandingSettings } from './types';

export const INITIAL_BRANDING: BrandingSettings = {
  brandName: "STEAGG",
  luxurySlogan: "ESTILO QUE SE SIENTE. MODA QUE SE VIVE.",
  kawaiiSlogan: "DULCE POR FUERA. FUEGO POR DENTRO.",
  heroTitle: "TU ESTILO, TU REGLA",
  heroSubtitle: "Ropa que dice algo antes de que tú hables. Piezas únicas para personas que no siguen tendencias — las crean.",
  heroImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&auto=format&fit=crop&q=80",
  announcementText: "ENVÍO GRATIS EN TODO COLOMBIA · PIEZAS LIMITADAS · NUEVA COLECCIÓN DISPONIBLE",
  promotionBanner: "ESPECIAL DE TEMPORADA: 15% DE DESCUENTO EN TODA LA COLECCIÓN. CÓDIGO: SWEET15",
  qrText: "DESCARGA LA APP DE STEAGG",
  qrSubtext: "Accede a lanzamientos exclusivos, pruebas virtuales y piezas únicas antes que nadie.",
  whatsappNumber: "573004833531"
};

export const INITIAL_PRODUCTS: Product[] = [
  // STEAGG - Premium / Elegante / Editorial / Minimal
  {
    id: "p1",
    name: "Gabardina Deconstruida Archival",
    price: 190000,
    originalPrice: 220000,
    description: "Elaborada en gabardina técnica de doble tejido, esta gabardina exhibe drapeados asimétricos, solapas desmontables y acabados de borde vivo. Una pieza que desafía la forma convencional.",
    category: "Día a día",
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
        user: "Valentina M.",
        rating: 5,
        text: "Las líneas arquitectónicas de esta gabardina son extraordinarias. Pesada pero fluye como agua. Una obra maestra.",
        date: "2026-05-18"
      },
      {
        id: "r2",
        user: "Julián S.",
        rating: 4.8,
        text: "Calidad de material increíble. Los botones asimétricos dan tres siluetas completamente diferentes.",
        date: "2026-05-22"
      }
    ],
    features: ["Gabardina de algodón repelente al agua", "Sistema de solapas modulares desmontables", "Acabado de corte láser en bruto", "Hebillas estructurales de metal gunmetal grabado"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colorHexes: ["#1c1917", "#78716c", "#e7e5e4"],
    isNew: true,
    isFeatured: true,
    stock: 12
  },
  {
    id: "p2",
    name: "Suéter Acanalado Estructurado",
    price: 150000,
    description: "Suéter de cuello alto con mangas extra largas divididas. Tejido con lana merino orgánica peinada a mano, ofrece peso estructurado con un drapeado sorprendentemente fresco.",
    category: "Elegant",
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
        user: "Carlos Reyes",
        rating: 5,
        text: "Los puños divididos son hermosos. Queda ajustado en el pecho pero suelta en la cintura. Tono crema precioso.",
        date: "2026-05-10"
      }
    ],
    features: ["100% lana merino orgánica fina", "Cuello acanalado arquitectónico", "Puños dobles extendidos y doblados", "Silueta ligeramente cropped"],
    sizes: ["S", "M", "L"],
    colorHexes: ["#fafaf9", "#292524", "#a8a29e"],
    isNew: false,
    isFeatured: true,
    stock: 18
  },
  {
    id: "p3",
    name: "Vestido Camisola Drapeado Minimal",
    price: 175000,
    originalPrice: 200000,
    description: "Elegante vestido minimalista de crepé de seda al bies. Abraza suavemente las curvas manteniendo un dramático escote geométrico en la espalda y dobladillo estructurado en cascada.",
    category: "Elegant",
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
        user: "Luciana P.",
        rating: 4,
        text: "Absolutamente impresionante. Un poco delicado en los tirantes, pero cae como mármol dinámico.",
        date: "2026-05-14"
      }
    ],
    features: ["100% crepé de seda mulberry pesado", "Corte diagonal al bies", "Hombros sin herrajes", "Cola suave pooled en tobillo"],
    sizes: ["XXS", "XS", "S", "M", "L"],
    colorHexes: ["#1c1917", "#eae6df"],
    isNew: true,
    isFeatured: false,
    stock: 8
  },
  {
    id: "p4",
    name: "Blazer Monolito Asimétrico",
    price: 195000,
    description: "Chaqueta sastre que desafía las estructuras tradicionales de cuello. Presenta solapas de pico personalizadas abotonadas fuera de centro, bolsillos laterales ocultos y acabado interior en satén.",
    category: "Elegant",
    image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80"
    ],
    brandMode: "STEAGG",
    rating: 5.0,
    reviews: [],
    features: ["Lana virgen worsted tejida", "Forro interior antiestático de seda Bemberg", "Botón único desplazado de cuerno", "Hombros estructurados y reforzados"],
    sizes: ["S", "M", "L", "XL"],
    colorHexes: ["#1c1917", "#44403c"],
    isNew: false,
    isFeatured: false,
    stock: 9
  },

  // STEAGG_KAWAII - Lindo / Pastel / Lila / Rosa / Elegante
  {
    id: "p5",
    name: "Sudadera Nube Fresa y Crema",
    price: 120000,
    originalPrice: 145000,
    description: "Rindete al suave confort de esta sudadera oversized de caramelo pastel. Con bordados de flor de cerezo, lazos bicolor en las muñecas y mangas de hada super sueltas.",
    category: "Sweet",
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
        text: "¡Es literalmente una nube cálida envolviéndome! Los lazos de conejito son tan perfectos! ⸜(｡˃ ᵕ ˂ )⸝",
        date: "2026-05-29",
        avatar: "🐰"
      },
      {
        id: "r11",
        user: "Sofía B.",
        rating: 4.8,
        text: "La calidad del bordado es alta. Nada rasposo por dentro. Los colores pastel son preciosos.",
        date: "2026-05-30",
        avatar: "🍡"
      }
    ],
    features: ["Algodón peinado ultra suave con felpa cepillada", "Fibras internas acolchadas tipo nube", "Lazos de satén Kawaii con estrellas de cristal", "Bolsillo frontal con forma de corazón costurado"],
    sizes: ["Talla única (S-L)", "XL"],
    colorHexes: ["#fbcfe8", "#e0f2fe", "#f5f5f4"],
    isNew: true,
    isFeatured: true,
    stock: 25
  },
  {
    id: "p6",
    name: "Vestido Gasa Sorbete en Capas",
    price: 165000,
    description: "Elegante vestido pastel en capas que celebra la dulce elegancia. Diseñado con tul lila personalizado, mangas esponjosas de organza transparente y pequeños bordados de constelaciones.",
    category: "Kawaii",
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
        text: "Lo compré para una fiesta y recibí cumplidos sin parar. Silueta de ensueño perfecta (๑>ᴗ<๑)",
        date: "2026-05-25",
        avatar: "🌸"
      }
    ],
    features: ["Organza de seda lila pastel en capas", "Corsé trasero ajustable de terciopelo rosa", "Bordados celestiales miniatura brillantes", "Cuello ondulado simétrico con cinta"],
    sizes: ["XS", "S", "M", "L"],
    colorHexes: ["#e0e7ff", "#fbcfe8", "#fafaf9"],
    isNew: true,
    isFeatured: true,
    stock: 14
  },
  {
    id: "p7",
    name: "Cardigan Malvavisco con Encaje",
    price: 118000,
    originalPrice: 140000,
    description: "Cardigan súper voluminoso de hilo nube en pastel oversized. Adornado con botones de estrella translúcidos, delicados bordes de encaje festoneado y flores tejidas a mano cerca del cuello.",
    category: "Sweet",
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
        text: "Muy acogedor, ¡pero ten cuidado con las pulseras! El estilo es 10/10.",
        date: "2026-05-11",
        avatar: "🐱"
      }
    ],
    features: ["Mezcla de hilo de alpaca súper suave", "Botones de estrella de nácar genuino", "Costura de encaje festoneado fino", "Corte slouchy deliciosamente largo"],
    sizes: ["S-M", "M-L"],
    colorHexes: ["#fae8ff", "#bae6fd", "#faf5ff"],
    isNew: false,
    isFeatured: false,
    stock: 20
  },
  {
    id: "p8",
    name: "Falda Jardín Pastel con Tirantes",
    price: 95000,
    description: "Falda de pana de talle alto en un magnifico cuadro azul cielo suave y rosa empolvado. Incluye tirantes modulares con pequeños volantes y lindos broches de ajuste metálicos.",
    category: "Kawaii",
    image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&auto=format&fit=crop&q=80"
    ],
    brandMode: "STEAGG_KAWAII",
    rating: 4.7,
    reviews: [],
    features: ["Pana de terciopelo fino peinado", "Tirantes con volantes removibles", "Bolsillos laterales profundos ocultos", "Bolsillo trasero en forma de corazón"],
    sizes: ["S", "M", "L"],
    colorHexes: ["#bae6fd", "#fbcfe8"],
    isNew: false,
    isFeatured: false,
    stock: 35
  }
];

export const CATEGORIES_STEAGG = ["Todos", "Dark", "Sport", "Elegant", "Cosplay", "Día a día"];
export const CATEGORIES_KAWAII = ["Todos", "Erótico", "Kawaii", "Sweet", "Dark vs Light"];
