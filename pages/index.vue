<template>
  <div class="space-y-6">
   
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useFetch } from "#app";
const config = useRuntimeConfig();

const options = ref({
  year: "numeric",
  month: "long",
  day: "numeric",
});

const currentPageNumber = ref(1);
const currentCategory = ref(0);
const purchasingPopupActive = ref(false);
const confirmPurchasingPost = ref(false);
const currentPost = ref(-1);

const { data: categoryInfo } = await useFetch(`/api/get_categories`, {
  params: {
    orderby: "id",
  },
});

function organizeCategories(categories) {
  const parentChildArray = [];
  const categoryMap = {};

  const allPostsSection = {
    id: 0, // Unique ID to avoid conflicts with actual categories
    name: "All Posts",
    isOpen: false,
    isSelected: true,
    children: [],
  };
  parentChildArray.push({
    parent: allPostsSection,
    isOpen: allPostsSection.isOpen,
    isSelected: allPostsSection.isSelected,
    children: allPostsSection.children,
  });

  // Step 1: Organize categories by ID and initialize children array
  categories.forEach((category) => {
    categoryMap[category.id] = { ...category, children: [] };
  });

  // Step 2: Populate child categories
  categories.forEach((category) => {
    if (category.parent === 0) {
      // If no parent, it's a parent category, excluding "Uncategorized"
      if (category.name !== "Uncategorized") {
        parentChildArray.push({
          parent: categoryMap[category.id],
          isOpen: false,
          isSelected: false,
          children: [],
        });
      }
    } else {
      // Else, it's a child category; add it to its parent's children array
      if (categoryMap[category.parent]) {
        categoryMap[category.parent].children.push(categoryMap[category.id]);
      }
    }
  });

  // Step 3: Map parent categories to include their populated children
  return parentChildArray.map((entry) => ({
    parent: entry.parent,
    isOpen: entry.isOpen,
    isSelected: entry.parent.isSelected,
    children: entry.parent.children,
  }));
}

const changeDropdownVisibility = (category, boolean) => {
  category.isOpen = boolean;
};
const changeCategory = (category) => {
  currentCategory.value = category.id;
  categoryList.value.forEach((entry) => {
    if (entry.parent.id === category.id) {
      entry.isSelected = true;
    } else {
      entry.isSelected = false;
    }
    entry.children.forEach((child) => {
      if (child.id === category.id) {
        child.isSelected = true;
      } else {
        child.isSelected = false;
      }
    });
  });
};

const categoryList = ref(organizeCategories(categoryInfo.value.data));

const { data, status, error, refresh } = await useFetch("/api/get_post_list", {
  params: {
    per_page: 2,
    page: currentPageNumber,
    category: currentCategory !== 0 ? currentCategory : undefined,
  },
  credentials: "include",
  watch: [purchasingPopupActive],
});

function navigateToPost(post: object) {
  navigateTo(`/${post.post.post_name}`);
}

watch(purchasingPopupActive, async (newValue) => {
  if (newValue === false) {
    refresh();
  }
});
</script>

<style scoped>
:deep(.line-clamp-3 p) {
  @apply font-roboto  text-start;
}
</style>
