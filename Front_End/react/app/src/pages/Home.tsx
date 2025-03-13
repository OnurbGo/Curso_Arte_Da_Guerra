import { useNavigate } from "react-router";

const Home = () => {
  const navigation = useNavigate();

  return (
    <div>
      <button onClick={() => navigation("/")}>Ir para a Login</button>
    </div>
  );
};

export default Home;
