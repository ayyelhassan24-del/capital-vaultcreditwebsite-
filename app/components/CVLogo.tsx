export function CVLogoMark({ size = 40 }: { size?: number }) {
  const cx = 100, cy = 100, r1 = 88, r2 = 68;
  const bolts = Array.from({ length: 8 }, (_, i) => {
    const a = (i * 45 - 90) * (Math.PI / 180);
    return { x: cx + r1 * Math.cos(a), y: cy + r1 * Math.sin(a) };
  });
  const notches = Array.from({ length: 4 }, (_, i) => {
    const a = (i * 90 - 90) * (Math.PI / 180);
    return {
      x1: cx + (r2 - 10) * Math.cos(a), y1: cy + (r2 - 10) * Math.sin(a),
      x2: cx + (r1 + 5)  * Math.cos(a), y2: cy + (r1 + 5)  * Math.sin(a),
    };
  });

  return (
    <svg
      width={size} height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer ring */}
      <circle cx={cx} cy={cy} r={r1} stroke="#16130d" strokeWidth="7" />
      {/* Inner gold ring */}
      <circle cx={cx} cy={cy} r={r2} stroke="#c8a800" strokeWidth="3" />
      {/* Bolt markers */}
      {bolts.map((b, i) => (
        <circle key={i} cx={b.x} cy={b.y} r="5.5" fill="#16130d" />
      ))}
      {/* Cardinal notch lines */}
      {notches.map((n, i) => (
        <line key={i} x1={n.x1} y1={n.y1} x2={n.x2} y2={n.y2} stroke="#16130d" strokeWidth="3" />
      ))}
      {/* CV letters */}
      <text
        x="54" y="122"
        fontFamily="Georgia, serif"
        fontSize="58"
        fontWeight="700"
        fill="#16130d"
      >C</text>
      <text
        x="98" y="122"
        fontFamily="Georgia, serif"
        fontSize="58"
        fontWeight="700"
        fill="#c8a800"
      >V</text>
    </svg>
  );
}
