import { serverUrl } from '@src/constants';
import React, { useEffect, useState } from 'react';
import { CustomerHeader } from '../../../components/Customer/CustomerHeader/CustomerHeader';

export const TestServer = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    const getExample = async () => {
      const response = await fetch(`${serverUrl}/example`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      });
      const data = await response.json();
      setData(data);
    };
    getExample();
  }, []);

  const testPost = async (fname: string, lname: string) => {
    const res = await fetch(`${serverUrl}/example`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fname,
        lname,
      }),
    });
    console.log(await res.json());
  };

  const testPut = async () => {
    const id: HTMLInputElement = document.querySelector('#id')!;
    const fname: HTMLInputElement = document.querySelector('#fname')!;
    const lname: HTMLInputElement = document.querySelector('#lname')!;
    const res = await fetch(`${serverUrl}/example/${id.value}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fname: fname.value,
        lname: lname.value,
      }),
    });
    console.log(await res.json());
  };

  const testDelete = async () => {
    const id: HTMLInputElement = document.querySelector('#delete-id')!;
    const res = await fetch(`${serverUrl}/example/${id.value}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(await res.json());
  };

  const testLogin = async () => {
    try {
      const res = await fetch(`${serverUrl}/example/login`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'test user',
        }),
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const testLogout = async () => {
    const res = await fetch(`${serverUrl}/example/logout`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
    });

    const data = await res.json();
    console.log(data);
  };

  const testGet = async () => {
    const response = await fetch(`${serverUrl}/example`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <CustomerHeader />
      <div className="test-server" style={{ marginTop: '200px' }}>
        <button onClick={() => testLogin()}>Test Login</button>
        <br />
        <br />
        <button onClick={() => testLogout()}>Test Logout</button>
        <br />
        <br />
        <button onClick={() => testGet()}>Test Get</button>

        <br />
        <br />

        <button onClick={() => testPost('fname', 'lname')}>Test Post</button>
        <br />
        <input type="text" placeholder="ID" id="id" />
        <input type="text" placeholder="lname" id="lname" />
        <input type="text" placeholder="fname" id="fname" />
        <br />
        <button onClick={() => testPut()}>Test PUT</button>
        <br />
        <input type="text" placeholder="ID" id="delete-id" />
        <br />

        <button onClick={() => testDelete()}>Test DELETE</button>
      </div>
    </>
  );
};
