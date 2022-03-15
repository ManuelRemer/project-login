import { useEffect, useState } from "react";

// customHooks
import { useFetch } from "../hooks/useFetch";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import RegInput from "../components/RegInput";

// styles
import "./Login.css";

const Login = () => {
  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useCustomHooks
  const { data, error, isPending, postData } = useFetch("/api/v1/auth/login");
  const { user, dispatch } = useAuthContext();

  useEffect(() => {
    if (data) {
      localStorage.setItem("userData", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data.user.name });
    }
  }, [data]);

  const inputFields = [
    {
      label: "email",
      type: "email",
      value: email,
      handler: (i) => setEmail(i),
    },
    {
      label: "password",
      type: "password",
      value: password,
      handler: (i) => setPassword(i),
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    postData({
      email: email,
      password: password,
    });
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <div>
          {inputFields.map((field) => (
            <RegInput
              label={field.label}
              type={field.type}
              value={field.value}
              handleInput={field.handler}
              key={field.label}
            />
          ))}
        </div>
        <button className="button">Login</button>
      </form>
    </div>
  );
};

export default Login;
