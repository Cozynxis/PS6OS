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
  Crown,
  Gift,
  Heart,
  UserPlus,
  WifiOff,
  Smartphone,
  Cast,
  Pause,
  CircleDollarSign,
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
  ['plus', 'PlayStation Plus', Crown],
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
  ['notifications', 'Notifications', Bell],
  ['captures', 'Captures and Broadcasts', Eye],
  ['controller', 'Accessories', Gamepad2],
  ['remote', 'Remote Play', Smartphone],
  ['privacy', 'Privacy and Security', ShieldCheck],
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
  const [downloads, setDownloads] = useState([{name:'Ghostline Update 1.8',progress:68},{name:'Stellar Divide: Frontier Pack',progress:24}]);
  const [wishlist, setWishlist] = useState([]);
  const [party, setParty] = useState(['Levi']);
  const [online, setOnline] = useState(true);
  const [controllerBattery, setControllerBattery] = useState(82);
  const [gameHubOpen,setGameHubOpen] = useState(false);
  const [trophiesOpen,setTrophiesOpen] = useState(false);
  const [downloadOpen,setDownloadOpen] = useState(false);
  const [systemApp,setSystemApp] = useState(null);
  const searchRef = useRef(null);

  const game = games[selectedGame];

  useEffect(() => {
    const saved = localStorage.getItem('ps6os-settings');
    if (saved) { try { const x=JSON.parse(saved); if(x.theme)setTheme(x.theme); if(Number.isFinite(x.volume))setVolume(x.volume); if(typeof x.micMuted==='boolean')setMicMuted(x.micMuted); } catch{} }
    const timer = setTimeout(() => setBooting(false), 2100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(()=>{ localStorage.setItem('ps6os-settings',JSON.stringify({theme,volume,micMuted})); },[theme,volume,micMuted]);

  useEffect(()=>{ const id=setInterval(()=>setDownloads(ds=>ds.map(d=>({...d,progress:Math.min(100,d.progress+(d.progress<100?1:0))}))),900); return()=>clearInterval(id); },[]);

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
                  <button className="secondary" onClick={() => setGameHubOpen(true)}>View Game Hub</button>
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
        {activeNav === 'store' && <StorePage notify={notify} wishlist={wishlist} setWishlist={setWishlist} downloads={downloads} setDownloads={setDownloads} />}
        {activeNav === 'social' && <SocialPage friends={friends} notify={notify} party={party} setParty={setParty} />}
        {activeNav === 'media' && <MediaPage notify={notify} />}
        {activeNav === 'plus' && <PlusPage notify={notify} />}
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
          downloads={downloads}
          online={online}
          setOnline={setOnline}
          controllerBattery={controllerBattery}
          party={party}
          openDownloads={()=>{setControlOpen(false);setDownloadOpen(true)}}
          openTrophies={()=>{setControlOpen(false);setTrophiesOpen(true)}}
          openApp={(app)=>{setControlOpen(false);setSystemApp(app)}}
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
      {gameHubOpen && <GameHub game={game} onClose={()=>setGameHubOpen(false)} notify={notify} onTrophies={()=>setTrophiesOpen(true)} />}
      {trophiesOpen && <TrophyCenter onClose={()=>setTrophiesOpen(false)} />}
      {downloadOpen && <DownloadCenter downloads={downloads} setDownloads={setDownloads} onClose={()=>setDownloadOpen(false)} />}
      {systemApp && <SystemApp type={systemApp} onClose={()=>setSystemApp(null)} notify={notify} online={online} setOnline={setOnline} party={party} friends={friends} controllerBattery={controllerBattery} />}

      {toast && <div className="toast"><Check size={18} /> {toast}</div>}
    </div>
  );
}

function SystemApp({type,onClose,notify,online,setOnline,party,friends,controllerBattery}) {
 const meta={
  switcher:['Switcher',LayoutGrid],network:['Network',Wifi],notifications:['Notifications',Bell],party:['Party',Headphones],
  gamebase:['Game Base',Users],music:['Music',Music2],accessories:['Accessories',Gamepad2]
 };
 const [title,Icon]=meta[type]||['System',Settings];
 return <div className="fullscreen-layer system-app"><header><button onClick={onClose}><ChevronLeft/> Control Center</button><span>{title}</span><button onClick={onClose}><X/></button></header><div className="system-app-wrap"><div className="system-app-title"><Icon size={45}/><div><span className="kicker">Control Center</span><h1>{title}</h1></div></div>
 {type==='switcher'&&<div className="switcher-grid">{games.slice(0,4).map((g,i)=><button key={g.id} onClick={()=>notify('Switched to '+g.title)}><div style={{background:g.cover}}/><strong>{g.title}</strong><span>{i===0?'Running':'Recently played'}</span></button>)}</div>}
 {type==='network'&&<div className="system-card-list"><article><Wifi/><div><strong>Internet connection</strong><span>{online?'Connected · NAT Type 2':'Disconnected'}</span></div><button onClick={()=>setOnline(v=>!v)}>{online?'Disconnect':'Connect'}</button></article><article><Globe2/><div><strong>Connection test</strong><span>Download 842 Mbps · Upload 91 Mbps</span></div><button onClick={()=>notify('Connection test complete')}>Test</button></article><article><ShieldCheck/><div><strong>PlayStation Network</strong><span>{online?'All services available':'Offline'}</span></div></article></div>}
 {type==='notifications'&&<div className="system-card-list"><article><Download/><div><strong>Download complete</strong><span>Stellar Divide update installed</span></div><button onClick={()=>notify('Notification dismissed')}>Dismiss</button></article><article><Trophy/><div><strong>Trophy earned</strong><span>Into the Rift · Silver</span></div></article><article><Users/><div><strong>Party invitation</strong><span>Nova invited you</span></div><button onClick={()=>notify('Party invitation accepted')}>Join</button></article></div>}
 {type==='party'&&<><div className="party-app-hero"><Headphones size={38}/><h2>Late Night Gaming</h2><p>{party.join(' · ')}</p></div><div className="system-actions"><button onClick={()=>notify('Microphone toggled')}><Mic/> Microphone</button><button onClick={()=>notify('Share Screen started')}><Cast/> Share Screen</button><button onClick={()=>notify('Invite screen opened')}><UserPlus/> Invite</button></div></>}
 {type==='gamebase'&&<div className="system-card-list">{friends.map(f=><article key={f.name}><div className="friend-avatar">{f.name[0]}</div><div><strong>{f.name}</strong><span>{f.game} · {f.status}</span></div><button onClick={()=>notify('Invite sent to '+f.name)}>Invite</button></article>)}</div>}
 {type==='music'&&<><div className="now-playing"><div className="album-art"><Music2 size={55}/></div><div><span className="kicker">Now playing</span><h2>Console Waves</h2><p>PS6OS Soundtrack · 2:14 / 3:48</p><div className="music-controls"><button onClick={()=>notify('Previous track')}><ChevronLeft/></button><button onClick={()=>notify('Playback toggled')}><Pause/></button><button onClick={()=>notify('Next track')}><ChevronRight/></button></div></div></div><div className="progress-track"><span style={{width:'58%'}}/></div></>}
 {type==='accessories'&&<div className="accessory-grid"><article><Gamepad2 size={54}/><span className="kicker">Wireless Controller</span><h2>DualSense Concept</h2><p>Battery {controllerBattery}% · Connected</p><button onClick={()=>notify('Controller settings opened')}>Controller settings</button></article><article><Headphones size={54}/><span className="kicker">Audio</span><h2>Wireless Headset</h2><p>Connected · 3D Audio ready</p><button onClick={()=>notify('Headset settings opened')}>Audio settings</button></article></div>}
 </div></div>;
}

function GameHub({game,onClose,notify,onTrophies}) {
 return <div className="fullscreen-layer"><header><button onClick={onClose}><ChevronLeft/> Back</button><span>Game Hub</span><button onClick={onClose}><X/></button></header><div className="hub-hero" style={{background:game.background}}><div><span className="kicker">{game.tag}</span><h1>{game.title}</h1><p>{game.subtitle}</p><div className="hero-actions"><button className="primary" onClick={()=>notify('Launching '+game.title)}><Play/> Play</button><button className="secondary" onClick={onTrophies}><Trophy/> Trophies</button></div></div></div><div className="hub-grid"><article><Activity/><h3>Activities</h3><p>Continue your current objective and track progress.</p><button onClick={()=>notify('Activity resumed')}>Resume activity</button></article><article><Trophy/><h3>Trophy progress</h3><strong>37%</strong><p>12 bronze · 4 silver · 1 gold</p><button onClick={onTrophies}>View trophies</button></article><article><Users/><h3>Friends who play</h3><p>Nova, Kai and 6 other players.</p><button onClick={()=>notify('Game Base opened')}>View friends</button></article></div></div>;
}
function TrophyCenter({onClose}) {
 const [tab,setTab]=useState('Overview'); const [pin,setPin]=useState([]);
 const ts=[['First Light','Bronze','Complete the opening mission',true,64],['Into the Rift','Silver','Reach the orbital gate',true,31],['No Star Unseen','Gold','Discover every system',false,8],['Speedrunner','Silver','Finish an activity under 10 minutes',false,14],['Beyond','Platinum','Earn all trophies',false,2]];
 return <div className="fullscreen-layer trophies-page"><header><button onClick={onClose}><ChevronLeft/> Back</button><span>Trophies</span><button onClick={onClose}><X/></button></header><div className="trophies-wrap"><div className="trophy-title"><Trophy size={52}/><div><span className="kicker">Trophy Center 2.0</span><h1>17 / 46 trophies</h1><div className="progress-track"><span style={{width:'37%'}}/></div></div></div><div className="trophy-tabs">{['Overview','All trophies','Pinned','Stats'].map(x=><button className={tab===x?'active':''} onClick={()=>setTab(x)} key={x}>{x}</button>)}</div>
 {tab==='Overview'&&<div className="trophy-dashboard"><article><Crown/><strong>Level 128</strong><span>12,480 trophy XP</span></article><article><Trophy/><strong>7 Platinum</strong><span>Top 18% this season</span></article><article><Sparkles/><strong>3 near completion</strong><span>Games above 80%</span></article><article><Users/><strong>+14 vs friends</strong><span>This month's trophy race</span></article></div>}
 {(tab==='All trophies'||tab==='Pinned')&&<div className="trophy-list">{ts.filter(x=>tab!=='Pinned'||pin.includes(x[0])).map(([n,t,d,u,rarity])=><article className={u?'earned':''} key={n}><div className="trophy-medal"><Trophy/></div><div><small>{t} · {rarity}% earned</small><strong>{n}</strong><span>{d}</span></div><button className="trophy-pin" onClick={()=>setPin(p=>p.includes(n)?p.filter(x=>x!==n):[...p,n])}>{pin.includes(n)?'Unpin':'Pin'}</button><b>{u?'Earned':'Locked'}</b></article>)}</div>}
 {tab==='Stats'&&<div className="trophy-stats-page"><div><strong>412</strong><span>Total trophies</span></div><div><strong>286</strong><span>Bronze</span></div><div><strong>91</strong><span>Silver</span></div><div><strong>28</strong><span>Gold</span></div><div><strong>7</strong><span>Platinum</span></div><div><strong>37%</strong><span>Average completion</span></div><article><h2>Trophy Journey</h2><p>PS6OS concept: a smart roadmap highlights trophies you're close to earning without revealing hidden trophy details.</p><button onClick={()=>setTab('All trophies')}>Build my roadmap</button></article></div>}
 </div></div>;
}

function DownloadCenter({downloads,setDownloads,onClose}) {
 return <div className="fullscreen-layer downloads-page"><header><button onClick={onClose}><ChevronLeft/> Back</button><span>Downloads / Uploads</span><button onClick={onClose}><X/></button></header><div className="downloads-wrap"><span className="kicker">Queue</span><h1>Downloads</h1>{downloads.length===0?<p>No active downloads.</p>:downloads.map((d,i)=><article key={d.name}><div className="download-icon"><Download/></div><div><strong>{d.name}</strong><span>{d.progress>=100?'Ready to play':d.progress+'% · Downloading'}</span><div className="progress-track"><span style={{width:d.progress+'%'}}/></div></div><button onClick={()=>setDownloads(x=>x.filter((_,j)=>j!==i))}><Trash2/></button></article>)}</div></div>;
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

function StorePage({ notify, wishlist, setWishlist, downloads, setDownloads }) {
  const [tab,setTab] = useState('Featured');
  const [selected,setSelected] = useState(null);
  const products = games.map((g,i)=>({...g,price:[79.99,69.99,59.99,49.99,74.99][i],sale:i===1||i===3}));
  const buy = (p) => {
    if (!downloads.some(d=>d.name===p.title)) setDownloads(d=>[...d,{name:p.title,progress:1}]);
    notify(`${p.title} added to downloads`);
    setSelected(null);
  };
  return (
    <section className="page-shell store-page">
      <div className="page-title"><div><span className="kicker">PlayStation Store</span><h1>Discover something new</h1></div><ShoppingBag /></div>
      <div className="store-tabs">{['Featured','Latest','Collections','Deals','Wishlist'].map(x=><button className={tab===x?'active':''} onClick={()=>setTab(x)} key={x}>{x}{x==='Wishlist'&&wishlist.length? ` (${wishlist.length})`:''}</button>)}</div>
      <div className="store-hero">
        <div><span>Featured on PS6OS</span><h2>Stellar Divide: Beyond the Frontier</h2><p>Explore the next chapter with a redesigned Store experience, wishlists and simulated downloads.</p><button className="primary" onClick={()=>setSelected(products[0])}>View game</button></div>
      </div>
      <div className="section-heading"><div><span className="kicker">{tab}</span><h2>{tab==='Wishlist'?'Your wishlist':'Games for you'}</h2></div></div>
      <div className="store-products">
        {(tab==='Wishlist'?products.filter(p=>wishlist.includes(p.id)):products).map(p=><article key={p.id}>
          <button className="product-art" style={{background:p.cover}} onClick={()=>setSelected(p)}><span>{p.sale?'SAVE 25%':'PS6'}</span></button>
          <div className="product-copy"><small>{p.tag}</small><strong>{p.title}</strong><span>€ {p.price.toFixed(2)}</span></div>
          <button className={wishlist.includes(p.id)?'wish active':'wish'} onClick={()=>setWishlist(w=>w.includes(p.id)?w.filter(x=>x!==p.id):[...w,p.id])}><Heart size={17} fill={wishlist.includes(p.id)?'currentColor':'none'}/></button>
        </article>)}
      </div>
      {selected&&<div className="modal-backdrop" onMouseDown={()=>setSelected(null)}><div className="product-modal" onMouseDown={e=>e.stopPropagation()}>
        <button className="product-close" onClick={()=>setSelected(null)}><X/></button><div className="product-modal-art" style={{background:selected.cover}} />
        <span className="kicker">PS6 · Digital</span><h2>{selected.title}</h2><p>{selected.subtitle} Includes cloud save support, activities and trophy tracking.</p>
        <div className="product-price">€ {selected.price.toFixed(2)}</div>
        <button className="primary wide" onClick={()=>buy(selected)}><Download size={18}/> Add to downloads</button>
        <button className="secondary wide" onClick={()=>setWishlist(w=>w.includes(selected.id)?w.filter(x=>x!==selected.id):[...w,selected.id])}><Heart size={18}/> {wishlist.includes(selected.id)?'Remove from wishlist':'Add to wishlist'}</button>
      </div></div>}
    </section>
  );
}

function LegacyStorePage({ notify }) {
  return (
    <section className="page-shell">
      <div className="page-title"><div><span className="kicker">PlayStation Store</span><h1>Discover something new</h1></div><ShoppingBag /></div>
      <div className="store-hero">
        <div><span>Autumn showcase</span><h2>Next-gen worlds, built for PS6OS.</h2><p>Explore new releases, upcoming experiences and special editions.</p><button className="primary" onClick={() => notify('Showcase opened')}>View showcase</button></div>
      </div>
      <div className="store-row">
        {['New releases', 'PS6 exclusives', 'Deals', 'Coming soon'].map((label, i) => (
          <button key={label} onClick={() => label==='Network' ? (setOnline(!online),notify(online?'Network disconnected':'Network connected')) : label==='Downloads' ? openDownloads() : label==='Switcher' ? notify('Switcher opened') : label==='Party' ? notify('Party card opened') : notify(`${label} opened`)}><span className="store-art">{['✦','⬡','%','◌'][i]}</span><strong>{label}</strong><small>Explore collection</small></button>
        ))}
      </div>
    </section>
  );
}

function PlusPage({ notify }) {
  const [tab,setTab]=useState('Overview');
  const [claimed,setClaimed]=useState(['Ghostline']);
  const [plusList,setPlusList]=useState(['Stellar Divide']);
  const [plan,setPlan]=useState('Premium');
  const [boost,setBoost]=useState(true);
  const [smartQueue,setSmartQueue]=useState(true);
  const monthly=[
    ['Stellar Divide','Monthly Game','Essential',games[0].cover],
    ['Ghostline','Game Catalog','Extra',games[1].cover],
    ['Neon Circuit','Day One Drop','Extra',games[2].cover],
    ['Drift Protocol','Cloud Ready','Premium',games[3].cover],
    ['Mythbreaker','Classics & Trials','Premium',games[4].cover],
  ];
  const claim=(title)=>setClaimed(x=>x.includes(title)?x:[...x,title]);
  return <section className="page-shell plus-page">
    <div className="plus-hero"><div className="plus-logo"><span>△</span><span>○</span><span>×</span><span>□</span><b>PLUS</b></div><span className="kicker">{plan} member · 214 day streak</span><h1>Your PlayStation Plus universe.</h1><p>Catalog, monthly games, cloud play, trials, member rewards, social discovery and new PS6OS-exclusive ideas in one living hub.</p><div className="hero-actions"><button className="primary" onClick={()=>setTab('Plans')}><Crown/> Manage {plan}</button><button className="secondary" onClick={()=>setTab('Rewards')}><Gift/> Rewards · 2,840 pts</button></div></div>
    <div className="plus-tabs">{['Overview','Catalog','Monthly','Cloud','Trials','Rewards','Plans'].map(x=><button className={tab===x?'active':''} onClick={()=>setTab(x)} key={x}>{x}</button>)}</div>
    {tab==='Overview'&&<><div className="plus-stats"><article><Clock3/><strong>184h</strong><span>Catalog playtime</span></article><article><Gamepad2/><strong>27</strong><span>Plus games played</span></article><article><Trophy/><strong>146</strong><span>Trophies earned</span></article><article><Cloud/><strong>38</strong><span>Cloud saves synced</span></article></div>
    <div className="plus-benefits mega"><button onClick={()=>setTab('Monthly')}><Gift/><strong>Monthly Games</strong><span>Claim this month's collection.</span></button><button onClick={()=>setTab('Catalog')}><LayoutGrid/><strong>Game Catalog</strong><span>Browse hundreds of titles.</span></button><button onClick={()=>setTab('Cloud')}><Cloud/><strong>Cloud Play</strong><span>Jump in without downloading.</span></button><button onClick={()=>setTab('Trials')}><Clock3/><strong>Game Trials</strong><span>Try selected releases first.</span></button><button onClick={()=>notify('Cloud saves synchronized')}><RefreshCw/><strong>Cloud Sync</strong><span>Sync saves across devices.</span></button><button onClick={()=>notify('Share Play session ready')}><Cast/><strong>Share Play</strong><span>Bring a friend into your session.</span></button><button onClick={()=>notify('Member deals opened')}><CircleDollarSign/><strong>Member Deals</strong><span>Extra Store discounts.</span></button><button onClick={()=>setTab('Rewards')}><Crown/><strong>Plus Rewards</strong><span>Earn points by playing.</span></button></div>
    <div className="plus-next"><div><span className="kicker">PS6OS exclusive concept</span><h2>Plus Pulse</h2><p>A personal feed that turns your trophies, friends, genres and available playtime into a live “what should I play?” queue.</p><button className="primary" onClick={()=>notify('Plus Pulse refreshed your recommendations')}><Sparkles/> Refresh Pulse</button></div><div className="pulse-list">{['20 min · Continue Stellar Divide activity','Party ready · Ghostline with Nova','1 trophy away · Mythbreaker Gold','Leaving soon · Finish Neon Circuit'].map((x,i)=><button key={x} onClick={()=>notify('Pulse item '+(i+1)+' opened')}><span>{i+1}</span>{x}<ChevronRight/></button>)}</div></div></>}
    {['Catalog','Monthly','Cloud','Trials'].includes(tab)&&<><div className="section-heading"><div><span className="kicker">{tab}</span><h2>{tab==='Monthly'?'Claim this month':tab==='Cloud'?'Play instantly':tab==='Trials'?'Try before you buy':'Your Plus catalog'}</h2></div></div><div className="plus-catalog">{monthly.filter(x=>tab!=='Monthly'||x[1]==='Monthly Game').map(([title,label,tier,cover])=><article key={title}><button className="plus-art" style={{background:cover}} onClick={()=>notify(title+' details opened')}><span className="plus-badge">PS+</span></button><small>{label} · {tier}</small><strong>{title}</strong><span>{claimed.includes(title)?'In your library':'Included with '+tier}</span><div className="plus-card-actions"><button onClick={()=>claim(title)}>{claimed.includes(title)?'Claimed':'Add to library'}</button><button onClick={()=>setPlusList(x=>x.includes(title)?x.filter(y=>y!==title):[...x,title])}><Heart size={15} fill={plusList.includes(title)?'currentColor':'none'}/></button></div></article>)}</div></>}
    {tab==='Rewards'&&<div className="rewards-page"><div className="reward-balance"><Crown/><span>Plus Points</span><strong>2,840</strong><p>Earned from trophies, monthly challenges and trying new genres.</p></div><div className="challenge-grid">{[['Weekly Explorer','Play 3 different Plus games','+150'],['Trophy Hunter','Earn 5 trophies','+100'],['Party Player','Play with a friend','+75'],['Genre Quest','Try a genre you rarely play','+200']].map(x=><article key={x[0]}><Sparkles/><strong>{x[0]}</strong><span>{x[1]}</span><b>{x[2]} pts</b><button onClick={()=>notify(x[0]+' tracked')}>Track challenge</button></article>)}</div></div>}
    {tab==='Plans'&&<div className="plans">{['Essential','Extra','Premium'].map((p,i)=><article className={plan===p?'featured':''} key={p}><span>{p.toUpperCase()}</span><h3>{i===0?'Monthly games & online play':i===1?'Essential + Game Catalog':'Everything + cloud, classics & trials'}</h3><p>{i===0?'Monthly games, multiplayer, cloud saves, Share Play and discounts.':i===1?'Adds the downloadable Game Catalog and more discovery.':'Adds cloud streaming, classics, trials and premium experiences.'}</p><button onClick={()=>{setPlan(p);notify(p+' membership selected')}}>{plan===p?'Current plan':'Switch to '+p}</button></article>)}</div>}
    {tab==='Cloud'&&<div className="plus-labs"><h2>Cloud Intelligence</h2><label><div><strong>Smart Resume</strong><span>Predict which save/device you want to continue from.</span></div><input type="checkbox" checked={smartQueue} onChange={e=>setSmartQueue(e.target.checked)}/></label><label><div><strong>Adaptive Boost</strong><span>Concept feature that prioritizes responsiveness during cloud sessions.</span></div><input type="checkbox" checked={boost} onChange={e=>setBoost(e.target.checked)}/></label></div>}
  </section>;
}


function SocialPage({ friends, notify, party, setParty }) {
  const [tab,setTab]=useState('Friends');
  const join=(name)=>{ setParty(p=>p.includes(name)?p:[...p,name]); notify(name+' joined your party'); };
  return (
    <section className="page-shell">
      <div className="page-title"><div><span className="kicker">Game Base</span><h1>Friends & Parties</h1></div><Users /></div>
      <div className="gamebase-tabs">{['Friends','Parties','Messages'].map(x=><button className={tab===x?'active':''} onClick={()=>setTab(x)} key={x}>{x}</button>)}</div>
      {tab==='Friends'&&<div className="social-layout"><article className="glass-card"><div className="card-head"><div><span className="kicker">Online now</span><h3>{friends.length} friends</h3></div><UserPlus/></div>
        {friends.map(friend=><div className="friend-row big" key={friend.name}><div className="friend-avatar">{friend.name[0]}</div><div><strong>{friend.name}</strong><span>{friend.game} · {friend.status}</span></div><button onClick={()=>join(friend.name)}>Invite</button><button onClick={()=>notify('Profile opened: '+friend.name)}>Profile</button></div>)}
      </article><article className="glass-card party-card"><div className="party-visual"><Headphones/></div><span className="kicker">Voice party</span><h2>{party.length>1?'Party active':'Start a party'}</h2><p>{party.join(' · ')}</p><button className="primary" onClick={()=>notify('Party voice chat '+(party.length>1?'opened':'created'))}>{party.length>1?'Open party':'Create party'}</button></article></div>}
      {tab==='Parties'&&<div className="party-room"><div><Headphones size={42}/><span className="kicker">Your voice party</span><h2>Late Night Gaming</h2><p>Open party · Friends can join</p></div><div className="party-members">{party.map(n=><div key={n}><div className="friend-avatar">{n[0]}</div><strong>{n}</strong><span>{n==='Levi'?'Party owner':'Connected'}</span><button onClick={()=>n!=='Levi'&&setParty(p=>p.filter(x=>x!==n))}>{n==='Levi'?<Mic size={17}/>:<X size={17}/>}</button></div>)}</div><div className="party-actions"><button onClick={()=>notify('Microphone toggled')}><Mic/> Microphone</button><button onClick={()=>notify('Share Screen started')}><Cast/> Share Screen</button><button onClick={()=>notify('Party link copied')}><Plus/> Invite players</button></div></div>}
      {tab==='Messages'&&<div className="messages-grid">{friends.map(f=><button onClick={()=>notify('Conversation opened with '+f.name)} key={f.name}><div className="friend-avatar">{f.name[0]}</div><div><strong>{f.name}</strong><span>Tap to open conversation</span></div><MessageCircle/></button>)}</div>}
    </section>
  );
}

function LegacySocialPage({ friends, notify }) {
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

function ControlCenter({ volume, setVolume, micMuted, setMicMuted, onClose, notify, onPower, downloads, online, setOnline, controllerBattery, party, openDownloads, openTrophies, openApp }) {
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
            ['Network', online ? Wifi : WifiOff],
            ['Notifications', Bell],
            ['Downloads', Download],
            ['Party', Headphones],
            ['Game Base', Users],
            ['Music', Music2],
            ['Accessories', Gamepad],
          ].map(([label, Icon]) => (
            <button key={label} onClick={() => label==='Downloads' ? openDownloads() : label==='Network' ? openApp('network') : label==='Switcher' ? openApp('switcher') : label==='Notifications' ? openApp('notifications') : label==='Party' ? openApp('party') : label==='Game Base' ? openApp('gamebase') : label==='Music' ? openApp('music') : label==='Accessories' ? openApp('accessories') : notify(label+' opened')}><Icon /><span>{label}</span></button>
          ))}
        </div>
        <div className="sound-row">
          <Volume2 />
          <input aria-label="Volume" type="range" min="0" max="100" value={volume} onChange={(e) => setVolume(Number(e.target.value))} />
          <strong>{volume}</strong>
          <button className={micMuted ? 'toggle active' : 'toggle'} onClick={() => setMicMuted((v) => !v)}><Mic size={18}/>{micMuted ? 'Muted' : 'Mic'}</button>
        </div>
        <div className="quick-status"><div><Download/><span><strong>{downloads?.length||0}</strong> downloads</span></div><div><Gamepad2/><span><strong>{controllerBattery}%</strong> controller</span></div><div><Headphones/><span><strong>{party?.length||1}</strong> in party</span></div></div>
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
