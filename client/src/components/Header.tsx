import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Code, MousePointerClick } from 'lucide-react';


export default function Header() {
  return (
    <nav className="w-full h-[60px] bg-gray-900 text-white p-3 flex justify-between items-center">
      <Link to="/"><h2 className="font-bold select-none flex flex-row gap-2 text-xl"> <Code className="pt-[1px] size-7 text-green-500" />WebDev <span className="text-green-500 text-xl ">Compiler</span> </h2></Link>

      <ul className="flex gap-2">
        <li>
          <Link to="/compiler">
            <Button variant="success" className="font-semibold text-base font-mono">Code Editor <MousePointerClick size={24} className="pl-[2px]"/></Button>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

