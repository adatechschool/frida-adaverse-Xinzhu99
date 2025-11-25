"use client";
import { useEffect, useState } from "react";
import { getCategories } from "../actions/categories";
import { getClass } from "../actions/classes";
import submitProject from "../actions/projects";

export default function AddProject() {
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [classes, setClasses] = useState([])

  useEffect(() => {
    getCategories().then(setCategories);
    getClass().then(setClasses)
  }, []);

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
            action={submitProject}
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
                type="text"
                name="gitHub"
                id="gitHub"
                className="bg-amber-100 rounded-lg p-2"
              />
            </div>

            <div className="inputPair flex flex-col">
              <label htmlFor="demo">URL de démo :</label>
              <input
                type="text"
                name="demo"
                id="demo"
                className="bg-amber-100 rounded-lg p-2"
              />
            </div>

            <div className="selectPair flex flex-col">
              <label htmlFor="class">Promo Ada :</label>
              <select name="classes" id="classes">
                {classes.map((item) => {
                  return <option key={item.id} value={item.id}>{item.name}</option>;
                })}
              </select>
            </div>

            <div className="selectPair flex flex-col">
              <label htmlFor="categories">Projets Ada :</label>
              <select name="categories" id="categories">
                {categories.map((item) => {
                  return <option key={item.id} value={item.id}>{item.name}</option>;
                })}
              </select>
            </div>

            <button type="submit" className="bg-blue-400 p-2 rounded-2xl hover:bg-amber-600 cursor-pointer"
            >Envoyer</button>
          </form>
        </div>
      )}
    </>
  );
}
