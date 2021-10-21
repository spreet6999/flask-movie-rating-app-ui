// Import constants
import C from "../constants";

export function validateMovieName(movieName, currentMovie) {
  let currentValue = currentMovie.value.title;
  let message = "";
  let status = C.VALID;
  if (movieName.length === 0 && currentValue.length > 0) {
    message = "Please Enter a valid movie name!";
    status = C.ERROR;
  }
  if (movieName[0] === " ") {
    message = "Valid movies doesn't starts with a space!";
    status = C.ERROR;
  }

  console.log("This is movie name ---> ", movieName);
  return { message, status };
}
