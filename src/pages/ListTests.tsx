/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faTrashAlt,
  faPlusSquare,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons';
import Layout from '../components/Layout';
import Container from '../components/Container';
import Card from '../components/Card';
import Button from '../components/Button';
import styles from '../components/Container.module.scss';
import { SSLTestResult } from '../types/index';
import { getAllSSLTests, deleteSSLTest } from '../services/api/sslTests';

const ListTests: React.FC = () => {
  const history = useHistory();
  const [tests, setTests] = useState<SSLTestResult[]>([]);

  const keyCount = (key: keyof SSLTestResult) => {
    return tests.reduce((acc, entry) => {
      if (entry[key]) return acc + 1;
      return acc;
    }, 0);
  };

  const status = (item: SSLTestResult) => {
    if (item.alert_errors) return 'Invalid';
    return 'Valid';
  };

  const deleteTest = (id: string) => {
    deleteSSLTest(id).then((success) => {
      if (success) {
        setTests(tests.filter((entry) => entry.test_id !== id));
      }
    });
  };

  useEffect(() => {
    getAllSSLTests().then((nextTests) => {
      setTests(nextTests);
    });
  }, []);

  return (
    <Layout>
      <Container>
        <header className={styles.colHeader}>
          <h2>SSL Certificate Monitoring</h2>
        </header>

        <section className={styles.colMain}>
          <div className="gap-top--xl" />
          <div className={styles.colSubgrid}>
            <Card extraClassNames="stat pad text-center">
              <h5>Certificates</h5>
              <h1>{tests.length}</h1>
            </Card>
            <Card extraClassNames="stat pad text-center">
              <h5>Valid</h5>
              <h1>{tests.length - keyCount('alert_errors')}</h1>
            </Card>
            <Card extraClassNames="stat pad text-center">
              <h5>Mixed Content</h5>
              <h1>{keyCount('alert_mixed_content')}</h1>
            </Card>
            <Card extraClassNames="stat pad text-center">
              <h5>Expiring Soon</h5>
              <h1>0</h1>
            </Card>
            <Card extraClassNames="stat pad text-center">
              <h5>Expired</h5>
              <h1>{keyCount('alert_expiration')}</h1>
            </Card>
            <Card extraClassNames="stat pad text-center">
              <h5>Invalid</h5>
              <h1>{keyCount('alert_errors')}</h1>
            </Card>
          </div>
        </section>

        <section className={styles.colMain}>
          <div className="gap-top--xl" />
          <Card>
            {tests && tests.length > 0 ? (
              <table>
                <colgroup>
                  <col style={{ width: 'auto' }} />
                  <col style={{ width: 'auto' }} />
                  <col style={{ width: '20rem' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Domain</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tests.map((entry) => (
                    <tr key={entry.test_id}>
                      <td>{status(entry)}</td>
                      <td>
                        <a href={entry.url} target="_blank" rel="noreferrer">
                          <FontAwesomeIcon icon={faExternalLinkAlt} />
                          <span className="gap-left--xs">{entry.url}</span>
                        </a>
                      </td>
                      <td>
                        <Button
                          size="small"
                          onClick={() =>
                            history.push(`/edit-test/${entry.test_id}`)
                          }
                        >
                          <FontAwesomeIcon icon={faEdit} />
                          <span>Edit</span>
                        </Button>
                        <Button
                          size="small"
                          mode="alert"
                          onClick={() => deleteTest(entry.test_id)}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                          <span>Delete</span>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="pad--xl text-center">
                <h1>SSL Monitoring</h1>
                <p className="gap-bottom--l">
                  Receive expiration reminders and get alerts when something
                  goes wrong.
                </p>
                <Button size="large" onClick={() => history.push('/add-test')}>
                  <FontAwesomeIcon icon={faPlusSquare} />
                  <span>Add a new SSL Test</span>
                </Button>
              </div>
            )}
          </Card>
        </section>
      </Container>
    </Layout>
  );
};

export default ListTests;
