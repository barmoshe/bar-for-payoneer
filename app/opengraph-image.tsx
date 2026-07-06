import { ImageResponse } from 'next/og';

// Dynamic share card for the bar-for-payoneer application page, matching the
// page's look — Payoneer's real brand, read live off payoneer.com (2026-07-06):
// a clean white canvas, ink #212529 text, and the signature rainbow ring
// (green to blue to purple to magenta) drawn as a sweeping arc stroke.
// Rendered by next/og (Satori): flexbox-only CSS, plain hex colours.

export const alt =
  'Bar Moshe for Payoneer — ten shipped builds, no wire transfer required, in Payoneer\'s own visual language. Real shipped work, live links.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 72px 48px',
          backgroundColor: '#ffffff',
          color: '#212529',
          fontFamily: 'sans-serif',
        }}
      >
        {/* the rainbow ring arc as a sweeping stroke, top-right */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: -180,
            right: -160,
            width: 620,
            height: 620,
          }}
        >
          <svg width="620" height="620" viewBox="0 0 620 620">
            <defs>
              <linearGradient id="og-ring" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3fd07f" />
                <stop offset="34%" stopColor="#1f9bde" />
                <stop offset="68%" stopColor="#7b3fe4" />
                <stop offset="100%" stopColor="#e0409b" />
              </linearGradient>
            </defs>
            <circle
              cx="310"
              cy="310"
              r="250"
              fill="none"
              stroke="url(#og-ring)"
              strokeWidth="22"
              strokeLinecap="round"
              strokeDasharray="1180 400"
            />
          </svg>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* small rainbow-ring mark */}
          <svg width="56" height="56" viewBox="0 0 56 56">
            <defs>
              <linearGradient id="og-mark" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3fd07f" />
                <stop offset="34%" stopColor="#1f9bde" />
                <stop offset="68%" stopColor="#7b3fe4" />
                <stop offset="100%" stopColor="#e0409b" />
              </linearGradient>
            </defs>
            <circle cx="28" cy="28" r="17" fill="none" stroke="url(#og-mark)" strokeWidth="9" />
          </svg>
          <div style={{ display: 'flex', fontSize: 38, fontWeight: 800 }}>
            bar for payoneer
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div
            style={{
              display: 'flex',
              fontSize: 78,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 900,
            }}
          >
            Ten shipped builds. No wire transfer required.
          </div>
          <div style={{ display: 'flex', fontSize: 34, color: '#5a6570' }}>
            Real shipped work, live links, built for Payoneer.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              backgroundColor: '#7b3fe4',
              color: '#ffffff',
              borderRadius: 999,
              padding: '16px 36px',
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            See the work →
          </div>
          <div style={{ display: 'flex', fontSize: 26, color: '#212529' }}>Bar Moshe</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
