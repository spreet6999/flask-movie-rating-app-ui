// Import required components
import { Button, Form, Rating } from "semantic-ui-react";
import C from "../../constants";

function FormInput(props) {
  console.log("FORM INPUT PROPS ---> ", props);

  const {
    submitHandler = () => {},
    inputChangeHandler = () => {},
    ratingChangeHandler = () => {},
    disableSubmit = false,
    value = {},
    message = "",
    status = C.VALID,
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
        <div className="ui input" style={{ display: "block", height: "72px" }}>
          <input
            placeholder="Enter the movie name"
            type="text"
            value={value.title}
            onChange={(e) => inputChangeHandler(e.target.value)}
          />
          {status === C.ERROR && <p className="error-text">{message}</p>}
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
            ADD
          </Button>
        </article>
      </Form>
    </>
  );
}

export default FormInput;
