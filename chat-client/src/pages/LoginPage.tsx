import { Button, TextInput } from "flowbite-react";
import { Card } from "flowbite-react/components/Card";
import { useNavigate } from "react-router-dom";
import useUser from "../stores/useUser";
import useAuth from "../stores/useAuth";
import type { LoginResponse } from "../types/user.types";
import useSocket from "../stores/useSocket";
import { useShallow } from "zustand/shallow";
import { ArrowRight } from "../assets/icons/ArrowRight";
import { toast } from "../utils/toast";

function LoginPage() {
  const navigate = useNavigate();
  const { username, setUsername } = useUser(
    useShallow((state) => ({
      username: state.username,
      setUsername: state.setUsername,
    }))
  );
  const storeToken = useAuth((state) => state.storeToken);
  const connect = useSocket((state) => state.connect);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
      }),
    })
      .then(async (res) => {
        const data: LoginResponse = await res.json();

        if (data.token) {
          storeToken(data.token);
          connect();
          navigate("/");
          toast("Welcome to WebChat", 'success')
        } else if (data.error) {
          toast(data.error, 'error')
        }
      })
      .catch((err) => toast(err, 'error'));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl"></div>
      </div>

      <Card className="max-w-md w-full mx-auto p-8 bg-white/10 backdrop-blur-md border-0 shadow-2xl">
        {/* App Logo/Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
            WebChat
          </h1>
          <div className="w-16 h-1 bg-cyan-300 rounded-full mx-auto shadow-sm"></div>
        </div>

        {/* Welcome Text */}
        <p className="text-blue-50 text-center mb-8 text-lg leading-relaxed">
          Join the conversation and connect with others in real-time
        </p>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <TextInput
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-xl border-0 bg-white/20 backdrop-blur-sm text-white placeholder-blue-200 focus:ring-2 focus:ring-white/30 transition-all"
              sizing="lg"
              shadow
            />
            <p className="text-blue-100 text-sm text-center">
              Choose a unique username to get started
            </p>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full flex items-center justify-center gap-4 rounded-xl font-semibold text-lg py-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Enter Chatroom
            <ArrowRight height={25} width={25} />
          </Button>
        </form>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-blue-200 text-sm">
            By joining, you agree to our{" "}
            <a
              href="#"
              className="text-white hover:text-cyan-200 underline transition-colors"
            >
              Community Guidelines
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
}

export default LoginPage;
