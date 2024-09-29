export function Mute({
    mute,
    muted,
    cursor
  }: {
    mute?: React.MouseEventHandler<SVGSVGElement>;
    muted: boolean;
    cursor?:boolean
  }) {
    let clString = muted
      ? "cursor-pointer"
      : "rounded-full p-2 bg-[#76ABAE] text-[#EEEEEE] cursor-pointer";
      if(!cursor){
        clString = clString.replace("cursor-pointer", "")
      }
    return (
      <>
        <div className={clString}>
          {!muted && <MicSvg onClick={mute} />}
          {muted && <MicSlashSvg onClick={mute} className="size-6 fill-[#EEEEEE]" />}
        </div>
      </>
    );
  }
  export function OffCam({
    off,
    offed,
    cursor
  }: {
    off?: React.MouseEventHandler<SVGSVGElement>;
    offed: boolean;
    cursor?:boolean
  }) {
    let clString = offed
      ? "cursor-pointer"
      : "rounded-full p-2 bg-[#76ABAE] text-[#EEEEEE] cursor-pointer";
      if(!cursor){
        clString = clString.replace("cursor-pointer", "")
      }
    return (
      <div className={clString}>
        {!offed && <VideoSvg className="size-6" onClick={off} />}
        {offed && <VideoSlashSvg onClick={off} />}
      </div>
    );
  }
  export function VideoSvg(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
        />
      </svg>
    );
  }
  
  export function MicSvg(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
        />
      </svg>
    );
  }
  
  function VideoSlashSvg(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M12 18.75H4.5a2.25 2.25 0 0 1-2.25-2.25V9m12.841 9.091L16.5 19.5m-1.409-1.409c.407-.407.659-.97.659-1.591v-9a2.25 2.25 0 0 0-2.25-2.25h-9c-.621 0-1.184.252-1.591.659m12.182 12.182L2.909 5.909M1.5 4.5l1.409 1.409"
        />
      </svg>
    );
  }
  
  function MicSlashSvg(props: React.SVGProps<SVGSVGElement>){
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" {...props}>
        <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2s-6.3 25.5 4.1 33.7l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L472.1 344.7c15.2-26 23.9-56.3 23.9-88.7v-40c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 21.2-5.1 41.1-14.2 58.7L416 300.8V96c0-53-43-96-96-96s-96 43-96 96v54.3L38.8 5.1zM344 430.4c20.4-2.8 39.7-9.1 57.3-18.2l-43.1-33.9c-12.1 3.7-24.9 5.7-38.2 5.7-70.7 0-128-57.3-128-128v-8.7L144.7 210c-.5 1.9-.7 3.9-.7 6v40c0 89.1 66.2 162.7 152 174.4V464h-48c-13.3 0-24 10.7-24 24s10.7 24 24 24h144c13.3 0 24-10.7 24-24s-10.7-24-24-24h-48v-33.6z" />
      </svg>
    )
  }