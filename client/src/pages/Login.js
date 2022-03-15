import { useState } from "react";

// customHooks
import { useFetch } from "../hooks/useFetch";
import { useClientLogin } from "../hooks/useClientLogin";

// components
import RegInput from "../components/RegInput";
import SubmitButton from "../components/SubmitButton";

// styles
import "./Login.css";

const Login = () => {
  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useCustomHooks
  const { data, error, isPending, postData } = useFetch("/api/v1/auth/login");
  useClientLogin(data);

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
        <SubmitButton isPending={isPending} error={error} label="Login" />
      </form>
    </div>
  );
};

export default Login;
