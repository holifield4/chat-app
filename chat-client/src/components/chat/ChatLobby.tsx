import { Button, Card } from "flowbite-react";

function ChatLobby() {
  return (
    <div className="size-full flex flex-col items-center">
      <div className="w-full h-20 bg-gradient-to-b from-sky-500 via-sky-400 to-sky-500 drop-shadow-md drop-shadow-gray-300/30 flex items-center px-8">
        <span className="text-xl text-white">WebChat</span>
      </div>
      <div className="flex-1 w-full flex flex-col gap-3 p-4 overflow-y-auto">
        <Card className="w-full text-white">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <p className="font-semibold">Room 1</p>
              <div className="text-sm flex items-center gap-2">
                <div className="w-3 h-3 rounded-full animate-pulse bg-green-400" />
                <span>110 users</span>
              </div>
            </div>
            <Button>Join</Button>
          </div>
        </Card>
      </div>
      <div className="text-white w-[99%] mb-1 h-20 flex flex-col gap-1 items-start px-2 justify-center rounded-md bg-gradient-to-b from-slate-600/70 via-slate-500/70 to-slate-600/70 shadow-[0_0_3px_2px] shadow-slate-300">
        <span>@username</span>
        <Button color="red">
          Exit
        </Button>
      </div>
    </div>
  );
}

export default ChatLobby;
