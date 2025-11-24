"use client"
import { useState } from "react"

export default function AddProject() {
  const [showModal, setShowModal] = useState(false)
  
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
          className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-white p-6 rounded-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Proposer un projet</h2>
            <button onClick={() => setShowModal(false)}>Fermer</button>
            {/* Ton formulaire ici */}
          </div>
        </div>
      )}
    </>
  )
}