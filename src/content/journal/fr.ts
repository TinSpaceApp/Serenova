import type { JournalArticle, JournalCard } from "./types";
import { journalArticlesEn } from "./en";

export const journalArticlesFr: JournalArticle[] = [
  {
    slug: "best-time-tanzania",
    title: "Quand partir en Tanzanie",
    subtitle: "Saisons de safari, faune, Zanzibar et Kilimandjaro",
    category: "Faune et saisons",
    excerpt:
      "Comprendre les saisons, les mouvements de la faune et comment choisir des dates qui vous conviennent.",
    cover: "serengeti-river",
    seoTitle: "Quand partir en Tanzanie : saisons de safari | Serenova",
    seoDescription:
      "Comparer la saison sèche et la saison verte en Tanzanie, la Grande Migration, le climat de Zanzibar et les périodes selon la faune, la photo et les familles.",
    intro: [
      "Il n’existe pas un mois parfait pour visiter la Tanzanie. La meilleure période dépend de ce que vous voulez vivre : observation classique de la faune, paysages verts, moins de visiteurs, oiseaux, mouvements saisonniers de la migration ou du temps au bord de l’océan Indien. Les conditions diffèrent aussi entre les parcs du Nord, les réserves du Sud, la montagne et Zanzibar.",
    ],
    blocks: [
      {
        type: "figure",
        id: "tarangire-elephant",
        caption: "Pays des éléphants, Tarangire — illustration d’un rassemblement en saison sèche.",
        frame: "wide",
      },
      { type: "h2", text: "Juin à octobre : la longue saison sèche" },
      {
        type: "p",
        text: "C’est une période prisée pour les safaris classiques. Dans beaucoup de zones, la végétation s’ouvre et les animaux se rassemblent autour des points d’eau fiables. Les matinées peuvent être étonnamment fraîches, surtout en début de journée ou en altitude, tandis que les après-midi sont souvent chauds. La demande pour les parcs et lodges populaires peut être forte : mieux vaut anticiper.",
      },
      { type: "h2", text: "Novembre et décembre : les petites pluies" },
      {
        type: "p",
        text: "Dans de nombreuses régions, de brèves averses ramènent la verdure et une lumière plus changeante. On peut voyager, même si les routes et l’observation varient. Pour les photographes et les ornithologues, la saison peut être particulièrement atmosphérique.",
      },
      {
        type: "figure",
        id: "ndutu-calving",
        caption: "Ndutu en début d’année — les naissances suivent la pluie, pas un calendrier.",
        frame: "portrait",
      },
      { type: "h2", text: "Janvier et février : chaleur et naissances" },
      {
        type: "p",
        text: "Le Serengeti du Sud et la zone de Ndutu sont souvent associés à la période des naissances des gnous, même si la pluie annuelle influe sur le moment et le lieu exacts. C’est un temps précieux pour observer, à distance respectueuse, une vie nouvelle et l’activité des prédateurs.",
      },
      { type: "h2", text: "Mars à mai : paysages plus verts" },
      {
        type: "p",
        text: "Les grandes pluies tombent souvent à cette période, surtout en avril et mai, sans être uniformes. Le paysage peut être luxuriant, les disponibilités parfois plus souples, et certaines routes plus boueuses. Il faut vérifier lodges et conditions au cas par cas.",
      },
      { type: "h2", text: "Quand voir la Grande Migration" },
      {
        type: "p",
        text: "La migration est un mouvement écologique continu, pas un événement d’une seule saison. En guide large, beaucoup de troupeaux sont dans le Serengeti du Sud au moment des naissances en début d’année ; ils tendent à se déplacer vers le centre et l’ouest plus tard ; les possibilités de traversées au nord sont souvent associées à juillet–octobre. Ce sont des tendances, jamais des garanties.",
      },
      {
        type: "figure",
        id: "zanzibar-beach",
        caption: "Zanzibar après le bush — la côte et la saison se choisissent ensemble.",
        frame: "wide",
      },
      { type: "h2", text: "Et Zanzibar ?" },
      {
        type: "p",
        text: "Zanzibar peut prolonger magnifiquement un safari. Juin à octobre est souvent relativement sec ; janvier et février peuvent aussi convenir. Pluie, humidité, vent et marées varient selon les plages. Demandez la côte qui correspond à la façon dont vous aimez passer le temps.",
      },
      { type: "h2", text: "Quand gravir le Kilimandjaro" },
      {
        type: "p",
        text: "Janvier à début mars et juin à octobre sont souvent choisis pour des conditions de trek plus favorables. En altitude, le froid peut être sévère à tout moment. Se préparer demande bien plus que choisir un mois sec. Travaillez avec un opérateur d’ascension dûment qualifié.",
      },
      {
        type: "guide",
        title: "Repères rapides",
        rows: [
          { label: "Safari classique", value: "Juin–octobre" },
          { label: "Saison des naissances", value: "Environ janvier–mars" },
          { label: "Traversées possibles au nord", value: "Environ juillet–octobre" },
          { label: "Oiseaux et paysages verts", value: "Souvent novembre–avril" },
          { label: "Moins de monde", value: "Saisons intermédiaires ou vertes, selon les parcs" },
          { label: "Extension plage à Zanzibar", value: "Souvent juin–octobre ou janvier–février" },
        ],
      },
      {
        type: "takeaway",
        text: "La saison idéale est celle qui correspond à vos attentes, pas simplement le mois le plus fréquenté. Serenova peut vous aider à comparer routes et dates avec des partenaires locaux.",
      },
    ],
    related: [
      { href: "/journal/great-migration-when", label: "La Grande Migration" },
      { href: "/styles/photography", label: "Safari photo" },
      { href: "/journal/tanzania-travel-essentials", label: "Essentiels de voyage" },
    ],
    cta: "Dites-nous quand vous souhaitez voyager",
    published: true,
  },
  {
    slug: "great-migration-when",
    title: "La Grande Migration : où aller, et quand",
    subtitle: "Suivre le rythme du Serengeti",
    category: "Faune et saisons",
    excerpt: "Suivre le mouvement annuel des troupeaux à travers l’écosystème du Serengeti.",
    cover: "migration-2",
    seoTitle: "Grande Migration du Serengeti : où et quand | Serenova",
    seoDescription:
      "Comprendre la Grande Migration, la saison des naissances, les traversées de rivière et comment composer un safari éthique autour d’une faune en mouvement.",
    intro: [
      "La Grande Migration est l’un des rythmes naturels les plus remarquables de l’écosystème du Serengeti. Gnous, zèbres et autres herbivores se déplacent selon la pluie, l’herbe nouvelle et les conditions. On aime y voir un seul instant ; l’histoire vraie se déploie toute l’année.",
    ],
    blocks: [
      {
        type: "figure",
        id: "ndutu-calving",
        caption: "Illustration des plaines du Sud en début d’année — pas une scène promise.",
        frame: "wide",
      },
      { type: "h2", text: "Un voyage, pas un calendrier figé" },
      {
        type: "p",
        text: "Personne ne peut garantir où seront les troupeaux un jour donné. Les cartes saisonnières aident, mais la pluie peut déplacer les animaux. Un safari réfléchi choisit une région avec connaissance, et laisse assez de temps pour aimer ce que la nature montre.",
      },
      { type: "h2", text: "Janvier à mars : plaines du Sud et Ndutu" },
      {
        type: "figure",
        id: "lodge-lake-masek",
        caption: "Lake Masek, Ndutu — un camp illustratif près des plaines du Sud, pas un séjour promis.",
        frame: "wide",
      },
      {
        type: "p",
        text: "Le Serengeti du Sud et Ndutu sont souvent associés aux naissances. Jeunes gnous et prédateurs actifs peuvent offrir des rencontres extraordinaires. L’expérience la plus juste vient d’une observation patiente, à distance respectueuse.",
      },
      { type: "h2", text: "Avril à juin : mouvement vers le nord et l’ouest" },
      {
        type: "p",
        text: "Quand les conditions changent, les troupeaux se répandent souvent au centre et à l’ouest. On traverse de grandes herbes, de larges groupes, des terrains différents. Le lieu de séjour compte : les distances sont importantes.",
      },
      {
        type: "figure",
        id: "serengeti-lions",
        caption: "Le Serengeti plus large reste la raison de partir, avec ou sans traversée.",
        frame: "portrait",
      },
      { type: "h2", text: "Juillet à octobre : Serengeti du Nord" },
      {
        type: "figure",
        id: "lodge-moyo-north",
        caption: "Moyo Camp North — illustration d’un séjour dans le Serengeti du Nord aux mois de migration.",
        frame: "wide",
      },
      {
        type: "p",
        text: "Beaucoup rêvent d’une traversée de la Mara. Le spectacle peut être immense, mais une traversée n’est jamais programmée. Les animaux peuvent attendre, reculer ou aller ailleurs. Choisissez ce voyage parce que vous aimez le Serengeti, pas pour une photographie promise.",
      },
      { type: "h2", text: "Novembre et décembre : retour vers le sud" },
      {
        type: "p",
        text: "Quand les pluies renouvellent les pâturages du Sud, les troupeaux tendent à y revenir. Le temps et le moment exact varient d’une année à l’autre.",
      },
      { type: "h2", text: "Comment bien composer" },
      {
        type: "p",
        text: "Pensez aux dates, au nombre de nuits, aux transferts et à votre intérêt pour le reste de la faune. Un itinéraire fixé sur un seul point de traversée peut décevoir. Une bonne composition laisse de la place aux éléphants, aux grands félins, aux oiseaux, aux paysages et aux silences.",
      },
      {
        type: "guide",
        title: "En un regard",
        rows: [
          { label: "Serengeti du Sud / Ndutu", value: "Souvent naissances en début d’année" },
          { label: "Centre et ouest", value: "Souvent fin de printemps et début d’été" },
          { label: "Serengeti du Nord", value: "Traversées possibles dans la seconde moitié de l’année" },
          { label: "Tous les timings", value: "Approximatifs — jamais garantis" },
        ],
      },
    ],
    related: [
      { href: "/journal/best-time-tanzania", label: "Quand partir en Tanzanie" },
      { href: "/journal/tanzania-photography-safari", label: "Safari photo" },
    ],
    cta: "Explorer un voyage inspiré par la migration",
    published: true,
  },
  {
    slug: "tanzania-photography-safari",
    title: "Safari photo en Tanzanie",
    subtitle: "Saisir l’Afrique à son plus extraordinaire",
    category: "Préparer un safari",
    excerpt: "Préparer une photographie animalière mémorable, la lumière naturelle et une observation sans hâte.",
    cover: "photography",
    seoTitle: "Guide du safari photo en Tanzanie | Serenova",
    seoDescription:
      "Conseils pour photographier la faune en Tanzanie : lumière, comportement, positionnement, objectifs et un rythme pensé pour la photo.",
    intro: [
      "La photographie animalière demande plus qu’un appareil. La lumière, la patience, le comportement des animaux et la capacité à ralentir comptent autant que le matériel. Les plaines, les cratères, les habitats variés et la faune de Tanzanie offrent beaucoup, aux photographes expérimentés comme aux débutants curieux.",
    ],
    blocks: [
      {
        type: "figure",
        id: "serengeti-lion",
        caption: "La lumière et la patience importent plus que de s’approcher.",
        frame: "wide",
      },
      { type: "h2", text: "Pourquoi un safari pensé pour la photo ?" },
      {
        type: "p",
        text: "Sur un safari conventionnel, le groupe peut passer vite d’une observation à l’autre. Un itinéraire photo laisse plus de temps pour regarder une scène, travailler la lumière et attendre la composition. Il ne s’agit pas de se rapprocher : le positionnement, les distances éthiques et la patience font presque toujours mieux.",
      },
      { type: "h2", text: "Faune, lumière et position" },
      {
        type: "p",
        text: "Les matinées révèlent souvent des couleurs plus froides et une lumière douce. La fin d’après-midi apporte des tons chauds, de longues ombres et des ciels plus dramatiques. La connaissance du terrain, des règles du parc et du comportement animal aide à comprendre ce qui peut arriver, tout en laissant de l’espace aux animaux.",
      },
      {
        type: "figure",
        id: "hyena",
        caption: "Le comportement et l’habitat font partie de l’histoire, pas seulement les grands félins.",
        frame: "portrait",
      },
      { type: "h2", text: "Ce que vous pourriez photographier" },
      {
        type: "p",
        text: "Lions en plaine ; léopards au repos dans les arbres ; éléphants à Tarangire ; girafes, antilopes et plus petits mammifères ; oiseaux et détails ; les grands paysages du Serengeti et du Ngorongoro. Aucune observation particulière n’est garantie.",
      },
      { type: "h2", text: "La Grande Migration dans l’objectif" },
      {
        type: "p",
        text: "Les scènes de migration varient : jeunes animaux au sud, grands troupeaux, possibles traversées au nord. Plutôt que de chasser une image à tout prix, prévoyez une histoire plus large : mouvement, paysage, texture, comportement, et les silences entre les instants dramatiques.",
      },
      { type: "h2", text: "Quel matériel emporter ?" },
      {
        type: "p",
        text: "Un téléobjectif polyvalent aide à rester à distance respectueuse ; un grand-angle saisit l’habitat et l’échelle. Prévoyez cartes mémoire, batteries, protection contre la poussière et un kit de nettoyage léger. Les jumelles restent utiles. Vérifiez les limites de bagages si des vols intérieurs sont prévus.",
      },
      { type: "h2", text: "Les petits gestes qui améliorent l’image" },
      {
        type: "p",
        text: "Choisissez une vitesse adaptée au mouvement, relisez l’exposition dans la lumière changeante, et entraînez-vous depuis un véhicule à l’arrêt. Évitez le flash autour de la faune sauf autorisation claire. Respectez les règles du parc, le guide et les autres visiteurs.",
      },
      { type: "h2", text: "Un voyage autour de vos intérêts" },
      {
        type: "figure",
        id: "lodge-kuro-treetops",
        caption: "Kuro Treetops, Tarangire — un séjour illustratif pour la lumière et le cadre.",
        frame: "wide",
      },
      {
        type: "p",
        text: "Dites à Serenova si vous préférez les grands félins, les oiseaux, les paysages, la migration ou un portfolio plus large. Nous pouvons parler d’une route et d’un rythme qui laissent plus de place à la photo. Véhicules ou guides spécialisés dépendent des disponibilités et se confirment avant tout achat.",
      },
      {
        type: "list",
        title: "Liste photo",
        items: [
          "Téléobjectif",
          "Grand-angle optionnel",
          "Batteries et cartes mémoire de rechange",
          "Jumelles",
          "Protection poussière et intempéries",
          "Rangement adapté et adaptateur de charge",
        ],
      },
    ],
    related: [
      { href: "/journal/best-time-tanzania", label: "Quand partir en Tanzanie" },
      { href: "/journal/great-migration-when", label: "La Grande Migration" },
      { href: "/journal/what-to-pack", label: "Quoi porter et emporter" },
    ],
    cta: "Dites-nous ce que vous rêvez de photographier",
    published: true,
  },
  {
    slug: "what-to-pack",
    title: "Quoi porter en safari en Tanzanie",
    subtitle: "Vêtements essentiels et liste de bagage",
    category: "Préparer un safari",
    excerpt: "Une liste concrète pour le confort, des sorties à l’aube aux soirées au lodge.",
    cover: "vehicle-2",
    seoTitle: "Quoi porter en safari en Tanzanie | Liste",
    seoDescription:
      "Guide pratique : vêtements neutres, chaussures, couches, soleil, pluie et une liste simple.",
    intro: [
      "Préparer un safari en Tanzanie, c’est surtout le confort, l’adaptation et la simplicité. Une sortie à l’aube peut être fraîche, le même après-midi chaud et lumineux. Choisissez des couches respirantes, une protection solaire fiable et des chaussures adaptées à vos activités.",
    ],
    blocks: [
      {
        type: "figure",
        id: "bush-lunch",
        caption: "De simples couches et le soleil font plus qu’une valise trop pleine.",
        frame: "wide",
      },
      { type: "h2", text: "Des couleurs sobres et confortables" },
      {
        type: "p",
        text: "Kaki, beige, olive, brun atténué, gris et vert poussiéreux sont des choix fréquents. Les teintes neutres sont pratiques dans la poussière et moins voyantes. Le fluo est rarement utile ; le noir ou le bleu très foncé peuvent être moins confortables par forte chaleur et, par endroits, attirer les insectes. Les conseils diffèrent pour un safari à pied ou certaines zones de conservation.",
      },
      { type: "h2", text: "Des vêtements qui tiennent la journée" },
      {
        type: "p",
        text: "Prévoyez chemises et pantalons légers, respirants, à séchage rapide. Les manches longues protègent du soleil et des insectes, surtout tôt et tard. Ajoutez une polaire ou une veste légère pour les départs frais, et des habits confortables pour le lodge. En mois plus humides, une couche imperméable compacte.",
      },
      { type: "h2", text: "Les bonnes chaussures" },
      {
        type: "p",
        text: "Pour la plupart des safaris en véhicule, des chaussures de marche confortables suffisent. Un safari à pied guidé peut demander des chaussures fermées, solides, avec une bonne accroche. Des sandales peuvent servir au lodge, là où c’est permis.",
      },
      {
        type: "figure",
        id: "walking",
        caption: "À pied, les chaussures doivent être plus fermes qu’en journée véhicule.",
        frame: "portrait",
      },
      { type: "h2", text: "Soleil, poussière et insectes" },
      {
        type: "p",
        text: "Chapeau à larges bords, lunettes UV, crème solaire et répulsif adapté figurent en tête de liste. Un foulard ou un buff aide dans la poussière. Suivez les conseils de santé locaux pour le répulsif et la prévention du paludisme.",
      },
      { type: "h2", text: "Emballer selon l’itinéraire" },
      {
        type: "p",
        text: "Un safari en avion peut imposer un poids et une forme de sac stricts. Une extension à Zanzibar demande des habits de plage et une tenue respectueuse en ville ou près des lieux de culte. Un trek au Kilimandjaro a une liste entièrement distincte.",
      },
      {
        type: "list",
        title: "Liste simple",
        items: [
          "4 à 6 chemises légères et 2 à 3 chemises à manches longues",
          "2 à 3 pantalons ; shorts si cela convient",
          "Polaire et couche imperméable compacte",
          "Chaussures fermées confortables ; chaussures de marche plus fermes si besoin",
          "Chapeau, lunettes UV, crème SPF 30+, répulsif",
          "Foulard ou buff, sac de jour, gourde, jumelles",
          "Passeport, visa le cas échéant, attestation d’assurance inbound, ordonnances",
        ],
      },
      { type: "h2", text: "Que laisser à la maison ?" },
      {
        type: "p",
        text: "Évitez les bagages excessifs, les talons peu pratiques, les bijoux précieux et les vêtements qui gênent le mouvement. Les motifs camouflage peuvent être inappropriés ou restreints : des habits neutres ordinaires sont plus simples.",
      },
      {
        type: "takeaway",
        text: "Voyagez léger, superposez avec intelligence et vérifiez les exigences de votre hébergement et de la compagnie aérienne.",
      },
    ],
    related: [
      { href: "/journal/tanzania-travel-essentials", label: "Essentiels de voyage" },
      { href: "/journal/tanzania-photography-safari", label: "Safari photo" },
      { href: "/journal/family-safari", label: "Safari en famille" },
    ],
    cta: "Nous pouvons adapter les conseils de bagage à votre route",
    published: true,
  },
  {
    slug: "family-safari",
    title: "Safari en Tanzanie avec des enfants",
    subtitle: "Dix conseils simples pour une aventure familiale",
    category: "Famille et romance",
    excerpt: "Des conseils utiles pour un safari familial confortable et vivant.",
    cover: "family",
    seoTitle: "Safari en Tanzanie avec des enfants : 10 conseils | Serenova",
    seoDescription:
      "Composer un safari familial : trajets plus courts, lodges, sécurité, bagage, activités et un rythme confortable.",
    intro: [
      "Un safari en famille est une belle façon de découvrir la faune ensemble. Le secret est rarement d’en faire plus. C’est choisir un rythme juste, adapter les activités à l’âge des enfants, et laisser assez de temps pour le repos et la découverte.",
    ],
    blocks: [
      {
        type: "figure",
        id: "walking-giraffe",
        caption: "L’émerveillement au rythme d’un enfant — moins d’étapes, plus de regard.",
        frame: "wide",
      },
      { type: "h2", text: "1. Choisir un itinéraire réaliste" },
      {
        type: "p",
        text: "Les longs trajets fatiguent les plus jeunes. Moins d’étapes, des transferts raisonnables, des expériences à savourer plutôt que de cocher tous les parcs.",
      },
      { type: "h2", text: "2. Choisir un hébergement pensé pour les familles" },
      {
        type: "figure",
        id: "lodge-tulia",
        caption: "Un séjour familial se confirme auprès de chaque maison — pas à partir d’une photo.",
        frame: "wide",
      },
      {
        type: "figure",
        id: "lodge-farm-of-dreams",
        caption: "Farm of Dreams, Karatu — un autre lodge à échelle familiale dans la bibliothèque de Jenny.",
        frame: "portrait",
      },
      {
        type: "p",
        text: "Demandez les configurations de chambres, les règles enfants, les repas, les piscines, les clôtures et la surveillance. Certains camps ne sont pas clôturés ; une mention « family-friendly » n’est pas une garantie de sécurité.",
      },
      { type: "h2", text: "3. Les laisser aider à faire le sac" },
      {
        type: "p",
        text: "Jumelles, carnet d’animaux, quelques essentiels. Les impliquer avant le départ crée l’élan et les fait partie du voyage.",
      },
      {
        type: "figure",
        id: "bush-lunch",
        caption: "Repos, ombre et habitudes familières comptent autant que le parc suivant.",
        frame: "portrait",
      },
      { type: "h2", text: "4. Limiter les longues journées" },
      {
        type: "p",
        text: "Prévoyez des pauses et assez de calme entre les sorties. Une rencontre plus courte, bien rythmée, peut rester plus longtemps qu’une journée trop pleine.",
      },
      { type: "h2", text: "5. Expliquer tôt les règles du safari" },
      {
        type: "p",
        text: "Rester assis et calme au bon moment, écouter le guide, ne jamais nourrir ni approcher les animaux. Le guide et le personnel du parc ont le dernier mot sur la sécurité.",
      },
      { type: "h2", text: "6. Prévoir des rencontres culturelles respectueuses" },
      {
        type: "p",
        text: "Des activités locales adaptées à l’âge ouvrent un autre regard. Évitez de traiter une visite comme un spectacle pour la photo ; demandez le consentement et le respect.",
      },
      { type: "h2", text: "7. Emporter un peu de familier" },
      {
        type: "p",
        text: "Livres, dessin, jeux hors ligne aident pendant les transferts ou les après-midi plus calmes. Les petits réconforts changent beaucoup.",
      },
      { type: "h2", text: "8. Transformer l’observation en jeu" },
      {
        type: "p",
        text: "Une liste simple, un carnet, les traces d’animaux. Célébrez l’inattendu autant que le Big Five.",
      },
      { type: "h2", text: "9. Garder de l’eau et une collation à portée" },
      {
        type: "p",
        text: "Restez hydratés et organisez repas et pauses autour de la famille. Parlez des allergies ou besoins particuliers bien avant le départ.",
      },
      { type: "h2", text: "10. Parler franchement avec le guide et Jenny" },
      {
        type: "p",
        text: "Âges, intérêts, habitudes, besoins pratiques. Certaines activités — marche, montgolfière — peuvent avoir des limites d’âge ou de taille à confirmer avant toute réservation.",
      },
      {
        type: "list",
        title: "Liste famille",
        items: [
          "Âges et durées de route",
          "Chambres et règles de sécurité",
          "Repas et temps de repos",
          "Conseils santé et paludisme",
          "Transferts et restrictions d’activités",
        ],
      },
    ],
    related: [
      { href: "/journal/best-time-tanzania", label: "Quand partir en Tanzanie" },
      { href: "/journal/what-to-pack", label: "Quoi porter et emporter" },
      { href: "/zanzibar", label: "Zanzibar" },
    ],
    cta: "Dites-nous qui voyage et ce que votre famille aime",
    published: true,
  },
  {
    slug: "halal-safari",
    title: "Safari halal en Tanzanie",
    subtitle: "Voyager dans le sauvage en restant fidèle à vos valeurs",
    category: "Préparer un safari",
    excerpt: "Une composition attentive pour les repas, la prière et le confort personnel.",
    cover: "halal",
    seoTitle: "Safari halal en Tanzanie | Serenova",
    seoDescription:
      "Composer un safari plus confortable : repas, prière, intimité, famille et une possible extension à Zanzibar.",
    intro: [
      "Un safari halal peut faire une place aux préférences alimentaires, à la foi et au confort, tout en ouvrant la faune et les paysages de Tanzanie. La clé est une préparation claire : les arrangements se discutent et se confirment, ils ne se présument pas.",
    ],
    blocks: [
      {
        type: "figure",
        id: "culture-1",
        caption: "Tout commence par l’écoute — pas par un menu standard.",
        frame: "wide",
      },
      { type: "h2", text: "Que signifie « halal » pour votre voyage ?" },
      {
        type: "p",
        text: "Les attentes diffèrent. Certains demandent une certification halal vérifiée ; d’autres se sentent à l’aise avec poissons ou options végétariennes préparées dans de bonnes conditions. D’autres encore privilégient la prière, l’intimité de la chambre ou un véhicule privé. Serenova commence par écouter ce qui compte pour vous.",
      },
      { type: "h2", text: "Prévoir les repas à l’avance" },
      {
        type: "p",
        text: "Les repas dépendent du lodge, du camp et de la région. Quand c’est possible, les partenaires peuvent discuter de repas halal, d’options végétariennes ou de pique-niques. Si la certification, le matériel séparé ou l’absence de contamination croisée est essentielle, dites-le clairement. Ne supposez jamais qu’un menu « halal-friendly » répond à toutes les exigences.",
      },
      { type: "h2", text: "La prière et le rythme du jour" },
      {
        type: "p",
        text: "Les journées commencent tôt et passent longtemps dans les parcs. Un véhicule privé peut offrir plus de souplesse pour des arrêts sûrs et autorisés, mais horaires, règles de faune et conditions locales s’appliquent encore. Emportez l’essentiel de prière si cela aide, et parlez-en avant le départ.",
      },
      {
        type: "figure",
        id: "zanzibar-detail",
        caption: "Zanzibar peut prolonger le safari — dans le respect des usages locaux.",
        frame: "portrait",
      },
      { type: "h2", text: "Hébergement et confort" },
      {
        type: "p",
        text: "Vous pouvez souhaiter plus d’intimité, des chambres familiales ou un certain cadre de repas. Discutez-en tôt : les services varient beaucoup d’une propriété à l’autre, surtout à l’écart.",
      },
      { type: "h2", text: "Du Serengeti à Zanzibar" },
      {
        type: "p",
        text: "Zanzibar ajoute plages, héritage swahili et une histoire islamique vivante. Stone Town et les marchés peuvent compléter le safari. La tenue et les usages locaux méritent le respect, surtout hors des resorts.",
      },
      { type: "h2", text: "Quoi dire à Serenova avant de réserver" },
      {
        type: "p",
        text: "Besoins alimentaires ; si une certification est nécessaire ; priorités de prière ; intimité ; qui voyage ; âges des enfants ; si un véhicule privé importe. Des attentes claires évitent la déception.",
      },
      {
        type: "notice",
        text: "Une composition « halal » ne garantit pas des repas certifiés, des arrêts de prière ininterrompus ni des équipements précis. Tout arrangement essentiel exige une confirmation du prestataire.",
      },
    ],
    related: [
      { href: "/journal/tanzania-travel-essentials", label: "Essentiels de voyage" },
      { href: "/styles/family", label: "Safari en famille" },
      { href: "/zanzibar", label: "Zanzibar" },
    ],
    cta: "Partagez vos préférences en confiance",
    published: true,
  },
  {
    slug: "honeymoon-safari",
    title: "Safari de noces en Tanzanie",
    subtitle: "Quand l’aventure devient une histoire à deux",
    category: "Famille et romance",
    excerpt: "Des idées pour la faune, l’intimité, les lodges et le temps ensemble.",
    cover: "honeymoon",
    seoTitle: "Safari de noces en Tanzanie et à Zanzibar | Serenova",
    seoDescription:
      "Des idées de safari romantique : voyage privé, lodges, faune et une extension à Zanzibar.",
    intro: [
      "Un voyage de noces en Tanzanie peut lier l’élan et le ralentissement. Un jour commence avec un safari au lever du soleil ; un autre s’achève sous les étoiles, ou avec l’océan derrière la chambre. La beauté est de choisir un équilibre qui vous ressemble.",
    ],
    blocks: [
      {
        type: "figure",
        id: "sunset-2",
        caption: "La lumière partagée en fin de jour — l’itinéraire doit lui laisser de la place.",
        frame: "wide",
      },
      { type: "h2", text: "Une histoire au cœur de l’Afrique" },
      {
        type: "p",
        text: "Les paysages peuvent sembler cinématographiques : plaines dorées, ciels vastes, une faune dans un monde à part. Les découvertes partagées restent souvent le plus longtemps.",
      },
      { type: "h2", text: "Pourquoi la Tanzanie ?" },
      {
        type: "p",
        text: "Peu de destinations offrent autant de variété dans un seul voyage. Parcs, lodges, vols pittoresques quand ils existent, moments à deux et repos d’île peuvent se composer selon vos dates et votre budget.",
      },
      { type: "h2", text: "Un safari privé, à deux" },
      {
        type: "p",
        text: "Un véhicule privé donne plus d’indépendance sur le rythme du jour. Lever tôt, rester plus longtemps devant une scène, des silences sans suivre un groupe. Disponibilités et inclusions se confirment pour votre itinéraire.",
      },
      {
        type: "figure",
        id: "zanzibar-beach",
        caption: "Après le bush, un autre rythme : l’air marin et des matins plus lents.",
        frame: "portrait",
      },
      { type: "h2", text: "Lodges et camps" },
      {
        type: "figure",
        id: "lodge-crater-edge",
        caption: "Un lodge se choisit pour le lieu et l’esprit — jamais comme une inclusion promise.",
        frame: "wide",
      },
      {
        type: "p",
        text: "De camps de toile élégants à des lodges avec de grandes vues. Regardez au-delà des photos : emplacement, service, transferts, intimité et accessibilité saisonnière comptent autant.",
      },
      { type: "h2", text: "Des instants à partager" },
      {
        type: "p",
        text: "La lumière du matin sur les plaines, un petit-déjeuner sans hâte, le temps de s’asseoir quand le paysage change de couleur. Une montgolfière peut exister par endroits, selon météo, horaires, restrictions et un coût supplémentaire.",
      },
      { type: "h2", text: "Quand partir ?" },
      {
        type: "p",
        text: "Juin à octobre séduit souvent pour des conditions plus sèches et une observation classique. Certains couples préfèrent le vert et une atmosphère plus calme hors pic. Vos dates dépendent aussi de la côte choisie à Zanzibar.",
      },
      { type: "h2", text: "Du Serengeti à Zanzibar" },
      {
        type: "figure",
        id: "lodge-the-mora",
        caption: "The Mora Zanzibar — un séjour illustratif au bord de l’eau après le bush, jamais une inclusion fixe.",
        frame: "wide",
      },
      {
        type: "p",
        text: "Après des jours de bush, une extension plage offre un autre souffle : océan, matins calmes, histoire et culture côtière. Tenez compte des marées et des vents saisonniers.",
      },
      {
        type: "takeaway",
        text: "Parlez-nous de l’équilibre que vous imaginez : aventure et repos, intimité et découverte, photo et plage. Serenova peut composer autour de votre histoire.",
      },
    ],
    related: [
      { href: "/journal/best-time-tanzania", label: "Quand partir en Tanzanie" },
      { href: "/zanzibar", label: "Zanzibar" },
      { href: "/why-serenova", label: "Pourquoi Serenova" },
    ],
    cta: "Commencer à composer votre lune de miel",
    published: true,
  },
  {
    slug: "tanzania-travel-essentials",
    title: "Essentiels de voyage en Tanzanie",
    subtitle: "Visas, argent et informations pratiques",
    category: "Préparer un safari",
    excerpt: "Visas, assurance inbound obligatoire, argent et préparatifs concrets.",
    cover: "fly-check",
    seoTitle: "Essentiels Tanzanie : visa, assurance et argent",
    seoDescription:
      "Guide pratique : visas, assurance inbound obligatoire, santé, monnaie, paiements, transports et usages. Mis à jour octobre 2026.",
    lastReviewed: "22 octobre 2026",
    intro: [
      "Du Serengeti à la côte de Zanzibar, un peu de préparation rend le voyage plus simple. Les règles changent, et elles dépendent de la nationalité et de la route : ce guide est un point de départ. Vérifiez les autorités officielles avant de partir.",
    ],
    blocks: [
      {
        type: "figure",
        id: "vehicle-2",
        caption: "La préparation fait partie du voyage — documents, santé, transferts.",
        frame: "wide",
      },
      { type: "h2", text: "Passeport et visa" },
      {
        type: "p",
        text: "Il faut en général un passeport valable au moins six mois, mais les règles exactes dépendent de la nationalité. L’éligibilité au visa varie aussi. Les indications officielles eVisa mentionnent un visa touristique ordinaire à 50 USD, souvent valable jusqu’à 90 jours ; les passeports américains en tourisme sont généralement orientés vers un visa à entrées multiples, indiqué à 100 USD. Ne supposez pas que ces catégories s’appliquent à tous.",
      },
      {
        type: "p",
        text: "Utilisez le portail officiel et postulez à temps. Suivez les consignes pour votre nationalité et conservez la confirmation. Un visa à l’arrivée peut exister pour certains voyageurs : à vérifier, pas à promettre.",
      },
      { type: "h2", text: "Assurance inbound obligatoire — mise à jour 2026" },
      {
        type: "p",
        text: "Depuis le 1er octobre 2026, la Tanzanie continentale a introduit une assurance inbound obligatoire pour les visiteurs étrangers, dans le cadre des règles applicables. Zanzibar a déjà un dispositif obligatoire. Les avis officiels identifient NIC pour une entrée par le continent et ZIC pour une entrée par Zanzibar. Pour un voyage qui combine les deux, les indications gouvernementales suggèrent qu’une police correctement émise peut couvrir le parcours ; le point d’entrée et les exceptions actuelles restent à vérifier.",
      },
      {
        type: "p",
        text: "La prime adulte généralement publiée est de 44 USD pour une couverture jusqu’à 92 jours, avec des règles selon la catégorie de voyageur. Cette police obligatoire ne remplace pas une assurance voyage personnelle complète, surtout pour l’annulation, les antécédents ou d’autres exclusions. Lisez les conditions officielles avant de payer.",
      },
      { type: "h2", text: "Santé" },
      {
        type: "p",
        text: "Consultez un professionnel de santé-voyage bien avant le départ : vaccins, paludisme, besoins individuels. Un certificat de fièvre jaune peut dépendre de l’historique de voyage et des transits, pas seulement de la destination. Emportez les médicaments dans leur emballage d’origine quand c’est possible, une protection soleil et insectes, et la preuve de votre assurance personnelle.",
      },
      { type: "h2", text: "Argent et paiements" },
      {
        type: "p",
        text: "La monnaie locale est le shilling tanzanien (TZS). Certains services touristiques affichent des prix en dollars ; les achats locaux sont souvent plus simples en shillings. Les cartes passent dans beaucoup d’établissements plus grands, pas partout, et le réseau varie. Prévoyez un peu de liquide, confirmez les moyens de paiement et utilisez des changes de confiance.",
      },
      { type: "h2", text: "Pourboires" },
      {
        type: "p",
        text: "Le pourboire est apprécié dans beaucoup de contextes touristiques, mais il reste personnel. Demandez un repère à Jenny plutôt que d’assumer un tarif obligatoire.",
      },
      { type: "h2", text: "Langue et culture" },
      {
        type: "p",
        text: "Le swahili est la langue nationale ; l’anglais est largement utilisé dans le voyage. Quelques mots aident : Jambo (bonjour), Asante (merci), Karibu (bienvenue), Safari njema (bon voyage). Demandez avant de photographier les personnes, et respectez les lieux culturels et religieux.",
      },
      { type: "h2", text: "Arrivées et déplacements" },
      {
        type: "p",
        text: "Points d’arrivée fréquents : aéroport international du Kilimandjaro, Julius Nyerere à Dar es Salaam, Abeid Amani Karume à Zanzibar. Transferts, vols intérieurs et routes de safari dépendent de l’itinéraire ; certaines pistes sont longues ou rudes, surtout après la pluie.",
      },
      { type: "h2", text: "Électricité et connexion" },
      {
        type: "p",
        text: "La Tanzanie utilise en général 230 V et des prises de type D et G. Un adaptateur universel peut aider. Le Wi-Fi varie, surtout dans les camps reculés ; SIM et eSIM dépendent de l’appareil et de la couverture.",
      },
      {
        type: "list",
        title: "Avant de partir",
        items: [
          "Vérifier passeport et éligibilité visa",
          "Confirmer l’assurance inbound obligatoire",
          "Relire votre assurance personnelle",
          "Consulter un avis de santé-voyage",
          "Vérifier les bagages et partager les besoins alimentaires",
          "Confirmer les transferts et garder des copies hors ligne",
        ],
      },
      {
        type: "notice",
        text: "Les politiques publiques et celles des prestataires peuvent changer sans préavis. Ce guide n’est pas un conseil d’immigration, médical ou d’assurance. Consultez les sources officielles et des professionnels qualifiés.",
      },
    ],
    related: [
      { href: "/journal/what-to-pack", label: "Quoi porter et emporter" },
      { href: "/journal/best-time-tanzania", label: "Quand partir en Tanzanie" },
      { href: "/styles/family", label: "Safari en famille" },
    ],
    cta: "Besoin d’aide pour préparer les détails du voyage ?",
    sources: journalArticlesEn.find((item) => item.slug === "tanzania-travel-essentials")?.sources,
    published: true,
  },
  {
    slug: "tanzania-uganda-safari",
    title: "Safari Tanzanie–Ouganda",
    subtitle: "Deux mondes, un même voyage",
    category: "Guides",
    excerpt: "Lier les paysages classiques d’Afrique de l’Est à une expérience de forêt extraordinaire.",
    cover: "uganda",
    seoTitle: "Safari Tanzanie–Ouganda : Serengeti et gorilles | Serenova",
    seoDescription:
      "Comment lier un safari en Tanzanie à l’expérience des gorilles de montagne en Ouganda, avec des pistes de route et des limites concrètes.",
    intro: [
      "Un voyage Tanzanie–Ouganda réunit deux écosystèmes remarquables. La Tanzanie est célébrée pour ses plaines, sa faune de safari et ses grands paysages. L’Ouganda offre la forêt, une biodiversité exceptionnelle et, dans des conditions très encadrées, le tracking des gorilles de montagne.",
    ],
    blocks: [
      {
        type: "figure",
        id: "serengeti-lions",
        caption: "Les plaines ouvertes de Tanzanie — un autre monde que la forêt de montagne.",
        frame: "wide",
      },
      { type: "h2", text: "Pourquoi lier ces deux destinations ?" },
      {
        type: "p",
        text: "Le contraste est l’attrait. Une part du voyage peut se dérouler dans les horizons du Serengeti ; une autre sur des sentiers forestiers. Les deux demandent une connaissance locale, un rythme juste et le respect des habitats protégés.",
      },
      { type: "h2", text: "La Tanzanie" },
      {
        type: "p",
        text: "Le Serengeti offre savane classique et mouvements saisonniers. L’aire de conservation du Ngorongoro présente un paysage dramatique ; Tarangire est connu pour les éléphants, les baobabs et des habitats variés. Les observations restent imprévisibles.",
      },
      {
        type: "figure",
        id: "gombe",
        caption: "La forêt d’Afrique de l’Est est un autre voyage — exigeant, réglementé, jamais anodin.",
        frame: "portrait",
      },
      { type: "h2", text: "L’expérience ougandaise" },
      {
        type: "p",
        text: "Le parc national de Bwindi Impenetrable est particulièrement associé au tracking des gorilles. C’est une activité réglementée : permis, âge, santé, distances, consignes du guide. Le terrain peut être raide, humide, éprouvant. L’accessibilité doit être envisagée honnêtement.",
      },
      { type: "h2", text: "Deux mondes : Serengeti et Bwindi" },
      {
        type: "p",
        text: "Passer des herbes aux brumes de forêt est extraordinaire, mais les distances sont grandes. Transferts efficaces, vols adaptés et temps tampon importent plus qu’une étape de trop.",
      },
      {
        type: "list",
        title: "Un itinéraire illustratif de 10 jours",
        items: [
          "Jour 1 : arrivée à Arusha ; s’installer.",
          "Jour 2 : parc national de Tarangire.",
          "Jour 3 : région du Ngorongoro.",
          "Jours 4–5 : parc national du Serengeti.",
          "Jour 6 : route vers l’Ouganda ; vols et nuitée à confirmer.",
          "Jour 7 : transfert et briefing pour Bwindi.",
          "Jour 8 : tracking des gorilles, sous réserve de permis, d’éligibilité et des conditions locales.",
          "Jour 9 : journée souple, selon le lieu et l’énergie.",
          "Jour 10 : départ.",
        ],
      },
      {
        type: "notice",
        text: "Ceci est une inspiration, pas un itinéraire réservable. Visas transfrontaliers, documents de vaccination, vols, permis gorilles et faisabilité des transferts exigent une revue prestataire. Un voyage plus long peut être plus confortable. Que Serenova propose aujourd’hui des formules Ouganda opérationnelles reste à confirmer avec Jenny avant toute offre.",
      },
      {
        type: "takeaway",
        text: "Serenova peut explorer une idée à deux pays avec des partenaires adaptés — dates, intérêts, confort physique et budget — une fois le périmètre opérationnel confirmé.",
      },
    ],
    related: [
      { href: "/journal/best-time-tanzania", label: "Quand partir en Tanzanie" },
      { href: "/journal/tanzania-photography-safari", label: "Safari photo" },
      { href: "/uganda", label: "Ouganda" },
    ],
    cta: "Parler d’un voyage à deux pays",
    published: true,
  },
];

export const journalCardsFr: JournalCard[] = [
  ...journalArticlesFr.map((item) => ({
    slug: item.slug,
    href: `/journal/${item.slug}`,
    title: item.title,
    category: item.category,
    excerpt: item.excerpt,
    cover: item.cover,
    published: item.published,
  })),
  {
    slug: "why-serenova",
    href: "/why-serenova",
    title: "Pourquoi voyager avec Serenova ?",
    category: "Notre philosophie",
    excerpt:
      "Une composition attentive, un regard local et une approche personnelle des voyages qui reflètent ce qui compte pour vous.",
    cover: "sunset-ngorongoro",
    published: true,
  },
];
