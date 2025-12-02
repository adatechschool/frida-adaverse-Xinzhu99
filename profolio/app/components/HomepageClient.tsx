"use client";
import Link from "next/link";
import ProjectImg from "./ProjectImg";
import { useSearchParams } from "next/navigation";
import { publishProject } from "../actions/projects";
import { useState } from "react";

export default function HomepageClient({ projectsData }) {
  const params = useSearchParams();
  const input = params.get("category");

  const [message, SetMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  let filteredData = projectsData;

  if (input && input !== "tout") {
    filteredData = projectsData.filter((row) => row.catid === parseInt(input));

    console.log("filteredData", filteredData);
  }
  //gestion de bouton Publier :
  const handleSubmit = async (e) => {
    e.preventDefault();
    //communiquer le formdata
    const formData = new FormData(e.target);
    //recevoir le message
    const result = await publishProject(formData);
    SetMessage(result);
    setShowModal(true);
  };

  //
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
                  imgSrc={`${project.url}/blob/main/thumbnail.png?raw=true`}
                />
                <div className="textContainer px-4 py-2 ">
                  <h2 className="font-extrabold">{project.name}</h2>
                  
                  {project.date ? (
                    <p className="text-xs text-gray-600">
                    {new Date(project.date).toLocaleDateString("fr-FR")}
                  </p>) :(
                     <form onSubmit={handleSubmit}>
                  <input name="id" value={project.id} hidden readOnly />
                  <button type="submit">Publier</button>
                </form>
                 
                  )}
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

      {showModal && (
        <div
          className="modalContainer fixed inset-0 bg-black/50 flex flex-col justify-center items-center p-10 z-50"
          onClick={() => setShowModal(false)}
        >
          <div className=" bg-white p-6 rounded-lg max-w-md w-full flex  gap-4">
            <p>{message}</p>
            <button
              className="bg-blue-400 p-2 rounded-2xl hover:bg-amber-600 cursor-pointer"
              onClick={() => setShowModal(false)}
            >
              🗙
            </button>
          </div>
        </div>
      )}
    </>
  );
}
