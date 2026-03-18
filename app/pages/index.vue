<!-- app/pages/index.vue -->
<template>
  <v-container>
    <HomeHero />
    <HomeTrustFeatures />
    <!-- <HomeCategorySection /> -->
    <VideoShowcase />
    <HomeFeaturedSection />

    <v-row v-if="pending">
      <v-col v-for="n in 8" :key="n" cols="12" sm="6" md="4" lg="3">
        <v-skeleton-loader type="card" />
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col>
        <h1 class="text-h4 py-6 text-yellow-darken-4">Premium Saree & Lungi</h1>
        <LoadMore />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import LoadMore from "~/components/product/loadMore.vue";

const pending = ref(false);

const productsStore = useProductsStore();
productsStore.setProducts();
// SEO Meta
useSeoMeta({
  title:
    "shareelungi.shop | এনায়েতপুরের খামারগ্রাম, তামাই, শাহজাদপুর এর লুঙ্গি ও শাড়ি",
  description:
    "সিরাজগঞ্জের এনায়েতপুরের ঐতিহ্যবাহী তাঁতের শাড়ি এবং ফ্যাক্টরির অরিজিনাল লুঙ্গি অনলাইনে কিনুন। সারা বাংলাদেশে দ্রুত ক্যাশ অন ডেলিভারি সুবিধা।",

  // Open Graph (Facebook, WhatsApp, LinkedIn)
  ogType: "website",
  ogUrl: "https://shareelungi.shop",
  ogTitle: "shareelungi.shop | খাঁটি দেশি শাড়ি ও লুঙ্গির বিশ্বস্ত শপ",
  ogDescription:
    "সিরাজগঞ্জের এনায়েতপুরের ঐতিহ্যবাহী তাঁতের শাড়ি এবং লুঙ্গির সেরা কালেকশন। আজই অর্ডার করুন, পৌঁছে যাবে আপনার ঠিকানায়!",
  ogImage: "https://shareelungi.shop/Og.jpg", // এখানে আপনার ওয়েবসাইটের একটি সুন্দর ব্যানারের লিংক দিবেন
  ogImageWidth: 1200, // সোশ্যাল মিডিয়ায় শেয়ারের জন্য স্ট্যান্ডার্ড সাইজ
  ogImageHeight: 630,

  // Twitter Card
  twitterCard: "summary_large_image",
  twitterTitle:
    "shareelungi.shop | এনায়েতপুরের খামারগ্রাম, তামাই, শাহজাদপুর এর লুঙ্গি ও শাড়ি",
  twitterDescription:
    "সিরাজগঞ্জের এনায়েতপুরের ঐতিহ্যবাহী তাঁতের শাড়ি এবং অরিজিনাল লুঙ্গি অনলাইনে কিনুন।",
  twitterImage: "https://shareelungi.shop/Og.jpg",

  // Theme Color (মোবাইল ব্রাউজারের উপরের বারের রঙ আপনার ব্র্যান্ড কালার Crimson Red হবে)
  themeColor: "#D32F2F",
});
useHead({
  link: [{ rel: "canonical", href: "https://shareelungi.shop" }],
  script: [
    // WebSite Search Schema (গুগলে সার্চ করলে ওয়েবসাইটের নিচে সার্চবার দেখানোর জন্য)
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "shareelungi.shop",
        url: "https://shareelungi.shop",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://shareelungi.shop/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      }),
    },
    // Local Business / Organization Schema (গুগল ম্যাপ ও ব্র্যান্ড ট্রাস্টের জন্য)
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "shareelungi.shop",
        url: "https://shareelungi.shop",
        logo: "https://shareelungi.shop/logo.jpg",
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          areaServed: "BD",
          availableLanguage: ["Bengali", "English"],
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "Hazi Abdul Kuddus Super Market, Betil Hatkhola",
          addressLocality: "Enayetpur",
          addressRegion: "Sirajganj",
          addressCountry: "BD",
        },
      }),
    },
  ],
});
</script>
