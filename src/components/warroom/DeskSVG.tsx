import { VisualState } from './AgentAccents';

interface DeskSVGProps {
  accent: string;
  state: VisualState;
  personality: string;
  name: string;
}

export function DeskSVG({ accent, state, personality, name }: DeskSVGProps) {
  const isOccupied = state !== 'offline' && state !== 'idle';
  const isActive = state === 'coding';
  const isBuilding = state === 'building';
  const isDeploying = state === 'deploying';
  const isError = state === 'error';
  const isDark = state === 'offline';

  // Monitor screen color
  const screenColor = isError ? '#EF4444' : isDeploying ? '#0EA5E9' : isBuilding ? '#F59E0B' : isActive ? '#0EA5E9' : '#94A3B8';
  const screenOpacity = isDark ? 0.05 : isOccupied ? 0.2 : 0.08;
  const ambientColor = isError ? '#EF4444' : isActive ? '#10B981' : isBuilding ? '#F59E0B' : isDeploying ? '#0EA5E9' : 'transparent';

  return (
    <svg viewBox="0 0 180 160" className="w-full h-full">
      {/* Ambient desk glow */}
      {isOccupied && (
        <ellipse cx="90" cy="140" rx="80" ry="15" fill={ambientColor} opacity="0.06">
          {(isActive || isError) && <animate attributeName="opacity" values="0.04;0.08;0.04" dur={isError ? '1s' : '3s'} repeatCount="indefinite" />}
        </ellipse>
      )}

      {/* Desk surface */}
      <rect x="15" y="110" width="150" height="8" rx="3" fill="hsl(214, 18%, 89%)" className="dark:fill-[hsl(215,20%,18%)]" />
      <rect x="20" y="118" width="6" height="22" rx="2" fill="hsl(214, 18%, 85%)" className="dark:fill-[hsl(215,20%,16%)]" />
      <rect x="154" y="118" width="6" height="22" rx="2" fill="hsl(214, 18%, 85%)" className="dark:fill-[hsl(215,20%,16%)]" />

      {/* Monitor stand */}
      <rect x="78" y="100" width="24" height="10" rx="2" fill="hsl(214, 18%, 85%)" className="dark:fill-[hsl(215,20%,20%)]" />
      <rect x="85" y="95" width="10" height="5" rx="1" fill="hsl(214, 18%, 82%)" className="dark:fill-[hsl(215,20%,22%)]" />

      {/* Monitor frame */}
      <rect x="30" y="30" width="120" height="65" rx="4" fill={isDark ? 'hsl(215, 20%, 92%)' : 'hsl(210, 20%, 96%)'} stroke="hsl(214, 18%, 85%)" strokeWidth="1.5" className={isDark ? 'dark:fill-[hsl(215,20%,12%)] dark:stroke-[hsl(215,20%,16%)]' : 'dark:fill-[hsl(215,25%,14%)] dark:stroke-[hsl(215,20%,20%)]'} />

      {/* Monitor screen */}
      <rect x="34" y="34" width="112" height="57" rx="2" fill={screenColor} opacity={screenOpacity} />

      {/* Active: code lines */}
      {isActive && (
        <g opacity="0.6">
          <rect x="42" y="42" width="35" height="2" rx="1" fill={accent} opacity="0.4" />
          <rect x="42" y="48" width="55" height="2" rx="1" fill="hsl(215,14%,47%)" opacity="0.2" />
          <rect x="42" y="54" width="28" height="2" rx="1" fill={accent} opacity="0.3" />
          <rect x="42" y="60" width="48" height="2" rx="1" fill="hsl(215,14%,47%)" opacity="0.2" />
          <rect x="42" y="66" width="40" height="2" rx="1" fill={accent} opacity="0.35" />
          <rect x="42" y="72" width="52" height="2" rx="1" fill="hsl(215,14%,47%)" opacity="0.15" />
          <rect x="42" y="78" width="30" height="2" rx="1" fill={accent} opacity="0.25" />
          {/* Blinking cursor */}
          <rect x="100" y="60" width="8" height="2" rx="1" fill={accent} opacity="0.9">
            <animate attributeName="opacity" values="0.9;0.1;0.9" dur="1s" repeatCount="indefinite" />
          </rect>
        </g>
      )}

      {/* Building: progress bar */}
      {isBuilding && (
        <g>
          <text x="90" y="52" textAnchor="middle" fill="#F59E0B" fontSize="7" fontFamily="monospace" opacity="0.6">BUILDING...</text>
          <rect x="50" y="58" width="80" height="5" rx="2.5" fill="hsl(214,18%,89%)" opacity="0.3" />
          <rect x="50" y="58" rx="2.5" height="5" fill="#F59E0B" opacity="0.5">
            <animate attributeName="width" values="15;65;15" dur="2.5s" repeatCount="indefinite" />
          </rect>
          {/* Spinning dots */}
          <circle cx="90" cy="74" r="1.5" fill="#F59E0B" opacity="0.4">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="0.8s" repeatCount="indefinite" />
          </circle>
        </g>
      )}

      {/* Deploying: rocket / upload */}
      {isDeploying && (
        <g>
          <text x="90" y="48" textAnchor="middle" fill="#0EA5E9" fontSize="7" fontFamily="monospace" opacity="0.7">DEPLOYING</text>
          {/* Upload arrow */}
          <path d="M90,80 L90,58" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" opacity="0.5">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.5s" repeatCount="indefinite" />
          </path>
          <path d="M84,64 L90,56 L96,64" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.5">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.5s" repeatCount="indefinite" />
          </path>
          {/* Progress ring */}
          <circle cx="90" cy="68" r="14" fill="none" stroke="#0EA5E9" strokeWidth="1" opacity="0.15" />
          <circle cx="90" cy="68" r="14" fill="none" stroke="#0EA5E9" strokeWidth="1.5" strokeDasharray="88" opacity="0.4">
            <animate attributeName="stroke-dashoffset" values="88;0" dur="3s" repeatCount="indefinite" />
          </circle>
        </g>
      )}

      {/* Error: warning */}
      {isError && (
        <g>
          <rect x="34" y="34" width="112" height="57" rx="2" fill="#EF4444" opacity="0.08">
            <animate attributeName="opacity" values="0.05;0.12;0.05" dur="0.8s" repeatCount="indefinite" />
          </rect>
          <polygon points="90,44 102,64 78,64" fill="none" stroke="#EF4444" strokeWidth="1.5" opacity="0.7" />
          <text x="90" y="61" textAnchor="middle" fill="#EF4444" fontSize="10" fontWeight="bold" opacity="0.8">!</text>
          <text x="90" y="78" textAnchor="middle" fill="#EF4444" fontSize="6" fontFamily="monospace" opacity="0.5">ERROR</text>
          {/* Smoke / fire wisps */}
          <path d="M55,36 C52,28 58,24 55,18" fill="none" stroke="#94A3B8" strokeWidth="0.8" opacity="0.2">
            <animate attributeName="opacity" values="0;0.3;0" dur="2s" repeatCount="indefinite" />
            <animate attributeName="d" values="M55,36 C52,28 58,24 55,18;M55,36 C58,28 52,24 55,18;M55,36 C52,28 58,24 55,18" dur="3s" repeatCount="indefinite" />
          </path>
        </g>
      )}

      {/* Offline: ZZZ */}
      {isDark && (
        <g opacity="0.3">
          <text x="90" y="55" textAnchor="middle" fill="hsl(215,14%,47%)" fontSize="10" fontFamily="monospace">
            <tspan>z</tspan>
          </text>
          <text x="98" y="47" textAnchor="middle" fill="hsl(215,14%,47%)" fontSize="8" fontFamily="monospace">
            <tspan>z</tspan>
          </text>
          <text x="104" y="41" textAnchor="middle" fill="hsl(215,14%,47%)" fontSize="6" fontFamily="monospace">
            <tspan>z</tspan>
          </text>
        </g>
      )}

      {/* Desk lamp */}
      {isOccupied ? (
        <g>
          <rect x="142" y="88" width="3" height="22" rx="1" fill="hsl(214,18%,82%)" className="dark:fill-[hsl(215,20%,25%)]" />
          <ellipse cx="148" cy="86" rx="10" ry="4" fill={accent} opacity="0.3" />
          <ellipse cx="148" cy="106" rx="6" ry="2" fill={accent} opacity="0.06" />
        </g>
      ) : (
        <g opacity="0.4">
          <rect x="142" y="88" width="3" height="22" rx="1" fill="hsl(214,18%,85%)" className="dark:fill-[hsl(215,20%,20%)]" />
          <ellipse cx="148" cy="86" rx="10" ry="4" fill="hsl(214,18%,85%)" opacity="0.3" className="dark:fill-[hsl(215,20%,20%)]" />
        </g>
      )}

      {/* Keyboard */}
      <rect x="55" y="116" width="70" height="12" rx="2" fill="hsl(214,18%,91%)" className="dark:fill-[hsl(215,20%,16%)]" stroke="hsl(214,18%,87%)" strokeWidth="0.5" />
      {isActive && (
        <g>
          <rect x="72" y="120" width="5" height="4" rx="1" fill={accent} opacity="0.3">
            <animate attributeName="opacity" values="0.2;0.5;0.2" dur="0.15s" repeatCount="indefinite" />
          </rect>
          <rect x="82" y="120" width="5" height="4" rx="1" fill={accent} opacity="0.2">
            <animate attributeName="opacity" values="0.1;0.4;0.1" dur="0.2s" repeatCount="indefinite" />
          </rect>
        </g>
      )}

      {/* Chair */}
      {state === 'idle' || state === 'offline' ? (
        // Chair pushed away
        <rect x="70" y="142" width="40" height="12" rx="6" fill="hsl(214,18%,87%)" className="dark:fill-[hsl(215,20%,18%)]" opacity="0.5" />
      ) : (
        // Chair with agent sitting
        <rect x="68" y="135" width="44" height="14" rx="7" fill="hsl(214,18%,85%)" className="dark:fill-[hsl(215,20%,20%)]" />
      )}

      {/* Coffee mug */}
      <g transform="translate(28, 100)">
        <ellipse cx="8" cy="0" rx="6" ry="2" fill="hsl(214,18%,87%)" className="dark:fill-[hsl(215,20%,22%)]" />
        <rect x="2" y="0" width="12" height="10" rx="2" fill="hsl(214,18%,87%)" className="dark:fill-[hsl(215,20%,22%)]" />
        {isActive && (
          <>
            <path d="M5,-4 C5,-8 7,-10 7,-14" fill="none" stroke="hsl(215,14%,67%)" strokeWidth="0.5" opacity="0.2">
              <animate attributeName="opacity" values="0.1;0.3;0.1" dur="2.5s" repeatCount="indefinite" />
            </path>
            <path d="M9,-3 C9,-7 11,-9 11,-13" fill="none" stroke="hsl(215,14%,67%)" strokeWidth="0.5" opacity="0.15">
              <animate attributeName="opacity" values="0.05;0.25;0.05" dur="3s" repeatCount="indefinite" />
            </path>
          </>
        )}
        {isError && (
          // Spilled coffee
          <ellipse cx="18" cy="8" rx="8" ry="3" fill="#92400E" opacity="0.15" />
        )}
      </g>

      {/* Personality items */}
      {personality === 'plant' && (
        <g transform="translate(148, 96)">
          <rect x="0" y="4" width="10" height="8" rx="1.5" fill="hsl(214,18%,82%)" className="dark:fill-[hsl(215,20%,22%)]" />
          <circle cx="5" cy="0" r="5" fill="#10B981" opacity="0.5">
            {isOccupied && <animate attributeName="r" values="5;5.3;5" dur="4s" repeatCount="indefinite" />}
          </circle>
          <circle cx="2" cy="2" r="3" fill="#059669" opacity="0.4" />
        </g>
      )}
      {personality === 'sticky-notes' && (
        <g>
          <rect x="12" y="34" width="12" height="10" rx="1" fill="#FBBF24" opacity="0.3" transform="rotate(-5 18 39)" />
          <rect x="14" y="50" width="12" height="10" rx="1" fill="#0EA5E9" opacity="0.2" transform="rotate(3 20 55)" />
          <rect x="10" y="64" width="12" height="10" rx="1" fill="#EC4899" opacity="0.2" transform="rotate(-2 16 69)" />
        </g>
      )}
      {personality === 'dual-monitor' && (
        <g>
          <rect x="155" y="44" width="18" height="30" rx="2" fill="hsl(210,20%,96%)" className="dark:fill-[hsl(215,25%,14%)]" stroke="hsl(214,18%,85%)" strokeWidth="1" />
          <rect x="157" y="46" width="14" height="26" rx="1" fill={screenColor} opacity={screenOpacity * 0.5} />
        </g>
      )}
      {personality === 'figurines' && (
        <g transform="translate(155, 100)">
          <circle cx="4" cy="-2" r="3" fill="#A855F7" opacity="0.35" />
          <rect x="2" y="1" width="4" height="5" rx="1" fill="#A855F7" opacity="0.25" />
        </g>
      )}
      {personality === 'coffee-addict' && (
        <g transform="translate(148, 104)">
          <rect x="0" y="0" width="8" height="5" rx="1" fill="#059669" opacity="0.2" />
          <rect x="10" y="0" width="8" height="5" rx="1" fill="#EF4444" opacity="0.2" />
        </g>
      )}

      {/* Nameplate */}
      <rect x="60" y="108" width="60" height="4" rx="1" fill={accent} opacity="0.15" />
      <text x="90" y="111.5" textAnchor="middle" fill={accent} fontSize="3.5" fontFamily="monospace" fontWeight="bold" opacity="0.6">{name}</text>

      {/* Agent character (only if at desk) */}
      {isOccupied && (
        <g transform="translate(90, 130)">
          {/* Head */}
          <circle cx="0" cy="-8" r="6" fill={accent} opacity="0.25" />
          <circle cx="0" cy="-8" r="5" fill={accent} opacity="0.15" />
          {/* Body */}
          <rect x="-8" y="-2" width="16" height="10" rx="4" fill={accent} opacity="0.2" />
          {/* Arms */}
          {isDeploying ? (
            // One hand on monitor
            <line x1="8" y1="2" x2="20" y2="-20" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.2" />
          ) : isBuilding ? (
            // Arms crossed / behind head
            <>
              <line x1="-8" y1="0" x2="-14" y2="-6" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.15" />
              <line x1="8" y1="0" x2="14" y2="-6" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.15" />
            </>
          ) : (
            // Typing pose
            <>
              <line x1="-8" y1="2" x2="-18" y2="8" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.15" />
              <line x1="8" y1="2" x2="18" y2="8" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.15" />
            </>
          )}
        </g>
      )}
    </svg>
  );
}
