import HomeClient from "@/components/homeClient";
import { fetchWorkouts } from "@/lib/workouts";

export default async function HomePage() {
  const workouts = await fetchWorkouts();

  return <HomeClient workouts={workouts} />;
}
