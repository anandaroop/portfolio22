export type Client = {
  id: number
  name: string
  Projects: Project[]
}

export type Project = {
  id: number
  title: string
  subtitle: string
  year: string
  month: string
  description: string
  visible: boolean
  featured: boolean
  Slides: Slide[]
  Client: Client
}

export type Slide = {
  id: number
  position: number
  caption: string
  clip: number
  vimeo_clipid: string
  aspect: string
  image: string
  baseName: string
  placeholder: string
  width: number
  height: number
  Project: Project
  tags: string[]
}

export type Tag = {
  /* id is meaningless, since this not a relation any more */
  id: number
  name: string
}
