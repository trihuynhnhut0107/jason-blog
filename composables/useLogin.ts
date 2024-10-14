interface LoginData {
  username: string;
  password: string;
}

export async function useLogin(loginData: LoginData) {
  const { data, error } = await useFetch("/api/authentication/login", {
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
    navigateTo("/");
    return "Success";
  }
  
  if (error.value) {
    return error.value.data.message || "An error occurred";
  }
}
