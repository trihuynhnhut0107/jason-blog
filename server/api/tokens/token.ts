import axios from "axios";
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const cookies = event.node.req.headers.cookie;
  if(!cookies ) {
    return {
      data: false
    }
  }
  try {
    const response = await axios.get(
      `${config.public.baseURL}/custom/v1/get-token`,
      {
        withCredentials: true,
        headers: {
          Cookie: cookies || "",
        },
      }
    );
    return response.data;
  }
  catch(e) {
    console.log(e)
  }
  // return response;
});
