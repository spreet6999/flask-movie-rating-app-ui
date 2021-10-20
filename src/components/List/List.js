import {
  List as SemanticList,
  Header as SemanticHeader,
  Rating as SemanticRating,
} from "semantic-ui-react";

function List(props) {
  const key = Object.keys(props);
  const data = props[key[0]];

  return (
    <>
      <SemanticList>
        {data.map((movie) => {
          return (
            <SemanticList.Item key={movie.title}>
              <SemanticHeader>{movie.title}</SemanticHeader>
              <SemanticRating
                icon="star"
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
