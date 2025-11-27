import { db } from "@/lib/db/drizzle";
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
          <h1 className="text-black text-3xl font-extrabold">{row.category}</h1>

          <div className="flex gap-4 p-4 flex-wrap">
             {row.projects.map((project)=> (

            <div key={project.id} className="cardContainer flex flex-col shadow-lg relative">
              <p className="class absolute top-0 right-0 z-10 text-white bg-pink-300  px-1  ">{project.class}</p>
              <ProjectImg src={`${project.url}/blob/main/thumbnail.png?raw=true`} fallback="https://images.unsplash.com/photo-1647166545674-ce28ce93bdca?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
              <div className="textContainer px-4 py-2 ">
                <h2 className="font-extrabold">{project.name}</h2>
                <p className="text-xs text-gray-600">{project.date}</p>
              </div>
            </div>
          )
          )}
          </div>
          </div>

      ))}
    </div>
  );
}


