export type Client = {
  id: number
  name: string
}

export type Project = {
  id: number
  title: string
  year: string
  month: string
  description: string
  Slides: Slide[]
  TagsSlides: TagSlide[]
  Client: Client
}

export type Slide = {
  id: number
  position: number
  caption: string
  image: string
  placeholder: string
  width: number
  height: number
  Project: Project
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
