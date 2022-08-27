import type { Project } from "~/types"

import slugify from "@sindresorhus/slugify"

export function getSlugFromProject(
  project: Partial<Project> & Pick<Project, "title" | "id">
): string {
  return [project.id, slugify(project.title)].join("-")
}

export function getIdFromSlug(slug: string): string {
  return slug.split("-")[0]
}
