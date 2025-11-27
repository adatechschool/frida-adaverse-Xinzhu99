"use client";
import { useEffect, useState, useActionState } from "react";
import { getCategories } from "../actions/categories";
import { getClass } from "../actions/classes";
import submitProject from "../actions/projects";

export default function AddProject() {
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [classes, setClasses] = useState([]);

  //useActionState permet de recevoir le statu et le message du back suite à une action :
  //const [initialVariable, formAction] = useActionState(ationName, initialState)
  const [message, formAction] = useActionState(submitProject, null);

  //utiliser le hook useEffect pour appeler les fonctions "actions"
  useEffect(() => {
    getCategories().then(setCategories);
    getClass().then(setClasses);
  }, []);

  //utiliser useEffect pour détecter le message et fermer le modal
  useEffect(() => {
    if (message === "Projet ajouté !") {
      setTimeout(() => {
        setShowModal(false);
      }, 1000);
    }
  }, [message]);

  // const handleSubmit =  async (e) => {
  //   e.preventDefault()
  //   const formData = new FormData(e.target)
  //   const result =  await submitProject(formData)
  //   console.log(result)
  //   setMessage(result.message)
  //   setStatus(result.success)
  // }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-400 p-2 rounded-2xl hover:bg-amber-600 cursor-pointer"
      >
        Proposer un projet
      </button>

      {/*si la condition showModal est true, afficher la suite ; si est false, affiche rien */}
      {/*inset-0 : couvre tout l'écran */}
      {/* stopPropagation : éviter le clic de remonter au parent*/}

      {showModal && (
        <div
          className="modalContainer fixed inset-0 bg-black bg-opacity-25 flex flex-col justify-center items-center p-10 z-50"
          onClick={() => setShowModal(false)}
        >
          <form
            className="form bg-white p-6 rounded-lg max-w-md w-full flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
            action={formAction}
          >
            <h1>Proposer un projet</h1>
            <button
              className="bg-blue-400 p-2 rounded-2xl hover:bg-amber-600 cursor-pointer"
              onClick={() => setShowModal(false)}
            >
              Fermer
            </button>

            <div className="inputPair flex flex-col ">
              <label htmlFor="title">Titre :</label>
              <input
                type="text"
                name="title"
                id="title"
                className="bg-amber-100 rounded-lg p-2"
              />
            </div>

            <div className="inputPair flex flex-col">
              <label htmlFor="gitHub">GitHub URL :</label>
              <input
                type="url"
                name="gitHub"
                id="gitHub"
                className="bg-amber-100 rounded-lg p-2"
                required
              />
            </div>

            <div className="inputPair flex flex-col">
              <label htmlFor="demo">URL de démo :</label>
              <input
                type="url"
                name="demo"
                id="demo"
                className="bg-amber-100 rounded-lg p-2"
                required
              />
            </div>

            <div className="selectPair flex flex-col">
              <label htmlFor="class">Promo Ada :</label>
              <select name="classes" id="classes" required>
                {classes.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="selectPair flex flex-col">
              <label htmlFor="categories">Projets Ada :</label>
              <select name="categories" id="categories" required>
                {categories.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <button
              type="submit"
              className="bg-blue-400 p-2 rounded-2xl hover:bg-amber-600 cursor-pointer"
            >
              Envoyer
            </button>
            <p className="text-green-600">{message}</p>
          </form>
        </div>
      )}
    </>
  );
}
