<template>
  <div
    class="flex flex-col h-full w-full justify-center items-center space-y-4 my-auto"
  >
    <img :src="data.data.qrDataURL" alt="" />
    <p class="font-roboto text-xl">
      Please click the button below after completed the payment.
    </p>
    <p class="font-roboto text-xl">
      Token amount will be updated after when admin verifies the payment.
    </p>
    <NuxtLink
      to="/"
      class="border-2 px-4 py-2 hover:bg-black hover:text-white rounded-md font-roboto text-xl"
    >
      Complete Payment
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import { useFetch } from "#app";
definePageMeta({
  layout: "store",
  middleware: "payment-access",
});

const tokenAmount = Number(useCookie("tokenQuantity").value);

const tokenPrice = 1000;
const config = useRuntimeConfig();
const { data, status, error, refresh } = await useFetch('https://api.vietqr.io/v2/generate', {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-client-id": "5a0397ec-5551-498d-b3e5-78e16eecc535",
    "x-api-key": "77912649-c1f3-4370-bbf4-04b713a645dd",
  },
  body: JSON.stringify({
    accountNo: config.public.accountNumber,
    accountName: config.public.accountName,
    acqId: config.public.bankBinNumber,
    addInfo: config.public.paymentInfo,
    amount: tokenAmount * tokenPrice,
    template: "compact2",
  })
});
</script>
<style></style>
