import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-center">
            <h1 className="text-6xl font-bold text-white mb-4">404</h1>
            <p className="text-xl text-white mb-8">Page Not Found</p>
            <div className='flex gap-2'>
                <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300">
                    Home
                </Link>
                <Link to="/compiler" className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition duration-300">
                    Code Editor
                </Link>
            </div>
        </div>
    );
}
