interface LoginData {
  username: string;
  password: string;
}

export async function useLogin(loginData: LoginData) {
  try {
    const data = await $fetch("/api/authentication/login", {
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
  
    navigateTo("/");
    return "Success";
  } catch (error) {
    return error?.data?.message || "An error occurred";
  }
}
