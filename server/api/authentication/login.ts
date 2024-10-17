import axios from "axios";
export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);

  try {
    const response = await axios.post(
      "http://localhost/test-wp/wp-json/custom/v1/login",
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response && response.headers) {
      const setCookieHeader = response.headers["set-cookie"];
      console.log("setCookieHeader", setCookieHeader);
      if (setCookieHeader) {
        const cookieSetResponse = event.node.res.setHeader(
          "Set-Cookie",
          setCookieHeader
        );
        console.log("Cookie set response: ", cookieSetResponse);
      }
    }
    return response.data;
  } catch (error) {
    const statusCode = error.response?.status || 500;
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred";

    // Return the error in a structured format for all error cases
    event.node.res.statusCode = statusCode;
    return {
      code: statusCode === 403 ? "invalid_credentials" : "error",
      message: statusCode === 403 ? "Invalid username or password" : message,
      data: {
        status: statusCode,
      },
    };
  }
});
