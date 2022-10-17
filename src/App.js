import { useState } from "react";
import "./App.css";
import Description from "./description";
import Mensaje from "./Title";
/**
 * @Param handleClick: Funcion que actualiza el estado del componente a partir de su estado anterior
 * evitando que propiedades alteradas modifiquen el producto
 * @returns el estado del componente anterior + 1
 *
 * Un componente se renderiza cada que se cambia su estado o le llega un parametro de props
 */
// Source code:

function App() {
  const [contador, setContador] = useState(0);

  console.log("render");

  const Counter = ({ number }) => {
    console.log("Counter rendered!");
    return <h1>{number}</h1>;
  };

  const handleClick = () => {
    // setContador(contador + 1);
    setContador((prevContador) => prevContador + 1);
  };

  const handleClickReset = () => {
    setContador(0);
  };

  // validate if es odd or even
  const isEven = contador % 2 === 0;
  const mensajePar = isEven ? "Es par" : "Es Impar";

  /**
   * Estados complejos useState:
   * Notas:
   * procurar tener solo un estado;
   */

  // const [left, setLeft] = useState(10);
  // const [right, setRight] = useState(20);

  const [counters, setCounters] = useState({ left: 0, right: 0 });

  const handleClickLeft = () => {
    setCounters({
      left: counters.left + 1,
      right: counters.right,
    });
  };

  const handleClickRight = () => {
    setCounters({
      left: counters.left,
      right: counters.right + 1,
    });
  };

  return (
    <div className="App">
      <Mensaje
        color="red"
        message="Este es un parametro que hace dinamico un componente"
      />

      <Mensaje color="blue" message="Segundo Componente con color" />

      <Description />

      {/* Actualización de estados con funciones:  */}
      <p>El valor del contador es: </p>
      <Counter number={contador} />
      <p>{mensajePar}</p>
      <button onClick={handleClick}> Incrementar</button>
      <button onClick={handleClickReset}> Resetear</button>

      {/* Manejo de estados complejos */}
      <div>
        {counters.left}
        <button onClick={handleClickLeft}>Left</button>
        <button onClick={handleClickRight}>Right</button>
        {counters.right}
      </div>
    </div>
  );
}

export default App;
