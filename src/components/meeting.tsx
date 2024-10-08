import Peer from "peerjs";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { EndCall, SelfCam, VidDivs } from "./vids";
import { Mute, OffCam } from "./starters";
import { UserAvatar } from "./svgs";
import ChatView, { ChatPopUp } from "./chat";

const peer = new Peer();
const socket = io("https://callie-rooms.onrender.com");
export default function Meeting() {
  const [camStream, setCamStream] = useState<MediaStream | null>();
  const [id, setID] = useState("");
  const [conns, setConns] = useState<Array<Particpant>>([]);
  const [uname, setUname] = useState("");
  const [muted, setMuted] = useState(false);
  const [offed, setOffed] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chats, setChats] = useState<string[]>([]);
  const [chat, setChat] = useState("");
  const [me, setMe] = useState<Array<boolean>>([]);
  const [senders, setSenders] = useState<Array<string>>([]);
  const [pop, setPop] = useState(false);
  const [lpop, setLPop] = useState(false);
  const [pUsers, setPUsers] = useState<Array<string>>([]);
  const peers: any = {};
  const effectRan = useRef(false);
  const chPop = useRef(false);
  useEffect(() => {
    if (effectRan.current) {
      //
    } else {
      effectRan.current = true;
      async function getStream() {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        setCamStream(stream);
      }
      socket.on("user-disconnected", (id, p, uname) => {
        peers[id] && peers[id].close();
        setConns(p);
        setLPop(true);
        setPUsers((prev) => [...prev, uname]);
        setTimeout(() => {
          setLPop(false);
        }, 4500);
      });
      socket.on("data", (data, from) => {
        setChats((prev) => [...prev, data]);
        setMe((prev) => [...prev, false]);
        setSenders((prev) => [...prev, from]);
        if (!document.getElementById("chats")) {
          setPop(true);
        }
        setTimeout(() => {
          setPop(false);
        }, 6000);
      });
      socket.on("updateP", (p) => {
        setConns(p);
      });
      let sp = new URLSearchParams(location.search);
      setUname(sp.get("uname") ?? "User");

      socket.on("muted", (id, val) => {
        if (document.getElementById(id)) {
          let vid = document.getElementById(id) as HTMLVideoElement;
          vid.muted = val;
        }
      });
      socket.on("offed", (id, val) => {
        if (document.getElementById(id)) {
          let vid = document.getElementById(id) as HTMLVideoElement;
          if (val) {
            vid.classList.add("hidden");
          } else {
            vid.classList.remove("hidden");
          }
        }
      });
      getStream();
    }
  }, []);

  useEffect(() => {
    if (camStream) {
      let userCam = document.getElementById("userCam") as HTMLVideoElement;
      userCam.srcObject = camStream;
    }
  }, [camStream]);
  useEffect(() => {
    if (camStream && id.length > 2) {
      socket.emit(
        "join-room",
        location.pathname.split("/").pop(),
        id,
        uname,
        muted,
        offed
      );
      socket.on("joined", (id) => {
        call(id);
      });
    }
  }, [id, camStream]);
  useEffect(() => {
    let container = document.getElementById("chats");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [chats, me]);

  peer.on("open", (id) => {
    setID(id);
  });
  peer.on("call", (call) => {
    if (camStream) {
      call.answer(camStream);
      call.on("stream", (stream) => {
        addUser(stream, call.peer);
        updateMediaStates();
      });
      peers[call.peer] = call;
    }
  });
  function call(id: string) {
    if (camStream) {
      const conn = peer.call(id, camStream as MediaStream);
      conn.on("stream", (stream) => {
        addUser(stream, id);
        updateMediaStates();
      });
      peers[id] = conn;
    }
  }
  function addUser(stream: MediaStream, id: string) {
    const existing = document.getElementById(id);
    if (!existing) {
      const video = document.createElement("video");
      video.playsInline = true;
      video.autoplay = true;
      video.controls = false;
      video.className =
        "lg:max-h-44 md:max-h-44 md:max-w-44 max-w-32 max-h-32 lg:max-w-44";
      video.id = id;
      video.srcObject = stream;
      video.addEventListener("dblclick", () => {
        video.requestFullscreen();
      });
      let parent = document.getElementById(id.substring(0, id.indexOf("-")));
      parent?.insertBefore(video, parent.lastChild);
    }
  }
  function updateMediaStates() {
    conns.map((p) => {
      let vid = document.getElementById(p.userId) as HTMLVideoElement;
      if (vid) {
        vid.muted = p.muted;
        if (p.offed) {
          vid.classList.add("hidden");
        } else {
          vid.classList.remove("hidden");
        }
      }
    });
  }
  return (
    <>
      <div className="flex flex-col  text-[#EEEEEE] gap-4 items-center justify-center w-full min-h-screen bg-[#222831]">
        {pop && (
          <ChatPopUp
            from={senders[senders.length - 1]}
            message={chats[chats.length - 1]}
            show={() => {
              setShowChat(true);
              setPop(false);
            }}
          />
        )}
        {lpop && (
          <ChatPopUp
            from={pUsers[pUsers.length - 1]}
            message="left"
            show={() => {
              setLPop(false);
            }}
          />
        )}
        <div className="fixed z-10 top-4 left-4">
          <div
            className="flex bg-[#76ABAE] flex-col items-center gap-1 p-2 rounded-full cursor-pointer"
            onClick={() => {
              !chPop.current && setShowChat(!showChat);
              if (!showChat) chPop.current = false;
            }} // this is not a bug have to leave it like this cause of global document listener
          >
            <ChatIcon />
            <p>
              {showChat && "Close chat"}
              {!showChat && "Open Chat"}
            </p>
          </div>
        </div>
        <SelfCam>
          <div className="flex flex-col items-center gap-2">
            {camStream && <p>You</p>}
            <video
              autoPlay
              controls={false}
              playsInline
              id="userCam"
              className={`lg:max-h-44 md:max-h-44 md:max-w-44 max-w-32 max-h-32 lg:max-w-44 rounded ${
                offed ? "hidden" : ""
              }`}
              muted
              onDoubleClick={(e) => {
                e.currentTarget.requestFullscreen();
              }}
            />
            {camStream && offed && (
              <div className="p-2 bg-[#31363F]">
                <UserAvatar className="size-32" />
              </div>
            )}
            {camStream && (
              <div className="flex-col flex gap-3 items-center">
                <div className="flex gap-1 items-center">
                  <Mute
                    mute={() => {
                      socket.emit("mute", peer.id, !muted);
                      setMuted(!muted);
                    }}
                    muted={muted}
                    cursor
                  />{" "}
                  <OffCam
                    off={() => {
                      socket.emit("off", peer.id, !offed);
                      setOffed(!offed);
                    }}
                    cursor
                    offed={offed}
                  />
                </div>
              </div>
            )}
          </div>
        </SelfCam>
        <VidDivs participants={conns.filter((c) => c.userId != id)} id={id} />
        <EndCall
          end={() => {
            window.location.replace("/join");
          }}
        />
        Leave Call
        {showChat && (
          <ChatView
            me={me}
            senders={senders}
            chats={chats}
            input={(e) => {
              setChat(e.target.value);
            }}
            send={() => {
              socket.emit("chat", chat, uname);
              setChats((prev) => [...prev, chat]);
              setMe((prev) => [...prev, true]);
              setSenders((prev) => [...prev, uname]);
              if (document.getElementById("chat-input")) {
                const input = document.getElementById(
                  "chat-input"
                ) as HTMLInputElement;
                input.value = "";
              }
            }}
            close={() => {
              setShowChat(false);
              chPop.current = true;
            }}
            enterSend={(e) => {
              if (e.key === "Enter") {
                socket.emit("chat", chat, uname);
                e.currentTarget.value = "";
                setChats((prev) => [...prev, chat]);
                setMe((prev) => [...prev, true]);
                setSenders((prev) => [...prev, uname]);
              }
            }}
          />
        )}
      </div>
    </>
  );
}
export interface Particpant {
  userId: string;
  uname: string;
  muted: boolean;
  offed: boolean;
}
function ChatIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
      />
    </svg>
  );
}
