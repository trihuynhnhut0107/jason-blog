import axios from "axios";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const perPage = query.per_page || 2;
  const page = query.page || 1;
  const search = query.search || ''
  const cookies = event.node.req.headers.cookie;
  try {
    // Make the request to the WordPress API using Axios
    const response = await axios.get(
      `${config.public.baseURL}/custom/v1/get-post-list`,
      {
        params: {
          per_page: perPage,
          page: page,
          search: search
        },
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
