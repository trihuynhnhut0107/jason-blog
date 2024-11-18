<template>
  <div class="space-y-6">
    <PostUnlockConfirmation
      v-model:popupActive="purchasingPopupActive"
      v-model:purchasingPost="confirmPurchasingPost"
      v-model:currentPost="currentPost" />

    <div class="flex flex-row space-x-2 justify-center items-center w-full">
      <div v-for="(category, index) in categoryList">
        <div
          v-if="category.children.length !== 0"
          class="relative inline-block"
          @click="changeDropdownVisibility(category, !category.isOpen)"
          @mouseenter="changeDropdownVisibility(category, true)"
          @mouseleave="changeDropdownVisibility(category, false)">
          <!-- Dropdown Button -->
          <button
            class="inline-flex justify-center w-full shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            :class="`${category.isOpen ? 'border-b-2 border-black' : ''}`">
            {{ category.parent.name }}
          </button>
          <!-- Dropdown Menu -->
          <div
            v-if="category.isOpen"
            class="absolute w-24 text-sm md:w-24 md:text-base text-start rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div class="py-1 flex flex-col" role="menu">
              <div v-for="subCategory in category.children" class="px-4 py-2">
                <button
                  class="text-start w-full"
                  :class="`${subCategory.isSelected ? 'text-red-text' : ''}`"
                  @click="changeCategory(subCategory)">
                  {{ subCategory.name }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <button
            class="inline-flex justify-center w-full shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            :class="`${
              category.isSelected
                ? 'text-red-text border-b-2 border-red-text'
                : ''
            }`"
            @click="changeCategory(category.parent)">
            {{ category.parent.name }}
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="
        (data.data.posts && data.data.total_pages > 0) || status === 'pending'
      "
      class="flex flex-col">
      <div
        v-for="item in data.data.posts"
        :key="item.id"
        class="flex flex-col py-4">
        <button
          class="space-y-3"
          @click="navigateToPost(item)"
          :class="`${
            item.has_access ? '' : 'pointer-events-none cursor-not-allowed'
          } hover:text-red-text`">
          <h1 class="text-4xl text-start font-oswald py-4">
            {{ item.post.post_title }}
          </h1>
          <h5 class="text-start">
            {{
              new Date(item.post.post_date).toLocaleDateString("en-US", options)
            }}
          </h5>
          <div v-html="item.post.post_content" class="line-clamp-3"></div>
        </button>
      </div>

      <div
        class="flex flex-row items-center justify-center space-x-1 text-center">
        Page:
        <input
          type="text"
          v-model="currentPageNumber"
          class="text-center w-12 border-2 p-1 m-1 rounded-md" />
        /
        {{ data.data.total_pages }}
      </div>
    </div>
    <div v-else>
      <h1>No available post</h1>
    </div>
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
console.log(categoryInfo.value);

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
  console.log(categoryList.value);
};

const categoryList = ref(organizeCategories(categoryInfo.value.data));

console.log(categoryList.value);

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
