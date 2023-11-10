export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen container mx-auto">
      <div className="bg-white shadow-md rounded-lg p-8">
        <h1 className="text-4xl text-gray-800 font-semibold mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-gray-600 text-lg">
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Go back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
