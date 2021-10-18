// Import required components
import { Button, Form, Input, Rating } from "semantic-ui-react";

// Import styles
import "./FormInput.css";

function FormInput(props) {
  console.log("FORM INPUT PROPS ---> ", props);

  const movieSubmitHandler = (e) => console.log("Submitted Successfully!!");

  return (
    <>
      <Form className="header Form-container">
        <label>Movie Name:</label>
        <Input fluid placeholder="Enter the movie name" />

        <article className="Submit-rating-container">
          <label>Rate it!&nbsp;</label>
          <Rating icon="heart" defaultRating={1} maxRating={5} />
          <Button
            type="submit"
            onClick={movieSubmitHandler}
            secondary
            size="large"
          >
            RATE NOW
          </Button>
        </article>
      </Form>
    </>
  );
}

export default FormInput;
