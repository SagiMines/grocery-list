import List from './List';
import OrderSummary from './OrderSummary';
import { groceries } from './DAL/data.js';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
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
  });

  const handleGroceryClick = e => {
    const currentValue = e.target.getAttribute('value');
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

  const moveToEndOfTheArray = (currentGrocery, counter) => {
    data.groceries.splice(counter, 1);
    data.groceries.push(currentGrocery);
  };

  return (
    <div>
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
      </Row>
    </div>
  );
}

export default App;
