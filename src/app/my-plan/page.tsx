"use client";
import { useFitLog } from "@/components/store";
import type { Workout } from "@/lib/types";
import {
  ArrowUpRight,
  Check,
  Clock3,
  Dumbbell,
  Flame,
  Star,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function MyPlanPage() {
  const { plan, saved, done, removePlan, removeSaved, toggleDone } =
    useFitLog();
  const [tab, setTab] = useState<"plan" | "saved">("plan");
  const [sort, setSort] = useState("duration");
  const [query, setQuery] = useState("");
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("tab") === "saved")
      setTab("saved");
  }, []);
  const items = tab === "plan" ? plan : saved;
  const sorted = useMemo(
    () =>
      items
        .filter((w) =>
          `${w.name} ${w.categories.join(" ")} ${w.equipment}`
            .toLowerCase()
            .includes(query.toLowerCase()),
        )
        .slice()
        .sort((a, b) =>
          sort === "duration"
            ? a.duration - b.duration
            : sort === "calories"
              ? a.calories - b.calories
              : b.rating - a.rating,
        ),
    [items, sort, query],
  );

  const minutes = items.reduce((total, workout) => total + workout.duration, 0);

  const calories = items.reduce(
    (total, workout) => total + workout.calories,
    0,
  );

  const exercises = items.length;

  return (
    <div className="plan-page">
      <div className="plan-heading">
        <div>
          <h1>MY PLAN</h1>
          <p className="section-subtitle">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>
        <span className="plan-cap">
          {plan.length} <i>/</i> 5 LIFTS
        </span>
      </div>
      <div className="metrics">
        <div>
          <span>Exercises</span>
          <strong className="lime-text">{exercises}</strong>
        </div>
        <div>
          <span>Minutes</span>
          <strong>{minutes}</strong>
        </div>
        <div>
          <span>Calories</span>
          <strong>{calories}</strong>
        </div>
      </div>
      <div className="plan-toolbar">
        <div className="tabs">
          <button
            className={tab === "plan" ? "tab active" : "tab"}
            onClick={() => setTab("plan")}
          >
            Today&apos;s Plan <span>{plan.length}</span>
          </button>
          <button
            className={tab === "saved" ? "tab active" : "tab"}
            onClick={() => setTab("saved")}
          >
            Saved <span>{saved.length}</span>
          </button>
        </div>
        <div className="toolbar-right">
          <label className="sort-label">
            Sort by{" "}
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </label>
        </div>
      </div>
      {sorted.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <Dumbbell size={26} />
          </div>
          <h2>NOTHING HERE YET</h2>
          <p>
            {query
              ? "No workouts match your search."
              : "Browse the library and add a lift to get today moving."}
          </p>
          <Link className="button button-primary" href="/">
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="plan-list">
          {sorted.map((w) => (
            <PlanItem
              key={w.id}
              workout={w}
              tab={tab}
              isDone={done.includes(w.id)}
              onRemove={() =>
                tab === "plan" ? removePlan(w.id) : removeSaved(w.id)
              }
              onDone={() => toggleDone(w.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
function PlanItem({
  workout: w,
  tab,
  isDone,
  onRemove,
  onDone,
}: {
  workout: Workout;
  tab: "plan" | "saved";
  isDone: boolean;
  onRemove: () => void;
  onDone: () => void;
}) {
  return (
    <article
      className={`plan-item ${isDone && tab === "plan" ? "is-done" : ""}`}
    >
      <Link href={`/workout/${w.id}`} className="plan-thumb">
        <img src={w.image} alt="" />
      </Link>
      <div className="plan-item-main">
        <div className="tags">
          {w.categories.slice(0, 2).map((c) => (
            <span className="tag" key={c}>
              {c}
            </span>
          ))}
        </div>
        <Link href={`/workout/${w.id}`} className="plan-item-title">
          {w.name}
        </Link>
        <p>{w.equipment}</p>
        <div className="stats">
          <span>
            <Clock3 />
            {w.duration} min
          </span>
          <span>
            <Flame />
            {w.calories} kcal
          </span>
          <span>
            <Star />
            {w.rating.toFixed(1)}
          </span>
        </div>
      </div>
      <div className="plan-item-actions">
        <Link
          className="button button-secondary button-small"
          href={`/workout/${w.id}`}
        >
          View Details <ArrowUpRight size={14} />
        </Link>
        {tab === "plan" && (
          <button
            className={`button button-small ${isDone ? "button-done" : "button-primary"}`}
            onClick={onDone}
          >
            <Check size={15} />
            {isDone ? "Done" : "Mark as Done"}
          </button>
        )}
        <button
          className="icon-button"
          onClick={onRemove}
          aria-label="Remove workout"
        >
          <X size={17} />
        </button>
      </div>
    </article>
  );
}
