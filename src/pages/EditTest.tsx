/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Tooltip } from 'react-tippy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Layout from '../components/Layout';
import Container from '../components/Container';
import Card from '../components/Card';
import FormGroup from '../components/FormGroup';
import ButtonGroup from '../components/ButtonGroup';
import Button from '../components/Button';
import Accordion from '../components/Accordion';
import Checkbox from '../components/Checkbox';
import Input from '../components/Input';
import Dialog from '../components/Dialog';
import styles from '../components/Container.module.scss';
import { SSLTest, SSLCheckRate } from '../types/index';
import { getSSLTest, editSSLTest } from '../services/api/sslTests';

const initialState: SSLTest = {
  url: '',
  checkrate: 86400,
  alert_expiration: true,
  alert_errors: true,
  alert_mixed_content: true,
  follow_redirects: false,
};

const EditTest: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const [_, testId] = location.pathname.split('/edit-test/');

  const [state, setState] = useState(initialState);
  const [showReminders, setShowReminders] = useState(true);
  const [dialogType, setDialogType] = useState('');
  const [editButton, setEditButton] = useState({
    text: 'Save Changes',
    state: '',
    allow: true,
  });

  const updateCheckrate = (nextCheckRate: SSLCheckRate) => {
    setState({ ...state, checkrate: nextCheckRate });
  };

  const updateAlertExpiration = (nextAlertExpiration: boolean) => {
    setState({ ...state, alert_expiration: nextAlertExpiration });
  };

  const updateAlertErrors = (nextAlertErrors: boolean) => {
    setState({ ...state, alert_errors: nextAlertErrors });
  };

  const updateAlertMixedContent = (nextAlertMixedContent: boolean) => {
    setState({ ...state, alert_mixed_content: nextAlertMixedContent });
  };

  const updateFollowRedirects = (nextFollowRedirects: boolean) => {
    setState({ ...state, follow_redirects: nextFollowRedirects });
  };

  const editTest = () => {
    setEditButton({ text: 'Saving', state: 'loading', allow: false });
    editSSLTest(testId, state).then((res) => {
      setEditButton({ text: 'Save Changes', state: '', allow: true });
      setDialogType('success');
    });
  };

  const closeDialog = () => {
    history.push('/');
  };

  // Fetch information using SSLTest service on mount
  useEffect(() => {
    getSSLTest(testId).then((existingTest) => {
      if (existingTest) {
        setState({ ...existingTest });
      }
    });
  }, []);

  return (
    <>
      <Layout>
        <Container>
          <header className={styles.colHeader}>
            <h2>Edit SSL/TLS Monitor</h2>
          </header>

          <div className={styles.colMain}>
            <div className="gap-top--xl" />

            <Card>
              <header>
                <h4>Monitor Settings</h4>
              </header>
              <section>
                <FormGroup
                  label="Monitor URL"
                  tooltip="URL to be checked. Must be HTTPS. Redirects will not be followed."
                >
                  <Input
                    defaultValue={state.url}
                    placeholder="https://example.com"
                    size="large"
                    disabled
                  />
                </FormGroup>
                <FormGroup label="Checkrate">
                  <ButtonGroup>
                    <Button disabled>5 min</Button>
                    <Button disabled>10 min</Button>
                    <Button disabled>30 min</Button>
                    <Button disabled>60 min</Button>
                    <Button
                      onClick={() => updateCheckrate(86400)}
                      selected={state.checkrate === 86400}
                    >
                      24 hrs
                    </Button>
                    <Button
                      onClick={() => updateCheckrate(2073600)}
                      selected={state.checkrate === 2073600}
                    >
                      7 days
                    </Button>
                  </ButtonGroup>
                </FormGroup>
              </section>
            </Card>

            <div className="gap-top" />

            <Accordion title="Alert Settings">
              <Card>
                <section>
                  <FormGroup label="Contact Groups">
                    <Input placeholder="Click for options" size="large" />
                  </FormGroup>
                  <FormGroup label="Alert Types">
                    <Checkbox
                      text="Send Reminders"
                      onChange={(show) => setShowReminders(show)}
                      checked
                    />
                    <Checkbox
                      text="Alert on Expiration"
                      onChange={updateAlertExpiration}
                      checked={state.alert_expiration}
                    />
                    <Checkbox
                      text="Alert on Problems"
                      onChange={updateAlertErrors}
                      checked={state.alert_errors}
                    />
                    <Checkbox
                      text="Mixed Content Warnings"
                      onChange={updateAlertMixedContent}
                      checked={state.alert_mixed_content}
                    />
                  </FormGroup>
                  {showReminders && (
                    <>
                      <FormGroup label="First Reminder">
                        <Input
                          type="number"
                          defaultValue={30}
                          size="xsmall"
                          helper="days before expiration"
                        />
                      </FormGroup>
                      <FormGroup label="Second Reminder">
                        <Input
                          type="number"
                          defaultValue={7}
                          size="xsmall"
                          helper="days before expiration"
                        />
                      </FormGroup>
                      <FormGroup label="Final Reminder">
                        <Input
                          type="number"
                          defaultValue={1}
                          size="xsmall"
                          helper="days before expiration"
                        />
                      </FormGroup>
                    </>
                  )}
                </section>
              </Card>
            </Accordion>

            <div className="gap-top" />

            <Accordion title="Advanced Settings">
              <Card>
                <section>
                  <FormGroup
                    label="Redirects"
                    tooltip="This will follow any HTTP CODE: 3xx responses as redirects."
                  >
                    <Checkbox
                      text="Follow Redirects"
                      onChange={updateFollowRedirects}
                      checked={state.follow_redirects}
                    />
                  </FormGroup>
                  <FormGroup
                    label="User Agent"
                    tooltip="Custom user agent to send with the request to the monitored URL. Leave empty to use the default."
                  >
                    <Input
                      size="large"
                      placeholder="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36 (StatusCake SSL)"
                    />
                  </FormGroup>
                  <FormGroup label="Custom Hostname">
                    <Input
                      size="large"
                      placeholder="Enter custom hostname here"
                    />
                  </FormGroup>
                </section>
              </Card>
            </Accordion>

            <div className="gap-top--xl" />

            <Tooltip
              title="Changes are being saved."
              position="bottom"
              arrow
              disabled={editButton.allow}
            >
              <Button disabled={!editButton.allow} onClick={editTest} fill>
                <span>{editButton.text}</span>
                {editButton.state.length > 0 && (
                  <FontAwesomeIcon icon={faSpinner} spin />
                )}
              </Button>
            </Tooltip>

            <div className="gap-top--xxl" />
          </div>
        </Container>
      </Layout>

      <Dialog open={dialogType === 'success'}>
        <h3>Success</h3>
        <p>
          Your test for{' '}
          <a href={state.url} target="_blank" rel="noreferrer">
            {state.url}
          </a>{' '}
          has been updated successfully.
        </p>
        <p className="gap-bottom--l">A new test will be done soon.</p>
        <Button onClick={closeDialog}>Okay</Button>
      </Dialog>
    </>
  );
};

export default EditTest;
