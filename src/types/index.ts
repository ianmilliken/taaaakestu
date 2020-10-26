/* eslint-disable camelcase */
export type SSLCheckRate = 300 | 600 | 1800 | 3600 | 86400 | 2073600;

export interface SSLTest {
  url: string;
  checkrate: SSLCheckRate;
  alert_expiration: boolean;
  alert_errors: boolean;
  alert_mixed_content: boolean;
  follow_redirects: boolean;
}

export interface SSLTestResultWithId extends SSLTest {
  test_id: string;
}

export interface SSLTestResult extends SSLTest {
  test_id: string;
  first_expiration_reminder: number;
  second_expiration_reminder: number;
  third_expiration_reminder: number;
}

export interface GetAllSSLTestsResponse {
  metadata: {
    total_size: number;
  };
  tests: SSLTestResult[];
}

export interface EditSSLTestBody {
  checkrate: SSLCheckRate;
  alert_expiration: boolean;
  alert_errors: boolean;
  alert_mixed_content: boolean;
  follow_redirects: boolean;
}
