import { useEffect, useRef, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { usePost } from "../../hooks/usePost";
import { URL_SERVER } from "../../utils/constants";
import { Loader } from "../Loader/Loader";
import "./ConvertMusic.css";

export const ConvertMusic = () => {
  const [convertedMusic, setConvertedMusic] = useState(false);
  const isFirstRender = useRef(true);
  const { form, inputHandler } = useForm({
    "url-input": "",
  });
  const { responsePost, errorPost, loadingPost, postData } = usePost();

  const convertVideo = (e) => {
    e.preventDefault();

    if (!form["url-input"]) {
      alert("Ingrese una URL");
      return;
    }

    setConvertedMusic(false);

    postData(`${URL_SERVER}/musics/convert`, { url: form["url-input"] });
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      if (responsePost?.success) {
        setConvertedMusic(true);
      }
    }
  }, [responsePost]);

  return (
    <>
      <form className="convert-music" onSubmit={convertVideo}>
        <h1 className="convert-music__title">
          Convertidor de <span className="red-text">Youtube</span> a{" "}
          <span className="black-text">MP3</span>
        </h1>
        <input
          type="text"
          placeholder="Ingrese la URL"
          name="url-input"
          className="convert-music__url-input"
          onChange={inputHandler}
        />
        <button className="convert-music__convert-button">Convertir</button>
      </form>
      {loadingPost ? (
        <Loader />
      ) : errorPost ? (
        <div>Error: {errorPost}</div>
      ) : (
        <div
          className={`convert-music__download-box ${
            convertedMusic ? "convert-music__download-box--show" : ""
          }`}
        >
          <p className="convert-music__download-text">
            Tu música{" "}
            <span style={{ fontWeight: "600" }}>"{responsePost?.title}"</span>{" "}
            está lista. Haz clic en el botón para descargarla:
          </p>
          <a
            href={`${URL_SERVER}/musics/download/${responsePost?.title}.webm`}
            className="convert-music__download-button"
            target="_blank"
            download
          >
            Descargar
          </a>
        </div>
      )}
    </>
  );
};
