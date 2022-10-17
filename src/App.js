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
 *
 * UseState es un manejador de estados que hace parte del grupo Hooks, este permite manejar el estado de los componentes,
 * como deberian comportarsen ante sus daots, estos se deben de crear dentro de un componente.
 * El useState tiene dos componentes: Leer el valor = [0] Actualizar el valor [1]
 *
 * Reglas de los hooks: Los hooks no pueden ir en condicionales, ninguna estructura de control
 * los useState reciben como parametro su estado anterior tal que => setContador(estadoAnterior => (estadoAnterior + 1))
 *
 * Es preferible tener varios estados y crear aplicacion atomica a que un estado con multiples parametros.
 * Los useState pueden establecer diversos tipos de datos, entre ellos un objeto para alamacenar varios estados.
 */

function App() {
  const [contador, setContador] = useState(0); // destructurado.

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

  // const [counters, setCounters] = useState({ left: 0, right: 0 });
  const [clicks, setClicks] = useState([]);

  const WarningNotUsed = () => {
    return <h1>Todavía no se usa el contador.</h1>;
  };

  const ListOfClicks = ({ clicks }) => {
    return <p>{clicks.join(", ")}</p>;
  };

  const handleClickLeft = (e) => {
    // setCounters({
    //   left: counters.left + 1,
    //   right: counters.right,
    // });

    setClicks((prevClicks) => [...prevClicks, "L"]);
  };

  const handleClickRight = () => {
    // setCounters({
    //   left: counters.left,
    //   right: counters.right + 1,
    // });
    setClicks((prevClicks) => [...prevClicks, "R"]);
  };

  const handleReset = () => {
    setClicks([]);
  };

  const left = clicks.filter((click) => click === "L");
  const right = clicks.filter((click) => click === "R");

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
        {left.length}
        <button onClick={handleClickLeft}>Left</button>
        <button onClick={handleClickRight}>Right</button>
        {right.length}
        <p>
          <button onClick={handleReset}>Reset</button>
        </p>
        <p>Clicks totales: {clicks.length} </p>

        {clicks.length === 0 ? (
          <WarningNotUsed />
        ) : (
          <ListOfClicks clicks={clicks} />
        )}
      </div>
    </div>
  );
}

export default App;
