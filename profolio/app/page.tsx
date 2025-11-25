import { db } from "@/lib/db/drizzle";
import HomepageClient from "./components/HomepageClient";
import { projects, classes, categories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function Home() {
  const data = await db.select({
    id: projects.id,
    class:classes.name,
    name: projects.title,
    date: projects.published_at,
    category: categories.name

  }).from(projects).leftJoin(classes, eq(classes.id, projects.class_id))
  .leftJoin(categories, eq(categories.id, projects.category_id))
  console.log(data)
  return (
    <div>

    </div>
  );
}
