import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import { AES } from 'crypto-js';
import { hashKey, serverUrl } from './constants';

export const getCookie = (name: string) => {
  if (Cookies.get(name)) {
    const result: string = AES.decrypt(Cookies.get(name)!, hashKey).toString(CryptoJS.enc.Utf8);
    return JSON.parse(result);
  }
  return Cookies.get(name);
};

export const setCookie = (name: string, value: string | object, expires: number) => {
  value = AES.encrypt(JSON.stringify(value), hashKey).toString();
  Cookies.set(name, value, { expires: expires });
};

export const removeCookie = (name: string) => {
  Cookies.remove(name, { path: '' });
};

export const checkAddress = () => {
  if (Cookies.get('address_details')) {
    return true;
  }
  return false;
};

export const logout = async () => {
  try {
    const res = await fetch(`${serverUrl}/logout`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
    });

    const data = await res.json();

    if (data.success) {
      Cookies.remove('socket-cookie');
      return true;
    }

    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const formatDate = (unFormatDate: string) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const date = new Date(unFormatDate);
  return `${
    monthNames[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

export const calculateDistance = (lat: number, long: number, destLat: number, destLong: number) => {
  const lon1 = (long * Math.PI) / 180;
  const lon2 = (destLong * Math.PI) / 180;
  const lat1 = (lat * Math.PI) / 180;
  const lat2 = (destLat * Math.PI) / 180;

  const dlon = lon2 - lon1;
  const dlat = lat2 - lat1;
  const a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

  const c = 2 * Math.asin(Math.sqrt(a));

  const r = 3956;

  return c * r;
};
