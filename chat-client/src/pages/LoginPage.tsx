import { Button, TextInput } from "flowbite-react";
import { Card } from "flowbite-react/components/Card";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    navigate("/home");
  }

  return (
    <div className="size-full bg-sky-200 text-white flex items-center justify-center">
      <Card className="text-center max-w-md w-md p-4 drop-shadow-lg drop-shadow-slate-400">
        <h1 className="text-3xl">WebChat</h1>
        <p className="text-start text-sm">
          Provide username to access chat room
        </p>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <TextInput id="username" placeholder="Username" required shadow/>
          <Button type="submit">Enter chatroom</Button>
        </form>
      </Card>
    </div>
  );
}

export default LoginPage;
