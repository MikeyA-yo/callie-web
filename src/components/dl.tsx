import { links } from "./Intro"

export default function Dl(){
    return (
        <>
          <div className="bg-[#222831] flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col gap-2 p-4 bg-[#31363F] rounded">
              {link.map((l, i)=>{
                return (
                    <a href={l} key={i} download={"Callie"} className="bg-[#76ABAE] p-2" >
                        Download for {os[i]} (zip)
                    </a>
                )
              })}
            </div>
          </div>
        </>
    )
}
const link = Object.values(links);
const os = Object.keys(links)
//const links = ["https://github.com/MikeyA-yo/callie/releases/download/v0.0.8/mac-callie-0.0.8.zip", "https://github.com/MikeyA-yo/callie/releases/download/v0.0.8/win-callie-0.0.8x64.zip","https://github.com/MikeyA-yo/callie/releases/download/v0.0.8/linux-callie-0.0.8x64.zip"]