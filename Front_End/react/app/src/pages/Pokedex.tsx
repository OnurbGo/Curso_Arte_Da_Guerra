import axios from "axios";
import { useState } from "react";

const Pokedex = () => {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState("");

  const searchPokemon = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${inputText}`
      );

      setPokemon(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <input
        placeholder="Digite o nome do pokemon"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={searchPokemon}>Buscar</button>
      <p>Nome: {pokemon?.name}</p>
      <p>Peso: {pokemon?.weight}</p>
      <img src={pokemon?.sprites?.front_default} />
    </div>
  );
};

export default Pokedex;
