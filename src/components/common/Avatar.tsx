// src/components/common/Avatar.tsx
import React from "react";

interface AvatarProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  status?: "online" | "offline" | "away";
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, size = "md", status }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const statusClasses = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    away: "bg-yellow-500",
  };

  return (
    <div className="relative">
      <img
        src={src || "/default-avatar.png"}
        alt={alt}
        className={`${sizeClasses[size]} rounded-full object-cover border-2 border-white dark:border-gray-800`}
      />
      {status && (
        <span
          className={`absolute bottom-0 right-0 block w-3 h-3 rounded-full ${statusClasses[status]} ring-2 ring-white dark:ring-gray-800`}
        />
      )}
    </div>
  );
};

export default Avatar;
