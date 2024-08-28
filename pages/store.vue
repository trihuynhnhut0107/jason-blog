<template>
  <div class="text-4xl font-oswald">Store</div>
  <div class="grid grid-cols-3 grid-flow-row gap-5">
    <div v-for="item in itemSellingCount" class="flex flex-col p-2">
      <button
        @mouseleave="itemQuantity = 1"
        class="relative w-full h-full border rounded-md flex flex-col items-center justify-center">
        <img src="public\image\steal-10th_3D-600x679.jpg" alt="Item pic" />

        <div
          class="absolute inset-0 bg-gray-800 bg-opacity-75 space-x-2 flex flex-row items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <button
            class="border h-fit w-fit bg-white p-2"
            @click="itemQuantity--">
            -
          </button>
          <input
            type="text"
            class="h-auto w-auto text-center"
            v-model="itemQuantity" />
          <button class="border bg-white p-2" @click="itemQuantity++">+</button>
        </div>
      </button>
      <p>Item number: {{ item }}</p>
      <p>Price: $654</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "store",
});

const itemSellingCount = ref(5);
const itemQuantity = ref(1);
</script>

<style></style>
