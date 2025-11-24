import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";

const WelcomeMessage = () => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hrs = new Date().getHours();
    if (hrs < 12) setGreeting("Good Morning ☀️");
    else if (hrs < 18) setGreeting("Good Afternoon 🌤️");
    else setGreeting("Good Evening 🌙");

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <div className="text-center my-6 text-3xl font-bold text-purple-600 animate-bounce">
      🎉 {greeting}! Welcome to Your Calendar 🎉
    </div>
  );
};

export default WelcomeMessage;
