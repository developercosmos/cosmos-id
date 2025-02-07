import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual login logic with Supabase
    toast({
      title: "Login functionality coming soon",
      description: "Please connect to Supabase to enable authentication.",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cosmos-gray">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-8">
          <img
            src="/lovable-uploads/5367bd54-8ade-456c-b123-f26a1c96f6dc.png"
            alt="Cosmos Logo"
            className="h-12 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-cosmos-blue">Admin Login</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-cosmos-text mb-1">
              Username
            </label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-cosmos-text mb-1">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full bg-cosmos-blue hover:bg-blue-800">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;