export const useLogout = () => {
  const userCookie = useCookie("user");
  userCookie.value = null;
  navigateTo("/login");
};
