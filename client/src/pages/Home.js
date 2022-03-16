import { useFetch } from "../hooks/useFetch";

// custom hooks
import { useAuthContext } from "../hooks/useAuthContext";

// styles
import "./Home.css";

const Home = () => {
  const { user } = useAuthContext();
  const { data, error, isPending, useGetData } = useFetch(
    "/api/v1/hello-world"
  );

  useGetData();

  return (
    <div className="home">
      <h2>Hello {user}!</h2>
      {!isPending && data}
      {isPending && "loading..."}
      {error && error.message}
    </div>
  );
};

export default Home;
