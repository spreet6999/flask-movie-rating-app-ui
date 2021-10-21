// Import required components
import { Button, Form, Rating } from "semantic-ui-react";

// Import styles
import "./FormInput.css";

function FormInput(props) {
  console.log("FORM INPUT PROPS ---> ", props);

  const {
    submitHandler = () => {},
    inputChangeHandler = () => {},
    ratingChangeHandler = () => {},
    disableSubmit = false,
    value = {},
    errorElement = <></>,
  } = props;

  console.log(value);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    submitHandler({ ...value, title: `${value.title}` });
  };

  return (
    <>
      <Form className="header Form-container">
        <label>Movie Name:</label>
        <div className="ui fluid input">
          <input
            placeholder="Enter the movie name"
            type="text"
            value={value.title}
            onChange={(e) => inputChangeHandler(e.target.value)}
          />
          {errorElement}
        </div>

        <article className="Submit-rating-container">
          <label>Rate it!&nbsp;</label>
          <Rating
            icon="star"
            maxRating={5}
            rating={value.rating}
            onRate={(e, data) => ratingChangeHandler({ ...data })}
          />
          <Button
            type="submit"
            onClick={handleSubmitForm}
            disabled={disableSubmit}
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
