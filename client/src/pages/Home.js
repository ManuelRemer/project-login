import { useFetch } from "../hooks/useFetch";

const Home = () => {
  // const [data, setData] = useState("");
  const { data, error, isPending, useGetData } = useFetch(
    "/api/v1/hello-world"
  );

  useGetData();

  return (
    <div>
      {!isPending && data}
      {isPending && "loading..."}
      {error && error.message}
    </div>
  );
};

export default Home;
