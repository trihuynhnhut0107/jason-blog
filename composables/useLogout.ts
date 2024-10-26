export const useLogout = async () => {
  try {
    const data = await $fetch('http://localhost:8000/wp-json/custom/v1/logout', {
      method: 'POST',
      credentials: 'include',
    });
  } catch (error) {
    console.error('Error during logout:', error);
  }
  finally {
    navigateTo("/login");
  }
};
