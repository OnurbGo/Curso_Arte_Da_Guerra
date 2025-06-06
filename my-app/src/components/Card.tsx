import React from "react";

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 mb-6">
    {children}
  </div>
);

export default Card;
