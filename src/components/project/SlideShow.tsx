import type { Slide } from "~/types"

import { useEffect } from "react"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import PhotoSwipeLightbox from "photoswipe/lightbox"
import PhotoSwipe from "photoswipe"
import "photoswipe/style.css"

import { DELAY_IMAGES } from "~/lib/debug"
import { ProjectList } from "../ProjectList"

interface Props {
  slides: Slide[]
}

const SLIDE_DIMENSION = 1600

const scaleUp = ({ width, height }: { width: number; height: number }) => {
  const max = width > height ? width : height
  const scale = SLIDE_DIMENSION / max
  return {
    width: scale * width,
    height: scale * height,
  }
}

export const SlideShow: React.FC<Props> = ({ slides }) => {
  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: "#slide-show",
      children: "a",
      pswpModule: PhotoSwipe,
    })
    lightbox.init()
  }, [])

  return (
    <>
      <div
        id="slide-show"
        className="mt-8 grid w-full grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6"
      >
        {slides.map((slide) => {
          const prefix = DELAY_IMAGES
            ? `https://deelay.me/${DELAY_IMAGES}/`
            : ""

          // TODO: replace me with real asset
          const src = `${prefix}http://www.anandarooproy.com/assets/slide/image/${slide.id}/${slide.image}`
          const largeSrc = `${prefix}http://www.anandarooproy.com/assets/slide/image/${slide.id}/large/${slide.image}`

          const scaled = scaleUp(slide)

          return (
            <a
              key={slide.id}
              className=""
              href={largeSrc}
              data-pswp-width={scaled.width}
              data-pswp-height={scaled.height}
              data-cropped="true"
            >
              <img
                className="aspect-square w-full object-cover transition-transform hover:scale-[102%]"
                src={src}
                alt={slide.caption}
              />
              <div className="my-2 mb-4 lg:my-4 lg:mb-8 lg:text-lg">
                {slide.caption}
              </div>
            </a>
          )
        })}
      </div>
    </>
  )
}
