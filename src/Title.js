/*
	Los estilos deben ser pasados como objetos
*/

//------  Componentes ------
const Mensaje = (props) => {
  return <h1 style={{ color: props.color }}>{props.message}</h1>;
};

export default Mensaje;
