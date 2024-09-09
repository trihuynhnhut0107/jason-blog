interface LoginData {
  username: string;
  password: string;
}

export async function useLogin(loginData: LoginData) {
  const userCookie = useCookie("user", {
    decode: (value) => {
      return value;
    },
  });
  const refreshToken = useCookie("refreshToken");
  const { data } = await useAPI("custom/v1/login", {
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

  console.log(data.value);

  if (data.value.status === "success") {
    userCookie.value = data.value?.cookie;
    refreshToken.value = data.value.cookie;
    navigateTo("/");
  }
}
