<template>
  <v-main class="bg-grey-lighten-5 pb-16">
    <!-- ১. প্রিমিয়াম হিরো সেকশন (Sleek Dark Premium Vibe) -->
    <v-sheet
      class="hero-bg d-flex align-center justify-center text-center position-relative"
      height="420"
      flat
    >
      <!-- Background Overlay -->
      <div class="overlay">{{}}</div>

      <v-container class="position-relative z-index-1 mt-n10">
        <v-chip
          color="#FFB300"
          variant="flat"
          class="text-black font-weight-bold mb-4 px-6 text-uppercase"
          size="small"
          style="letter-spacing: 2px"
        >
          24/7 Support
        </v-chip>
        <h1
          class="text-h3 text-md-h2 font-weight-black text-white mb-4 letter-spacing-1"
        >
          যোগাযোগ <span style="color: #ffb300">করুন</span>
        </h1>
        <p
          class="text-h6 text-grey-lighten-2 font-weight-regular mx-auto"
          style="max-width: 650px; line-height: 1.6"
        >
          আপনার পছন্দের এনায়েতপুরের শাড়ি বা অরিজিনাল লুঙ্গি সম্পর্কে যেকোনো তথ্য
          বা পাইকারি অর্ডারের জন্য আমাদের সাথে যোগাযোগ করুন।
        </p>
      </v-container>
    </v-sheet>

    <!-- ২. ওভারল্যাপিং কন্টেন্ট সেকশন -->
    <v-container class="mt-n16 position-relative z-index-2 pb-16">
      <v-row>
        <!-- ডিরেক্ট কন্টাক্ট কার্ডস -->
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
                  :color="item.bgColor"
                  size="80"
                  class="mb-6 icon-avatar"
                >
                  <v-icon :icon="item.icon" :color="item.iconColor" size="36" />
                </v-avatar>

                <h3 class="text-h6 font-weight-bold mb-3 text-grey-darken-4">
                  {{ item.title }}
                </h3>
                <p
                  class="text-body-1 text-grey-darken-1 mb-8"
                  style="line-height: 1.6"
                >
                  {{ item.desc }}
                </p>

                <!-- Action Button -->
                <v-btn
                  :href="item.link"
                  target="_blank"
                  :color="item.btnColor"
                  variant="flat"
                  rounded="pill"
                  class="font-weight-bold px-8 btn-hover-effect"
                  :class="{
                    'text-black': item.btnColor === '#FFB300',
                    'text-white': item.btnColor !== '#FFB300',
                  }"
                  elevation="2"
                  size="large"
                >
                  {{ item.action }}
                  <v-icon icon="mdi-arrow-right" class="ml-2" size="small" />
                </v-btn>
              </v-card>
            </v-col>
          </v-row>
        </v-col>

        <!-- ৩. কন্টাক্ট ফর্ম (Beautiful Form Integration) -->
        <v-col cols="12" md="7" class="mt-10">
          <v-card
            class="pa-8 pa-md-10 shadow-sm border h-100"
            rounded="2xl"
            flat
          >
            <div class="mb-8">
              <h2 class="text-h4 font-weight-bold text-grey-darken-4 mb-2">
                আমাদের মেসেজ পাঠান
              </h2>
              <p class="text-body-1 text-grey-darken-1">
                পণ্য, ডেলিভারি বা কাস্টম অর্ডারের বিষয়ে জানতে ফর্মটি পূরণ করুন।
              </p>
            </div>

            <v-form @submit.prevent="submitForm">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    label="আপনার নাম"
                    variant="outlined"
                    color="#FFB300"
                    bg-color="grey-lighten-5"
                    rounded="lg"
                    hide-details="auto"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    label="মোবাইল নম্বর"
                    type="tel"
                    variant="outlined"
                    color="#FFB300"
                    bg-color="grey-lighten-5"
                    rounded="lg"
                    hide-details="auto"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="ইমেইল (ঐচ্ছিক)"
                    type="email"
                    variant="outlined"
                    color="#FFB300"
                    bg-color="grey-lighten-5"
                    rounded="lg"
                    hide-details="auto"
                  />
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    label="আপনার মেসেজ লিখুন..."
                    variant="outlined"
                    color="#FFB300"
                    bg-color="grey-lighten-5"
                    rounded="lg"
                    rows="5"
                    hide-details="auto"
                  />
                </v-col>
                <v-col cols="12" class="mt-2">
                  <v-btn
                    type="submit"
                    color="#FFB300"
                    size="x-large"
                    rounded="pill"
                    class="text-black font-weight-bold px-10"
                    elevation="2"
                  >
                    মেসেজ পাঠান
                    <v-icon icon="mdi-send-outline" class="ml-3" />
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card>
        </v-col>

        <!-- ৪. লোকেশন ও সোশ্যাল মিডিয়া সাইডবার -->
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
              ঠিকানা ও সোশ্যাল মিডিয়া
            </h2>

            <v-list class="bg-transparent pa-0">
              <v-list-item class="px-0 mb-5 align-start">
                <template #prepend>
                  <v-avatar color="#fff4d9" size="48" class="mr-4">
                    <v-icon
                      color="#FFB300"
                      size="26"
                      icon="mdi-map-marker-radius"
                    />
                  </v-avatar>
                </template>
                <v-list-item-title class="font-weight-bold text-body-1 mb-1"
                  >আমাদের স্টোর</v-list-item-title
                >
                <v-list-item-subtitle
                  class="text-wrap text-body-2 text-grey-darken-2"
                  style="line-height: 1.6"
                >
                  Hazi Abdul Kuddus Super Market,</v-list-item-subtitle
                >
                <v-list-item-subtitle
                  >Betil Hatkhola, Enayetpur, Sirajganj.
                </v-list-item-subtitle>
              </v-list-item>

              <v-list-item class="px-0 mb-5 align-start">
                <template #prepend>
                  <v-avatar color="#E8F0FE" size="48" class="mr-4">
                    <v-icon color="#1877F2" size="26" icon="mdi-facebook" />
                  </v-avatar>
                </template>
                <v-list-item-title class="font-weight-bold text-body-1 mb-1"
                  >ফেসবুক পেজ</v-list-item-title
                >
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
            </v-list>

            <v-spacer />

            <!-- Real Google Map Embed for Professional Look -->
            <div class="mt-6 rounded-xl overflow-hidden border map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14578.43555541604!2d89.6841794!3d24.1648931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fdfce5f2c41ad7%3A0xbd7d21394f1fc495!2sEnayetpur!5e0!3m2!1sen!2sbd!4v1710698145239!5m2!1sen!2sbd"
                width="100%"
                height="220"
                style="border: 0"
                allowfullscreen="true"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
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
const primaryColor = "#FFB300"; // Golden Yellow (Primary)
const accentColor = "#D32F2F"; // Crimson Red

// Contact Cards Data
const contactInfo = [
  {
    title: "WhatsApp সাপোর্ট",
    desc: "অর্ডার, সাইজ বা পণ্যের ছবি দেখতে সরাসরি হোয়াটসঅ্যাপে মেসেজ দিন।",
    icon: "mdi-whatsapp",
    action: "মেসেজ দিন",
    link: "https://wa.link/e5oto8",
    bgColor: "#e8f9ee",
    iconColor: "#25D366", // WhatsApp Green
    btnColor: "#25D366",
  },
  {
    title: "সরাসরি কল করুন",
    desc: "যেকোনো প্রয়োজনে আমাদের কাস্টমার কেয়ারে কল করুন (সকাল ৯টা - রাত ১০টা)।",
    icon: "mdi-phone-in-talk",
    action: "কল করুন",
    link: "tel:+8801XXXXXXXXX", // আপনার ফোন নাম্বার দিন
    bgColor: "#fff4d9",
    iconColor: primaryColor,
    btnColor: primaryColor,
  },
  {
    title: "স্টোর ভিজিট করুন",
    desc: "সরাসরি পণ্য দেখে কিনতে আমাদের সিরাজগঞ্জের স্টোরে চলে আসুন।",
    icon: "mdi-storefront",
    action: "ম্যাপ দেখুন",
    link: "https://www.google.com/maps/search/Hazi+Abdul+Kuddus+Super+Market,+Betil+Hatkhola,+Enayetpur,+Sirajganj",
    bgColor: "#faeaea",
    iconColor: accentColor,
    btnColor: accentColor,
  },
];

// Form Submit Handler Mockup
const submitForm = () => {
  alert(
    "ধন্যবাদ! আপনার মেসেজটি সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই যোগাযোগ করব।",
  );
};

// Modern Nuxt 4 SEO Meta
useSeoMeta({
  title: "যোগাযোগ করুন | shareelungi.shop",
  description:
    "এনায়েতপুরের ঐতিহ্যবাহী শাড়ি এবং অরিজিনাল লুঙ্গি সম্পর্কে জানতে shareelungi.shop-এর সাথে যোগাযোগ করুন। স্টোর: Hazi Abdul Kuddus Super Market, Enayetpur.",
  ogTitle: "যোগাযোগ করুন | shareelungi.shop",
  ogDescription:
    "পণ্য, ডেলিভারি বা পাইকারি অর্ডারের জন্য আমাদের সাথে যোগাযোগ করুন।",
  ogImage: "https://shareelungi.shop/images/Og.jpg",
});
</script>

<style scoped>
/* High-End Dark Premium Hero Background */
.hero-bg {
  background: linear-gradient(135deg, #2b1815 0%, #1a0f0d 100%);
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
    rgba(211, 47, 47, 0.1) 0%,
    rgba(0, 0, 0, 0.6) 100%
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
  border-color: rgba(0, 0, 0, 0.06) !important;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.contact-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06) !important;
  border-color: #ffb300 !important; /* Brand color border on hover */
}

.icon-avatar {
  transition: transform 0.4s ease;
}

.contact-card:hover .icon-avatar {
  transform: scale(1.1) rotate(5deg);
}

/* Button Animations */
.btn-hover-effect {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}
.btn-hover-effect:hover {
  transform: translateY(-2px);
}

/* Sidebar Utilities */
.border-bottom {
  border-bottom: 2px solid #f9f6f0;
}

.fb-link {
  transition: color 0.2s ease;
}
.fb-link:hover {
  color: #1877f2 !important;
  text-decoration: underline !important;
}

/* Map Container Hover */
.map-container {
  transition: box-shadow 0.3s ease;
}
.map-container:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
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
    font-size: 2.2rem !important;
    line-height: 1.3;
  }
}
</style>
