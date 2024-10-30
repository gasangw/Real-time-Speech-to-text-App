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
        <span> Currently its {listening? "on" : "off"}</span>
        <div className="flex items-center gap-4 text-3xl my-10">
          <button
            onClick={handleMicrophoneClick}
            className={classNames(
              listening
                ? "p-3 shadow-md bg-red-400/20 rounded-full text-red-600 animate-pulse"
                : "hover:cursor-pointer bg-gray-700/20 p-2 rounded-full"
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
            {transcript || "...diagnostic messages"}
          </em>
        </div>
    </div>
  );
}

export default App;