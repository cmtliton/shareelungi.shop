<template>
  <v-container
    class="pa-0 mb-4 overflow-hidden rounded-xl hero-container shadow-sm"
  >
    <v-carousel
      :height="mobile ? 300 : 480"
      :transition-duration="2000"
      hide-delimiter-background
      show-arrows="hover"
      cycle
      class="hero-carousel"
    >
      <v-carousel-item v-for="(src, i) in items" :key="i" class="hero-item">
        <!-- NuxtImg with native Preload to fix the warning -->
        <NuxtImg
          :src="src"
          :width="mobile ? 360 : 1360"
          :height="mobile ? 300 : 480"
          fit="cover"
          format="webp"
          quality="80"
          :preload="i === 0"
          :loading="i === 0 ? 'eager' : 'lazy'"
          :fetchpriority="i === 0 ? 'high' : 'auto'"
          class="w-100 h-100 object-fit-cover"
          alt="Shareelungi.shop Premium Collection"
        />

        <!-- Premium Dark Overlay -->
        <div class="hero-overlay">
          <div class="hero-content">
            <h1 class="hero-title">
              {{ titles[i] }}
            </h1>
            <p class="hero-subtitle">
              {{ subtitles[i] }}
            </p>
            <NuxtLink to="/shop" class="hero-btn elevation-3">
              Shop Now
              <v-icon icon="mdi-arrow-right" size="small" class="ml-1" />
            </NuxtLink>
          </div>
        </div>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script setup lang="ts">
const { mobile } = useDisplay();

const items = [
  "https://api.shareelungi.shop/wp-content/uploads/2026/03/hero1.jpg",
  "https://api.shareelungi.shop/wp-content/uploads/2026/03/hero2.jpg",
  "https://api.shareelungi.shop/wp-content/uploads/2026/03/hero1.jpg",
];

const titles = [
  "সিরাজগঞ্জের ঐতিহ্য এখন আপনার হাতের মুঠোয়!",
  "১০০% অরিজিনাল তাঁতের তৈরী লুঙ্গি ও এনায়েতপুরের শাড়ি!",
  "দেশি পোশাকে সাজুক আপনার প্রতিটি দিন!",
];

const subtitles = [
  "সরাসরি এনায়েতপুর, খামারগ্রামের বিখ্যাত ফ্যাক্টরির তৈরী লুঙ্গি এবং এনায়েতপুরের এক্সক্লুসিভ তাঁতের শাড়ি। ১০০% খাঁটি সুতা আর নিখুঁত বুননের নিশ্চয়তা। ঘরে বসেই অর্ডার করুন, পৌঁছে যাবে সারা বাংলাদেশে।",
  "আভিজাত্য ও ঐতিহ্যের সেরা মিশ্রণ। shareelungi.shop থেকে আজই বেছে নিন আপনার পছন্দের খাঁটি দেশি পোশাক। সারা দেশে দ্রুত হোম ডেলিভারি ও ক্যাশ অন ডেলিভারি সুবিধা!",
  "প্রিয়জনকে উপহার দিতে বা নিজের ব্যবহারের জন্য সেরা মানের এনায়েতপুরের শাড়ি ও অরিজিনাল লুঙ্গি। অর্ডার করুন যত খুশি, তত।",
];

// ম্যানুয়াল useHead রিমুভ করা হয়েছে কারণ <NuxtImg :preload="true"> স্বয়ংক্রিয়ভাবে সঠিক কাজ করবে।
</script>

<style scoped>
.hero-container {
  position: relative;
  background-color: #f9f6f0;
}

.hero-item {
  position: relative;
}

.object-fit-cover {
  object-fit: cover;
}

/* Premium Transparent Overlay */
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.75) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    rgba(0, 0, 0, 0.1) 100%
  );
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 80px;
  z-index: 10;
}

.hero-content {
  max-width: 650px;
  animation: slideInUp 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Typography Desktop */
.hero-title {
  font-size: 44px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 20px;
  line-height: 1.25;
  text-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.5px;
}

.hero-subtitle {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 36px;
  line-height: 1.6;
  text-shadow: 0px 2px 6px rgba(0, 0, 0, 0.4);
}

/* Primary Brand Button (#ffb300) */
.hero-btn {
  display: inline-flex;
  align-items: center;
  padding: 14px 32px;
  background-color: #ffb300; /* Primary Brand Color */
  color: #212121; /* Dark text for high contrast */
  text-decoration: none;
  border-radius: 50px; /* Pill shape for modern look */
  font-weight: 800;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.hero-btn:hover {
  background-color: #ffc133;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(255, 179, 0, 0.4) !important;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .hero-overlay {
    padding: 0 24px;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.8) 100%
    );
    align-items: flex-end;
    padding-bottom: 40px;
  }

  .hero-content {
    max-width: 100%;
    text-align: center;
  }

  /* Fixed Mobile Typography (10px was too small) */
  .hero-title {
    font-size: 20px;
    color: #ffb300; /* Brand color on mobile for attention */
    margin-bottom: 8px;
  }

  .hero-subtitle {
    font-size: 14px;
    margin-bottom: 20px;
    line-height: 1.5;
  }

  .hero-btn {
    padding: 12px 28px;
    font-size: 14px;
    width: 100%;
    justify-content: center;
  }
}

/* Animations */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
