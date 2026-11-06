export interface GalleryItem {
  id: string;
  /** PDF page number from the user brief (not independently verified). 0 = supplemental archive image, no page reference. */
  pdfPage: number;
  category: 'all' | 'leadership' | 'agitations' | 'cadre' | 'welfare' | 'devotional';
  titleEn: string;
  titleTe: string;
  location: string;
  image: string;
  descriptionEn: string;
  descriptionTe: string;
  tag: string;
}

export type GalleryCategory = GalleryItem['category'];

export const galleryCategories: { id: GalleryCategory; label: string }[] = [
  { id: 'all', label: 'All Moments' },
  { id: 'leadership', label: 'Leadership & Dignitaries' },
  { id: 'agitations', label: 'Frontline Agitations' },
  { id: 'cadre', label: 'Cadre & Assembly Meets' },
  { id: 'welfare', label: 'Social Welfare & COVID Relief' },
  { id: 'devotional', label: 'Devotional & Cultural' },
];

export const galleryArchive: GalleryItem[] = [
  {
    id: 'phd-presentation',
    pdfPage: 3,
    category: 'leadership',
    titleEn: 'Doctoral (Ph.D.) Thesis Presentation',
    titleTe: 'కల్వకుంట్ల కవిత గారికి డాక్టరేట్ థీసిస్ సమర్పణ',
    location: 'Hyderabad',
    image: '/activities/page3_phd.jpg',
    descriptionEn: 'Formally presenting his doctoral thesis earned from Kakatiya University in Tourism Management to Smt. Kalvakuntla Kavitha.',
    descriptionTe: 'కాకతీయ విశ్వవిద్యాలయం నుండి పీహెచ్‌డీ పట్టా పొందిన అనంతరం పరిశోధనా గ్రంథాన్ని కవితక్కకు అందజేసిన దృశ్యం.',
    tag: 'Academic Milestone'
  },
  {
    id: 'parents-roots',
    pdfPage: 16,
    category: 'leadership',
    titleEn: 'Family Roots & Parental Blessings',
    titleTe: 'తల్లిదండ్రుల ఆశీర్వాదం - క్రమశిక్షణతో కూడిన పెంపకం',
    location: 'Mahabubabad',
    image: '/activities/page16_parents.jpg',
    descriptionEn: 'With father Shri Nalamasa Yakaiah and mother Smt. Aruna, who instilled values of public service and loyalty to Telangana.',
    descriptionTe: 'తండ్రి యాకయ్య, తల్లి అరుణ గార్లతో డాక్టర్ నలమాస శ్రీకాంత్ గౌడ్.',
    tag: 'Personal Journey'
  },
  {
    id: 'assembly-speaker-meet',
    pdfPage: 17,
    category: 'leadership',
    titleEn: 'With Telangana Assembly 1st Speaker',
    titleTe: 'తొలి శాసనసభాపతి సిరికొండ మధుసూదనాచారితో భేటీ',
    location: 'Hyderabad',
    image: '/activities/page17_speaker.jpg',
    descriptionEn: 'Consulting with Telangana movement stalwart and first Assembly Speaker Sirikonda Madhusudhana Chary.',
    descriptionTe: 'ఉద్యమ నాయకుడు, తొలి స్పీకర్ మధుసూదనాచారి గారిని మర్యాదపూర్వకంగా కలిసిన సందర్భం.',
    tag: 'Statehood Veterans'
  },
  {
    id: 'tgpsc-gunpark-protest',
    pdfPage: 9,
    category: 'agitations',
    titleEn: 'TGPSC Group-1 Paper Leak Agitation',
    titleTe: 'టీజీపీఎస్సీ గ్రూప్-1 అక్రమాలపై గన్ పార్క్ వద్ద ధర్నా',
    location: 'Gun Park, Hyderabad',
    image: '/activities/page9_tgpsc_protest.jpg',
    descriptionEn: 'Leading massive demonstrations demanding transparent re-examination and exposure of corruption in government recruitments.',
    descriptionTe: 'నిరుద్యోగుల హక్కులకై గన్ పార్క్ వద్ద భారీ ఆందోళన చేపట్టిన డాక్టర్ నలమాస శ్రీకాంత్ గౌడ్.',
    tag: 'Youth Rights'
  },
  {
    id: 'tgpsc-police-arrest',
    pdfPage: 10,
    category: 'agitations',
    titleEn: 'Police Custody During Youth Agitation',
    titleTe: 'నిరుద్యోగ పోరాటంలో పోలీసుల అరెస్ట్',
    location: 'Nampally / Afzal Gunj PS',
    image: '/activities/page10_police_arrest.jpg',
    descriptionEn: 'Facing police barricades and detention across multiple police stations for championing youth recruitment integrity.',
    descriptionTe: 'ప్రజాస్వామ్యబద్ధంగా ఆందోళన చేస్తున్న శ్రీకాంత్ గౌడ్ గారిని పోలీసులు నిర్బంధించిన దృశ్యం.',
    tag: 'Frontline Battle'
  },
  {
    id: 'hcu-obc-satyagraha',
    pdfPage: 11,
    category: 'agitations',
    titleEn: 'HCU Satyagraha for OBC Reservation Rights',
    titleTe: 'హైదరాబాద్ సెంట్రల్ యూనివర్సిటీలో ఓబీసీ సత్యాగ్రహ దీక్ష',
    location: 'University of Hyderabad (HCU)',
    image: '/activities/page11_hcu_obc.jpg',
    descriptionEn: 'Addressing OBC scholars and non-teaching unions demanding strict adherence to constitutional reservation norms in central universities.',
    descriptionTe: 'కేంద్ర విశ్వవిద్యాలయంలో ఓబీసీల రాజ్యాంగబద్ధ హక్కుల సాధనకై దీక్షకు సంపూర్ణ మద్దతు.',
    tag: 'Social Justice'
  },
  {
    id: 'mahabubabad-cadre-conclave',
    pdfPage: 23,
    category: 'cadre',
    titleEn: 'Mahabubabad District Cadre Conclave',
    titleTe: 'మానుకోట జిల్లా నాయకుల సన్నాహక సమావేశం',
    location: 'Shadi Khana, Mahabubabad',
    image: '/activities/page23_mahabubabad.jpg',
    descriptionEn: 'Presiding over the large-scale district leaders meeting to mobilize party cadre across 18 mandals.',
    descriptionTe: 'మహబూబాబాద్ జిల్లాలోని 18 మండలాల శ్రేణులతో జెండా పండుగ సన్నాహక సదస్సు.',
    tag: 'Cadre Leadership'
  },
  {
    id: 'praja-bhavan-welfare-rally',
    pdfPage: 26,
    category: 'agitations',
    titleEn: 'Praja Bhavan Women Welfare Demonstration',
    titleTe: 'ప్రజా భవన్ ఎదుట మహిళా గ్యారంటీ హామీల సాధన పోరు',
    location: 'Praja Bhavan, Hyderabad',
    image: '/activities/page26_praja_bhavan.jpg',
    descriptionEn: 'Spearheading mass protest demanding the immediate disbursement of the promised ₹2,500 monthly assistance to women.',
    descriptionTe: 'ఎన్నికల హామీ మహిళలకు నెలకు రూ.2500 చెల్లించాలని డిమాండ్ చేస్తూ నిరసన.',
    tag: 'Public Welfare'
  },
  {
    id: 'ailamma-family-joining',
    pdfPage: 26,
    category: 'cadre',
    titleEn: 'Chakali Ailamma Descendants Induction',
    titleTe: 'వీరనారి చాకలి ఐలమ్మ కుటుంబ సభ్యుల చేరిక',
    location: 'State Central Office',
    image: '/activities/page26_ailamma.jpg',
    descriptionEn: 'Inducting Satla Padma and Jyothi, heirs of Telangana peasant struggle icon Chakali Ailamma, into party leadership.',
    descriptionTe: 'తెలంగాణ సాయుధ పోరాట వీరనారి చాకలి ఐలమ్మ వారసులను పార్టీలోకి సాదరంగా ఆహ్వానించిన దృశ్యం.',
    tag: 'Historic Legacy'
  },
  {
    id: 'narsampet-youth-brigade',
    pdfPage: 28,
    category: 'cadre',
    titleEn: 'Mass Youth Joining from Narsampet',
    titleTe: 'నర్సంపేట నియోజకవర్గ యువజన నాయకుల చేరిక',
    location: 'Hyderabad State Office',
    image: '/activities/page28_narsampet.jpg',
    descriptionEn: 'Coordinating the induction of hundreds of youth and student leaders from Narsampet assembly into the TRS organization.',
    descriptionTe: 'నర్సంపేట ప్రాంతానికి చెందిన భారీ యువజన శ్రేణులను పార్టీలోకి చేర్పించిన సందర్భం.',
    tag: 'Youth Power'
  },
  {
    id: 'covid-ration-drive',
    pdfPage: 52,
    category: 'welfare',
    titleEn: 'COVID-19 Migrant Food & Ration Relief',
    titleTe: 'వలస కార్మికులకు బియ్యం, నిత్యావసరాల పంపిణీ',
    location: 'Nellikuduru / Boduppal',
    image: '/activities/page52_covid_relief.jpg',
    descriptionEn: 'Supplying 60kg rice bags and essential groceries to interstate workers stranded during pandemic lockdowns through Lokahitha Association.',
    descriptionTe: 'కరోనా కష్టకాలంలో ఇతర రాష్ట్రాల వలస కార్మికులకు నిత్యావసరాలు, బియ్యం పంపిణీ చేసిన శ్రీకాంత్ గౌడ్.',
    tag: 'Corona Warrior'
  },
  {
    id: 'esi-hospital-inspection',
    pdfPage: 50,
    category: 'welfare',
    titleEn: 'ESI Nacharam Hospital Fact-Finding Visit',
    titleTe: 'నాచారం ఈఎస్ఐ ఆసుపత్రి క్షేత్రస్థాయి పరిశీలన',
    location: 'Nacharam, Hyderabad',
    image: '/activities/page50_esi_hospital.jpg',
    descriptionEn: 'Inspecting frontline challenges faced by sanitation and healthcare contract staff as member of the Outsourcing Study Committee.',
    descriptionTe: 'ఔట్ సోర్సింగ్ ఉద్యోగుల సమస్యలను స్వయంగా తెలుసుకోవడానికి ఈఎస్ఐ ఆస్పత్రిని సందర్శించిన దృశ్యం.',
    tag: 'Worker Advocacy'
  },
  {
    id: 'medaram-jatara-visit',
    pdfPage: 53,
    category: 'devotional',
    titleEn: 'Medaram Sammakka Sarakka Maha Jatara',
    titleTe: 'మేడారం సమ్మక్క సారక్క మహా జాతర దర్శనం',
    location: 'Medaram, Mulugu',
    image: '/activities/page53_medaram.jpg',
    descriptionEn: 'Seeking tribal deities blessings at the world-renowned Medaram Maha Jatara alongside Telangana Rakshana Sena leadership.',
    descriptionTe: 'ఆసియాలోనే అతిపెద్ద గిరిజన జాతర మేడారంలో ప్రత్యేక పూజలు నిర్వహించిన దృశ్యం.',
    tag: 'Cultural Heritage'
  },
  {
    id: 'yadadri-darshan',
    pdfPage: 53,
    category: 'devotional',
    titleEn: 'Yadadri Sri Lakshmi Narasimha Swamy Darshan',
    titleTe: 'యాదాద్రి శ్రీ లక్ష్మీ నరసింహ స్వామి వారి దర్శనం',
    location: 'Yadagirigutta',
    image: '/activities/page53_yadadri.jpg',
    descriptionEn: 'Pilgrimage to Yadadri shrine seeking divine blessings prior to launching the statewide "Janam Bata" mass outreach tour.',
    descriptionTe: 'జనం బాట ప్రజా యాత్ర ప్రారంభానికి ముందు యాదాద్రి క్షేత్రంలో పూజలు.',
    tag: 'Spiritual Tour'
  }
];

const ARCHIVE_LOCATION = 'Archive — location not specified';
const sup = (
  n: number, category: GalleryCategory, tag: string,
  titleEn: string, titleTe: string, descriptionEn: string, descriptionTe: string,
): GalleryItem => ({
  id: `archive-${n}`, pdfPage: 0, category, tag, titleEn, titleTe, descriptionEn, descriptionTe,
  location: ARCHIVE_LOCATION, image: `/activities/archive-${n}.jpg`,
});

/** Supplemental records: supplied screenshots shown as-is. Captions describe only visible content — no inferred dates, people or places. */
export const supplementalArchive: GalleryItem[] = [
  sup(2, 'leadership', 'Press Clipping',
    'Press Clipping: Mahabubabad District Incharge Responsibilities',
    'పత్రికా కథనం: మహబూబాబాద్ జిల్లా ఇంచార్జ్ బాధ్యతలు',
    'A supplied screenshot of a Telugu newspaper clipping headed with his designation as district incharge, shown at its original resolution.',
    'జిల్లా ఇంచార్జ్ బాధ్యతలకు సంబంధించిన తెలుగు పత్రికా కథనం యొక్క స్క్రీన్‌షాట్, అందుబాటులో ఉన్న అసలు రిజల్యూషన్‌లో.'),
  sup(5, 'leadership', 'Leadership Meeting',
    'Meeting with Smt. Kalvakuntla Kavitha',
    'శ్రీమతి కల్వకుంట్ల కవిత గారితో సమావేశం',
    'A supplied photo collage from a meeting with Smt. Kalvakuntla Kavitha. Date and place are not recorded in the supplied image.',
    'శ్రీమతి కల్వకుంట్ల కవిత గారితో సమావేశ చిత్రమాలిక. తేదీ, ప్రదేశం చిత్రంలో పేర్కొనబడలేదు.'),
  sup(6, 'cadre', 'Public Meetings',
    'Public Meetings — Photo Collage', 'ప్రజా సమావేశాలు — చిత్రమాలిక',
    'A supplied collage of photographs from public meetings, with participants wearing party scarves.',
    'ప్రజా సమావేశాల చిత్రాల సంకలనం; పార్టీ కండువాలు ధరించిన పాల్గొనేవారు కనిపిస్తున్నారు.'),
  sup(7, 'cadre', 'Organisational Meetings',
    'Organisational Meetings — Photo Collage', 'సంస్థాగత సమావేశాలు — చిత్రమాలిక',
    'A supplied collage of group photographs from organisational meetings.',
    'సంస్థాగత సమావేశాల సామూహిక చిత్రాల సంకలనం.'),
  sup(8, 'cadre', 'Public Gatherings',
    'Public Gatherings — Photo Collage', 'ప్రజా సమూహాలు — చిత్రమాలిక',
    'A supplied collage showing large outdoor gatherings and crowds.',
    'బహిరంగ ప్రదేశాల్లో పెద్ద ఎత్తున జనసమూహాన్ని చూపే చిత్రాల సంకలనం.'),
  sup(9, 'leadership', 'Consultations',
    'Organisational Consultations — Photo Collage', 'సంస్థాగత సంప్రదింపులు — చిత్రమాలిక',
    'A supplied collage from seated consultations and group photographs.',
    'కూర్చుని జరిపిన సంప్రదింపులు మరియు సామూహిక చిత్రాల సంకలనం.'),
  sup(10, 'cadre', 'Outreach',
    'Outreach — Photo Collage', 'ప్రజా సంబంధాలు — చిత్రమాలిక',
    'A supplied collage of outreach moments with groups of people, indoors and outdoors.',
    'ప్రజలతో సంప్రదింపుల సందర్భాల చిత్రాల సంకలనం.'),
  sup(11, 'cadre', 'Telangana Jagruthi',
    'Participation in Telangana Jagruthi Activities', 'తెలంగాణ జాగృతి కార్యక్రమాల్లో భాగస్వామ్యం',
    'A supplied screenshot of a document page titled "Active Participation in Telangana Jagruthi Party Activities", with photographs and Telugu text.',
    'తెలంగాణ జాగృతి కార్యక్రమాల్లో భాగస్వామ్యంపై ఫోటోలు, తెలుగు వచనంతో కూడిన పత్రం స్క్రీన్‌షాట్.'),
  sup(12, 'cadre', 'Community Meetings',
    'Community Meetings — Photo Collage', 'సామాజిక సమావేశాలు — చిత్రమాలిక',
    'A supplied collage of group photographs from community meetings.',
    'సామాజిక సమావేశాల సామూహిక చిత్రాల సంకలనం.'),
  sup(13, 'leadership', 'Publication',
    'Publication Presentation', 'ప్రచురణ ఆవిష్కరణ',
    'A supplied photograph of a group holding up copies of a publication.',
    'ఒక ప్రచురణ ప్రతులను ప్రదర్శిస్తున్న బృందం చిత్రం.'),
  sup(14, 'leadership', 'Felicitation',
    'Felicitation — Photo Collage', 'సన్మానం — చిత్రమాలిక',
    'A supplied collage of felicitation moments with shawls and greetings.',
    'శాలువాలు, శుభాకాంక్షలతో కూడిన సన్మాన సందర్భాల చిత్రాల సంకలనం.'),
  sup(15, 'leadership', 'Press Briefings',
    'Press Briefings — Photo Collage', 'పత్రికా సమావేశాలు — చిత్రమాలిక',
    'A supplied collage of press briefings in front of an organisational backdrop.',
    'సంస్థ నేపథ్యం ముందు జరిగిన పత్రికా సమావేశాల చిత్రాల సంకలనం.'),
];

export const allGalleryItems: GalleryItem[] = [...galleryArchive, ...supplementalArchive];

const availableFiles = new Set(
  Object.keys(import.meta.glob('/public/activities/*.{jpg,jpeg,png,webp}')).map((k) => k.replace('/public', '')),
);

export const isImageAvailable = (item: GalleryItem) => availableFiles.has(item.image);
export const imageUrl = (item: GalleryItem) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}${item.image}`;
export const pageLabel = (item: GalleryItem) =>
  item.pdfPage > 0 ? `PDF P. ${String(item.pdfPage).padStart(2, '0')}` : 'Archive image';
