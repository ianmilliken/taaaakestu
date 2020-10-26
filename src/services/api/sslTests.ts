import {
  SSLTest,
  SSLTestResultWithId,
  SSLTestResult,
  GetAllSSLTestsResponse,
  EditSSLTestBody,
} from '../../types/index';

const apiBase = process.env.REACT_APP_API_BASE;

const postHeaders: RequestInit = {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
  },
};

const putHeaders: RequestInit = {
  method: 'put',
  headers: {
    'Content-Type': 'application/json',
  },
};

const deleteHeaders: RequestInit = {
  method: 'delete',
};

export const getAllSSLTests = async (): Promise<SSLTestResult[]> => {
  try {
    const res = await fetch(`${apiBase}/ssl`);
    if (res.status === 200) {
      const body: GetAllSSLTestsResponse = await res.json();
      return body.tests;
    }
    return [];
  } catch (err) {
    return err;
  }
};

export const getSSLTest = async (
  id: string
): Promise<SSLTestResultWithId | null> => {
  try {
    const res = await fetch(`${apiBase}/ssl/${id}`);
    if (res.status === 200) {
      const body: SSLTestResultWithId = await res.json();
      return body;
    }
    return null;
  } catch (err) {
    return err;
  }
};

export const addSSLTest = async (payload: SSLTest): Promise<any> => {
  try {
    const res = await fetch(`${apiBase}/ssl`, {
      ...postHeaders,
      body: JSON.stringify(payload),
    });
    if (res.status === 201) {
      const body = await res.json();
      return body;
    }
    return null;
  } catch (err) {
    return err;
  }
};

export const editSSLTest = async (
  id: string,
  payload: EditSSLTestBody
): Promise<SSLTestResultWithId | null> => {
  try {
    const res = await fetch(`${apiBase}/ssl/${id}`, {
      ...putHeaders,
      body: JSON.stringify(payload),
    });
    if (res.status === 200) {
      const body = await res.json();
      return body;
    }
    return null;
  } catch (err) {
    return err;
  }
};

export const deleteSSLTest = async (id: string): Promise<boolean> => {
  try {
    const res = await fetch(`${apiBase}/ssl/${id}`, { ...deleteHeaders });
    if (res.status === 204) {
      return true;
    }
    return false;
  } catch (err) {
    return err;
  }
};
