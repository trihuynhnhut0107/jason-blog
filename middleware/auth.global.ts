export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path === "/login" || to.path === "/signup") {
    return;
  }
  const userCookie = useCookie("user");

  if (!userCookie.value) {
    return navigateTo("/login");
  }

  // const { data : verifyInfo } = useAPI("custom/v1/secure-data")

  // if (verifyInfo.value.status !== 200) {
  //   return navigateTo("/login");
  // }
});
