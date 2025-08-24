import axios from 'axios';

export const FetchFormPost = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  async function PostForm(url: string, data: object = {}) {
    try {
      const res = await axios.post(apiUrl + url, data, { withCredentials: true });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  return {
    PostForm,
  };
};
