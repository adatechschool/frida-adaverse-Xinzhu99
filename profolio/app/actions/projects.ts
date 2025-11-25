"use server";

import { projects } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db/drizzle";

//function qui permet d'envoyer les infos formulaire pour les projets
export default async function submitProject(formData: FormData) {
  const newProject = Object.fromEntries(formData);
  console.log("wawawawa", newProject.title);
  try {
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

    return;
  } catch (error) {
    console.error("Problème API lors de l'ajout du formulaire", error);
  }
  revalidatePath("/");
}
