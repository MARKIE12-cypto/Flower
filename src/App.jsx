import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import './App.css'

const stars = Array.from({ length: 90 }, (_, index) => ({
  left: `${(index * 43 + 7) % 100}%`, top: `${(index * 67 + 11) % 100}%`,
  size: 1 + (index % 3) * .55, delay: `${-((index * 19) % 50) / 10}s`, duration: `${3 + (index % 5) * .7}s`,
}))

const gardenFlowers = Array.from({ length: 24 }, (_, index) => {
  const sideIndex = index % 12
  return {
    id: index, left: index < 12 ? `${1 + sideIndex * 3.1}%` : `${65 + sideIndex * 3.1}%`,
    bottom: `${-5 + ((index * 17) % 19)}%`, scale: .52 + (index % 5) * .11,
    delay: .25 + (index % 8) * .12, hue: -24 + (index * 23) % 58, opacity: .24 + (index % 4) * .08,
  }
})

const petals = Array.from({ length: 14 }, (_, index) => ({
  angle: (index / 14) * Math.PI * 2, distance: 95 + (index % 4) * 24, delay: index * .055,
}))

function StarBackground() {
  return <div className="star-background" aria-hidden="true">
    {stars.map((star, index) => <i key={index} style={{ left: star.left, top: star.top, width: star.size, height: star.size, animationDelay: star.delay, animationDuration: star.duration }} />)}
    <span className="firefly firefly-one" /><span className="firefly firefly-two" /><span className="firefly firefly-three" />
  </div>
}

function FlowerArt({ id = 'hero', simple = false }) {
  const stemId = `stem-${id}`
  const petalId = `petal-${id}`
  const innerId = `inner-${id}`
  return <svg viewBox="0 0 220 330" role={simple ? undefined : 'img'} aria-label={simple ? undefined : 'A softly glowing flower'}>
    <defs>
      <linearGradient id={stemId} x1="0" x2="1"><stop stopColor="#397b75" /><stop offset=".52" stopColor="#78beb2" /><stop offset="1" stopColor="#b3ddd4" /></linearGradient>
      <radialGradient id={petalId} cx="48%" cy="20%" r="90%"><stop stopColor="#f8e8f2" /><stop offset=".28" stopColor="#dfa7c9" /><stop offset=".68" stopColor="#9371a5" /><stop offset="1" stopColor="#51456f" /></radialGradient>
      <linearGradient id={innerId} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#e8f5f2" /><stop offset=".42" stopColor="#b8d8d7" /><stop offset="1" stopColor="#b181ae" /></linearGradient>
    </defs>
    <path d="M109 306 C108 247 110 188 111 126" fill="none" stroke={`url(#${stemId})`} strokeWidth={simple ? 7 : 8} strokeLinecap="round" />
    <path d="M109 245 C78 218 67 241 74 270 C86 253 97 250 109 252Z" fill="#477f78" stroke="#8bc2b8" strokeWidth="1.4" />
    <path d="M111 214 C141 183 158 202 150 233 C137 218 124 214 111 221Z" fill="#4a817b" stroke="#8bc2b8" strokeWidth="1.4" />
    <g className="flower-head">
      {!simple && <path d="M111 144 C76 153 40 128 38 91 C58 95 77 105 91 120 C71 91 74 56 91 31 C102 50 108 69 111 91 C117 66 133 45 154 29 C161 61 153 91 134 119 C149 105 167 96 189 94 C181 131 147 153 111 144Z" fill="#514366" stroke="#b98caf" strokeWidth="1.4" />}
      <path d="M111 145 C75 146 52 112 58 59 C79 68 97 82 111 105 C126 82 146 67 168 58 C174 111 149 146 111 145Z" fill={`url(#${petalId})`} stroke="#d5a8ca" strokeWidth="1.3" />
      <path d="M111 141 C86 119 83 79 98 43 C108 59 112 78 111 104 C116 77 125 58 140 42 C149 80 139 120 111 141Z" fill={`url(#${innerId})`} stroke="#dcecea" strokeWidth="1" />
      <path d="M111 141 C100 112 102 81 112 57 C124 85 124 114 111 141Z" fill="#cf96bd" opacity=".82" />
      {!simple && <g className="flower-core"><circle cx="111" cy="138" r="9" fill="#e8d69d" /><circle cx="108" cy="135" r="2" fill="#fff9d9" /><circle cx="114" cy="137" r="1.7" fill="#fff9d9" /></g>}
    </g>
  </svg>
}

function FlowerGarden({ scene }) {
  return <div className={`flower-garden garden-${scene}`} aria-hidden="true">
    {gardenFlowers.map((flower) => <motion.div key={flower.id} className="garden-flower"
      style={{ left: flower.left, bottom: flower.bottom, opacity: flower.opacity, filter: `hue-rotate(${flower.hue}deg)`, '--garden-scale': flower.scale }}
      initial={{ y: 55, scaleY: 0 }} animate={{ y: 0, scaleY: 1 }} transition={{ duration: 1.4, delay: flower.delay, ease: [0.16, 1, 0.3, 1] }}>
      <FlowerArt id={`garden-${flower.id}`} simple />
    </motion.div>)}
  </div>
}

function HeroFlower({ scene }) {
  const receiving = scene === 'receiving'
  return <motion.div className={`hero-flower hero-${scene}`} initial={{ opacity: 0, y: 52, scale: .3 }}
    animate={{ opacity: 1, y: receiving ? -8 : 0, scale: receiving ? 1.16 : scene === 'kept' ? .96 : 1 }}
    transition={{ duration: receiving ? 1.5 : 1.25, delay: scene === 'intro' ? .45 : 0, ease: [0.16, 1, 0.3, 1] }}>
    <div className="flower-aura" aria-hidden="true" /><FlowerArt />
  </motion.div>
}

function PetalEffect({ active, celebrate = false }) {
  return <AnimatePresence>{active && <div className="petal-effect" aria-hidden="true">
    {petals.map((petal, index) => <motion.i key={index} initial={{ x: 0, y: 0, opacity: 0, scale: .2, rotate: 0 }}
      animate={{ x: Math.cos(petal.angle) * petal.distance, y: Math.sin(petal.angle) * petal.distance + (celebrate ? -30 : 25), opacity: [0, .8, 0], scale: [0, 1, .7], rotate: 140 + index * 31 }}
      transition={{ duration: 1.8, delay: petal.delay, ease: 'easeOut' }} />)}
  </div>}</AnimatePresence>
}

function ReceiveButton({ onClick }) {
  return <motion.button className="receive-button" type="button" onClick={onClick} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8, scale: .96 }} transition={{ duration: .7, delay: 1.15 }} whileHover={{ y: -3, scale: 1.015 }} whileTap={{ scale: .97 }}>
    Receive the Flower <span aria-hidden="true">→</span>
  </motion.button>
}

function GiftMessage({ kept, onKeep }) {
  return <motion.div className="gift-message" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: 'easeOut' }}>
    <AnimatePresence mode="wait">{kept ?
      <motion.div className="kept-message" key="kept" initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }}><h2>It’s yours now. <span aria-hidden="true">♡</span></h2><p>Keep this little light with you.</p></motion.div> :
      <motion.div key="gift" exit={{ opacity: 0, y: -8 }}><h2>This flower is for you.</h2><p className="gift-thought">It may only live on a screen, but the thought behind it is real.</p><p className="gift-reminder">Keep it whenever you need a little reminder that someone thought of you today. <span aria-hidden="true">🌷</span></p><motion.button className="keep-button" type="button" onClick={onKeep} whileHover={{ y: -2 }} whileTap={{ scale: .97 }}>Keep the Flower <span aria-hidden="true">♡</span></motion.button></motion.div>
    }</AnimatePresence>
  </motion.div>
}

export default function App() {
  const [scene, setScene] = useState('intro')
  const [musicPlaying, setMusicPlaying] = useState(false)
  const audioRef = useRef(null)
  const transitionRef = useRef(null)
  const isGift = scene === 'gift' || scene === 'kept'
  useEffect(() => () => clearTimeout(transitionRef.current), [])

  const receiveFlower = async () => {
    setScene('receiving')
    transitionRef.current = setTimeout(() => setScene('gift'), 1650)
    if (!audioRef.current) return
    audioRef.current.volume = .3
    try { audioRef.current.currentTime = 10; await audioRef.current.play(); setMusicPlaying(true) } catch { setMusicPlaying(false) }
  }
  const toggleMusic = async () => {
    if (!audioRef.current) return
    if (audioRef.current.paused) { try { await audioRef.current.play(); setMusicPlaying(true) } catch { setMusicPlaying(false) } }
    else { audioRef.current.pause(); setMusicPlaying(false) }
  }

  return <main className={`experience scene-${scene}`} aria-label={scene === 'intro' ? 'A flower waiting to be received' : 'A flower given with care'}>
    <audio ref={audioRef} src="/sinta.mp3" loop preload="auto" />
    <StarBackground /><FlowerGarden scene={scene} /><div className="scene-shade" aria-hidden="true" />
    <section className="story">
      <AnimatePresence mode="wait">{scene === 'intro' && <motion.header className="intro-copy" key="intro" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: .7 }}><p>JUST FOR YOU</p><h1>I have something for you <span aria-hidden="true">🌷</span></h1></motion.header>}</AnimatePresence>
      <div className="flower-space"><HeroFlower scene={scene} /><PetalEffect active={scene === 'receiving' || scene === 'kept'} celebrate={scene === 'kept'} /></div>
      <AnimatePresence mode="wait">{scene === 'intro' && <ReceiveButton key="receive" onClick={receiveFlower} />}{isGift && <GiftMessage key="message" kept={scene === 'kept'} onKeep={() => setScene('kept')} />}</AnimatePresence>
    </section>
    <AnimatePresence>{scene !== 'intro' && <motion.button className="music-toggle" type="button" onClick={toggleMusic} aria-label={musicPlaying ? 'Pause music' : 'Play music'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><span className={musicPlaying ? 'music-bars playing' : 'music-bars'} aria-hidden="true"><i /><i /><i /></span></motion.button>}</AnimatePresence>
  </main>
}
