import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/userContext';

const roads = [
  { x1: 0, y1: 0.3, x2: 1, y2: 0.45 },
  { x1: 0, y1: 0.6, x2: 1, y2: 0.7 },
  { x1: 0.2, y1: 0, x2: 0.3, y2: 1 },
  { x1: 0.6, y1: 0, x2: 0.55, y2: 1 },
  { x1: 0, y1: 0.15, x2: 1, y2: 0.2 },
  { x1: 0.8, y1: 0, x2: 0.85, y2: 1 },
];

const blocks = [
  { x: 0.31, y: 0.21, w: 0.28, h: 0.08 },
  { x: 0.0,  y: 0.21, w: 0.19, h: 0.08 },
  { x: 0.56, y: 0.21, w: 0.23, h: 0.08 },
  { x: 0.31, y: 0.46, w: 0.23, h: 0.13 },
  { x: 0.0,  y: 0.46, w: 0.19, h: 0.13 },
  { x: 0.56, y: 0.46, w: 0.23, h: 0.13 },
  { x: 0.31, y: 0.71, w: 0.23, h: 0.29 },
  { x: 0.0,  y: 0.71, w: 0.19, h: 0.29 },
];

const park = { x: 0.56, y: 0.71, w: 0.23, h: 0.29 };

const routePath = [
  { x: 0.1,  y: 0.35 },
  { x: 0.3,  y: 0.37 },
  { x: 0.3,  y: 0.55 },
  { x: 0.55, y: 0.58 },
  { x: 0.55, y: 0.38 },
  { x: 0.8,  y: 0.4  },
];

function lerp(a, b, t) { return a + (b - a) * t; }

function getCarPos(t) {
  const total = routePath.length - 1;
  const seg = t * total;
  const i = Math.min(Math.floor(seg), total - 1);
  const f = seg - i;
  return {
    x: lerp(routePath[i].x, routePath[i + 1].x, f),
    y: lerp(routePath[i].y, routePath[i + 1].y, f),
  };
}

const MAP_W = 304;
const MAP_H = 340;

function AnimatedMap({ carPos, offset }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const ox = offset.x;
    const oy = offset.y;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#e8e8df';
    ctx.fillRect(0, 0, w, h);

    blocks.forEach(b => {
      ctx.fillStyle = '#d4d3c8';
      ctx.fillRect((b.x + ox) * w, (b.y + oy) * h, b.w * w, b.h * h);
    });

    ctx.fillStyle = '#b8d4b0';
    ctx.fillRect((park.x + ox) * w, (park.y + oy) * h, park.w * w, park.h * h);

    roads.forEach(r => {
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo((r.x1 + ox) * w, (r.y1 + oy) * h);
      ctx.lineTo((r.x2 + ox) * w, (r.y2 + oy) * h);
      ctx.stroke();
      ctx.strokeStyle = '#e0dfd8';
      ctx.lineWidth = 0.5;
      ctx.stroke();
    });

    ctx.strokeStyle = '#d5622d';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 4]);
    ctx.beginPath();
    routePath.forEach((p, i) => {
      const px = (p.x + ox) * w;
      const py = (p.y + oy) * h;
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    });
    ctx.stroke();
    ctx.setLineDash([]);
  }, [carPos, offset]);

  return (
    <canvas
      ref={canvasRef}
      width={MAP_W}
      height={MAP_H}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    />
  );
}

export default function Home() {
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [t, setT] = useState(0);
  const [eta, setEta] = useState(7);
  const rafRef = useRef(null);
  const tRef = useRef(0);

  useEffect(() => {
    const token = localStorage.getItem('user');
    if (!token) navigate('/login');
  }, [navigate]);

  useEffect(() => {
    let last = null;
    function tick(now) {
      if (last !== null) {
        const delta = (now - last) / 1000;
        tRef.current = (tRef.current + delta * 0.08) % 1;
        setT(tRef.current);
        setEta(Math.max(1, Math.round(7 - tRef.current * 6)));
      }
      last = now;
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const carPos = getCarPos(t);
  const drift = t * 0.08;
  const offset = { x: -drift * 0.3, y: -drift * 0.2 };
  const carX = (carPos.x + offset.x) * MAP_W;
  const carY = (carPos.y + offset.y) * MAP_H;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      fontFamily: "'Segoe UI', sans-serif",
    }}>
      {/* ✅ Phone frame wrapper */}
      <div style={{
        width: 320,
        background: '#fff',
        borderRadius: 36,
        overflow: 'hidden',
        border: '8px solid #222',
        position: 'relative',
        boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
        display: 'flex',
        flexDirection: 'column',
        height: 620,
      }}>

        {/* Map Area */}
        <div style={{ position: 'relative', flex: 1, overflow: 'hidden', background: '#e8e8df' }}>
          <AnimatedMap carPos={carPos} offset={offset} />

          {/* Header */}
          <div style={{
            position: 'absolute', top: 12, left: 16, zIndex: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            width: 'calc(100% - 32px)',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'rgba(255,255,255,0.92)', padding: '6px 12px', borderRadius: 20,
            }}>
              <div style={{
                width: 20, height: 20, background: '#111', borderRadius: 6,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: '#d5622d', fontWeight: 700, fontSize: 10 }}>Z</span>
              </div>
              <span style={{ fontSize: 14, fontWeight: 500, color: '#111' }}>
                Zip<span style={{ color: '#d5622d' }}>Ride</span>
              </span>
            </div>
            <button
              onClick={handleLogout}
              style={{
                background: 'rgba(255,255,255,0.92)', border: 'none',
                borderRadius: 20, padding: '6px 12px',
                fontSize: 12, color: '#d5622d', fontWeight: 500, cursor: 'pointer',
              }}
            >
              Logout
            </button>
          </div>

          {/* User greeting */}
          {user?.fullName?.firstName && (
            <div style={{
              position: 'absolute', top: 56, left: 16, zIndex: 10,
              background: 'rgba(255,255,255,0.85)', padding: '4px 10px',
              borderRadius: 12, fontSize: 12, color: '#444',
            }}>
              Hi, {user.fullName.firstName} 👋
            </div>
          )}

          {/* Arrival card */}
          <div style={{
            position: 'absolute', right: 16, top: '45%', transform: 'translateY(-50%)',
            background: 'white', borderRadius: 12, padding: '10px 14px',
            textAlign: 'center', zIndex: 10,
            boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
          }}>
            <div style={{ fontSize: 10, color: '#888' }}>Arrival</div>
            <div style={{ fontSize: 24, fontWeight: 600, color: '#111', lineHeight: 1.2 }}>{eta}</div>
            <div style={{ fontSize: 10, color: '#888' }}>min</div>
          </div>

          {/* Animated car dot */}
          <div style={{
            position: 'absolute',
            left: carX - 7,
            top: carY - 7,
            width: 14, height: 14,
            background: '#111',
            borderRadius: '50%',
            border: '2px solid white',
            zIndex: 10,
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
            transition: 'left 0.05s linear, top 0.05s linear',
          }} />
        </div>

        {/* Bottom Panel */}
        <div style={{
          background: 'white',
          borderRadius: '24px 24px 0 0',
          padding: '20px 16px 28px',
          zIndex: 20,
          marginTop: -12,
        }}>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#111', marginBottom: 14 }}>
            Find a trip
          </div>

          <div style={{ border: '1.5px solid #f0a500', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '12px 14px', borderBottom: '1px solid #f0f0f0',
            }}>
              <div style={{
                width: 10, height: 10, border: '2px solid #111',
                borderRadius: '50%', flexShrink: 0,
              }} />
              <input
                type="text"
                value={pickup}
                onChange={e => setPickup(e.target.value)}
                placeholder="Add a pick-up location"
                style={{
                  border: 'none', outline: 'none', fontSize: 14,
                  color: '#333', background: 'transparent',
                  width: '100%', fontFamily: 'inherit',
                }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px' }}>
              <div style={{
                width: 10, height: 10, background: '#111',
                borderRadius: 2, flexShrink: 0,
              }} />
              <input
                type="text"
                value={destination}
                onChange={e => setDestination(e.target.value)}
                placeholder="Enter your destination"
                style={{
                  border: 'none', outline: 'none', fontSize: 14,
                  color: '#333', background: 'transparent',
                  width: '100%', fontFamily: 'inherit',
                }}
              />
            </div>
          </div>

          {(pickup || destination) && (
            <button style={{
              marginTop: 12, width: '100%',
              background: '#111', color: 'white',
              border: 'none', borderRadius: 10,
              padding: '13px', fontSize: 15,
              fontWeight: 500, cursor: 'pointer',
              fontFamily: 'inherit',
            }}>
              Search rides
            </button>
          )}
        </div>

      </div>
    </div>
  );
}