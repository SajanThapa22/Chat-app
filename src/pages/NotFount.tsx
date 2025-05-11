// NotFound.jsx
import { Link } from "react-router-dom";

const NotFound: React.FunctionComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100 px-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-2">Page Not Found</p>
      <p className="text-gray-500 mb-6">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
