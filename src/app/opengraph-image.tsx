import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        background: '#0f172a',
        color: 'white',
        padding: 80,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          fontSize: 72,
          fontWeight: 700,
        }}
      >
        Vigil
      </div>

      <div
        style={{
          fontSize: 38,
          color: '#cbd5e1',
        }}
      >
        Modern uptime monitoring for websites, APIs and cron jobs.
      </div>

      <div
        style={{
          fontSize: 26,
          color: '#94a3b8',
        }}
      >
        vigil.example.com
      </div>
    </div>,
    size
  );
}
