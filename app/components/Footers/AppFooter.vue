<template>
  <v-footer class="bg-grey-darken-4 text-white pt-16 pb-6">
    <v-container>
      <v-row>
        <!-- ১. কোম্পানি পরিচিতি (Brand & About) -->
        <v-col cols="12" md="4" class="mb-10 mb-md-0">
          <div class="d-flex align-center mb-6">
            <HomeAppLogo />
          </div>
          <p
            class="text-body-2 text-grey-lighten-1 mb-6 pr-md-10 leading-relaxed"
          >
            সরাসরি এনায়েতপুর, খামারগ্রামের বিখ্যাত ফ্যাক্টরির তৈরী লুঙ্গি এবং
            এনায়েতপুরের এক্সক্লুসিভ তাঁতের শাড়ি। ১০০% খাঁটি সুতা আর নিখুঁত
            বুননের নিশ্চয়তা। ঘরে বসেই অর্ডার করুন, পৌঁছে যাবে সারা বাংলাদেশে।
          </p>
          <!-- সোশ্যাল মিডিয়া বাটনস -->
          <div class="d-flex gap-3">
            <v-btn
              v-for="social in socialLinks"
              :key="social.icon"
              :icon="social.icon"
              :href="social.url"
              target="_blank"
              variant="tonal"
              size="small"
              class="social-hover"
              :style="{ color: brandColor }"
            />
          </div>
        </v-col>

        <!-- ২. কুইক লিংক (Quick Links) -->
        <v-col cols="6" md="2" class="mb-10 mb-md-0">
          <h3
            class="text-subtitle-1 font-weight-bold mb-6 text-uppercase tracking-wider"
            :style="{ color: brandColor }"
          >
            Shop By
          </h3>
          <v-list bg-color="transparent" density="compact" class="pa-0">
            <v-list-item
              v-for="link in shopLinks"
              :key="link.title"
              class="pa-0 min-h-0 mb-2"
            >
              <nuxt-link :to="link.to" class="footer-link">{{
                link.title
              }}</nuxt-link>
            </v-list-item>
          </v-list>
        </v-col>

        <!-- ৩. সার্ভিসেস (Engineering Services) -->
        <v-col cols="6" md="2" class="mb-10 mb-md-0">
          <h3
            class="text-subtitle-1 font-weight-bold mb-6 text-uppercase tracking-wider"
            :style="{ color: brandColor }"
          >
            Services
          </h3>
          <v-list bg-color="transparent" density="compact" class="pa-0">
            <v-list-item
              v-for="service in services"
              :key="service"
              class="pa-0 min-h-0 mb-2"
            >
              <span class="footer-link cursor-pointer">{{ service }}</span>
            </v-list-item>
          </v-list>
        </v-col>

        <!-- ৪. যোগাযোগ (Contact Info - Lucrative Design) -->
        <v-col cols="12" md="4">
          <h3
            class="text-subtitle-1 font-weight-bold mb-6 text-uppercase tracking-wider"
            :style="{ color: brandColor }"
          >
            Get In Touch
          </h3>

          <div class="contact-box pa-5 rounded-xl border-dashed mb-6">
            <div class="d-flex align-start mb-4">
              <v-icon icon="mdi-map-marker" :color="brandColor" class="mr-3" />
              <div class="text-body-2 text-grey-lighten-2">
                Hazi Abdul Kuddus Super Market, Betil Hatkhola, Enayetpur,
                Sirajganj
              </div>
            </div>

            <div class="d-flex align-center mb-4">
              <v-icon icon="mdi-phone" :color="brandColor" class="mr-3" />
              <a
                href="tel:+8801788001641"
                class="text-body-2 text-white text-decoration-none font-weight-bold"
              >
                +880 1788-001641
              </a>
            </div>

            <v-btn
              block
              color="success"
              prepend-icon="mdi-whatsapp"
              href="https://wa.link/e5oto8"
              target="_blank"
              class="font-weight-bold text-white mt-2"
              rounded="lg"
              size="large"
            >
              Order on WhatsApp
            </v-btn>
          </div>
        </v-col>
      </v-row>

      <v-divider class="my-10 border-opacity-25" />

      <!-- ফুটার বটম (Copyright & Trust) -->
      <div
        class="d-flex flex-column flex-md-row justify-space-between align-center"
      >
        <div class="text-caption text-grey mb-4 mb-md-0">
          © {{ new Date().getFullYear() }} <strong>Shareelungi.shop</strong>.
          All Rights Reserved.
        </div>

        <!-- পেমেন্ট মেথড আইকনস (Realistic Trust Building) -->
        <div class="d-flex align-center gap-4 opacity-50">
          <v-icon icon="mdi-credit-card-outline" size="24" />
          <v-icon icon="mdi-cash-marker" size="24" />
          <v-icon icon="mdi-bank-outline" size="24" />
          <v-icon icon="mdi-truck-delivery-outline" size="24" />
        </div>

        <div class="d-flex gap-4 mt-4 mt-md-0">
          <nuxt-link
            to="/"
            class="text-caption text-grey text-decoration-none hover-white"
            >Privacy Policy</nuxt-link
          >
          <nuxt-link
            to="/"
            class="text-caption text-grey text-decoration-none hover-white"
            >Terms & Conditions</nuxt-link
          >
        </div>
      </div>
    </v-container>
  </v-footer>
</template>

<script setup>
const brandColor = "white";

const shopLinks = [
  { title: "Saree", to: "/category/saree" },
  { title: "Lungi", to: "/category/lungi" },
  { title: "Ocassions", to: "/category/ocassions" },
  { title: "Festival", to: "/category/festival" },
];

const services = [
  "✅১০০% অরিজিনাল পণ্য",
  "✅সারা দেশে হোম ডেলিভারি",
  "✅সহজ রিটার্ন পলিসি",
  "✅নিরাপদ কেনাকাটা",
];

const socialLinks = [
  {
    icon: "mdi-facebook",
    url: "https://www.facebook.com/profile.php?id=61585209231735",
  },
  {
    icon: "mdi-facebook-messenger",
    url: "http://m.me/shareelungi.shop",
  },
  { icon: "mdi-whatsapp", url: "https://wa.link/e5oto8" },
  { icon: "mdi-instagram", url: "#" },
];
</script>

<style scoped>
.line-height-1 {
  line-height: 1 !important;
}
.gap-3 {
  gap: 12px;
}
.gap-4 {
  gap: 20px;
}
.min-h-0 {
  min-height: unset !important;
}

/* লিংক স্টাইলিং */
.footer-link {
  text-decoration: none;
  color: #bdbdbd;
  font-size: 12px;
  transition: all 0.3s ease;
  display: inline-block;
}

.footer-link:hover {
  color: white;
  transform: translateX(5px);
}

.hover-white:hover {
  color: white !important;
}

/* কন্টাক্ট বক্স ডিজাইন */
.contact-box {
  background: rgba(255, 255, 255, 0.03);
  border: 1px dashed rgba(255, 255, 255, 0.1);
  transition: border-color 0.3s ease;
}

.contact-box:hover {
  border-color: v-bind(brandColor);
}

/* সোশ্যাল বাটন অ্যানিমেশন */
.social-hover {
  background-color: rgba(255, 255, 255, 0.05) !important;
  transition:
    transform 0.3s ease,
    background-color 0.3s ease !important;
}

.social-hover:hover {
  transform: translateY(-5px);
  background-color: v-bind(brandColor) !important;
  color: green !important;
}

/* মোবাইল রেসপন্সিভ সেটিংস */
@media (max-width: 600px) {
  .v-footer {
    text-align: center;
  }
  .d-flex.align-start {
    justify-content: center;
    text-align: left;
  }
  .d-flex.gap-3,
  .d-flex.gap-4 {
    justify-content: center;
  }
  .footer-link:hover {
    transform: none;
  }
}
</style>
