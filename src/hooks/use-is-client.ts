import { useEffect, useState } from 'react';

export function useIsClient() {
  const [isClient, setClient] = useState(false);

  useEffect(() => {
    // oxlint-disable-next-line react/react-compiler
    setClient(true);
  }, []);

  return isClient;
}
