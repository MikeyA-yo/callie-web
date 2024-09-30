import { Mute, OffCam } from "./starters";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Phone, UserAvatar } from "./svgs";
import { useEffect } from "react";
import { Particpant } from "./meeting";
export function VidDivs({
  participants,
  id,
}: {
  participants: Particpant[];
  id: string;
}) {
  useEffect(() => {
    participants.map((p) => {
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
  }, [participants]);
  if (participants.length == 0) {
    return (
      <>
        <h2 className="lg:text-3xl md:text-2xl text-xl p-2 text-wrap">You are alone in this meeting</h2>
      </>
    );
  } else {
    let users = participants.filter((p) => p.userId !== id);
    if (users.length > 6) {
      return (
        <>
          <Swiper
            spaceBetween={3}
            slidesPerView={1}
            modules={[Navigation, Pagination]}
            navigation
            pagination
          >
            <DisplayGrid participants={users} />
          </Swiper>
        </>
      );
    }
    return <DisplayGrid participants={users} />;
  }
}
function Grids({ participants }: { participants: Particpant[] }) {
  return (
    <>
      <div className="flex gap-2 flex-wrap p-4 bg-[#31363F]">
        {participants.map((participant, i) => {
          let clName = participant.offed ? "size-32" : "size-32 hidden";
          return (
            <div
              key={i}
              id={participant.userId.substring(
                0,
                participant.userId.indexOf("-")
              )}
              className="flex flex-col gap-1 p-2 bg-[#222831] rounded-md items-center"
            >
              <p className="self-end">{participant.uname}</p>
              <UserAvatar
                className={clName}
                id={
                  participant.userId.split("-")[participant.userId.length - 1]
                }
              />
              <div className="flex gap-1 items-center">
                <Mute muted={participant.muted} cursor={false} />
                <OffCam offed={participant.offed} cursor={false} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
function DisplayGrid({ participants }: { participants: Particpant[] }) {
  if (participants.length > 6 && screen.width < 600) {
    let sectionalGrids: Particpant[][] = [];
    let temp: Particpant[] = [];
    participants.map((p) => {
      if (temp.length === 6) {
        sectionalGrids.push(temp);
        temp = [];
      }
      temp.push(p);
    });
    if (temp.length > 0) {
      sectionalGrids.push(temp);
    }
    return (
      <>
        {sectionalGrids.map((participant, i) => {
          return (
            <SwiperSlide key={i}>
              <Grids participants={participant} />
            </SwiperSlide>
          );
        })}
      </>
    );
  }
  if (participants.length > 13 && screen.width > 600) {
    let sectionalGrids: Particpant[][] = [];
    let temp: Particpant[] = [];
    participants.map((p) => {
      if (temp.length === 13) {
        sectionalGrids.push(temp);
        temp = [];
      }
      temp.push(p);
    });
    if (temp.length > 0) {
      sectionalGrids.push(temp);
    }
    return (
      <>
        {sectionalGrids.map((participant, i) => {
          return (
            <SwiperSlide key={i}>
              <Grids participants={participant} />
            </SwiperSlide>
          );
        })}
      </>
    );
  }
  return <Grids participants={participants} />;
}
export function EndCall({
  end,
}: {
  end: React.MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <>
      <div
        className="rounded-full p-2 cursor-pointer bg-[#800000]"
        onClick={end}
      >
        <Phone className="size-6" />
      </div>
    </>
  );
}
export function SelfCam({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="bottom-4 right-4 fixed z-10">{children}</div>
    </>
  );
}

// {participants.map((participant, i) => {
//     if (participant.userId === id) {
//       return <></>;
//     } else {
//       let clName = participant.offed ? "size-32" : "size-32 hidden";
//       return (
//         <>
//           <SwiperSlide className="w-full p-4" key={i}>
//             <div
//               id={participant.userId.substring(
//                 0,
//                 participant.userId.indexOf("-")
//               )}
//               className="flex flex-col gap-1 items-center"
//             >
//               <p className="self-end">{participant.uname}</p>
//               <UserAvatar
//                 className={clName}
//                 id={
//                   participant.userId.split("-")[
//                     participant.userId.length - 1
//                   ]
//                 }
//               />
//               <div className="flex gap-1 items-center">
//                 <Mute muted={participant.muted} cursor={false} />
//                 <OffCam offed={participant.offed} cursor={false} />
//               </div>
//             </div>
//           </SwiperSlide>
//         </>
//       );
//     }
//   })}
