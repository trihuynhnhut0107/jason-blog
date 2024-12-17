import axios from "axios";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const postID = body.post_id;
  const config = useRuntimeConfig();
  if (!postID) {
    throw createError({
      statusCode: 400,
      message: "Post ID is required",
    });
  }
  
  try {
    const response = await axios.post(
      `${config.public.baseURL}/custom/v1/buypost`,
      {
        post_id: postID,
      },
      {
        withCredentials: true,
        headers: {
          Cookie: event.node.req.headers.cookie || "",
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
    error.response.data ||
      error.response?.data?.message ||
      error.message ||
      
      "An unexpected error occurred";
 
    event.node.res.statusCode = statusCode;
    return {
      success: false,
      message: message,
    };
  }
});
