<template>
  <div>
    <img :src="paymentQRData.data.qrDataURL" alt="" />
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
      accountNo: process.env.BANK_ACCOUNT_NUMBER,
      accountName: process.env.BANK_ACCOUNT_NAME,
      acqId: process.env.BANK_BIN_NUMBER,
      addInfo: process.env.PAYMENT_INFO,
      amount: tokenAmount * tokenPrice,
      template: "compact",
    }),
  }
);

console.log(paymentQRData.value);
console.log(error.value);
</script>

<style></style>
