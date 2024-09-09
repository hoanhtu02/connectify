import { useState, useLayoutEffect } from "react";

function TypedText({ text }: { readonly text: string }) {
  const [typedText, setTypedText] = useState("");
  useLayoutEffect(() => {
    let i = 0;
    let typingInterval: NodeJS.Timeout;
    const timeout = setTimeout(() => {
      typingInterval = setInterval(() => {
        if (i < text.length) {
          setTypedText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, 100);
    }, 1000);

    return () => {
      clearInterval(typingInterval);
      clearTimeout(timeout);
    };
  }, []);
  return <h1 className="text-3xl font-bold text-white p-6">{typedText}</h1>;
}

export default TypedText;
