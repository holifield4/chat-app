import { Button, Textarea } from "flowbite-react";
import useRoom from "../../stores/useRoom";
import { useShallow } from "zustand/shallow";
import { useState } from "react";
import useUser from "../../stores/useUser";
import ChatBubble from "./ChatBubble";
import useMessage from "../../stores/useMessage";
import { UserAdd } from "../../assets/icons/UserAdd";
import InviteMembersModal from "./InviteMembers";
import { ArrowLeft } from "../../assets/icons/ArrowLeft";
import useSidebar from "../../stores/useSidebar";

function ChatRoom() {
  const { getAvailableMembers } = useRoom(
    useShallow((state) => ({
      roomList: state.roomList,
      getAvailableMembers: state.getAvailableMembers,
    }))
  );
  const { username, userCurrentRoom } = useUser(
    useShallow((state) => ({
      username: state.username,
      userCurrentRoom: state.userCurrentRoom,
    }))
  );
  const [msg, setMsg] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { sendMessage, messages } = useMessage(
    useShallow((state) => ({
      sendMessage: state.sendMessage,
      messages: state.messages,
    }))
  );
  const changeSidebarState = useSidebar((state) => state.changeSidebarState)

  const handleSendMsg = () => {
    sendMessage({
      messageContent: msg,
      toRoom: userCurrentRoom!,
    });
    setMsg("");
  };

  const handleInviteMembers = () => {
    getAvailableMembers(userCurrentRoom!);
    setIsOpen(true);
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Header */}
      <div className="w-full h-20 bg-gradient-to-l from-blue-600 via-blue-500 to-cyan-500 shadow-lg flex items-center justify-between px-3 md:px-8 border-b border-white/20">
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            outline
            className="text-white border-none md:hidden"
            onClick={changeSidebarState}
          >
            <ArrowLeft />
          </Button>
          <span className="text-xl font-semibold text-white capitalize">
            {userCurrentRoom}
          </span>
        </div>
        {userCurrentRoom !== "general" && (
          <Button
            size="sm"
            className="text-white border-none"
            outline
            onClick={handleInviteMembers}
          >
            <UserAdd className="size-8" />
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-6 bg-transparent">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages
            .filter((msg) => msg.roomId === userCurrentRoom)
            .map((msg, index) => (
              <ChatBubble key={index} user={username} message={msg} />
            ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="w-full p-6 bg-slate-200 backdrop-blur-sm border-t border-slate-300/40">
        <div className="max-w-4xl mx-auto flex gap-4 items-end">
          <Textarea
            id="chats"
            placeholder="Type your message..."
            value={msg}
            required
            rows={2}
            onChange={(e) => setMsg(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (msg.trim()) {
                  handleSendMsg();
                }
              }
            }}
            className="resize-none rounded-2xl border-0 bg-white/80 shadow-lg focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
          <Button
            className="rounded-xl h-12 px-6 shadow-lg hover:shadow-xl transition-all font-semibold"
            type="button"
            onClick={handleSendMsg}
            disabled={!msg.trim()}
          >
            Send
          </Button>
        </div>
      </div>

      {/* Invite members modal */}
      <InviteMembersModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}

export default ChatRoom;
