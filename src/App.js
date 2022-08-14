import List from './List';
import OrderSummary from './OrderSummary';
import OrderModal from './OrderModal';
import { groceries } from './DAL/data.js';
import { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [data, setData] = useState({
    groceries,
    shopping: [],
    summary: {
      totalItems: 0,
      totalPrice: 0,
    },
    order: {
      orderClick: false,
      isSure: false,
      isFinished: false,
      isShoppingArrayEmpty: false,
    },
  });

  const handleGroceryClick = e => {
    const currentValue = e.target.getAttribute('value');
    data.order.isShoppingArrayEmpty = false;
    let counter = 0;
    data.shopping.push(currentValue);
    data.summary.totalItems += 1;
    for (const grocery of data.groceries) {
      if (grocery.name === currentValue) {
        grocery.quantity -= 1;
        if (!grocery.quantity) {
          moveToEndOfTheArray(grocery, counter);
        }
        data.summary.totalPrice += grocery.price;
        break;
      }
      counter += 1;
    }
    setData({ ...data });
  };

  const handleOrderClick = () => {
    if (data.shopping.length) {
      data.order.orderClick = !data.order.orderClick;
    } else {
      data.order.isShoppingArrayEmpty = true;
    }
    setData({ ...data });
  };

  const handleIsSureClick = () => {
    data.order.isSure = !data.order.isSure;
    setData({ ...data });
  };

  const moveToEndOfTheArray = (currentGrocery, counter) => {
    data.groceries.splice(counter, 1);
    data.groceries.push(currentGrocery);
  };

  return (
    <Row>
      <Col>
        <List
          onClick={handleGroceryClick}
          data={data.groceries}
          title="Grocery"
        />
      </Col>
      <Col>
        <List data={data.shopping} title="Shopping" />
      </Col>
      <OrderSummary data={data.summary} />
      {!data.order.orderClick && (
        <Button
          onClick={handleOrderClick}
          className="order-btn"
          variant="primary"
        >
          Order
        </Button>
      )}
      {data.order.isShoppingArrayEmpty && (
        <p className="no-items-in-list">
          *Please enter items into your shopping list before ordering.
        </p>
      )}
      {!data.order.isSure && data.order.orderClick && (
        <div>
          <h2>Are you sure?</h2>
          <Button
            onClick={handleIsSureClick}
            className="order-btn"
            variant="primary"
          >
            Yes
          </Button>
          <Button
            onClick={handleOrderClick}
            className="order-btn"
            variant="primary"
          >
            No
          </Button>
        </div>
      )}

      {data.order.isSure && <OrderModal data={data.shopping} />}
    </Row>
  );
}

export default App;
