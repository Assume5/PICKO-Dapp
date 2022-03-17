import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

export default function useCheckCustomerAddress() {
  const [hasAddress, setHasAddress] = useState<boolean | null>(null);
  useEffect(() => {
    if (Cookies.get('address_details')) {
      setHasAddress(true);
    } else {
      setHasAddress(false);
    }
  }, []);

  return hasAddress;
}
