import LoadingSpinner from "./LoadingSpinner";

const LoadingScreen = () => {
  return (
    <div className="h-screen max-h-screen w-screen max-w-screen relative">
      <div className="bottom-1/2 translate-y-1/2 left-1/2 translate-x-1/2 absolute">
        <LoadingSpinner />
      </div>
    </div>
  );
};

export default LoadingScreen;
