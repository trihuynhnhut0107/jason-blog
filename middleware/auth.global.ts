export default defineNuxtRouteMiddleware(async (to, from) => {
  if (
    to.path === "/login" ||
    to.path === "/signup" ||
    from.path === "/login" ||
    from.path === "signup"
  ) {
    return;
  }
  const { data: authStatus, error } = await useAPI("custom/v1/permission", {
    credentials: "include",
  });
  console.log(error, !authStatus, authStatus.value.loggedIn);
  if (error.value || !authStatus || authStatus.value.loggedIn === false) {
    return navigateTo("/login");
  }
});
