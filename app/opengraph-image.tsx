import { ImageResponse } from 'next/og';

export const alt = 'Gashahun Demise, machine learning engineer and computer vision researcher';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Social card: name, positioning and headline numbers from the enset study.
export default function Image() {
  return new ImageResponse(
    <div style={{ background: '#ffffff', color: '#0f1419', width: '100%', height: '100%', display: 'flex', padding: 80, justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', width: 640 }}>
        <div style={{ fontSize: 22, letterSpacing: 3, color: '#0b7a61', marginBottom: 34 }}>MACHINE LEARNING · COMPUTER VISION</div>
        <div style={{ fontSize: 92, lineHeight: 1.02, letterSpacing: -3 }}>Gashahun Demise</div>
        <div style={{ fontSize: 32, color: '#8f5b00', marginTop: 30, lineHeight: 1.35 }}>
          Computer vision that survives honest evaluation.
        </div>
        <div style={{ fontSize: 20, color: '#5d6974', marginTop: 48 }}>Ethiopian Artificial Intelligence Institute · Addis Ababa</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {[['7,545', 'field photos'], ['95.42%', 'mean accuracy'], ['1.37%', 'old leaves called wilt']].map(([v, l], i) => (
          <div key={v} style={{ display: 'flex', flexDirection: 'column', width: 320, padding: '20px 26px', borderRadius: 16, background: '#f7f9fa', border: '1px solid #e2e7eb' }}>
            <div style={{ fontSize: 48, color: i === 2 ? '#b83d26' : '#0b7a61' }}>{v}</div>
            <div style={{ fontSize: 20, color: '#5d6974' }}>{l}</div>
          </div>
        ))}
      </div>
    </div>,
    size,
  );
}
