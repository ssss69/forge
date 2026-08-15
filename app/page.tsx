"use client";

import { useMemo, useState } from "react";

const onboarding = [
  "Age",
  "Occupation",
  "Student or professional",
  "Primary goal",
  "Exam or career target",
  "Workout goals",
  "Sleep schedule",
  "Screen time",
  "Biggest distractions",
  "Working style",
  "Favorite music",
  "Focus duration",
];

const stats = [
  ["Discipline", 84, "+12%"],
  ["Knowledge", 71, "+8%"],
  ["Health", 63, "+16%"],
  ["Creativity", 58, "+5%"],
  ["Consistency", 91, "+21%"],
  ["Energy", 76, "+9%"],
];

const missions = [
  { title: "Complete Physics revision", xp: 120, coin: 80, status: "Next" },
  { title: "45 min deep work sprint", xp: 90, coin: 60, status: "Ready" },
  { title: "Evening workout", xp: 140, coin: 100, status: "6:30 PM" },
];

const apps = [
  { name: "Instagram", cost: 150, rule: "Unlock after Physics + workout" },
  { name: "TikTok", cost: 250, rule: "Unlock after weekly challenge" },
  { name: "YouTube", cost: 80, rule: "Unlock for learning playlist first" },
];

const analytics = [
  ["Focus Score", "88", "Peak window 8:20-10:40 AM"],
  ["Time Saved", "14.2h", "This week vs baseline"],
  ["Recovery", "79", "Sleep debt down 11%"],
  ["Prediction", "92%", "Goal pace for Sunday"],
];

const communities = ["JEE", "Developers", "Entrepreneurs", "Writers"];

export default function Home() {
  const [focus, setFocus] = useState(45);
  const [strict, setStrict] = useState(true);

  const selectedReward = useMemo(() => {
    if (focus >= 90) return "Rare badge: Flow State";
    if (focus >= 60) return "120 XP + 90 Focus Coins";
    return "70 XP + 45 Focus Coins";
  }, [focus]);

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--page)] text-[var(--ink)]">
      <div className="ambient ambient-a" />
      <div className="ambient ambient-b" />

      <nav className="nav-shell" aria-label="Primary navigation">
        <a className="brand-lockup" href="#top" aria-label="Forge home">
          <span className="brand-mark">F</span>
          <span>Forge</span>
        </a>
        <div className="nav-links">
          <a href="#focus">Focus</a>
          <a href="#intelligence">Intelligence</a>
          <a href="#coach">AI Coach</a>
          <a href="#pricing">Pricing</a>
        </div>
        <a className="nav-action" href="#onboarding">Start plan</a>
      </nav>

      <section id="top" className="hero-shell">
        <div className="hero-copy">
          <p className="eyebrow">Personal growth operating system</p>
          <h1>Forge turns discipline into a daily game you actually want to play.</h1>
          <p className="hero-text">
            Goals, focus, adaptive blocking, AI coaching, RPG progress, habits,
            analytics, and community accountability in one calm premium workspace.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#dashboard">Explore Forge</a>
            <a className="secondary-button" href="#architecture">View build plan</a>
          </div>
        </div>

        <section id="dashboard" className="phone-frame" aria-label="Forge home dashboard preview">
          <div className="phone-status">
            <span>8:24</span>
            <span>Focus ready</span>
          </div>
          <div className="home-card hero-card">
            <p>Good morning, Arya</p>
            <h2>Crack JEE Advanced with calm consistency.</h2>
            <div className="progress-ring" aria-label="Today's progress 72 percent">
              <span>72%</span>
            </div>
          </div>
          <div className="metric-grid">
            <Metric label="Streak" value="18d" />
            <Metric label="Level" value="24" />
            <Metric label="XP" value="1,840" />
            <Metric label="Focus" value="3.6h" />
            <Metric label="Mood" value="Clear" />
            <Metric label="Sleep" value="82" />
          </div>
          <div className="next-task">
            <span>Next important task</span>
            <strong>Physics: Rotational dynamics</strong>
            <button type="button">Start focus</button>
          </div>
        </section>
      </section>

      <section id="onboarding" className="section-shell split-section">
        <div>
          <p className="eyebrow">Conversational onboarding</p>
          <h2>One question at a time, then a complete daily operating plan.</h2>
          <p>
            Forge avoids the form fatigue trap. It gathers the essentials gently,
            then generates a routine, focus schedule, habit plan, blocking rules,
            rewards, and milestones.
          </p>
        </div>
        <div className="chat-panel">
          {onboarding.slice(0, 5).map((item, index) => (
            <div className="chat-row" key={item}>
              <span>{index + 1}</span>
              <p>{item}</p>
            </div>
          ))}
          <div className="ai-plan">
            <strong>AI plan generated</strong>
            <p>45 min study sprint, 10 min reset, gym at 6:30 PM, socials unlock after mission stack.</p>
          </div>
        </div>
      </section>

      <section id="focus" className="section-shell">
        <div className="section-heading">
          <p className="eyebrow">Deep Focus Mode</p>
          <h2>Distraction-free sessions with rewards, breaks, and graceful emergency paths.</h2>
        </div>
        <div className="focus-grid">
          <div className="focus-control">
            <div className="duration-row" role="group" aria-label="Choose focus duration">
              {[25, 45, 60, 90, 180].map((value) => (
                <button
                  className={focus === value ? "active" : ""}
                  key={value}
                  onClick={() => setFocus(value)}
                  type="button"
                >
                  {value === 180 ? "3h" : `${value}m`}
                </button>
              ))}
            </div>
            <div className="timer-orbit">
              <span>{focus}</span>
              <small>minutes</small>
            </div>
            <label className="toggle-row">
              <input checked={strict} onChange={() => setStrict(!strict)} type="checkbox" />
              <span>Strict Mode</span>
            </label>
            <p className="reward-line">{selectedReward}</p>
          </div>
          <div className="blocking-panel">
            <h3>Adaptive app blocking</h3>
            {apps.map((app) => (
              <div className="app-cost" key={app.name}>
                <div>
                  <strong>{app.name}</strong>
                  <span>{app.rule}</span>
                </div>
                <b>{app.cost}</b>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell rpg-section">
        <div className="section-heading">
          <p className="eyebrow">RPG progression</p>
          <h2>Real achievements become levels, stats, titles, missions, and seasonal rewards.</h2>
        </div>
        <div className="rpg-grid">
          <div className="stats-panel">
            {stats.map(([label, value, change]) => (
              <div className="stat-row" key={label}>
                <div>
                  <strong>{label}</strong>
                  <span>{change}</span>
                </div>
                <div className="bar"><i style={{ width: `${value}%` }} /></div>
              </div>
            ))}
          </div>
          <div className="missions-panel">
            <h3>Daily missions</h3>
            {missions.map((mission) => (
              <article className="mission-card" key={mission.title}>
                <span>{mission.status}</span>
                <strong>{mission.title}</strong>
                <p>{mission.xp} XP / {mission.coin} coins</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="coach" className="section-shell coach-band">
        <div>
          <p className="eyebrow">AI Coach</p>
          <h2>Personal coaching that adapts before motivation collapses.</h2>
        </div>
        <div className="coach-card">
          <span>Coach insight</span>
          <p>
            Your focus is strongest before 11 AM. Move chemistry notes earlier,
            shorten the afternoon sprint to 25 minutes, and take a real recovery break tonight.
          </p>
        </div>
        <div className="future-card">
          <span>Future Self</span>
          <p>When you try to unlock socials mid-focus, Forge can play your own short message first.</p>
        </div>
      </section>

      <section id="intelligence" className="section-shell">
        <div className="section-heading">
          <p className="eyebrow">Productivity intelligence</p>
          <h2>Screen time becomes predictive insight, not guilt.</h2>
        </div>
        <div className="analytics-grid">
          {analytics.map(([label, value, note]) => (
            <div className="analytics-card" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <p>{note}</p>
            </div>
          ))}
        </div>
        <div className="dna-panel">
          <div>
            <p className="eyebrow">Habit DNA</p>
            <h3>Best routine: 8:20 AM study, 6:30 PM workout, 10:45 PM shutdown.</h3>
          </div>
          <div className="dna-chart" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      </section>

      <section className="section-shell ecosystem">
        <div>
          <p className="eyebrow">Communities and marketplace</p>
          <h2>Accountability, live focus rooms, creator plans, and friendly competition.</h2>
        </div>
        <div className="community-grid">
          {communities.map((community, index) => (
            <article key={community}>
              <span>#{index + 1}</span>
              <strong>{community}</strong>
              <p>Live sessions, guilds, leaderboards, and weekly challenges.</p>
            </article>
          ))}
        </div>
      </section>

      <section id="pricing" className="section-shell pricing-section">
        <div className="section-heading">
          <p className="eyebrow">Monetization</p>
          <h2>Free to start, Pro for the full growth system, Ultimate for families and teams.</h2>
        </div>
        <div className="pricing-grid">
          <Plan name="Free" price="$0" features={["Basic blocking", "Focus timer", "Limited AI", "One goal"]} />
          <Plan name="Pro" price="$12" featured features={["Unlimited goals", "Advanced analytics", "AI Coach", "Habit DNA", "Communities"]} />
          <Plan name="Ultimate" price="$29" features={["Family dashboards", "Teams", "Schools", "Premium AI", "Reports"]} />
        </div>
      </section>

      <section id="architecture" className="section-shell roadmap-section">
        <p className="eyebrow">Production path</p>
        <h2>Flutter clients, Supabase/Postgres, realtime sync, AI orchestration, subscriptions, and admin operations.</h2>
        <div className="roadmap-grid">
          {["Mobile apps", "Backend", "AI layer", "Growth"].map((item) => (
            <div key={item}>{item}</div>
          ))}
        </div>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Plan({
  name,
  price,
  features,
  featured = false,
}: {
  name: string;
  price: string;
  features: string[];
  featured?: boolean;
}) {
  return (
    <article className={`plan-card ${featured ? "featured" : ""}`}>
      <span>{name}</span>
      <strong>{price}<small>/mo</small></strong>
      {features.map((feature) => (
        <p key={feature}>{feature}</p>
      ))}
    </article>
  );
}
