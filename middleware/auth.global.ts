export default defineNuxtRouteMiddleware(async (to, from, ) => {
  if (
    to.path === "/login" ||
    to.path === "/signup" ||
    from.path === "/login" ||
    from.path === "signup"
  ) {
    return;
  }
  const {data: authStatus, error} = await useFetch('/api/authentication/permission', {
    credentials: 'include'
  })
  if (error.value || !authStatus || authStatus.value.loggedIn === false) {
    return navigateTo("/login");
  }
  return true
});
