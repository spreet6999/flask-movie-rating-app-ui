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

  const [newMovie, setNewMovie] = useState({
    value: { title: "", rating: 1 },
    status: "valid",
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

  const getUpdatedMovies = () => {
    // setting status to loading first before every fetch
    setMovies({ ...movies, status: "loading" });

    // fetching all updated movies
    fetch("http://127.0.0.1:5000/api/v1/movies")
      .then((response) => response.json())
      .then((resData) => {
        setMovies({ ...movies, value: resData.movies, status: "loaded" });
      })
      .catch((e) => console.log(e));
  };

  const handleSubmitMovie = (movie) => {
    console.log(movie);
    fetch("http://127.0.0.1:5000/api/v1/movie", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    })
      .then((response) => {
        if (response.ok) getUpdatedMovies();
        setNewMovie({ ...newMovie, value: { ...newMovie.value, title: "" } });

        return response.json();
      })
      .then((jsonResponse) =>
        console.log(
          "%c" + jsonResponse.message,
          "color:yellow; font-size:18px;"
        )
      )
      .catch((e) => console.log(e, "Unexpected happened"));
  };

  const handleMovieName = (movieName) => {
    if (movieName.length === 0 && newMovie.value.title.length > 0) {
      setNewMovie({
        ...newMovie,
        value: { ...newMovie.value, title: movieName },
      });
      console.log("Please Enter a valid movie name!");
    } else if (movieName[0] === " ")
      console.log("Valid movies doesn't starts with a space!");
    else {
      setNewMovie({
        ...newMovie,
        value: { ...newMovie.value, title: movieName },
      });
      console.log("This is movie name ---> ", movieName);
      console.log("New Movie State ---> ", newMovie);
    }
  };

  const handleRatingChange = ({ rating }) => {
    setNewMovie({ ...newMovie, value: { ...newMovie.value, rating } });
  };

  const isLoading = movies.status;
  const moviesArr = movies.value;
  const errorEl = <></>;

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
            <FormInput
              handleSubmitMovie={handleSubmitMovie}
              handleMovieName={handleMovieName}
              handleRatingChange={handleRatingChange}
              value={{ ...newMovie.value }}
              errorElement={errorEl}
            />
            <List movies={moviesArr} />
          </>
        )}
      </section>
    </div>
  );
}

export default App;
