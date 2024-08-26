export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path === "/login" || to.path === "/signup") {
    return;
  }
  const userCookie = useCookie("user");

  if (!userCookie.value) {
    return navigateTo("/login");
  }

  // const { data: verifyInfo, error: verifyError } = useAPI(
  //   "custom/v1/secure-data"
  // );
  // console.log(verifyInfo.value);
  // console.log(verifyError.value);
});
