import React, { useEffect, useMemo, useRef, useState } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ExternalLink,
  Globe2,
  Menu,
  Music,
  Search,
  BarChart3,
  Layout,
  Palette,
  Target,
  TrendingUp,
  Users,
  Mail,
  MapPin,
  Linkedin,
  Calendar,
  Shield,
  MessageSquare,
  Smartphone,
  X,
} from "lucide-react";
import { Card, CardContent } from "./components/ui/card";

/* ──────────────────────────────────────────────
   LOCALE COPY
   ────────────────────────────────────────────── */

const baseLocaleCopy = {
  langLabel: "Language",
  langCode: "EN",
  langName: "English",
  openDocAria: "Open DOC Studios in a new tab",
  docBadge: "DOC Studios",
  docTitle: "DOC Studios s.r.o.",
  docBrandButton: "DOC Studios s.r.o.",
  docCta: "Open DOC Studios",
  growthBadge: "Business Development / Marketing / Digital Appearance",
  growthHeroLine1: "Make your business",
  growthHeroLine2Prefix: "easier to",
  growthHeroFind: "find",
  growthHeroTrust: "trust",
  growthHeroAnd: "and",
  growthHeroChoose: "choose",
  growthCta: "View Solutions",
  businessSupportText:
    "We build business-facing digital structures that shape how your brand appears, communicates, and converts — across website, social media, search, and brand presentation.",
  businessSupportLine:
    "Digital appearance drives the first impression. How you look, sound, and position online determines whether people trust you enough to reach out.",
  tabServices: "Services",
  tabProducts: "Products",
  tabContact: "Contact",
  tabAbout: "About",
  tabBlog: "Blog",
  servicesEyebrow: "Services",
  servicesTitle: "Business Development / Marketing / Digital Appearance Services",
  servicesText:
    "Outcome-focused services designed to improve how your business looks, communicates, and gets found — covering digital appearance, brand consistency, conversion quality, and search presence.",
  servicesCards: [
    { title: "Digital Appearance", points: ["cohesive visual identity across web and social", "professional first impression at every touchpoint", "consistent brand presentation that builds recognition"] },
    { title: "Visibility", points: ["stronger search presence", "better discoverability", "improved digital reach"] },
    { title: "Trust", points: ["more professional presentation", "clearer structure", "stronger first impression"] },
    { title: "Conversion", points: ["clearer messaging", "better CTA flow", "improved conversion quality"] },
    { title: "Advertising Efficiency", points: ["lower wasted spend", "better audience targeting", "more efficient Instagram ad performance"] },
    { title: "SEO", points: ["stronger organic visibility", "reduced reliance on paid traffic", "more sustainable search performance"] },
  ],
  servicePackages: [
    { title: "Digital Appearance Audit", description: "Full review of website, social profiles, and brand visuals — with a clear improvement plan and priority action list.", icon: "Search", tier: "One-off project", delivery: "3–7 days" },
    { title: "Website Redesign / Landing Page", description: "Conversion-focused pages with strong visual identity, responsive design, search-ready structure, and analytics integration.", icon: "Layout", tier: "One-off project", delivery: "5–21 days" },
    { title: "Google Business Profile Setup", description: "Create or claim your GBP, optimize with photos, reviews strategy, and local search presence.", icon: "MapPin", tier: "One-off project", delivery: "2–5 days" },
    { title: "Digital Appearance Management", description: "Ongoing social media visuals, brand consistency, content calendar, GBP management, and monthly performance review.", icon: "Target", tier: "Monthly retainer", delivery: "Ongoing" },
    { title: "Business Development Consulting", description: "Sales process review, lead research, outreach drafts, CRM management, and pipeline setup.", icon: "BarChart3", tier: "Monthly retainer", delivery: "Ongoing" },
    { title: "SEO & Search Presence", description: "Keyword tracking, on-page optimization, technical fixes, backlink building, and monthly reporting.", icon: "TrendingUp", tier: "Monthly retainer", delivery: "Ongoing" },
  ],
  productsEyebrow: "Products",
  studioosName: "StudioOS",
  studioosHeroBadge: "New Product · Studio Management Platform",
  studioosHeroTitle: "One platform for every studio.",
  studioosHeroSubtitle: "Bookings, clients, payments, and your full team — managed from one dashboard. Each studio gets their own branded app at their own URL.",
  studioosSubdomainNote: "app.your-studio.com",
  studioosHeroCta: "Request Early Access",
  studioosHeroSeeFeatures: "See Features",
  studioosForLabel: "Built for hair salons · tattoo studios · beauty clinics · photography studios · music studios · and more",
  studioosFeaturesTitle: "Everything your studio needs.",
  studioosFeaturesText: "From the first booking to loyal repeat clients — one platform handles it all, on any device.",
  studioosFeatures: [
    { title: "Smart Scheduling", description: "Visual booking calendar with real-time availability. Your team sees exactly what they need — nothing more.", icon: "Calendar" },
    { title: "Client Management", description: "Full client profiles with appointment history, notes, and preferences. Build lasting relationships.", icon: "Users" },
    { title: "Reminders & Notifications", description: "Automated appointment confirmations and reminders via email or SMS. Reduce no-shows without lifting a finger.", icon: "Mail" },
    { title: "Team & Roles", description: "Owner, Manager, Staff, and Front Desk roles. Everyone accesses what they should, nothing they shouldn't.", icon: "Shield" },
    { title: "Inbox & Leads", description: "Instagram DMs, contact forms, and walk-in leads unified in one inbox. No booking request gets missed.", icon: "MessageSquare" },
    { title: "Analytics & Insights", description: "Revenue dashboards, staff performance, ad insights, and SEO health — updated automatically.", icon: "BarChart3" },
  ],
  studioosHowTitle: "Up and running in minutes.",
  studioosHowText: "No complex setup. No technical knowledge required.",
  studioosHowSteps: [
    { step: "1", title: "Pick your plan", description: "Choose a monthly subscription that fits your studio size. No long-term contracts." },
    { step: "2", title: "Get your URL", description: "Your studio goes live at app.your-studio.com — branded, fast, and mobile-ready from day one." },
    { step: "3", title: "Manage everything", description: "Bookings, clients, payments, and team from one dashboard — on any device, anywhere." },
  ],
  studioosMobileTitle: "Built for mobile.",
  studioosMobileText: "Your team manages bookings from their phone. Your clients book from theirs. Fully responsive with PWA support — install on iOS and Android home screens, no app store needed.",
  studioosEarlyBadge: "Early Access · 25% off",
  studioosEarlyTitle: "Be among the first studios on the platform.",
  studioosEarlyText: "Leave your email to get early access. We'll reach out with onboarding details and lock in your 25% discount for the first year.",
  studioosEmailPlaceholder: "Enter your email address (e.g. name@company.com)",
  studioosEmailCta: "Get Early Access",
  studioosEmailSending: "Sending...",
  studioosEmailSuccess: "You're on the list — we'll be in touch soon.",
  studioosEmailErrorInvalid: "Please enter a valid email address.",
  studioosEmailErrorSend: "Something went wrong. Please try again.",
  studioosPricingNote: "Monthly subscription · Cancel anytime · All features included",
  studioosMockupTitle: "A glimpse of the interface.",
  studioosMockupText: "Designed to feel fast and familiar — whether you're on a desktop or a phone.",
  studioosMockupDisclaimer: "These are placeholder mockups representing the intended UI direction. Final design is subject to change.",
  studioosMockupScreens: [
    { id: "calendar", label: "Booking Calendar" },
    { id: "clients", label: "Client List" },
    { id: "inbox", label: "Unified Inbox" },
    { id: "analytics", label: "Analytics Dashboard" },
  ],
  deliveryTitle: "How It Works",
  deliveryText: "A structured four-step process — from first look to measurable results. No guesswork, no open-ended retainers without direction.",
  deliverySteps: [
    { title: "Discovery Call", description: "A focused 30-minute conversation to understand your business, current digital presence, goals, and the biggest gaps holding you back." },
    { title: "Appearance Audit", description: "We map how your business currently looks across website, search, social, and Google — and identify what's creating friction or weak impressions." },
    { title: "Structured Plan", description: "You receive a prioritized action plan with clear scope, timeline, and expected outcomes. No vague recommendations — just a concrete execution sequence." },
    { title: "Execution & Review", description: "We implement the agreed improvements, then review results against the original goals. Adjustments are made based on data, not assumptions." },
  ],
  contactConsultTitle: "Book Free Consultation",
  contactPoint1: "initial alignment call to confirm scope",
  contactPoint2: "recommended service or product direction",
  contactPoint3: "clear project start sequence with responsibilities",
  contactEmailLabel: "preferred contact email",
  contactReferenceHelp: "Please provide a business reference (Google Maps link, Instagram profile, or exact business name) so pre-meeting research can be completed.",
  formNameLabel: "Name *", formNamePlaceholder: "Your full name",
  formEmailLabel: "Email *", formEmailPlaceholder: "name@company.com",
  formBusinessReferenceLabel: "Business Reference *", formBusinessReferencePlaceholder: "Google Maps, Instagram, or exact business name",
  formSubjectLabel: "Subject", formSubjectPlaceholder: "Project subject",
  formMessageLabel: "Message *", formMessagePlaceholder: "Tell us what you need and what outcome you want to achieve.",
  formSubmit: "Send Inquiry", formSubmitSending: "Sending...",
  formErrorRequired: "Please complete Name, Email, Business Reference, and Message before sending.",
  formErrorEmail: "Please enter a valid email address.",
  formErrorSend: "Message delivery failed. Please try again in a minute.",
  formSuccess: "Your request has been sent to our team.",
  aboutTitle: "About Cihad Kucuk",
  aboutIntro: "Business development consultant and digital appearance strategist based in Prague, Czech Republic.",
  aboutBio: "I help businesses become easier to find, trust, and choose. Through structured digital appearance, brand positioning, and business development consulting, I build systems that create better first impressions and bring better-fit demand. SEO is one part of that — the foundation that makes everything else more effective.",
  aboutExpertise: "Areas of expertise",
  aboutExpertiseList: ["Business Development", "Digital Appearance & Brand Presence", "Website Optimization & Conversion", "Digital Marketing Strategy", "SEO & Search Visibility", "Sales Pipeline Development"],
  aboutDocStudiosBridge: "I also founded DOC Studios s.r.o., a boutique music production studio in Prague delivering premium audio for film, advertising, and gaming. This dual background gives me a unique perspective on both creative and commercial sides of business.",
  aboutLocation: "Prague, Czech Republic",
  aboutCta: "Let\u2019s talk about your business",
  blogTitle: "Insights & Resources",
  blogSubtitle: "Practical articles on digital appearance, business development, and growth strategy.",
  blogComingSoon: "New articles are being prepared. Check back soon for insights on digital appearance, brand presence, and business growth strategies.",
  blogNotify: "Get notified when new content drops",
  footerTagline: "Business development, marketing, and digital appearance consulting based in Prague.",
  footerRights: "All rights reserved.",
  servicesPackagesTitle: "What You Can Start With",
  servicesPackagesText: "Concrete packages with clear scope, timeline, and deliverables — whether you need a stronger digital appearance, better search presence, or a more structured business development process. Every engagement starts with a free consultation.",
  servicesPackagesCta: "Book a Free Consultation",
  aboutVisitDoc: "Visit DOC Studios",
};

const localeCopy = {
  en: baseLocaleCopy,

  de: {
    ...baseLocaleCopy,
    langLabel: "Sprache", langCode: "DE", langName: "Deutsch",
    growthBadge: "Business Development / Marketing / Digitaler Auftritt",
    growthHeroLine1: "Machen Sie Ihr Unternehmen",
    growthHeroLine2Prefix: "einfacher zu",
    growthHeroFind: "finden",
    growthHeroTrust: "vertrauen",
    growthHeroAnd: "und",
    growthHeroChoose: "wählen",
    growthCta: "Lösungen ansehen",
    businessSupportText: "Wir entwickeln digitale Strukturen für Ihr Unternehmen, die Ihren Auftritt stärken, Ihre Positionierung klären und Conversions über Website, Social Media und Markenkommunikation verbessern.",
    businessSupportLine: "Der digitale Auftritt bestimmt den ersten Eindruck. Wie Sie online aussehen, kommunizieren und positioniert sind, entscheidet darüber, ob Menschen Ihnen genug vertrauen, um Sie zu kontaktieren.",
    tabServices: "Leistungen", tabProducts: "Produkte", tabContact: "Kontakt", tabAbout: "Über mich", tabBlog: "Blog",
    servicesEyebrow: "Leistungen",
    servicesTitle: "Business Development / Marketing / Digitaler Auftritt Leistungen",
    servicesText: "Ergebnisorientierte Leistungen zur Verbesserung Ihres digitalen Auftritts, Ihrer Sichtbarkeit, Ihrer Markenkonsistenz und der Qualität Ihrer Conversions.",
    servicesCards: [
      { title: "Digitaler Auftritt", points: ["einheitliche visuelle Identität im Web und Social", "professioneller erster Eindruck an jedem Touchpoint", "konsistente Markenpräsentation, die Wiedererkennung schafft"] },
      { title: "Sichtbarkeit", points: ["stärkere Suchpräsenz", "bessere Auffindbarkeit", "verbesserte digitale Reichweite"] },
      { title: "Vertrauen", points: ["professionellere Präsentation", "klarere Struktur", "stärkerer erster Eindruck"] },
      { title: "Conversion", points: ["klarere Botschaften", "besserer CTA-Flow", "verbesserte Conversion-Qualität"] },
      { title: "Werbeeffizienz", points: ["weniger Streuverlust", "besseres Audience-Targeting", "effizientere Instagram-Anzeigenperformance"] },
      { title: "SEO", points: ["stärkere organische Sichtbarkeit", "geringere Abhängigkeit von bezahltem Traffic", "nachhaltigere Suchperformance"] },
    ],
    servicePackages: [
      { title: "Digitaler Auftritt Audit", description: "Vollständige Prüfung von Website, Social-Profilen und Markenvisuellen — mit klarem Verbesserungsplan und priorisierter Aktionsliste.", icon: "Search", tier: "Einzelprojekt", delivery: "3–7 Tage" },
      { title: "Website-Redesign / Landing Page", description: "Conversion-orientierte Seiten mit starker visueller Identität, responsivem Design, suchmaschinengerechter Struktur und Analytics-Integration.", icon: "Layout", tier: "Einzelprojekt", delivery: "5–21 Tage" },
      { title: "Google Business Profil Setup", description: "GBP erstellen oder beanspruchen, mit Fotos optimieren, Bewertungsstrategie und lokale Suchpräsenz.", icon: "MapPin", tier: "Einzelprojekt", delivery: "2–5 Tage" },
      { title: "Digitales Erscheinungsbild Management", description: "Laufende Social-Media-Visuals, Markenkonsistenz, Content-Kalender, GBP-Management und monatliche Performance-Review.", icon: "Target", tier: "Monatliches Retainer", delivery: "Laufend" },
      { title: "Business Development Beratung", description: "Vertriebsprozess-Review, Lead-Recherche, Outreach-Entwürfe, CRM-Management und Pipeline-Aufbau.", icon: "BarChart3", tier: "Monatliches Retainer", delivery: "Laufend" },
      { title: "SEO & Suchpräsenz", description: "Keyword-Tracking, On-Page-Optimierung, technische Fixes, Linkaufbau und monatliches Reporting.", icon: "TrendingUp", tier: "Monatliches Retainer", delivery: "Laufend" },
    ],
    productsEyebrow: "Produkte",
    studioosHeroBadge: "Neues Produkt · Studio-Management-Plattform",
    studioosHeroTitle: "Eine Plattform für jedes Studio.",
    studioosHeroSubtitle: "Buchungen, Kunden, Zahlungen und Ihr gesamtes Team — verwaltet über ein einziges Dashboard. Jedes Studio erhält seine eigene App unter seiner eigenen URL.",
    studioosSubdomainNote: "app.ihr-studio.com",
    studioosHeroCta: "Frühzugang anfordern",
    studioosHeroSeeFeatures: "Funktionen ansehen",
    studioosForLabel: "Für Friseursalons · Tattoo-Studios · Beauty-Kliniken · Fotostudios · Musikstudios · und mehr",
    studioosFeaturesTitle: "Alles, was Ihr Studio braucht.",
    studioosFeaturesText: "Von der ersten Buchung bis zum treuen Stammkunden — eine Plattform für alles, auf jedem Gerät.",
    studioosFeatures: [
      { title: "Smarte Terminplanung", description: "Visueller Buchungskalender mit Echtzeit-Verfügbarkeit. Ihr Team sieht genau das, was es braucht.", icon: "Calendar" },
      { title: "Kundenverwaltung", description: "Vollständige Kundenprofile mit Terminhistorie, Notizen und Präferenzen. Langfristige Beziehungen aufbauen.", icon: "Users" },
      { title: "Erinnerungen & Benachrichtigungen", description: "Automatische Terminbestätigungen und Erinnerungen per E-Mail oder SMS. Reduzieren Sie No-Shows ohne eigenen Aufwand.", icon: "Mail" },
      { title: "Team & Rollen", description: "Inhaber-, Manager-, Mitarbeiter- und Empfangsrollen. Jeder sieht, was er soll.", icon: "Shield" },
      { title: "Posteingang & Leads", description: "Instagram-DMs, Kontaktformulare und Walk-in-Leads in einem einheitlichen Posteingang.", icon: "MessageSquare" },
      { title: "Analysen & Einblicke", description: "Umsatz-Dashboards, Mitarbeiterleistung, Anzeigen-Insights und SEO-Gesundheit — automatisch aktualisiert.", icon: "BarChart3" },
    ],
    studioosHowTitle: "In wenigen Minuten einsatzbereit.",
    studioosHowText: "Kein komplexes Setup. Keine technischen Kenntnisse erforderlich.",
    studioosHowSteps: [
      { step: "1", title: "Tarif wählen", description: "Wählen Sie ein monatliches Abonnement, das zu Ihrer Studiogröße passt. Keine Langzeitverträge." },
      { step: "2", title: "Ihre URL erhalten", description: "Ihr Studio geht unter app.ihr-studio.com live — gebrandmarkt, schnell und mobilbereit." },
      { step: "3", title: "Alles verwalten", description: "Buchungen, Kunden, Zahlungen und Team über ein Dashboard — auf jedem Gerät, überall." },
    ],
    studioosMobileTitle: "Für Mobilgeräte entwickelt.",
    studioosMobileText: "Ihr Team verwaltet Buchungen vom Smartphone. Ihre Kunden buchen von ihrem. Vollständig responsiv mit PWA-Unterstützung — auf iOS und Android installierbar, kein App-Store nötig.",
    studioosEarlyBadge: "Frühzugang · 25% Rabatt",
    studioosEarlyTitle: "Gehören Sie zu den ersten Studios auf der Plattform.",
    studioosEarlyText: "Hinterlassen Sie Ihre E-Mail für frühzeitigen Zugang. Wir melden uns mit Onboarding-Details und sichern Ihnen 25% Rabatt für das erste Jahr.",
    studioosEmailPlaceholder: "Geben Sie Ihre E-Mail-Adresse ein (z. B. name@firma.de)",
    studioosEmailCta: "Frühzugang sichern",
    studioosEmailSending: "Wird gesendet...",
    studioosEmailSuccess: "Sie sind auf der Liste — wir melden uns bald.",
    studioosEmailErrorInvalid: "Bitte gültige E-Mail-Adresse eingeben.",
    studioosEmailErrorSend: "Etwas ist schief gelaufen. Bitte versuchen Sie es erneut.",
    studioosPricingNote: "Monatliches Abonnement · Jederzeit kündbar · Alle Funktionen inklusive",
    studioosMockupTitle: "Ein Blick auf die Oberfläche.",
    studioosMockupText: "Gestaltet für Geschwindigkeit und Vertrautheit — am Desktop wie am Smartphone.",
    studioosMockupDisclaimer: "Dies sind Platzhalter-Mockups, die die beabsichtigte UI-Richtung darstellen. Das endgültige Design kann sich ändern.",
    studioosMockupScreens: [
      { id: "calendar", label: "Buchungskalender" },
      { id: "clients", label: "Kundenliste" },
      { id: "inbox", label: "Einheitlicher Posteingang" },
      { id: "analytics", label: "Analyse-Dashboard" },
    ],
    deliveryTitle: "So funktioniert es",
    deliveryText: "Ein strukturierter Vier-Schritte-Prozess — vom ersten Gespräch bis zu messbaren Ergebnissen. Kein Rätselraten, keine ergebnislosen Retainer.",
    deliverySteps: [
      { title: "Erstgespräch", description: "Ein fokussiertes 30-minütiges Gespräch, um Ihr Unternehmen, Ihren digitalen Auftritt, Ihre Ziele und die größten Lücken zu verstehen." },
      { title: "Auftritts-Audit", description: "Wir analysieren, wie Ihr Unternehmen auf Website, Suche, Social und Google wahrgenommen wird — und identifizieren, was schwache Eindrücke erzeugt." },
      { title: "Strukturierter Plan", description: "Sie erhalten einen priorisierten Aktionsplan mit klarem Umfang, Zeitplan und erwarteten Ergebnissen. Keine vagen Empfehlungen — nur konkrete Umsetzungsschritte." },
      { title: "Umsetzung & Review", description: "Wir implementieren die vereinbarten Verbesserungen und überprüfen die Ergebnisse anhand der ursprünglichen Ziele. Anpassungen erfolgen datenbasiert." },
    ],
    contactConsultTitle: "Kostenloses Erstgespräch buchen",
    contactPoint1: "erstes Abstimmungsgespräch zur Klärung des Umfangs",
    contactPoint2: "empfohlene Leistung oder Produktausrichtung",
    contactPoint3: "klarer Projektstart mit definierten Verantwortlichkeiten",
    contactEmailLabel: "bevorzugte Kontakt-E-Mail",
    contactReferenceHelp: "Bitte geben Sie eine Unternehmensreferenz an (Google Maps-Link, Instagram-Profil oder exakter Unternehmensname), damit vorab recherchiert werden kann.",
    formNameLabel: "Name *", formNamePlaceholder: "Ihr vollständiger Name",
    formEmailLabel: "E-Mail *", formEmailPlaceholder: "name@unternehmen.de",
    formBusinessReferenceLabel: "Unternehmensreferenz *", formBusinessReferencePlaceholder: "Google Maps, Instagram oder exakter Unternehmensname",
    formSubjectLabel: "Betreff", formSubjectPlaceholder: "Projektthema",
    formMessageLabel: "Nachricht *", formMessagePlaceholder: "Beschreiben Sie Ihr Anliegen und das gewünschte Ergebnis.",
    formSubmit: "Anfrage senden", formSubmitSending: "Wird gesendet...",
    formErrorRequired: "Bitte Name, E-Mail, Unternehmensreferenz und Nachricht ausfüllen.",
    formErrorEmail: "Bitte gültige E-Mail-Adresse eingeben.",
    formErrorSend: "Nachricht konnte nicht gesendet werden. Bitte in einer Minute erneut versuchen.",
    formSuccess: "Ihre Anfrage wurde an unser Team weitergeleitet.",
    aboutTitle: "Über Cihad Kucuk",
    aboutIntro: "Business Development-Berater und Stratege für digitalen Auftritt mit Sitz in Prag, Tschechische Republik.",
    aboutBio: "Ich helfe Unternehmen, leichter gefunden, vertraut und gewählt zu werden. Durch strukturierten digitalen Auftritt, Markenpositionierung und Business Development-Beratung entwickle ich Systeme, die bessere erste Eindrücke erzeugen und passendere Nachfrage generieren. SEO ist dabei ein wichtiger Baustein — die Grundlage, die alles andere effektiver macht.",
    aboutExpertise: "Fachgebiete",
    aboutExpertiseList: ["Business Development", "Digitaler Auftritt & Markenpräsenz", "Website-Optimierung & Conversion", "Digitale Marketingstrategie", "SEO & Suchsichtbarkeit", "Vertriebspipeline-Entwicklung"],
    aboutDocStudiosBridge: "Ich habe außerdem DOC Studios s.r.o. gegründet, ein Boutique-Musikproduktionsstudio in Prag, das Premium-Audio für Film, Werbung und Gaming liefert. Dieser doppelte Hintergrund gibt mir eine einzigartige Perspektive auf die kreative und kommerzielle Seite des Geschäftslebens.",
    aboutLocation: "Prag, Tschechische Republik",
    aboutCta: "Lassen Sie uns über Ihr Unternehmen sprechen",
    aboutVisitDoc: "DOC Studios besuchen",
    blogTitle: "Einblicke & Ressourcen",
    blogSubtitle: "Praxisnahe Artikel über digitalen Auftritt, Business Development und Wachstumsstrategien.",
    blogComingSoon: "Neue Artikel werden vorbereitet. Kommen Sie bald wieder für Einblicke in digitalen Auftritt, Markenpräsenz und Unternehmenswachstum.",
    blogNotify: "Benachrichtigt werden, wenn neue Inhalte erscheinen",
    footerTagline: "Business Development, Marketing und digitaler Auftritt Beratung mit Sitz in Prag.",
    footerRights: "Alle Rechte vorbehalten.",
    servicesPackagesTitle: "Womit Sie starten können",
    servicesPackagesText: "Konkrete Pakete mit klarem Umfang, Zeitplan und Ergebnissen — ob für einen stärkeren digitalen Auftritt, bessere Suchpräsenz oder einen strukturierteren Business Development-Prozess. Jedes Engagement beginnt mit einem kostenlosen Erstgespräch.",
    servicesPackagesCta: "Kostenloses Erstgespräch buchen",
  },

  tr: {
    ...baseLocaleCopy,
    langLabel: "Dil", langCode: "TR", langName: "Türkçe",
    growthBadge: "İş Geliştirme / Pazarlama / Dijital Görünüm",
    growthHeroLine1: "İşinizi",
    growthHeroLine2Prefix: "daha kolay",
    growthHeroFind: "bulunur",
    growthHeroTrust: "güvenilir",
    growthHeroAnd: "ve",
    growthHeroChoose: "tercih edilir",
    growthCta: "Çözümleri Gör",
    businessSupportText: "İşletmenizin görünürlüğünü artıran, konumlandırmasını netleştiren ve web, sosyal medya ile marka iletişiminde dönüşümü destekleyen dijital yapılar oluşturuyoruz.",
    businessSupportLine: "Dijital görünüm ilk izlenimi belirler. Online'da nasıl göründüğünüz, nasıl iletişim kurduğunuz ve nasıl konumlandığınız, insanların size güvenip güvenmeyeceğini belirler.",
    tabServices: "Hizmetler", tabProducts: "Ürünler", tabContact: "İletişim", tabAbout: "Hakkımda", tabBlog: "Blog",
    servicesEyebrow: "Hizmetler",
    servicesTitle: "İş Geliştirme / Pazarlama / Dijital Görünüm Hizmetleri",
    servicesText: "İşletmenizin nasıl göründüğünü, iletişim kurduğunu ve bulunduğunu iyileştirmeye yönelik sonuç odaklı hizmetler — dijital görünüm, marka tutarlılığı, dönüşüm kalitesi ve arama varlığını kapsıyor.",
    servicesCards: [
      { title: "Dijital Görünüm", points: ["web ve sosyal medyada tutarlı görsel kimlik", "her temas noktasında profesyonel ilk izlenim", "tanınırlık yaratan tutarlı marka sunumu"] },
      { title: "Görünürlük", points: ["daha güçlü arama varlığı", "daha iyi keşfedilebilirlik", "geliştirilmiş dijital erişim"] },
      { title: "Güven", points: ["daha profesyonel sunum", "daha net yapı", "daha güçlü ilk izlenim"] },
      { title: "Dönüşüm", points: ["daha net mesajlaşma", "daha iyi CTA akışı", "geliştirilmiş dönüşüm kalitesi"] },
      { title: "Reklam Verimliliği", points: ["daha az israf harcama", "daha iyi hedef kitle hedefleme", "daha verimli Instagram reklam performansı"] },
      { title: "SEO", points: ["daha güçlü organik görünürlük", "ücretli trafiğe daha az bağımlılık", "daha sürdürülebilir arama performansı"] },
    ],
    servicePackages: [
      { title: "Dijital Görünüm Denetimi", description: "Web sitesi, sosyal profiller ve marka görsellerin tam incelemesi — net bir iyileştirme planı ve öncelikli eylem listesiyle.", icon: "Search", tier: "Tek seferlik proje", delivery: "3–7 gün" },
      { title: "Web Sitesi Yeniden Tasarım / Açılış Sayfası", description: "Güçlü görsel kimlikli, duyarlı tasarımlı, arama odaklı yapıda ve analitik entegrasyonlu dönüşüm odaklı sayfalar.", icon: "Layout", tier: "Tek seferlik proje", delivery: "5–21 gün" },
      { title: "Google İşletme Profili Kurulumu", description: "GBP oluşturma veya talep etme, fotoğraflarla optimize etme, yorum stratejisi ve yerel arama varlığı.", icon: "MapPin", tier: "Tek seferlik proje", delivery: "2–5 gün" },
      { title: "Dijital Görünüm Yönetimi", description: "Sürekli sosyal medya görselleri, marka tutarlılığı, içerik takvimi, GBP yönetimi ve aylık performans incelemesi.", icon: "Target", tier: "Aylık retainer", delivery: "Sürekli" },
      { title: "İş Geliştirme Danışmanlığı", description: "Satış süreci incelemesi, potansiyel müşteri araştırması, sosyal yardım taslakları, CRM yönetimi ve boru hattı kurulumu.", icon: "BarChart3", tier: "Aylık retainer", delivery: "Sürekli" },
      { title: "SEO & Arama Varlığı", description: "Anahtar kelime takibi, sayfa içi optimizasyon, teknik düzeltmeler, bağlantı oluşturma ve aylık raporlama.", icon: "TrendingUp", tier: "Aylık retainer", delivery: "Sürekli" },
    ],
    productsEyebrow: "Ürünler",
    studioosHeroBadge: "Yeni Ürün · Stüdyo Yönetim Platformu",
    studioosHeroTitle: "Her stüdyo için tek platform.",
    studioosHeroSubtitle: "Rezervasyonlar, müşteriler, ödemeler ve tüm ekibiniz — tek bir panelden yönetilir. Her stüdyo kendi URL'sinde kendi markalı uygulamasını alır.",
    studioosSubdomainNote: "app.studyo-adiniz.com",
    studioosHeroCta: "Erken Erişim İste",
    studioosHeroSeeFeatures: "Özellikleri Gör",
    studioosForLabel: "Kuaför salonları · Dövme stüdyoları · Güzellik klinikleri · Fotoğraf stüdyoları · Müzik stüdyoları · ve daha fazlası için",
    studioosFeaturesTitle: "Stüdyonuzun ihtiyacı olan her şey.",
    studioosFeaturesText: "İlk rezervasyondan sadık tekrar müşterilere — her şey tek platformda, her cihazda.",
    studioosFeatures: [
      { title: "Akıllı Randevu Takvimi", description: "Gerçek zamanlı müsaitlik ile görsel rezervasyon takvimi. Ekibiniz tam olarak ne görmesi gerekiyorsa onu görür.", icon: "Calendar" },
      { title: "Müşteri Yönetimi", description: "Randevu geçmişi, notlar ve tercihlerle tam müşteri profilleri. Kalıcı ilişkiler kurun.", icon: "Users" },
      { title: "Hatırlatmalar & Bildirimler", description: "E-posta veya SMS ile otomatik randevu onayları ve hatırlatmalar. Hiçbir şey yapmadan gelmeme oranını azaltın.", icon: "Mail" },
      { title: "Ekip & Roller", description: "Sahip, Yönetici, Personel ve Resepsiyon rolleri. Herkes görmesi gerekeni görür, görmemesi gerekeni görmez.", icon: "Shield" },
      { title: "Gelen Kutusu & Leads", description: "Instagram DM'leri, iletişim formları ve walk-in leadler tek bir gelen kutusunda. Hiçbir rezervasyon talebi kaçmaz.", icon: "MessageSquare" },
      { title: "Analitik & İçgörüler", description: "Gelir gösterge panelleri, personel performansı, reklam içgörüleri ve SEO sağlığı — otomatik güncellenir.", icon: "BarChart3" },
    ],
    studioosHowTitle: "Dakikalar içinde hazır.",
    studioosHowText: "Karmaşık kurulum yok. Teknik bilgi gerekmez.",
    studioosHowSteps: [
      { step: "1", title: "Planınızı seçin", description: "Stüdyo büyüklüğünüze uygun aylık abonelik seçin. Uzun vadeli sözleşme yok." },
      { step: "2", title: "URL'nizi alın", description: "Stüdyonuz app.stüdyo-adınız.com'da yayına girer — markalı, hızlı ve mobil hazır." },
      { step: "3", title: "Her şeyi yönetin", description: "Rezervasyonlar, müşteriler, ödemeler ve ekip tek panelden — her cihazda, her yerde." },
    ],
    studioosMobileTitle: "Mobil için tasarlandı.",
    studioosMobileText: "Ekibiniz rezervasyonları telefondan yönetir. Müşterileriniz de telefonlarından rezervasyon yapar. Tam duyarlı tasarım ve PWA desteğiyle — App Store gerekmeden iOS ve Android ana ekranına kurulabilir.",
    studioosEarlyBadge: "Erken Erişim · %25 İndirim",
    studioosEarlyTitle: "Platforma ilk katılan stüdyolar arasında olun.",
    studioosEarlyText: "Erken erişim için e-postanızı bırakın. Onboarding detaylarıyla geri döneceğiz ve ilk yıl için %25 indiriminizi garantileyeceğiz.",
    studioosEmailPlaceholder: "Kendi e-posta adresinizi girin (orn. ad@firma.com)",
    studioosEmailCta: "Erken Erişim Al",
    studioosEmailSending: "Gönderiliyor...",
    studioosEmailSuccess: "Listedesiniz — yakında sizinle iletişime geçeceğiz.",
    studioosEmailErrorInvalid: "Lütfen geçerli bir e-posta adresi girin.",
    studioosEmailErrorSend: "Bir şeyler ters gitti. Lütfen tekrar deneyin.",
    studioosPricingNote: "Aylık abonelik · İstediğin zaman iptal · Tüm özellikler dahil",
    studioosMockupTitle: "Arayüze bir bakış.",
    studioosMockupText: "Hızlı ve tanıdık hissettirmek için tasarlandı — masaüstünde de telefonda da.",
    studioosMockupDisclaimer: "Bunlar hedeflenen arayüz yönünü temsil eden demo mockup'lardır. Nihai tasarım değişebilir.",
    studioosMockupScreens: [
      { id: "calendar", label: "Rezervasyon Takvimi" },
      { id: "clients", label: "Müşteri Listesi" },
      { id: "inbox", label: "Birleşik Gelen Kutusu" },
      { id: "analytics", label: "Analitik Paneli" },
    ],
    deliveryTitle: "Nasıl Çalışır",
    deliveryText: "İlk görüşmeden ölçülebilir sonuçlara kadar yapılandırılmış dört adımlı süreç. Tahmin yok, yönsüz retainer yok.",
    deliverySteps: [
      { title: "Keşif Görüşmesi", description: "İşletmenizi, mevcut dijital varlığınızı, hedeflerinizi ve sizi geri tutan en büyük boşlukları anlamak için odaklanmış 30 dakikalık bir görüşme." },
      { title: "Görünüm Denetimi", description: "İşletmenizin web sitesi, arama, sosyal ve Google'da şu anda nasıl göründüğünü haritalandırıyor ve sürtüşme veya zayıf izlenimler yaratan şeyleri belirliyoruz." },
      { title: "Yapılandırılmış Plan", description: "Net kapsam, zaman çizelgesi ve beklenen sonuçlarla önceliklendirilmiş bir eylem planı alırsınız. Belirsiz tavsiyeler değil — somut bir uygulama sırası." },
      { title: "Uygulama & İnceleme", description: "Üzerinde anlaşılan iyileştirmeleri uygular, ardından sonuçları özgün hedeflere göre gözden geçiririz. Ayarlamalar varsayımlara değil verilere göre yapılır." },
    ],
    contactConsultTitle: "Ücretsiz Danışmanlık Randevusu Al",
    contactPoint1: "kapsamı onaylamak için ilk uyum görüşmesi",
    contactPoint2: "önerilen hizmet veya ürün yönü",
    contactPoint3: "sorumlulukları olan net proje başlangıç sırası",
    contactEmailLabel: "tercih edilen iletişim e-postası",
    contactReferenceHelp: "Ön toplantı araştırması yapılabilmesi için lütfen bir işletme referansı sağlayın (Google Haritalar bağlantısı, Instagram profili veya tam işletme adı).",
    formNameLabel: "Ad Soyad *", formNamePlaceholder: "Tam adınız",
    formEmailLabel: "E-posta *", formEmailPlaceholder: "ad@sirket.com",
    formBusinessReferenceLabel: "İşletme Referansı *", formBusinessReferencePlaceholder: "Google Haritalar, Instagram veya tam işletme adı",
    formSubjectLabel: "Konu", formSubjectPlaceholder: "Proje konusu",
    formMessageLabel: "Mesaj *", formMessagePlaceholder: "Ne ihtiyacınız olduğunu ve hangi sonucu elde etmek istediğinizi anlatın.",
    formSubmit: "Talep Gönder", formSubmitSending: "Gönderiliyor...",
    formErrorRequired: "Göndermeden önce lütfen Ad, E-posta, İşletme Referansı ve Mesaj alanlarını doldurun.",
    formErrorEmail: "Lütfen geçerli bir e-posta adresi girin.",
    formErrorSend: "Mesaj gönderilemedi. Lütfen bir dakika sonra tekrar deneyin.",
    formSuccess: "Talebiniz ekibimize iletildi.",
    aboutTitle: "Cihad Kucuk Hakkında",
    aboutIntro: "Prag, Çek Cumhuriyeti merkezli iş geliştirme danışmanı ve dijital görünüm stratejisti.",
    aboutBio: "İşletmelerin daha kolay bulunmasına, güvenilmesine ve tercih edilmesine yardım ediyorum. Yapılandırılmış dijital görünüm, marka konumlandırma ve iş geliştirme danışmanlığı aracılığıyla daha iyi ilk izlenimler yaratan ve daha nitelikli talep getiren sistemler oluşturuyorum. SEO bu sürecin önemli bir parçası — diğer her şeyi daha etkili kılan temel.",
    aboutExpertise: "Uzmanlık Alanları",
    aboutExpertiseList: ["İş Geliştirme", "Dijital Görünüm & Marka Varlığı", "Web Sitesi Optimizasyonu & Dönüşüm", "Dijital Pazarlama Stratejisi", "SEO & Arama Görünürlüğü", "Satış Hattı Geliştirme"],
    aboutDocStudiosBridge: "Ayrıca Prag'da film, reklam ve oyun için premium ses sunan butik bir müzik prodüksiyon stüdyosu olan DOC Studios s.r.o.'yu kurdum. Bu çift altyapı, iş hayatının hem yaratıcı hem de ticari taraflarına benzersiz bir bakış açısı kazandırmamı sağlıyor.",
    aboutLocation: "Prag, Çek Cumhuriyeti",
    aboutCta: "İşiniz hakkında konuşalım",
    aboutVisitDoc: "DOC Studios'u Ziyaret Et",
    blogTitle: "Görüşler ve Kaynaklar",
    blogSubtitle: "Dijital görünüm, iş geliştirme ve büyüme stratejisi üzerine pratik makaleler.",
    blogComingSoon: "Yeni makaleler hazırlanıyor. Dijital görünüm, marka varlığı ve iş büyümesi hakkında içgörüler için yakında tekrar kontrol edin.",
    blogNotify: "Yeni içeriklerden haberdar ol",
    footerTagline: "Prag merkezli iş geliştirme, pazarlama ve dijital görünüm danışmanlığı.",
    footerRights: "Tüm hakları saklıdır.",
    servicesPackagesTitle: "Nereden Başlayabilirsiniz",
    servicesPackagesText: "Net kapsam, zaman çizelgesi ve teslimatlarla somut paketler — daha güçlü bir dijital görünüm, daha iyi arama varlığı veya daha yapılandırılmış bir iş geliştirme süreci ihtiyacınız olsun. Her iş birliği ücretsiz bir danışmanlıkla başlar.",
    servicesPackagesCta: "Ücretsiz Danışmanlık Al",
  },

  es: {
    ...baseLocaleCopy,
    langLabel: "Idioma", langCode: "ES", langName: "Español",
    growthBadge: "Desarrollo Empresarial / Marketing / Presencia Digital",
    growthHeroLine1: "Haz que tu negocio",
    growthHeroLine2Prefix: "sea más fácil de",
    growthHeroFind: "encontrar",
    growthHeroTrust: "confiar",
    growthHeroAnd: "y",
    growthHeroChoose: "elegir",
    growthCta: "Ver Soluciones",
    businessSupportText: "Construimos estructuras digitales orientadas al negocio que mejoran cómo aparece tu marca, comunica y convierte — en web, redes sociales, búsqueda y presentación de marca.",
    businessSupportLine: "La presencia digital determina la primera impresión. Cómo te ves, comunicas y posicionas online decide si las personas confían en ti lo suficiente para contactarte.",
    tabServices: "Servicios", tabProducts: "Productos", tabContact: "Contacto", tabAbout: "Sobre mí", tabBlog: "Blog",
    servicesEyebrow: "Servicios",
    servicesTitle: "Servicios de Desarrollo Empresarial / Marketing / Presencia Digital",
    servicesText: "Servicios orientados a resultados para mejorar cómo aparece tu negocio, comunica y se encuentra — cubriendo presencia digital, consistencia de marca, calidad de conversión y visibilidad en búsquedas.",
    servicesCards: [
      { title: "Presencia Digital", points: ["identidad visual coherente en web y redes sociales", "primera impresión profesional en cada punto de contacto", "presentación de marca consistente que construye reconocimiento"] },
      { title: "Visibilidad", points: ["mayor presencia en búsquedas", "mejor descubrimiento", "mayor alcance digital"] },
      { title: "Confianza", points: ["presentación más profesional", "estructura más clara", "primera impresión más sólida"] },
      { title: "Conversión", points: ["mensajes más claros", "mejor flujo de CTA", "mayor calidad de conversión"] },
      { title: "Eficiencia Publicitaria", points: ["menor gasto desperdiciado", "mejor segmentación de audiencia", "rendimiento más eficiente en anuncios de Instagram"] },
      { title: "SEO", points: ["mayor visibilidad orgánica", "menor dependencia del tráfico pagado", "rendimiento de búsqueda más sostenible"] },
    ],
    servicePackages: [
      { title: "Auditoría de Presencia Digital", description: "Revisión completa de web, perfiles sociales y visuales de marca — con plan de mejora claro y lista de acciones priorizadas.", icon: "Search", tier: "Proyecto único", delivery: "3–7 días" },
      { title: "Rediseño Web / Landing Page", description: "Páginas enfocadas en conversión con identidad visual sólida, diseño responsive, estructura optimizada para búsquedas e integración de analíticas.", icon: "Layout", tier: "Proyecto único", delivery: "5–21 días" },
      { title: "Configuración de Google Business Profile", description: "Crear o reclamar tu GBP, optimizar con fotos, estrategia de reseñas y presencia en búsqueda local.", icon: "MapPin", tier: "Proyecto único", delivery: "2–5 días" },
      { title: "Gestión de Presencia Digital", description: "Visuales de redes sociales continuos, consistencia de marca, calendario de contenido, gestión de GBP y revisión mensual de rendimiento.", icon: "Target", tier: "Retainer mensual", delivery: "Continuo" },
      { title: "Consultoría de Desarrollo Empresarial", description: "Revisión del proceso de ventas, investigación de leads, borradores de outreach, gestión de CRM y configuración del pipeline.", icon: "BarChart3", tier: "Retainer mensual", delivery: "Continuo" },
      { title: "SEO & Presencia en Búsquedas", description: "Seguimiento de palabras clave, optimización on-page, correcciones técnicas, construcción de enlaces e informes mensuales.", icon: "TrendingUp", tier: "Retainer mensual", delivery: "Continuo" },
    ],
    productsEyebrow: "Productos",
    studioosHeroBadge: "Nuevo Producto · Plataforma de Gestión de Studios",
    studioosHeroTitle: "Una plataforma para cada studio.",
    studioosHeroSubtitle: "Reservas, clientes, pagos y tu equipo completo — gestionados desde un único panel. Cada studio obtiene su propia app con su propia URL.",
    studioosSubdomainNote: "app.tu-studio.com",
    studioosHeroCta: "Solicitar Acceso Anticipado",
    studioosHeroSeeFeatures: "Ver Características",
    studioosForLabel: "Para peluquerías · estudios de tatuaje · clínicas de belleza · estudios de fotografía · estudios de música · y más",
    studioosFeaturesTitle: "Todo lo que tu studio necesita.",
    studioosFeaturesText: "Desde la primera reserva hasta los clientes habituales — una plataforma para todo, en cualquier dispositivo.",
    studioosFeatures: [
      { title: "Agenda Inteligente", description: "Calendario de reservas visual con disponibilidad en tiempo real. Tu equipo ve exactamente lo que necesita.", icon: "Calendar" },
      { title: "Gestión de Clientes", description: "Perfiles completos con historial de citas, notas y preferencias. Construye relaciones duraderas.", icon: "Users" },
      { title: "Recordatorios y Notificaciones", description: "Confirmaciones y recordatorios de citas automáticos por email o SMS. Reduce las ausencias sin esfuerzo.", icon: "Mail" },
      { title: "Equipo y Roles", description: "Roles de Propietario, Gerente, Personal y Recepción. Cada uno accede solo a lo que debe.", icon: "Shield" },
      { title: "Bandeja de Entrada y Leads", description: "DMs de Instagram, formularios y walk-ins unificados en una bandeja. Ninguna solicitud de reserva se pierde.", icon: "MessageSquare" },
      { title: "Analíticas e Insights", description: "Paneles de ingresos, rendimiento del equipo, insights de anuncios y salud SEO — actualizados automáticamente.", icon: "BarChart3" },
    ],
    studioosHowTitle: "Listo en minutos.",
    studioosHowText: "Sin configuración compleja. Sin conocimientos técnicos requeridos.",
    studioosHowSteps: [
      { step: "1", title: "Elige tu plan", description: "Selecciona una suscripción mensual que se adapte al tamaño de tu studio. Sin contratos a largo plazo." },
      { step: "2", title: "Obtén tu URL", description: "Tu studio se activa en app.tu-studio.com — con tu marca, rápido y listo para móvil desde el primer día." },
      { step: "3", title: "Gestiona todo", description: "Reservas, clientes, pagos y equipo desde un panel — en cualquier dispositivo, en cualquier lugar." },
    ],
    studioosMobileTitle: "Diseñado para móvil.",
    studioosMobileText: "Tu equipo gestiona reservas desde su teléfono. Tus clientes reservan desde el suyo. Totalmente responsivo con soporte PWA — instalable en iOS y Android sin necesidad de tienda de apps.",
    studioosEarlyBadge: "Acceso Anticipado · 25% de descuento",
    studioosEarlyTitle: "Sé de los primeros studios en la plataforma.",
    studioosEarlyText: "Deja tu email para obtener acceso anticipado. Te contactaremos con los detalles de incorporación y fijaremos tu 25% de descuento para el primer año.",
    studioosEmailPlaceholder: "Introduce tu email (p. ej. nombre@empresa.com)",
    studioosEmailCta: "Obtener Acceso Anticipado",
    studioosEmailSending: "Enviando...",
    studioosEmailSuccess: "Estás en la lista — nos pondremos en contacto pronto.",
    studioosEmailErrorInvalid: "Por favor introduce una dirección de email válida.",
    studioosEmailErrorSend: "Algo salió mal. Por favor inténtalo de nuevo.",
    studioosPricingNote: "Suscripción mensual · Cancela cuando quieras · Todas las funciones incluidas",
    studioosMockupTitle: "Un vistazo a la interfaz.",
    studioosMockupText: "Diseñada para sentirse rápida y familiar — en escritorio o en móvil.",
    studioosMockupDisclaimer: "Estos son mockups de referencia que representan la dirección visual prevista. El diseño final está sujeto a cambios.",
    studioosMockupScreens: [
      { id: "calendar", label: "Calendario de Reservas" },
      { id: "clients", label: "Lista de Clientes" },
      { id: "inbox", label: "Bandeja Unificada" },
      { id: "analytics", label: "Panel de Análisis" },
    ],
    deliveryTitle: "Cómo Funciona",
    deliveryText: "Un proceso estructurado de cuatro pasos — desde la primera conversación hasta resultados medibles. Sin suposiciones, sin retainers sin dirección.",
    deliverySteps: [
      { title: "Llamada de Descubrimiento", description: "Una conversación enfocada de 30 minutos para entender tu negocio, presencia digital actual, objetivos y las mayores brechas que te frenan." },
      { title: "Auditoría de Presencia", description: "Mapeamos cómo aparece tu negocio actualmente en web, búsqueda, redes sociales y Google — e identificamos qué genera fricción o impresiones débiles." },
      { title: "Plan Estructurado", description: "Recibes un plan de acción priorizado con alcance claro, cronograma y resultados esperados. Sin recomendaciones vagas — solo una secuencia de ejecución concreta." },
      { title: "Ejecución & Revisión", description: "Implementamos las mejoras acordadas, luego revisamos los resultados contra los objetivos originales. Los ajustes se hacen con datos, no suposiciones." },
    ],
    contactConsultTitle: "Reservar Consulta Gratuita",
    contactPoint1: "llamada inicial de alineación para confirmar el alcance",
    contactPoint2: "dirección de servicio o producto recomendada",
    contactPoint3: "secuencia de inicio de proyecto con responsabilidades claras",
    contactEmailLabel: "correo electrónico de contacto preferido",
    contactReferenceHelp: "Por favor proporciona una referencia empresarial (enlace de Google Maps, perfil de Instagram o nombre exacto del negocio) para completar la investigación previa a la reunión.",
    formNameLabel: "Nombre *", formNamePlaceholder: "Tu nombre completo",
    formEmailLabel: "Correo *", formEmailPlaceholder: "nombre@empresa.com",
    formBusinessReferenceLabel: "Referencia Empresarial *", formBusinessReferencePlaceholder: "Google Maps, Instagram o nombre exacto del negocio",
    formSubjectLabel: "Asunto", formSubjectPlaceholder: "Tema del proyecto",
    formMessageLabel: "Mensaje *", formMessagePlaceholder: "Cuéntanos qué necesitas y qué resultado quieres lograr.",
    formSubmit: "Enviar Consulta", formSubmitSending: "Enviando...",
    formErrorRequired: "Por favor completa Nombre, Correo, Referencia Empresarial y Mensaje antes de enviar.",
    formErrorEmail: "Por favor introduce una dirección de correo válida.",
    formErrorSend: "Error al enviar el mensaje. Por favor intenta de nuevo en un minuto.",
    formSuccess: "Tu solicitud ha sido enviada a nuestro equipo.",
    aboutTitle: "Sobre Cihad Kucuk",
    aboutIntro: "Consultor de desarrollo empresarial y estratega de presencia digital con base en Praga, República Checa.",
    aboutBio: "Ayudo a empresas a ser más fáciles de encontrar, confiar y elegir. A través de una presencia digital estructurada, posicionamiento de marca y consultoría de desarrollo empresarial, construyo sistemas que crean mejores primeras impresiones y generan demanda más calificada. El SEO es una parte de eso — la base que hace todo lo demás más efectivo.",
    aboutExpertise: "Áreas de experiencia",
    aboutExpertiseList: ["Desarrollo Empresarial", "Presencia Digital & Marca", "Optimización Web & Conversión", "Estrategia de Marketing Digital", "SEO & Visibilidad en Búsquedas", "Desarrollo de Pipeline de Ventas"],
    aboutDocStudiosBridge: "También fundé DOC Studios s.r.o., un estudio boutique de producción musical en Praga que ofrece audio premium para cine, publicidad y videojuegos. Esta experiencia dual me da una perspectiva única tanto en el lado creativo como comercial del negocio.",
    aboutLocation: "Praga, República Checa",
    aboutCta: "Hablemos de tu negocio",
    aboutVisitDoc: "Visitar DOC Studios",
    blogTitle: "Perspectivas y Recursos",
    blogSubtitle: "Artículos prácticos sobre presencia digital, desarrollo empresarial y estrategia de crecimiento.",
    blogComingSoon: "Se están preparando nuevos artículos. Vuelve pronto para obtener información sobre presencia digital, marca y estrategias de crecimiento empresarial.",
    blogNotify: "Recibir notificaciones de nuevo contenido",
    footerTagline: "Consultoría de desarrollo empresarial, marketing y presencia digital con sede en Praga.",
    footerRights: "Todos los derechos reservados.",
    servicesPackagesTitle: "Por Dónde Empezar",
    servicesPackagesText: "Paquetes concretos con alcance, cronograma y entregables claros — ya sea que necesites una presencia digital más sólida, mejor posicionamiento en búsquedas o un proceso de desarrollo empresarial más estructurado. Cada proyecto comienza con una consulta gratuita.",
    servicesPackagesCta: "Reservar Consulta Gratuita",
  },

  cs: {
    ...baseLocaleCopy,
    langLabel: "Jazyk", langCode: "CZ", langName: "Čeština",
    growthBadge: "Rozvoj podnikání / Marketing / Digitální prezentace",
    growthHeroLine1: "Udělejte svůj byznys",
    growthHeroLine2Prefix: "snazší pro",
    growthHeroFind: "nalezení",
    growthHeroTrust: "důvěru",
    growthHeroAnd: "a",
    growthHeroChoose: "volbu",
    growthCta: "Zobrazit řešení",
    businessSupportText: "Budujeme digitální struktury pro firmy, které zlepšují viditelnost, objasňují pozicování a podporují lepší konverze na webu, sociálních sítích a v komunikaci značky.",
    businessSupportLine: "Digitální prezentace určuje první dojem. To, jak vypadáte, komunikujete a jste pozicováni online, rozhoduje o tom, zda vám lidé důvěřují natolik, aby vás kontaktovali.",
    tabServices: "Služby", tabProducts: "Produkty", tabContact: "Kontakt", tabAbout: "O mně", tabBlog: "Blog",
    servicesEyebrow: "Služby",
    servicesTitle: "Služby rozvoje podnikání / marketing / digitální prezentace",
    servicesText: "Služby zaměřené na výsledky, navržené ke zlepšení toho, jak váš byznys vypadá, komunikuje a je nalézán — zahrnující digitální prezentaci, konzistenci značky, kvalitu konverzí a přítomnost ve vyhledávačích.",
    servicesCards: [
      { title: "Digitální prezentace", points: ["jednotná vizuální identita na webu i sociálních sítích", "profesionální první dojem na každém kontaktním bodě", "konzistentní prezentace značky, která buduje rozpoznatelnost"] },
      { title: "Viditelnost", points: ["silnější přítomnost ve vyhledávání", "lepší dohledatelnost", "rozšířený digitální dosah"] },
      { title: "Důvěra", points: ["profesionálnější prezentace", "přehlednější struktura", "silnější první dojem"] },
      { title: "Konverze", points: ["jasnější sdělení", "lepší tok CTA", "vyšší kvalita konverzí"] },
      { title: "Efektivita reklamy", points: ["méně plýtvání rozpočtem", "lepší cílení na publikum", "efektivnější výkon Instagram reklam"] },
      { title: "SEO", points: ["silnější organická viditelnost", "menší závislost na placené návštěvnosti", "udržitelnější výkon ve vyhledávání"] },
    ],
    servicePackages: [
      { title: "Audit digitální prezentace", description: "Kompletní přehled webu, sociálních profilů a vizuálů značky — s jasným plánem zlepšení a prioritizovaným seznamem akcí.", icon: "Search", tier: "Jednorázový projekt", delivery: "3–7 dní" },
      { title: "Redesign webu / Landing page", description: "Stránky zaměřené na konverze se silnou vizuální identitou, responzivním designem, strukturou připravenou pro vyhledávače a integrací analytiky.", icon: "Layout", tier: "Jednorázový projekt", delivery: "5–21 dní" },
      { title: "Nastavení Google Business profilu", description: "Vytvoření nebo nárokování GBP, optimalizace s fotkami, strategie recenzí a lokální přítomnost ve vyhledávání.", icon: "MapPin", tier: "Jednorázový projekt", delivery: "2–5 dní" },
      { title: "Správa digitální prezentace", description: "Průběžné vizuály pro sociální sítě, konzistence značky, obsahový kalendář, správa GBP a měsíční přehled výkonu.", icon: "Target", tier: "Měsíční retainer", delivery: "Průběžně" },
      { title: "Poradenství v oblasti rozvoje podnikání", description: "Přehled prodejního procesu, průzkum potenciálních zákazníků, návrhy oslovení, správa CRM a nastavení pipeline.", icon: "BarChart3", tier: "Měsíční retainer", delivery: "Průběžně" },
      { title: "SEO & přítomnost ve vyhledávání", description: "Sledování klíčových slov, on-page optimalizace, technické opravy, budování odkazů a měsíční reporty.", icon: "TrendingUp", tier: "Měsíční retainer", delivery: "Průběžně" },
    ],
    productsEyebrow: "Produkty",
    studioosHeroBadge: "Nový produkt · Platforma pro správu studia",
    studioosHeroTitle: "Jedna platforma pro každé studio.",
    studioosHeroSubtitle: "Rezervace, klienti, platby a celý tým — spravováno z jediného přehledu. Každé studio dostane vlastní aplikaci na vlastní URL.",
    studioosSubdomainNote: "app.vase-studio.cz",
    studioosHeroCta: "Požádat o předčasný přístup",
    studioosHeroSeeFeatures: "Zobrazit funkce",
    studioosForLabel: "Pro kadeřnické salony · tetovací studia · beauty kliniky · fotografická studia · hudební studia · a další",
    studioosFeaturesTitle: "Vše, co vaše studio potřebuje.",
    studioosFeaturesText: "Od první rezervace po věrné klienty — jedna platforma pro vše, na každém zařízení.",
    studioosFeatures: [
      { title: "Chytrý kalendář", description: "Vizuální rezervační kalendář s dostupností v reálném čase. Váš tým vidí přesně to, co potřebuje.", icon: "Calendar" },
      { title: "Správa klientů", description: "Kompletní profily s historií schůzek, poznámkami a preferencemi. Budujte trvalé vztahy.", icon: "Users" },
      { title: "Připomínky a oznámení", description: "Automatická potvrzení a připomínky schůzek e-mailem nebo SMS. Snižte počet absencí bez vlastního úsilí.", icon: "Mail" },
      { title: "Tým a role", description: "Role Majitele, Manažera, Zaměstnance a Recepce. Každý vidí, co má, nic víc.", icon: "Shield" },
      { title: "Doručená pošta a leady", description: "Instagram DM, kontaktní formuláře a walk-in zájemci v jedné schránce. Žádná rezervace se neztratí.", icon: "MessageSquare" },
      { title: "Analytika a přehledy", description: "Přehledy tržeb, výkon týmu, reklamní insights a SEO zdraví — automaticky aktualizováno.", icon: "BarChart3" },
    ],
    studioosHowTitle: "V provozu za minuty.",
    studioosHowText: "Žádné složité nastavení. Žádné technické znalosti.",
    studioosHowSteps: [
      { step: "1", title: "Vyberte plán", description: "Zvolte měsíční předplatné odpovídající velikosti vašeho studia. Bez dlouhodobých smluv." },
      { step: "2", title: "Získejte URL", description: "Vaše studio přejde na app.vase-studio.cz — s vaší značkou, rychlé a mobilní od prvního dne." },
      { step: "3", title: "Spravujte vše", description: "Rezervace, klienti, platby a tým z jednoho přehledu — na každém zařízení, kdekoliv." },
    ],
    studioosMobileTitle: "Navrženo pro mobil.",
    studioosMobileText: "Váš tým spravuje rezervace z telefonu. Vaši klienti rezervují ze svého. Plně responzivní s podporou PWA — instalovatelné na iOS a Android bez App Store.",
    studioosEarlyBadge: "Předčasný přístup · 25% sleva",
    studioosEarlyTitle: "Buďte mezi prvními studii na platformě.",
    studioosEarlyText: "Zanechte e-mail pro předčasný přístup. Ozveme se s informacemi o onboardingu a zafixujeme vaši 25% slevu na první rok.",
    studioosEmailPlaceholder: "Zadejte svuj e-mail (napr. jmeno@firma.cz)",
    studioosEmailCta: "Získat předčasný přístup",
    studioosEmailSending: "Odesílání...",
    studioosEmailSuccess: "Jste na seznamu — brzy se ozveme.",
    studioosEmailErrorInvalid: "Prosím zadejte platnou e-mailovou adresu.",
    studioosEmailErrorSend: "Něco se pokazilo. Zkuste to prosím znovu.",
    studioosPricingNote: "Měsíční předplatné · Zrušte kdykoliv · Všechny funkce zahrnuty",
    studioosMockupTitle: "Pohled na rozhraní.",
    studioosMockupText: "Navrženo tak, aby bylo rychlé a přehledné — na počítači i na telefonu.",
    studioosMockupDisclaimer: "Jedná se o náhledové mockupy představující zamýšlený vizuální směr. Finální design se může změnit.",
    studioosMockupScreens: [
      { id: "calendar", label: "Rezervační kalendář" },
      { id: "clients", label: "Seznam klientů" },
      { id: "inbox", label: "Jednotná schránka" },
      { id: "analytics", label: "Analytický přehled" },
    ],
    deliveryTitle: "Jak to funguje",
    deliveryText: "Strukturovaný čtyřkrokový proces — od prvního hovoru po měřitelné výsledky. Žádné dohady, žádné retainery bez směru.",
    deliverySteps: [
      { title: "Úvodní hovor", description: "Soustředěný 30minutový rozhovor pro pochopení vašeho podnikání, současné digitální prezentace, cílů a největších mezer, které vás brzdí." },
      { title: "Audit prezentace", description: "Mapujeme, jak vaše firma aktuálně vypadá na webu, ve vyhledávání, na sociálních sítích a v Google — a identifikujeme, co způsobuje slabé dojmy." },
      { title: "Strukturovaný plán", description: "Obdržíte prioritizovaný akční plán s jasným rozsahem, harmonogramem a očekávanými výsledky. Žádná vágní doporučení — jen konkrétní postup." },
      { title: "Realizace & hodnocení", description: "Implementujeme dohodnutá zlepšení a poté vyhodnotíme výsledky oproti původním cílům. Úpravy jsou prováděny na základě dat, nikoli předpokladů." },
    ],
    contactConsultTitle: "Zarezervovat bezplatnou konzultaci",
    contactPoint1: "úvodní hovor pro potvrzení rozsahu",
    contactPoint2: "doporučené zaměření na službu nebo produkt",
    contactPoint3: "jasná posloupnost zahájení projektu s odpovědnostmi",
    contactEmailLabel: "preferovaný kontaktní e-mail",
    contactReferenceHelp: "Prosím uveďte obchodní referenci (odkaz na Google Maps, Instagram profil nebo přesný název firmy), aby bylo možné provést předschůzkový průzkum.",
    formNameLabel: "Jméno *", formNamePlaceholder: "Vaše celé jméno",
    formEmailLabel: "E-mail *", formEmailPlaceholder: "jmeno@firma.cz",
    formBusinessReferenceLabel: "Obchodní reference *", formBusinessReferencePlaceholder: "Google Maps, Instagram nebo přesný název firmy",
    formSubjectLabel: "Předmět", formSubjectPlaceholder: "Téma projektu",
    formMessageLabel: "Zpráva *", formMessagePlaceholder: "Řekněte nám, co potřebujete a jakého výsledku chcete dosáhnout.",
    formSubmit: "Odeslat poptávku", formSubmitSending: "Odesílání...",
    formErrorRequired: "Prosím vyplňte Jméno, E-mail, Obchodní referenci a Zprávu před odesláním.",
    formErrorEmail: "Prosím zadejte platnou e-mailovou adresu.",
    formErrorSend: "Odeslání zprávy selhalo. Zkuste to prosím za minutu.",
    formSuccess: "Váš požadavek byl odeslán našemu týmu.",
    aboutTitle: "O Cihadu Kucukovi",
    aboutIntro: "Konzultant obchodního rozvoje a stratég digitální prezentace se sídlem v Praze, Česká republika.",
    aboutBio: "Pomáhám firmám, aby byly snáze nalezitelné, důvěryhodné a volené. Prostřednictvím strukturované digitální prezentace, brandového pozicování a poradenství v oblasti obchodního rozvoje buduju systémy, které vytvářejí lepší první dojem a přinášejí vhodnější poptávku. SEO je součástí toho — základ, který dělá vše ostatní efektivnějším.",
    aboutExpertise: "Oblasti odbornosti",
    aboutExpertiseList: ["Rozvoj podnikání", "Digitální prezentace & přítomnost značky", "Optimalizace webu & konverze", "Strategie digitálního marketingu", "SEO & viditelnost ve vyhledávání", "Rozvoj obchodního pipeline"],
    aboutDocStudiosBridge: "Také jsem založil DOC Studios s.r.o., butikové hudební produkční studio v Praze, které dodává prémiový zvuk pro film, reklamu a hry. Toto dvojí zázemí mi dává jedinečný pohled na kreativní i obchodní stránku podnikání.",
    aboutLocation: "Praha, Česká republika",
    aboutCta: "Pojďme si promluvit o vašem podnikání",
    aboutVisitDoc: "Navštívit DOC Studios",
    blogTitle: "Postřehy a zdroje",
    blogSubtitle: "Praktické články o digitální prezentaci, rozvoji podnikání a strategii růstu.",
    blogComingSoon: "Připravují se nové články. Brzy se vraťte pro postřehy o digitální prezentaci, přítomnosti značky a strategiích obchodního růstu.",
    blogNotify: "Být upozorněn na nový obsah",
    footerTagline: "Poradenství v oblasti obchodního rozvoje, marketingu a digitální prezentace se sídlem v Praze.",
    footerRights: "Všechna práva vyhrazena.",
    servicesPackagesTitle: "Kde začít",
    servicesPackagesText: "Konkrétní balíčky s jasným rozsahem, harmonogramem a výstupy — ať už potřebujete silnější digitální prezentaci, lepší přítomnost ve vyhledávání nebo strukturovanější proces rozvoje podnikání. Každá spolupráce začíná bezplatnou konzultací.",
    servicesPackagesCta: "Zarezervovat bezplatnou konzultaci",
  },
};

const iconMap = { Search, MapPin, Layout, TrendingUp, BarChart3, Target, Calendar, Users, Mail, Shield, MessageSquare };

/* ── SHARED COMPONENTS ── */

function GrowthStructureCard({ title, points }) {
  return (
    <Card className="h-full rounded-[1.6rem] border-teal-900/15 bg-[#fff8ee]">
      <CardContent className="p-6 md:p-7">
        <h3 className="text-xl font-semibold tracking-tight text-teal-950">{title}</h3>
        <ul className="mt-5 space-y-3">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-3 text-sm leading-7 text-teal-900/85 md:text-base">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#b87333]" />
              {p}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function SiteFooter({ t, contactEmail }) {
  return (
    <footer className="border-t border-teal-900/15 bg-[#f0e4d1]">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 md:flex-row md:items-start md:justify-between md:px-10">
        <div className="max-w-sm">
          <p className="text-lg font-semibold text-teal-950">Cihad Kucuk</p>
          <p className="mt-2 text-sm leading-6 text-teal-900/70">{t.footerTagline}</p>
          <div className="mt-4 flex items-center gap-4">
            <a href="https://www.linkedin.com/in/cihadkucuk/" target="_blank" rel="noreferrer" className="text-teal-900/60 transition hover:text-teal-900" aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></a>
            <a href={`mailto:${contactEmail}`} className="text-teal-900/60 transition hover:text-teal-900" aria-label="Email"><Mail className="h-5 w-5" /></a>
          </div>
        </div>
        <div className="flex flex-col gap-0.5 text-sm text-teal-900/70">
          <Link to="/services" className="rounded-lg px-2 py-2 transition hover:text-teal-950">{t.tabServices}</Link>
          <Link to="/products" className="rounded-lg px-2 py-2 transition hover:text-teal-950">{t.tabProducts}</Link>
          <Link to="/about" className="rounded-lg px-2 py-2 transition hover:text-teal-950">{t.tabAbout}</Link>
          <Link to="/blog" className="rounded-lg px-2 py-2 transition hover:text-teal-950">{t.tabBlog}</Link>
          <Link to="/contact" className="rounded-lg px-2 py-2 transition hover:text-teal-950">{t.tabContact}</Link>
        </div>
        <div className="flex flex-col gap-2 text-sm text-teal-900/70">
          <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /><span>Prague, Czech Republic</span></div>
          <div className="flex items-center gap-2"><Mail className="h-4 w-4" /><a href={`mailto:${contactEmail}`} className="hover:text-teal-950 transition">{contactEmail}</a></div>
          <div className="mt-2 flex items-center gap-2"><Music className="h-4 w-4" /><a href="https://docstudios.eu" target="_blank" rel="noreferrer" className="hover:text-teal-950 transition">DOC Studios s.r.o.</a></div>
        </div>
      </div>
      <div className="border-t border-teal-900/10 px-6 py-4 text-center text-xs text-teal-900/50">&copy; {new Date().getFullYear()} Cihad Kucuk. {t.footerRights}</div>
    </footer>
  );
}

function NavBar({ t, lang, setLang }) {
  const location = useLocation();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const langRef = useRef(null);
  const langOptions = useMemo(() => Object.entries(localeCopy).map(([code, c]) => ({ code, codeLabel: c.langCode || code.toUpperCase(), name: c.langName || code.toUpperCase() })), []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  useEffect(() => {
    const down = (e) => { if (langRef.current && !langRef.current.contains(e.target)) setIsLangOpen(false); };
    const esc = (e) => { if (e.key === "Escape") { setIsLangOpen(false); setMobileOpen(false); } };
    document.addEventListener("mousedown", down);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", down); document.removeEventListener("keydown", esc); };
  }, []);

  const navItems = [
    { label: t.tabServices, path: "/services" },
    { label: t.tabProducts, path: "/products" },
    { label: t.tabAbout, path: "/about" },
    { label: t.tabBlog, path: "/blog" },
    { label: t.tabContact, path: "/contact" },
  ];

  return (
    <header className="border-b border-teal-900/15 bg-[#f5ebdc]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 md:px-10 md:py-4">
        <Link to="/" className="text-base font-bold text-teal-950 transition hover:text-[#b87333] md:text-lg">Cihad Kucuk</Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1.5 md:flex">
          {navItems.map((p) => (
            <Link key={p.path} to={p.path} className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${location.pathname === p.path ? "border-teal-900 bg-teal-900 text-teal-50" : "border-teal-900/20 bg-[#fff8ee] text-teal-900/80 hover:border-teal-900/35"}`}>{p.label}</Link>
          ))}
        </nav>

        {/* Right side — desktop shows DOC button + lang; mobile shows lang + hamburger */}
        <div className="flex items-center gap-2 md:gap-3">
          <a href="https://docstudios.eu" target="_blank" rel="noreferrer" className="hidden items-center rounded-2xl bg-[#b91c1c] px-4 py-2.5 text-xs font-medium text-[#fff7f7] transition hover:bg-[#991b1b] md:inline-flex"><Music className="mr-1.5 h-3.5 w-3.5" />{t.docBrandButton}</a>
          <div ref={langRef} className="relative">
            <button type="button" onClick={() => setIsLangOpen((p) => !p)} className="inline-flex items-center gap-1.5 rounded-full border border-teal-900/15 bg-[#f8ecdb]/95 px-3 py-2 text-sm text-teal-900/80 shadow-sm backdrop-blur transition hover:border-teal-900/30" aria-expanded={isLangOpen}>
              <Globe2 className="h-4 w-4" /><span className="rounded-full bg-teal-900 px-2 py-0.5 text-xs font-semibold text-teal-50">{t.langCode}</span><ChevronDown className={`h-3.5 w-3.5 transition ${isLangOpen ? "rotate-180" : ""}`} />
            </button>
            {isLangOpen && (
              <div className="absolute right-0 z-50 mt-2 w-48 rounded-2xl border border-teal-900/15 bg-[#fff8ee] p-1.5 shadow-lg">
                <ul role="listbox" className="space-y-1">
                  {langOptions.map((o) => (
                    <li key={o.code}><button type="button" onClick={() => { setLang(o.code); setIsLangOpen(false); }} className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition ${lang === o.code ? "bg-teal-900 text-teal-50" : "text-teal-900/80 hover:bg-[#f1e2ce]"}`}><span>{o.name} <span className="ml-1 rounded-full border border-current/25 px-1.5 py-0.5 text-[11px] leading-none">{o.codeLabel}</span></span>{lang === o.code && <Check className="h-4 w-4" />}</button></li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen((p) => !p)}
            className="inline-flex items-center justify-center rounded-xl border border-teal-900/15 bg-[#fff8ee] p-2.5 text-teal-900/80 transition hover:border-teal-900/30 md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="border-t border-teal-900/10 bg-[#f5ebdc] md:hidden">
          <nav className="flex flex-col gap-0.5 px-3 py-2">
            {navItems.map((p) => (
              <Link key={p.path} to={p.path} className={`rounded-xl px-4 py-3 text-sm font-medium transition ${location.pathname === p.path ? "bg-teal-900 text-teal-50" : "text-teal-900/80 hover:bg-teal-900/10"}`}>{p.label}</Link>
            ))}
          </nav>
          <div className="border-t border-teal-900/10 px-4 py-3">
            <a href="https://docstudios.eu" target="_blank" rel="noreferrer" className="inline-flex items-center rounded-2xl bg-[#b91c1c] px-4 py-2.5 text-xs font-medium text-[#fff7f7] transition hover:bg-[#991b1b]"><Music className="mr-1.5 h-3.5 w-3.5" />{t.docBrandButton}</a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ── PAGE: HOME ── */
function HomePage({ t }) {
  return (
    <main>
      <section className="relative overflow-hidden bg-[linear-gradient(170deg,#fff9ef_0%,#f4e7d2_56%,#ebd7ba_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(65%_65%_at_88%_14%,rgba(27,58,42,0.18),transparent_70%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-16 pt-20 md:px-10 md:pb-24 md:pt-28">
          <div className="max-w-2xl">
            <div className="w-fit max-w-full rounded-2xl border border-teal-900/20 bg-[#fff5e6] px-4 py-2 text-[10px] font-medium uppercase leading-relaxed tracking-[0.1em] text-teal-900/80 sm:text-xs sm:tracking-[0.16em]">{t.growthBadge}</div>
            <h1 className="mt-6 text-[clamp(2.2rem,4vw,4.2rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-teal-950">
              <span className="block">{t.growthHeroLine1}</span>
              <span className="mt-1 block">{t.growthHeroLine2Prefix} <span className="text-[#b87333]">{t.growthHeroFind}</span>,</span>
              <span className="block"><span className="text-[#b87333]">{t.growthHeroTrust}</span>, {t.growthHeroAnd} <span className="text-[#b87333]">{t.growthHeroChoose}</span>.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-teal-900/85 md:text-lg">{t.businessSupportText}</p>
            <p className="mt-3 max-w-lg text-sm leading-7 text-teal-900/75 md:text-base">{t.businessSupportLine}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/services" className="inline-flex items-center rounded-2xl bg-teal-900 px-6 py-3 text-sm font-medium text-teal-50 transition hover:bg-teal-800">{t.growthCta}<ArrowRight className="ml-2 h-4 w-4" /></Link>
              <Link to="/contact" className="inline-flex items-center rounded-2xl border border-teal-900/25 bg-[#fff8ee] px-6 py-3 text-sm font-medium text-teal-900 transition hover:border-teal-900/40">{t.contactConsultTitle}</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="border-t border-[#7a1d1d]/20 bg-[linear-gradient(165deg,#0a0a0a_0%,#120808_100%)]">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 py-10 md:flex-row md:items-center md:gap-12 md:px-10 md:py-12">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#3a0d0d] text-[#fda4af]"><Music className="h-6 w-6" /></div>
            <div><p className="text-xs font-medium uppercase tracking-[0.16em] text-[#fda4af]">{t.docBadge}</p><h2 className="text-xl font-semibold text-[#f5f5f5]">{t.docTitle}</h2></div>
          </div>
          <p className="max-w-xl text-sm leading-6 text-[#d4d4d4] md:text-base">Premium music production for film scores, advertisement music, and game soundtracks. A sister brand delivering enterprise-grade audio with structured licensing.</p>
          <a href="https://docstudios.eu" target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center rounded-2xl bg-[#b91c1c] px-5 py-3 text-sm font-medium text-[#fff7f7] transition hover:bg-[#991b1b]">{t.docCta}<ExternalLink className="ml-2 h-4 w-4" /></a>
        </div>
      </section>
    </main>
  );
}

/* ── PAGE: SERVICES ── */
function ServicesPage({ t }) {
  return (
    <main>
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-14">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-teal-900/70">{t.servicesEyebrow}</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-teal-950 md:text-4xl">{t.servicesTitle}</h1>
        <p className="mt-5 max-w-4xl text-base leading-8 text-teal-900/80 md:text-lg">{t.servicesText}</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{t.servicesCards.map((a) => <GrowthStructureCard key={a.title} title={a.title} points={a.points} />)}</div>
      </section>
      <section className="border-t border-teal-900/15 bg-[#f2e7d6]">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-14">
          <h2 className="text-3xl font-semibold tracking-tight text-teal-950 md:text-4xl">{t.servicesPackagesTitle}</h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-teal-900/80 md:text-lg">{t.servicesPackagesText}</p>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {t.servicePackages.map((pkg) => { const Icon = iconMap[pkg.icon] || Search; return (
              <Card key={pkg.title} className="h-full rounded-[1.6rem] border-teal-900/15 bg-[#fff8ee]"><CardContent className="p-6 md:p-7">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#b87333]/15 text-[#b87333]"><Icon className="h-5 w-5" /></div>
                <h3 className="text-lg font-semibold tracking-tight text-teal-950">{pkg.title}</h3>
                <p className="mt-3 text-sm leading-6 text-teal-900/80">{pkg.description}</p>
                <div className="mt-4 flex items-center gap-3"><span className="rounded-full bg-teal-900/10 px-3 py-1 text-xs font-medium text-teal-900">{pkg.tier}</span><span className="text-xs text-teal-900/60">{pkg.delivery}</span></div>
              </CardContent></Card>
            ); })}
          </div>
          <div className="mt-10 text-center"><Link to="/contact" className="inline-flex items-center rounded-2xl bg-teal-900 px-6 py-3 text-sm font-medium text-teal-50 transition hover:bg-teal-800">{t.servicesPackagesCta}<ArrowRight className="ml-2 h-4 w-4" /></Link></div>
        </div>
      </section>
      <section className="border-t border-teal-900/15 bg-[#f5ebdc]">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-14">
          <h2 className="text-3xl font-semibold tracking-tight text-teal-950 md:text-4xl">{t.deliveryTitle}</h2>
          <p className="mt-5 max-w-4xl text-base leading-8 text-teal-900/80 md:text-lg">{t.deliveryText}</p>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {t.deliverySteps.map((s, i) => (
              <Card key={s.title} className="h-full rounded-[1.4rem] border-teal-900/15 bg-[#fbf3e7]"><CardContent className="p-6">
                <div className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-teal-900 text-sm font-semibold text-teal-50">{i + 1}</div>
                <h3 className="text-lg font-semibold text-teal-950">{s.title}</h3>
                <p className="mt-3 text-sm leading-7 text-teal-900/80">{s.description}</p>
              </CardContent></Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ── PAGE: PRODUCTS ── */
function ProductsPage({ t }) {
  const [email, setEmail] = useState("");
  const [waitlistState, setWaitlistState] = useState("idle");
  const apiBase = import.meta.env.VITE_API_BASE_URL?.trim();
  const endpoint = apiBase ? `${apiBase.replace(/\/$/, "")}/api/waitlist` : "/api/waitlist";

  const onWaitlistSubmit = async (e) => {
    e.preventDefault();
    const em = email.trim();
    if (!em || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
      setWaitlistState("invalid");
      return;
    }
    setWaitlistState("sending");
    try {
      const r = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: em }) });
      const d = await r.json().catch(() => ({}));
      setWaitlistState(!r.ok || !d?.ok ? "error" : "success");
    } catch {
      setWaitlistState("error");
    }
  };

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[linear-gradient(160deg,#0d2b20_0%,#0a1f17_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(55%_55%_at_80%_20%,rgba(184,115,51,0.12),transparent_70%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-teal-400/80">{t.productsEyebrow}</p>
          <div className="mt-3 w-fit max-w-full rounded-2xl border border-[#b87333]/30 bg-[#b87333]/10 px-4 py-1.5 text-xs font-medium text-[#e8a96a]">{t.studioosHeroBadge}</div>
          <h1 className="mt-5 text-[clamp(2rem,4vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">{t.studioosHeroTitle}</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-teal-100/75 md:text-lg">{t.studioosHeroSubtitle}</p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-teal-900/40 px-4 py-2 font-mono text-sm text-teal-300">{t.studioosSubdomainNote}</div>
          <p className="mt-4 text-xs text-teal-400/60">{t.studioosForLabel}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#early-access" className="inline-flex items-center rounded-2xl bg-[#b87333] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#9d6228]">{t.studioosHeroCta}<ArrowRight className="ml-2 h-4 w-4" /></a>
            <a href="#features" className="inline-flex items-center rounded-2xl border border-teal-700/40 bg-teal-900/30 px-6 py-3 text-sm font-medium text-teal-200 transition hover:bg-teal-900/50">{t.studioosHeroSeeFeatures}</a>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="bg-[#f5ebdc]">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-16">
          <h2 className="text-3xl font-semibold tracking-tight text-teal-950 md:text-4xl">{t.studioosFeaturesTitle}</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-teal-900/75 md:text-lg">{t.studioosFeaturesText}</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {t.studioosFeatures.map((f) => {
              const Icon = iconMap[f.icon] || Search;
              return (
                <Card key={f.title} className="h-full rounded-[1.6rem] border-teal-900/15 bg-[#fff8ee]">
                  <CardContent className="p-6 md:p-7">
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#b87333]/12 text-[#b87333]"><Icon className="h-5 w-5" /></div>
                    <h3 className="text-lg font-semibold tracking-tight text-teal-950">{f.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-teal-900/75">{f.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── UI Mockups ── */}
      <section className="border-t border-teal-900/10 bg-[#eee0cc]">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-16">
          <h2 className="text-3xl font-semibold tracking-tight text-teal-950 md:text-4xl">{t.studioosMockupTitle}</h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-teal-900/70">{t.studioosMockupText}</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {t.studioosMockupScreens.map((screen) => (
              <div key={screen.id} className="overflow-hidden rounded-2xl border border-teal-900/15 bg-[#fff8ee] shadow-sm">
                {/* browser chrome bar */}
                <div className="flex items-center gap-1.5 border-b border-teal-900/10 bg-teal-950/5 px-3 py-2">
                  <span className="h-2 w-2 rounded-full bg-red-400/60" />
                  <span className="h-2 w-2 rounded-full bg-yellow-400/60" />
                  <span className="h-2 w-2 rounded-full bg-green-400/60" />
                  <span className="ml-2 h-3 flex-1 rounded bg-teal-900/10" />
                </div>
                {/* screen mockup SVG */}
                <div className="p-3">
                  {screen.id === "calendar" && (
                    <svg viewBox="0 0 220 160" className="w-full" xmlns="http://www.w3.org/2000/svg">
                      <rect width="220" height="160" fill="#f0faf8" rx="6" />
                      {/* header */}
                      <rect x="8" y="8" width="100" height="10" rx="3" fill="#0d4d4d" opacity="0.15" />
                      <rect x="170" y="8" width="42" height="10" rx="3" fill="#b87333" opacity="0.5" />
                      {/* day headers */}
                      {["Mo","Tu","We","Th","Fr","Sa","Su"].map((d, i) => (
                        <text key={d} x={14 + i * 28} y="32" fontSize="7" fill="#0d4d4d" opacity="0.5" fontFamily="sans-serif">{d}</text>
                      ))}
                      <line x1="8" y1="36" x2="212" y2="36" stroke="#0d4d4d" strokeOpacity="0.08" />
                      {/* calendar grid rows */}
                      {[0,1,2,3].map((row) => (
                        <g key={row}>
                          {[0,1,2,3,4,5,6].map((col) => (
                            <rect key={col} x={10 + col * 28} y={40 + row * 28} width="24" height="22" rx="4"
                              fill={row === 1 && col === 2 ? "#b87333" : row === 2 && col === 4 ? "#b87333" : "#0d4d4d"}
                              opacity={row === 1 && col === 2 ? "0.7" : row === 2 && col === 4 ? "0.5" : "0.05"} />
                          ))}
                        </g>
                      ))}
                      {/* event blocks */}
                      <rect x="10" y="44" width="52" height="8" rx="2" fill="#0d4d4d" opacity="0.2" />
                      <rect x="66" y="72" width="52" height="8" rx="2" fill="#b87333" opacity="0.4" />
                      <rect x="122" y="100" width="52" height="8" rx="2" fill="#0d4d4d" opacity="0.2" />
                    </svg>
                  )}
                  {screen.id === "clients" && (
                    <svg viewBox="0 0 220 160" className="w-full" xmlns="http://www.w3.org/2000/svg">
                      <rect width="220" height="160" fill="#f0faf8" rx="6" />
                      {/* search bar */}
                      <rect x="8" y="8" width="140" height="12" rx="6" fill="#0d4d4d" opacity="0.08" />
                      <rect x="155" y="8" width="57" height="12" rx="6" fill="#b87333" opacity="0.4" />
                      {/* column headers */}
                      <text x="12" y="36" fontSize="6" fill="#0d4d4d" opacity="0.4" fontFamily="sans-serif">NAME</text>
                      <text x="82" y="36" fontSize="6" fill="#0d4d4d" opacity="0.4" fontFamily="sans-serif">LAST VISIT</text>
                      <text x="148" y="36" fontSize="6" fill="#0d4d4d" opacity="0.4" fontFamily="sans-serif">STATUS</text>
                      <line x1="8" y1="40" x2="212" y2="40" stroke="#0d4d4d" strokeOpacity="0.1" />
                      {/* rows */}
                      {[0,1,2,3,4,5].map((i) => (
                        <g key={i}>
                          <circle cx="18" cy={52 + i * 18} r="6" fill="#0d4d4d" opacity="0.12" />
                          <rect x="28" y={47 + i * 18} width="46" height="5" rx="2" fill="#0d4d4d" opacity="0.15" />
                          <rect x="28" y={54 + i * 18} width="28" height="4" rx="2" fill="#0d4d4d" opacity="0.08" />
                          <rect x="84" y={49 + i * 18} width="38" height="5" rx="2" fill="#0d4d4d" opacity="0.10" />
                          <rect x="150" y={48 + i * 18} width="30" height="8" rx="4"
                            fill={i % 3 === 0 ? "#b87333" : "#0d4d4d"}
                            opacity={i % 3 === 0 ? "0.45" : "0.10"} />
                        </g>
                      ))}
                    </svg>
                  )}
                  {screen.id === "inbox" && (
                    <svg viewBox="0 0 220 160" className="w-full" xmlns="http://www.w3.org/2000/svg">
                      <rect width="220" height="160" fill="#f0faf8" rx="6" />
                      {/* sidebar */}
                      <rect x="0" y="0" width="60" height="160" rx="6" fill="#0d4d4d" opacity="0.06" />
                      {/* sidebar tabs */}
                      {["All","Instagram","Forms","Walk-in"].map((tab, i) => (
                        <g key={tab}>
                          <rect x="4" y={10 + i * 22} width="52" height="16" rx="4"
                            fill={i === 0 ? "#0d4d4d" : "transparent"}
                            opacity={i === 0 ? "0.15" : "1"} />
                          <text x="12" y={22 + i * 22} fontSize="6.5" fill="#0d4d4d" opacity={i === 0 ? "0.8" : "0.45"} fontFamily="sans-serif">{tab}</text>
                        </g>
                      ))}
                      {/* message list */}
                      {[0,1,2,3,4].map((i) => (
                        <g key={i}>
                          <circle cx="76" cy={18 + i * 28} r="7" fill="#0d4d4d" opacity="0.12" />
                          <rect x="88" y={12 + i * 28} width="50" height="5" rx="2" fill="#0d4d4d" opacity="0.18" />
                          <rect x="88" y={19 + i * 28} width="80" height="4" rx="2" fill="#0d4d4d" opacity="0.09" />
                          <rect x="88" y={25 + i * 28} width="60" height="3" rx="1.5" fill="#0d4d4d" opacity="0.07" />
                          {i === 0 && <circle cx="208" cy="14" r="4" fill="#b87333" opacity="0.7" />}
                        </g>
                      ))}
                    </svg>
                  )}
                  {screen.id === "analytics" && (
                    <svg viewBox="0 0 220 160" className="w-full" xmlns="http://www.w3.org/2000/svg">
                      <rect width="220" height="160" fill="#f0faf8" rx="6" />
                      {/* KPI cards */}
                      {[0,1,2].map((i) => (
                        <g key={i}>
                          <rect x={8 + i * 68} y="8" width="60" height="32" rx="6" fill="#0d4d4d" opacity="0.07" />
                          <rect x={14 + i * 68} y="14" width="28" height="5" rx="2" fill="#0d4d4d" opacity="0.12" />
                          <rect x={14 + i * 68} y="22" width="38" height="8" rx="3" fill={i === 1 ? "#b87333" : "#0d4d4d"} opacity={i === 1 ? "0.45" : "0.18"} />
                        </g>
                      ))}
                      {/* bar chart */}
                      <text x="8" y="56" fontSize="6" fill="#0d4d4d" opacity="0.35" fontFamily="sans-serif">REVENUE</text>
                      <line x1="8" y1="120" x2="212" y2="120" stroke="#0d4d4d" strokeOpacity="0.1" />
                      {[12,28,20,38,30,44,26,50,36,42,54,46].map((h, i) => (
                        <rect key={i} x={10 + i * 16} y={120 - h} width="12" height={h} rx="2"
                          fill={i === 10 ? "#b87333" : "#0d4d4d"}
                          opacity={i === 10 ? "0.6" : "0.15"} />
                      ))}
                      {/* line chart hint */}
                      <polyline
                        points="10,118 26,105 42,110 58,92 74,98 90,80 106,88 122,72 138,78 154,62 170,68 186,54"
                        fill="none" stroke="#b87333" strokeWidth="1.5" strokeOpacity="0.5" strokeLinejoin="round" />
                      {/* legend */}
                      <rect x="8" y="130" width="8" height="4" rx="1" fill="#0d4d4d" opacity="0.2" />
                      <text x="18" y="134" fontSize="5.5" fill="#0d4d4d" opacity="0.4" fontFamily="sans-serif">Bookings</text>
                      <rect x="68" y="130" width="8" height="4" rx="1" fill="#b87333" opacity="0.5" />
                      <text x="78" y="134" fontSize="5.5" fill="#0d4d4d" opacity="0.4" fontFamily="sans-serif">Revenue</text>
                    </svg>
                  )}
                </div>
                <div className="border-t border-teal-900/10 px-4 py-2.5">
                  <p className="text-xs font-medium text-teal-900/70">{screen.label}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 flex items-start gap-2 rounded-xl border border-teal-900/10 bg-teal-900/5 px-4 py-3 text-xs leading-5 text-teal-800/60">
            <span className="mt-0.5 shrink-0 opacity-60">ⓘ</span>
            {t.studioosMockupDisclaimer}
          </p>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="border-t border-teal-900/10 bg-[#f0e4d1]">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-16">
          <h2 className="text-3xl font-semibold tracking-tight text-teal-950 md:text-4xl">{t.studioosHowTitle}</h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-teal-900/70">{t.studioosHowText}</p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {t.studioosHowSteps.map((s) => (
              <Card key={s.step} className="h-full rounded-[1.6rem] border-teal-900/15 bg-[#fff8ee]">
                <CardContent className="p-6 md:p-7">
                  <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-teal-900 text-sm font-bold text-teal-50">{s.step}</div>
                  <h3 className="text-lg font-semibold text-teal-950">{s.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-teal-900/75">{s.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mobile ── */}
      <section className="border-t border-teal-900/10 bg-[#f5ebdc]">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-12">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-teal-900 text-teal-50"><Smartphone className="h-8 w-8" /></div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-teal-950 md:text-3xl">{t.studioosMobileTitle}</h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-teal-900/75">{t.studioosMobileText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Early Access ── */}
      <section id="early-access" className="bg-[linear-gradient(160deg,#0d2b20_0%,#0a1f17_100%)]">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center md:px-10 md:py-20">
          <div className="inline-block rounded-full border border-[#b87333]/40 bg-[#b87333]/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#e8a96a]">{t.studioosEarlyBadge}</div>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white md:text-4xl">{t.studioosEarlyTitle}</h2>
          <p className="mt-4 text-base leading-7 text-teal-100/70">{t.studioosEarlyText}</p>
          <form onSubmit={onWaitlistSubmit} noValidate className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (waitlistState !== "idle") setWaitlistState("idle"); }}
              placeholder={t.studioosEmailPlaceholder}
              className="w-full rounded-2xl border border-teal-700/40 bg-teal-900/30 px-4 py-3 text-base text-white placeholder-teal-400/50 outline-none transition focus:border-[#b87333]/60 sm:w-72 sm:text-sm"
              disabled={waitlistState === "sending" || waitlistState === "success"}
            />
            <button
              type="submit"
              disabled={waitlistState === "sending" || waitlistState === "success"}
              className="inline-flex items-center justify-center rounded-2xl bg-[#b87333] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#9d6228] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {waitlistState === "sending" ? t.studioosEmailSending : t.studioosEmailCta}
              {waitlistState !== "sending" && <ArrowRight className="ml-2 h-4 w-4" />}
            </button>
          </form>
          {waitlistState === "success" && <p className="mt-4 text-sm font-medium text-teal-300">{t.studioosEmailSuccess}</p>}
          {waitlistState === "invalid" && <p className="mt-4 text-sm text-[#fca5a5]">{t.studioosEmailErrorInvalid}</p>}
          {waitlistState === "error" && <p className="mt-4 text-sm text-[#fca5a5]">{t.studioosEmailErrorSend}</p>}
          <p className="mt-6 text-xs text-teal-500/70">{t.studioosPricingNote}</p>
        </div>
      </section>
    </main>
  );
}

/* ── PAGE: ABOUT ── */
function AboutPage({ t, contactEmail }) {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-14">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-teal-950 md:text-4xl">{t.aboutTitle}</h1>
        <p className="mt-5 text-lg leading-8 text-teal-900/85">{t.aboutIntro}</p>
        <p className="mt-4 text-base leading-8 text-teal-900/75">{t.aboutBio}</p>
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-teal-950">{t.aboutExpertise}</h2>
          <div className="mt-4 flex flex-wrap gap-3">{t.aboutExpertiseList.map((s) => <span key={s} className="rounded-full border border-teal-900/20 bg-[#fff8ee] px-4 py-2 text-sm font-medium text-teal-900/80">{s}</span>)}</div>
        </div>
        <div className="mt-10 rounded-2xl border border-[#7a1d1d]/20 bg-[linear-gradient(165deg,#0f0f0f_0%,#150a0a_100%)] p-6 md:p-8">
          <div className="mb-4 flex items-center gap-3"><Music className="h-5 w-5 text-[#fda4af]" /><span className="text-sm font-medium uppercase tracking-[0.14em] text-[#fda4af]">DOC Studios s.r.o.</span></div>
          <p className="text-sm leading-7 text-[#d4d4d4]">{t.aboutDocStudiosBridge}</p>
          <a href="https://docstudios.eu" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center text-sm font-medium text-[#fda4af] transition hover:text-white">{t.aboutVisitDoc}<ExternalLink className="ml-2 h-4 w-4" /></a>
        </div>
        <div className="mt-10 flex items-center gap-4 text-sm text-teal-900/70"><MapPin className="h-4 w-4" /><span>{t.aboutLocation}</span></div>
        <div className="mt-8"><Link to="/contact" className="inline-flex items-center rounded-2xl bg-teal-900 px-6 py-3 text-sm font-medium text-teal-50 transition hover:bg-teal-800">{t.aboutCta}<ArrowRight className="ml-2 h-4 w-4" /></Link></div>
      </div>
    </main>
  );
}

/* ── PAGE: BLOG ── */
function BlogPage({ t }) {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-14">
      <h1 className="text-3xl font-semibold tracking-tight text-teal-950 md:text-4xl">{t.blogTitle}</h1>
      <p className="mt-4 max-w-3xl text-base leading-8 text-teal-900/80 md:text-lg">{t.blogSubtitle}</p>
      <div className="mt-12 rounded-2xl border border-teal-900/10 bg-[#fff8ee] p-8 text-center md:p-12">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-900/10"><TrendingUp className="h-7 w-7 text-teal-900/50" /></div>
        <p className="text-base text-teal-900/70">{t.blogComingSoon}</p>
        <Link to="/contact" className="mt-6 inline-flex items-center text-sm font-medium text-teal-900 transition hover:text-[#b87333]">{t.blogNotify}<ArrowRight className="ml-2 h-4 w-4" /></Link>
      </div>
    </main>
  );
}

/* ── PAGE: CONTACT ── */
function ContactPage({ t, contactEmail }) {
  const [form, setForm] = useState({ name: "", email: "", businessReference: "", subject: "", message: "", website: "" });
  const [feedback, setFeedback] = useState({ type: "idle", message: "" });
  const [sending, setSending] = useState(false);
  const apiBase = import.meta.env.VITE_API_BASE_URL?.trim();
  const endpoint = apiBase ? `${apiBase.replace(/\/$/, "")}/api/contact` : "/api/contact";
  const onChange = (e) => { setForm((p) => ({ ...p, [e.target.name]: e.target.value })); if (feedback.message) setFeedback({ type: "idle", message: "" }); };
  const onSubmit = async (e) => {
    e.preventDefault();
    const n = form.name.trim(), em = form.email.trim(), br = form.businessReference.trim(), m = form.message.trim(), s = form.subject.trim();
    if (!n || !em || !br || !m) { setFeedback({ type: "error", message: t.formErrorRequired }); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) { setFeedback({ type: "error", message: t.formErrorEmail }); return; }
    setSending(true);
    try {
      const r = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: n, email: em, businessReference: br, subject: s, message: m, website: form.website, language: "en" }) });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d?.ok) { setFeedback({ type: "error", message: t.formErrorSend }); return; }
      setFeedback({ type: "success", message: t.formSuccess });
      setForm({ name: "", email: "", businessReference: "", subject: "", message: "", website: "" });
    } catch { setFeedback({ type: "error", message: t.formErrorSend }); } finally { setSending(false); }
  };
  const inp = "rounded-xl border border-teal-900/20 bg-[#fffcf6] px-3 py-2.5 text-base leading-snug text-teal-950 outline-none transition focus:border-teal-900/45 md:text-sm";
  return (
    <main>
      <section className="bg-[#f2e7d6]">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-2 md:px-10 md:py-14">
          <div className="max-w-xl">
            <h1 className="text-3xl font-semibold tracking-tight text-teal-950 md:text-4xl">{t.contactConsultTitle}</h1>
            <ul className="mt-5 space-y-3 text-base leading-8 text-teal-900/80 md:text-lg">
              {[t.contactPoint1, t.contactPoint2, t.contactPoint3].map((p) => <li key={p} className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#b87333]" />{p}</li>)}
            </ul>
            <p className="mt-6 text-sm text-teal-900/75">{t.contactEmailLabel} <a href={`mailto:${contactEmail}`} className="font-medium text-teal-950 underline decoration-teal-900/40 underline-offset-4">{contactEmail}</a></p>
            <p className="mt-3 text-sm text-teal-900/75">{t.contactReferenceHelp}</p>
          </div>
          <Card className="rounded-[1.6rem] border-teal-900/15 bg-[#fff8ee]"><CardContent className="p-6 md:p-7">
            <form className="space-y-4" onSubmit={onSubmit} noValidate>
              <input type="text" name="website" value={form.website} onChange={onChange} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium text-teal-950">{t.formNameLabel}<input name="name" value={form.name} onChange={onChange} className={inp} placeholder={t.formNamePlaceholder} autoComplete="name" required /></label>
                <label className="flex flex-col gap-2 text-sm font-medium text-teal-950">{t.formEmailLabel}<input type="email" name="email" value={form.email} onChange={onChange} className={inp} placeholder={t.formEmailPlaceholder} autoComplete="email" required /></label>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium text-teal-950">{t.formBusinessReferenceLabel}<input name="businessReference" value={form.businessReference} onChange={onChange} className={inp} placeholder={t.formBusinessReferencePlaceholder} required /></label>
                <label className="flex flex-col gap-2 text-sm font-medium text-teal-950">{t.formSubjectLabel}<input name="subject" value={form.subject} onChange={onChange} className={inp} placeholder={t.formSubjectPlaceholder} /></label>
              </div>
              <label className="flex flex-col gap-2 text-sm font-medium text-teal-950">{t.formMessageLabel}<textarea name="message" value={form.message} onChange={onChange} className={`min-h-36 ${inp}`} placeholder={t.formMessagePlaceholder} required /></label>
              {feedback.message && <p className={`text-sm ${feedback.type === "error" ? "text-[#b91c1c]" : "text-teal-900"}`}>{feedback.message}</p>}
              <button type="submit" disabled={sending} className="inline-flex items-center rounded-2xl bg-teal-900 px-5 py-3 text-sm font-medium text-teal-50 transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-70">{sending ? t.formSubmitSending : t.formSubmit}<ArrowRight className="ml-2 h-4 w-4" /></button>
            </form>
          </CardContent></Card>
        </div>
      </section>
    </main>
  );
}

/* ── APP ROOT ── */
export default function App() {
  const [lang, setLang] = useState("en");
  const t = useMemo(() => localeCopy[lang], [lang]);
  const location = useLocation();
  const contactEmail = "hello@cihadkucuk.com";
  const isHome = location.pathname === "/";

  return (
    <div className="flex min-h-screen flex-col bg-transparent text-teal-950">
      {!isHome && <NavBar t={t} lang={lang} setLang={setLang} />}
      {isHome && <div className="relative z-50 flex justify-end px-4 pt-4 sm:px-5 md:fixed md:right-8 md:top-6 md:px-0 md:pt-0"><HomeLangSwitcher lang={lang} setLang={setLang} t={t} /></div>}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage t={t} />} />
          <Route path="/services" element={<ServicesPage t={t} />} />
          <Route path="/products" element={<ProductsPage t={t} />} />
          <Route path="/about" element={<AboutPage t={t} contactEmail={contactEmail} />} />
          <Route path="/blog" element={<BlogPage t={t} />} />
          <Route path="/contact" element={<ContactPage t={t} contactEmail={contactEmail} />} />
          <Route path="*" element={<HomePage t={t} />} />
        </Routes>
      </div>
      <SiteFooter t={t} contactEmail={contactEmail} />
    </div>
  );
}

function HomeLangSwitcher({ lang, setLang, t }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const opts = useMemo(() => Object.entries(localeCopy).map(([c, v]) => ({ code: c, codeLabel: v.langCode || c.toUpperCase(), name: v.langName || c.toUpperCase() })), []);
  useEffect(() => {
    const d = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const k = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", d); document.addEventListener("keydown", k);
    return () => { document.removeEventListener("mousedown", d); document.removeEventListener("keydown", k); };
  }, []);
  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen((p) => !p)} className="inline-flex items-center gap-2 rounded-full border border-teal-900/15 bg-[#f8ecdb]/95 px-3.5 py-2 text-sm text-teal-900/80 shadow-sm backdrop-blur transition hover:border-teal-900/30" aria-expanded={open}>
        <Globe2 className="h-4 w-4" /><span className="hidden sm:inline">{t.langLabel}</span><span className="rounded-full bg-teal-900 px-2 py-0.5 text-xs font-semibold text-teal-50">{t.langCode}</span><ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="absolute right-0 z-50 mt-2 w-48 rounded-2xl border border-teal-900/15 bg-[#fff8ee] p-1.5 shadow-lg"><ul role="listbox" className="space-y-1">{opts.map((o) => <li key={o.code}><button type="button" onClick={() => { setLang(o.code); setOpen(false); }} className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition ${lang === o.code ? "bg-teal-900 text-teal-50" : "text-teal-900/80 hover:bg-[#f1e2ce]"}`}><span>{o.name} <span className="ml-1 rounded-full border border-current/25 px-1.5 py-0.5 text-[11px]">{o.codeLabel}</span></span>{lang === o.code && <Check className="h-4 w-4" />}</button></li>)}</ul></div>}
    </div>
  );
}

