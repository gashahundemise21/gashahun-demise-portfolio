import { ImageResponse } from 'next/og';
export const alt='Gashahun Demise — Computer Vision & Machine Learning';
export const size={width:1200,height:630};
export const contentType='image/png';
export default function Image(){return new ImageResponse(<div style={{background:'#38251c',color:'#f3dfc4',width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',padding:90}}><div style={{fontSize:24,color:'#ddbea0',marginBottom:40}}>GASHAHUN DEMISE / COMPUTER VISION</div><div style={{fontSize:76,lineHeight:1.1}}>Turning visual data</div><div style={{fontSize:76,color:'#ddbea0'}}>into practical AI.</div><div style={{fontSize:26,marginTop:50}}>Research-minded. Engineering-focused.</div></div>,size)}
