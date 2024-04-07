import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
export const TextForm = () => {
  const [text, setText] = useState("Enter Text Here..");
  const { darkmode } = useSelector((state) => state.TextAnimation);
  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    if (text.length === 0) {
      toast.success("Please enter a text first");
    }
    if (text.length > 0) toast.success("Now Text in Uppercase");
  };

  const handleDownClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    if (text.length === 0) {
      toast.success("Please enter a text first");
    }
    if (text.length > 0) toast.success("Now Text in Lowercase");
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleClear = () => {
    setText("");
    toast.success("Clear");
  };

  const handleSpeak = () => {
    const say = new window.SpeechSynthesisUtterance();
    say.lang = "en-US";
    say.text = text;
    say.speed = 2.5;
    window.speechSynthesis.speak(say);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    toast.success("Text copied successfully");
  };

  return (
    <>
      <div
        className={`flex shadow-xl card mb-4  ${
          darkmode ? "text-white" : "text-black"
        } container mx-auto p-5 rounded-lg m-10 h-full flex-wrap`}
      >
        <div className="container my-5 flex flex-wrap ">
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl">Text Manipulation</h2>
            <div className="mb-3 my-3">
              <textarea
                id="mybox"
                className="border-none focus:border-none focus:outline-none  w-full p-3 rounded-lg"
                value={text}
                rows={"9"}
                onChange={handleChange}
                style={{ backgroundColor: "white", color: "black" }}
              ></textarea>
            </div>
            <div className="flex-wrap flex">
              <button
                className="bg-blue-500 text-sm my-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded poppins-regular"
                onClick={handleUpClick}
              >
                Convert To Uppercase
              </button>
              <button
                className="bg-blue-500 text-sm hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1 my-1 poppins-regular"
                onClick={handleDownClick}
              >
                Convert To Lowercase
              </button>
              <button
                className="bg-blue-500 text-sm hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1 my-1 poppins-regular"
                onClick={handleSpeak}
              >
                Speak
              </button>
              <button
                className="bg-blue-500 text-sm hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1 my-1 poppins-regular"
                onClick={handleCopy}
              >
                Copy Text
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1 my-1 poppins-regular"
                onClick={handleClear}
              >
                Clear
              </button>
            </div>
          </div>

          <div className=" w-full md:w-1/2">
            <div className="ml-6">
              <h4 className="text-xl">Preview</h4>
              <p>
                {text.length > 0 ? text : "Enter Something Here to Preview"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto pb-16 pl-4">
        <h3>Your text Summary</h3>
        <p>
          {
            text.split(" ").filter((element) => {
              return element.length !== 0;
            }).length
          }{" "}
          words and {text.length} characters
        </p>
        <p>{0.008 * text.split(" ").length} Minutes read </p>
      </div>
    </>
  );
};
