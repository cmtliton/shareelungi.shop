<template>
  <v-main class="bg-grey-lighten-5 pb-16">
    <!-- ১. প্রিমিয়াম হিরো সেকশন (Banner with Gradient) -->
    <v-sheet
      class="hero-bg d-flex align-center justify-center text-center position-relative"
      height="380"
      flat
    >
      <!-- Background Overlay for Premium Look -->
      <div class="overlay">-</div>

      <v-container class="position-relative z-index-1 mt-n8">
        <h1
          class="text-h3 text-md-h2 font-weight-black text-white mb-4 letter-spacing-1"
        >
          যোগাযোগ করুন
        </h1>
        <p
          class="text-h6 text-white font-weight-regular opacity-90 mx-auto"
          style="max-width: 600px"
        >
          আপনার পছন্দের এনায়েতপুরের শাড়ি বা অরিজিনাল সোয়াজ লুঙ্গি সম্পর্কে
          যেকোনো তথ্য জানতে আমাদের সাথে যোগাযোগ করুন।
        </p>
      </v-container>
    </v-sheet>

    <!-- Content Section pulled up over the banner (Modern overlapping UI) -->
    <v-container class="mt-n16 position-relative z-index-2 pb-16">
      <v-row>
        <!-- ২. ডিরেক্ট কন্টাক্ট কার্ডস (Mobile Responsive) -->
        <v-col cols="12">
          <v-row>
            <v-col
              v-for="(item, index) in contactInfo"
              :key="index"
              cols="12"
              md="4"
            >
              <v-card
                height="100%"
                class="pa-8 text-center shadow-hover transition-swing contact-card"
                rounded="2xl"
                border
                color="white"
              >
                <!-- Icon Avatar -->
                <v-avatar
                  :color="item.color"
                  size="75"
                  class="mb-5 elevation-3 icon-avatar"
                >
                  <v-icon :icon="item.icon" color="white" size="34" />
                </v-avatar>

                <h3 class="text-h6 font-weight-bold mb-3 text-grey-darken-4">
                  {{ item.title }}
                </h3>
                <p
                  class="text-body-1 text-grey-darken-1 mb-6"
                  style="line-height: 1.6"
                >
                  {{ item.desc }}
                </p>

                <!-- Action Button -->
                <v-btn
                  :href="item.link"
                  target="_blank"
                  variant="outlined"
                  :color="item.color"
                  rounded="pill"
                  class="font-weight-bold px-6 border-opacity-100 hover-fill"
                  elevation="0"
                >
                  {{ item.action }}
                  <v-icon icon="mdi-arrow-right" class="ml-2" size="small" />
                </v-btn>
              </v-card>
            </v-col>
          </v-row>
        </v-col>

        <!-- ৩. কন্টাক্ট ফর্ম (Form Component Placeholder) -->
        <v-col cols="12" md="7" class="mt-10">
          <ContactForm
            title="আমাদের মেসেজ পাঠান"
            subtitle="পণ্য, ডেলিভারি বা পাইকারি অর্ডার সংক্রান্ত যেকোনো প্রশ্নের জন্য নিচের ফর্মটি পূরণ করুন।"
          />
        </v-col>

        <!-- ৪. সোশ্যাল এবং লোকেশন ডিটেইলস (Woodmart Style Sidebar) -->
        <v-col cols="12" md="5" class="mt-10">
          <v-card
            flat
            rounded="2xl"
            color="white"
            class="pa-8 border h-100 d-flex flex-column shadow-sm"
          >
            <h2
              class="text-h5 font-weight-bold mb-6 text-grey-darken-4 border-bottom pb-4"
            >
              আমাদের ঠিকানা ও সোশ্যাল মিডিয়া
            </h2>

            <v-list class="bg-transparent pa-0">
              <!-- Location -->
              <v-list-item class="px-0 mb-5 align-start">
                <template #prepend>
                  <v-avatar color="#F9F6F0" size="48" class="mr-4">
                    <v-icon
                      color="#D32F2F"
                      size="28"
                      icon="mdi-map-marker-radius"
                    />
                  </v-avatar>
                </template>
                <v-list-item-title class="font-weight-bold text-body-1 mb-1">
                  আমাদের স্টোর
                </v-list-item-title>
                <v-list-item-subtitle
                  class="text-wrap text-body-2 text-grey-darken-2"
                  style="line-height: 1.5"
                >
                  Hazi Abdul Kuddus Super Market, Betil Hatkhola, Enayetpur,
                  Sirajganj.
                </v-list-item-subtitle>
              </v-list-item>

              <!-- Facebook -->
              <v-list-item class="px-0 mb-5 align-start">
                <template #prepend>
                  <v-avatar color="#E8F0FE" size="48" class="mr-4">
                    <v-icon color="#1877F2" size="28" icon="mdi-facebook" />
                  </v-avatar>
                </template>
                <v-list-item-title class="font-weight-bold text-body-1 mb-1">
                  ফেসবুক পেজ
                </v-list-item-title>
                <v-list-item-subtitle>
                  <a
                    href="https://www.facebook.com/shareelungi.shop"
                    target="_blank"
                    class="text-decoration-none text-grey-darken-2 fb-link"
                  >
                    @shareelungi.shop
                  </a>
                </v-list-item-subtitle>
              </v-list-item>

              <!-- Messenger -->
              <v-list-item class="px-0 align-start">
                <template #prepend>
                  <v-avatar color="#E8F0FE" size="48" class="mr-4">
                    <v-icon
                      color="#0084FF"
                      size="28"
                      icon="mdi-facebook-messenger"
                    />
                  </v-avatar>
                </template>
                <v-list-item-title class="font-weight-bold text-body-1 mb-1">
                  মেসেঞ্জার সাপোর্ট
                </v-list-item-title>
                <v-list-item-subtitle>
                  <a
                    href="http://m.me/shareelungi.shop"
                    target="_blank"
                    class="text-decoration-none text-grey-darken-2 fb-link"
                  >
                    লাইভ চ্যাট করুন
                  </a>
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>

            <v-spacer />

            <!-- Decorative Map/Store Image Placeholder -->
            <div
              class="mt-8 rounded-xl overflow-hidden position-relative image-hover"
            >
              <NuxtImg
                src="/images/store-location.webp"
                alt="shareelungi.shop store location"
                height="200"
                cover
                fit="cover"
                format="webp"
                loading="lazy"
                class="w-100 h-100 transition-swing"
              />
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
// Brand Colors
const primaryColor = "#D32F2F"; // Crimson Red
const secondaryColor = "#FFB300"; // Golden Yellow

// Contact Cards Data
const contactInfo = [
  {
    title: "WhatsApp সাপোর্ট",
    desc: "অর্ডার, সাইজ বা পণ্যের ছবি দেখতে সরাসরি হোয়াটসঅ্যাপে মেসেজ দিন।",
    icon: "mdi-whatsapp",
    action: "মেসেজ দিন",
    link: "https://wa.link/e5oto8",
    color: "#25D366", // WhatsApp Green for instant recognition
  },
  {
    title: "সরাসরি কল করুন",
    desc: "যেকোনো প্রয়োজনে আমাদের কাস্টমার কেয়ারে কল করুন (সকাল ৯টা - রাত ১০টা)।",
    icon: "mdi-phone-in-talk-outline",
    action: "কল করুন",
    link: "tel:+8801XXXXXXXXX", // আপনার ফোন নাম্বার দিন
    color: primaryColor,
  },
  {
    title: "স্টোর ভিজিট করুন",
    desc: "সরাসরি পণ্য দেখে কিনতে আমাদের সিরাজগঞ্জের স্টোরে চলে আসুন।",
    icon: "mdi-storefront-outline",
    action: "ম্যাপ দেখুন",
    link: "https://www.google.com/maps/search/Hazi+Abdul+Kuddus+Super+Market,+Betil+Hatkhola,+Enayetpur,+Sirajganj",
    color: secondaryColor,
  },
];

// Modern Nuxt 4 SEO Meta
useSeoMeta({
  title: "যোগাযোগ করুন | shareelungi.shop",
  description:
    "এনায়েতপুরের ঐতিহ্যবাহী শাড়ি এবং অরিজিনাল সোয়াজ লুঙ্গি সম্পর্কে জানতে shareelungi.shop-এর সাথে যোগাযোগ করুন। আমাদের স্টোর: Hazi Abdul Kuddus Super Market, Enayetpur.",
  ogTitle: "যোগাযোগ করুন | shareelungi.shop",
  ogDescription:
    "পণ্য, ডেলিভারি বা পাইকারি অর্ডারের জন্য আমাদের সাথে যোগাযোগ করুন।",
  ogImage: "https://shareelungi.shop/images/Og.jpg",
});
</script>

<style scoped>
/* Hero Section with Premium Gradient */
.hero-bg {
  background: linear-gradient(135deg, #bd2121 0%, #d32f2f 50%, #e63e3e 100%);
  background-size: cover;
  background-position: center;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.3) 100%
  );
}

.z-index-1 {
  z-index: 1;
}
.z-index-2 {
  z-index: 2;
}

/* Contact Cards Modern Hover Effect */
.contact-card {
  border-color: rgba(0, 0, 0, 0.05) !important;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.contact-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(211, 47, 47, 0.08) !important; /* Subtle red shadow */
  border-color: rgba(211, 47, 47, 0.2) !important;
}

.icon-avatar {
  transition: transform 0.4s ease;
}

.contact-card:hover .icon-avatar {
  transform: scale(1.1) rotate(5deg);
}

/* Button Hover Fill Animation */
.hover-fill {
  transition: all 0.3s ease;
}
.hover-fill:hover {
  background-color: currentColor !important;
  color: white !important;
}

/* Sidebar Utilities */
.border-bottom {
  border-bottom: 2px solid #f9f6f0;
}

.fb-link {
  transition: color 0.2s ease;
}
.fb-link:hover {
  color: #d32f2f !important; /* Crimson Red on hover */
  text-decoration: underline !important;
}

.image-hover img {
  transition: transform 0.6s ease;
}
.image-hover:hover img {
  transform: scale(1.05);
}

/* Typography & Utilities */
.text-wrap {
  white-space: normal;
}
.letter-spacing-1 {
  letter-spacing: 1px;
}

@media (max-width: 600px) {
  .text-h3 {
    font-size: 2rem !important;
    line-height: 1.2;
  }
}
</style>
