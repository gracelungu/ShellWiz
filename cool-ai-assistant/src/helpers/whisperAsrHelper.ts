import axios from 'axios';

const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/audio/transcriptions';

export const transcribeAudio = async (audioBlob: Blob) => {
  try {
    const formData = new FormData();
    formData.append('file', audioBlob, 'audio.mp3');
    formData.append('model', 'whisper-1');

    const headers = {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    };

    const response = await axios.post(OPENAI_API_URL, formData, { headers });
    return response.data.text;
  } catch (error) {
    throw error;
  }
};
