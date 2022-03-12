import { useState } from "react";

// hooks
import { useFetch } from "../hooks/useFetch";

// components
import RegInput from "../components/RegInput";

// styles
import "./Signup.css";

const Signup = () => {
  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [auth, setAuth] = useState(null);

  // useFetch
  const { error, isPending, data, postData } = useFetch(
    "/api/v1/auth/register"
  );

  console.log(data);

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
      email: email,
      password: password,
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
        {!isPending && <button className="button">Signup</button>}
        {isPending && (
          <button className="button" disabled>
            Loading
          </button>
        )}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
