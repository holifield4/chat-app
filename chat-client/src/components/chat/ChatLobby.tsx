import { Button, Card } from "flowbite-react";
import { Power } from "../../assets/icons/Power";

function ChatLobby() {
  return (
    <div className="h-full flex flex-col bg-white/50 backdrop-blur-sm">
      {/* Header */}
      <div className="w-full h-20 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 shadow-lg flex items-center px-8 border-b border-white/20">
        <span className="text-2xl font-bold text-white tracking-tight">WebChat</span>
      </div>
      
      {/* Rooms List */}
      <div className="flex-1 w-full flex flex-col gap-4 p-6 overflow-y-auto">
        <Card className="w-full border-0 bg-sky-100 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-2xl">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <p className="font-bold text-gray-800 text-lg">Room 1</p>
              <div className="text-sm flex items-center gap-2 mt-1">
                <div className="w-2 h-2 rounded-full bg-green-400 shadow-sm animate-pulse" />
                <span className="text-gray-600">110 users online</span>
              </div>
            </div>
            <Button 
              className="rounded-lg font-semibold shadow-md hover:shadow-lg transition-shadow"
            >
              Join
            </Button>
          </div>
        </Card>
      </div>
      
      {/* User Info & Logout */}
      <div className="m-4 mt-auto bg-gradient-to-r from-slate-500 to-slate-400 text-white rounded-2xl shadow-lg border border-white/10">
        <div className="flex items-center justify-between p-4">
          <div className="flex flex-col">
            <span className="font-semibold">@username</span>
            <span className="text-sm text-gray-300">Online</span>
          </div>
          <Button 
            size="sm" 
            color="red"
            className="rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <Power height={20} width={20} className="text-red-200" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ChatLobby;