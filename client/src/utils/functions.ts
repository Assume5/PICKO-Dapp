import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import { AES } from 'crypto-js';
import { hashKey } from './constant';

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
