import { ImageResponse } from 'next/og';
import { enset } from '@/lib/content';

export const alt = 'Gashahun Demise, machine learning engineer and computer vision researcher';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Social card: name, positioning and the study's confusion matrix, drawn from the real numbers.
export default function Image() {
  const { matrix } = enset.confusion;
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {matrix.map((row, i) => (
          <div key={i} style={{ display: 'flex', gap: 8 }}>
            {row.map((v, j) => {
              const share = v / row.reduce((a, b) => a + b, 0);
              const flag = i === 2 && j === 1;
              return (
                <div key={j} style={{ width: 104, height: 104, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30,
                  background: i === j ? `rgba(11,122,97,${0.3 + share * 0.7})` : flag ? '#fdebe6' : '#f2f5f7',
                  color: i === j ? '#ffffff' : flag ? '#b83d26' : '#3a434c', border: flag ? '3px solid #b83d26' : '1px solid #e2e7eb', borderRadius: 12 }}>
                  {v}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>,
    size,
  );
}
