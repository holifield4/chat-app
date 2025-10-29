import { Button, Textarea } from "flowbite-react";

function ChatRoom() {
  return (
    <div className="size-full flex flex-col">
      <div className="w-full h-20 bg-gradient-to-b from-sky-500 via-sky-400 to-sky-500 drop-shadow-md drop-shadow-gray-300/30 flex items-center px-8">
        <span className="text-xl text-white">Room 1</span>
      </div>
      <div className="flex-1 bg-slate-100 overflow-y-auto p-4">
        <h1>message here</h1>
      </div>
      <div className="w-full h-32 bg-slate-400 drop-shadow-md drop-shadow-gray-300 flex p-4 gap-4">
        <Textarea id="chats" placeholder="Messages..." required rows={3} className="resize-none"/>
        <Button>Send</Button>
      </div>
    </div>
  );
}

export default ChatRoom;
