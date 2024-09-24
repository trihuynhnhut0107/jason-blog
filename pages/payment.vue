<template>
  <div class="flex flex-col h-full w-full justify-center items-center">
    <img :src="paymentQRData.data.qrDataURL" alt="" />
    <button>Complete Payment</button>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "store",
  middleware: "payment-access",
});

const tokenAmount = Number(useCookie("tokenQuantity").value);
console.log(tokenAmount);

const tokenPrice = 1000;
const config = useRuntimeConfig();

const { data: paymentQRData, error } = await useFetch(
  "https://api.vietqr.io/v2/generate",
  {
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
      template: "compact",
    }),
  }
);
</script>

<style></style>
