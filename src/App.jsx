import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Bell,
  Gamepad2,
  Search,
  Settings,
  UserRound,
  Wifi,
  BatteryFull,
  Power,
  Trophy,
  Users,
  Download,
  Library,
  ShoppingBag,
  Headphones,
  Volume2,
  Mic,
  Monitor,
  SlidersHorizontal,
  CircleHelp,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Sparkles,
  Globe2,
  ShieldCheck,
  Clock3,
  HardDrive,
  Moon,
  Sun,
  Palette,
  MessageCircle,
  Plus,
  LayoutGrid,
  Home,
  Radio,
  Cloud,
  Lock,
  Gamepad,
  Music2,
  Film,
  Activity,
  Star,
  Zap,
  Rocket,
  Cpu,
  Languages,
  Accessibility,
  Network,
  Info,
  Keyboard,
  RefreshCw,
  Trash2,
  Eye,
} from 'lucide-react';

const games = [
  {
    id: 'stellar',
    title: 'Stellar Divide',
    subtitle: 'Explore the silent edge of the galaxy.',
    tag: 'PS6 Exclusive',
    color: '#6ea8ff',
    cover: 'linear-gradient(150deg,#15274d,#395ec2 48%,#b3d9ff)',
    background:
      'radial-gradient(circle at 72% 30%,rgba(110,168,255,.55),transparent 24%),linear-gradient(120deg,#02060c,#07172b 48%,#183e6f)',
    progress: 72,
  },
  {
    id: 'ghost',
    title: 'Ghostline',
    subtitle: 'A neon city. No second chances.',
    tag: 'Continue',
    color: '#ff69d4',
    cover: 'linear-gradient(145deg,#320b42,#8d1e8b 47%,#ff71d8)',
    background:
      'radial-gradient(circle at 76% 34%,rgba(255,88,218,.45),transparent 23%),linear-gradient(120deg,#0b0412,#24072f 50%,#4b124c)',
    progress: 43,
  },
  {
    id: 'horizon',
    title: 'Horizon: New Dawn',
    subtitle: 'Rebuild what the world forgot.',
    tag: 'Recently played',
    color: '#66e5c4',
    cover: 'linear-gradient(150deg,#0d3734,#1e7d71 48%,#7cf8cd)',
    background:
      'radial-gradient(circle at 76% 28%,rgba(78,234,187,.38),transparent 26%),linear-gradient(120deg,#02110f,#07312a 55%,#0f5e52)',
    progress: 88,
  },
  {
    id: 'racer',
    title: 'Velocity X',
    subtitle: 'Built for impossible corners.',
    tag: 'Installed',
    color: '#ff9a5c',
    cover: 'linear-gradient(145deg,#4b1910,#c1451f 47%,#ffb36d)',
    background:
      'radial-gradient(circle at 75% 25%,rgba(255,141,86,.42),transparent 22%),linear-gradient(120deg,#120503,#44150d 52%,#7e2a17)',
    progress: 20,
  },
  {
    id: 'myth',
    title: 'Mythbreaker',
    subtitle: 'Every legend hides a machine.',
    tag: 'New',
    color: '#d2a8ff',
    cover: 'linear-gradient(145deg,#211239,#65459a 48%,#d2a8ff)',
    background:
      'radial-gradient(circle at 73% 32%,rgba(191,143,255,.45),transparent 25%),linear-gradient(120deg,#090410,#1c1130 52%,#3a255a)',
    progress: 0,
  },
];

const initialFriends = [
  { name: 'Nova', game: 'Stellar Divide', status: 'In game' },
  { name: 'Kai', game: 'Ghostline', status: 'Joinable' },
  { name: 'Mika', game: 'Party', status: 'Online' },
  { name: 'Alex', game: 'Home', status: 'Online' },
];

const navItems = [
  ['home', 'Home', Home],
  ['library', 'Game Library', Library],
  ['store', 'Store', ShoppingBag],
  ['social', 'Game Base', Users],
  ['media', 'Media', Film],
];

const settingSections = [
  ['system', 'System', Cpu],
  ['display', 'Screen and Video', Monitor],
  ['sound', 'Sound', Volume2],
  ['network', 'Network', Network],
  ['users', 'Users and Accounts', UserRound],
  ['storage', 'Storage', HardDrive],
  ['accessibility', 'Accessibility', Accessibility],
  ['language', 'Language', Languages],
  ['about', 'About PS6OS', Info],
];

function App() {
  const [booting, setBooting] = useState(true);
  const [activeNav, setActiveNav] = useState('home');
  const [selectedGame, setSelectedGame] = useState(0);
  const [controlOpen, setControlOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [powerOpen, setPowerOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [volume, setVolume] = useState(74);
  const [micMuted, setMicMuted] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [settingSection, setSettingSection] = useState('system');
  const [friends, setFriends] = useState(initialFriends);
  const searchRef = useRef(null);

  const game = games[selectedGame];

  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), 2100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setControlOpen(false);
        setNotificationsOpen(false);
        setProfileOpen(false);
        setSettingsOpen(false);
        setSearchOpen(false);
        setPowerOpen(false);
      }
      if (event.key === 'ArrowRight' && !settingsOpen) {
        setSelectedGame((i) => Math.min(games.length - 1, i + 1));
      }
      if (event.key === 'ArrowLeft' && !settingsOpen) {
        setSelectedGame((i) => Math.max(0, i - 1));
      }
      if (event.key.toLowerCase() === 'q') setControlOpen((v) => !v);
      if (event.key === '/') {
        event.preventDefault();
        setSearchOpen(true);
        setTimeout(() => searchRef.current?.focus(), 50);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [settingsOpen]);

  const closePanels = () => {
    setControlOpen(false);
    setNotificationsOpen(false);
    setProfileOpen(false);
    setSearchOpen(false);
    setPowerOpen(false);
  };

  const notify = (message) => {
    setToast(message);
    setTimeout(() => setToast(''), 2200);
  };

  if (booting) return <BootScreen />;

  return (
    <div
      className={`app ${theme === 'light' ? 'light-mode' : ''}`}
      style={{ '--accent': game.color, backgroundImage: game.background }}
    >
      <div className="grain" />
      <div className="ambient-orb orb-a" />
      <div className="ambient-orb orb-b" />

      <header className="topbar">
        <button className="brand" onClick={() => setActiveNav('home')} aria-label="PS6OS home">
          <span className="brand-mark">P6</span>
          <span>PS6OS</span>
        </button>

        <nav className="main-nav">
          {navItems.map(([id, label, Icon]) => (
            <button
              key={id}
              className={activeNav === id ? 'nav-item active' : 'nav-item'}
              onClick={() => {
                closePanels();
                setActiveNav(id);
              }}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="top-actions">
          <button onClick={() => setSearchOpen(true)} aria-label="Search"><Search /></button>
          <button onClick={() => setNotificationsOpen(true)} aria-label="Notifications"><Bell /><i className="dot" /></button>
          <button onClick={() => setSettingsOpen(true)} aria-label="Settings"><Settings /></button>
          <button className="avatar" onClick={() => setProfileOpen(true)} aria-label="Profile">L</button>
          <div className="status-strip">
            <Wifi size={18} />
            <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <BatteryFull size={20} />
          </div>
        </div>
      </header>

      <main className="content">
        {activeNav === 'home' && (
          <>
            <section className="hero">
              <div className="hero-copy">
                <div className="eyebrow"><Sparkles size={16} /> {game.tag}</div>
                <h1>{game.title}</h1>
                <p>{game.subtitle}</p>
                <div className="hero-actions">
                  <button className="primary" onClick={() => notify(`Launching ${game.title}…`)}><Play size={18} fill="currentColor" /> Play</button>
                  <button className="secondary" onClick={() => notify('Game hub opened')}>View Game Hub</button>
                  <button className="icon-button" onClick={() => notify('More options opened')}>•••</button>
                </div>
                {game.progress > 0 && (
                  <div className="progress-wrap">
                    <div className="progress-meta"><span>Story progress</span><strong>{game.progress}%</strong></div>
                    <div className="progress-track"><span style={{ width: `${game.progress}%` }} /></div>
                  </div>
                )}
              </div>

              <div className="hero-stats">
                <article>
                  <Trophy />
                  <div><strong>37%</strong><span>Trophies</span></div>
                </article>
                <article>
                  <Clock3 />
                  <div><strong>18h</strong><span>Played</span></div>
                </article>
                <article>
                  <Cloud />
                  <div><strong>Synced</strong><span>Cloud save</span></div>
                </article>
              </div>
            </section>

            <section className="rail-section">
              <div className="section-heading">
                <div>
                  <span className="kicker">Your games</span>
                  <h2>Jump back in</h2>
                </div>
                <div className="rail-controls">
                  <button onClick={() => setSelectedGame((i) => Math.max(0, i - 1))}><ChevronLeft /></button>
                  <button onClick={() => setSelectedGame((i) => Math.min(games.length - 1, i + 1))}><ChevronRight /></button>
                </div>
              </div>

              <div className="game-rail">
                {games.map((item, index) => (
                  <button
                    key={item.id}
                    className={index === selectedGame ? 'game-card selected' : 'game-card'}
                    onMouseEnter={() => setSelectedGame(index)}
                    onFocus={() => setSelectedGame(index)}
                    onClick={() => setSelectedGame(index)}
                    style={{ background: item.cover }}
                  >
                    <div className="game-card-shine" />
                    <span className="card-tag">{item.tag}</span>
                    <div className="card-bottom">
                      <strong>{item.title}</strong>
                      <small>{item.progress ? `${item.progress}% complete` : 'Ready to play'}</small>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <section className="dashboard-grid">
              <article className="glass-card activity-card">
                <div className="card-head"><div><span className="kicker">Activity</span><h3>Continue your journey</h3></div><Activity /></div>
                <div className="activity-row">
                  <div className="activity-icon"><Rocket /></div>
                  <div className="activity-copy"><strong>Into the Rift</strong><span>Reach the orbital gate</span></div>
                  <button onClick={() => notify('Activity resumed')}>Resume</button>
                </div>
                <div className="activity-row">
                  <div className="activity-icon"><Star /></div>
                  <div className="activity-copy"><strong>Hidden objective</strong><span>2 of 5 anomalies discovered</span></div>
                  <span className="mini-progress">40%</span>
                </div>
              </article>

              <article className="glass-card social-card">
                <div className="card-head"><div><span className="kicker">Game Base</span><h3>Friends online</h3></div><Users /></div>
                <div className="friends">
                  {friends.slice(0, 3).map((friend) => (
                    <div className="friend-row" key={friend.name}>
                      <div className="friend-avatar">{friend.name[0]}</div>
                      <div><strong>{friend.name}</strong><span>{friend.game} · {friend.status}</span></div>
                      <button onClick={() => notify(`Party invite sent to ${friend.name}`)}><Plus size={17} /></button>
                    </div>
                  ))}
                </div>
              </article>

              <article className="glass-card discover-card">
                <div className="card-head"><div><span className="kicker">Discover</span><h3>For you</h3></div><Sparkles /></div>
                <div className="discover-banner">
                  <div><span>Featured event</span><strong>Interstellar Week</strong><button onClick={() => notify('Event page opened')}>Explore</button></div>
                </div>
              </article>
            </section>
          </>
        )}

        {activeNav === 'library' && <LibraryPage notify={notify} />}
        {activeNav === 'store' && <StorePage notify={notify} />}
        {activeNav === 'social' && <SocialPage friends={friends} notify={notify} />}
        {activeNav === 'media' && <MediaPage notify={notify} />}
      </main>

      <button className="control-hint" onClick={() => setControlOpen(true)}>
        <Gamepad2 size={18} /> Control Center <kbd>Q</kbd>
      </button>

      {controlOpen && (
        <ControlCenter
          volume={volume}
          setVolume={setVolume}
          micMuted={micMuted}
          setMicMuted={setMicMuted}
          onClose={() => setControlOpen(false)}
          notify={notify}
          onPower={() => setPowerOpen(true)}
        />
      )}
      {notificationsOpen && <Notifications onClose={() => setNotificationsOpen(false)} notify={notify} />}
      {profileOpen && <ProfilePanel onClose={() => setProfileOpen(false)} notify={notify} />}
      {searchOpen && <SearchOverlay inputRef={searchRef} onClose={() => setSearchOpen(false)} notify={notify} />}
      {settingsOpen && (
        <SettingsModal
          section={settingSection}
          setSection={setSettingSection}
          theme={theme}
          setTheme={setTheme}
          onClose={() => setSettingsOpen(false)}
          notify={notify}
        />
      )}
      {powerOpen && <PowerModal onClose={() => setPowerOpen(false)} notify={notify} />}

      {toast && <div className="toast"><Check size={18} /> {toast}</div>}
    </div>
  );
}

function BootScreen() {
  return (
    <div className="boot-screen">
      <div className="boot-symbol"><span>6</span></div>
      <div className="boot-name">PS6OS</div>
      <div className="boot-line"><i /></div>
      <span className="boot-copy">Interactive concept system</span>
    </div>
  );
}

function LibraryPage({ notify }) {
  return (
    <section className="page-shell">
      <div className="page-title"><div><span className="kicker">Collection</span><h1>Game Library</h1></div><LayoutGrid /></div>
      <div className="library-toolbar">
        <button className="chip active">Installed</button><button className="chip">Your collection</button><button className="chip">PlayStation Plus</button><button className="chip">Sort: Recent</button>
      </div>
      <div className="library-grid">
        {[...games, ...games.slice(0, 3)].map((game, i) => (
          <button className="library-card" key={`${game.id}-${i}`} onClick={() => notify(`${game.title} selected`)}>
            <div className="library-cover" style={{ background: game.cover }}><span>{game.tag}</span></div>
            <strong>{game.title}</strong>
            <small>{i % 2 ? 'Installed · 82.4 GB' : 'Cloud available'}</small>
          </button>
        ))}
      </div>
    </section>
  );
}

function StorePage({ notify }) {
  return (
    <section className="page-shell">
      <div className="page-title"><div><span className="kicker">PlayStation Store</span><h1>Discover something new</h1></div><ShoppingBag /></div>
      <div className="store-hero">
        <div><span>Autumn showcase</span><h2>Next-gen worlds, built for PS6OS.</h2><p>Explore new releases, upcoming experiences and special editions.</p><button className="primary" onClick={() => notify('Showcase opened')}>View showcase</button></div>
      </div>
      <div className="store-row">
        {['New releases', 'PS6 exclusives', 'Deals', 'Coming soon'].map((label, i) => (
          <button key={label} onClick={() => notify(`${label} opened`)}><span className="store-art">{['✦','⬡','%','◌'][i]}</span><strong>{label}</strong><small>Explore collection</small></button>
        ))}
      </div>
    </section>
  );
}

function SocialPage({ friends, notify }) {
  return (
    <section className="page-shell">
      <div className="page-title"><div><span className="kicker">Game Base</span><h1>Friends & Parties</h1></div><Users /></div>
      <div className="social-layout">
        <article className="glass-card">
          <div className="card-head"><div><span className="kicker">Online now</span><h3>{friends.length} friends</h3></div><Radio /></div>
          {friends.map((friend) => (
            <div className="friend-row big" key={friend.name}>
              <div className="friend-avatar">{friend.name[0]}</div>
              <div><strong>{friend.name}</strong><span>{friend.game} · {friend.status}</span></div>
              <button onClick={() => notify(`Invite sent to ${friend.name}`)}>Invite</button>
            </div>
          ))}
        </article>
        <article className="glass-card party-card">
          <div className="party-visual"><Headphones /></div>
          <span className="kicker">Voice party</span><h2>Create a party</h2><p>Jump into voice chat, share your screen and start playing together.</p>
          <button className="primary" onClick={() => notify('New party created')}>Create party</button>
        </article>
      </div>
    </section>
  );
}

function MediaPage({ notify }) {
  return (
    <section className="page-shell">
      <div className="page-title"><div><span className="kicker">Entertainment</span><h1>Media</h1></div><Film /></div>
      <div className="media-grid">
        {[
          ['Music', Music2, 'Your gaming soundtrack'],
          ['Movies & TV', Film, 'Continue watching'],
          ['Live', Radio, 'Streams and broadcasts'],
          ['Capture Gallery', Eye, 'Screenshots and clips'],
        ].map(([label, Icon, text]) => (
          <button className="media-tile" key={label} onClick={() => notify(`${label} opened`)}>
            <Icon size={38}/><strong>{label}</strong><span>{text}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function ControlCenter({ volume, setVolume, micMuted, setMicMuted, onClose, notify, onPower }) {
  return (
    <div className="panel-backdrop" onMouseDown={onClose}>
      <section className="control-center" onMouseDown={(e) => e.stopPropagation()}>
        <div className="panel-grab" />
        <div className="control-top">
          <div><span className="kicker">Quick access</span><h2>Control Center</h2></div>
          <button onClick={onClose}><X /></button>
        </div>
        <div className="quick-grid">
          {[
            ['Switcher', LayoutGrid],
            ['Notifications', Bell],
            ['Downloads', Download],
            ['Game Base', Users],
            ['Music', Music2],
            ['Accessories', Gamepad],
          ].map(([label, Icon]) => (
            <button key={label} onClick={() => notify(`${label} opened`)}><Icon /><span>{label}</span></button>
          ))}
        </div>
        <div className="sound-row">
          <Volume2 />
          <input aria-label="Volume" type="range" min="0" max="100" value={volume} onChange={(e) => setVolume(Number(e.target.value))} />
          <strong>{volume}</strong>
          <button className={micMuted ? 'toggle active' : 'toggle'} onClick={() => setMicMuted((v) => !v)}><Mic size={18}/>{micMuted ? 'Muted' : 'Mic'}</button>
        </div>
        <div className="control-bottom">
          <div><Wifi/><span>Internet</span><strong>Connected</strong></div>
          <div><Gamepad2/><span>Controller</span><strong>87%</strong></div>
          <button onClick={onPower}><Power/><span>Power</span></button>
        </div>
      </section>
    </div>
  );
}

function Notifications({ onClose, notify }) {
  const rows = [
    ['Download complete', 'Stellar Divide update installed', Download],
    ['Trophy earned', 'Into the Unknown · Silver', Trophy],
    ['Party invitation', 'Nova invited you to a voice chat', Users],
  ];
  return (
    <aside className="side-panel">
      <div className="side-head"><div><span className="kicker">Recent</span><h2>Notifications</h2></div><button onClick={onClose}><X/></button></div>
      {rows.map(([title, text, Icon]) => <button className="notification" key={title} onClick={() => notify(title)}><Icon/><div><strong>{title}</strong><span>{text}</span></div></button>)}
      <button className="text-button" onClick={() => notify('Notifications cleared')}>Clear all</button>
    </aside>
  );
}

function ProfilePanel({ onClose, notify }) {
  return (
    <aside className="side-panel profile-panel">
      <div className="side-head"><div><span className="kicker">Account</span><h2>Levi</h2></div><button onClick={onClose}><X/></button></div>
      <div className="profile-hero"><div className="profile-avatar">L</div><strong>Levi</strong><span>Online · PS6OS</span></div>
      <div className="profile-stats"><div><strong>128</strong><span>Level</span></div><div><strong>412</strong><span>Trophies</span></div><div><strong>36</strong><span>Games</span></div></div>
      {['Profile', 'Trophies', 'Online status', 'Switch user', 'Log out'].map((x) => <button className="menu-line" key={x} onClick={() => notify(`${x} selected`)}>{x}<ChevronRight size={17}/></button>)}
    </aside>
  );
}

function SearchOverlay({ inputRef, onClose, notify }) {
  const [query, setQuery] = useState('');
  const results = useMemo(() => games.filter((g) => g.title.toLowerCase().includes(query.toLowerCase())), [query]);
  return (
    <div className="search-overlay">
      <div className="search-box">
        <Search />
        <input ref={inputRef} autoFocus placeholder="Search games, friends, settings…" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button onClick={onClose}><X /></button>
      </div>
      <div className="search-content">
        <span className="kicker">{query ? 'Results' : 'Suggested'}</span>
        {(query ? results : games.slice(0, 4)).map((g) => (
          <button className="search-result" key={g.id} onClick={() => notify(`${g.title} opened`)}>
            <span style={{ background: g.cover }} /><div><strong>{g.title}</strong><small>{g.tag}</small></div><ChevronRight/>
          </button>
        ))}
      </div>
    </div>
  );
}

function SettingsModal({ section, setSection, theme, setTheme, onClose, notify }) {
  return (
    <div className="settings-shell">
      <header><button className="back-button" onClick={onClose}><ChevronLeft/> Back</button><div><span className="kicker">PS6OS</span><h1>Settings</h1></div><button onClick={onClose}><X/></button></header>
      <div className="settings-layout">
        <nav className="settings-nav">
          {settingSections.map(([id, label, Icon]) => <button key={id} className={section === id ? 'active' : ''} onClick={() => setSection(id)}><Icon/><span>{label}</span><ChevronRight/></button>)}
        </nav>
        <section className="settings-content">
          <SettingsContent section={section} theme={theme} setTheme={setTheme} notify={notify}/>
        </section>
      </div>
    </div>
  );
}

function SettingsContent({ section, theme, setTheme, notify }) {
  const heading = settingSections.find((x) => x[0] === section)?.[1] || 'Settings';
  return (
    <div className="settings-page">
      <span className="kicker">Settings</span><h2>{heading}</h2>
      {section === 'system' && <>
        <SettingLine icon={RefreshCw} title="System Software" text="PS6OS 0.1 Concept Build" action="Up to date" onClick={() => notify('System is up to date')} />
        <SettingLine icon={Clock3} title="Date and Time" text="Set automatically" action="Auto" />
        <SettingLine icon={Keyboard} title="Keyboard" text="Input languages and repeat speed" action="Configure" />
        <SettingLine icon={Moon} title="Power Saving" text="Rest mode and inactivity settings" action="Open" />
      </>}
      {section === 'display' && <>
        <SettingLine icon={Monitor} title="Resolution" text="3840 × 2160" action="Automatic" />
        <SettingLine icon={Zap} title="120 Hz Output" text="Enable high refresh rate when supported" action="On" />
        <SettingLine icon={Palette} title="Interface Theme" text="Choose the PS6OS appearance" custom={
          <div className="theme-switch"><button className={theme === 'dark' ? 'active' : ''} onClick={() => setTheme('dark')}><Moon/>Dark</button><button className={theme === 'light' ? 'active' : ''} onClick={() => setTheme('light')}><Sun/>Light</button></div>
        } />
      </>}
      {section === 'sound' && <>
        <SettingLine icon={Volume2} title="Audio Output" text="HDMI Device (TV)" action="Configure" />
        <SettingLine icon={Mic} title="Microphone" text="Wireless Controller Microphone" action="Configure" />
        <SettingLine icon={Headphones} title="3D Audio" text="Personalized spatial audio profile" action="Enabled" />
      </>}
      {section === 'network' && <>
        <SettingLine icon={Wifi} title="Connection Status" text="Connected to PS6OS-Network" action="View" />
        <SettingLine icon={Globe2} title="Internet Connection" text="IPv4 · NAT Type 2" action="Test" />
        <SettingLine icon={ShieldCheck} title="Secure DNS" text="Automatic provider" action="On" />
      </>}
      {section === 'storage' && <>
        <div className="storage-card"><div className="storage-circle">62%</div><div><strong>Console Storage</strong><span>1.24 TB used of 2 TB</span><div className="storage-bar"><i style={{width:'62%'}}/></div></div></div>
        <SettingLine icon={Gamepad} title="Games and Apps" text="934.2 GB" action="Manage" />
        <SettingLine icon={Film} title="Media Gallery" text="82.6 GB" action="Manage" />
        <SettingLine icon={Trash2} title="Free Up Space" text="Review temporary data" action="Review" />
      </>}
      {!['system','display','sound','network','storage'].includes(section) && <>
        <SettingLine icon={UserRound} title={heading} text="Manage options for this section." action="Open" onClick={() => notify(`${heading} option opened`)} />
        <SettingLine icon={Lock} title="Privacy" text="Control sharing and visibility" action="Configure" />
        <SettingLine icon={CircleHelp} title="Help" text="Learn more about these settings" action="View" />
      </>}
    </div>
  );
}

function SettingLine({ icon: Icon, title, text, action, custom, onClick }) {
  return (
    <div className="setting-line" onClick={onClick}>
      <div className="setting-icon"><Icon /></div><div className="setting-copy"><strong>{title}</strong><span>{text}</span></div>
      {custom || <button>{action}<ChevronRight size={16}/></button>}
    </div>
  );
}

function PowerModal({ onClose, notify }) {
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="power-modal" onMouseDown={(e) => e.stopPropagation()}>
        <Power size={42}/><h2>Power</h2><p>Choose what you want PS6OS to do.</p>
        <button onClick={() => notify('Entering rest mode…')}><Moon/>Enter Rest Mode</button>
        <button onClick={() => notify('Restarting PS6OS…')}><RefreshCw/>Restart PS6OS</button>
        <button onClick={() => notify('Power off simulated')}><Power/>Turn Off PS6OS</button>
        <button className="cancel" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default App;
