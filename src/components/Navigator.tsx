import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navigator = () => {
  const navigate = useNavigate();
  return (
    <FaArrowLeft
      onClick={() => navigate("/")}
      className="size-7 text-gray-500 cursor-pointer lg:hidden"
    />
  );
};

export default Navigator;
