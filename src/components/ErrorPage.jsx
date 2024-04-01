// ErrorPage.js

import React from "react";

const ErrorPage = () => {
  const errorCode = 404;
  return (
    <div className="flex  flex-col items-center justify-center h-screen ">
      <h1 className="text-6xl font-bold text-red-500 mb-4">
        Error {errorCode}
      </h1>
      <p className="text-2xl text-white">Page Not Found</p>
    </div>
  );
};

export default ErrorPage;
