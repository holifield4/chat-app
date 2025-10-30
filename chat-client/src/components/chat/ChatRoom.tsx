import { Button, Textarea } from "flowbite-react";

function ChatRoom() {
  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Header */}
      <div className="w-full h-20 bg-gradient-to-l from-blue-600 via-blue-500 to-cyan-500 shadow-lg flex items-center justify-end px-8 border-b border-white/20">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-green-400 shadow-sm"></div>
          <span className="text-xl font-semibold text-white">Room 1</span>
          <span className="text-blue-100 text-sm">110 users</span>
        </div>
      </div>
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 bg-transparent">
        <div className="max-w-4xl mx-auto space-y-4">
        
          {/* Received Messages */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-sm"></div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl rounded-tl-none px-4 py-3 shadow-lg border border-white/50 max-w-md">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-semibold text-gray-800">Username</span>
                <span className="text-xs text-gray-500">2:30 PM</span>
              </div>
              <p className="text-gray-700">Hello everyone! 👋</p>
            </div>
          </div>
          
          {/* Sent Messages */}
          <div className="flex items-start gap-3 justify-end">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl rounded-tr-none px-4 py-3 shadow-lg max-w-md">
              <p>Hey there! This is a test message</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shadow-sm"></div>
          </div>
        </div>
      </div>
      
      {/* Message Input */}
      <div className="w-full p-6 bg-slate-200 backdrop-blur-sm border-t border-slate-300/40">
        <div className="max-w-4xl mx-auto flex gap-4 items-end">
          <Textarea 
            id="chats" 
            placeholder="Type your message..." 
            required 
            rows={2} 
            className="resize-none rounded-2xl border-0 bg-white/80 shadow-lg focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
          <Button 
            className="rounded-xl h-12 px-6 shadow-lg hover:shadow-xl transition-all font-semibold"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;