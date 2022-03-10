import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

function App() {
  const [text, setText] = useState("");

  /* This is just an example to show that we can access
  the endpoint without writing the whole path, and that 
  the proxy feature of the create-react-app proxies the request
  to our server application */
  useEffect(() => {
    try {
      fetch("/api/v1/hello-world") // localhost:3000/api/hello-world -> localhost:4000/api/hello-world
        .then((res) => res.json())
        .then((data) => {
          setText(data);
        });
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="App">
      <h1> {text} </h1>
    </div>
  );
}

export default App;
