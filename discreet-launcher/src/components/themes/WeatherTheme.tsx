interface Props {
  onTitleTap: () => void;
  onTitleLongPress: () => void;
}

const FORECAST = [
  { day: 'Today', icon: '⛅', high: 18, low: 12 },
  { day: 'Tue', icon: '🌧️', high: 14, low: 9 },
  { day: 'Wed', icon: '☀️', high: 22, low: 14 },
  { day: 'Thu', icon: '🌤️', high: 20, low: 13 },
  { day: 'Fri', icon: '⛅', high: 17, low: 11 },
];

export function WeatherTheme({ onTitleTap, onTitleLongPress }: Props) {
  const longPressTimer = { current: 0 as ReturnType<typeof setTimeout> };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #2563eb 0%, #1e40af 60%, #1e3a8a 100%)' }}>
      <div
        className="px-6 pt-14 pb-6 cursor-default select-none"
        onClick={onTitleTap}
        onPointerDown={() => { longPressTimer.current = setTimeout(onTitleLongPress, 2000); }}
        onPointerUp={() => clearTimeout(longPressTimer.current)}
        onPointerLeave={() => clearTimeout(longPressTimer.current)}
      >
        <p className="text-blue-200 text-sm mb-1">📍 London, UK</p>
        <div className="text-8xl font-thin text-white mt-2">18°</div>
        <p className="text-white text-lg mt-1">Partly Cloudy</p>
        <p className="text-blue-200 text-sm mt-1">H:22°  L:12°</p>
      </div>

      <div className="mx-4 bg-white/10 backdrop-blur rounded-2xl p-4 mt-2">
        <p className="text-blue-100 text-xs uppercase tracking-widest mb-3">5-Day Forecast</p>
        {FORECAST.map((f, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
            <span className="text-white w-14">{f.day}</span>
            <span className="text-2xl">{f.icon}</span>
            <div className="flex gap-4 text-sm">
              <span className="text-blue-200">{f.low}°</span>
              <span className="text-white font-medium">{f.high}°</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3 mx-4 mt-3">
        {[
          { label: 'Humidity', value: '72%' },
          { label: 'Wind', value: '12 km/h' },
          { label: 'UV Index', value: '3' },
        ].map((item, i) => (
          <div key={i} className="bg-white/10 backdrop-blur rounded-2xl p-3 text-center">
            <p className="text-blue-200 text-xs">{item.label}</p>
            <p className="text-white font-semibold mt-1">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
