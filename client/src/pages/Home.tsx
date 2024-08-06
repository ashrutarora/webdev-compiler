import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-6 bg-gray-900 h-[calc(100vh-60px)] flex items-center justify-center">
      <div className="max-w-2xl bg-gray-800 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">Welcome to WebDev <span className="text-green-500">Compiler</span></h1>
        <p className="text-lg mb-6 text-gray-300 flex items-center justify-center">
          Write and test
          <>
            <img className="size-10" src="https://img.icons8.com/?size=100&id=20909&format=png&color=000000" />
            <img className="size-10" src="https://img.icons8.com/?size=100&id=21278&format=png&color=000000" />
            <img className="size-10" src="https://img.icons8.com/?size=100&id=108784&format=png&color=000000" />
          </>
        </p>
        <p className="text-lg text-gray-300">
          Start coding now on our <span className="font-semibold text-green-500"><Link to="/compiler">Code Editor</Link></span>
        </p>
      </div>
    </div>
  );
}

