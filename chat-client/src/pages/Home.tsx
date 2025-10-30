import ChatLobby from "../components/chat/ChatLobby";
import ChatRoom from "../components/chat/ChatRoom";

function Home() {
  return (
    <div className="h-screen flex bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="w-2/6 border-r border-slate-200/60 bg-white/80 backdrop-blur-sm">
        <ChatLobby/>
      </div>
      <div className="flex-1">
        <ChatRoom />
      </div>
    </div>
  );
}

export default Home;