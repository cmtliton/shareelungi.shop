<template>
  <v-container class="py-12 py-md-16">
    <!-- 
      Added: 'flex-nowrap' for mobile to prevent wrapping and force a row.
      Added: 'flex-md-wrap' to restore the standard 4-column grid on desktop.
      Added: 'trust-carousel' class for scroll-snap behavior.
    -->
    <v-row
      class="trust-carousel flex-nowrap flex-md-wrap overflow-x-auto pb-6"
      justify="start"
      justify-md="center"
      align="stretch"
    >
      <v-col
        v-for="(feature, i) in features"
        :key="feature.title"
        cols="11"
        sm="6"
        md="3"
        class="trust-item"
      >
        <v-sheet
          class="trust-card h-100 pa-6 mx-auto"
          rounded="xl"
          border
          :class="{ 'trust-card--with-divider': i < features.length - 1 }"
        >
          <div class="d-flex align-start ga-4">
            <div class="trust-icon">
              <v-icon :icon="feature.icon" size="22" />
            </div>

            <div class="flex-1">
              <p class="trust-title mb-2">
                {{ feature.title }}
              </p>
              <p class="trust-desc mb-0">
                {{ feature.desc }}
              </p>
            </div>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const features = [
  {
    icon: "mdi-check-decagram-outline",
    title: "১০০% অরিজিনাল পণ্য",
    desc: "ফ্যাক্টরি থেকে সরাসরি সংগৃহীত",
  },
  {
    icon: "mdi-truck-fast-outline",
    title: "সারা দেশে হোম ডেলিভারি",
    desc: "ক্যাশ অন ডেলিভারি সুবিধা",
  },
  {
    icon: "mdi-handshake-outline",
    title: "সহজ রিটার্ন পলিসি",
    desc: "শর্তসাপেক্ষে পরিবর্তনের সুযোগ",
  },
  {
    icon: "mdi-shield-lock-outline",
    title: "নিরাপদ কেনাকাটা",
    desc: "ওয়েবসাইটের মাধ্যমে সুরক্ষিত অর্ডার",
  },
];
</script>

<style scoped>
.trust-card {
  background: linear-gradient(180deg, #ffffff 0%, #fbf8f4 100%);
  border-color: rgba(59, 40, 34, 0.12) !important;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    border-color 0.18s ease;
}

.trust-card:hover {
  transform: translateY(-2px);
  border-color: rgba(59, 40, 34, 0.22) !important;
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.08);
}

.trust-icon {
  width: 45px;
  height: 45px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: rgba(59, 40, 34, 0.08);
  color: #ffb300;
  flex: 0 0 auto;
}

.trust-title {
  font-size: 24px;
  font-weight: 700;
  color: #ffb300;
  line-height: 1.35;
}

.trust-desc {
  font-size: 16px;
  color: rgba(31, 41, 55, 0.76);
  line-height: 1.5;
}

/* --- Mobile Touch Carousel Styles --- */
@media (max-width: 959px) {
  .trust-carousel {
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
  }

  /* Hide scrollbar for a seamless, native app-like look */
  .trust-carousel::-webkit-scrollbar {
    display: none;
  }
  .trust-carousel {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  .trust-item {
    scroll-snap-align: center; /* Snaps the card perfectly in view on swipe */
  }
}

/* --- Desktop Divider Styles --- */
@media (min-width: 960px) {
  .trust-card--with-divider {
    position: relative;
  }

  .trust-card--with-divider::after {
    content: "";
    position: absolute;
    top: 18px;
    right: -12px;
    height: calc(100% - 36px);
    width: 1px;
    background: rgba(59, 40, 34, 0.08);
  }
}
</style>
