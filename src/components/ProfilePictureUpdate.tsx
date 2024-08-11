import { useState } from "react";

interface Props {
  img: string;
  url: string;
}

const ProfilePictureUpdate = ({ img, url }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string); // Set preview with the file's base64 string
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    } else {
      setPreview(null); // Clear the preview if no file is selected
    }
  };

  const handleApplyClick = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile); // Append the file to the FormData

      try {
        const response = await fetch(url, {
          method: "PATCH",
          body: formData,
        });

        if (response.status === 200) {
          setPreview("");
          console.log("File uploaded successfully!");
        } else {
          console.error("File upload failed.");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="size-[100px] rounded-full overflow-hidden">
        <img
          src={preview || img}
          alt="profile picture"
          className="size-full object-cover"
        />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleApplyClick();
        }}
        className="flex flex-col gap-5"
      >
        <input onChange={handleFileChange} type="file" accept=".jpg, .jpeg" />
        {selectedFile && (
          <button className="border-none bg-primary text-white rounded-lg px-4 py-2">
            Apply
          </button>
        )}
      </form>
    </div>
  );
};

export default ProfilePictureUpdate;
