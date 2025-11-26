"use server";

import { projects } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db/drizzle";

//function qui permet d'envoyer les infos formulaire pour les projets

//1- récupérer les data, vérification => Object.fromEntries() permet de récupérer tout le champ formulaire
//2- retourne status et message au front
export default async function submitProject(prevState, formData: FormData) {
  const newProject = Object.fromEntries(formData);
//   console.log("Bravo", newProject);
  try {
    if(typeof newProject.title !== "string"|| !newProject.title.trim()
    || typeof newProject.gitHub !== "string"|| !newProject.gitHub.trim()
    || typeof newProject.demo !== "string"|| !newProject.demo.trim())
        {           
        return "Champs manquants"
    }

    await db
      .insert(projects)
      .values({
        title: newProject.title,
        gitHub_link: newProject.gitHub,
        demo_link: newProject.demo,
        category_id: parseInt(newProject.categories),
        class_id: parseInt(newProject.classes),
      })
      .returning();
      revalidatePath("/");

    return "Projet ajouté !"
  } catch (error) {
    return "Problème API lors de l'ajout du formulaire"
  }

}
