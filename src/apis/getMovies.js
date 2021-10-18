async function getMovies() {
  var res = await fetch("http://127.0.0.1:5000/movies");
  var jsonData = await res.json();
  console.log(jsonData);
  return jsonData;
}

export default getMovies;
