import { useState } from "react";

// customHooks
import { useFetch } from "../hooks/useFetch";
import { useClientLogin } from "../hooks/useClientLogin";

// components
import RegInput from "../components/RegInput";
import SubmitButton from "../components/SubmitButton";

// styles
import "./Signup.css";

const Signup = () => {
  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // useCustomHooks
  const { data, error, isPending, postData } = useFetch(
    "/api/v1/auth/register"
  );
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
    { label: "name", type: "text", value: name, handler: (i) => setName(i) },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    postData({
      email,
      password,
      displayName: name,
    });
  };

  return (
    <div className="signup">
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
        <SubmitButton isPending={isPending} error={error} label="Signup" />
      </form>
    </div>
  );
};

export default Signup;
