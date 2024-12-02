import { useLoginState } from '~/stores/useLoginState';
import { usePostToken } from '~/stores/usePostToken';
interface LoginData {
  username: string;
  password: string;
}

export async function useLogin(loginData: LoginData) {
  const { setLoginState  } = useLoginState()
  const { setUserBalance } = usePostToken()
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

    setLoginState(true)
    setUserBalance(data.token)
    navigateTo("/");
    return "Success";
  } catch (error) {
    return error?.data?.message || "An error occurred";
  }
}
