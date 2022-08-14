import { Modal, Button, Form } from 'react-bootstrap';
import List from './List';

function OrderModal(props) {
  return (
    <Form id="order-summary-modal">
      <Modal
        show
        // onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Order Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <List data={props.data} title="summary" />
        </Modal.Body>
        <Modal.Footer>
          <Button form="order-summary-modal" variant="primary" type="submit">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Form>
  );
}

export default OrderModal;
