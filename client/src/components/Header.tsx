import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Code, MousePointerClick } from "lucide-react";

export default function Header() {
  return (
    <nav className="w-full h-[60px] bg-zinc-900 text-white p-3 flex justify-between items-center shadow-md">
      <Link to="/" className="flex items-center gap-1">
        <h2 className="font-bold text-xl select-none flex items-center gap-1">
          <Code className="text-green-500" size={24} />
          WebDev<span className="text-green-500">Compiler</span>
        </h2>
      </Link>

      {/* Centered Code Editor Button */}
      <div className="flex-1 flex justify-center">
        <Link to="/compiler">
          <Button
            variant="default"
            className="bg-orange-500 hover:bg-orange-300 transition duration-300 font-semibold text-base font-mono flex items-center gap-1"
          >
            Code Editor <MousePointerClick size={20} />
          </Button>
        </Link>
      </div>

      {/* Navigation Links */}
      <ul className="flex gap-3">
        <li>
          <Link to="/login">
            <Button
              variant="default"
              className="bg-sky-500 font-mono hover:bg-sky-300 transition duration-300 text-base"
            >
              Login
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/signup">
            <Button
              variant="default"
              className="bg-yellow-400 font-mono hover:bg-yellow-300 transition duration-300 text-base"
            >
              Sign Up
            </Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
