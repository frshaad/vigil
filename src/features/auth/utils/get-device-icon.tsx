import { IconDeviceDesktop, IconDeviceMobile, IconDeviceTablet } from '@tabler/icons-react';

import type { DeviceType } from '../types';

export function getDeviceIcon(device: DeviceType) {
  if (device === 'Mobile') {
    return <IconDeviceMobile />;
  }

  if (device === 'Tablet') {
    return <IconDeviceTablet />;
  }

  return <IconDeviceDesktop />;
}
