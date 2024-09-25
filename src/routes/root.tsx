import { Outlet } from "react-router-dom";
import Intro from "../components/Intro";
export default function Root() {
  return (
    <>
      <div className="bg-[#222831] flex flex-col text-[#EEEEEE]">
        <div className="fixed top-0  flex self-end justify-around items-center p-4 gap-4">
          <a href="/" className="bg-[#76ABAE] p-2">Home</a>
          <a href="/dl" className="bg-[#76ABAE] p-2">Download</a>
          <a href="/join" className="bg-[#76ABAE] p-2">Join Meeting</a>
        </div>
        {window.location.pathname === "/" ? <Intro /> : <Outlet />}
      </div>
    </>
  );
}
