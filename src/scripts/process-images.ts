import sharp from "sharp"
import { readFileSync, existsSync, mkdirSync, writeFileSync } from "fs"
import { parse } from "path"
import { Slide } from "../types"
;(async function () {
  try {
    const data = JSON.parse(readFileSync("./data/data.json", "utf8"))

    const promisedSlidesWithMetadata = data.slides.map(async (slide: Slide) => {
      console.log(slide.id, slide.image)

      const inputPath = `public/slides/${slide.id}/orig/${slide.image}`
      const { name: baseName } = parse(inputPath)
      const image = sharp(inputPath)

      /* metadata */
      const metadata = await image.metadata()
      const { width, height } = metadata

      /* placeholder for blur */
      const buffer = await image
        .resize({
          width: 5,
          height: 5,
          fit: sharp.fit.cover,
        })
        .toFormat("png")
        .toBuffer()

      const placeholder = `data:image/png;base64,${buffer.toString("base64")}`
      // console.log(placeholder);

      let dirName

      /* full (force rgb) */
      dirName = `public/slides/${slide.id}/full`
      existsSync(dirName) || mkdirSync(dirName)
      image
        .resize(2000, 2000, {
          fit: sharp.fit.inside,
        })
        .toFormat("webp")
        .toFile(`public/slides/${slide.id}/full/${baseName}.webp`)
      console.log(slide.id, slide.image, "full")

      /* square 200px */
      dirName = `public/slides/${slide.id}/200-square`
      existsSync(dirName) || mkdirSync(dirName)
      image
        .resize(200, 200, {
          fit: sharp.fit.cover,
        })
        .toFormat("webp")
        .toFile(`public/slides/${slide.id}/200-square/${baseName}.webp`)
      console.log(slide.id, slide.image, "200-square")

      /* min 500px */
      dirName = `public/slides/${slide.id}/500-min`
      existsSync(dirName) || mkdirSync(dirName)
      image
        .resize(500, 500, {
          fit: sharp.fit.outside,
        })
        .toFormat("webp")
        .toFile(`public/slides/${slide.id}/500-min/${baseName}.webp`)
      console.log(slide.id, slide.image, "500-min")

      const updatedSlide = {
        ...slide,
        width,
        height,
        baseName,
        placeholder,
      }
      return updatedSlide
    })

    /* rewrite data file */
    const updatedSlides = []
    for (const p of promisedSlidesWithMetadata) {
      const slide: Slide = await p
      console.log("update slide", slide.id)
      updatedSlides.push(slide)
    }
    // console.log({ updatedSlides })

    // const timestamp = new Date()
    //   .toISOString()
    //   .replace(/\W/g, "")
    //   .replace(/\d{3}Z$/, "")
    //   .replace(/T/, ".")
    // const fileName = `./data.${timestamp}.json`
    const fileName = `./data/data.json`

    console.log("Writing...")
    const json = JSON.stringify({ ...data, slides: updatedSlides }, null, 2)

    writeFileSync(fileName, json)
    console.log("Done (ish).")
  } catch (err) {
    console.error("err", err)
  }
})()
