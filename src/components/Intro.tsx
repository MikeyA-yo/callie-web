export default function Intro(){
    return (
        <>
          <div className="flex flex-col min-h-screen gap-2 items-center justify-center">
          <h1 className="text-3xl">Callie</h1>
            <div className="text-xl text-center">
                <p>Call and Chat live online.</p>
                <p>Easily make group calls with friends and loved ones.</p>
            </div>
            <button className="p-2 bg-[#31363F]">Download for {getOS()}</button>
          </div>
        </>
    )
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