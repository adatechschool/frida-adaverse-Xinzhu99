"use client";
import Link from "next/link";
import ProjectImg from "./ProjectImg";
import { useSearchParams } from "next/navigation";

export default function HomepageClient({ projectsData }) {
  const params = useSearchParams();
  const input = params.get("category");

  let filteredData = projectsData
  
  if (input) {
     filteredData = projectsData.filter(
      (row) => row.catid === parseInt(input)
    );

    console.log("filteredData", filteredData);
  } 

  return (
    <>
      {filteredData.map((row) => (
        <div key={row.category} className="p-6">
          <h1 className="text-black text-3xl font-extrabold">{row.category}</h1>

          <div className="flex gap-4 p-4 flex-wrap">
            {row.projects.map((project) => (
              <div
                key={project.id}
                className="cardContainer flex flex-col shadow-lg relative"
              >
                <p className="class absolute top-0 right-0 z-10 text-white bg-pink-300  px-1  ">
                  {project.class}
                </p>
                <ProjectImg
                  src={`${project.url}/blob/main/thumbnail.png?raw=true`}
                  fallback="/placeholder.jpeg"
                />
                <div className="textContainer px-4 py-2 ">
                  <h2 className="font-extrabold">{project.name}</h2>
                  <p className="text-xs text-gray-600">
                    {new Date(project.date).toLocaleDateString("fr-FR")}
                  </p>
                </div>
                <Link
                  href={`project/${project.id}`}
                  className="py-2 px-5  hover:text-pink-400 cursor-pointer"
                >
                  Voir le projet
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
