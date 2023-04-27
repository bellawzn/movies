import { height } from "@mui/system"
import { Form, Button } from "react-bootstrap"
import InputGroup from "react-bootstrap/InputGroup"

const ReviewForm = ({ handleSubmit, revText, labelText, defaultValue }) => {
  return (
    <Form>
      <InputGroup className="mb-3" size="xl">
        <InputGroup.Text>{labelText}</InputGroup.Text>
        <Form.Control
          ref={revText}
          as="textarea"
          rows={3}
          defaultValue={defaultValue}
          style={{
            fontSize: "16px",
            color: "red",
            height: "300px",
            width: "800px",
          }}
        />
      </InputGroup>
      <Button variant="outline-info" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  )
}

export default ReviewForm
