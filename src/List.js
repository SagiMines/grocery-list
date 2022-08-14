import ListGroup from 'react-bootstrap/ListGroup';
import './List.css';

function List(props) {
  return (
    <ListGroup as="ol" numbered>
      <h3 className="list-title">{props.title} List</h3>
      {props.data.map((grocery, id) => (
        <ListGroup.Item
          disabled={
            props.title === 'Shopping' || grocery.quantity ? false : true
          }
          as="li"
          className="d-flex justify-content-between align-items-start"
          key={id.toString()}
          value={grocery.name}
          onClick={props.onClick ? props.onClick : null}
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">
              {props.title === 'Grocery' ? grocery.name : grocery}
            </div>
            {props.title === 'Grocery' && (
              <>
                <p>Price: {grocery.price}$</p>
                <p>Quantity: {grocery.quantity}</p>
                <img src={grocery.thumbnailImage} alt={grocery.name}></img>
              </>
            )}
            {!grocery.quantity && props.title === 'Grocery' && (
              <>
                <img src="https://img.icons8.com/external-victoruler-outline-victoruler/40/000000/external-out-of-stock-logistics-victoruler-outline-victoruler.png" />{' '}
                <p className="out-of-stock">Out of Stock!</p>
              </>
            )}
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default List;
