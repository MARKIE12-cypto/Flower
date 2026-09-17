import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import './App.css'

const backgroundPetals = [
  { left: '7%', delay: 1, duration: 13, size: 10 }, { left: '18%', delay: 7, duration: 16, size: 8 },
  { left: '32%', delay: 3, duration: 14, size: 12 }, { left: '52%', delay: 9, duration: 17, size: 8 },
  { left: '68%', delay: 2, duration: 15, size: 11 }, { left: '84%', delay: 6, duration: 13, size: 9 },
  { left: '94%', delay: 11, duration: 16, size: 12 },
]

const burstPetals = [
  { x: -112, y: -68, rotate: -80 }, { x: -86, y: 26, rotate: -135 },
  { x: -54, y: -118, rotate: -35 }, { x: 62, y: -112, rotate: 42 },
  { x: 108, y: -40, rotate: 90 }, { x: 92, y: 38, rotate: 142 },
]

const personalMessage = 'A little flower for someone who makes ordinary days feel a little more special.'
const typingDuration = personalMessage.length * 0.038
const typingDelay = 1.25

function Petal({ size = 10 }) {
  return <span className="petal" style={{ width: size, height: size * 1.6 }} />
}

function Petals({ received }) {
  return (
    <div className="petals" aria-hidden="true">
      {backgroundPetals.map((petal, index) => (
        <motion.span className="falling-petal" key={index} style={{ left: petal.left }}
          animate={{ y: ['-12vh', '112vh'], x: [0, index % 2 ? 42 : -34, index % 2 ? -18 : 24], rotate: [0, 155, 310], opacity: [0, 0.42, 0.32, 0] }}
          transition={{ duration: petal.duration, delay: petal.delay, repeat: Infinity, ease: 'linear' }}>
          <Petal size={petal.size} />
        </motion.span>
      ))}
      <AnimatePresence>
        {received && (
          <motion.div className="petal-burst" initial={{ opacity: 1 }} animate={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 2.8, delay: 0.2 }}>
            {burstPetals.map((petal, index) => (
              <motion.span key={index} className="burst-petal" initial={{ x: 0, y: 0, rotate: 0, scale: 0 }}
                animate={{ x: petal.x, y: petal.y + 72, rotate: petal.rotate, scale: [0, 1, 0.72] }}
                transition={{ duration: 2.25, delay: 0.45 + index * 0.09, ease: 'easeOut' }}>
                <Petal size={8 + (index % 3) * 2} />
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Flower({ received, kept }) {
  return (
    <motion.div className={`flower-wrap ${kept ? 'flower-kept' : ''}`}
      animate={kept ? { y: 2, scale: 0.7 } : received ? { y: -2, scale: 1.12 } : { y: [0, -8, 0], scale: 1 }}
      transition={kept ? { duration: 1.1, ease: [0.22, 1, 0.36, 1] } : received ? { duration: 1.6, ease: [0.22, 1, 0.36, 1] } : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}>
      <AnimatePresence>
        {received && !kept && (
          <motion.div className="sparkles" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {[0, 1, 2, 3, 4].map((spark) => (
              <motion.span key={spark} className={`sparkle sparkle-${spark + 1}`}
                animate={{ scale: [0, 1, 0], rotate: [0, 45, 90], opacity: [0, 0.9, 0] }}
                transition={{ duration: 2.1, delay: 0.7 + spark * 0.22, repeat: 1, repeatDelay: 0.5 }} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      {kept && <div className="bouquet-paper" aria-hidden="true" />}
      <svg className="flower" viewBox="0 0 230 330" role="img" aria-label="A pink tulip">
        <defs>
          <linearGradient id="stem" x1="0" x2="1"><stop offset="0" stopColor="#5f8f63" /><stop offset="1" stopColor="#86ab75" /></linearGradient>
          <linearGradient id="petalPink" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f7b7bd" /><stop offset=".55" stopColor="#dc7888" /><stop offset="1" stopColor="#b94e65" /></linearGradient>
          <linearGradient id="petalLight" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffd9d7" /><stop offset="1" stopColor="#e58c99" /></linearGradient>
          <filter id="softShadow" x="-50%" y="-30%" width="200%" height="190%"><feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#8d4351" floodOpacity=".16" /></filter>
        </defs>
        <motion.ellipse cx="116" cy="314" rx="42" ry="6" fill="#927e68" animate={{ rx: received ? 49 : 42, opacity: received ? 0.13 : 0.1 }} />
        <motion.g className="side-flower side-flower-left"
          animate={received ? { rotate: -3, x: -3, y: -2 } : { rotate: [0, -1.5, 0] }}
          transition={received ? { duration: 1.5, ease: 'easeOut' } : { duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '109px 280px' }}>
          <path d="M108 288 C101 237 88 188 70 137" fill="none" stroke="url(#stem)" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M89 214 C61 198 54 221 62 243 C72 227 82 222 92 222Z" fill="#7ca16f" />
          <g transform="translate(2 58) scale(.58)" filter="url(#softShadow)">
            <path d="M117 137 C78 140 52 106 57 53 C80 62 101 76 117 99 C131 77 153 62 177 54 C181 106 157 140 117 137Z" fill="url(#petalPink)" />
            <path d="M116 134 C88 112 82 75 97 39 C111 56 118 76 118 99 C122 76 131 57 145 42 C154 77 145 114 116 134Z" fill="url(#petalLight)" />
            <path d="M116 135 C102 107 104 75 117 47 C132 77 132 107 116 135Z" fill="#ef9ca5" opacity=".78" />
          </g>
        </motion.g>
        <motion.g className="side-flower side-flower-right"
          animate={received ? { rotate: 3, x: 3, y: -3 } : { rotate: [0, 1.5, 0] }}
          transition={received ? { duration: 1.5, ease: 'easeOut' } : { duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: .35 }}
          style={{ transformOrigin: '121px 282px' }}>
          <path d="M120 289 C127 234 143 179 161 126" fill="none" stroke="url(#stem)" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M138 212 C167 193 176 216 168 242 C156 225 147 220 136 220Z" fill="#87aa78" />
          <g transform="translate(92 45) scale(.59)" filter="url(#softShadow)">
            <path d="M117 137 C78 140 52 106 57 53 C80 62 101 76 117 99 C131 77 153 62 177 54 C181 106 157 140 117 137Z" fill="url(#petalPink)" />
            <path d="M116 134 C88 112 82 75 97 39 C111 56 118 76 118 99 C122 76 131 57 145 42 C154 77 145 114 116 134Z" fill="url(#petalLight)" />
            <path d="M116 135 C102 107 104 75 117 47 C132 77 132 107 116 135Z" fill="#ef9ca5" opacity=".78" />
          </g>
        </motion.g>
        <path d="M113 293 C111 238 113 176 118 119" fill="none" stroke="url(#stem)" strokeWidth="7" strokeLinecap="round" />
        <motion.path d="M113 235 C76 207 67 235 74 267 C88 248 101 244 113 243Z" fill="#719b68" animate={{ rotate: received ? -3 : 0 }} transition={{ duration: 1.4 }} style={{ transformOrigin: '112px 240px' }} />
        <motion.path d="M115 203 C150 170 169 194 158 229 C143 211 129 207 115 211Z" fill="#88aa78" animate={{ rotate: received ? 4 : 0 }} transition={{ duration: 1.4 }} style={{ transformOrigin: '117px 207px' }} />
        <motion.g filter="url(#softShadow)" animate={received ? { scaleX: 1.08, scaleY: 1.07, rotate: [0, -1.5, 0] } : { scale: 1 }} transition={{ duration: 1.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }} style={{ transformOrigin: '116px 106px' }}>
          <motion.path d="M117 137 C78 140 52 106 57 53 C80 62 101 76 117 99 C131 77 153 62 177 54 C181 106 157 140 117 137Z" fill="url(#petalPink)"
            animate={received ? { d: 'M117 139 C74 143 44 105 52 44 C78 55 102 76 117 99 C132 76 157 54 182 44 C190 105 160 143 117 139Z' } : undefined} transition={{ duration: 1.45, delay: 0.2, ease: 'easeInOut' }} />
          <motion.path d="M116 134 C88 112 82 75 97 39 C111 56 118 76 118 99 C122 76 131 57 145 42 C154 77 145 114 116 134Z" fill="url(#petalLight)"
            animate={received ? { d: 'M116 136 C84 112 75 70 94 29 C111 50 118 74 118 99 C123 74 134 51 150 32 C163 73 150 114 116 136Z' } : undefined} transition={{ duration: 1.5, delay: 0.28, ease: 'easeInOut' }} />
          <path d="M116 135 C102 107 104 75 117 47 C132 77 132 107 116 135Z" fill="#ef9ca5" opacity=".8" />
          <path d="M72 67 C84 86 96 108 114 132" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".18" />
        </motion.g>
      </svg>
    </motion.div>
  )
}

function GiftMessage({ kept, onKeep }) {
  return (
    <motion.div className="gift-message" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 1.25, ease: 'easeOut' }}>
      <AnimatePresence mode="wait">
        {kept ? (
          <motion.div key="kept" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <p className="final-message">Now it’s officially yours.</p><span className="tiny-heart" aria-hidden="true">♥</span>
          </motion.div>
        ) : (
          <motion.div key="gift" exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
            <motion.p className="handwritten" aria-label={personalMessage}
              initial="hidden" animate="visible"
              variants={{ visible: { transition: { delayChildren: typingDelay, staggerChildren: 0.038 } } }}>
              <span aria-hidden="true">
                {Array.from(personalMessage).map((character, index) => (
                  <motion.span className="typed-character" key={`${character}-${index}`}
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                    transition={{ duration: 0.01 }}>
                    {character}
                  </motion.span>
                ))}
                <motion.span className="typing-cursor" initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }} transition={{ delay: typingDelay + typingDuration, duration: .8, repeat: Infinity }} />
              </span>
            </motion.p>
            <motion.p className="for-you" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .7, delay: typingDelay + typingDuration + .25 }}>
              This one’s for you. <span aria-hidden="true">🌷</span>
            </motion.p>
            <motion.button className="keep-button" type="button" onClick={onKeep}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .7, delay: typingDelay + typingDuration + .65 }}
              whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              Keep the flower <span aria-hidden="true">🌷</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function FlowerGift() {
  const [received, setReceived] = useState(false)
  const [kept, setKept] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const audioRef = useRef(null)

  const receiveFlower = async () => {
    setReceived(true)
    if (!audioRef.current) return
    audioRef.current.volume = 0.38
    try {
      audioRef.current.currentTime = 10
      await audioRef.current.play()
      setMusicPlaying(true)
    } catch {
      setMusicPlaying(false)
    }
  }

  const toggleMusic = async () => {
    if (!audioRef.current) return
    if (audioRef.current.paused) {
      try {
        await audioRef.current.play()
        setMusicPlaying(true)
      } catch {
        setMusicPlaying(false)
      }
    } else {
      audioRef.current.pause()
      setMusicPlaying(false)
    }
  }

  return (
    <main className="page-shell">
      <audio ref={audioRef} src="/sinta.mp3" loop preload="auto" />
      <div className="ambient ambient-one" aria-hidden="true" /><div className="ambient ambient-two" aria-hidden="true" />
      <Petals received={received} />
      <motion.section className={`gift-card ${kept ? 'is-kept' : ''}`} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.25, ease: 'easeOut' }}>
        <motion.p className="eyebrow" animate={{ opacity: received ? 0.55 : 1 }}>JUST FOR YOU</motion.p>
        <AnimatePresence>{!received && <motion.h1 className="intro-title" exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }}>I have something for you <span aria-hidden="true">🌷</span></motion.h1>}</AnimatePresence>
        <div className="flower-stage"><Flower received={received} kept={kept} /></div>
        <AnimatePresence mode="wait">
          {!received ? (
            <motion.button key="receive" className="receive-button" type="button" onClick={receiveFlower} exit={{ opacity: 0, scale: 0.94, y: 6 }} whileHover={{ y: -3, boxShadow: '0 16px 36px rgba(139, 73, 83, .2)' }} whileTap={{ scale: 0.97 }}>
              <span>Receive the Flower</span><span className="button-arrow" aria-hidden="true">→</span>
            </motion.button>
          ) : <GiftMessage key="message" kept={kept} onKeep={() => setKept(true)} />}
        </AnimatePresence>
      </motion.section>
      <AnimatePresence>
        {received && (
          <motion.button className="music-toggle" type="button" onClick={toggleMusic}
            aria-label={musicPlaying ? 'Pause background music' : 'Play background music'}
            title={musicPlaying ? 'Pause music' : 'Play music'}
            initial={{ opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.6 }}
            whileHover={{ scale: 1.06 }} whileTap={{ scale: .94 }}>
            <span className={musicPlaying ? 'music-bars is-playing' : 'music-bars'} aria-hidden="true">
              <i /><i /><i />
            </span>
          </motion.button>
        )}
      </AnimatePresence>
      <p className="signature" aria-hidden="true">a small reminder that you are special</p>
    </main>
  )
}

export default function App() { return <FlowerGift /> }
