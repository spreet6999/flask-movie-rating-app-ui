// Import required libraries
import { useEffect, useState } from "react";

// Import required components
import { Loader } from "semantic-ui-react";

// Import custom components
import List from "./components/List/List";
import FormInput from "./components/FormInput/FormInput";

// Import stylesheets
import "./App.css";

function App() {
  // Defining and using hooks
  const [movies, setMovies] = useState({
    value: [],
    status: "loading",
    message: "",
  });

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/v1/movies")
      .then((response) => response.json())
      .then((resData) => {
        setMovies({ ...movies, value: resData.movies, status: "loaded" });
      })
      .catch((e) => console.log(e));
  }, []);

  const isLoading = movies.status;
  const moviesArr = movies.value;

  return (
    <div className="App">
      <header className="App-header">Welcome To The Movie App</header>

      <section className="Main-content-container">
        {isLoading === "loading" && (
          <section className="Loader-container">
            <Loader active inline="centered" size="large" />
          </section>
        )}

        {isLoading === "loaded" && (
          <>
            <FormInput />
            <List movies={moviesArr} />
          </>
        )}
      </section>
    </div>
  );
}

export default App;
