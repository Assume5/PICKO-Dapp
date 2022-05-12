import { serverUrl } from '@src/constants';
import React, { useEffect, useState } from 'react';

export const TestServer = () => {
  const [data, setData] = useState('');
  useEffect(() => {
    const getExample = async () => {
      const response = await fetch(`${serverUrl}/example`);
      const data = await response.json();
      setData(data);
      console.log(data);
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

  return (
    <div className="test-server" style={{ marginTop: '200px' }}>
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
  );
};
