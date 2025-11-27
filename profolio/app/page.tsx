import { db } from "@/lib/db/drizzle";
import HomepageClient from "./components/HomepageClient";
import { projects, classes, categories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { sql } from "drizzle-orm";
import ProjectImg from "./components/ProjectImg";

export default async function Home() {
  const data = await db.execute(sql`
        SELECT 
      cat.name as category,
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'id', p.id,
          'name', p.title,
          'class', c.name,
          'date', date(p.published_at),
          'url', p."gitHub_link"
        ) ORDER BY p.published_at DESC
      ) as projects
    FROM projects p
    LEFT JOIN classes c ON c.id = p.class_id
    LEFT JOIN categories cat ON cat.id = p.category_id
    GROUP BY cat.name
    ORDER BY cat.name
    `);

  console.log(data.rows);



  return (
    <div>
      {data.rows.map((row)=> (
        <div key={row.category} className="p-6">
          <h1 className="text-blue-700 text-3xl">{row.category}</h1>
          <div className="flex gap-4 p-4 flex-wrap">
             {row.projects.map((project)=> (
            <div key={project.id}>
              <h2 className="text-2xl">{project.name} : {project.class} le {project.date}</h2>
              <ProjectImg src={`${project.url}/blob/main/thumbnail.png?raw=true`} fallback="https://images.unsplash.com/photo-1647166545674-ce28ce93bdca?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            </div>
          )
          )}
          </div>
          </div>

      ))}
    </div>
  );
}


