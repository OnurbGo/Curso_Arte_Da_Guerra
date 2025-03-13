import { useState } from "react";

const Contador = () => {
  const [valorContador, SetValorContador] = useState(0);

  const onClickContador = () => {
    SetValorContador(valorContador + 1);
  };

  const onClickSubtraidor = () => {
    SetValorContador(valorContador - 1);
  };

  return (
    <div>
      <button onClick={onClickContador}>+1</button>
      <button onClick={onClickSubtraidor}>-1</button>
      <p>{valorContador}</p>
      {valorContador < 0 ? (
        <p style={{ color: "red" }}>Numero negativo</p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Contador;
