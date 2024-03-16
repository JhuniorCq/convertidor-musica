import "../styles/ConvertMusic.css";
import { useState } from "react";
import UnloadingContainer from "./UnloadingContainer.jsx";
// import { Spinner } from 'reactstrap'
import Loading from "./Loading.jsx";

const ConvertMusic = () => {

  const [input, setInput] = useState('');
  const [tituloVideo, setTituloVideo] = useState('');
  const [loading, setLoading] = useState(false);

  const manejarInput = (e) => {
    let inputValue = e.target.value;
    if(inputValue !== '') {
      inputValue = inputValue.trim();
      console.log(inputValue);
      setInput(inputValue);
    }
  }

  const convertVideo = async (e) => {
    try {
      e.preventDefault();

      if(input === '') {
        alert('Ingrese una URL');
        return;
      }

      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 5000);

      console.log(`El valor del INPUT es ${input}`);

      const response = await axios.post('http://localhost:3000/convert', { url: input });
      const musicData = response.data;

      console.log(musicData);
      if (musicData.success) {
        setTituloVideo(musicData.titulo);
      } else {
        console.error('Error al convertir el video:', musicData.message);
      }
      
    } catch(err) {
      console.error('', err.message);
    }
  };

  return (
    <>
      <form onSubmit={convertVideo} className="formulario">
        <h1 className="titulo">Convertidor de <span className="color-rojo">
          Youtube</span> a <span className="color-negro">MP4</span>
        </h1>
        <input className="input-url" type="text" onChange={manejarInput} placeholder="Ingrese la URL"/>
        <button className="btn-convertir">Convertir</button>
      </form>
      {
        loading && <Loading />
      }
      {
        tituloVideo && (
          <UnloadingContainer tituloVideo={tituloVideo}/>
        )
      }
    </>
  );
};

export default ConvertMusic;
