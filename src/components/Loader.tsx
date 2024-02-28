import { useState, useEffect } from "react";
import { Progress } from "./ui/progress";

const Loader = () => {
  const [progress, setProgress] = useState(14);
  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 1500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="h-screen w-full justify-center items-center flex">
      <Progress value={progress} className="w-[60%]" />
    </div>
  );
};

export default Loader;
