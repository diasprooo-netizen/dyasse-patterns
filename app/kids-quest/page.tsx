import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Ahla Kids Quest | 50-Level Family Gamified System",
  description:
    "A premium hybrid printable and web app system that turns kids' daily routines into a 50-level quest adventure inside the Ahla gamified ecosystem.",
}

const worlds = [
  {
    title: "World 1",
    name: "The Hero Academy",
    levels: "Levels 1–10",
    focus: "Basic hygiene, morning wins, and tiny confidence loops.",
  },
  {
    title: "World 2",
    name: "The Room Ranger",
    levels: "Levels 11–20",
    focus: "Room ownership, simple cleanup quests, and visual progress.",
  },
  {
    title: "World 3",
    name: "The Family Sidekick",
    levels: "Levels 21–30",
    focus: "Helping, teamwork, empathy, and family contribution.",
  },
  {
    title: "World 4",
    name: "The Focus Explorer",
    levels: "Levels 31–40",
    focus: "Homework, reading, patience, and screen-time transitions.",
  },
  {
    title: "World 5",
    name: "The Ahla Legend",
    levels: "Levels 41–50",
    focus: "Independence, reward mastery, and final boss routines.",
  },
]

const toolkit = [
  {
    title: "Master Quest Board",
    text: "A printable board parents can place on the fridge, bedroom wall, or binder cover.",
  },
  {
    title: "Daily Quest Cards",
    text: "Cut-out cards for routines like brushing teeth, making the bed, reading, and helping.",
  },
  {
    title: "50-Level Coloring Map",
    text: "The child colors one node after every level unlocked inside the Ahla app.",
  },
  {
    title: "Reward Menu",
    text: "A parent-approved reward system that keeps motivation high without chaos.",
  },
  {
    title: "App Onboarding Page",
    text: "A clean instruction page with VIP code, app access, and setup flow.",
  },
  {
    title: "Custom Quest Builder",
    text: "Blank cards and fields for parents to create their own XP-based quests.",
  },
]

const appFlow = [
  {
    step: "01",
    title: "Parent creates account",
    text: "One parent login controls family setup, kids profiles, rewards, and quest rules.",
  },
  {
    step: "02",
    title: "Kid chooses profile",
    text: "Each child gets a simple profile with avatar, XP, current level, and active quests.",
  },
  {
    step: "03",
    title: "Quest completed",
    text: "The child taps Done, the parent can approve, and XP gets added to progress.",
  },
  {
    step: "04",
    title: "Level unlocked",
    text: "The app celebrates the win, then the child colors the matching node in the PDF map.",
  },
]

const schema = [
  {
    table: "parents",
    fields: "id, email, created_at",
    purpose: "Main parent account connected to Supabase Auth.",
  },
  {
    table: "kids",
    fields: "id, parent_id, display_name, avatar_key, current_xp, current_level",
    purpose: "Netflix-style child profiles inside one parent account.",
  },
  {
    table: "quests",
    fields: "id, kid_id, title, xp_reward, frequency, is_active",
    purpose: "Reusable quest templates and parent-created tasks.",
  },
  {
    table: "quest_events",
    fields: "id, kid_id, quest_id, xp_delta, approved_by_parent, created_at",
    purpose: "XP history, completion tracking, and parent approval log.",
  },
]

function LevelDots() {
  return (
    <div className="grid grid-cols-10 gap-2">
      {Array.from({ length: 50 }, (_, index) => {
        const level = index + 1
        const isBoss = level % 10 === 0

        return (
          <div
            key={level}
            className={[
              "flex aspect-square items-center justify-center rounded-full border text-[11px] font-black shadow-sm",
              isBoss
                ? "border-amber-300 bg-amber-300 text-slate-950 shadow-amber-300/30"
                : "border-white/15 bg-white/8 text-white/80",
            ].join(" ")}
            aria-label={`Level ${level}`}
          >
            {level}
          </div>
        )
      })}
    </div>
  )
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-cyan-200">
      {children}
    </div>
  )
}

export default function KidsQuestPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <section className="relative isolate px-6 py-10 sm:px-10 lg:px-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.22),transparent_34%),radial-gradient(circle_at_top_right,rgba(251,191,36,0.16),transparent_30%),linear-gradient(180deg,#0f172a_0%,#020617_100%)]" />
        <div className="mx-auto max-w-7xl">
          <nav className="mb-14 flex items-center justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-200">dias studio</p>
              <p className="mt-1 text-xs text-white/45">Ahla Gamified Ecosystem</p>
            </div>

            <div className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-white/70 sm:block">
              Family Mode Extension
            </div>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-300/25 bg-amber-300/10 px-4 py-2 text-sm font-bold text-amber-100">
                <span>✨</span>
                50-Level Kids Quest System
              </div>

              <h1 className="max-w-4xl text-5xl font-black tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
                Turn daily routines into a real family adventure.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">
                Ahla Kids Quest is a premium hybrid system: a printable PDF kit for the real world, connected to a
                gamified web app engine that tracks XP, levels, child profiles, rewards, and progress.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#product-system"
                  className="rounded-full bg-cyan-300 px-6 py-3 text-center text-sm font-black text-slate-950 shadow-xl shadow-cyan-300/20 transition hover:scale-[1.02]"
                >
                  Explore the Product System
                </a>
                <a
                  href="#app-architecture"
                  className="rounded-full border border-white/15 bg-white/6 px-6 py-3 text-center text-sm font-black text-white transition hover:bg-white/10"
                >
                  View App Architecture
                </a>
              </div>

              <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
                {["PDF Controller", "Web App Engine", "Ahla XP Logic"].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm font-bold text-white/75">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-cyan-950/40 backdrop-blur">
              <div className="rounded-[1.5rem] border border-white/10 bg-slate-900 p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-200">Kid Profile</p>
                    <h2 className="mt-1 text-2xl font-black">Lina's Quest</h2>
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-300 text-2xl shadow-lg shadow-amber-300/20">
                    🦊
                  </div>
                </div>

                <div className="rounded-3xl bg-white p-5 text-slate-950">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-black">Current Level</p>
                    <p className="rounded-full bg-slate-950 px-3 py-1 text-xs font-black text-white">Level 12</p>
                  </div>

                  <div className="mt-4">
                    <div className="mb-2 flex justify-between text-xs font-bold text-slate-500">
                      <span>XP Progress</span>
                      <span>620 / 750 XP</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full w-[82%] rounded-full bg-cyan-400" />
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3">
                    {[
                      ["Brush teeth", "+25 XP", "Done"],
                      ["Make bed", "+50 XP", "Active"],
                      ["Read 15 min", "+100 XP", "Locked"],
                    ].map(([quest, xp, status]) => (
                      <div key={quest} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-3">
                        <div>
                          <p className="text-sm font-black">{quest}</p>
                          <p className="text-xs font-bold text-slate-500">{xp}</p>
                        </div>
                        <span className="rounded-full bg-slate-950 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white">
                          {status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-4">
                  <p className="text-sm font-bold leading-6 text-cyan-50">
                    App win = color one circle in the printed 50-level map. Digital progress and physical progress stay
                    connected.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="product-system" className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Product Strategy</SectionLabel>

          <div className="grid gap-5 lg:grid-cols-3">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7">
              <p className="mb-4 text-4xl">📄</p>
              <h2 className="text-2xl font-black tracking-[-0.03em]">PDF = Physical Controller</h2>
              <p className="mt-3 leading-7 text-white/62">
                The printable kit gives parents something tangible: boards, cards, maps, rewards, and routines that live
                outside the screen.
              </p>
            </div>

            <div className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-7">
              <p className="mb-4 text-4xl">🎮</p>
              <h2 className="text-2xl font-black tracking-[-0.03em]">App = XP Engine</h2>
              <p className="mt-3 leading-7 text-white/68">
                The Ahla app calculates XP, unlocks levels, saves progress, and creates the game-like dopamine loop.
              </p>
            </div>

            <div className="rounded-[2rem] border border-amber-300/20 bg-amber-300/10 p-7">
              <p className="mb-4 text-4xl">🏆</p>
              <h2 className="text-2xl font-black tracking-[-0.03em]">Ahla = Retention Layer</h2>
              <p className="mt-3 leading-7 text-white/68">
                Instead of one-time PDF sales, buyers enter the Ahla ecosystem through updates, VIP access, and future
                family tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Printable Toolkit</SectionLabel>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {toolkit.map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.055] p-6">
                <h3 className="text-xl font-black">{item.title}</h3>
                <p className="mt-3 leading-7 text-white/58">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionLabel>50-Level Journey</SectionLabel>
            <h2 className="text-4xl font-black tracking-[-0.05em] sm:text-5xl">
              One simple map. Five worlds. Fifty tiny wins.
            </h2>
            <p className="mt-5 max-w-xl leading-8 text-white/62">
              Every 10 levels becomes a world. Level 10, 20, 30, 40, and 50 can become boss-battle milestones with bigger
              family rewards.
            </p>

            <div className="mt-7 grid gap-3">
              {worlds.map((world) => (
                <div key={world.name} className="rounded-3xl border border-white/10 bg-white/[0.055] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
                        {world.title} · {world.levels}
                      </p>
                      <h3 className="mt-1 text-xl font-black">{world.name}</h3>
                    </div>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/65">10 levels</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/55">{world.focus}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5">
            <div className="rounded-[1.5rem] bg-slate-900 p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-amber-200">Printable Map Preview</p>
                  <h3 className="mt-1 text-2xl font-black">Color after every app level</h3>
                </div>
                <div className="rounded-full bg-amber-300 px-4 py-2 text-xs font-black text-slate-950">50 Levels</div>
              </div>
              <LevelDots />
              <p className="mt-5 rounded-2xl bg-white/8 p-4 text-sm leading-6 text-white/58">
                Boss levels are highlighted. Parents can connect each boss level to a bigger reward, family activity, or
                celebration moment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="app-architecture" className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>App Architecture</SectionLabel>

          <div className="grid gap-5 lg:grid-cols-4">
            {appFlow.map((item) => (
              <div key={item.step} className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-6">
                <p className="text-sm font-black text-cyan-200">{item.step}</p>
                <h3 className="mt-4 text-xl font-black">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/56">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.055] p-6">
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-3xl font-black tracking-[-0.04em]">Supabase Database Blueprint</h2>
                <p className="mt-2 max-w-2xl text-white/58">
                  Clean starter schema for parent login, kid profiles, quests, XP events, and progress history.
                </p>
              </div>
              <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black text-cyan-100">
                Ready for Auth + RLS later
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {schema.map((item) => (
                <div key={item.table} className="rounded-3xl border border-white/10 bg-slate-950/55 p-5">
                  <h3 className="font-mono text-lg font-black text-amber-200">{item.table}</h3>
                  <p className="mt-3 font-mono text-xs leading-6 text-cyan-100/75">{item.fields}</p>
                  <p className="mt-3 text-sm leading-6 text-white/55">{item.purpose}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-amber-300/20 bg-gradient-to-br from-amber-300/20 via-white/[0.06] to-cyan-300/10 p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.26em] text-amber-100">VIP Access</p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] sm:text-5xl">
                Built to enter the Ahla ecosystem, not disappear after download.
              </h2>
              <p className="mt-5 max-w-2xl leading-8 text-white/66">
                The PDF should include a VIP access page. The customer buys the printable kit, then enters the app using
                the included access code to activate the digital quest experience.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-6">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-200">Buyer Code</p>
              <div className="mt-4 rounded-2xl bg-white p-5 text-center font-mono text-2xl font-black tracking-wider text-slate-950">
                DIAS-KIDS-VIP
              </div>
              <p className="mt-4 text-sm leading-6 text-white/55">
                Use this as the printable PDF bonus code, then connect it later to Supabase for access validation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-white/45 sm:px-10 lg:px-16">
        © 2026 dias studio. Ahla Kids Quest is designed as a printable and app-based family routine system. Personal use
        only.
      </footer>
    </main>
  )
}
