import { Button, Card } from "flowbite-react";
import { Power } from "../../assets/icons/Power";
import useAuth from "../../store/useAuth";
import useUser from "../../store/useUser";
import useSocket from "../../store/useSocket";
import useRoom from "../../store/useRoom";
import { useShallow } from "zustand/shallow";

function ChatLobby() {
  const disconnect  = useSocket((state) => state.disconnect);
  const { username, userCurrentRoom, removeUser } = useUser(
    useShallow((state) => ({
      username: state.username,
      userCurrentRoom: state.userCurrentRoom,
      removeUser: state.removeUser,
    }))
  );
  const logout = useAuth((state) => state.logout);
  const { roomList, joinRoom } = useRoom(useShallow((state) => ({ roomList: state.roomList, joinRoom: state.joinRoom})))

  const handleLogout = () => {
    logout();
    removeUser();
    disconnect();
  };

  const handleJoinRoom = (roomName: string) => {
    joinRoom(roomName, (newRoomName) => {
      console.log(`Successfully joined room: ${newRoomName}`);
    });
  };

  return (
    <div className="h-full flex flex-col bg-white/50 backdrop-blur-sm">
      {/* Header */}
      <div className="w-full h-20 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 shadow-lg flex items-center px-8 border-b border-white/20">
        <span className="text-2xl font-bold text-white tracking-tight">
          WebChat
        </span>
      </div>

      {/* Rooms List */}
      <div className="flex-1 w-full flex flex-col gap-4 p-6 overflow-y-auto">
        {roomList.map((room) => (
          <Card
            key={room.name}
            className={`w-full border-0 backdrop-blur-sm shadow-lg transition-all duration-300 rounded-2xl hover:scale-[1.02] ${
              userCurrentRoom === room.name
                ? "bg-green-100"
                : "bg-sky-100"
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <p className="font-bold text-gray-800 text-md capitalize">
                  {room.name}
                </p>
                <div className="text-sm flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full shadow-sm animate-pulse ${
                      room.userCount > 0 ? "bg-green-400" : "bg-red-400"
                    }`}
                  />
                  <span className="text-gray-600">
                    {room.userCount} user{room.userCount !== 1 ? "s" : ""}{" "}
                    online
                  </span>
                </div>
              </div>
              <Button
                className="rounded-lg font-semibold shadow-md hover:shadow-lg transition-shadow"
                onClick={() => handleJoinRoom(room.name)}
                disabled={userCurrentRoom === room.name}
              >
                {userCurrentRoom === room.name ? "Joined" : "Join"}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* User Info & Logout */}
      <div className="m-4 mt-auto bg-gradient-to-r from-slate-500 to-slate-400 text-white rounded-2xl shadow-lg border border-white/10">
        <div className="flex items-center justify-between p-4">
          <div className="flex flex-col">
            <span className="font-semibold">@{username}</span>
            <span className="text-sm text-gray-300">Online</span>
          </div>
          <Button
            size="sm"
            color="red"
            className="rounded-lg shadow-md hover:shadow-lg transition-all"
            onClick={handleLogout}
          >
            <Power height={20} width={20} className="text-red-200" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ChatLobby;
