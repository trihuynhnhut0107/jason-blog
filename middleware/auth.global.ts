import {useLoginState} from '~/stores/useLoginState'
import { usePostToken } from '~/stores/usePostToken';
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
    const {setLoginState} = useLoginState()
    const {setUserBalance} = usePostToken();
    const authStatus = await $fetch('/api/authentication/permission', {
      credentials: 'include',
      headers: useRequestHeaders()
    });
    setLoginState(authStatus?.loggedIn)
    setUserBalance(authStatus?.token)
  } catch (error) {
    return navigateTo("/login");
  }

  return true;
});