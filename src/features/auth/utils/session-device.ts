import type { TablerIcon } from '@tabler/icons-react';
import { IconDeviceDesktop, IconDeviceMobile, IconDeviceTablet } from '@tabler/icons-react';
import { UAParser } from 'ua-parser-js';

export function getDeviceIcon(device: string): TablerIcon {
  switch (device) {
    case 'Mobile':
      return IconDeviceMobile;

    case 'Tablet':
      return IconDeviceTablet;

    default:
      return IconDeviceDesktop;
  }
}

export interface SessionDeviceInfo {
  browser: string;
  os: string;
  device: 'Desktop' | 'Mobile' | 'Tablet' | 'TV' | 'Wearable' | 'Embedded' | 'Unknown';
}

export function parseSessionDevice(userAgent?: string | null): SessionDeviceInfo {
  if (userAgent === null || userAgent === undefined) {
    return {
      browser: 'Unknown browser',
      os: 'Unknown OS',
      device: 'Unknown',
    };
  }

  const parser = new UAParser(userAgent);

  const browserName = parser.getBrowser().name;
  const browserVersion = parser.getBrowser().major;

  const osName = parser.getOS().name;
  const osVersion = parser.getOS().version;

  const deviceType = parser.getDevice().type;

  let device: SessionDeviceInfo['device'] = 'Desktop';

  if (deviceType === 'mobile') {
    device = 'Mobile';
  } else if (deviceType === 'tablet') {
    device = 'Tablet';
  } else if (deviceType === 'smarttv') {
    device = 'TV';
  } else if (deviceType === 'wearable') {
    device = 'Wearable';
  } else if (deviceType === 'embedded') {
    device = 'Embedded';
  }

  return {
    browser: [browserName, browserVersion].filter(Boolean).join(' ') || 'Unknown browser',
    os: [osName, osVersion].filter(Boolean).join(' ') || 'Unknown OS',
    device,
  };
}
