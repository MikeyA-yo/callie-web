const links: links = {
  Linux:
    "https://github.com/MikeyA-yo/callie/releases/download/v0.0.7/linux-callie-0.0.7x64.zip",
  Windows:
    "https://github.com/MikeyA-yo/callie/releases/download/v0.0.7/win-callie-0.0.7x64.zip",
  MacOS:
    "https://github.com/MikeyA-yo/callie/releases/download/v0.0.7/mac-callie-0.0.7.zip",
};

interface links {
  [key: string]: string;
  Linux: string;
  Windows: string;
  MacOS: string;
}

export default function Intro() {
  let os = getOS();
  let condition = os === ("Windows" || "MacOS" || "Linux");
  return (
    <>
      <div className="flex flex-col min-h-screen gap-2 items-center justify-center">
        <h1 className="text-3xl">Callie</h1>
        <div className="text-xl text-center">
          <p>Call and Chat live online.</p>
          <p>Easily make group calls with friends and loved ones.</p>
        </div>
        {condition && (
          <button className="p-2 bg-[#31363F]">
            <a href={links[os]} download={"Callie"}>
              Download for {os}
            </a>
          </button>
        )}
      </div>
      <Usage />
    </>
  );
}
function Usage() {
  return (
    <>
      <div className="flex items-center justify-center">
        <div>
          <h2>Simplicity</h2>
        </div>
        <div></div>
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
