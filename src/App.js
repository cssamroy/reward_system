import React, { useMemo, useState, useEffect } from 'react';
import RewardTable from './components/Table';
import { Badge, Col, Container, Row } from 'react-bootstrap';
import { calculateResults } from './utils';

const App = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Total Points',
        accessor: 'points',
      },
    ],
    []
  );

  const totalsByCustomersColumns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Month',
        accessor: 'month',
      },
      {
        Header: 'No. of Transactions',
        accessor: 'numTransactions',
      },
      {
        Header: 'Earned Points',
        accessor: 'points',
      },
    ],
    []
  );

  const [data, setData] = useState([]);
  const [dataByMonths, setDataByMonths] = useState([]);

  useEffect(() => {
    (async () => {
      await fetch('http://localhost:3004/users')
        .then((res) => res.json())
        .then((data) => {
          setData(calculateResults(data).totalPointsByCustomer);
          setDataByMonths(calculateResults(data).summaryByCustomer);
        });
    })();
  }, []);

  return (
    <Container>
      <Row className='mt-4 text-center'>
        <Col>
          <h3>
            Totals Reward points by{' '}
            <Badge pill bg='danger'>
              <small>Per Month</small>
            </Badge>
          </h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <RewardTable columns={totalsByCustomersColumns} data={dataByMonths} />
        </Col>
      </Row>
      <Row className='mt-4 text-center'>
        <Col>
          <h3>
            Totals Reward Points Per Customer{' '}
            <Badge pill bg='primary'>
              <small> till date</small>
            </Badge>
          </h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <RewardTable columns={columns} data={data} />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
