import axios from "axios";
export default defineEventHandler(async (event) => {
  const { email, username, password } = await readBody(event);

  try {
    const response = await axios.post(
      "http://localhost/test-wp/wp-json/custom/v1/signup",
      {
        username,
        password,
        email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
      message: message,
      data: {
        status: statusCode,
      },
    };
  }
});
