import { Slide } from "~/types"

interface Props {
  clips: Slide[]
}

export const VimeoClips: React.FC<Props> = ({ clips }) => {
  return (
    <div>
      <h2 className="my-4 text-xl lg:my-5 lg:text-2xl">Video</h2>
      {clips.map((clip) => {
        return (
          <>
            <iframe
              className={
                clip.aspect === "3-2"
                  ? "aspect-3-2 w-full lg:w-1/2"
                  : clip.aspect === "4-3"
                  ? "aspect-4-3 w-full lg:w-1/2"
                  : ""
              }
              src={`https://player.vimeo.com/video/${clip.vimeo_clipid}`}
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
            ></iframe>
            <div
              className="mt-2 lg:mt-4 lg:text-xl"
              dangerouslySetInnerHTML={{ __html: clip.caption }}
            />
          </>
        )
      })}
    </div>
  )
}
