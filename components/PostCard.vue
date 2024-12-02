<script lang="ts" setup>
import placeholderImage from "~/assets/image/elementor-placeholder-image.webp";
import avatar from "~/assets/image/itachi.webp";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const { post } = defineProps({
  post: Object,
});

const getTruncatedContent = (content) => {
  return content.length > 200 ? content.slice(0, 200) + "..." : content;
};
</script>
<template>
  <div class="w-full flex gap-4 border border-black min-w-[786px]">
    <img :src="post.featured_image || placeholderImage" class="w-1/2" />
    <div class="flex flex-col text-left w-full">
      <div
        class="w-full flex gap-2 text-[rgb(24, 24, 24)] mt-4 justify-between text-xs font-light"
      >
        <div class="flex gap-2 w-full">
          <img :src="avatar" class="w-8 h-8 !aspect-square rounded-full" />
          <div class="flex flex-col w-full">
            <p>Jason W.Ke</p>
            <div class="flex w-full justify-between">
              <p>{{ post.post.post_date }}</p>
              <div class="mr-2">
                {{ post.product_price }} <font-awesome :icon="faStar" class="text-[#FFDF00]" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <p class="text-2xl font-medium mt-4 line-clamp-2 hover:text-red-text">{{ post.post.post_title }}</p>
      <div
        class="!text-sm line-clamp-3 mt-2 text-[#181818] border-b pb-4 mr-8 w-[90%] h-[4rem]"
      >
        <div class="hover:text-red-text" v-html="getTruncatedContent(post.post.post_content)"></div>
      </div>
      <div class="flex text-xs mt-2 pb-2">
        <p>{{ post.view_count }} views count</p>
      </div>
    </div>
  </div>
</template>
