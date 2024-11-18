export default defineNuxtRouteMiddleware(async (to, from) => {
  if (
    to.path === "/login" ||
    to.path === "/signup" ||
    from.path === "/login" ||
    from.path === "/signup"
  ) {
    return;
  }
  try {
    const authStatus = await $fetch('/api/authentication/permission', {
      credentials: 'include',
      headers: useRequestHeaders()
    });
    if (!authStatus || authStatus.loggedIn === false) {
      return navigateTo("/login");
    }
  } catch (error) {
    return navigateTo("/login");
  }

  return true;
});