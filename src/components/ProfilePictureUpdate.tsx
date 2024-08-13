import { useRef, useState, MouseEvent } from "react";
import api from "../services/api";
import Button from "./Button";
import Spinner from "./Spinner";
import { useAuth } from "../context/AuthContext";

interface Props {
  img: string;
  onSuccess: () => void;
}

const ProfilePictureUpdate = ({ img, onSuccess }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { accessToken } = useAuth();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleApplyClick = async () => {
    if (!selectedFile) {
      setErrorMessage("Please select a file before uploading.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null); // Clear any previous errors

    const formData = new FormData();
    formData.append("profile_pic", selectedFile);

    try {
      const response = await api.patch("/chat/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        setIsLoading(false);
        onSuccess();
        setPreview(null); // Clear the preview
        setSelectedFile(null); // Clear the selected file
      } else {
        setIsLoading(false);
        setErrorMessage("Failed to upload profile picture.");
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage("Error uploading file.");
      console.log("Error uploading file:", error);
    }
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    inputRef.current && inputRef.current.click();
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreview("");
  };

  return (
    <div className="flex flex-col gap-5 items-center">
      <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
        <img
          src={preview || img}
          alt="profile picture"
          className="w-full h-full object-cover"
        />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleApplyClick();
        }}
        className="flex flex-col gap-5"
      >
        <button
          onClick={handleClick}
          className="bg-primary px-3 py-2 rounded-lg text-center"
        >
          Choose
        </button>
        <input
          ref={inputRef}
          className="hidden"
          onChange={handleFileChange}
          type="file"
          accept=".jpg, .jpeg"
        />
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {selectedFile && (
          <div className="flex flex-col lg:flex-row gap-4">
            <Button type="submit">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Spinner /> <span>Applying...</span>
                </div>
              ) : (
                "Save"
              )}
            </Button>
            <button
              type="button"
              onClick={handleRemove}
              className="px-4 py-2 bg-[#dc2626] rounded-lg text-white"
            >
              Remove
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfilePictureUpdate;
