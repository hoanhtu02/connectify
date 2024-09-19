import { Network } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center space-x-2 bg-background text-foreground p-4 rounded-lg">
      <Network className="text-primary text-sky-500" size={22} />
      <span className="text-lg font-bold tracking-tight">
        Connect<span className="text-sky-500">ify</span>
      </span>
    </div>
  );
}
