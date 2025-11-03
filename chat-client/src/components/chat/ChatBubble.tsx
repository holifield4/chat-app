import { User } from "../../assets/icons/User";
import type { Message } from "../../types/message.types";

type ChatBubbleProp = {
  user: string;
  message: Message;
};

function ChatBubble({ user, message }: ChatBubbleProp) {
  const isByUser = user === message.username;
  return (
    <div className={`flex items-start gap-3 ${isByUser ? "justify-end" : ""}`}>
      {/* other user avatar */}
      {!isByUser && <User height={32} width={32} className="text-cyan-500 " />}

      <div
        className={`rounded-2xl px-4 py-3 shadow-lg max-w-md ${
          isByUser
            ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-tr-none"
            : "bg-white/80 backdrop-blur-sm rounded-tl-none border border-white/50"
        }`}
      >
        {/* other user username and msg timestamp */}
        {!isByUser && (
          <div className="flex items-baseline gap-2 mb-1">
            <span className="font-semibold text-gray-800">{message.username}</span>
            <span className="text-xs text-gray-500">{message.timestamp}</span>
          </div>
        )}

        {/* message content */}
        <p className={`${isByUser ? "text-white" : "text-gray-700"}`}>
          {message.message}
        </p>

        {/* user msg timestamp */}
        {isByUser && (
          <span className="block text-right text-xs text-white/70 mt-1">
            {message.timestamp}
          </span>
        )}
      </div>

      {/* avatar for user */}
      {isByUser && (
        <User height={32} width={32} className="text-blue-500" />
      )}
    </div>
  );
}

export default ChatBubble;
