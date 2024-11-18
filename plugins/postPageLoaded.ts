export default defineNuxtPlugin((nuxtApp) => {
  const route = useRoute();
  nuxtApp.hook("page:loading:end", () => {
    if (route.path.startsWith("/post/")) {
      console.log("Post page loaded");
    }
  });
});
