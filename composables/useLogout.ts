export const useLogout = () => {
  const { data } = useAPI("custom/v1/logout", {
    method: "POST",
    credentials: "include",
  });
  console.log(data.value);
  navigateTo("/login");
};
