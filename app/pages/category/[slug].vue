<template>
  <v-container>
    <!-- ১. ব্রেডক্রাম্বস -->
    <v-breadcrumbs :items="breadcrumbs" class="px-0 text-caption mb-1">
      <template #divider>
        <v-icon icon="mdi-chevron-right" size="x-small" />
      </template>
    </v-breadcrumbs>
    <!-- ২. ক্যাটাগরি ডাটা থাকলে দেখাবে -->
    <div v-if="category">
      <header class="mb-1">
        <h1 class="text-h4 font-weight-bold text-capitalize">
          {{ decodeHtml(category.name) }}
        </h1>
        <div v-if="category.description" class="text-body-1 text-grey-darken-1">
          <!-- WooCommerce ডেসক্রিপশনে HTML থাকে তাই v-html নিরাপদ -->
          <div>{{ sanitizeHtml(category.description) }}</div>
        </div>
        <v-divider class="mt-4" />
      </header>

      <!-- ৩. প্রোডাক্ট গ্রিড -->
      <v-row v-if="categoryProducts && categoryProducts.length > 0">
        <v-col
          v-for="product in categoryProducts"
          :key="product.id"
          cols="6"
          sm="6"
          md="4"
          lg="3"
        >
          <ProductCard :product="product" @add-to-cart="cartStore.addToCart" />
        </v-col>
      </v-row>

      <!-- ৪. যদি প্রোডাক্ট না থাকে -->
      <v-sheet v-else class="text-center py-16" rounded="lg" border>
        <v-icon
          icon="mdi-sofa-outline"
          size="64"
          color="grey-lighten-1"
          class="mb-4"
        />
        <div class="text-h6 text-grey">No products found in this category.</div>
        <v-btn color="primary" variant="flat" class="mt-4" to="/shop"
          >Back to Shop</v-btn
        >
      </v-sheet>
    </div>

    <!-- ৫. লোডিং স্টেট (যখন ডাটা এখনো আসেনি) -->
    <v-row v-else-if="pending">
      <v-col v-for="n in 8" :key="n" cols="12" sm="6" md="4" lg="3">
        <v-skeleton-loader type="card, text" />
      </v-col>
    </v-row>

    <!-- ৬. এরর বা নট ফাউন্ড স্টেট -->
    <v-alert v-else type="error" variant="tonal" class="mt-10">
      Category not found or failed to load.
    </v-alert>
  </v-container>
</template>

<script setup>
import { sanitizeHtml } from "~/utils/sanitizeHtml";

const route = useRoute();
const categoriesStore = useCategoriesStore();
const productsStore = useProductsStore();
const cartStore = useCartStore();

// ১. Master Data Fetching (SSR & Client Safe)
// useAsyncData নিশ্চিত করবে যে সার্ভার সমস্ত ডেটা লোড না হওয়া পর্যন্ত অপেক্ষা করবে
const { data: pageData, pending } = await useAsyncData(
  `category-page-${route.params.slug}`,
  async () => {
    // প্রোডাক্ট স্টোরে না থাকলে আগে প্রোডাক্ট লোড হওয়ার জন্য অপেক্ষা করুন
    if (productsStore.getProducts.length === 0) {
      await productsStore.setProducts();
    }

    let currentCategory = null;

    // ক্যাটাগরি স্টোর থেকে আনা
    if (categoriesStore.getCategories.length > 0) {
      currentCategory = categoriesStore.getCategoriesBySlug(route.params.slug);
    } else {
      // যদি পিনিয়া খালি থাকে (যেমন ডাইরেক্ট লিংক ভিজিট করলে), সার্ভার থেকে ক্যাটাগরি আনবে
      // (আপনার useCategory কম্পোজেবলের ওপর ভিত্তি করে)
      const { category: serverCategory } = await useCategory(route.params.slug);
      currentCategory = serverCategory.value || serverCategory;
    }

    // প্রোডাক্ট ফিল্টারিং
    let filteredProducts = [];
    if (currentCategory && currentCategory.id) {
      filteredProducts = productsStore.getProductsByCategory(
        currentCategory.id,
      );
    }

    // 🔥 Payload Error Fix (ম্যাজিক ট্রিক)
    // এটি সমস্ত Proxy এবং হিডেন API ডেটা রিমুভ করে Nuxt-কে পিওর ডেটা দিবে
    return JSON.parse(
      JSON.stringify({
        category: currentCategory,
        products: filteredProducts,
      }),
    );
  },
  {
    // ডেটা পরিবর্তন হলে অটোমেটিক আপডেট হবে
    watch: [() => route.params.slug],
  },
);

// ২. টেমপ্লেটে ব্যবহারের জন্য Computed ভ্যারিয়েবল (Reactively Bound)
const category = computed(() => pageData.value?.category || null);
const categoryProducts = computed(() => pageData.value?.products || []);

// ৩. ব্রেডক্রাম্বস ডাটা (নিখুঁতভাবে category.value চেক করে)
const breadcrumbs = computed(() => [
  { title: "Home", disabled: false, to: "/" },
  { title: "Categories", disabled: false, to: "/category" },
  {
    title: category.value ? decodeHtml(category.value.name) : "Loading...",
    disabled: true,
  },
]);

// ৪. HTML Entity ডিকোডিং ফাংশন
function decodeHtml(html) {
  if (!html) return "";
  if (import.meta.server) return html.replace(/&amp;/g, "&");
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}
// ৫. SEO Meta Tags
useSeoMeta({
  title: () =>
    category.value
      ? `${category.value.name} কালেকশন | shareelungi.shop`
      : "লোড হচ্ছে... | shareelungi.shop",

  description: () =>
    category.value?.description?.replace(/<[^>]*>?/gm, "").trim() ||
    (category.value
      ? `shareelungi.shop-এ ${category.value.name}-এর নতুন এবং এক্সক্লুসিভ কালেকশন দেখুন। সেরা দামে অরিজিনাল দেশি পোশাক ঘরে বসেই অর্ডার করুন।`
      : "shareelungi.shop-এ আমাদের এক্সক্লুসিভ কালেকশন দেখুন।"),

  ogTitle: () =>
    category.value
      ? `${category.value.name} কালেকশন কিনুন | shareelungi.shop`
      : "shareelungi.shop",

  ogDescription: () =>
    category.value?.description?.replace(/<[^>]*>?/gm, "").trim() ||
    (category.value
      ? `shareelungi.shop-এ ${category.value.name}-এর নতুন এবং এক্সক্লুসিভ কালেকশন দেখুন।`
      : "shareelungi.shop-এ আমাদের এক্সক্লুসিভ কালেকশন দেখুন।"),

  // Optional Chaining (?.) যুক্ত করা হয়েছে যেন ছবি না থাকলে সাইট ক্র্যাশ না করে
  ogImage: () =>
    category.value?.image?.src || "https://shareelungi.shop/images/hero2.jpg",
  ogImageAlt: () => category.value?.name || "shareelungi.shop category image",
  ogImageHeight: 600,
  ogImageWidth: 600,

  // X (Twitter) বা অন্যান্য প্ল্যাটফর্মের সোশ্যাল শেয়ারিংয়ের জন্য
  twitterCard: "summary_large_image",
  twitterTitle: () =>
    category.value
      ? `${category.value.name} কালেকশন | shareelungi.shop`
      : "shareelungi.shop",
  twitterDescription: () =>
    category.value?.description?.replace(/<[^>]*>?/gm, "").trim() ||
    (category.value
      ? `shareelungi.shop-এ ${category.value.name}-এর নতুন কালেকশন দেখুন।`
      : ""),
  twitterImage: () =>
    category.value?.image?.src || "https://shareelungi.shop/images/hero2.jpg",
});
</script>

<style scoped>
.v-breadcrumbs :deep(.v-breadcrumbs-item--disabled) {
  opacity: 1;
  color: rgb(var(--v-theme-primary));
  font-weight: 600;
}
</style>
