<template>
  <v-container v-if="product" class="py-2 py-md-2">
    <!-- ১. ব্রেডক্রাম্বস (Breadcrumbs) -->
    <v-breadcrumbs :items="breadcrumbs" class="px-0 text-caption mb-4">
      <template #divider>
        <v-icon icon="mdi-chevron-right" size="x-small" />
      </template>
    </v-breadcrumbs>

    <v-row>
      <!-- ২. বাম পাশ: ইমেজ গ্যালারি (ভার্টিক্যাল থাম্বনেইল + মেইন ইমেজ) -->
      <v-col cols="12" md="6">
        <v-card variant="flat" border class="position-relative overflow-hidden">
          <!-- Sale Badge -->
          <v-chip
            v-if="product.on_sale"
            color="primary"
            class="position-absolute ma-4 font-weight-bold"
            style="z-index: 2; top: 0; left: 0"
            size="small"
          >
            Sale!
          </v-chip>

          <!-- Gallery Container -->
          <div class="product-gallery">
            <!-- Left Vertical Thumbnails -->
            <div
              v-if="product?.images?.length"
              class="product-gallery-thumbnails"
            >
              <v-hover
                v-for="(img, i) in product.images"
                :key="i"
                v-slot="{ isHovering, props }"
              >
                <v-card
                  v-bind="props"
                  border
                  :elevation="
                    isHovering ||
                    selectedImage === img.src ||
                    (!selectedImage && i === 0)
                      ? 4
                      : 0
                  "
                  class="cursor-pointer product-gallery-thumbnail-card"
                  :class="{
                    'product-gallery-thumbnail-card--active':
                      selectedImage === img.src || (!selectedImage && i === 0),
                  }"
                  @click="selectedImage = img.src"
                >
                  <NuxtImg
                    :src="img.src"
                    width="64"
                    height="64"
                    aspect-ratio="1"
                    fit="cover"
                    format="webp"
                    class="w-100 h-100"
                    loading="lazy"
                  />
                </v-card>
              </v-hover>
            </div>

            <!-- Main Image with ZOOM Effect -->
            <div class="product-gallery-main">
              <div
                class="position-relative h-100 overflow-hidden"
                style="cursor: crosshair"
                @mousemove="onMouseMove"
                @mouseleave="onMouseLeave"
              >
                <GlobalLoader v-show="imageLoading" />

                <NuxtImg
                  v-if="product?.images?.length"
                  :src="selectedImage || product.images[0]?.src"
                  :alt="product.name"
                  preload
                  fetchpriority="high"
                  loading="eager"
                  format="webp"
                  width="600"
                  height="600"
                  fit="cover"
                  class="bg-grey-lighten-4 w-100 h-100 transition-fade product-gallery-main-image"
                  :placeholder="[50, 50, 75, 5]"
                  :style="zoomStyle"
                  style="transition: transform 0.1s ease-out"
                />
              </div>
            </div>
          </div>
        </v-card>
      </v-col>

      <!-- ৩. ডান পাশ: প্রোডাক্ট ইনফো -->
      <v-col cols="12" md="6" class="ps-md-10">
        <h4 class="text-h5 mb-2">{{ product?.name }}</h4>
        <!-- প্রাইস সেকশন -->
        <div class="d-flex align-center mb-4">
          <span
            v-if="product?.on_sale"
            class="text-h6 text-grey-darken-1 text-decoration-line-through mr-2"
          >
            ৳{{ product?.regular_price }}
          </span>
          <span class="text-h5 text-primary font-weight-black">
            ৳{{ product?.price }}
          </span>
        </div>
        <p class="text-body-1 text-grey-darken-2 my-6">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="product?.short_description" />
        </p>

        <!-- কালার সোয়াচেস -->
        <div v-if="colorOptions.length" class="mb-6">
          <p
            class="text-caption text-grey-darken-2 mb-2 text-uppercase"
            style="letter-spacing: 0.16em"
          >
            Color
          </p>
          <div class="d-flex flex-wrap gap-3">
            <button
              v-for="color in colorOptions"
              :key="color.value"
              type="button"
              class="color-swatch"
              :class="{
                'color-swatch--active': selectedColor === color.value,
              }"
              :style="{ '--swatch-color': color.cssColor }"
              :title="color.label"
              @click="selectedColor = color.value"
            />
          </div>
        </div>

        <!-- কোয়ান্টিটি ও অ্যাকশন বাটন -->
        <div class="mb-6">
          <div class="d-flex align-center mb-4 flex-wrap gap-4">
            <v-sheet
              border
              rounded
              class="d-flex align-center px-2"
              height="48"
            >
              <v-btn
                icon="mdi-minus"
                variant="text"
                size="small"
                @click="quantity > 1 ? quantity-- : null"
              />
              <span class="px-4 font-weight-bold">{{ quantity }}</span>
              <v-btn
                icon="mdi-plus"
                variant="text"
                size="small"
                @click="quantity++"
              />
            </v-sheet>
          </div>

          <div class="product-actions">
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-btn
                  color="#FFB300"
                  size="large"
                  prepend-icon="mdi-cart"
                  class="product-action-btn product-action-btn--primary"
                  flat
                  block
                  :loading="cartStore.isAdding"
                  @click="addToCart"
                >
                  Add to cart
                </v-btn>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-btn
                  color="#FFB300"
                  size="large"
                  class="product-action-btn product-action-btn--secondary"
                  variant="outlined"
                  block
                  @click="buyNow"
                >
                  Buy now
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </div>

        <!-- প্রোডাক্ট স্পেসিফিকেশন -->
        <section v-if="hasProductSpecs" class="product-specs mb-6">
          <p class="product-specs-title">Product Specifications</p>
          <div class="product-specs-grid">
            <div v-if="productSpecs.material">
              <p class="spec-label">Material</p>
              <p class="spec-value">{{ productSpecs.material }}</p>
            </div>
            <div v-if="productSpecs.length">
              <p class="spec-label">Length</p>
              <p class="spec-value">{{ productSpecs.length }}</p>
            </div>
            <div v-if="productSpecs.blousePiece">
              <p class="spec-label">Blouse Piece</p>
              <p class="spec-value">{{ productSpecs.blousePiece }}</p>
            </div>
            <div v-if="productSpecs.washCare">
              <p class="spec-label">Wash Care</p>
              <p class="spec-value">{{ productSpecs.washCare }}</p>
            </div>
          </div>
        </section>

        <!-- ক্যাটাগরি ও ট্যাগ -->
        <v-divider />
        <div class="text-caption">
          <span class="font-weight-bold">Categories:</span>
          <span v-for="(cat, i) in product.categories" :key="cat.id">
            {{ cat.name }}{{ i < product.categories.length - 1 ? ", " : "" }}
          </span>
        </div>
        <div v-if="product.tags?.length" class="text-caption">
          <span class="font-weight-bold">Tag:</span> {{ product?.tags[0].name }}
        </div>

        <!--- ***************Social Share ***************-->

        <ProductSocialShare :title="product.name" />
        <!-- ************end of social share********************-->
      </v-col>
    </v-row>

    <!-- ৪. নিচের অংশ: ডেসক্রিপশন এবং রিভিউ ট্যাব -->
    <v-row class="mt-2">
      <v-col cols="12">
        <v-tabs v-model="tab" color="primary" border-b>
          <v-tab value="desc" class="text-capitalize">Description</v-tab>
          <v-tab value="reviews" class="text-capitalize">Reviews (0)</v-tab>
        </v-tabs>

        <v-window v-model="tab" class="pt-6">
          <v-window-item value="desc">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div class="product-description" v-html="sanitizedDescription" />
            <p
              class="text-caption text-grey-darken-2 mb-6"
              style="line-height: 1.4"
            >
              <strong>Disclaimer:</strong> The actual color of the physical
              product may slightly vary due to the deviation of lighting
              sources, photography or your device display settings.
            </p>
          </v-window-item>

          <v-window-item value="reviews">
            <p class="text-body-2">There are no reviews yet.</p>
          </v-window-item>
        </v-window>
      </v-col>
    </v-row>
    <RelatedProducts :current-product="product" />
  </v-container>

  <!-- লোডিং স্টেট -->
  <v-container v-else-if="pending" class="py-16 text-center">
    <v-progress-circular indeterminate color="primary" size="64" />
  </v-container>
</template>

<script setup>
import { sanitizeHtml } from "~/utils/sanitizeHtml";
import RelatedProducts from "~/components/product/relatedProducts.vue";
import useProduct from "~/composables/useProduct";

const route = useRoute();
const cartStore = useCartStore();
const productsStore = useProductsStore();
const quantity = ref(1);
const tab = ref("desc");
const selectedImage = ref(null);
const rating = ref(0);
const imageLoading = ref(false);

//const pendingFromPinia = ref(false);
const productFromPinia = computed(() => {
  const slug = route.params.slug;
  return productsStore.getProductsBySlug(slug);
});

const { productl, pending } = useProduct(route.params.slug);
const product =
  productsStore.getProducts.length > 0 ? productFromPinia : productl;

// Preload the main image to improve LCP (Largest Contentful Paint)
useHead({
  link: [
    {
      rel: "preload",
      as: "image",
      href: product.value?.images[0]?.src,
      imagesrcset: product.value?.images[0]?.srcset, // If available
    },
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org/",
        "@type": "Product",
        name: product.value?.name,
        image: product.value?.images?.[0]?.src,
        description: product.value?.short_description?.replace(
          /<[^>]*>?/gm,
          "",
        ),
        offers: {
          "@type": "Offer",
          priceCurrency: "BDT",
          price: product.value?.price,
          availability: "https://schema.org/InStock",
        },
      }),
    },
  ],
});

watch(product, (p) => {
  rating.value = p?.average_rating ? Number(p.average_rating) : 0;
});

// Sanitized HTML for the product description
const sanitizedDescription = computed(() => {
  return sanitizeHtml(
    product.value?.description || product.value?.short_description || "",
  );
});

const productSpecs = computed(() => {
  const attributes = product.value?.attributes || [];

  const findAttributeValue = (matchers) => {
    const lowerMatchers = matchers.map((m) => m.toLowerCase());
    const attribute = attributes.find((attr) => {
      const name = attr.name?.toLowerCase();
      const slug = attr.slug?.toLowerCase();

      return (
        (name && lowerMatchers.includes(name)) ||
        (slug && lowerMatchers.includes(slug))
      );
    });

    if (!attribute || !Array.isArray(attribute.options)) return null;
    const value = attribute.options[0];

    if (typeof value === "string") return value;
    return value.name || value.slug || null;
  };

  return {
    material: findAttributeValue(["material", "pa_material"]),
    length: findAttributeValue(["length", "length (haat)", "pa_length"]),
    blousePiece: findAttributeValue(["blouse piece", "pa_blouse-piece"]),
    washCare: findAttributeValue([
      "wash care",
      "care instructions",
      "pa_wash-care",
    ]),
  };
});

const hasProductSpecs = computed(() => {
  const specs = productSpecs.value;
  return Boolean(
    specs.material || specs.length || specs.blousePiece || specs.washCare,
  );
});

const normalizeColorToCss = (value) => {
  if (!value) return "#e5e5e5";
  const v = String(value).trim();
  if (/^#|rgb|hsl/i.test(v)) return v;
  return v.toLowerCase();
};

const colorOptions = computed(() => {
  const attributes = product.value?.attributes || [];
  const colorAttribute = attributes.find((attr) => {
    const name = attr.name?.toLowerCase();
    const slug = attr.slug?.toLowerCase();

    return (name && name.includes("color")) || (slug && slug.includes("color"));
  });

  if (!colorAttribute || !Array.isArray(colorAttribute.options)) return [];

  return colorAttribute.options.map((option) => {
    const label =
      typeof option === "string"
        ? option
        : option.name || option.slug || String(option);

    return {
      label,
      value: label,
      cssColor: normalizeColorToCss(label),
    };
  });
});

const selectedColor = ref(null);

const breadcrumbs = computed(() => [
  { title: "Home", disabled: false, to: "/" },
  { title: "Shop", disabled: false, to: "/shop" },
  { title: product.value?.name || "Product", disabled: true },
]);

const addToCart = () => {
  cartStore.addToCart({ ...product.value, quantity: quantity.value });
};

const buyNow = () => {
  addToCart();
  navigateTo("/checkout/checkout");
};

useSeoMeta({
  title: () =>
    product.value
      ? `${product.value.name} | shareelungi.shop`
      : "লোড হচ্ছে... | shareelungi.shop",

  description: () =>
    product.value?.short_description?.replace(/<[^>]*>?/gm, "").trim() ||
    "সিরাজগঞ্জের এনায়েতপুরের ঐতিহ্যবাহী তাঁতের শাড়ি এবং অরিজিনাল সোয়াজ লুঙ্গি কিনুন shareelungi.shop থেকে।",

  ogTitle: () =>
    product.value
      ? `${product.value.name} | shareelungi.shop`
      : "shareelungi.shop",

  ogDescription: () =>
    product.value?.short_description?.replace(/<[^>]*>?/gm, "").trim() ||
    "সিরাজগঞ্জের এনায়েতপুরের ঐতিহ্যবাহী তাঁতের শাড়ি এবং অরিজিনাল সোয়াজ লুঙ্গি কিনুন shareelungi.shop থেকে।",

  // Optional Chaining (?.) ব্যবহার করা হয়েছে যেন ছবি না থাকলে সাইট ক্র্যাশ না করে
  ogImage: () =>
    product.value?.images?.[0]?.src ||
    "https://shareelungi.shop/default-og-image.jpg",
  ogImageAlt: () => product.value?.name || "shareelungi.shop product image",
  ogImageHeight: 600,
  ogImageWidth: 600,

  // X (Twitter) বা অন্যান্য প্ল্যাটফর্মে শেয়ার করার জন্য
  twitterCard: "summary_large_image",
  twitterTitle: () => product.value?.name || "shareelungi.shop",
  twitterDescription: () =>
    product.value?.short_description?.replace(/<[^>]*>?/gm, "").trim() ||
    "সিরাজগঞ্জের এনায়েতপুরের ঐতিহ্যবাহী তাঁতের শাড়ি এবং অরিজিনাল সোয়াজ লুঙ্গি কিনুন shareelungi.shop থেকে।",
  twitterImage: () =>
    product.value?.images?.[0]?.src ||
    "https://shareelungi.shop/default-og-image.jpg",
});

const zoomStyle = ref({
  transformOrigin: "center center",
  transform: "scale(1)",
});

const onMouseMove = (e) => {
  // Get the bounding rectangle of the image container
  const { left, top, width, height } = e.target.getBoundingClientRect();

  // Calculate mouse position as a percentage (0% to 100%)
  const x = ((e.clientX - left) / width) * 100;
  const y = ((e.clientY - top) / height) * 100;

  // Apply the zoom effect
  zoomStyle.value = {
    transformOrigin: `${x}% ${y}%`,
    transform: "scale(1.8)", // Adjust 1.8 for more/less zoom level
  };
};

const onMouseLeave = () => {
  // Reset to normal when mouse leaves
  zoomStyle.value = {
    transformOrigin: "center center",
    transform: "scale(1)",
  };
};
</script>

<style scoped>
.product-description :deep(h2) {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
}
.product-description :deep(ul) {
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}
.product-description :deep(li) {
  margin-bottom: 0.5rem;
  color: #444;
}
.gap-4 {
  gap: 16px;
}

.product-gallery {
  display: flex;
  gap: 16px;
}

.product-gallery-thumbnails {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 520px;
  overflow-y: auto;
  width: 80px;
}

.product-gallery-thumbnail-card {
  border-radius: 12px;
  overflow: hidden;
}

.product-gallery-thumbnail-card--active {
  border-color: #ffb300 !important;
}

.product-gallery-main {
  flex: 1;
  min-height: 320px;
}

.product-gallery-main-image {
  border-radius: 18px;
  object-fit: contain;
}

@media (max-width: 959px) {
  .product-gallery {
    gap: 12px;
  }

  .product-gallery-thumbnails {
    width: 64px;
  }
}

.color-swatch {
  width: 32px;
  height: 32px;
  border-radius: 999px;
  border: 2px solid transparent;
  background-color: var(--swatch-color, #e5e5e5);
  cursor: pointer;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    border-color 0.15s ease;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.06);
}

.color-swatch:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.16);
}

.color-swatch--active {
  border-color: #000;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.18);
}

.product-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.product-action-btn {
  border-radius: 999px !important;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 600;
}

.product-action-btn--primary {
  background: linear-gradient(90deg, #ffb300, #d32f2f);
  color: #ffffff !important;
}

.product-action-btn--secondary {
  border-color: #ffb300 !important;
  color: #ffb300 !important;
  background-color: #ffffff !important;
}

.product-action-btn--secondary:hover {
  background-color: #fdf7f3 !important;
}

.product-specs {
  padding: 1.25rem 1.5rem;
  border-radius: 18px;
  background-color: #faf7f4;
}

.product-specs-title {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #6b4c3b;
  margin-bottom: 0.75rem;
}

.product-specs-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem 1.5rem;
}

.spec-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: #7a7a7a;
  margin-bottom: 0.1rem;
}

.spec-value {
  font-size: 0.9rem;
  font-weight: 500;
  color: #111827;
}

@media (max-width: 600px) {
  .product-specs-grid {
    grid-template-columns: 1fr;
  }
}
</style>
