import { Outlet } from "react-router-dom";
import Intro from "../components/Intro";
export default function Root() {
  return (
    <>
      <div className="bg-[#222831] flex flex-col text-[#EEEEEE]">
        <Nav />
        {window.location.pathname === "/" ? <Intro /> : <Outlet />}
      </div>
    </>
  );
}
function Nav(){
  return (
    <>
     <div className="w-full flex items-center fixed bg-[#31363F] justify-between">
        <h1 className="text-3xl p-2">Callie</h1>
        <div className="lg:flex md:flex hidden justify-around items-center p-4 gap-4">
          <a href="/" className="bg-[#76ABAE] p-2">Home</a>
          <a href="/dl" className="bg-[#76ABAE] p-2">Download</a>
          <a href="/join" className="bg-[#76ABAE] p-2">Join Meeting</a>
        </div>
     </div>
    </>
  )
}