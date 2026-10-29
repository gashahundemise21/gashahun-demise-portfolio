import { ImageResponse } from 'next/og';
import { enset } from '@/lib/content';

export const alt = 'Gashahun Demise, machine learning engineer and computer vision researcher';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Social card: name, positioning and the study's confusion matrix, drawn from the real numbers.
export default function Image() {
  const { matrix } = enset.confusion;
  return new ImageResponse(
    <div style={{ background: '#0d0f12', color: '#f4f6f8', width: '100%', height: '100%', display: 'flex', padding: 80, justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', width: 640 }}>
        <div style={{ fontSize: 22, letterSpacing: 3, color: '#3dd6b0', marginBottom: 34 }}>MACHINE LEARNING · COMPUTER VISION</div>
        <div style={{ fontSize: 92, lineHeight: 1.02, letterSpacing: -3 }}>Gashahun Demise</div>
        <div style={{ fontSize: 32, color: '#f5b82e', marginTop: 30, lineHeight: 1.35 }}>
          Computer vision models that hold up under honest evaluation, and the software around them.
        </div>
        <div style={{ fontSize: 20, color: '#8d97a2', marginTop: 48 }}>Ethiopian Artificial Intelligence Institute · Addis Ababa</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {matrix.map((row, i) => (
          <div key={i} style={{ display: 'flex', gap: 8 }}>
            {row.map((v, j) => {
              const share = v / row.reduce((a, b) => a + b, 0);
              const flag = i === 2 && j === 1;
              return (
                <div key={j} style={{ width: 104, height: 104, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30,
                  background: i === j ? `rgba(61,214,176,${0.3 + share * 0.7})` : flag ? '#3a2621' : '#171c22',
                  color: i === j ? '#062019' : flag ? '#ff8f73' : '#c8ced5', border: flag ? '3px solid #ff8f73' : '1px solid #232a31', borderRadius: 12 }}>
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
