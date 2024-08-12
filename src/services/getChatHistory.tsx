import axios from "axios";

const getChatHistory = async (url: string, page?: number | undefined) => {
  const access = localStorage.getItem("access");

  return await axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
      params: {
        page: page,
      },
    })
    .then((res) => res)
    .catch((err) => err);
};

export default getChatHistory;
