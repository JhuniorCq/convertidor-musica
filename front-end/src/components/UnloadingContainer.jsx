import "../styles/UnloadingContainer.css";

const UnloadingContainer = ({ tituloVideo }) => {
  return (
    <>
      <div className="contenedor-descarga">
        <p className="texto-descarga">
          Tu música <span style={{ fontWeight: "600" }}>"{tituloVideo}"</span>{" "}
          está lista. Haz clic en el botón para descargarla:
        </p>
        {/* En el href se asume que ya estamos en el "public", y desde ahí creo la ruta a mi video */}
        <a className="descargar" href={`/music/${tituloVideo}`} download>
          Descargar
        </a>
      </div>
    </>
  );
};

export default UnloadingContainer;
