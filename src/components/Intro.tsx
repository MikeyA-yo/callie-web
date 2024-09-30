import { motion } from "framer-motion";

export const links: links = {
  Linux:
    "https://github.com/MikeyA-yo/callie/releases/download/v0.0.8/linux-callie-0.0.8x64.zip",
  Windows:
    "https://github.com/MikeyA-yo/callie/releases/download/v0.0.8/win-callie-0.0.8x64.zip",
  MacOS:
    "https://github.com/MikeyA-yo/callie/releases/download/v0.0.8/mac-callie-0.0.8.zip",
};

interface links {
  [key: string]: string;
  Linux: string;
  Windows: string;
  MacOS: string;
}

export default function Intro() {
  let os = getOS();
  let condition = os === "Windows" || os === "MacOS" || os === "Linux"
  return (
    <>
      <div className="flex flex-col min-h-screen gap-2 p-2 items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: "-100%" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-xl font-mono text-center"
        >
          <p>Call and Chat live online.</p>
          <p>Easily make group calls with friends and loved ones.</p>
        </motion.div>
        {condition && (
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="p-2 bg-[#31363F] font-sans"
          >
            <a href={links[os]} download={"Callie"}>
              Download for {os}
            </a>
          </motion.button>
        )}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="p-2 bg-[#31363F] font-sans"
        >
          <a href="/join">Join (Open) in Browser</a>
        </motion.button>
      </div>
      <div className="flex flex-col gap-6 justify-evenly items-center p-4">
        <h1 className="text-3xl">Usages and Instructions:</h1>
        <Usage />
        <OpenDemo />
        <Join />
        <ChatDemo />
      </div>
    </>
  );
}
function Usage() {
  return (
    <>
      <div className="flex lg:flex-row items-center flex-col text-center justify-evenly p-5 bg-[#31363F] gap-4">
        <div className="flex flex-col justify-evenly gap-4">
          <h2 className="text-2xl">
            Simplicity, simple and easy to understand UI
          </h2>
          <p>
            All in one place, schedule a meeting directly, join a meeting
            easily, view upcoming meetings all in one place, no hard time spent
            navigating
            <br /> Step 1: Open Camera. <br /> Step 2: Click Join Meeting.
            <br />
            Step 3: Enter room ID(Address) and join room
          </p>
        </div>
        <div>
          <img src="/callie.png" width={650} height={450} />
        </div>
      </div>
    </>
  );
}
function OpenDemo() {
  return (
    <>
      <div className="flex lg:flex-row items-center flex-col text-center justify-evenly p-5 bg-[#31363F] gap-4">
        <div className="flex flex-col justify-evenly gap-4">
          <h2 className="text-2xl">Open Camera</h2>
          <p>
            It's very simple, easy and concise to open the camera, just click
            open camera and you're good.
            <br />
            When the camera is open you should see something like this. <br />
            It's essential to open the camera before joining a meeting, if you
            don't want to be seen in the meeting, scroll down for instructions.
          </p>
        </div>
        <div>
          <img src="/Callie-cam.png" width={650} height={450} />
        </div>
      </div>
      <div className="flex lg:flex-row items-center flex-col text-center justify-evenly p-5 bg-[#31363F] gap-4">
        <div className="flex flex-col justify-evenly gap-4">
          <h2 className="text-xl">Turn Video Off</h2>
          <p>
            Just click on the icon below indicated by the blue arrow, Now you
            should be able to go ahead and join a meeting while your video is
            off.
            <br />
            You're expected to see this when you do that. <br />
            Note that you can't join any meeting if you hit close camera, and if
            you're in a meeting and you hit close camera you'd exit the meeting
          </p>
        </div>
        <div>
          <img src="/callie-cam-off.png" width={650} height={450} />
        </div>
      </div>
    </>
  );
}

function Join() {
  return (
    <>
      <div className="flex lg:flex-row items-center flex-col text-center justify-evenly p-5 bg-[#31363F] gap-4">
        <div className="flex flex-col gap-4 justify-evenly">
          <h2 className="text-2xl">Join Meetings</h2>
          <p>
            When you click join meeting, the input field shows up, type in the
            meeting ID of the meeting you are about to start/join then press
            Join Room.
            <br />
            This room id is what the creator of the meeting chooses as his/her
            room id, it can be anything the person wants.
            <br />
            Once there are 2 or more participants in a room, the participants
            slides shows up. You can double click on a certain user's video to
            see it in full screen
          </p>
        </div>
        <div>
          <img src="/callie-join.png" width={650} height={450} />
        </div>
      </div>
      <div className="flex lg:flex-row items-center flex-col text-center justify-evenly p-5 bg-[#31363F] gap-4">
        <div className="flex flex-col gap-4 justify-evenly">
          <h2 className="text-2xl">Joined Demo</h2>
          <p>
            Here you have clicked join room, and another user has also joined (i
            am meeting with myself in another window). this is what it should
            look like.
            <br />
            The icons down, the mic and the cam, represent's the current state
            of the participant, to know if the participant is muted, or turns
            off his/her video.
            <br />
            To leave the meeting, just click the red icon, which says leave
            room, that helps you exit
          </p>
        </div>
        <div>
          <img src="/callie-joined.png" width={650} height={450} />
        </div>
      </div>
    </>
  );
}

function ChatDemo() {
  return (
    <>
      <div className="flex lg:flex-row items-center flex-col text-center justify-evenly p-5 bg-[#31363F] gap-4">
        <div className="flex flex-col gap-4 justify-evenly">
          <h2 className="text-2xl">Chat Demo</h2>
          <p>
            That's the chat box, where you can send messages to everyone in the
            meeting and also recieve messages in real time.
            <br /> Sending messages is relatively easy, just typing your message
            and hit enter or click the send icon
          </p>
        </div>
        <div>
          <img src="/callie-chat-2.png" width={650} height={450} />
        </div>
      </div>
    </>
  );
}
function getOS() {
  const userAgent = window.navigator.userAgent;
  let os = "Unknown";

  if (userAgent.indexOf("Win") !== -1) os = "Windows";
  else if (userAgent.indexOf("Mac") !== -1) os = "MacOS";
  else if (userAgent.indexOf("X11") !== -1) os = "UNIX";
  else if (userAgent.indexOf("Linux") !== -1) os = "Linux";
  else if (/Android/.test(userAgent)) os = "Android";
  else if (/iPhone|iPad|iPod/.test(userAgent)) os = "iOS";
  return os;
}
