import React, { useEffect, useRef, useState } from "react";
import styles from "./AssistantButton.module.css";
import { generateChatCompletion } from "../helpers/gptChatHelper";
import { transcribeAudio } from "../helpers/whisperAsrHelper";
import { textToSpeechStream } from "../helpers/elevenLabsTtsHelper";
import MicRecorder from "mic-recorder-to-mp3";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

const AssistantButton: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [blobURL, setBlobURL] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleKeyDown = async (event: KeyboardEvent) => {
    if (event.code === "Space" && !isRecording) {
      setIsRecording(true);
      Mp3Recorder.start().catch((e) => console.error(e));
    }
  };

  const handleKeyUp = async (event: KeyboardEvent) => {
    if (event.code === "Space" && isRecording) {
      setIsRecording(false);
      Mp3Recorder.stop()
        .getMp3()
        .then(async ([buffer, blob]) => {
          setBlobURL(URL.createObjectURL(blob));
          try {
            // Transcribe the audio using Whisper ASR API
            const transcription = await transcribeAudio(blob);
            // Generate a response using GPT-3 Chat API
            const chatResponse = await generateChatCompletion([
              { role: "user", content: transcription },
            ]);
            const assistantMessage = chatResponse.choices[0].message.content;
            // Convert the response to speech using Eleven Labs TTS API
            const audioStream = await textToSpeechStream(assistantMessage);
            if (audioRef.current) {
              audioRef.current.src = URL.createObjectURL(audioStream); // Convert blob to URL
              audioRef.current.play();
            }
          } catch (error) {
            console.error(error);
            // Handle error and inform the user if needed
          }
        })
        .catch((e) => console.error(e));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isRecording]);

  return (
    <div className={styles.container}>
      <div className={styles.circleButton}>
        <div className={styles.neonEffect}></div>
      </div>
      <audio ref={audioRef} src={blobURL} />
    </div>
  );
};

export default AssistantButton;
