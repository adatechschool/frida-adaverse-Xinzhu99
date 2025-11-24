"use client"
import { useState } from "react"

export default function HomepageClient () {
    const [showModal, setShowModal] = useState(false)
    return (
        <>  
        <header>
            <button onClick={()=>setShowModal(!showModal)}
            className="bg-amber-200 p-2 rounded-2xl hover:bg-amber-500 cursor-pointer">Proposer un projet</button>
        </header>

        {showModal ? null : (<div className="projectsContainer">Liste des projets : </div>)}

        {showModal ? (<div className="popup">Mon pop-up</div>) : null}
        </>
    )
}