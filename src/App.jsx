import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ExternalLink,
  Globe2,
} from "lucide-react";
import { Card, CardContent } from "./components/ui/card";

const baseLocaleCopy = {
  langLabel: "Language",
  langCode: "EN",
  langName: "English",
  openDocAria: "Open DOC Studios in a new tab",
  openGrowthAria: "Open Business Development / Marketing / SEO section",
  docBadge: "DOC Studios",
  docTitle: "DOC Studios s.r.o.",
  docBrandButton: "DOC Studios s.r.o.",
  docCta: "Open DOC Studios",
  docIntroPrefix: "Born in the shadows of Prague's ancient streets, ",
  docIntroHighlight: "DOC Studios s.r.o.",
  docIntroSuffix: " emerged from the collision of classical tradition and modern rebellion.",
  docNarrativeSecond:
    "We are artists united by a singular vision: to create music that doesn't just accompany stories. It becomes the very soul of them. Our compositions bleed emotion, our arrangements breathe life into silence, and our productions transform ordinary moments into extraordinary experiences.",
  docNarrativeThird:
    "From the haunting corridors of film scores to the pulsing energy of game soundtracks, from the sophisticated elegance of advertisement music to the raw power of brand anthems. We forge sonic landscapes that linger long after the last note fades.",
  docClosingLine:
    "In chaos, we find order. In darkness, we discover light. In silence, we create symphonies that echo through eternity.",
  docManifestoAuthor: "Drive of Chaos Manifesto",
  mobileLandingTitle: "Select the service you want to continue with",
  mobileLandingText: "Choose the line that matches your need and continue with the right workflow.",
  mobileDocTagline: "Music / Video / Production",
  mobileGrowthTitle: "Business Development / Marketing / SEO",
  mobileGrowthSubtitle: "Visibility / Trust / Conversion",
  mobileGrowthContinue: "Continue",
  growthBadge: "Business Development / Marketing / SEO",
  growthHeroLine1: "Make your business",
  growthHeroLine2Prefix: "easier to",
  growthHeroFind: "find",
  growthHeroTrust: "trust",
  growthHeroAnd: "and",
  growthHeroChoose: "choose",
  growthCta: "View Solutions",
  businessSupportText:
    "We build business-facing digital structures that improve visibility, clarify positioning, and support better conversion across web, SEO, and brand communication.",
  businessSupportLine:
    "Marketing and SEO should do more than increase reach. They should bring better-fit demand and support sustainable growth.",
  tabServices: "Services",
  tabProducts: "Products",
  tabContact: "Contact",
  servicesEyebrow: "Services",
  servicesTitle: "Business Development / Marketing / SEO Services",
  servicesText:
    "Outcome-focused services designed to improve visibility, trust, conversion quality, SEO sustainability, advertising efficiency, and brand consistency, with a clear delivery path.",
  servicesCards: [
    {
      title: "Visibility",
      points: ["stronger search presence", "better discoverability", "improved digital reach"],
    },
    {
      title: "Trust",
      points: ["more professional presentation", "clearer structure", "stronger first impression"],
    },
    {
      title: "Conversion",
      points: ["clearer messaging", "better CTA flow", "improved conversion quality"],
    },
    {
      title: "SEO Performance",
      points: [
        "stronger organic visibility",
        "reduced reliance on paid traffic",
        "more sustainable search performance",
      ],
    },
    {
      title: "Advertising Efficiency",
      points: ["lower wasted spend", "better audience targeting", "more efficient Instagram ad performance"],
    },
    {
      title: "Brand Consistency",
      points: [
        "social media aligned with brand palette",
        "stronger visual consistency",
        "more memorable digital presence",
      ],
    },
  ],
  productsEyebrow: "Products",
  productsTitle: "Structured Growth Products",
  productsText:
    "Pre-scoped product packages for teams that need clearer execution blocks, faster rollout, and measurable digital outcomes.",
  productsCards: [
    {
      title: "Visibility Suite",
      points: [
        "SEO baseline and content intent mapping",
        "website structure aligned with search behavior",
        "discoverability improvements across key touchpoints",
      ],
    },
    {
      title: "Conversion System",
      points: [
        "message hierarchy for faster decision-making",
        "CTA architecture with cleaner page flow",
        "improved lead quality through clearer qualification",
      ],
    },
    {
      title: "Brand and Media Alignment",
      points: [
        "social visuals aligned to brand palette",
        "consistent campaign presentation across channels",
        "stronger recognition across digital touchpoints",
      ],
    },
  ],
  contactEyebrow: "Contact",
  contactTitle: "Contact and Initial Alignment",
  contactText: "A dedicated contact flow focused on scope clarity and practical project start.",
  deliveryTitle: "Delivery Map",
  deliveryText: "A clear process that turns digital improvement into practical business value.",
  deliverySteps: [
    {
      title: "Review",
      description:
        "We assess the current digital presence across website clarity, search visibility, social media consistency, and communication quality.",
    },
    {
      title: "Structure",
      description:
        "We define the most effective improvement path based on business goals, visibility needs, and conversion priorities.",
    },
    {
      title: "Deliver",
      description:
        "We implement and refine the agreed structure to improve clarity, trust, consistency, and overall digital performance.",
    },
  ],
  contactConsultTitle: "Book Free Consultation",
  contactPoint1: "initial alignment call to confirm scope",
  contactPoint2: "recommended service or product direction",
  contactPoint3: "clear project start sequence with responsibilities",
  contactEmailLabel: "preferred contact email",
  contactReferenceHelp:
    "Please provide a business reference (Google Maps link, Instagram profile, or exact business name) so pre-meeting research can be completed.",
  formNameLabel: "Name *",
  formNamePlaceholder: "Your full name",
  formEmailLabel: "Email *",
  formEmailPlaceholder: "name@company.com",
  formBusinessReferenceLabel: "Business Reference *",
  formBusinessReferencePlaceholder: "Google Maps, Instagram, or exact business name",
  formSubjectLabel: "Subject",
  formSubjectPlaceholder: "Project subject",
  formMessageLabel: "Message *",
  formMessagePlaceholder: "Tell us what you need and what outcome you want to achieve.",
  formSubmit: "Send Inquiry",
  formSubmitSending: "Sending...",
  formErrorRequired: "Please complete Name, Email, Business Reference, and Message before sending.",
  formErrorEmail: "Please enter a valid email address.",
  formErrorSend: "Message delivery failed. Please try again in a minute.",
  formSuccess: "Your request has been sent to our team.",
};

const localeCopy = {
  en: baseLocaleCopy,
  de: {
    ...baseLocaleCopy,
    langLabel: "Sprache",
    langCode: "DE",
    langName: "Deutsch",
    openDocAria: "DOC Studios in neuem Tab oeffnen",
    openGrowthAria: "Bereich Business Development / Marketing / SEO oeffnen",
    docCta: "DOC Studios oeffnen",
    docIntroPrefix: "Geboren im Schatten der alten Strassen Prags, ",
    docIntroSuffix: " entstand aus der Kollision klassischer Tradition und moderner Rebellion.",
    docNarrativeSecond:
      "Wir sind Kuenstler mit einer gemeinsamen Vision: Musik zu erschaffen, die Geschichten nicht nur begleitet, sondern zu ihrer Seele wird. Unsere Kompositionen tragen Emotion, unsere Arrangements geben Stille Leben und unsere Produktionen verwandeln gewoehnliche Momente in aussergewoehnliche Erlebnisse.",
    docNarrativeThird:
      "Von den duesteren Korridoren von Filmscores bis zur pulsierenden Energie von Game-Soundtracks, von der eleganten Praezision in Werbemusik bis zur rohen Kraft von Brand-Anthems. Wir formen Klangraeume, die lange nach dem letzten Ton nachhallen.",
    docClosingLine:
      "Im Chaos finden wir Ordnung. In Dunkelheit entdecken wir Licht. In Stille erschaffen wir Symphonien, die durch die Ewigkeit hallen.",
    docManifestoAuthor: "Drive of Chaos Manifest",
    mobileLandingTitle: "Waehlen Sie den Service, mit dem Sie fortfahren moechten",
    mobileLandingText: "Waehlen Sie die passende Linie und starten Sie mit dem richtigen Ablauf.",
    mobileDocTagline: "Musik / Video / Produktion",
    mobileGrowthSubtitle: "Sichtbarkeit / Vertrauen / Conversion",
    mobileGrowthContinue: "Weiter",
    growthHeroLine1: "Machen Sie Ihr Unternehmen",
    growthHeroLine2Prefix: "einfacher zu",
    growthHeroFind: "finden",
    growthHeroTrust: "vertrauen",
    growthHeroAnd: "und",
    growthHeroChoose: "waehlen",
    growthCta: "Loesungen ansehen",
    businessSupportText:
      "Wir entwickeln business-orientierte digitale Strukturen, die Sichtbarkeit steigern, Positionierung klaeren und bessere Conversion ueber Website, SEO und Markenkommunikation unterstuetzen.",
    businessSupportLine:
      "Marketing und SEO sollten mehr leisten als Reichweite. Sie sollen passendere Nachfrage erzeugen und nachhaltiges Wachstum unterstuetzen.",
    tabServices: "Leistungen",
    tabProducts: "Produkte",
    tabContact: "Kontakt",
    servicesEyebrow: "Leistungen",
    servicesTitle: "Business Development / Marketing / SEO Leistungen",
    servicesText:
      "Ergebnisorientierte Leistungen zur Verbesserung von Sichtbarkeit, Vertrauen, Conversion-Qualitaet, SEO-Nachhaltigkeit, Werbeeffizienz und Markenkonsistenz - mit klarem Delivery-Ablauf.",
    servicesCards: [
      {
        title: "Sichtbarkeit",
        points: ["staerkere Suchpraesenz", "bessere Auffindbarkeit", "hoehere digitale Reichweite"],
      },
      {
        title: "Vertrauen",
        points: ["professionellerer Auftritt", "klarere Struktur", "staerkerer erster Eindruck"],
      },
      {
        title: "Conversion",
        points: ["klarere Botschaften", "besserer CTA-Flow", "hoehere Conversion-Qualitaet"],
      },
      {
        title: "SEO-Performance",
        points: [
          "staerkere organische Sichtbarkeit",
          "geringere Abhaengigkeit von Paid Traffic",
          "nachhaltigere Suchperformance",
        ],
      },
      {
        title: "Werbeeffizienz",
        points: ["weniger Streuverlust", "besseres Audience-Targeting", "effizientere Instagram-Ads"],
      },
      {
        title: "Markenkonsistenz",
        points: [
          "Social Media an die Markenpalette angepasst",
          "staerkere visuelle Konsistenz",
          "praegnantere digitale Praesenz",
        ],
      },
    ],
    productsEyebrow: "Produkte",
    productsTitle: "Strukturierte Growth-Produkte",
    productsText:
      "Vordefinierte Produktpakete fuer Teams, die klarere Umsetzungsbloecke, schnelleren Rollout und messbare digitale Ergebnisse brauchen.",
    productsCards: [
      {
        title: "Sichtbarkeits-Suite",
        points: [
          "SEO-Basis und Content-Intent-Mapping",
          "Website-Struktur entlang des Suchverhaltens",
          "bessere Auffindbarkeit an zentralen Touchpoints",
        ],
      },
      {
        title: "Conversion-System",
        points: [
          "Message-Hierarchie fuer schnellere Entscheidungen",
          "CTA-Architektur mit klarerem Seitenfluss",
          "hoehere Lead-Qualitaet durch bessere Qualifizierung",
        ],
      },
      {
        title: "Marken- und Medienabgleich",
        points: [
          "Social Visuals abgestimmt auf die Markenpalette",
          "konsistente Kampagnenpraesenz ueber Kanaele",
          "staerkere Wiedererkennung in digitalen Touchpoints",
        ],
      },
    ],
    contactEyebrow: "Kontakt",
    contactTitle: "Kontakt und Erstabgleich",
    contactText: "Ein klarer Kontaktprozess mit Fokus auf Scope-Klarheit und sauberem Projektstart.",
    deliveryTitle: "Umsetzungsplan",
    deliveryText: "Ein klarer Prozess, der digitale Verbesserung in praktischen Business-Nutzen umsetzt.",
    deliverySteps: [
      {
        title: "Pruefung",
        description:
          "Wir bewerten die aktuelle digitale Praesenz in Bezug auf Website-Klarheit, Suchsichtbarkeit, Social-Media-Konsistenz und Kommunikationsqualitaet.",
      },
      {
        title: "Struktur",
        description:
          "Wir definieren den effektivsten Verbesserungsweg basierend auf Business-Zielen, Sichtbarkeitsbedarf und Conversion-Prioritaeten.",
      },
      {
        title: "Umsetzung",
        description:
          "Wir implementieren und optimieren die vereinbarte Struktur, um Klarheit, Vertrauen, Konsistenz und gesamte digitale Performance zu verbessern.",
      },
    ],
    contactConsultTitle: "Kostenlose Erstberatung buchen",
    contactPoint1: "Erstabgleich zur Scope-Bestaetigung",
    contactPoint2: "empfohlene Service- oder Produktausrichtung",
    contactPoint3: "klarer Projektstart mit Rollen und Verantwortlichkeiten",
    contactEmailLabel: "bevorzugte Kontakt-E-Mail",
    contactReferenceHelp:
      "Bitte geben Sie eine Business-Referenz an (Google-Maps-Link, Instagram-Profil oder exakter Firmenname), damit die Vorbereitung vor dem Termin erfolgen kann.",
    formNameLabel: "Name *",
    formNamePlaceholder: "Ihr voller Name",
    formEmailLabel: "E-Mail *",
    formEmailPlaceholder: "name@unternehmen.de",
    formBusinessReferenceLabel: "Business-Referenz *",
    formBusinessReferencePlaceholder: "Google Maps, Instagram oder exakter Firmenname",
    formSubjectLabel: "Betreff",
    formSubjectPlaceholder: "Projektbetreff",
    formMessageLabel: "Nachricht *",
    formMessagePlaceholder: "Beschreiben Sie kurz Ihr Ziel und den gewuenschten Outcome.",
    formSubmit: "Anfrage senden",
    formSubmitSending: "Wird gesendet...",
    formErrorRequired: "Bitte Name, E-Mail, Business-Referenz und Nachricht ausfuellen.",
    formErrorEmail: "Bitte geben Sie eine gueltige E-Mail-Adresse ein.",
    formErrorSend: "Nachricht konnte nicht uebermittelt werden. Bitte in einer Minute erneut versuchen.",
    formSuccess: "Ihre Anfrage wurde an unser Team gesendet.",
  },
  es: {
    ...baseLocaleCopy,
    langLabel: "Idioma",
    langCode: "ES",
    langName: "Espanol",
    openDocAria: "Abrir DOC Studios en una nueva pestana",
    openGrowthAria: "Abrir seccion Business Development / Marketing / SEO",
    docCta: "Abrir DOC Studios",
    docIntroPrefix: "Nacido en las sombras de las antiguas calles de Praga, ",
    docIntroSuffix: " surgio de la colision entre la tradicion clasica y la rebelion moderna.",
    docNarrativeSecond:
      "Somos artistas unidos por una vision singular: crear musica que no solo acompane historias, sino que se convierta en su alma. Nuestras composiciones transmiten emocion, nuestros arreglos dan vida al silencio y nuestras producciones transforman momentos ordinarios en experiencias extraordinarias.",
    docNarrativeThird:
      "Desde los corredores inquietantes de las bandas sonoras de cine hasta la energia pulsante de los soundtracks de videojuegos, desde la elegancia sofisticada de la musica publicitaria hasta la fuerza cruda de los himnos de marca. Forjamos paisajes sonoros que perduran mucho despues de la ultima nota.",
    docClosingLine:
      "En el caos encontramos orden. En la oscuridad descubrimos luz. En el silencio creamos sinfonias que resuenan en la eternidad.",
    docManifestoAuthor: "Manifiesto Drive of Chaos",
    mobileLandingTitle: "Selecciona el servicio con el que quieres continuar",
    mobileLandingText: "Elige la linea que se ajuste a tu necesidad y continua con el flujo correcto.",
    mobileDocTagline: "Musica / Video / Produccion",
    mobileGrowthSubtitle: "Visibilidad / Confianza / Conversion",
    mobileGrowthContinue: "Continuar",
    growthHeroLine1: "Haz tu negocio",
    growthHeroLine2Prefix: "mas facil de",
    growthHeroFind: "encontrar",
    growthHeroTrust: "confiar",
    growthHeroAnd: "y",
    growthHeroChoose: "elegir",
    growthCta: "Ver soluciones",
    businessSupportText:
      "Construimos estructuras digitales orientadas al negocio que mejoran visibilidad, aclaran posicionamiento y apoyan mejor conversion en web, SEO y comunicacion de marca.",
    businessSupportLine:
      "Marketing y SEO deben hacer mas que aumentar alcance. Deben traer demanda mejor calificada y sostener crecimiento a largo plazo.",
    tabServices: "Servicios",
    tabProducts: "Productos",
    tabContact: "Contacto",
    servicesEyebrow: "Servicios",
    servicesTitle: "Servicios de Business Development / Marketing / SEO",
    servicesText:
      "Servicios orientados a resultados para mejorar visibilidad, confianza, calidad de conversion, sostenibilidad SEO, eficiencia publicitaria y consistencia de marca, con un delivery path claro.",
    servicesCards: [
      {
        title: "Visibilidad",
        points: ["presencia de busqueda mas fuerte", "mejor descubrimiento", "mayor alcance digital"],
      },
      {
        title: "Confianza",
        points: ["presentacion mas profesional", "estructura mas clara", "mejor primera impresion"],
      },
      {
        title: "Conversion",
        points: ["mensajeria mas clara", "mejor flujo de CTA", "mayor calidad de conversion"],
      },
      {
        title: "Rendimiento SEO",
        points: [
          "visibilidad organica mas fuerte",
          "menor dependencia del trafico pagado",
          "rendimiento de busqueda mas sostenible",
        ],
      },
      {
        title: "Eficiencia Publicitaria",
        points: ["menos gasto desperdiciado", "mejor segmentacion de audiencia", "Instagram ads mas eficientes"],
      },
      {
        title: "Consistencia de Marca",
        points: [
          "redes sociales alineadas con la paleta de marca",
          "consistencia visual mas fuerte",
          "presencia digital mas memorable",
        ],
      },
    ],
    productsEyebrow: "Productos",
    productsTitle: "Productos de Growth Estructurados",
    productsText:
      "Paquetes predefinidos para equipos que necesitan bloques de ejecucion mas claros, despliegue mas rapido y resultados digitales medibles.",
    productsCards: [
      {
        title: "Suite de Visibilidad",
        points: [
          "base SEO y mapeo de intencion de contenido",
          "estructura web alineada con comportamiento de busqueda",
          "mejoras de descubrimiento en puntos de contacto clave",
        ],
      },
      {
        title: "Sistema de Conversion",
        points: [
          "jerarquia de mensajes para decidir mas rapido",
          "arquitectura CTA con flujo de pagina mas limpio",
          "mejor calidad de leads con calificacion mas clara",
        ],
      },
      {
        title: "Alineacion de Marca y Medios",
        points: [
          "visuales sociales alineados con la paleta de marca",
          "presentacion de campana consistente entre canales",
          "mayor reconocimiento en puntos de contacto digitales",
        ],
      },
    ],
    contactEyebrow: "Contacto",
    contactTitle: "Contacto y Alineacion Inicial",
    contactText: "Flujo de contacto enfocado en claridad de alcance y buen inicio de proyecto.",
    deliveryTitle: "Mapa de Entrega",
    deliveryText: "Un proceso claro que convierte mejora digital en valor practico de negocio.",
    deliverySteps: [
      {
        title: "Revision",
        description:
          "Evaluamos la presencia digital actual en claridad de sitio web, visibilidad en buscadores, consistencia en redes sociales y calidad de comunicacion.",
      },
      {
        title: "Estructura",
        description:
          "Definimos la ruta de mejora mas efectiva segun objetivos de negocio, necesidades de visibilidad y prioridades de conversion.",
      },
      {
        title: "Entrega",
        description:
          "Implementamos y refinamos la estructura acordada para mejorar claridad, confianza, consistencia y rendimiento digital general.",
      },
    ],
    contactConsultTitle: "Reserva una consulta gratuita",
    contactPoint1: "llamada inicial para confirmar alcance",
    contactPoint2: "direccion recomendada de servicio o producto",
    contactPoint3: "secuencia clara de inicio con responsabilidades",
    contactEmailLabel: "email de contacto preferido",
    contactReferenceHelp:
      "Por favor comparte una referencia de negocio (enlace de Google Maps, perfil de Instagram o nombre exacto) para realizar investigacion antes de la reunion.",
    formNameLabel: "Nombre *",
    formNamePlaceholder: "Tu nombre completo",
    formEmailLabel: "Email *",
    formEmailPlaceholder: "nombre@empresa.com",
    formBusinessReferenceLabel: "Referencia de negocio *",
    formBusinessReferencePlaceholder: "Google Maps, Instagram o nombre exacto",
    formSubjectLabel: "Asunto",
    formSubjectPlaceholder: "Asunto del proyecto",
    formMessageLabel: "Mensaje *",
    formMessagePlaceholder: "Describe que necesitas y que resultado quieres lograr.",
    formSubmit: "Enviar consulta",
    formSubmitSending: "Enviando...",
    formErrorRequired: "Completa Nombre, Email, Referencia de negocio y Mensaje antes de enviar.",
    formErrorEmail: "Introduce un email valido.",
    formErrorSend: "No se pudo enviar el mensaje. Intentalo de nuevo en un minuto.",
    formSuccess: "Tu solicitud fue enviada a nuestro equipo.",
  },
  cs: {
    ...baseLocaleCopy,
    langLabel: "Jazyk",
    langCode: "CZ",
    langName: "Cestina",
    openDocAria: "Otevrit DOC Studios v novem panelu",
    openGrowthAria: "Otevrit sekci Business Development / Marketing / SEO",
    docCta: "Otevrit DOC Studios",
    docIntroPrefix: "Zrozeno ve stinech starych prazskych ulic, ",
    docIntroSuffix: " vzniklo ze stretu klasicke tradice a moderni rebelie.",
    docNarrativeSecond:
      "Jsme umelci spojeni jedinou vizi: tvorit hudbu, ktera pribehy nejen doprovazi, ale stava se jejich dusi. Nase kompozice nesou emoci, nase aranze vdechuji tichu zivot a nase produkce meni obycne okamziky v neobycejne zazitky.",
    docNarrativeThird:
      "Od tajemnych koridoru filmove hudby po pulsujici energii hernich soundtracku, od sofistikovane elegance reklamni hudby po syrovou silu brand hymen. Tvorime zvukove krajiny, ktere dozvaji dlouho po poslednim tonu.",
    docClosingLine:
      "V chaosu nachazime rad. Ve tme objevujeme svetlo. V tichu tvorime symfonie, ktere zneji vecnosti.",
    docManifestoAuthor: "Drive of Chaos Manifest",
    mobileLandingTitle: "Vyberte sluzbu, se kterou chcete pokracovat",
    mobileLandingText: "Vyberte spravnou linii a pokracujte vhodnym postupem.",
    mobileDocTagline: "Hudba / Video / Produkce",
    mobileGrowthSubtitle: "Viditelnost / Duvera / Konverze",
    mobileGrowthContinue: "Pokracovat",
    growthHeroLine1: "Udelejte svuj byznys",
    growthHeroLine2Prefix: "snadnejsi pro",
    growthHeroFind: "nalezeni",
    growthHeroTrust: "duveru",
    growthHeroAnd: "a",
    growthHeroChoose: "volbu",
    growthCta: "Zobrazit reseni",
    businessSupportText:
      "Budujeme byznysove digitalni struktury, ktere zlepsuji viditelnost, zpresnuji pozicovani a podporuji lepsi konverze napric webem, SEO a komunikaci znacky.",
    businessSupportLine:
      "Marketing a SEO maji delat vic nez jen zvysovat dosah. Maji privadet vhodnejsi poptavku a podporovat udrzitelny rust.",
    tabServices: "Sluzby",
    tabProducts: "Produkty",
    tabContact: "Kontakt",
    servicesEyebrow: "Sluzby",
    servicesTitle: "Sluzby Business Development / Marketing / SEO",
    servicesText:
      "Sluzby orientovane na vysledky pro lepsi viditelnost, duveru, kvalitu konverze, udrzitelnost SEO, efektivitu reklamy a konzistenci znacky s jasnou delivery mapou.",
    servicesCards: [
      {
        title: "Viditelnost",
        points: ["silnejsi pritomnost ve vyhledavani", "lepsi dohledatelnost", "vyssi digitalni dosah"],
      },
      {
        title: "Duvera",
        points: ["profesionalnejsi prezentace", "jasnejsi struktura", "silnejsi prvni dojem"],
      },
      {
        title: "Konverze",
        points: ["jasnejsi sdeleni", "lepsi CTA flow", "vyssi kvalita konverzi"],
      },
      {
        title: "SEO Vykon",
        points: [
          "silnejsi organicka viditelnost",
          "mensi zavislost na placene navstevnosti",
          "udrzitelnejsi vykon ve vyhledavani",
        ],
      },
      {
        title: "Efektivita Reklamy",
        points: ["nizsi zbytecne naklady", "presnejsi cileni publika", "efektivnejsi Instagram reklamy"],
      },
      {
        title: "Konzistence Znacky",
        points: [
          "socialni site sladene s paletou znacky",
          "silnejsi vizualni konzistence",
          "lepe zapamatovatelna digitalni pritomnost",
        ],
      },
    ],
    productsEyebrow: "Produkty",
    productsTitle: "Strukturovane Growth Produkty",
    productsText:
      "Predpripravene produktove balicky pro tymy, ktere potrebuji jasnejsi realizacni bloky, rychlejsi rollout a meritelne digitalni vysledky.",
    productsCards: [
      {
        title: "Sada Viditelnosti",
        points: [
          "SEO zaklad a mapovani obsahoveho zameru",
          "struktura webu sladena s vyhledavacim chovanim",
          "lepsi dohledatelnost na klicovych touchpointech",
        ],
      },
      {
        title: "Konverzni System",
        points: [
          "hierarchie sdeleni pro rychlejsi rozhodovani",
          "CTA architektura s cistsim flow stranky",
          "vyssi kvalita leadu diky jasnejsi kvalifikaci",
        ],
      },
      {
        title: "Sladeni Znacky a Medii",
        points: [
          "social visualy sladene s paletou znacky",
          "konzistentni kampanova prezentace napric kanaly",
          "silnejsi rozpoznatelnost napric digitalnimi touchpointy",
        ],
      },
    ],
    contactEyebrow: "Kontakt",
    contactTitle: "Kontakt a Uvodni Sladeni",
    contactText: "Kontaktni flow zamereny na jasny scope a prakticky start projektu.",
    deliveryTitle: "Mapa Realizace",
    deliveryText: "Jasny proces, ktery meni digitalni zlepseni na praktickou byznys hodnotu.",
    deliverySteps: [
      {
        title: "Revize",
        description:
          "Posuzujeme aktualni digitalni pritomnost v oblasti prehlednosti webu, viditelnosti ve vyhledavani, konzistence socialnich siti a kvality komunikace.",
      },
      {
        title: "Struktura",
        description:
          "Definujeme nejefektivnejsi cestu zlepseni podle byznys cilu, potreb viditelnosti a priorit konverze.",
      },
      {
        title: "Dodani",
        description:
          "Implementujeme a ladime dohodnutou strukturu pro vyssi prehlednost, duveru, konzistenci a celkovy digitalni vykon.",
      },
    ],
    contactConsultTitle: "Rezervujte bezplatnou konzultaci",
    contactPoint1: "uvodni call pro potvrzeni scope",
    contactPoint2: "doporuceny smer sluzby nebo produktu",
    contactPoint3: "jasna startovni sekvence projektu s odpovednostmi",
    contactEmailLabel: "preferovany kontaktni email",
    contactReferenceHelp:
      "Prosim poslete business referenci (Google Maps odkaz, Instagram profil nebo presny nazev firmy), aby bylo mozne udelat pripravu pred meetingem.",
    formNameLabel: "Jmeno *",
    formNamePlaceholder: "Vase cele jmeno",
    formEmailLabel: "Email *",
    formEmailPlaceholder: "jmeno@firma.cz",
    formBusinessReferenceLabel: "Business reference *",
    formBusinessReferencePlaceholder: "Google Maps, Instagram nebo presny nazev firmy",
    formSubjectLabel: "Predmet",
    formSubjectPlaceholder: "Predmet projektu",
    formMessageLabel: "Zprava *",
    formMessagePlaceholder: "Napisete co potrebujete a jakeho vysledku chcete dosahnout.",
    formSubmit: "Poslat poptavku",
    formSubmitSending: "Odesila se...",
    formErrorRequired: "Pred odeslanim doplnte Jmeno, Email, Business reference a Zpravu.",
    formErrorEmail: "Zadejte platnou email adresu.",
    formErrorSend: "Zpravu se nepodarilo odeslat. Zkuste to prosim za minutu znovu.",
    formSuccess: "Vase poptavka byla odeslana nasemu tymu.",
  },
};

function GrowthStructureCard({ title, points }) {
  return (
    <Card className="h-full rounded-[1.6rem] border-teal-900/15 bg-[#fff8ee]">
      <CardContent className="p-6 md:p-7">
        <h3 className="text-xl font-semibold tracking-tight text-teal-950">{title}</h3>
        <ul className="mt-5 space-y-3">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-3 text-sm leading-7 text-teal-900/85 md:text-base">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#b87333]" />
              {point}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default function App() {
  const [lang, setLang] = useState("en");
  const [view, setView] = useState("home");
  const [growthPage, setGrowthPage] = useState("services");
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    businessReference: "",
    subject: "",
    message: "",
  });
  const [contactFeedback, setContactFeedback] = useState({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const languageMenuRef = useRef(null);
  const t = useMemo(() => localeCopy[lang], [lang]);
  const apiBase = import.meta.env.VITE_API_BASE_URL?.trim();
  const contactEndpoint = apiBase ? `${apiBase.replace(/\/$/, "")}/api/contact` : "/api/contact";
  const languageOptions = useMemo(
    () =>
      Object.entries(localeCopy).map(([code, copy]) => ({
        code,
        codeLabel: copy.langCode || code.toUpperCase(),
        name: copy.langName || code.toUpperCase(),
      })),
    []
  );
  const growthSubPages = useMemo(
    () => [
      { id: "services", label: t.tabServices },
      { id: "products", label: t.tabProducts },
      { id: "contact", label: t.tabContact },
    ],
    [t]
  );
  const growthPageContent = useMemo(
    () => ({
      services: {
        eyebrow: t.servicesEyebrow,
        title: t.servicesTitle,
        text: t.servicesText,
        cards: t.servicesCards,
      },
      products: {
        eyebrow: t.productsEyebrow,
        title: t.productsTitle,
        text: t.productsText,
        cards: t.productsCards,
      },
      contact: {
        eyebrow: t.contactEyebrow,
        title: t.contactTitle,
        text: t.contactText,
        cards: [],
      },
    }),
    [t]
  );
  const activeGrowthContent = growthPageContent[growthPage];
  const contactEmail = "info@docstudios.eu";

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!languageMenuRef.current) return;
      if (!languageMenuRef.current.contains(event.target)) {
        setIsLanguageOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleContactInputChange = (event) => {
    const { name, value } = event.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (contactFeedback.message) {
      setContactFeedback({ type: "idle", message: "" });
    }
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();

    const name = contactForm.name.trim();
    const email = contactForm.email.trim();
    const businessReference = contactForm.businessReference.trim();
    const message = contactForm.message.trim();
    const subject = contactForm.subject.trim();

    if (!name || !email || !businessReference || !message) {
      setContactFeedback({
        type: "error",
        message: t.formErrorRequired,
      });
      return;
    }

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isEmailValid) {
      setContactFeedback({
        type: "error",
        message: t.formErrorEmail,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          businessReference,
          subject,
          message,
          language: lang,
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload?.ok) {
        setContactFeedback({
          type: "error",
          message: t.formErrorSend,
        });
        return;
      }

      setContactFeedback({
        type: "success",
        message: t.formSuccess,
      });
      setContactForm({
        name: "",
        email: "",
        businessReference: "",
        subject: "",
        message: "",
      });
    } catch {
      setContactFeedback({
        type: "error",
        message: t.formErrorSend,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-teal-950">
      <div className="fixed right-4 top-4 z-50 md:right-8 md:top-6">
        <div ref={languageMenuRef} className="relative">
          <button
            type="button"
            onClick={() => setIsLanguageOpen((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-full border border-teal-900/15 bg-[#f8ecdb]/95 px-3 py-2 text-sm text-teal-900/80 shadow-sm backdrop-blur transition hover:border-teal-900/30"
            aria-expanded={isLanguageOpen}
            aria-haspopup="listbox"
            aria-label={`${t.langLabel}: ${t.langName}`}
          >
            <Globe2 className="h-4 w-4" />
            <span className="hidden sm:inline">{t.langLabel}</span>
            <span className="rounded-full bg-teal-900 px-2 py-0.5 text-xs font-semibold text-teal-50">
              {t.langCode}
            </span>
            <ChevronDown className={`h-4 w-4 transition ${isLanguageOpen ? "rotate-180" : ""}`} />
          </button>

          {isLanguageOpen && (
            <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-teal-900/15 bg-[#fff8ee] p-1.5 shadow-lg">
              <ul role="listbox" aria-label={t.langLabel} className="space-y-1">
                {languageOptions.map((option) => (
                  <li key={option.code}>
                    <button
                      type="button"
                      onClick={() => {
                        setLang(option.code);
                        setIsLanguageOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition ${
                        lang === option.code ? "bg-teal-900 text-teal-50" : "text-teal-900/80 hover:bg-[#f1e2ce]"
                      }`}
                    >
                      <span className="inline-flex items-center gap-2">
                        <span>{option.name}</span>
                        <span className="rounded-full border border-current/25 px-1.5 py-0.5 text-[11px] leading-none">
                          {option.codeLabel}
                        </span>
                      </span>
                      {lang === option.code && <Check className="h-4 w-4" />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === "home" ? (
          <motion.main
            key="home"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            <section className="min-h-screen bg-[linear-gradient(165deg,#fdf7ec_0%,#f4e7d2_65%,#ecdbc0_100%)] px-5 pb-10 pt-24 md:hidden">
              <div className="mx-auto flex max-w-md flex-col">
                <h1 className="mt-5 text-3xl font-semibold leading-tight text-teal-950">{t.mobileLandingTitle}</h1>
                <p className="mt-3 text-sm leading-7 text-teal-900/80">
                  {t.mobileLandingText}
                </p>

                <div className="mt-7 grid gap-4">
                  <a
                    href="https://docstudios.eu"
                    target="_blank"
                    rel="noreferrer"
                    className="group relative overflow-hidden rounded-[1.4rem] border border-[#7a1d1d]/45 p-5"
                    aria-label={t.openDocAria}
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(165deg,#050505_0%,#0d0d0d_55%,#1c0808_100%)]" />
                    <div className="relative z-10">
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#fda4af]">{t.docBadge}</p>
                      <h2 className="mt-2 text-2xl font-semibold text-[#f5f5f5]">{t.docTitle}</h2>
                      <p className="mt-2 text-sm text-[#f3d6d6]">{t.mobileDocTagline}</p>
                      <span className="mt-4 inline-flex items-center text-sm font-medium text-[#fff7f7]">
                        {t.docCta}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </span>
                    </div>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setGrowthPage("services");
                      setView("growth");
                    }}
                    className="group relative overflow-hidden rounded-[1.4rem] border border-teal-900/15 p-5 text-left"
                    aria-label={t.openGrowthAria}
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(170deg,#fff9ef_0%,#f4e7d2_56%,#ebd7ba_100%)]" />
                    <div className="relative z-10">
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-teal-900/75">{t.growthBadge}</p>
                      <h2 className="mt-2 text-2xl font-semibold leading-tight text-teal-950">{t.mobileGrowthTitle}</h2>
                      <p className="mt-2 text-sm text-teal-900/80">{t.mobileGrowthSubtitle}</p>
                      <span className="mt-4 inline-flex items-center text-sm font-medium text-teal-900">
                        {t.mobileGrowthContinue}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </section>

            <section className="hidden min-h-screen md:grid md:h-[100dvh] md:grid-cols-2 md:overflow-hidden">
              <a
                href="https://docstudios.eu"
                target="_blank"
                rel="noreferrer"
                className="group relative flex border-b border-[#7a1d1d]/45 p-6 transition md:min-h-0 md:overflow-y-auto md:border-b-0 md:border-r md:p-8 lg:p-10"
                aria-label={t.openDocAria}
              >
                <div className="absolute inset-0 bg-[linear-gradient(165deg,#050505_0%,#0d0d0d_55%,#1c0808_100%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_16%_12%,rgba(239,68,68,0.18),transparent_72%)] opacity-80" />
                <div className="relative z-10 flex h-full w-full max-w-xl flex-col">
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#ef4444]/35 bg-[#3a0d0d] px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-[#fda4af]">
                    {t.docBadge}
                  </div>
                  <h1 className="mt-6 text-[clamp(2rem,3.3vw,3.8rem)] font-semibold tracking-tight text-[#f5f5f5]">
                    {t.docTitle}
                  </h1>
                  <div className="mt-5 max-w-2xl space-y-4">
                    <p className="text-sm leading-6 text-[#f1f1f1] md:text-[0.97rem] md:leading-7">
                      {t.docIntroPrefix}
                      <span className="text-[#ef4444]">{t.docIntroHighlight}</span>
                      {t.docIntroSuffix}
                    </p>
                    <p className="text-sm leading-6 text-[#ececec] md:text-[0.97rem] md:leading-7">{t.docNarrativeSecond}</p>
                    <p className="text-sm leading-6 text-[#ececec] md:text-[0.97rem] md:leading-7">{t.docNarrativeThird}</p>
                  </div>
                  <div className="mt-6 max-w-2xl">
                    <p className="text-lg italic leading-7 text-[#f3b09d] md:text-xl md:leading-8">"{t.docClosingLine}"</p>
                    <p className="mt-2 text-base text-[#ef4444] md:text-lg">- {t.docManifestoAuthor}</p>
                  </div>
                  <div className="mt-auto pt-6">
                    <span className="inline-flex items-center rounded-2xl bg-[#b91c1c] px-5 py-3 text-sm font-medium text-[#fff7f7] transition group-hover:bg-[#991b1b]">
                      {t.docCta}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </span>
                  </div>
                </div>
              </a>

              <button
                type="button"
                onClick={() => {
                  setGrowthPage("services");
                  setView("growth");
                }}
                className="group relative flex p-6 text-left transition md:min-h-0 md:overflow-y-auto md:p-8 lg:p-10"
                aria-label={t.openGrowthAria}
              >
                <div className="absolute inset-0 bg-[linear-gradient(170deg,#fff9ef_0%,#f4e7d2_56%,#ebd7ba_100%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(65%_65%_at_88%_14%,rgba(27,58,42,0.18),transparent_70%)]" />
                <div className="relative z-10 flex h-full w-full max-w-xl flex-col">
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-teal-900/20 bg-[#fff5e6] px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-teal-900/80">
                    {t.growthBadge}
                  </div>
                  <h1 className="mt-6 max-w-2xl text-[clamp(1.9rem,3.5vw,4.1rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-teal-950">
                    <span className="block">{t.growthHeroLine1}</span>
                    <span className="mt-1 block">
                      {t.growthHeroLine2Prefix} <span className="text-[#b87333]">{t.growthHeroFind}</span>,
                    </span>
                    <span className="block">
                      <span className="text-[#b87333]">{t.growthHeroTrust}</span>, {t.growthHeroAnd}{" "}
                      <span className="text-[#b87333]">{t.growthHeroChoose}</span>.
                    </span>
                  </h1>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-teal-900/85 md:text-base">
                    {t.businessSupportText}
                  </p>
                  <p className="mt-4 max-w-lg text-sm leading-7 text-teal-900/80 md:text-base">{t.businessSupportLine}</p>
                  <div className="mt-auto pt-6">
                    <span className="inline-flex items-center rounded-2xl bg-teal-900 px-5 py-3 text-sm font-medium text-teal-50 transition group-hover:bg-teal-800">
                      {t.growthCta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </div>
                </div>
              </button>
            </section>
          </motion.main>
        ) : (
          <motion.main
            key="growth"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            <section className="border-b border-teal-900/15 bg-[#f5ebdc]">
              <div className="mx-auto flex max-w-7xl flex-col gap-3 pb-6 pl-5 pr-24 pt-24 sm:px-6 md:flex-row md:items-center md:justify-between md:px-10 md:py-8">
                <nav className="flex flex-wrap items-center gap-2">
                  {growthSubPages.map((page) => (
                    <button
                      key={page.id}
                      type="button"
                      onClick={() => setGrowthPage(page.id)}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                        growthPage === page.id
                          ? "border-teal-900 bg-teal-900 text-teal-50"
                          : "border-teal-900/20 bg-[#fff8ee] text-teal-900/80 hover:border-teal-900/35"
                      }`}
                    >
                      {page.label}
                    </button>
                  ))}
                </nav>

                <button
                  type="button"
                  onClick={() => setView("home")}
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-[#b91c1c] px-5 py-3 text-sm font-medium text-[#fff7f7] transition hover:bg-[#991b1b] md:w-fit"
                >
                  {t.docBrandButton}
                </button>
              </div>
            </section>

            {growthPage !== "contact" && (
              <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-14">
                <div className="max-w-4xl">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-teal-900/70">{activeGrowthContent.eyebrow}</p>
                  <h2 className="mt-4 text-3xl font-semibold tracking-tight text-teal-950 md:text-4xl">{activeGrowthContent.title}</h2>
                  <p className="mt-5 text-base leading-8 text-teal-900/80 md:text-lg">{activeGrowthContent.text}</p>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {activeGrowthContent.cards.map((area) => (
                    <GrowthStructureCard key={`${growthPage}-${area.title}`} title={area.title} points={area.points} />
                  ))}
                </div>
              </section>
            )}

            {growthPage === "contact" && (
              <section className="border-t border-teal-900/15 bg-[#f2e7d6]">
                <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-2 md:px-10 md:py-14">
                  <div className="max-w-xl">
                    <h3 className="text-3xl font-semibold tracking-tight text-teal-950 md:text-4xl">{t.contactConsultTitle}</h3>
                    <ul className="mt-5 space-y-3 text-base leading-8 text-teal-900/80 md:text-lg">
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#b87333]" />
                        {t.contactPoint1}
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#b87333]" />
                        {t.contactPoint2}
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#b87333]" />
                        {t.contactPoint3}
                      </li>
                    </ul>
                    <p className="mt-6 text-sm text-teal-900/75">
                      {t.contactEmailLabel}{" "}
                      <a href={`mailto:${contactEmail}`} className="font-medium text-teal-950 underline decoration-teal-900/40 underline-offset-4">
                        {contactEmail}
                      </a>
                    </p>
                    <p className="mt-3 text-sm text-teal-900/75">
                      {t.contactReferenceHelp}
                    </p>
                  </div>

                  <Card className="rounded-[1.6rem] border-teal-900/15 bg-[#fff8ee]">
                    <CardContent className="p-6 md:p-7">
                      <form className="space-y-4" onSubmit={handleContactSubmit} noValidate>
                        <div className="grid gap-4 md:grid-cols-2">
                          <label className="flex flex-col gap-2 text-sm font-medium text-teal-950">
                            {t.formNameLabel}
                            <input
                              name="name"
                              value={contactForm.name}
                              onChange={handleContactInputChange}
                              className="rounded-xl border border-teal-900/20 bg-[#fffcf6] px-3 py-2.5 text-sm text-teal-950 outline-none transition focus:border-teal-900/45"
                              placeholder={t.formNamePlaceholder}
                              autoComplete="name"
                              required
                            />
                          </label>
                          <label className="flex flex-col gap-2 text-sm font-medium text-teal-950">
                            {t.formEmailLabel}
                            <input
                              type="email"
                              name="email"
                              value={contactForm.email}
                              onChange={handleContactInputChange}
                              className="rounded-xl border border-teal-900/20 bg-[#fffcf6] px-3 py-2.5 text-sm text-teal-950 outline-none transition focus:border-teal-900/45"
                              placeholder={t.formEmailPlaceholder}
                              autoComplete="email"
                              required
                            />
                          </label>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <label className="flex flex-col gap-2 text-sm font-medium text-teal-950">
                            {t.formBusinessReferenceLabel}
                            <input
                              name="businessReference"
                              value={contactForm.businessReference}
                              onChange={handleContactInputChange}
                              className="rounded-xl border border-teal-900/20 bg-[#fffcf6] px-3 py-2.5 text-sm text-teal-950 outline-none transition focus:border-teal-900/45"
                              placeholder={t.formBusinessReferencePlaceholder}
                              required
                            />
                          </label>
                          <label className="flex flex-col gap-2 text-sm font-medium text-teal-950">
                            {t.formSubjectLabel}
                            <input
                              name="subject"
                              value={contactForm.subject}
                              onChange={handleContactInputChange}
                              className="rounded-xl border border-teal-900/20 bg-[#fffcf6] px-3 py-2.5 text-sm text-teal-950 outline-none transition focus:border-teal-900/45"
                              placeholder={t.formSubjectPlaceholder}
                            />
                          </label>
                        </div>

                        <label className="flex flex-col gap-2 text-sm font-medium text-teal-950">
                          {t.formMessageLabel}
                          <textarea
                            name="message"
                            value={contactForm.message}
                            onChange={handleContactInputChange}
                            className="min-h-36 rounded-xl border border-teal-900/20 bg-[#fffcf6] px-3 py-2.5 text-sm text-teal-950 outline-none transition focus:border-teal-900/45"
                            placeholder={t.formMessagePlaceholder}
                            required
                          />
                        </label>

                        {contactFeedback.message && (
                          <p
                            className={`text-sm ${
                              contactFeedback.type === "error" ? "text-[#b91c1c]" : "text-teal-900"
                            }`}
                          >
                            {contactFeedback.message}
                          </p>
                        )}

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="inline-flex items-center rounded-2xl bg-teal-900 px-5 py-3 text-sm font-medium text-teal-50 transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          {isSubmitting ? t.formSubmitSending : t.formSubmit}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </section>
            )}

            {growthPage === "services" && (
              <section className="border-t border-teal-900/15 bg-[#f2e7d6]">
                <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-14">
                  <div className="max-w-4xl">
                    <h3 className="text-3xl font-semibold tracking-tight text-teal-950 md:text-4xl">{t.deliveryTitle}</h3>
                    <p className="mt-5 text-base leading-8 text-teal-900/80 md:text-lg">{t.deliveryText}</p>
                  </div>

                  <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {t.deliverySteps.map((step, index) => (
                      <Card key={step.title} className="h-full rounded-[1.4rem] border-teal-900/15 bg-[#fbf3e7]">
                        <CardContent className="p-6">
                          <div className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-teal-900 text-sm font-semibold text-teal-50">
                            {index + 1}
                          </div>
                          <h4 className="text-lg font-semibold text-teal-950">{step.title}</h4>
                          <p className="mt-3 text-sm leading-7 text-teal-900/80">{step.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
