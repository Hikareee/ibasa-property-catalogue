export type Lang = 'id' | 'en'
export type PropertyStatus = 'for-sale' | 'for-lease' | 'leased' | 'coming-soon'
export type PropertyType = 'warehouse' | 'factory' | 'land' | 'commercial' | 'logistics'
export type Source = 'ibasa' | 'prototype'

export interface MassingConfig {
  kind: PropertyType
  body: string
  accent: string
  width: number
  depth: number
  height: number
  annex?: boolean
  yard?: boolean
}

export interface Spec {
  label: Record<Lang, string>
  value: Record<Lang, string>
}

export interface Property {
  id: string
  code: string
  source: Source
  name: Record<Lang, string>
  location: Record<Lang, string>
  type: PropertyType
  status: PropertyStatus
  landArea: number
  buildingArea?: number
  year: number
  price: Record<Lang, string>
  summary: Record<Lang, string>
  description: Record<Lang, string>
  highlights: Record<Lang, string[]>
  specs: Spec[]
  image: string
  massing: MassingConfig
}

export const typeLabel: Record<PropertyType, Record<Lang, string>> = {
  warehouse: { id: 'Gudang Industri', en: 'Industrial Warehouse' },
  factory: { id: 'Pabrik Siap Pakai', en: 'Ready Factory' },
  land: { id: 'Lahan Industri', en: 'Industrial Land' },
  commercial: { id: 'Komersial', en: 'Commercial' },
  logistics: { id: 'Hub Logistik', en: 'Logistics Hub' },
}

export const statusLabel: Record<PropertyStatus, Record<Lang, string>> = {
  'for-sale': { id: 'Dijual', en: 'For Sale' },
  'for-lease': { id: 'Disewakan', en: 'For Lease' },
  leased: { id: 'Disewakan · Portofolio', en: 'Leased · Portfolio' },
  'coming-soon': { id: 'Segera Hadir', en: 'Coming Soon' },
}

export function formatArea(n: number, lang: Lang) {
  return `${n.toLocaleString(lang === 'id' ? 'id-ID' : 'en-US')} m²`
}

export const properties: Property[] = [
  {
    id: 'winong-warehouse',
    code: 'IB-01',
    source: 'ibasa',
    name: {
      id: 'Gudang Winong, Cirebon',
      en: 'Winong Warehouse, Cirebon',
    },
    location: {
      id: 'Winong, Kabupaten Cirebon',
      en: 'Winong, Cirebon Regency',
    },
    type: 'warehouse',
    status: 'leased',
    landArea: 7000,
    buildingArea: 4000,
    year: 2026,
    price: { id: 'Portofolio — referensi', en: 'Portfolio — reference' },
    summary: {
      id: 'Gudang industri 7.000 m² lahan dengan 4.000 m² bangunan. Saat ini tersewa — aset referensi portofolio IBASA.',
      en: 'Industrial warehouse on 7,000 m² of land with 4,000 m² of building. Currently leased — an IBASA portfolio reference asset.',
    },
    description: {
      id: 'Gudang industri IBASA di Winong, Cirebon, menawarkan tapak operasional yang luas untuk logistik, penyimpanan, dan aktivitas industri. Tata massa mendukung bongkar-muat, sirkulasi antar bangunan, dan akses gerbang industri. Fasad biru-putih mencerminkan standar pabrik modern. Properti ini saat ini tersewa dan ditampilkan sebagai referensi portofolio.',
      en: 'IBASA’s industrial warehouse in Winong, Cirebon offers a spacious operational site for logistics, storage, and industrial activity. The massing supports loading, circulation between buildings, and industrial gate access. A blue-and-white facade reflects modern factory standards. The asset is currently leased and shown here as a portfolio reference.',
    },
    highlights: {
      id: [
        'Akses gerbang industri',
        'Jalur operasional antar bangunan',
        'Fasad industri biru-putih',
        'Kapasitas logistik yang longgar',
      ],
      en: [
        'Industrial gate access',
        'Operational lanes between buildings',
        'Blue-and-white industrial facade',
        'Generous logistics capacity',
      ],
    },
    specs: [
      {
        label: { id: 'Lahan', en: 'Land' },
        value: { id: '7.000 m²', en: '7,000 m²' },
      },
      {
        label: { id: 'Bangunan', en: 'Building' },
        value: { id: '4.000 m²', en: '4,000 m²' },
      },
      {
        label: { id: 'Status', en: 'Status' },
        value: { id: 'Disewa', en: 'Leased' },
      },
      {
        label: { id: 'Zona', en: 'Zoning' },
        value: { id: 'Industri', en: 'Industrial' },
      },
    ],
    image:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1800&q=80',
    massing: {
      kind: 'warehouse',
      body: '#d8dee8',
      accent: '#1d4ed8',
      width: 3.4,
      depth: 1.8,
      height: 0.85,
      annex: true,
      yard: true,
    },
  },
  {
    id: 'kanci-factory',
    code: 'IB-02',
    source: 'prototype',
    name: {
      id: 'Pabrik Siap Pakai Kanci',
      en: 'Kanci Ready Factory',
    },
    location: {
      id: 'Kanci, Astanajapura, Cirebon',
      en: 'Kanci, Astanajapura, Cirebon',
    },
    type: 'factory',
    status: 'for-sale',
    landArea: 12500,
    buildingArea: 6800,
    year: 2026,
    price: { id: 'Atas permintaan', en: 'Upon request' },
    summary: {
      id: 'Pabrik siap operasi di koridor Kanci — dekat klaster industri sepatu dan akses jalan provinsi.',
      en: 'A ready-to-operate factory on the Kanci corridor — near the footwear cluster and provincial road access.',
    },
    description: {
      id: 'Tapak pabrik di Kanci dirancang untuk tenant manufaktur yang membutuhkan tinggi eave, daya industri, dan halaman truk. Lokasi berada di jalur pertumbuhan industri Cirebon selatan, dekat proyek-proyek yang telah dikerjakan IBASA di kawasan yang sama. Data luas, harga, dan spesifikasi MEP adalah placeholder — akan diganti dengan data resmi.',
      en: 'A factory pad in Kanci designed for manufacturing tenants that need eave height, industrial power, and a truck yard. It sits on Cirebon’s southern industrial growth path, near projects IBASA has already delivered in the same district. Areas, pricing, and MEP specs are placeholders pending official data.',
    },
    highlights: {
      id: [
        'Tinggi eave 9 m (contoh)',
        'Daya industri 3 phase',
        'Halaman truk & dock',
        'Dekat klaster Kanci',
      ],
      en: [
        '9 m eave height (sample)',
        'Three-phase industrial power',
        'Truck yard and docks',
        'Beside the Kanci cluster',
      ],
    },
    specs: [
      {
        label: { id: 'Lahan', en: 'Land' },
        value: { id: '12.500 m²', en: '12,500 m²' },
      },
      {
        label: { id: 'Bangunan', en: 'Building' },
        value: { id: '6.800 m²', en: '6,800 m²' },
      },
      {
        label: { id: 'Eave', en: 'Eave' },
        value: { id: '9 m', en: '9 m' },
      },
      {
        label: { id: 'Daya', en: 'Power' },
        value: { id: 'Ada, 3 phase', en: 'Available, 3-phase' },
      },
    ],
    image:
      'https://images.unsplash.com/photo-1565610222536-ef125c59da2e?auto=format&fit=crop&w=1800&q=80',
    massing: {
      kind: 'factory',
      body: '#cfd5de',
      accent: '#b45309',
      width: 3.8,
      depth: 2.1,
      height: 1.15,
      annex: true,
      yard: true,
    },
  },
  {
    id: 'mundu-land',
    code: 'IB-03',
    source: 'prototype',
    name: {
      id: 'Lahan Industri Mundu Pesisir',
      en: 'Mundu Coastal Industrial Land',
    },
    location: {
      id: 'Mundu – Bandengan, Cirebon',
      en: 'Mundu – Bandengan, Cirebon',
    },
    type: 'land',
    status: 'for-sale',
    landArea: 24000,
    year: 2026,
    price: { id: 'Atas permintaan', en: 'Upon request' },
    summary: {
      id: 'Lahan industri pesisir dekat kantor IBASA — tapak pengembangan gudang, yard, atau pabrik baru.',
      en: 'Coastal industrial land near the IBASA office — a pad for a new warehouse, yard, or factory.',
    },
    description: {
      id: 'Kavling di koridor Bandengan–Mundu, jalur pesisir timur Cirebon yang tumbuh sebagai zona industri dan logistik. Dekat kantor IBASA, sehingga perizinan, konstruksi, dan legalitas dapat diikat dalam satu mitra. Kontur, SHM/HGB, dan harga adalah data contoh.',
      en: 'A plot on the Bandengan–Mundu corridor, Cirebon’s eastern coastal belt that is growing as an industrial and logistics zone. It sits near the IBASA office, so permitting, construction, and legality can sit with one partner. Contour, title, and pricing are sample data.',
    },
    highlights: {
      id: [
        'Koridor pesisir Bandengan',
        'Cocok gudang / yard / pabrik',
        'Satu pintu: izin + bangun',
        'Akses jalan raya Mundu',
      ],
      en: [
        'Bandengan coastal corridor',
        'Fits warehouse / yard / plant',
        'One door: permit + build',
        'Mundu highway access',
      ],
    },
    specs: [
      {
        label: { id: 'Lahan', en: 'Land' },
        value: { id: '24.000 m²', en: '24,000 m²' },
      },
      {
        label: { id: 'Bangunan', en: 'Building' },
        value: { id: 'Greenfield', en: 'Greenfield' },
      },
      {
        label: { id: 'Lebar muka', en: 'Frontage' },
        value: { id: '80 m (contoh)', en: '80 m (sample)' },
      },
      {
        label: { id: 'Hak', en: 'Title' },
        value: { id: 'HGB — TBD', en: 'HGB — TBD' },
      },
    ],
    image:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=80',
    massing: {
      kind: 'land',
      body: '#7d8a6a',
      accent: '#c5a059',
      width: 4.2,
      depth: 2.6,
      height: 0.08,
      yard: true,
    },
  },
  {
    id: 'plumbon-logistics',
    code: 'IB-04',
    source: 'prototype',
    name: {
      id: 'Hub Logistik Plumbon',
      en: 'Plumbon Logistics Hub',
    },
    location: {
      id: 'Plumbon, Cirebon — dekat Cipali',
      en: 'Plumbon, Cirebon — near Cipali',
    },
    type: 'logistics',
    status: 'for-lease',
    landArea: 9800,
    buildingArea: 5200,
    year: 2026,
    price: { id: 'Atas permintaan / m² / tahun', en: 'Upon request / m² / year' },
    summary: {
      id: 'Gudang distribusi dengan yard kontainer, menghadap koridor Cipali untuk rute Jakarta–Cirebon.',
      en: 'A distribution warehouse with a container yard, facing the Cipali corridor for Jakarta–Cirebon routes.',
    },
    description: {
      id: 'Dirancang sebagai titik break-bulk untuk tenant 3PL dan FMCG. Dock leveler, kantor mezzanine, dan lapangan kontainer menjadi paket sewa. Jarak ke gerbang tol adalah perkiraan prototipe. IBASA dapat mengikat sewa, fit-out, dan perizinan operasional.',
      en: 'Designed as a break-bulk node for 3PL and FMCG tenants. Dock levelers, a mezzanine office, and a container yard come as a lease package. Distance to the toll gate is a prototype estimate. IBASA can bind lease, fit-out, and operating permits.',
    },
    highlights: {
      id: [
        'Yard kontainer',
        'Dock leveler (contoh 8 unit)',
        'Mezzanine office',
        'Akses koridor Cipali',
      ],
      en: [
        'Container yard',
        'Dock levelers (sample: 8)',
        'Mezzanine office',
        'Cipali corridor access',
      ],
    },
    specs: [
      {
        label: { id: 'Lahan', en: 'Land' },
        value: { id: '9.800 m²', en: '9,800 m²' },
      },
      {
        label: { id: 'Bangunan', en: 'Building' },
        value: { id: '5.200 m²', en: '5,200 m²' },
      },
      {
        label: { id: 'Clear height', en: 'Clear height' },
        value: { id: '11 m', en: '11 m' },
      },
      {
        label: { id: 'Dock', en: 'Docks' },
        value: { id: '8 unit', en: '8 bays' },
      },
    ],
    image:
      'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1800&q=80',
    massing: {
      kind: 'logistics',
      body: '#d4cfc4',
      accent: '#1e3a5f',
      width: 3.6,
      depth: 1.9,
      height: 1.0,
      annex: true,
      yard: true,
    },
  },
  {
    id: 'cirebon-ruko',
    code: 'IB-05',
    source: 'prototype',
    name: {
      id: 'Ruko Komersial Cirebon Kota',
      en: 'Cirebon City Commercial Row',
    },
    location: {
      id: 'Pusat Kota Cirebon',
      en: 'Cirebon City Centre',
    },
    type: 'commercial',
    status: 'for-sale',
    landArea: 840,
    buildingArea: 1680,
    year: 2026,
    price: { id: 'Atas permintaan', en: 'Upon request' },
    summary: {
      id: 'Deret ruko 3 lantai di koridor niaga kota — showroom, kantor, dan stok di satu massa.',
      en: 'A three-storey commercial row on a city trade corridor — showroom, office, and stock in one mass.',
    },
    description: {
      id: 'Properti komersial untuk brand yang butuh muka jalan di Cirebon kota. Tipe deret memungkinkan strata atau sewa per unit. IBASA menutup sisi legal, renovasi, dan digitalisasi tenant. Alamat persis dan harga unit adalah placeholder.',
      en: 'A commercial asset for brands that need street frontage in Cirebon city. The row typology allows strata or per-unit leasing. IBASA covers legality, renovation, and tenant digitalisation. Exact address and unit prices are placeholders.',
    },
    highlights: {
      id: [
        'Muka jalan utama',
        '3 lantai × deret',
        'Cocok showroom + stok',
        'Paket renovasi IBASA',
      ],
      en: [
        'Primary street frontage',
        '3 storeys × row',
        'Showroom + stock ready',
        'IBASA renovation package',
      ],
    },
    specs: [
      {
        label: { id: 'Lahan', en: 'Land' },
        value: { id: '840 m²', en: '840 m²' },
      },
      {
        label: { id: 'Bangunan', en: 'Building' },
        value: { id: '1.680 m²', en: '1,680 m²' },
      },
      {
        label: { id: 'Lantai', en: 'Floors' },
        value: { id: '3', en: '3' },
      },
      {
        label: { id: 'Unit', en: 'Units' },
        value: { id: '6 (contoh)', en: '6 (sample)' },
      },
    ],
    image:
      'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1800&q=80',
    massing: {
      kind: 'commercial',
      body: '#e8e0d4',
      accent: '#1d4ed8',
      width: 2.8,
      depth: 1.4,
      height: 1.45,
      annex: false,
    },
  },
  {
    id: 'rebana-plot',
    code: 'IB-06',
    source: 'prototype',
    name: {
      id: 'Kavling Koridor Rebana',
      en: 'Rebana Corridor Plot',
    },
    location: {
      id: 'Koridor Cirebon–Patimban–Kertajati',
      en: 'Cirebon–Patimban–Kertajati corridor',
    },
    type: 'land',
    status: 'coming-soon',
    landArea: 50000,
    year: 2026,
    price: { id: 'Pre-release · atas permintaan', en: 'Pre-release · upon request' },
    summary: {
      id: 'Kavling greenfield di jalur pertumbuhan Rebana — untuk pabrik, logistik, atau kampus industri.',
      en: 'A greenfield plot on the Rebana growth path — for a plant, logistics, or an industrial campus.',
    },
    description: {
      id: 'Rebana (Cirebon–Patimban–Kertajati) adalah koridor industri Jawa Barat yang sedang dibentuk. Kavling ini adalah placeholder untuk tanah siap tawar yang akan IBASA bawa ke katalog. Luas 5 ha, peruntukan industri, dan paket perizinan OSS adalah kerangka prototipe.',
      en: 'Rebana (Cirebon–Patimban–Kertajati) is West Java’s forming industrial corridor. This plot is a placeholder for land IBASA will bring to the catalogue. A 5 ha industrial allocation and an OSS permitting package are the prototype frame.',
    },
    highlights: {
      id: [
        'Koridor metropolitan Rebana',
        '5 hektar greenfield',
        'Paket OSS & AMDAL (kerangka)',
        'Skenario design & build',
      ],
      en: [
        'Rebana metropolitan corridor',
        '5 hectare greenfield',
        'OSS & AMDAL package (frame)',
        'Design & build scenario',
      ],
    },
    specs: [
      {
        label: { id: 'Lahan', en: 'Land' },
        value: { id: '50.000 m²', en: '50,000 m²' },
      },
      {
        label: { id: 'Bangunan', en: 'Building' },
        value: { id: 'Masterplan', en: 'Masterplan' },
      },
      {
        label: { id: 'Peruntukan', en: 'Use' },
        value: { id: 'Industri', en: 'Industrial' },
      },
      {
        label: { id: 'Rilis', en: 'Release' },
        value: { id: 'Segera', en: 'Forthcoming' },
      },
    ],
    image:
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1800&q=80',
    massing: {
      kind: 'land',
      body: '#6f7d62',
      accent: '#c5a059',
      width: 4.6,
      depth: 2.8,
      height: 0.06,
      yard: true,
    },
  },
]
