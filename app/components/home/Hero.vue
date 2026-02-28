<template>
  <v-container
    max-width="1360"
    class="pa-0 mb-10 overflow-hidden rounded-lg hero-container"
  >
    <!-- carousel height এবং NuxtImg height এক হতে হবে -->
    <v-carousel
      :height="mobile ? 230 : 460"
      :transition-duration="1000"
      hide-delimiter-background
      show-arrows="hover"
      cycle
    >
      <v-carousel-item v-for="(src, i) in items" :key="i" class="hero-item">
        <NuxtImg
          :src="src"
          :width="mobile ? 360 : 1360"
          :height="mobile ? 230 : 460"
          fit="cover"
          format="webp"
          :loading="i === 0 ? 'eager' : 'lazy'"
          :fetchpriority="i === 0 ? 'high' : 'low'"
          class="w-100 h-100"
          alt="Shareelungi.shop"
        />
        <!-- Overlay Content -->
        <div class="hero-overlay">
          <div class="hero-content">
            <h1 v-if="!mobile" class="hero-title">
              {{ titles[i] }}
            </h1>
            <h3 v-else class="hero-title-mobile">
              {{ titles[i] }}
            </h3>
            <p :class="mobile ? 'hero-subtitle-mobile' : 'hero-subtitle'">
              {{ subtitles[i] }}
            </p>
            <NuxtLink
              to="/shop"
              :class="mobile ? 'hero-btn-mobile' : 'hero-btn'"
              >Shop Now</NuxtLink
            >
          </div>
        </div>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script setup lang="ts">
// ১. ইমেজগুলো অবশ্যই public/images ফোল্ডারে থাকতে হবে
// ২. পাথ হিসেবে './' এর বদলে সরাসরি '/' ব্যবহার করুন
const { mobile } = useDisplay();
const items = ["images/hero1.jpg", "images/hero2.jpg", "images/hero1.jpg"];
const titles = [
  "সিরাজগঞ্জের ঐতিহ্য এখন আপনার হাতের মুঠোয়!",
  "১০০% অরিজিনাল তাঁতের তৈরী লুঙ্গি ও এনায়েতপুরের শাড়ি!",
  "দেশি পোশাকে সাজুক আপনার প্রতিটি দিন!",
];

const subtitles = [
  "সরাসরি এনায়েতপুর, খামারগ্রামের বিখ্যাত ফ্যাক্টরির তৈরী লুঙ্গি এবং এনায়েতপুরের এক্সক্লুসিভ তাঁতের শাড়ি। ১০০% খাঁটি সুতা আর নিখুঁত বুননের নিশ্চয়তা। ঘরে বসেই অর্ডার করুন, পৌঁছে যাবে সারা বাংলাদেশে।",
  "আভিজাত্য ও ঐতিহ্যের সেরা মিশ্রণ। shareelungi.shop থেকে আজই বেছে নিন আপনার পছন্দের খাঁটি দেশি পোশাক। সারা দেশে দ্রুত হোম ডেলিভারি ও ক্যাশ অন ডেলিভারি সুবিধা!",
  "প্রিয়জনকে উপহার দিতে বা নিজের ব্যবহারের জন্য সেরা মানের এনায়েতপুরের শাড়ি ও অরিজিনাল সোয়াজ লুঙ্গি। আমাদের নতুন কালেকশনে চলছে বিশেষ ছাড়! স্টক ফুরিয়ে যাওয়ার আগেই লুফে নিন।",
];

// ৩. প্রথম ইমেজটি ব্রাউজারকে আগেভাগে জানানোর জন্য Preload করা (Best for SEO/LCP)
useHead({
  link: [{ rel: "preload", as: "image", href: items[0] }],
});
</script>

<style scoped>
.cross-scale-enter-active,
.cross-scale-leave-active {
  transition: 0.5s cubic-bezier(0.25, 0.8, 0.5, 1);
  transition-property: opacity, transform;
}

.cross-scale-leave-from,
.cross-scale-leave-to {
  position: absolute !important;
  top: 0;
  width: 100%;
}
.gradient-text {
  background: linear-gradient(90deg, #d32f2f, #ffb300);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}
.cross-scale-enter-from,
.cross-scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

@media (prefers-reduced-motion: reduce) {
  .cross-scale-enter-from,
  .cross-scale-leave-to {
    transform: none;
  }
}

.hero-container {
  position: relative;
}

.hero-item {
  position: relative;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.2) 100%
  );
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 60px 80px;
  z-index: 10;
}

.hero-content {
  max-width: 600px;
  animation: slideInLeft 0.8s ease-out;
}

.hero-title {
  font-size: 46px;
  font-weight: 700;
  color: white;
  margin-bottom: 16px;
  line-height: 1.2;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
}

.hero-title-mobile {
  font-size: 16;
  font-weight: 200;
  color: #ffb300;
  margin-bottom: 10px;
  line-height: 1.2;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 32px;
  line-height: 1.6;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
}
.hero-subtitle-mobile {
  font-size: 12px;
  color: #ffb300;
  margin-bottom: 10px;
  line-height: 1.6;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
}

.hero-btn {
  display: inline-block;
  padding: 14px 36px;
  background-color: #ff6b35;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
}
.hero-btn-mobile {
  display: inline-block;
  background-color: white;
  color: #ffb300;
  text-decoration: none;
  border-radius: 3px;
  font-weight: 200;
  font-size: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 1px 2px rgba(255, 107, 53, 0.3);
}
.hero-btn:hover {
  background-color: #e55a24;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(255, 107, 53, 0.4);
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 768px) {
  .hero-overlay {
    padding: 40px;
  }

  .hero-title {
    font-size: 32px;
  }
  .hero-title-mobile {
    font-size: 24px;
  }

  .hero-subtitle {
    font-size: 16px;
  }
  .hero-subtitle-mobile {
    font-size: 12px;
  }

  .hero-content {
    max-width: 100%;
  }
}
.reduced-motion-info {
  display: none;
}
@media (prefers-reduced-motion: reduce) {
  .reduced-motion-info {
    display: block;
  }
}
</style>
