import type { Lang } from './data/properties'

export const copy = {
  brand: 'IBASA',
  legal: 'PT. Integrasi Bangun Perkasa',
  tagline: {
    id: 'Membangun Hari Ini, Mengukir Masa Depan',
    en: 'Building Today, Shaping Tomorrow',
  },
  kicker: {
    id: 'Katalog Properti Swasta',
    en: 'Private Property Catalogue',
  },
  edition: {
    id: 'Koleksi Industri & Komersial · 2026',
    en: 'Industrial & Commercial Collection · 2026',
  },
  open: {
    id: 'Buka Katalog',
    en: 'Open Catalogue',
  },
  drag: {
    id: 'Seret untuk memutar · klik untuk membuka',
    en: 'Drag to turn · click to open',
  },
  prototype: {
    id: 'Prototipe — data asli akan dimasukkan kemudian',
    en: 'Prototype — live listings will replace this data',
  },
  sample: {
    id: 'Data contoh',
    en: 'Sample data',
  },
  fromIbasa: {
    id: 'Dari portofolio IBASA',
    en: 'From the IBASA portfolio',
  },
  contents: {
    id: 'Daftar Isi',
    en: 'Contents',
  },
  collection: {
    id: 'Koleksi',
    en: 'The Collection',
  },
  region: {
    id: 'Peta Koridor',
    en: 'Corridor Map',
  },
  regionTitle: {
    id: 'Cirebon & Rebana',
    en: 'Cirebon & Rebana',
  },
  regionBody: {
    id: 'Aset dalam katalog ini berpusat pada Cirebon — pintu Jawa Barat timur — dan koridor Rebana menuju Patimban dan Kertajati. IBASA menutup siklus: properti, perizinan, konstruksi, hingga operasional.',
    en: 'Assets in this catalogue centre on Cirebon — the eastern gate of West Java — and the Rebana corridor toward Patimban and Kertajati. IBASA closes the cycle: property, permitting, construction, operations.',
  },
  manifestoTitle: {
    id: 'Satu pintu untuk tanah, bangunan, dan izin.',
    en: 'One door for land, buildings, and permits.',
  },
  manifesto: {
    id: 'IBASA menjual, menyewakan, dan mengembangkan properti industri serta komersial di Cirebon. Yang membedakan kami bukan brosur — melainkan kemampuan menutup perizinan, konstruksi, dan operasional dalam satu mitra. Katalog ini adalah ruang baca privat untuk aset yang sedang kami tawarkan.',
    en: 'IBASA sells, leases, and develops industrial and commercial property in Cirebon. What sets us apart is not a brochure — it is the ability to close permitting, construction, and operations with one partner. This catalogue is a private reading room for the assets we are bringing to market.',
  },
  values: [
    { id: 'Tanggung Jawab', en: 'Responsibility' },
    { id: 'Integritas', en: 'Integrity' },
    { id: 'Inovasi', en: 'Innovation' },
    { id: 'Kolaborasi', en: 'Collaboration' },
  ],
  enquire: {
    id: 'Hubungi IBASA',
    en: 'Enquire with IBASA',
  },
  page: {
    id: 'Halaman',
    en: 'Page',
  },
  of: {
    id: 'dari',
    en: 'of',
  },
  contactTitle: {
    id: 'Mari bicarakan tapaknya.',
    en: 'Let us talk about the pad.',
  },
  contactBody: {
    id: 'Data dalam prototipe ini sebagian adalah contoh. Kirim kebutuhan lahan, gudang, atau pabrik Anda — tim IBASA merespons dari Cirebon.',
    en: 'Some figures in this prototype are samples. Send your land, warehouse, or factory brief — the IBASA team replies from Cirebon.',
  },
  office: {
    id: 'Kantor',
    en: 'Office',
  },
  address:
    'Jalan Raya Bandengan – Mundu No. 9, Desa/Kelurahan Bandengan, Kec. Mundu, Kab. Cirebon, Jawa Barat 45173',
  email: 'contact@ibasa.co.id',
  nib: 'NIB 2110240218593',
  website: 'ibasa.co.id',
  back: {
    id: 'Kembali ke sampul',
    en: 'Back to cover',
  },
  next: {
    id: 'Berikutnya',
    en: 'Next',
  },
  prev: {
    id: 'Sebelumnya',
    en: 'Previous',
  },
  colophon: {
    id: 'Dicetak sebagai objek digital. Bukan penawaran mengikat hingga data resmi dimasukkan.',
    en: 'Printed as a digital object. Not a binding offer until official data is supplied.',
  },
  titleLeaf: {
    id: 'Katalog Properti',
    en: 'Property Catalogue',
  },
  letterKicker: {
    id: 'Catatan pembuka',
    en: 'Opening note',
  },
  photoCaption: {
    id: 'Fotografi placeholder',
    en: 'Placeholder photography',
  },
  specs: {
    id: 'Spesifikasi',
    en: 'Specifications',
  },
  highlights: {
    id: 'Keunggulan',
    en: 'Highlights',
  },
  preview3d: {
    id: 'Pratinjau 3D',
    en: '3D Preview',
  },
  close: {
    id: 'Tutup',
    en: 'Close',
  },
  previewHint: {
    id: 'Seret untuk memutar model properti ini',
    en: 'Drag to turn this property’s model',
  },
  previewUnavailable: {
    id: 'Pratinjau 3D tidak dapat dimuat.',
    en: 'The 3D preview could not be loaded.',
  },
} as const

export function t<T extends Record<Lang, string>>(dict: T, lang: Lang): string {
  return dict[lang]
}
