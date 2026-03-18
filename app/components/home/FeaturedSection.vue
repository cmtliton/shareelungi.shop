<template>
  <v-sheet class="py-12 py-md-16 bg-grey-lighten-5">
    <v-container>
      <!-- ১. প্রিমিয়াম সেকশন হেডার -->
      <v-row align="end" class="mb-8 mb-md-12">
        <v-col cols="12" md="8" class="text-center text-md-left">
          <div class="d-flex align-center justify-center justify-md-start mb-3">
            <v-divider
              color="#D32F2F"
              thickness="4"
              class="mr-4 opacity-100 rounded-pill"
              style="max-width: 40px"
            />
            <span
              class="text-button font-weight-bold"
              style="color: #d32f2f; letter-spacing: 2px"
            >
              EXCLUSIVE COLLECTION
            </span>
          </div>
          <h2
            class="text-h4 text-md-h3 font-weight-black mb-4 text-grey-darken-4"
          >
            Featured Sarees & Lungis
          </h2>
          <p
            class="text-body-1 text-grey-darken-1 mx-auto mx-md-0"
            style="max-width: 600px; line-height: 1.6"
          >
            আপনার আধুনিক ও আভিজাত্যময় লাইফস্টাইলের জন্য বাছাইকৃত সেরা শাড়ি ও
            লুঙ্গির কালেকশন। প্রাত্যহিক ব্যবহার বা উৎসব— সবকিছুর জন্যই পারফেক্ট।
          </p>
        </v-col>
        <v-col cols="12" md="4" class="text-center text-md-right mt-4 mt-md-0">
          <v-btn
            to="/shop"
            variant="outlined"
            color="#212121"
            size="large"
            class="font-weight-bold px-8 hover-btn"
            rounded="pill"
          >
            সবগুলো দেখুন
            <v-icon icon="mdi-arrow-right" class="ml-2" size="small" />
          </v-btn>
        </v-col>
      </v-row>

      <!-- ২. প্রোডাক্ট গ্রিড (Optimized for Mobile & Desktop) -->
      <v-row v-if="featuredProducts.length > 0">
        <v-col
          v-for="product in featuredProducts"
          :key="product.id"
          cols="6"
          sm="4"
          md="3"
        >
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              v-bind="props"
              class="featured-card h-100 position-relative d-flex flex-column"
              flat
              border
              rounded="lg"
              :to="`/products/${product.slug}`"
            >
              <!-- সলিড ব্যাজ (Sale) -->
              <v-chip
                v-if="product.on_sale"
                color="#D32F2F"
                size="small"
                class="position-absolute ma-3 font-weight-bold text-white shadow-sm"
                style="z-index: 2; top: 0; left: 0"
              >
                SALE
              </v-chip>

              <!-- ইমেজ সেকশন (2:3 Ratio for Fashion) -->
              <div class="featured-image-wrapper overflow-hidden">
                <!-- Wishlist -->
                <v-btn
                  icon
                  variant="flat"
                  class="wishlist-btn elevation-2"
                  color="white"
                  size="x-small"
                  @click.stop.prevent="addToWishlist(product)"
                >
                  <v-icon
                    :color="isInWishlist(product) ? 'red' : 'grey-darken-1'"
                    :icon="
                      isInWishlist(product) ? 'mdi-heart' : 'mdi-heart-outline'
                    "
                    size="16"
                  />
                  <v-tooltip activator="parent" location="left">
                    {{
                      isInWishlist(product)
                        ? "Remove from Wishlist"
                        : "Add to Wishlist"
                    }}
                  </v-tooltip>
                </v-btn>

                <!-- Base image -->
                <NuxtImg
                  :src="product.images[0]?.src || '/images/placeholder.png'"
                  :alt="product.name"
                  class="featured-image featured-image--base"
                  format="webp"
                  fit="cover"
                  loading="lazy"
                />

                <!-- Hover image -->
                <NuxtImg
                  v-if="product.images[1]?.src"
                  :src="product.images[1]?.src"
                  :alt="product.name"
                  class="featured-image featured-image--hover"
                  format="webp"
                  fit="cover"
                  loading="lazy"
                  :class="{ 'featured-image--visible': isHovering }"
                />

                <!-- Desktop Hover Add to Cart -->
                <v-expand-transition>
                  <div
                    v-if="isHovering"
                    class="featured-cart-bar d-none d-md-flex align-center justify-space-between px-5"
                    @click.stop.prevent="addToCart(product)"
                  >
                    <span
                      class="featured-cart-label font-weight-bold text-grey-darken-4"
                    >
                      Add to cart
                    </span>
                    <v-btn
                      icon
                      size="x-small"
                      variant="flat"
                      color="#212121"
                      @click.stop.prevent="addToCart(product)"
                    >
                      <v-icon icon="mdi-cart-plus" color="#ffb300" />
                    </v-btn>
                  </div>
                </v-expand-transition>
              </div>

              <!-- প্রোডাক্ট কন্টেন্ট -->
              <v-card-text class="pa-4 d-flex flex-column flex-grow-1">
                <div
                  class="text-caption text-grey-darken-1 mb-1 text-uppercase font-weight-medium"
                  style="letter-spacing: 1px"
                >
                  {{ product.categories[0]?.name || "Fashion" }}
                </div>

                <h3
                  class="product-title text-truncate-2 text-grey-darken-4 mb-auto"
                >
                  {{ product.name }}
                </h3>

                <!-- Price & Mobile Cart Button Row -->
                <div class="d-flex align-center justify-space-between mt-3">
                  <div class="d-flex flex-wrap align-center gap-1">
                    <span
                      v-if="product.on_sale"
                      class="text-decoration-line-through text-grey text-caption mr-1"
                    >
                      ৳{{ product.regular_price }}
                    </span>
                    <span
                      class="font-weight-black product-price"
                      style="color: #d32f2f"
                    >
                      ৳{{ product.price }}
                    </span>
                  </div>

                  <!-- Mobile Cart Button (শুধুমাত্র মোবাইল/ট্যাবলেটে) -->
                  <v-btn
                    icon
                    size="x-small"
                    variant="flat"
                    color="#ffb300"
                    class="d-md-none text-grey-darken-4 elevation-1"
                    @click.stop.prevent="addToCart(product)"
                  >
                    <v-icon icon="mdi-cart-plus" size="16" />
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>

      <!-- লোডিং স্টেট -->
      <v-row v-else>
        <v-col v-for="n in 8" :key="n" cols="6" sm="4" md="3">
          <v-skeleton-loader type="image, article" class="rounded-2xl" />
        </v-col>
      </v-row>
    </v-container>

    <!-- ৩. ট্রাস্ট ও গ্যারান্টি ব্যানার (Redesigned Premium Banner) -->
    <v-container class="mt-12 mt-md-16">
      <v-card class="premium-banner pa-8 pa-md-12" rounded="xl" flat>
        <v-row align="center">
          <v-col cols="12" md="8" class="text-center text-md-left">
            <h2
              class="text-h5 text-md-h4 font-weight-black mb-4 text-grey-darken-4"
            >
              আসল এনায়েতপুরের শাড়ি ও সুতি লুঙ্গি!
            </h2>
            <p
              class="text-body-1 mb-6 text-grey-darken-3 mx-auto mx-md-0"
              style="max-width: 700px; line-height: 1.6"
            >
              আমাদের প্রতিটি শাড়ি ও লুঙ্গি সরাসরি বিশ্বস্ত তাঁতি ও ফ্যাক্টরি
              থেকে সংগ্রহ করা হয়। গুণগত মান পরীক্ষা করেই পণ্য আপনাদের কাছে পৌঁছে
              দেওয়া হয়।
            </p>
            <div class="d-flex flex-wrap justify-center justify-md-start gap-3">
              <v-chip
                color="#212121"
                variant="outlined"
                prepend-icon="mdi-check-decagram"
                class="font-weight-bold bg-white"
              >
                ১০০% খাঁটি সুতা
              </v-chip>
              <v-chip
                color="#212121"
                variant="outlined"
                prepend-icon="mdi-palette-outline"
                class="font-weight-bold bg-white"
              >
                রঙের গ্যারান্টি
              </v-chip>
              <v-chip
                color="#212121"
                variant="outlined"
                prepend-icon="mdi-refresh"
                class="font-weight-bold bg-white"
              >
                সহজ রিটার্ন পলিসি
              </v-chip>
            </div>
          </v-col>
          <v-col
            cols="12"
            md="4"
            class="text-center text-md-right mt-6 mt-md-0"
          >
            <v-btn
              href="https://wa.link/e5oto8"
              target="_blank"
              size="x-large"
              color="#D32F2F"
              variant="flat"
              class="font-weight-bold text-white px-10 banner-btn"
              rounded="pill"
            >
              <v-icon icon="mdi-whatsapp" class="mr-2" />
              সরাসরি কথা বলুন
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-sheet>
</template>

<script setup>
import { useWishlistStore } from "../../../layers/auth/app/stores/wishlist";
const productsStore = useProductsStore();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();

// Featured Products Logic (Max 8 products for a clean 2-row grid on desktop)
const featuredProducts = computed(() => {
  return productsStore.products
    .filter((product) => product.featured === true)
    .slice(0, 16);
});

const addToCart = (product) => {
  cartStore.addToCart(product);
  // You can also trigger a snackbar here
};

const addToWishlist = (product) => {
  wishlistStore.toggleWishlist(product.id);
};

const isInWishlist = (product) => wishlistStore.isInWishlist(product.id);
</script>

<style scoped>
/* Typography */
.text-truncate-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-title {
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.4;
  transition: color 0.3s ease;
}

.product-price {
  font-size: 1.15rem;
}

/* Card Hover Effects */
.featured-card {
  border-color: rgba(0, 0, 0, 0.06) !important;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.featured-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08) !important;
  border-color: #ffb300 !important;
}

.featured-card:hover .product-title {
  color: #d32f2f !important;
}

/* Image Wrapper & Animations */
.featured-image-wrapper {
  position: relative;
  width: 100%;
  padding-top: 135%; /* Adjusted slightly for better overall card ratio */
  background-color: #f9f6f0;
}

.featured-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition:
    transform 0.8s ease,
    opacity 0.4s ease;
}

.featured-card:hover .featured-image--base {
  transform: scale(1.05);
}

.featured-image--base {
  opacity: 1;
}
.featured-image--hover {
  opacity: 0;
  transform: scale(1.05);
}
.featured-image--visible {
  opacity: 1;
  transform: scale(1);
}

/* Buttons & Elements */
.wishlist-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 3;
}

.featured-cart-bar {
  position: absolute;
  inset-inline: 16px;
  bottom: 16px;
  padding-block: 8px;
  border-radius: 999px;
  background-color: #ffb300; /* Brand Color Primary */
  box-shadow: 0 4px 15px rgba(255, 179, 0, 0.4);
  z-index: 3;
}

.featured-cart-label {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.hover-btn {
  transition: all 0.3s ease;
}
.hover-btn:hover {
  background-color: #212121 !important;
  color: white !important;
}

/* Premium Banner */
.premium-banner {
  background: linear-gradient(135deg, #ffc133 0%, #ffb300 100%);
  position: relative;
  overflow: hidden;
}

.premium-banner::before {
  content: "";
  position: absolute;
  top: -50%;
  right: -10%;
  width: 300px;
  height: 300px;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 0) 70%
  );
  border-radius: 50%;
}

.banner-btn {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}
.banner-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(211, 47, 47, 0.4) !important;
}

/* Mobile Utilities */
.gap-1 {
  gap: 4px;
}
.gap-3 {
  gap: 12px;
}

@media (max-width: 600px) {
  .product-title {
    font-size: 0.9rem; /* Perfectly readable on mobile */
  }
  .product-price {
    font-size: 1.05rem;
  }
  .featured-image-wrapper {
    padding-top: 145%; /* Slightly taller on mobile for Saree/Lungi */
  }
}
</style>
