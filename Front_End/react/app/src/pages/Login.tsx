import { Link } from "react-router";

const Login = () => {
  const id = 12;
  return (
    <div>
      <Link to={`/home/${id}`}>ir no home</Link>
      <br></br>
      Home - ID: {id}
    </div>
  );
};

export default Login;
