import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-6 bg-gray-900 h-[calc(100vh-60px)] flex items-center justify-center">
      <div className="max-w-2xl bg-gray-800 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">Welcome to WebDev Compiler</h1>
        <p className="text-lg mb-6 text-gray-300">
          Transform your web development process with our powerful online compiler.
          <br />
          <br />
          <span className="font-semibold text-green-500">WebDev Compiler</span> allows you to write and test HTML, CSS, and JavaScript code in a seamless environment.
          Instantly see the results of your code and enhance your web development skills.
          Whether you're a beginner or a seasoned developer, our tool simplifies your workflow and accelerates your learning process.
        </p>
        <p className="text-lg text-gray-300">
          Get started by navigating to the <span className="font-semibold text-green-500"><Link to="/compiler">"Code Editor"</Link></span> to start coding right away.
          <br />
          <br />
          Enjoy coding!
        </p>
      </div>
    </div>
  );
}
