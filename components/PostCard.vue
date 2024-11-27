<script lang="ts" setup>
import placeholderImage from '~/assets/image/elementor-placeholder-image.webp';
import avatar from '~/assets/image/itachi.webp'
const { post } = defineProps({
  post: Object,
});
const getTruncatedContent = (content) => {
  return content.length > 200 ? content.slice(0, 200) + "..." : content;
};
</script>
<template>
  <div class="w-full flex gap-4 border border-black min-w-[786px]">
    <img
      :src="post.featured_image || placeholderImage"
      class="w-1/2"
    />
    <div class="flex flex-col text-left w-full">
      <div class="w-full flex gap-2 text-[rgb(24, 24, 24)] mt-4">
        <img :src="avatar" class="w-8 h-8 !aspect-square rounded-full"/>
        <div class="flex flex-col text-xs font-light">
          <p>Jason W.Ke</p>
          <p>{{ post.post.post_date }}</p>
        </div>
      </div>
      <p class="text-2xl font-medium mt-6">{{ post.post.post_title }}</p>
      <div
        
        class="!text-sm line-clamp-3 mt-2 text-[#181818] border-b pb-4 mr-8 w-[90%]"
      >
        <div v-html="getTruncatedContent(post.post.post_content)"> 

        </div>
      </div>
      <div class="flex text-xs mt-2">
        <p>{{ post.view_count }} views count</p>
      </div>
    </div>
  </div>
</template>
