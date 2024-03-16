import { Spinner } from "reactstrap";
import '../styles/Loading.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const Loading = ({ loading }) => {
  return (
    <div className="contenedor-loading">
        <div className="contenedor-spinner">
            <Spinner color="danger" className="spinner" />
        </div>
    </div>
  );
};

export default Loading;
