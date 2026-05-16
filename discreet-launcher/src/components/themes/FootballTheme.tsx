import { useEffect, useState } from 'react';

interface Match {
  home: string;
  away: string;
  homeScore: number;
  awayScore: number;
  minute: number;
  status: 'live' | 'ft';
}

const INITIAL_MATCHES: Match[] = [
  { home: 'Man City', away: 'Arsenal', homeScore: 2, awayScore: 1, minute: 67, status: 'live' },
  { home: 'Liverpool', away: 'Chelsea', homeScore: 1, awayScore: 1, minute: 45, status: 'live' },
  { home: 'Spurs', away: 'Everton', homeScore: 3, awayScore: 0, minute: 90, status: 'ft' },
  { home: 'Newcastle', away: 'West Ham', homeScore: 2, awayScore: 2, minute: 82, status: 'live' },
  { home: 'Brighton', away: 'Wolves', homeScore: 1, awayScore: 0, minute: 54, status: 'live' },
];

interface Props {
  onTitleTap: () => void;
  onTitleLongPress: () => void;
}

export function FootballTheme({ onTitleTap, onTitleLongPress }: Props) {
  const [matches, setMatches] = useState(INITIAL_MATCHES);

  useEffect(() => {
    const interval = setInterval(() => {
      setMatches(ms =>
        ms.map(m => {
          if (m.status === 'ft') return m;
          const newMin = Math.min(m.minute + 1, 90);
          return { ...m, minute: newMin, status: newMin >= 90 ? 'ft' : 'live' };
        })
      );
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const longPressTimer = { current: 0 as ReturnType<typeof setTimeout> };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="bg-green-800 px-4 pt-12 pb-4">
        <h1
          className="text-xl font-bold tracking-wide cursor-default select-none"
          onClick={onTitleTap}
          onPointerDown={() => { longPressTimer.current = setTimeout(onTitleLongPress, 2000); }}
          onPointerUp={() => clearTimeout(longPressTimer.current)}
          onPointerLeave={() => clearTimeout(longPressTimer.current)}
        >
          ⚽ ScoreBoard
        </h1>
        <p className="text-green-200 text-xs mt-1">Premier League · Live</p>
      </div>

      <div className="divide-y divide-gray-800">
        {matches.map((m, i) => (
          <div key={i} className="flex items-center px-4 py-3">
            <div className="flex-1 text-right text-sm">{m.home}</div>
            <div className="mx-4 text-center min-w-[72px]">
              <div className="text-lg font-bold">{m.homeScore} – {m.awayScore}</div>
              {m.status === 'live' ? (
                <div className="text-xs text-red-400 font-medium">{m.minute}'</div>
              ) : (
                <div className="text-xs text-gray-400">FT</div>
              )}
            </div>
            <div className="flex-1 text-sm">{m.away}</div>
          </div>
        ))}
      </div>

      <div className="px-4 py-6 text-gray-600 text-xs text-center">
        Last updated just now
      </div>
    </div>
  );
}
