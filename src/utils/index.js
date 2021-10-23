// Import constants
import C from "../constants";

export function validateMovieName(movieName, currentMovieName) {
  let message = "";
  let status = C.VALID;
  if (movieName.length === 0 && currentMovieName.length > 0) {
    message = "Please enter a valid movie name.";
    status = C.ERROR;
  }
  if (movieName.trim(" ") === "") {
    message = "Please enter a valid movie name.";
    status = C.ERROR;
  }

  console.log("This is movie name ---> ", movieName);
  return { message, status };
}

export function capitalizeEachWord(string) {
  let words = string.split(" ");
  console.log(words);

  for (let i = 0; i < words.length; i++) {
    if (words[i] !== "")
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  return words.join(" ");
}
