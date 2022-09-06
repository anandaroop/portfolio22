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
  TagsSlides: TagSlide[]
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
  TagsSlides: TagSlide[]
}

export type Tag = {
  id: number
  name: string
  TagsSlides: TagSlide[]
}

export type TagSlide = {
  Slide: Slide
  Tag: Tag
}
