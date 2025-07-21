import React, { useEffect, useState } from 'react';

const TextToSpeech = ({ text }) => {
  const [synth, setSynth] = useState(null);
  const [voice, setVoice] = useState(null);

  useEffect(() => {
    const synthInstance = window.speechSynthesis;
    setSynth(synthInstance);

    const loadVoices = () => {
      const availableVoices = synthInstance.getVoices();
      const defaultVoice = availableVoices.find(v => v.default) || availableVoices[0];
      setVoice(defaultVoice);
    };

    // Load voices when available
    if (synthInstance.onvoiceschanged !== undefined) {
      synthInstance.onvoiceschanged = loadVoices;
    }

    loadVoices();
  }, []);

  const handleSpeak = () => {
    if (!synth || synth.speaking) return;

    const utter = new SpeechSynthesisUtterance(text);
    utter.voice = voice;
    synth.speak(utter);
  };

  const handleCancel = () => {
    if (synth && synth.speaking) {
      synth.cancel();
    }
  };

  return (
    <div className=''>
      <div className='flex justify-between items-center gap-4'>
        <p className='hidden'>Description: {text}</p>
        <div className='flex flex-col gap-2'>
          <button onClick={handleSpeak} className='px-2 py-1 border-2 border-black bg-white rounded-md font-bold'>Speak</button>
          <button onClick={handleCancel} className='px-2 py-1 border-2 border-black bg-white rounded-md font-bold'>Stop</button>
        </div>
      </div>
    </div>
  );
};

export default TextToSpeech;
