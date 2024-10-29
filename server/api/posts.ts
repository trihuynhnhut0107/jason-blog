import axios from "axios";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const slug = query.slug;
  try {
    // Make the request to the WordPress API using Axios
    const response = await axios.get(
      `${config.public.baseURL}/wp/v2/posts`,
      {
        params: { slug },
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
