// Import required libraries
import { useEffect, useState } from "react";

// Import required components
import { Button, Loader } from "semantic-ui-react";

// Import custom components
import List from "./components/List/List";
import FormInput from "./components/FormInput/FormInput";

// Import util functions
import { validateMovieName } from "./utils";

// Import constants
import C from "./constants";

// Import stylesheets
import "./App.css";

function App() {
  // Defining and using hooks
  const [movies, setMovies] = useState({
    value: [],
    status: C.LOADING,
    message: "",
  });

  const [newMovie, setNewMovie] = useState({
    value: { title: "", rating: 1 },
    status: C.VALID,
    message: "",
  });

  const [refetchData, setRefetchData] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/v1/movies")
      .then((response) => response.json())
      .then((jsonResponse) => {
        setMovies({
          ...movies,
          value: jsonResponse.movies,
          status: C.SUCCESS,
        });
        return jsonResponse;
      })
      .catch((e, jsonResponse) => {
        console.log(e);
        console.log(jsonResponse);
        setMovies({ ...movies, status: C.ERROR });
      });

    return () => setMovies({ ...movies, status: C.LOADING, message: "" });
  }, [refetchData]);

  const handleSubmitMovie = (movie) => {
    fetch("http://127.0.0.1:5000/api/v1/movie", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...movie, author_id: 1 }),
    })
      .then((response) => {
        if (response.ok) setRefetchData(!refetchData);

        setNewMovie({ ...newMovie, value: { ...newMovie.value, title: "" } });
        return response.json();
      })
      .then((jsonResponse) => {
        console.log(
          "%c" + jsonResponse.message,
          "color:yellow; font-size:18px;"
        );
        return jsonResponse;
      })
      .catch((e, jsonResponse) => {
        // Control not coming here!
        console.log(e, "Unexpected happened");
        console.log(jsonResponse);
      });
  };

  const handleMovieName = (movieName) => {
    const { message = "", status = C.VALID } = validateMovieName(
      movieName,
      newMovie
    );
    setNewMovie({
      ...newMovie,
      value: { ...newMovie.value, title: movieName },
    });
  };

  const handleRatingChange = ({ rating }) => {
    setNewMovie({ ...newMovie, value: { ...newMovie.value, rating } });
  };

  const dataLoading = movies.status;
  const moviesArr = movies.value;
  const disableRateNowButton = newMovie.value.title.length === 0 ? true : false;
  const errorEl = <></>;

  return (
    <div className="App">
      <header className="App-header">Welcome To The Movie App</header>

      <section className="Main-content-container">
        {dataLoading === C.LOADING && (
          <section className="Loader-container">
            <Loader active inline="centered" size="large" />
          </section>
        )}

        {dataLoading === C.SUCCESS && (
          <>
            <FormInput
              submitHandler={handleSubmitMovie}
              inputChangeHandler={handleMovieName}
              ratingChangeHandler={handleRatingChange}
              disableSubmit={disableRateNowButton}
              value={{ ...newMovie.value }}
              errorElement={errorEl}
            />
            <List movies={moviesArr} />
          </>
        )}

        {dataLoading === C.ERROR && (
          <>
            <p className="error-text">{movies.message}</p>
            <Button
              onClick={() => setRefetchData(!refetchData)}
              secondary
              size="large"
            >
              Retry
            </Button>
          </>
        )}
      </section>
    </div>
  );
}

export default App;
