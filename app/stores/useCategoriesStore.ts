import { defineStore } from "pinia";

export const useCategoriesStore = defineStore(
  "useCategoriesStore",
  () => {
    const categories = ref<any[]>([]);
    const pending = ref(false);
    // ২. গেটার (Getter) - নাম অনুযায়ী সর্ট করা
    const getCategories = computed(() => {
      // original array পরিবর্তন না করে একটি কপি নিয়ে সর্ট করা নিরাপদ
      return [...categories.value].sort((a, b) => {
        const nameA = a.name || "";
        const nameB = b.name || "";
        return nameA.localeCompare(nameB); // মডার্ন টেক্সট সর্টিং পদ্ধতি
      });
    });

    // ৩. অ্যাকশন (Action) - এপিআই থেকে ডাটা আনা
    const setCategories = async () => {
      try {
        pending.value = true;
        const data = await $fetch<any[]>("/api/categories");
        const cleanData = JSON.parse(JSON.stringify(data || [])); // ডাটা ক্লিন করা হচ্ছে
        categories.value = cleanData;
      } catch (error) {
        console.error("Failed to set categories:", error);
      } finally {
        pending.value = false;
      }
    };

    // ৪. স্লাগ দিয়ে ক্যাটাগরি খুঁজে বের করা
    const getCategoriesBySlug = (slug: string) => {
      const foundCategory = getCategories.value.find(
        (cat: any) => cat.slug === slug,
      );
      return foundCategory ? JSON.parse(JSON.stringify(foundCategory)) : null;
    };

    // ५. মেগা মেনু ক্যাটাগরি পান
    /**
     * WooCommerce ক্যাটাগরিগুলোকে ট্রি স্ট্রাকচারে রূপান্তর করার ফাংশন
     * @param {Array} categories - স্টোর থেকে প্রাপ্ত ফ্ল্যাট অ্যারে
     * @param {Number} parentId - মেইন প্যারেন্ট আইডি (ডিফল্ট ০)
     */
    const buildCategoryTree = (categories: any[], parentId = 0) => {
      return categories
        .filter(
          (item) => item.parent === parentId && item.slug !== "uncategorized",
        ) // Uncategorized বাদ দেওয়া হয়েছে
        .map((item) => {
          const children = buildCategoryTree(categories, item.id); // রিকারসিভলি চাইল্ড খোঁজা হচ্ছে

          const node: any = {
            name: item.name,
            slug: item.slug,
            to: `/category/${item.slug}`,
            description: item.description || "",
          };

          // যদি চাইল্ড থাকে তবেই 'children' প্রপার্টি যোগ করবে
          if (children.length > 0) {
            node.children = children;
          }

          return node;
        });
    };

    return {
      categories,
      setCategories,
      getCategories,
      getCategoriesBySlug,
      buildCategoryTree,
    };
  },
  {
    persist: true, // ব্রাউজার রিফ্রেশ করলেও ডাটা হারাবে না
  },
);
