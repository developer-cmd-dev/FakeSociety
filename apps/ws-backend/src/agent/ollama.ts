import ollama from 'ollama';
import {systemPrompt} from './systemPrompt';

async function generateResponse(prompt: string): Promise<string> {
  try {
    const response = await ollama.chat
    ({
      model: 'qwen3:8B',
      messages: [{
        role: 'system',
        content: systemPrompt
      }, {
        role: 'user',
        content: prompt
      }],
      think:false,
    });
    return   response.message.content

  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
}

export { generateResponse };