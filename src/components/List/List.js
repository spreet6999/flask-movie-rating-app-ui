import {
  List as SemanticList,
  Header as SemanticHeader,
  Rating as SemanticRating,
} from "semantic-ui-react";

function List(props) {
  console.log(props);
  const key = Object.keys(props);
  const data = props[key[0]];
  console.log(data);
  return (
    <>
      <SemanticList>
        {data.map((movie) => {
          return (
            <SemanticList.Item key={movie.title}>
              <SemanticHeader>{movie.title}</SemanticHeader>
              <SemanticRating
                icon="heart"
                rating={movie.rating}
                maxRating={5}
                disabled
              />
            </SemanticList.Item>
          );
        })}
      </SemanticList>
    </>
  );
}

export default List;
