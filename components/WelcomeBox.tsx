"use client";
import { Button } from "@/components/ui/button";
import { MessageCircle, Smile, Users } from "lucide-react";
import TypedText from "./TypedText";
import { useState, useEffect, CSSProperties, Key } from "react";

function WelcomeBox() {
  const [bubbles, setBubbles] = useState<any>([]);

  useEffect(() => {
    const generatedBubbles = [...Array(20)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 10 + 5}px`,
      height: `${Math.random() * 10 + 5}px`,
      animation: `float ${Math.random() * 5 + 3}s ease-in-out infinite`,
    }));
    setBubbles(generatedBubbles);
  }, []);
  return (
    <div className="h-full grid grid-rows-2">
      Welcome
      {/* <div className="relative bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center">
        <div className="absolute inset-0 opacity-20">
          {bubbles.map(
            (bubble: CSSProperties | undefined, i: Key | null | undefined) => (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={bubble}
              />
            )
          )}
        </div>
        <TypedText text="Welcome to Tick Chatting" />
      </div>
      <div className="p-6 w-2/3 mx-auto flex flex-col">
        <p className="text-lg text-center mb-6">
          Stay connected with your friends in this fun and friendly group chat!
        </p>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center justify-center">
            <Users className="h-6 w-6 text-blue-500 mr-2" />
            <span>Group Conversations</span>
          </div>
          <div className="flex items-center justify-center">
            <Smile className="h-6 w-6 text-yellow-500 mr-2" />
            <span>Share Fun Moments</span>
          </div>
        </div>
        <Button className="w-full py-6 text-lg font-semibold mt-auto" size="lg">
          <MessageCircle className="mr-2 h-6 w-6" />
          Start the Conversation Now
        </Button>
      </div> */}
    </div>
  );
}

export default WelcomeBox;
