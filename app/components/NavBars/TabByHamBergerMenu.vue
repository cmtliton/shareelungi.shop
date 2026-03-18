<template>
  <!-- ২. স্টিকি অ্যাপ বার (Header) -->
  <v-app-bar flat border-b height="55" color="#F9F6F0">
    <v-container class="d-flex align-center px-4 px-md-10">
      <!-- হ্যামবার্গার আইকন (শুধুমাত্র মোবাইলে) -->
      <v-app-bar-nav-icon
        class="d-md-none mr-2"
        color="#ffb300"
        @click="drawer = !drawer"
      />

      <!-- লোগো (logo component already contains its own NuxtLink) -->
      <div class="d-flex align-center">
        <HomeAppLogo :height="40" />
      </div>
      <!-- ডেসটপ মেগা মেনু -->
      <div class="d-none d-md-flex h-100 ml-8" color="#FFB300">
        <v-menu
          v-for="cat in megaCategories"
          :key="cat.slug"
          offset-y
          open-on-hover
          width="640"
          location="bottom"
          offset="15"
        >
          <template #activator="{ props }">
            <v-btn
              v-bind="props"
              :to="cat.to"
              variant="text"
              color="#FFB300"
              class="text-title-1 px-3 font-weight-medium"
            >
              {{ cat.name }}
            </v-btn>
          </template>

          <v-card class="pa-6" elevation="4">
            <v-row>
              <v-col
                v-for="child in cat.children"
                :key="child.slug"
                cols="12"
                sm="4"
              >
                <v-btn
                  :to="child.to"
                  variant="text"
                  class="text-left text-none px-0 mb-2 font-weight-medium"
                  color="#FFB300"
                >
                  {{ child.name }}
                </v-btn>
                <p class="text-caption text-yellow-darken-1 mb-0">
                  {{ child.description }}
                </p>
              </v-col>
            </v-row>
          </v-card>
        </v-menu>

        <!-- Browse All Button -->
        <v-btn
          to="/shop"
          variant="text"
          color="#FFB300"
          class="text-title-1 px-3 font-weight-medium"
        >
          Browse All
        </v-btn>
        <v-btn
          variant="text"
          color="#FFB300"
          class="text-title-1 px-3 font-weight-medium"
          @click="navigateTo('/contact')"
        >
          Contact Us
        </v-btn>
      </div>

      <v-spacer />

      <!-- আইকন সেকশন (Woodmart-style thin icons) -->
      <div class="d-flex align-right header-icons">
        <v-btn icon variant="text" color="#FFB300" class="pt-3">
          <v-icon icon="mdi-magnify" size="28px" />
        </v-btn>

        <ProfileMenu class="mx-1" />

        <v-btn
          icon
          variant="text"
          color="#FFB300"
          class="pt-3"
          @click="openCart"
        >
          <v-badge
            :content="cartStore.totalItems"
            :model-value="cartStore.totalItems > 0"
            color="green"
          >
            <v-icon icon="mdi-cart-outline" size="25px" />
          </v-badge>
        </v-btn>
      </div>
    </v-container>
  </v-app-bar>
  <!-- ১. মোবাইল নেভিগেশন ড্রয়ার (Hamburger Menu) -->
  <v-navigation-drawer
    v-model="drawer"
    temporary
    location="left"
    width="300"
    class="mobile-nav-drawer"
  >
    <!-- ড্রয়ার হেডার -->

    <!-- ক্যাটাগরি লিস্ট -->
    <v-list nav density="comfortable" class="mt-2">
      <v-list-item
        to="/"
        prepend-icon="mdi-home-outline"
        title="Home"
        color="#ffb300"
      />

      <v-divider class="my-2" />
      <v-list-subheader
        class="text-uppercase font-weight-bold"
        style="font-size: 11px; color: #ffb300"
      >
        Shop By Category
      </v-list-subheader>

      <v-list-group v-for="cat in megaCategories" :key="cat.slug" no-action>
        <template #activator="{ props }">
          <v-list-item
            v-bind="props"
            :title="cat.name"
            prepend-icon="mdi-chevron-right"
            base-color="#FFB300"
            rounded="lg"
          />
        </template>

        <v-list-item
          v-for="child in cat.children"
          :key="child.slug"
          :to="child.to"
          :title="child.name"
          base-color="#FFB300"
          rounded="lg"
          class="pl-10"
        />
      </v-list-group>

      <v-divider class="my-2" />

      <v-list-item
        to="/shop"
        prepend-icon="mdi-store-outline"
        title="Browse All"
        base-color="#ffb300"
      />
      <v-list-item
        to="/contact"
        prepend-icon="mdi-phone-outline"
        title="Contact Us"
        base-color="#ffb300"
      />
    </v-list>
  </v-navigation-drawer>

  <!-- ৩. ড্রয়ার কম্পোনেন্টস -->
  <v-sheet v-show="cartOpen">
    <CartDrawer />
  </v-sheet>

  <!-- ৪. মেইন কন্টেন্ট -->
  <v-main>
    <slot />
  </v-main>

  <GlobalLoader />
</template>

<script setup>
import { ref, provide } from "vue";

const drawer = ref(false);
const cartOpen = ref(false);
const cartStore = useCartStore();
const categoriesStore = useCategoriesStore();

provide("cartOpen", cartOpen);
const openCart = () => (cartOpen.value = true);

// Get mega menu categories from store (it's now a computed property)
const megaCategories = computed(() =>
  categoriesStore.buildCategoryTree(categoriesStore.getCategories),
);
</script>

<style scoped>
.sticky-header {
  z-index: 1000 !important;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.9) !important;
}

/* মোবাইল মেনু একটিভ স্টেট স্টাইল */
.mobile-nav-drawer :deep(.v-list-item--active) {
  background-color: rgba(59, 40, 34, 0.1) !important;
  font-weight: bold;
}

.mobile-nav-drawer :deep(.v-list-item-title) {
  font-size: 15px !important;
  letter-spacing: 0.5px;
}

.header-icons .v-btn--icon {
  width: 32px;
  height: 32px;
}

.header-icons .v-icon {
  font-size: 20px;
}
</style>
