import axios from 'axios';

const ELEVENLABS_API_KEY = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;
const ELEVENLABS_VOICE_ID = process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID;
const ELEVENLABS_API_URL = 'https://api.elevenlabs.io/v1/text-to-speech/' + ELEVENLABS_VOICE_ID;

export const textToSpeechStream = async (text: string) => {
  try {
    const response = await axios.post(
      ELEVENLABS_API_URL,
      {
        text,
        voice_settings: {
          stability: 0,
          similarity_boost: 0
        }
      },
      {
        headers: {
          'xi-api-key': ELEVENLABS_API_KEY,
          'Content-Type': 'application/json'
        },
        responseType: 'blob' 
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
