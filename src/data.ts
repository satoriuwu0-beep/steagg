import { Product, BrandingSettings } from './types';

export const INITIAL_BRANDING: BrandingSettings = {
  brandName: "STEAGG",
  luxurySlogan: "ARCHITECTURAL MINIMALISM. UNCOMPROMISING FORM.",
  kawaiiSlogan: "PASTEL HEAVEN. SWEET ELEGANT DREAMSETS.",
  heroTitle: "ELEVATED METAMORPHOSIS",
  heroSubtitle: "A curated curation of avant-garde silhouette drapery and sweet high-end tailored aesthetics.",
  heroImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&auto=format&fit=crop&q=80",
  announcementText: "COMPLIMENTARY WORLDWIDE ARCHIVAL SHIPPING ON TRANSACTIONS EXCEEDING $300 USD",
  promotionBanner: "SEASON SPECIAL: REVEAL INNER SOFTNESS WITH 15% OFF ALL CORE STE AGG KNITS. CODE: SWEET15",
  qrText: "DOWNLOAD THE STEAGG APP FOR ARCHIVAL DROPS",
  qrSubtext: "Gain instant priority reservations, augmented-reality fitting suites, and custom sound pieces synced to each launch.",
  whatsappNumber: "573004833531"
};

export const INITIAL_PRODUCTS: Product[] = [
  // STEAGG - Premium / Elegant / Editorial/ Minimal
  {
    id: "p1",
    name: "Archival Deconstructed Trench",
    price: 380,
    originalPrice: 450,
    description: "Crafted from heavy double-weave technical gabardine, this trench coat exhibits asymmetrical drapes, storm flaps that can be completely detached, and utility raw edge detailing.",
    category: "Outerwear",
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
        text: "The architectural lines of this coat are remarkable. Heavy but flows like water when traveling. True masterwork.",
        date: "2026-05-18"
      },
      {
        id: "r2",
        user: "Kenji S.",
        rating: 4.8,
        text: "Incredible material quality. The asymmetrical buttons give three completely different styling silhouettes.",
        date: "2026-05-22"
      }
    ],
    features: ["Water-repellent heavy gabardine cotton blend", "Modular overlay storm flap system", "Raw-edge laser-cut finishing", "Engraved gunmetal structural buckles"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colorHexes: ["#1c1917", "#78716c", "#e7e5e4"],
    isNew: true,
    isFeatured: true,
    stock: 12
  },
  {
    id: "p2",
    name: "Heavy-Gauge Structured Rib Knit",
    price: 195,
    description: "Medium-height mock collar sweater featuring extra-long split sleeves. Knitted with hand-combed organic merino wool, offering structured weight with a surprisingly cooling drape.",
    category: "Knitwear",
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
        text: "The split cuffs are beautiful. Fits tightly around the chest but eases in the waist. Beautiful warm cream shade.",
        date: "2026-05-10"
      }
    ],
    features: ["100% fine micron organic merino wool", "Ribbed architectural neckline", "Extended double-folded cuffs", "Slightly cropped profile"],
    sizes: ["S", "M", "L"],
    colorHexes: ["#fafaf9", "#292524", "#a8a29e"],
    isNew: false,
    isFeatured: true,
    stock: 18
  },
  {
    id: "p3",
    name: "Architectural Drape Cocoon Slip",
    price: 260,
    originalPrice: 310,
    description: "An elegant, silk-crepe minimalist bias-cut dress. Gently hugs the contours while maintaining a dramatic geometric back cutout and a structured pooled cowl hem.",
    category: "Dresses",
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
        text: "Absolutely stunning. A bit delicate on the straps, but fits like dynamic marble drapery.",
        date: "2026-05-14"
      }
    ],
    features: ["100% heavy mulberry silk crepe de chine", "Diagonal bias grain line cutting", "Zero-hardware seamless shoulder loops", "Ankle pooled soft drape tail"],
    sizes: ["XXS", "XS", "S", "M", "L"],
    colorHexes: ["#1c1917", "#eae6df"],
    isNew: true,
    isFeatured: false,
    stock: 8
  },
  {
    id: "p4",
    name: "Asymmetric Structured Monolith Blazer",
    price: 420,
    description: "A tailored jacket defying traditional collar structures. Features custom layered peak lapels that button off-center, hidden internal side pocket slits, and satin interior finish.",
    category: "Outerwear",
    image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80"
    ],
    brandMode: "STEAGG",
    rating: 5.0,
    reviews: [],
    features: ["Virgin worsted wool weave", "Bemberg silk anti-static inner lining", "Single offset horn fastening", "Reinforced custom shoulder padded framework"],
    sizes: ["S", "M", "L", "XL"],
    colorHexes: ["#1c1917", "#44403c"],
    isNew: false,
    isFeatured: false,
    stock: 9
  },

  // STEAGG_KAWAII - Cute / Pastel / Lilac / Pink / Elegant
  {
    id: "p5",
    name: "Strawberry Cream Cloud Sweatshirt",
    price: 135,
    originalPrice: 165,
    description: "Surrender to the plush comfort of this oversized pastel candy sweatshirt. Features custom embroidered cherry-blossom patterns, dual-tone ribbon bow ties on the wrists, and super loose fairy sleeves.",
    category: "Streetwear",
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
        text: "OH MY GOSH! It feels like a literal warm cloud wrapping around me! The little bunny bows are so tiny and perfect! ⸜(｡˃ ᵕ ˂ )⸝",
        date: "2026-05-29",
        avatar: "🐰"
      },
      {
        id: "r11",
        user: "Sophie B.",
        rating: 4.8,
        text: "The embroidery quality is high. Not itchy at all inside. Colors are beautiful pastels.",
        date: "2026-05-30",
        avatar: "🍡"
      }
    ],
    features: ["Ultra-soft fleece brushed combed cotton", "Polyester cloud-puff inner fibers", "Kawaii satin side laces with crystal stars", "Stitch-framed heart-cut pouch in front"],
    sizes: ["One Size (S-L)", "XL"],
    colorHexes: ["#fbcfe8", "#e0f2fe", "#f5f5f4"],
    isNew: true,
    isFeatured: true,
    stock: 25
  },
  {
    id: "p6",
    name: "Chiffon Sherbet Flurry Dress",
    price: 215,
    description: "An elegant, lovely tier-layered pastel dress celebrating sweet elegance. Designed with custom lilac tulle, sheer organza puffy sleeves, and tiny constellation embroidery.",
    category: "Dresses",
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
        text: "Purchased this for tea party event and got endless compliments. Perfect dreamy silhouette (๑>ᴗ<๑)",
        date: "2026-05-25",
        avatar: "🌸"
      }
    ],
    features: ["Layered pastel lilac silk organza", "Adjustable pink velvet back corset lace", "Sparkling miniature celestial embroideries", "Symmetric wavy scallop neck ribbon"],
    sizes: ["XS", "S", "M", "L"],
    colorHexes: ["#e0e7ff", "#fbcfe8", "#fafaf9"],
    isNew: true,
    isFeatured: true,
    stock: 14
  },
  {
    id: "p7",
    name: "Lace-Trimmed Marshmallow Knit Cardigan",
    price: 155,
    originalPrice: 180,
    description: "A super chunky, cloud-yarn oversized pastel cardigan. Adorned with translucent star buttons, delicate scalloped lace edges, and hand-woven flower blossoms near the collar.",
    category: "Knitwear",
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
        text: "Very cozy, but snagged the yarn on my bracelet. Be gentle! But style count is 10/10.",
        date: "2026-05-11",
        avatar: "🐱"
      }
    ],
    features: ["Super soft alpaca yarn blend", "Genuine mother-of-pearl star button hardware", "Scalloped fine lace stitching", "Delightfully long slouchy crop fit"],
    sizes: ["S-M", "M-L"],
    colorHexes: ["#fae8ff", "#bae6fd", "#faf5ff"],
    isNew: false,
    isFeatured: false,
    stock: 20
  },
  {
    id: "p8",
    name: "Pastel Meadow Apron Skirt",
    price: 98,
    description: "High-waisted corduroy skirt in a magnificent soft sky blue and dusty pink check. Features modular suspender straps styled with miniature frills and cute metal adjustment buckles.",
    category: "Bottoms",
    image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&auto=format&fit=crop&q=80"
    ],
    brandMode: "STEAGG_KAWAII",
    rating: 4.7,
    reviews: [],
    features: ["Fine-wale high-combed velvet corduroy", "Removable ruffling suspender straps", "Hidden deep side pockets", "Sweet-heart back pocket shaping"],
    sizes: ["S", "M", "L"],
    colorHexes: ["#bae6fd", "#fbcfe8"],
    isNew: false,
    isFeatured: false,
    stock: 35
  }
];

export const CATEGORIES_STEAGG = ["All Items", "Dark", "Sport", "Elegant", "Cosplay", "Día a día"];
export const CATEGORIES_KAWAII = ["All Items", "Erotic", "Kawaii", "Sweet", "Dark vs Light"];
