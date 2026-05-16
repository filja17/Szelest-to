/* ══════════════════════════════════════
   data.js — all content / album data
   Edit this file to change albums, projects,
   products, contact info, about text, etc.
══════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────
   ALBUMS (main scroll journey)
   Each album generates a cluster of
   world elements around its band.
───────────────────────────────────── */
const ALBUMS = [
  {
    title: 'Puste Niebo',
    year:  '2019',
    tags:  ['drone', 'field recording', 'ambient'],
    desc:  'Zapis ciszy przed burzą. Warstwy dronów splecione z nagraniami terenowymi deszczu.',
    quote: 'Cisza nie jest brakiem dźwięku — jest jego najgłębszą formą.',
    color: '#c8a040',
    bg1:   '#0d0d1f',
    bg2:   '#1a0e2e',
  },
  {
    title: 'Szlest',
    year:  '2019',
    tags:  ['urban', 'noise', 'experimental'],
    desc:  'Miejska noc — szelest liści, metaliczny oddech wentylacji, odległe kroki.',
    quote: 'Każde miasto ma swój własny oddech — wystarczy go posłuchać.',
    color: '#9b3d2b',
    bg1:   '#1a0e08',
    bg2:   '#2a1408',
  },
  {
    title: 'Nota contra Notam',
    year:  '2020',
    tags:  ['counterpoint', 'minimalism', 'structure'],
    desc:  'Dwa głosy prowadzone niezależnie, spotykające się w nieoczekiwanych momentach.',
    quote: 'Dwie linie melodyczne — dwa sposoby rozumienia świata.',
    color: '#5a8a3a',
    bg1:   '#0a1408',
    bg2:   '#0d1e0a',
  },
  {
    title: 'Among Other Sounds',
    year:  '2021',
    tags:  ['collaborative', 'improvisation', 'global'],
    desc:  'Kolektywna improwizacja z muzykami z różnych kontynentów. Muzyka jako dialog.',
    quote: 'Wszystkie dźwięki istnieją jednocześnie — to my je rozdzielamy.',
    color: '#8a3a9a',
    bg1:   '#120810',
    bg2:   '#1e0e18',
  },
  {
    title: 'Drumless Blond Heads',
    year:  '2021',
    tags:  ['beatless', 'texture', 'drift'],
    desc:  'Rytm zawieszony. Muzyka bez pulsacji — płynąca jak sen bez kierunku.',
    quote: 'Kiedy zniknie rytm, zostaje czas.',
    color: '#3a8aaa',
    bg1:   '#080d14',
    bg2:   '#0e1520',
  },
  {
    title: 'Fioletowe Trójkąty',
    year:  '2022',
    tags:  ['spatial audio', 'electronic', 'geometry'],
    desc:  'Eksploracja przestrzeni stereofonicznej. Geometria dźwięku w trzech wymiarach.',
    quote: 'Dźwięk ma kształt — tylko wzrok nam to ukrywa.',
    color: '#aa3aaa',
    bg1:   '#100810',
    bg2:   '#1a0e1a',
  },
  {
    title: 'Zielone Fale',
    year:  '2022',
    tags:  ['memory', 'synthesis', 'personal'],
    desc:  'Pamięć zakodowana w fali dźwiękowej. Nagrania z dzieciństwa przez syntezatory.',
    quote: 'Każde wspomnienie ma swój własny odcień dźwięku.',
    color: '#3aaa5a',
    bg1:   '#081008',
    bg2:   '#0d1a0e',
  },
  {
    title: 'Czerwone Południe',
    year:  '2023',
    tags:  ['heat', 'drone', 'mediterranean'],
    desc:  'Upał jako dźwięk, cisza sjesty jako struktura kompozycji.',
    quote: 'Południe jest nocą dla tych, którzy nie śpią.',
    color: '#cc3030',
    bg1:   '#150808',
    bg2:   '#200e0a',
  },
  {
    title: 'Granica Słyszalności',
    year:  '2023',
    tags:  ['infrasound', 'perception', 'limit'],
    desc:  'Eksperyment na granicy percepcji. Co kryje się poza granicami naszych zmysłów?',
    quote: 'Istnieje cały wszechświat dźwięków, których nie słyszymy.',
    color: '#4a5aaa',
    bg1:   '#080a14',
    bg2:   '#0e1022',
  },
  {
    title: 'Punkt Zerowy',
    year:  '2024',
    tags:  ['retrospective', 'silence', 'return'],
    desc:  'Powrót do źródła. Dziesięć lat w jednym albumie. Cisza jako kulminacja.',
    quote: 'Każda podróż, która ma sens, wraca tam skąd wyruszyła.',
    color: '#c8a040',
    bg1:   '#100e08',
    bg2:   '#1a1810',
  },
];

/* ─────────────────────────────────────
   PROJECTS (subpage)
───────────────────────────────────── */
const PROJECTS = [
  {
    num:   '01',
    name:  'Szlest',
    sub:   'urban ambient / field recording / 2019–ongoing',
    desc:  'Nagrania dźwięków miejskiej nocy. Projekt długoterminowy, wciąż rozwijany.',
    link:  '#',
  },
  {
    num:   '02',
    name:  'Nota contra Notam',
    sub:   'minimalism / counterpoint / 2020',
    desc:  'Kontrapunkt jako filozofia. Studium dwóch głosów.',
    link:  '#',
  },
  {
    num:   '03',
    name:  'Among Other Sounds',
    sub:   'collaborative / improvisation / 2021',
    desc:  'Wspólna improwizacja z muzykami z Europy, Azji i obu Ameryk.',
    link:  '#',
  },
  {
    num:   '04',
    name:  'Drumless Blond Heads',
    sub:   'beatless ambient / texture / 2021',
    desc:  'Muzyka bez rytmu — eksperyment z percepcją czasu.',
    link:  '#',
  },
];

/* ─────────────────────────────────────
   PRODUCTS (subpage)
   formats: 'Vinyl' | 'Kaseta' | 'Digital' | 'CD'
───────────────────────────────────── */
const PRODUCTS = ALBUMS.slice(0, 8).map((a, i) => ({
  album:  a,
  format: ['Vinyl 180g', 'Kaseta / lim.', 'Digital WAV', 'CD Digipak', '2×LP color', 'Vinyl', 'Digital', 'Kaseta'][i],
  price:  [89, 35, 25, 120, 140, 75, 20, 30][i],
  link:   '#',
}));

/* ─────────────────────────────────────
   ABOUT (subpage)
───────────────────────────────────── */
const ABOUT = {
  portraitSrc: '', // path to portrait image, e.g. 'assets/images/portrait.jpg'
  paragraphs: [
    'Zajmuję się muzyką ambient i eksperymentalną od ponad dekady. Moja praca łączy nagrania terenowe, syntezę elektroniczną i elementy akustyczne w spójną narrację dźwiękową.',
    'Fotografia jest dla mnie równorzędnym językiem ekspresji — dokumentuję te same przestrzenie, które nagrywam. Obraz i dźwięk wzajemnie się przenikają, tworząc pełniejszy obraz miejsca i czasu.',
    'Mieszkam i pracuję w Polsce, ale moja muzyka powstawała w różnych miejscach Europy, Azji i Ameryki Północnej. Podróż jest nieodłączną częścią procesu twórczego.',
  ],
  stats: [
    { num: '10',  label: 'albumów' },
    { num: '7+',  label: 'lat w obiegu' },
    { num: '4',   label: 'projekty długoterm.' },
  ],
};

/* ─────────────────────────────────────
   CONTACT (subpage)
───────────────────────────────────── */
const CONTACT = {
  intro: 'Jestem otwarty na współpracę, licencjonowanie muzyki, wystawy fotograficzne i wszelkie projekty na styku dźwięku i obrazu.',
  links: [
    { label: 'Email',     val: 'twoj@email.com',                href: 'mailto:twoj@email.com' },
    { label: 'Bandcamp',  val: 'nazwaartysty.bandcamp.com',      href: 'https://nazwaartysty.bandcamp.com' },
    { label: 'Instagram', val: '@nazwaartysty',                  href: 'https://instagram.com/nazwaartysty' },
    { label: 'SoundCloud',val: 'soundcloud.com/nazwaartysty',    href: 'https://soundcloud.com/nazwaartysty' },
  ],
};

/* ─────────────────────────────────────
   AMBIENT GHOST WORDS (world scatter)
───────────────────────────────────── */
const GHOST_WORDS = [
  'silence', 'echo', 'pulse', 'void', 'drift', 'breath', 'static', 'grain',
  'cisza', 'oddech', 'szum', 'mgła', 'fala', 'puls', 'pustka', 'czas',
  'resonance', 'dissolve', 'membrane', 'threshold', '∿', '◦', '—', '·',
  'nagrania terenowe', 'field recording', 'ambient', 'experimental',
  'slow listening', 'all frequencies', 'no beat', 'deep time',
  'texture', 'grain', 'haze', 'slow', 'open', 'still', 'vast',
];

/* ─────────────────────────────────────
   FLOATING PHRASES (world scatter)
───────────────────────────────────── */
const PHRASES = [
  { cls: 't-large', text: 'każdy dźwięk jest śladem',        col: 'rgba(237,232,223,.7)' },
  { cls: 't-body',  text: 'the space between notes is where music lives', col: 'rgba(237,232,223,.6)' },
  { cls: 't-large', text: 'co zostaje po ciszy',              col: 'rgba(200,160,64,.65)' },
  { cls: 't-mono',  text: 'field recording 2019 — 2024',      col: 'rgba(237,232,223,.38)' },
  { cls: 't-body',  text: 'ambient music is not background — it is the foreground of the mind', col: 'rgba(237,232,223,.55)' },
  { cls: 't-large', text: 'muzyka bez początku',              col: 'rgba(237,232,223,.6)' },
  { cls: 't-mono',  text: 'experimental — adj — not yet resolved', col: 'rgba(200,160,64,.5)' },
  { cls: 't-body',  text: 'fotografia jako forma słuchania przestrzeni', col: 'rgba(237,232,223,.58)' },
  { cls: 't-large', text: 'dźwięk / obraz / czas',            col: 'rgba(237,232,223,.55)' },
  { cls: 't-body',  text: 'każde miejsce ma swój własny głos', col: 'rgba(237,232,223,.6)' },
  { cls: 't-mono',  text: 'ten projekt trwa nadal',           col: 'rgba(200,160,64,.55)' },
  { cls: 't-large', text: 'a journey through sound',          col: 'rgba(237,232,223,.5)' },
  { cls: 't-body',  text: 'nie nagrywam muzyki — nagrywam miejsca', col: 'rgba(237,232,223,.65)' },
  { cls: 't-large', text: 'listen carefully',                 col: 'rgba(200,160,64,.45)' },
];
