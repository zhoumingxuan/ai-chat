import { Assistant } from "./assistant";
import { AuthProvider } from "@/contexts/auth";

export default function Home() {
  return (
    <AuthProvider>
      <Assistant />
    </AuthProvider>
  );
}
