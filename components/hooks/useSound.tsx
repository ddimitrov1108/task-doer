import { useState, useEffect } from "react";
import { Howl, Howler } from "howler";

const useSound = (soundUrl: string) => {
  const [sound, setSound] = useState(new Howl({ src: [soundUrl] }));
  const [isPlaying, setIsPlaying] = useState(false);

  const playSound = () => {
    if (Howler.ctx.state === "suspended") {
      Howler.ctx.resume().then(() => {
        sound.play();
        setIsPlaying(true);
      });
    } else {
      sound.play();
      setIsPlaying(true);
    }
  };

  const stopSound = () => {
    sound.stop();
    setIsPlaying(false);
  };

  useEffect(() => {
    sound.on("end", () => {
      stopSound();
    });

    return () => {
      sound.off("end");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sound]);

  return [isPlaying, playSound, stopSound] as const;
};

export default useSound;
