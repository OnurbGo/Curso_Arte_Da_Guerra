import React from "react";

interface MessageBannerProps {
  type: "success" | "error";
  children: React.ReactNode;
}

const MessageBanner: React.FC<MessageBannerProps> = ({ type, children }) => {
  const base = "p-4 rounded-lg mb-6 text-center font-medium";
  const color =
    type === "success"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";

  return <div className={`${base} ${color}`}>{children}</div>;
};

export default MessageBanner;
