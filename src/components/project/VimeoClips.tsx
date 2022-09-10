import { Slide } from "~/types"

interface Props {
  clips: Slide[]
}

export const VimeoClips: React.FC<Props> = ({ clips }) => {
  return (
    <div>
      <h2 className="my-4 text-xl lg:my-5 lg:text-2xl">Video</h2>
      {clips.map((clip, i) => {
        return (
          <div key={i} className="w-full lg:w-1/2">
            <div
              className={
                clip.aspect === "3-2"
                  ? "aspect-w-3 aspect-h-2"
                  : clip.aspect === "4-3"
                  ? "aspect-w-4 aspect-h-3"
                  : ""
              }
            >
              <iframe
                className="w-full"
                src={`https://player.vimeo.com/video/${clip.vimeo_clipid}`}
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>
            <div
              className="mt-2 lg:mt-4 lg:text-xl"
              dangerouslySetInnerHTML={{ __html: clip.caption }}
            />
          </div>
        )
      })}
    </div>
  )
}
