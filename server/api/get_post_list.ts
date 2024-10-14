import axios from 'axios'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const slug = query.slug

  try {
    // Make the request to the WordPress API using Axios
    const response = await axios.get(`"http://localhost:8000/wp-json/custom/v1/get-post-list`, {
      params: { slug }
    })

    // Return the response data to the frontend
    return {
      success: true,
      data: response.data,
    }
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
})
