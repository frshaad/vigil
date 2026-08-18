import { useEffect, useState } from 'react';

export function useIsClient() {
  const [isClient, setClient] = useState(false);

  useEffect(() => {
    // oxlint-disable-next-line react/set-state-in-effect
    setClient(true);
  }, []);

  return isClient;
}
