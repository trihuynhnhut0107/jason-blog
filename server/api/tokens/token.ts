import axios from "axios";
export default defineEventHandler(async (event) => {
  
  const cookies = event.node.req.headers.cookie;
  try {
    const response = await axios.get(
      "http://localhost:8000/wp-json/custom/v1/get-token",
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
