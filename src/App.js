import List from './List';
import { groceries } from './DAL/data.js';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [data, setData] = useState({ groceries, shopping: [] });

  const handleGroceryClick = e => {
    const currentValue = e.target.getAttribute('value');
    data.shopping.push(currentValue);
    for (const grocery of data.groceries) {
      if (grocery.name === currentValue) {
        grocery.quantity -= 1;
        break;
      }
    }
    setData({ ...data });
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
      </Row>
    </div>
  );
}

export default App;
