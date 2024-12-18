import axios from "axios";
import { useFetch } from "nuxt/app";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const slug = query.slug;
  const cookies = event.node.req.headers.cookie;

  try {
    // Make the request to the WordPress API using Axios
    const response = await axios.get(
      `${config.public.baseURL}/custom/v1/post/${slug}`,
      {
        params: { slug },
        withCredentials: true,
        headers: {
          Cookie: cookies || "",
        },
      }
    );
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const statusCode = error.response?.status || 500;
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred";

    event.node.res.statusCode = statusCode;
    return {
      message: message,
      data: {
        status: statusCode,
      },
    };
  }
});
