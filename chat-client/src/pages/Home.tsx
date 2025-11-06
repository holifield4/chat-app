import ChatLobby from "../components/chat/ChatLobby";
import ChatRoom from "../components/chat/ChatRoom";
import useSidebar from "../stores/useSidebar";

function Home() {
  const isOpen = useSidebar((state) => state.isOpen);
  return (
    <div className="flex h-full bg-gradient-to-br from-slate-50 to-slate-100">
      <div className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-2/6 border-r border-slate-200/60 bg-white/80 backdrop-blur-sm`}>
        <ChatLobby/>
      </div>
      <div className={`${isOpen ? "hidden" : "block" } md:block flex-1`}>
        <ChatRoom />
      </div>
    </div>
  );
}

export default Home;