import { HiMicrophone } from "react-icons/hi2";
import { CiMicrophoneOff } from "react-icons/ci";
import { GrPowerReset } from "react-icons/gr";
import classNames from "classnames";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
function App() {
  const {
    transcript,
    resetTranscript,
    listening,
    isMicrophoneAvailable,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support speech recognition.</p>;
  }
  if (!isMicrophoneAvailable) {
    return <p>Your microphone is not available.</p>;
  }

  const handleMicrophoneClick = () => {
      SpeechRecognition.startListening({
        continuous: true,
        language: "en-US",
      });
  };

  const handleMicrophoneOff = () => {
    SpeechRecognition.stopListening();
  };

  const handleTextRefresh = () => {
    resetTranscript();
  }

  return (
    <div className="bg-slate-500/30 *:text-black min-h-screen p-8">
      <div className="grid justify-center *:text-center">
        <h1 className="font-bold text-2xl pb-10">Speech Detector</h1>
        <span> Currently its <strong className={classNames(listening ? "text-green-800":"text-red-700", "text-lg")}>{listening? "on" : "off"}</strong></span>
        <div className="flex items-center gap-4 text-3xl my-10">
          <button
            onClick={handleMicrophoneClick}
            className={classNames(
              listening
                ? "bg-red-400/20 text-red-600 animate-pulse"
                : "bg-gray-700/20", "p-3 shadow-md rounded-full hover:cursor-pointer"
            )}
          >
            <HiMicrophone />
          </button>
          <button
            onClick={handleMicrophoneOff}
            className="p-3 shadow-md bg-blue-400/20 rounded-full text-blue-600"
          >
            <CiMicrophoneOff />
          </button>
          <button
          onClick={handleTextRefresh}
            className="p-3 shadow-md bg-gray-700/20 rounded-full text-gray-600"
          >
            <GrPowerReset />
          </button>
        </div>
      </div>
      <div className="bg-gray-500/20 p-5 rounded-md">
          <em>
            {transcript || "Waiting for you to start speaking..."}
          </em>
        </div>
    </div>
  );
}

export default App;