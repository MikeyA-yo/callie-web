import { Outlet } from "react-router-dom";
import Intro from "../components/Intro";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="fixed flex-col z-10 flex w-full">
        <div className="w-full flex items-center bg-[#31363F] justify-between">
          <h1 className="text-3xl p-2">Callie</h1>
          <div className="lg:flex md:flex hidden justify-around items-center p-4 gap-4">
            <a href="/" className="bg-[#76ABAE] p-2">
              Home
            </a>
            <a href="/dl" className="bg-[#76ABAE] p-2">
              Download
            </a>
            <a href="/join" className="bg-[#76ABAE] p-2">
              Join Meeting
            </a>
          </div>
          <div className="lg:hidden md:hidden p-2">
            <Determiner open={open} click={() => setOpen(!open)} />
          </div>
        </div>
        {open && <MenuLists />}
      </div>
    </>
  );
}
function Determiner({
  open,
  click,
}: {
  open: boolean;
  click: React.MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <div onClick={click} className="p-1 border rounded-full border-[#76ABAE]">
      {open ? <X /> : <Bar />}
    </div>
  );
}

function MenuLists() {
  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ translateY: "-100%", opacity: 0.4 }}
          animate={{ translateY: 0, opacity: 1 }}
          exit={{translateY:"-100%", opacity:0.4}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col bg-[#31363F]">
            <a href="/" className="bg-[#76ABAE] p-2">
              Home
            </a>
            <a href="/dl" className="bg-[#76ABAE] p-2">
              Download
            </a>
            <a href="/join" className="bg-[#76ABAE] p-2">
              Join Meeting
            </a>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
function Bar() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
      />
    </svg>
  );
}
function X() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
}
