import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Camera,
  Gift,
  Heart,
  Music,
  Pause,
  Printer,
  Sparkles,
  Volume2,
} from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';

const memories = [
  {
    date: 'The day everything got brighter',
    title: 'When I met you',
    text: 'Some people arrive quietly and still change the color of every day after.',
  },
  {
    date: 'Our favorite ordinary moments',
    title: 'Laughing over nothing',
    text: 'The little moments with you always end up feeling like the ones I want to keep forever.',
  },
  {
    date: 'Every new adventure',
    title: 'Us, out in the world',
    text: 'Anywhere becomes special when I get to see it beside you.',
  },
  {
    date: 'Today',
    title: 'Celebrating Chloe',
    text: 'The kindest heart, the prettiest smile, and my favorite person to love.',
  },
];

const gallery = [
  'A photo of us smiling',
  'A favorite date night',
  'A sweet candid moment',
  'A trip or adventure',
  'A silly memory',
  'Birthday queen Chloe',
];

const floatingHearts = Array.from({ length: 22 }, (_, index) => ({
  id: index,
  left: `${(index * 43) % 100}%`,
  delay: `${(index % 9) * 1.1}s`,
  duration: `${12 + (index % 7)}s`,
  size: `${18 + (index % 5) * 6}px`,
}));

function useAmbientMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContext = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
      void audioContext.current?.close();
    };
  }, []);

  const playNote = (frequency: number, startOffset: number) => {
    const context = audioContext.current;
    if (!context) return;

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0, context.currentTime + startOffset);
    gain.gain.linearRampToValueAtTime(0.055, context.currentTime + startOffset + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + startOffset + 1.2);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(context.currentTime + startOffset);
    oscillator.stop(context.currentTime + startOffset + 1.25);
  };

  const playPhrase = () => {
    [523.25, 659.25, 783.99, 1046.5].forEach((note, index) => {
      playNote(note, index * 0.32);
    });
  };

  const toggle = async () => {
    if (!audioContext.current) {
      audioContext.current = new AudioContext();
    }

    if (audioContext.current.state === 'suspended') {
      await audioContext.current.resume();
    }

    if (isPlaying) {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
      intervalRef.current = null;
      setIsPlaying(false);
      return;
    }

    playPhrase();
    intervalRef.current = window.setInterval(playPhrase, 4200);
    setIsPlaying(true);
  };

  return { isPlaying, toggle };
}

function FloatingHearts() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {floatingHearts.map((heart) => (
        <Heart
          key={heart.id}
          className="absolute bottom-[-80px] animate-drift text-rose-300/50"
          fill="currentColor"
          style={{
            left: heart.left,
            width: heart.size,
            height: heart.size,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
          }}
        />
      ))}
    </div>
  );
}

function App() {
  const [surpriseOpen, setSurpriseOpen] = useState(false);
  const { isPlaying, toggle } = useAmbientMusic();
  const siteUrl = useMemo(
    () => import.meta.env.VITE_SITE_URL || window.location.href,
    [],
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fff7f8] text-[#40202b]">
      <FloatingHearts />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,137,164,0.28),transparent_34%),radial-gradient(circle_at_85%_15%,rgba(250,204,21,0.18),transparent_26%),linear-gradient(135deg,rgba(255,255,255,0.84),rgba(255,232,237,0.72))]" />

      <button
        type="button"
        onClick={toggle}
        className="fixed right-4 top-4 z-30 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-white/80 text-rose-600 shadow-lg backdrop-blur transition hover:scale-105 hover:bg-white"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        title={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? <Pause size={20} /> : <Music size={20} />}
      </button>

      <section className="relative z-10 flex min-h-screen items-center px-5 py-16 sm:px-8">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/70 px-4 py-2 text-sm font-semibold text-rose-700 shadow-sm backdrop-blur">
              <Sparkles size={16} />
              May today feel as magical as you are
            </div>
            <h1 className="font-display text-6xl font-bold leading-[0.95] text-[#4b1f2e] sm:text-7xl lg:text-8xl">
              Happy Birthday, Chloe
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#6b3a47] sm:text-xl">
              This little corner of the internet is for you: a love note, a memory lane,
              a gallery waiting for our favorite photos, and one final surprise from me.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#message"
                className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-6 py-3 font-semibold text-white shadow-glow transition hover:-translate-y-1 hover:bg-rose-700"
              >
                <Heart size={18} fill="currentColor" />
                Open your birthday note
              </a>
              <a
                href="#surprise"
                className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/75 px-6 py-3 font-semibold text-rose-700 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:bg-white"
              >
                <Gift size={18} />
                Skip to surprise
              </a>
            </div>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm animate-float sm:max-w-md">
            <div className="absolute inset-0 rotate-6 rounded-[2rem] bg-rose-200/70" />
            <div className="absolute inset-4 -rotate-3 rounded-[2rem] bg-amber-100" />
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-white/80 bg-white/75 p-8 shadow-glow backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-rose-100 px-4 py-2 text-sm font-bold text-rose-700">
                  Chloe Day
                </span>
                <Volume2 className={isPlaying ? 'text-rose-600' : 'text-rose-300'} />
              </div>
              <div className="text-center">
                <Heart
                  className="mx-auto mb-6 h-24 w-24 animate-pulseSoft text-rose-500"
                  fill="currentColor"
                />
                <p className="font-display text-4xl font-bold text-[#4b1f2e]">
                  You are my favorite reason to celebrate.
                </p>
              </div>
              <div className="h-2 rounded-full bg-[linear-gradient(90deg,#e11d48,#f9a8d4,#facc15,#e11d48)] bg-[length:200%_100%] animate-shimmer" />
            </div>
          </div>
        </div>
      </section>

      <section id="message" className="relative z-10 px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-rose-600">
            Birthday Message
          </p>
          <h2 className="font-display text-4xl font-bold text-[#4b1f2e] sm:text-5xl">
            Chloe, you make life softer, brighter, and so much more beautiful.
          </h2>
          <p className="mt-7 text-lg leading-8 text-[#6b3a47]">
            I hope this year gives you the same warmth you give everyone around you.
            You deserve mornings that feel peaceful, nights that feel full, dreams that
            keep unfolding, and love that never makes you wonder where you stand. I am
            so lucky I get to love you.
          </p>
        </div>
      </section>

      <section className="relative z-10 px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-rose-600">
                Photo Gallery
              </p>
              <h2 className="font-display text-4xl font-bold text-[#4b1f2e]">
                Places for our favorite photos
              </h2>
            </div>
            <Camera className="hidden h-10 w-10 text-rose-500 sm:block" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((label, index) => (
              <div
                key={label}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/80 bg-white/70 shadow-sm backdrop-blur"
              >
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(244,63,94,0.18),rgba(251,191,36,0.18),rgba(255,255,255,0.6))]" />
                <div className="absolute inset-4 flex items-center justify-center rounded-xl border border-dashed border-rose-300/80">
                  <div className="text-center">
                    <Camera className="mx-auto mb-3 text-rose-500 transition group-hover:scale-110" />
                    <p className="font-semibold text-[#6b3a47]">{label}</p>
                    <p className="mt-1 text-sm text-[#8a5965]">Photo placeholder {index + 1}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-rose-600">
            Timeline
          </p>
          <h2 className="mb-12 font-display text-4xl font-bold text-[#4b1f2e]">
            A few memories I keep replaying
          </h2>
          <div className="relative space-y-6 before:absolute before:left-4 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-rose-200 sm:before:left-1/2">
            {memories.map((memory, index) => (
              <article
                key={memory.title}
                className={`relative grid gap-5 sm:grid-cols-2 ${
                  index % 2 === 0 ? '' : 'sm:[&>div]:col-start-2'
                }`}
              >
                <div className="rounded-2xl border border-white/80 bg-white/78 p-6 shadow-sm backdrop-blur">
                  <p className="text-sm font-bold text-rose-600">{memory.date}</p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-[#4b1f2e]">
                    {memory.title}
                  </h3>
                  <p className="mt-3 leading-7 text-[#6b3a47]">{memory.text}</p>
                </div>
                <span className="absolute left-4 top-6 h-3 w-3 -translate-x-1/2 rounded-full bg-rose-500 ring-4 ring-rose-100 sm:left-1/2" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="surprise" className="relative z-10 px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/80 bg-white/80 p-8 text-center shadow-glow backdrop-blur sm:p-12">
          <Gift className="mx-auto mb-5 h-12 w-12 text-rose-600" />
          <h2 className="font-display text-4xl font-bold text-[#4b1f2e]">
            One final birthday surprise
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#6b3a47]">
            Press the button whenever you are ready. This part is just for you.
          </p>
          <button
            type="button"
            onClick={() => setSurpriseOpen(true)}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#4b1f2e] px-7 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-rose-700"
          >
            <Sparkles size={18} />
            Reveal the surprise
          </button>
        </div>
      </section>

      <section className="relative z-10 px-5 pb-20 sm:px-8 print:px-0">
        <div className="mx-auto max-w-3xl rounded-2xl border border-rose-100 bg-white p-8 text-center shadow-sm print:shadow-none">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-rose-600">
            Printable QR Code
          </p>
          <h2 className="font-display text-3xl font-bold text-[#4b1f2e]">
            Scan for Chloe's birthday site
          </h2>
          <div className="mx-auto my-7 flex w-fit rounded-2xl border border-rose-100 bg-white p-4">
            <QRCodeCanvas value={siteUrl} size={208} includeMargin />
          </div>
          <p className="mx-auto max-w-xl text-sm leading-6 text-[#6b3a47]">
            Current QR destination: {siteUrl}
          </p>
          <button
            type="button"
            onClick={() => window.print()}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-5 py-3 font-semibold text-rose-700 transition hover:bg-rose-100 print:hidden"
          >
            <Printer size={18} />
            Print QR card
          </button>
        </div>
      </section>

      {surpriseOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#4b1f2e]/80 p-5 backdrop-blur">
          <div className="max-w-2xl rounded-[2rem] bg-white p-8 text-center shadow-2xl sm:p-12">
            <Heart className="mx-auto mb-5 h-14 w-14 text-rose-600" fill="currentColor" />
            <h2 className="font-display text-4xl font-bold text-[#4b1f2e]">
              Chloe, my wish is more days with you.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#6b3a47]">
              More songs in the car, more slow mornings, more adventures, more laughing
              until our faces hurt, and more chances to remind you that you are loved
              completely. Happy birthday, beautiful.
            </p>
            <button
              type="button"
              onClick={() => setSurpriseOpen(false)}
              className="mt-8 rounded-full bg-rose-600 px-6 py-3 font-semibold text-white transition hover:bg-rose-700"
            >
              Keep celebrating
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
