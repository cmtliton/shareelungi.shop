<template>
  <v-sheet class="py-16 bg-grey-lighten-5">
    <v-container>
      <!-- ১. সেকশন হেডার -->
      <v-row align="center" class="mb-10">
        <v-col cols="12" md="8">
          <div class="d-flex align-center mb-2">
            <v-divider
              :color="brandColor"
              thickness="3"
              class="mr-4 opacity-100"
              style="width: 50px"
            />
            <span
              class="text-overline font-weight-bold"
              :style="{ color: brandColor }"
              >EXCLUSIVE Collection</span
            >
          </div>
          <h2
            class="text-h3 font-weight-black mb-4"
            :style="{ color: brandColor }"
          >
            Featured Sarees & Lungis
          </h2>
          <p class="text-body-1 text-grey-darken-1">
            Handpicked sarees and lungis curated for modern, elegant wardrobes.
            From everyday comfort to grand occasions, discover your next
            signature drape.
          </p>
        </v-col>
        <v-col cols="12" md="4" class="text-md-right">
          <v-btn
            to="/shop"
            variant="flat"
            :color="brandColor"
            size="large"
            class="text-red-darken-4 font-weight-bold px-8"
            rounded="lg"
            elevation="2"
          >
            VIEW ALL PRODUCTS
          </v-btn>
        </v-col>
      </v-row>

      <!-- ২. প্রোডাক্ট গ্রিড -->
      <v-row v-if="featuredProducts.length > 0">
        <v-col
          v-for="product in featuredProducts"
          :key="product.id"
          cols="6"
          sm="6"
          md="4"
          lg="3"
        >
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              v-bind="props"
              class="featured-card h-100 position-relative"
              flat
              border
              rounded="xl"
              :to="`/products/${product.slug}`"
            >
              <!-- সলিড ব্যাজ (Sale/New) -->
              <v-chip
                v-if="product.on_sale"
                color="red"
                size="x-small"
                class="position-absolute ma-4 font-weight-bold"
                style="z-index: 2; top: 0; left: 0"
              >
                SALE
              </v-chip>

              <!-- ইমেজ সেকশন -->
              <div class="featured-image-wrapper">
                <!-- Wishlist -->
                <v-btn
                  icon
                  variant="text"
                  class="wishlist-btn"
                  color="#ffb300"
                  size="x-small"
                  @click.stop
                >
                  <v-icon icon="mdi-heart-outline" />
                </v-btn>

                <!-- Base image (front view) -->
                <NuxtImg
                  :src="product.images[0]?.src || '/logo.png'"
                  :alt="product.name"
                  class="featured-image featured-image--base"
                  format="webp"
                  fit="cover"
                />

                <!-- Hover image (back / detail view) -->
                <NuxtImg
                  v-if="product.images[1]?.src"
                  :src="product.images[1]?.src"
                  :alt="product.name"
                  class="featured-image featured-image--hover"
                  format="webp"
                  fit="cover"
                  :class="{ 'featured-image--visible': isHovering }"
                />

                <!-- Hover cart bar -->
                <v-expand-transition>
                  <div
                    v-if="isHovering"
                    class="featured-cart-bar d-none d-md-flex align-center justify-space-between px-4"
                  >
                    <span class="featured-cart-label font-weight-bold"
                      >Add to cart</span
                    >
                    <v-btn
                      icon
                      size="small"
                      variant="flat"
                      color="white"
                      class="featured-cart-icon"
                      @click.stop.prevent="addToCart(product)"
                    >
                      <v-icon icon="mdi-cart-plus" color="#ffb300" />
                    </v-btn>
                  </div>
                </v-expand-transition>
              </div>

              <!-- প্রোডাক্ট কন্টেন্ট এবং মোবাইল কার্ট বাটন -->
              <v-card-text class="pa-3 pa-sm-5">
                <div
                  class="text-caption text-grey mb-1 text-uppercase"
                  style="letter-spacing: 1px"
                >
                  {{ product.categories[0]?.name || "Fashion" }}
                </div>

                <h3
                  :class="
                    mobile
                      ? 'product-title-mobile'
                      : 'product-title text-truncate-2 text-grey-darken-4 mb-2'
                  "
                >
                  {{ product.name }}
                </h3>

                <!-- Price & Mobile Cart Button Row -->
                <div class="d-flex align-center justify-space-between mt-1">
                  <!-- দামের অংশ -->
                  <div class="product-price-row">
                    <span
                      v-if="product.on_sale"
                      class="text-decoration-line-through text-grey mr-1 text-caption"
                    >
                      ৳{{ product.regular_price }}
                    </span>
                    <span
                      class="font-weight-bold product-price"
                      style="font-size: 1.1rem"
                    >
                      ৳{{ product.price }}
                    </span>
                  </div>

                  <!-- Mobile Cart Button (শুধুমাত্র মোবাইলে দেখাবে) -->
                  <v-btn
                    icon
                    size="small"
                    variant="tonal"
                    class="d-md-none product-price"
                    @click.stop.prevent="addToCart(product)"
                  >
                    <v-icon icon="mdi-cart-plus" />
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>

      <!-- লোডিং স্টেট -->
      <v-row v-else>
        <v-col v-for="n in 4" :key="n" cols="12" sm="6" md="3">
          <v-skeleton-loader type="card, text, button" />
        </v-col>
      </v-row>
    </v-container>

    <!-- ৩. ইঞ্জিনিয়ারিং ফিচার হাইলাইট (Small Banner Inside) -->
    <v-container class="mt-10">
      <v-card color="#FFB300" theme="dark" rounded="xl" class="pa-10">
        <v-row align="center">
          <v-col cols="12" md="7">
            <h2 class="text-h4 font-weight-bold mb-4 text-red-darken-4">
              Crafted Fabrics, Honest Quality
            </h2>
            <p class="text-body-1 opacity-80 mb-6">
              Every saree and lungi is sourced directly from trusted weavers and
              mills, with careful inspection before it reaches your wardrobe.
            </p>
            <div class="d-flex gap-4 flex-wrap">
              <v-chip variant="tonal" prepend-icon="mdi-check"
                >Premium Fabrics</v-chip
              >
              <v-chip variant="tonal" prepend-icon="mdi-check"
                >Color & Design Guarantee</v-chip
              >
              <v-chip variant="tonal" prepend-icon="mdi-check"
                >Easy Exchange Support</v-chip
              >
            </div>
          </v-col>
          <v-col cols="12" md="5" class="text-md-right">
            <v-btn
              href="https://wa.link/e5oto8"
              target="_blank"
              size="x-large"
              color="white"
              variant="flat"
              class="font-weight-bold text-red-darken-4 px-10"
              rounded="pill"
            >
              কল করুন
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-sheet>
</template>

<script setup>
const brandColor = "#FFB300";
const productsStore = useProductsStore();
const cartStore = useCartStore();
const { mobile } = useDisplay();

// ১. স্টোর থেকে সেরা 16টি প্রোডাক্ট নেওয়া (Featured Logic)
const featuredProducts = computed(() => {
  // আপনি চাইলে এখানে specific ID বা featured: true প্রপার্টি দিয়ে ফিল্টার করতে পারেন
  return productsStore.products
    .filter((product) => product.featured === true)
    .slice(0, 16);
});

const addToCart = (product) => {
  cartStore.addToCart(product);
};
</script>

<style scoped>
.featured-card {
  transition: border-color 0.25s ease;
  background-color: white !important;
  box-shadow: none !important;
}

.featured-card:hover {
  box-shadow: none !important;
  border-color: rgba(59, 40, 34, 0.4) !important;
}

.gap-2 {
  gap: 8px;
}
.gap-4 {
  gap: 16px;
}

.letter-spacing-1 {
  letter-spacing: 1px !important;
}

/* স্লাইডিং এনিমেশন */
.v-expand-transition-enter-active,
.v-expand-transition-leave-active {
  transition: 0.3s ease-in-out;
}

.featured-image-wrapper {
  position: relative;
  width: 100%;
  padding-top: 150%; /* 2:3 portrait aspect ratio */
  overflow: hidden;
  border-top-left-radius: 22px;
  border-top-right-radius: 22px;
  background-color: #f9f6f0;
}

.featured-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition:
    opacity 0.28s ease,
    transform 0.28s ease;
}

.featured-image--base {
  opacity: 1;
}

.featured-image--hover {
  opacity: 0;
}

.featured-image--visible {
  opacity: 1;
}

.wishlist-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 3;
  background-color: rgba(255, 255, 255, 0.8) !important;
}

.featured-cart-bar {
  position: absolute;
  inset-inline: 12px;
  bottom: 10px;
  padding-block: 6px;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5));
  color: #fff;
  z-index: 3;
}

.featured-cart-label {
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.featured-cart-icon {
  background-color: #ffffff !important;
}

.product-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #ffb300;
  line-height: 1.4;
  margin-bottom: 4px;
}
.product-title-mobile {
  font-size: 12px;
  font-weight: 250;
  color: #ffb300;
  line-height: 1.2;
  margin-bottom: 4px;
}
.text-truncate-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-price-row {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-top: 4px;
}

.product-price-old {
  font-size: 0.78rem;
  color: #9ca3af;
  text-decoration: line-through;
}

.product-price {
  font-size: 0.92rem;
  font-weight: 600;
  color: #111827;
}
</style>
