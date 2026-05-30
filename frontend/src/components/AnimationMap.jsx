import React, { useEffect, useRef } from 'react';
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

const RECENT_PLACES = [
  { icon: '🏠', name: 'Home',           addr: '123 Main Street',        dist: '0.3 km' },
  { icon: '💼', name: 'Work',           addr: 'Tech Park, Sector 62',   dist: '4.1 km' },
  { icon: '🛍', name: 'City Mall',      addr: 'NH-58, Ghaziabad',       dist: '2.7 km' },
];

const NEARBY_PLACES = [
  { icon: '🚇', name: 'Metro Station',  addr: 'Vaishali Metro, Ghaziabad', dist: '1.2 km' },
  { icon: '🏥', name: 'Fortis Hospital',addr: 'Noida Sector 62',           dist: '3.8 km' },
  { icon: '🚂', name: 'Railway Station',addr: 'Ghaziabad Junction',        dist: '5.5 km' },
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

function AnimatedMap({
  carPos = { x: 0.1, y: 0.35 },
  offset = { x: 0, y: 0 }
}) {
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
      width={window.innerWidth}
      height={window.innerHeight}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    />
  );
}

// ── Address suggestions portal (bottom sheet) ──────────────────────────────
function TripPortal({ pickup, destination, setPickup, setDestination, onClose }) {
  const destRef = useRef(null);

  useEffect(() => {
    // auto-focus destination input when portal opens
    const t = setTimeout(() => destRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, []);

  const handleSelectPlace = (name) => {
    setDestination(name);
  };

  const showSearch = pickup || destination;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute', inset: 0, zIndex: 30,
          background: 'rgba(0,0,0,0.18)',
        }}
      />

      {/* Bottom sheet */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 40,
        background: 'white',
        borderRadius: '20px 20px 0 0',
        maxHeight: '82%',
        overflowY: 'auto',
        animation: 'slideUp 0.32s cubic-bezier(0.32,0.72,0,1)',
      }}>
        {/* Drag handle */}
        <div style={{
          width: 36, height: 4, background: '#e0e0e0',
          borderRadius: 2, margin: '12px auto 0',
        }} />

        {/* Inputs */}
        <div style={{ padding: '16px 16px 10px' }}>
          <div style={{ fontSize: 17, fontWeight: 600, color: '#111', marginBottom: 12 }}>
            Find a trip
          </div>
          <div style={{ border: '1.5px solid #f0a500', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderBottom: '1px solid #f0f0f0' }}>
              <div style={{ width: 10, height: 10, border: '2px solid #111', borderRadius: '50%', flexShrink: 0 }} />
              <input
                type="text"
                value={pickup}
                onChange={e => setPickup(e.target.value)}
                placeholder="Add a pick-up location"
                style={{ border: 'none', outline: 'none', fontSize: 14, color: '#333', background: 'transparent', width: '100%', fontFamily: 'inherit' }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px' }}>
              <div style={{ width: 10, height: 10, background: '#111', borderRadius: 2, flexShrink: 0 }} />
              <input
                ref={destRef}
                type="text"
                value={destination}
                onChange={e => setDestination(e.target.value)}
                placeholder="Enter your destination"
                style={{ border: 'none', outline: 'none', fontSize: 14, color: '#333', background: 'transparent', width: '100%', fontFamily: 'inherit' }}
              />
            </div>
          </div>
        </div>

        {/* Recent */}
        <SectionLabel>Recent</SectionLabel>
        {RECENT_PLACES.map((p, i) => (
          <PlaceRow key={i} place={p} onSelect={() => handleSelectPlace(p.name)} />
        ))}

        {/* Nearby */}
        <SectionLabel>Nearby places</SectionLabel>
        {NEARBY_PLACES.map((p, i) => (
          <PlaceRow key={i} place={p} onSelect={() => handleSelectPlace(p.name)} />
        ))}

        {/* Search button */}
        {showSearch && (
          <div style={{ padding: '12px 16px 20px' }}>
            <button
              onClick={onClose}
              style={{
                width: '100%', background: '#111', color: 'white',
                border: 'none', borderRadius: 10, padding: '13px',
                fontSize: 15, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              Search rides
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{ fontSize: 11, color: '#aaa', fontWeight: 600, letterSpacing: '0.5px', padding: '10px 16px 4px', textTransform: 'uppercase' }}>
      {children}
    </div>
  );
}

function PlaceRow({ place, onSelect }) {
  const [hovered, setHovered] = useState(false);
  return (
    <>
      <div
        onClick={onSelect}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '11px 16px', cursor: 'pointer',
          background: hovered ? '#fafafa' : 'transparent',
          transition: 'background 0.15s',
        }}
      >
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: '#f5f5f5',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, flexShrink: 0,
        }}>
          {place.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, color: '#111', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{place.name}</div>
          <div style={{ fontSize: 12, color: '#999', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{place.addr}</div>
        </div>
        <div style={{ fontSize: 12, color: '#bbb', flexShrink: 0 }}>{place.dist}</div>
      </div>
      <div style={{ height: 1, background: '#f0f0f0', margin: '0 16px' }} />
    </>
  );
}
export default AnimatedMap;