import React from "react";
import { useState } from "react";

function App() {
  const [display, setDisplay] = useState("0");
  const [operations, setOperations] = useState("");
  const [evalued, setEvalued] = useState(false);

  const handleNumber = (event) => {
    const number = event.target.textContent;

    if (operations.length >= 15) {
      return;
    }

    // introduce el número
    setDisplay(display === "0" || evalued === true ? number : display + number);
    setOperations(operations + number);
    setEvalued(false);
  };

  // manejar la entrada de .
  const handlePoint = (event) => {
    const point = event.target.textContent;

    const lastNumber = operations.split(" ").pop();

    if (operations.length >= 15) {
      return;
    }

    // dos puntos
    if (lastNumber.includes(".")) {
      return;
    }
    // normal
    setOperations(operations + point);
    setDisplay(display === "0" ? point : display + point);
    setEvalued(false);
  };

  // manejar la entrada de operadores
  const handleOperator = (event) => {
    // saca el operador introducido
    const operator = event.target.textContent;
    // caracter anterior
    const lastChat = operations.charAt(operations.length - 2);
    // comprueba si el caracter anterior es un operador
    const lastChatIsOperator = ["+", "*", "/", "-"].includes(lastChat);


    if (operations.length >= 15) {
      return;
    }
    
    // manejo de errores
    if (display === "") {
      setOperations("SyntaxError");
      setDisplay("SyntaxError");
      setEvalued(false);
      return;
    }
    
    // condicion para el + -
    if (lastChatIsOperator && operator !== "-") {
      setDisplay(`${display.substring(0, display.length - 2)}${operator} `);
      setOperations(
        `${operations.substring(0, operations.length - 2)}${operator} `
        );
        setEvalued(false);
        return;
    }
      
      // nada antes del operador
    if (operations === "") {
      setDisplay(
      display === "0"
      ? "0" + " " + operator + " "
      : display + " " + operator + " "
      );
      setOperations(display + " " + operator + " ");
      setEvalued(false);
      return;
    }
      
    // normal
    setDisplay(display === "0" ? operator : display + " " + operator + " ");
    setOperations(operations + " " + operator + " ");
    setEvalued(false);
  };

  //   limpiar la pantalla
  const handleClear = () => {
    setDisplay("0");
    setOperations("");
    setEvalued(false);
  };

  // hacer las operaciones
  const handleEval = () => {
    if (operations) {
      const result = eval(operations);

      setDisplay(result.toString());
      setOperations("");
      setEvalued(true);

      return;
    }

    setDisplay("0");
    setOperations("");
    setEvalued(true);
  };

  return (
    <article className="calculator">
      <div className="formulaScreen">{operations}</div>
      <div className="outputScreen" id="display">
        {display}
      </div>
      <React.Fragment>
        <button
          key="clear"
          className="jumbo"
          id="clear"
          value="AC"
          onClick={handleClear}
        >
          AC
        </button>
        <button
          key="divide"
          className="operator"
          id="divide"
          value="/"
          onClick={handleOperator}
        >
          /
        </button>
        <button
          key="multiply"
          className="operator"
          id="multiply"
          value="*"
          onClick={handleOperator}
        >
          *
        </button>
        <button key="seven" id="seven" value="7" onClick={handleNumber}>
          7
        </button>
        <button key="eight" id="eight" value="8" onClick={handleNumber}>
          8
        </button>
        <button key="nine" id="nine" value="9" onClick={handleNumber}>
          9
        </button>
        <button
          key="subtract"
          className="operator"
          id="subtract"
          value="-"
          onClick={handleOperator}
        >
          -
        </button>
        <button key="four" id="four" value="4" onClick={handleNumber}>
          4
        </button>
        <button key="five" id="five" value="5" onClick={handleNumber}>
          5
        </button>
        <button key="six" id="six" value="6" onClick={handleNumber}>
          6
        </button>
        <button
          key="add"
          className="operator"
          id="add"
          value="+"
          onClick={handleOperator}
        >
          +
        </button>
        <button key="one" id="one" value="1" onClick={handleNumber}>
          1
        </button>
        <button key="two" id="two" value="2" onClick={handleNumber}>
          2
        </button>
        <button key="three" id="three" value="3" onClick={handleNumber}>
          3
        </button>
        <button
          key="zero"
          className="jumbo"
          id="zero"
          value="0"
          onClick={handleNumber}
        >
          0
        </button>
        <button key="decimal" id="decimal" value="." onClick={handlePoint}>
          .
        </button>
        <button key="equals" id="equals" value="=" onClick={handleEval}>
          =
        </button>
      </React.Fragment>
    </article>
  );
}

export default App;
