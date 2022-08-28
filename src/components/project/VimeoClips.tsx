import { Slide } from "~/types"

interface Props {
  clips: Slide[]
}

export const VimeoClips: React.FC<Props> = ({ clips }) => {
  return (
    <div>
      <h2 className="my-4 text-xl lg:my-5 lg:text-2xl">Video</h2>
      {clips.map((clip) => {
        const aspectUtilityClass = `aspect-${clip.aspect}`
        console.log(aspectUtilityClass)

        const caption = clip.caption
          .replace(
            /<iframe/,
            `<iframe class="${aspectUtilityClass} w-full lg:w-1/2"`
          )
          .replace(/width="\d+"/, "")
          .replace(/height="\d+"/, "")

        return (
          <div key={clip.id} dangerouslySetInnerHTML={{ __html: caption }} />
        )
      })}
    </div>
  )
}
