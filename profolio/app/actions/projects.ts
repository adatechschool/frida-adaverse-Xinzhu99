"use server";

import { projects } from "@/lib/db/schema";
import { refresh, revalidatePath } from "next/cache";
import { db } from "@/lib/db/drizzle";
import { eq } from "drizzle-orm";



//function qui permet d'envoyer les infos formulaire pour les projets

//1- récupérer les data, vérification => Object.fromEntries() permet de récupérer tout le champ formulaire
//2- retourne le message au front
export default async function submitProject(prevState, formData: FormData) {
  const newProject = Object.fromEntries(formData);
  console.log("Bravo", newProject);
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
        title: (newProject.title).charAt(0).toUpperCase() + (newProject.title).slice(1),
        gitHub_link: newProject.gitHub,
        demo_link: newProject.demo,
        category_id: parseInt(newProject.category),
        class_id: parseInt(newProject.classes),
      })
      .returning();
      revalidatePath("/");
      
      return "Projet ajouté !"
    } catch (error) {
      return "Problème API lors de l'ajout du formulaire"
    }
  }

//action pour mettre à jour la date de publication de mes projets

export async function publishProject(formData: FormData) {
  const projectId = parseInt(formData.get("id"))
  try {
    await db.update(projects)
    .set({ published_at: new Date()})
    .where(eq(projects.id, projectId))
    .returning()

    revalidatePath("/")

    return "Date ajoutée !"
  
  } catch (error) {
    return "Problème API lors de la modification"
  }

}
  