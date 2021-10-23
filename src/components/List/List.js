import {
  List as SemanticList,
  Header as SemanticHeader,
  Rating as SemanticRating,
  Button,
} from "semantic-ui-react";

function List(props) {
  const { onClickHandler = () => {}, data = [] } = props;

  return (
    <>
      <SemanticList>
        {data.map((item) => {
          return (
            <article className="List-container" key={item.movie_id}>
              <SemanticList.Item>
                <SemanticHeader>{item.title}</SemanticHeader>
                <SemanticRating
                  icon="star"
                  rating={item.rating}
                  maxRating={5}
                  disabled
                />
              </SemanticList.Item>
              <Button
                className="List-delete-button"
                onClick={() => onClickHandler(item)}
                secondary
                size="large"
              >
                Delete
              </Button>
            </article>
          );
        })}
      </SemanticList>
    </>
  );
}

export default List;
