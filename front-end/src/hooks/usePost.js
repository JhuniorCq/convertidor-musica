import { useState } from "react";
import axios from "axios";

export const usePost = () => {
  const [statePost, setStatePost] = useState({
    responsePost: null,
    loadingPost: false,
    errorPost: null,
  });

  const postData = async (url, body) => {
    setStatePost({ ...statePost, loadingPost: true });
    try {
      const { data } = await axios.post(url, body);

      setStatePost({
        responsePost: data,
        loadingPost: false,
        errorPost: null,
      });
    } catch (error) {
      const message = error.response?.data.message;
      console.error("Error en usePost.js", error.message);

      setStatePost({
        responsePost: null,
        loadingPost: false,
        errorPost: message ?? "Ocurrió un error",
      });
    }
  };

  return {
    ...statePost,
    postData,
  };
};
