import ChatLobby from "../components/chat/ChatLobby";
import ChatRoom from "../components/chat/ChatRoom";

function Home() {
  return (
    <div className="size-full flex">
      <div className="w-2/6 border-r border-slate-500/30">
        <ChatLobby/>
      </div>
      <div className="w-4/6">
        <ChatRoom />
      </div>
    </div>
  );
}

export default Home;
