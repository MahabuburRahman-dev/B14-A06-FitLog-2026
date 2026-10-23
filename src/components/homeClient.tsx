"use client";
import type { Workout } from "@/lib/types";
import { useEffect, useMemo, useState } from "react";
import WorkoutCard from "./WorkoutCard";
export default function HomeClient({
  workouts,
  apiError,
}: {
  workouts: Workout[];
  apiError: boolean;
}) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 450);
    return () => window.clearTimeout(t);
  }, []);
  const filtered = useMemo(
    () =>
      workouts.filter((w) =>
        `${w.name} ${w.categories.join(" ")} ${w.equipment}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [workouts, query],
  );
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">WORKOUT LIBRARY</p>
          <h1>
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>
          <p className="hero-subtitle">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a className="button button-primary" href="#library">
            {" "}
            BROWSE WORKOUTS
          </a>
        </div>
        <div className="hero-art">
          <div className="hero-glow" />
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=85"
            alt="Banner"
          />
        </div>
      </section>
      <section className="library" id="library">
        <div className="section-heading">
          <div>
            <h2>THE LIBRARY</h2>
            <p className="section-subtitle">
              Twelve lifts covering every major muscle group.
            </p>
          </div>
        </div>
        {apiError && (
          <p className="inline-alert">
            Could not reach the workout API. Showing sample workouts so you can
            still explore the app.
          </p>
        )}
        {loading ? (
          <div className="loading-grid">
            {Array.from({ length: 6 }, (_, i) => (
              <div className="skeleton" key={i}>
                <div />
                <span />
                <span />
                <span />
              </div>
            ))}
          </div>
        ) : filtered.length ? (
          <div className="workout-grid">
            {filtered.map((w) => (
              <WorkoutCard key={w.id} workout={w} />
            ))}
          </div>
        ) : (
          <div className="empty-state compact">
            <h3>NO WORKOUTS FOUND</h3>
            <p>Try another workout name or muscle group.</p>
          </div>
        )}
      </section>
    </>
  );
}
