// Import required libraries
import { useEffect, useState } from "react";

// Import required components
import { Button, Loader } from "semantic-ui-react";

// Import custom components
import List from "./components/List/List";
import FormInput from "./components/FormInput/FormInput";

// Import util functions
import { capitalizeEachWord, validateMovieName } from "./utils";

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
    value: { title: "", rating: 1, author_id: 1, movie_id: 1 },
    status: C.VALID,
    message: "",
  });

  const [refetchData, setRefetchData] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/v1/movies")
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("SOMETHING WENT WRONG!");
      })
      .then((jsonResponse) => {
        setMovies({
          ...movies,
          value: jsonResponse.movies,
          status: C.SUCCESS,
        });
        return jsonResponse;
      })
      .catch((e) => {
        console.log(e);

        setMovies({ ...movies, status: C.ERROR, message: `${e}` });
      });

    return () => setMovies({ ...movies, status: C.LOADING, message: "" });
  }, [refetchData]);

  const handleSubmitMovie = (movie) => {
    movie.title = capitalizeEachWord(movie.title.trim(" "));

    fetch("http://127.0.0.1:5000/api/v1/movie", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...movie, author_id: 1 }),
    })
      .then((response) => {
        if (response.ok) {
          setRefetchData(!refetchData);
          setNewMovie({
            ...newMovie,
            value: { ...newMovie.value, title: "", rating: 1 },
          });
          return response.json();
        }
        response
          .json()
          .then((jsonResponse) => {
            throw new Error(jsonResponse.message);
          })
          .catch((e) => {
            console.log(e);

            setMovies({ ...movies, status: C.ERROR, message: `${e}` });
          });
      })
      .then((jsonResponse) => {
        console.log(
          "%c" + jsonResponse.message,
          "color:yellow; font-size:18px;"
        );
        return jsonResponse;
      })
      .catch((e) => {
        console.log(e, "Unexpected happened");

        setMovies({ ...movies, status: C.ERROR, message: `${e}` });
      });
  };

  const handleDeleteMovie = (movie) => {
    console.log(movie);
    const movieId = movie.movie_id;
    const url = "http://127.0.0.1:5000/api/v1/movie" + `?movieId=${movieId}`;

    console.log(movieId, url);
    fetch(url, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setRefetchData(!refetchData);
          return response.json();
        }
        response
          .json()
          .then((jsonResponse) => {
            throw new Error(jsonResponse.message);
          })
          .catch((e) => {
            console.log(e);

            setMovies({ ...movies, status: C.ERROR, message: `${e}` });
          });
      })
      .then((jsonResponse) => {
        console.log(
          "%c" + jsonResponse.message,
          "color:yellow; font-size:18px;"
        );
        return jsonResponse;
      })
      .catch((e) => {
        console.log(e);

        setMovies({ ...movies, status: C.ERROR, message: `${e}` });
      });
  };

  const handleMovieName = (movieName) => {
    const { message = "", status = C.VALID } = validateMovieName(
      movieName,
      newMovie.value.title
    );
    setNewMovie({
      ...newMovie,
      value: { ...newMovie.value, title: movieName },
      message,
      status,
    });
  };

  const handleRatingChange = ({ rating }) => {
    setNewMovie({ ...newMovie, value: { ...newMovie.value, rating } });
  };

  const moviesStatus = movies.status;
  const moviesArr = movies.value;
  let disableRateNowButton = false;

  if (newMovie.value.title.length === 0 || newMovie.status === C.ERROR)
    disableRateNowButton = true;

  return (
    <div className="App">
      <header className="App-header">Welcome To The Movie App</header>

      <FormInput
        submitHandler={handleSubmitMovie}
        inputChangeHandler={handleMovieName}
        ratingChangeHandler={handleRatingChange}
        disableSubmit={disableRateNowButton}
        value={{ ...newMovie.value }}
        message={newMovie.message}
        status={newMovie.status}
      />

      {moviesStatus === C.LOADING && (
        <section className="Loader-container">
          <Loader active inline="centered" size="large" />
        </section>
      )}

      <section className="Main-content-container">
        {moviesStatus === C.SUCCESS && (
          <>
            {moviesArr.length === 0 && (
              <section className="no-data-image">
                <img src="./images/noData.jpg" alt="No Data" />
              </section>
            )}
            {moviesArr.length > 0 && (
              <List data={moviesArr} onClickHandler={handleDeleteMovie} />
            )}
          </>
        )}

        {moviesStatus === C.ERROR && (
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
