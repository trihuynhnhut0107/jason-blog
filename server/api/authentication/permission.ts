import axios from "axios";
export default defineEventHandler(async (event) => {
  const cookies = event.node.req.headers.cookie;
  const response = await axios.get(
    "http://localhost/test-wp/wp-json/custom/v1/permission",
    {
      withCredentials: true,
      headers: {
        Cookie: cookies || "", // Include the cookies in the request headers
      },
    }
  );
  return response.data;
});
