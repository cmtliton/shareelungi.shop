<script setup lang="ts">
import { computed } from "vue";

// Modern Nuxt 4 / Vue 3.3+ TS Interface for props
interface Props {
  height?: string | number;
  width?: string | number;
}

const props = withDefaults(defineProps<Props>(), {
  height: 50,
  width: "auto",
});

// Computed property for dynamic inline styles
const style = computed(() => ({
  height: typeof props.height === "number" ? `${props.height}px` : props.height,
  width:
    props.width === "auto"
      ? "auto"
      : typeof props.width === "number"
        ? `${props.width}px`
        : props.width,
}));
</script>

<template>
  <!-- Added semantic HTML structure for Headless Commerce SEO -->
  <NuxtLink
    to="/"
    class="logo-link"
    aria-label="Go to shareelungi.shop homepage"
  >
    <div class="logo-wrapper" :style="style">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 150"
        class="logo-svg"
        role="img"
        aria-label="shareelungi.shop brand logo"
      >
        <!-- Background (Cotton Off-White) -->
        <rect width="500" height="150" fill="#F9F6F0" rx="10" />

        <!-- Fabric Diamond 1 (Red Saree) -->
        <polygon
          points="60,35 85,75 60,115 35,75"
          fill="#D32F2F"
          opacity="0.9"
        />

        <!-- Fabric Diamond 2 (Yellow Lungi) -->
        <polygon
          points="85,35 110,75 85,115 60,75"
          fill="#FFB300"
          opacity="0.9"
        />

        <!-- Brand Name (Font size increased from 50 to 54) -->
        <text
          x="135"
          y="83"
          font-family="'Segoe UI', Roboto, Helvetica, sans-serif"
          font-size="60"
          font-weight="900"
          fill="#212121"
        >
          sharee
          <tspan fill="#D32F2F">lungi</tspan>
        </text>

        <!-- Domain Extension (Font size increased from 30 to 33) -->
        <text
          x="140"
          y="120"
          font-family="'Segoe UI', Roboto, Helvetica, sans-serif"
          font-size="35"
          font-weight="700"
          fill="#FFB300"
          letter-spacing="5"
        >
          .SHOP
        </text>
      </svg>
    </div>
  </NuxtLink>
</template>

<style scoped>
.logo-link {
  text-decoration: none;
  display: inline-block;
}

.logo-wrapper {
  display: inline-block;
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); /* Woodmart style smooth transition */
  will-change: transform;
}

/* Premium E-commerce Hover Effect */
.logo-link:hover .logo-wrapper {
  transform: scale(1.02);
}

.logo-svg {
  height: 100%;
  width: auto;
  display: block;
  /* Optional: Drop shadow for depth */
  /* filter: drop-shadow(0px 4px 6px rgba(0,0,0,0.05)); */
}
</style>
