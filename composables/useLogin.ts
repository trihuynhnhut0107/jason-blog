interface LoginData {
  username: string;
  password: string;
}

export async function useLogin(loginData: LoginData) {
  const userCookie = useCookie("user", {
    maxAge: 60 * 60 * 1, // 1 hour
  });
  const { data, error } = await useAPI("custom/v1/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      username: loginData.username,
      password: loginData.password,
    }),
  });

  if (data.value) {
    userCookie.value = data.value.cookie;
    navigateTo("/");
    return "Success";
  } else if (error.value) {
    return error.value.data.message;
  }
}
