export default defineNuxtRouteMiddleware((to, from) => {
  if (from.path !== "/store") {
    return navigateTo("/");
  }
});
