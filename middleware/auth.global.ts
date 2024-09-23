export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.path === "/login" || to.path === "/signup") {
    return;
  }

  const userCookie = useCookie("user");
  if (!userCookie.value) {
    return navigateTo("/login");
  }
  const { data, error } = await useAPI("custom/v1/secure-data", {
    credentials: "include",
  });
  if (error.value) {
    useLogout();
  }
});
