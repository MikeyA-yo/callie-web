import { useState } from "react"

export default function Join(){
    const [uname, setUname] = useState("")
    const [roomID, setRoomID] = useState("");
    const [link, setLink] = useState("");
    return (
        <>
            <div className="bg-[#222831] flex flex-col items-center justify-center h-screen">
                <div className="bg-[#31363F] border border-[#76ABAE] p-4 flex flex-col gap-3 items-center rounded">
                   Join as:
                   <input className="p-2 rounded text-[#31363F] outline-none focus:border-[0.15rem] focus:border-[#76ABAE]" placeholder="username.." onChange={(e)=> setUname(e.target.value)} />
                   Room ID:
                   <input className="p-2 rounded text-[#31363F] outline-none focus:border-[0.15rem] focus:border-[#76ABAE]" placeholder="room id or address" onChange={(e) => setRoomID(e.target.value)} />
                   <button className="p-2 border rounded border-[#76ABAE] hover:border-0 hover:bg-[#76ABAE]" onClick={()=>{
                     if(roomID.length > 1){
                        location.replace(`/join/${roomID}?uname=${uname}`)
                     }else{
                        alert("Room ID must be greater than 1 character")
                     }
                   }}>Join</button>
                    <button className="p-2 border rounded border-[#76ABAE] hover:border-0 hover:bg-[#76ABAE]" onClick={()=>{
                        
                        if(location.href.endsWith("/")){
                            setLink(location.href + `${roomID}?uname=${uname}` )
                        }else{
                            setLink(location.href + `/${roomID}?uname=${uname}` )
                        }
                    }}>Generate Link (optional)</button>
                    {link.length > 4 && <a href={link} target="_blank">{link}</a>} 
                </div>
            </div>
       </>
    )
}