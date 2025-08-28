import React, { useState, useEffect, useRef } from 'react';

const useEditor = () => {
  const [selectedElement, setSelectedElement] = useState(null);
  const updateElement = (id, updates) => console.log("Mock updateElement", id, updates);
  const [html, setHtml] = useState("<p>Initial HTML content for AI Assistant</p>"); 
  return { selectedElement, updateElement, html, setSelectedElement, setHtml }; 
};

import Toolbar from './Toolbar';
import Preview from './Preview';
import PropertiesPanel from './PropertiesPanel';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Placeholder for the system prompt. Define it according to your AI's requirements.
const systemprompt = `You are an AI assistant integrated into a web design editor. Your goal is to help the user modify HTML content based on their instructions.

First, you will go through a "Thinking Process". In this phase, analyze the user's request and the current HTML structure. Break down the problem:
1.  Understand the User's Goal: What does the user want to achieve?
2.  Identify Target Elements: Which HTML elements need to be modified, added, or removed?
3.  Plan the Changes: What specific attributes, styles, or content need to change? Are there any new elements to create?
4.  Consider Dependencies/Context: How will these changes affect other parts of the HTML or the overall layout?
Output this thinking process clearly so the user can understand your reasoning.

Second, based on your "Thinking Process", you will generate the "Final Output". This output should be:
- Clear, concise instructions if the task is complex and requires user understanding.
- Specific HTML code changes (e.g., "Change <p class='old'> to <p class='new'>", "Add style 'color: blue;' to element with ID 'target'").
- If providing new HTML, ensure it's well-formed.
- If the request is ambiguous or impossible, explain why and ask for clarification.

User instruction will provide the current HTML context and their specific request.
Example User Instruction: "currentHtml:<div id='foo'>Hello</div>, userInstruction:Change the text of div foo to 'Goodbye' and make it red."

Your Thinking Process might be:
1. Goal: Change text and color of div with id 'foo'.
2. Target: <div id='foo'>.
3. Plan:
    - Text content: 'Hello' -> 'Goodbye'.
    - Style: Add 'color: red;'.
4. Context: Simple change, unlikely to affect other elements.

Your Final Output might be:
Modify the div with id 'foo' as follows:
- Change its text content to "Goodbye".
- Add the style "color: red;" to it.
Resulting HTML snippet (if applicable): <div id='foo' style='color: red;'>Goodbye</div>

Focus on providing actionable steps or directly modifiable code for the editor.
The user's HTML context will be provided in the format: "currentHtml:..., userInstruction:...".
Your thinking process should be detailed. Your final output should be actionable.`;

// Tab components
const AIAssistant = ({ onSubmit }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [aiThinking, setAiThinking] = useState('');
  const [showThinking, setShowThinking] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [hasStoredKey, setHasStoredKey] = useState(false);
  const [isStreaming, setIsStreaming] = useState(true);
  const { html } = useEditor(); // Get HTML from context
  const responseRef = useRef(null);
  const thinkingRef = useRef(null);

  useEffect(() => {
    const storedKey = localStorage.getItem('gemini_api_key');
    if (storedKey) {
      setApiKey(storedKey);
      setHasStoredKey(true);
    }
  }, []);

  useEffect(() => {
    if (responseRef.current) {
      responseRef.current.scrollTop = responseRef.current.scrollHeight;
    }
  }, [aiResponse]);

  useEffect(() => {
    if (thinkingRef.current) {
      thinkingRef.current.scrollTop = thinkingRef.current.scrollHeight;
    }
  }, [aiThinking]);

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('gemini_api_key', apiKey);
      setHasStoredKey(true);
    }
  };

  const removeApiKey = () => {
    localStorage.removeItem('gemini_api_key');
    setApiKey('');
    setHasStoredKey(false);
    setAiResponse(''); // Clear previous responses
    setAiThinking('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || !apiKey.trim()) return;

    setIsLoading(true);
    setAiResponse('');
    setAiThinking(''); // Clear previous thinking

    try {
      await processThinkingRequest();
      // Only proceed to output if thinking was successful (or handled gracefully)
      await processOutputRequest(); 
    } catch (error) {
      console.error('Error getting AI response:', error);
      setAiResponse(`Sorry, there was an error processing your request. Details: ${error.message}. Please check your network connection and API key.`);
    } finally {
      setIsLoading(false);
    }
  };

  const processThinkingRequest = async () => {
    setAiThinking('Thinking...'); // Initial thinking message
  
    const thinkingPromptPayload = `"currentHtml:${html}", userInstruction:"${prompt}"`;
  
    try {
      if (isStreaming) {
        const genAI = new GoogleGenerativeAI(apiKey);
        // Ensure the model name is correct as per Google's documentation/availability.
        // "gemini-1.5-flash-latest" or "gemini-1.5-pro-latest" are common.
        // Using "gemini-1.5-flash" as a fallback if "gemini-2.0-flash" is unavailable.
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Or "gemini-2.0-flash" if it's confirmed available
  
        const result = await model.generateContentStream({
          contents: [
            { role: "system", parts: [{ text: systemprompt }] },
            { role: "user", parts: [{ text: thinkingPromptPayload }] }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800, // Adjust as needed
          },
        });
  
        let fullThinking = '';
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          fullThinking += chunkText;
          setAiThinking(fullThinking);
        }
      } else { // Non-streaming for thinking
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, { // Or "gemini-2.0-flash"
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              { role: "system", parts: [{ text: systemprompt }] },
              { role: "user", parts: [{ text: thinkingPromptPayload }] }
            ],
            generationConfig: { temperature: 0.7, maxOutputTokens: 800 },
          }),
        });
  
        const data = await response.json();
        if (response.ok && data.candidates && data.candidates.length > 0) {
          const thinkingText = data.candidates[0]?.content?.parts[0]?.text || "No thinking process generated.";
          setAiThinking(thinkingText);
        } else {
          console.error('API error (thinking):', data);
          setAiThinking(`API Error (thinking): ${data.error?.message || 'Unknown error'}`);
        }
      }
    } catch (error) {
      console.error('Error in thinking process:', error);
      setAiThinking(`Error in thinking process: ${error.message}. Please try again.`);
    }
  };
  
  const processOutputRequest = async () => {
    // Use the accumulated thinking process (aiThinking) if needed for the output prompt,
    // or ensure the output prompt is self-contained based on original prompt + system guidance.
    const outputPromptPayload = `Based on the thinking process and the user's request ("${prompt}"), generate the web design modifications or instructions. Current HTML for context: "${html}"`;
  
    try {
      if (isStreaming) {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Or "gemini-2.0-flash"
  
        const result = await model.generateContentStream({
          contents: [
            // You might want a more specific system prompt for output generation phase
            { role: "system", parts: [{ text: "You are providing the final actionable output for a web design editor." }] }, 
            { role: "user", parts: [{ text: outputPromptPayload }] }
          ],
          generationConfig: { temperature: 0.7, maxOutputTokens: 800 },
        });
  
        let fullResponse = '';
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          fullResponse += chunkText;
          setAiResponse(fullResponse);
        }
        if (onSubmit && fullResponse.trim()) {
          onSubmit(prompt, fullResponse);
        }
      } else { // Non-streaming for output
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, { // Or "gemini-2.0-flash"
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
                { role: "system", parts: [{ text: "You are providing the final actionable output for a web design editor." }] },
                { role: "user", parts: [{ text: outputPromptPayload }] }
            ],
            generationConfig: { temperature: 0.7, maxOutputTokens: 800 },
          }),
        });
  
        const data = await response.json();
        if (response.ok && data.candidates && data.candidates.length > 0) {
          const generatedText = data.candidates[0]?.content?.parts[0]?.text || "No response generated.";
          setAiResponse(generatedText);
          if (onSubmit && generatedText.trim()) {
            onSubmit(prompt, generatedText);
          }
        } else {
          console.error('API error (output):', data);
          const errorMessage = data.error?.message || 'Unknown error occurred';
          if (data.error?.code === 400 || errorMessage.toLowerCase().includes("api key")) {
            setAiResponse('API Error: Invalid API key or request format. Please check your API key.');
          } else {
            setAiResponse(`API Error (output): ${errorMessage}`);
          }
        }
      }
    } catch (error) {
      console.error('Error in output generation:', error);
      setAiResponse(`Error generating output: ${error.message}. Please try again.`);
    }
  };

  return (
    <div className="p-4 h-full flex flex-col bg-slate-800 text-slate-100"> {/* Matched panel bg */}
      <h3 className="text-lg font-semibold text-slate-100 mb-4">AI Assistant</h3>

      {!hasStoredKey ? (
        <div className="mb-4 p-4 bg-slate-700 rounded-lg border border-slate-600 shadow-md">
        <h4 className="font-medium text-slate-100 mb-2">Set up Gemini API Key</h4>
        <p className="text-slate-300 mb-3 text-sm">
          Please enter your Gemini API key to enable AI features.
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 hover:underline ml-1 font-medium"
          >
            Get an API Key
          </a>
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
          <input
            type="password"
            className="w-full sm:flex-grow p-2 bg-slate-800 border border-slate-500 rounded text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none placeholder-slate-400"
            placeholder="Paste your Gemini API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <button
            onClick={saveApiKey}
            disabled={!apiKey.trim()}
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded font-medium shadow-sm transition-colors"
          >
            Save Key
          </button>
        </div>
      </div>      
      ) : (
        <div className="flex flex-col flex-grow h-full"> {/* flex-grow to use available space */}
          <div className="flex border-b border-slate-600 mb-3">
            <TabButton
              active={!showThinking}
              onClick={() => setShowThinking(false)}
              isFirst // For potential left rounding if needed, or specific styling
            >
              Final Output
            </TabButton>
            <TabButton
              active={showThinking}
              onClick={() => setShowThinking(true)}
              isLast // For potential right rounding
            >
              Thinking Process
            </TabButton>
          </div>

          <div className="flex-grow overflow-hidden"> {/* This container will scroll its content */}
            {showThinking ? (
              <div
                ref={thinkingRef}
                className="h-full p-3 bg-slate-700 rounded-b-lg border border-t-0 border-slate-600 overflow-y-auto custom-scrollbar"
              >
                {aiThinking ? (
                  <pre className="text-slate-200 whitespace-pre-wrap text-sm font-mono">{aiThinking}</pre>
                ) : (
                  <p className="text-slate-400 italic">AI thinking process will appear here once you submit a prompt.</p>
                )}
              </div>
            ) : (
              <div
                ref={responseRef}
                className="h-full p-3 bg-slate-700 rounded-b-lg border border-t-0 border-slate-600 overflow-y-auto custom-scrollbar"
              >
                {aiResponse ? (
                  <pre className="text-slate-200 whitespace-pre-wrap text-sm font-mono">{aiResponse}</pre>
                ) : (
                  <p className="text-slate-400 italic">AI responses will appear here.</p>
                )}
              </div>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="mt-4 pt-4 border-t border-slate-600">
            <div className="flex flex-col space-y-3">
              <textarea
                className="w-full p-3 bg-slate-700 border border-slate-500 rounded text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none placeholder-slate-400 custom-scrollbar"
                placeholder="Describe the changes you want to make to your HTML..."
                rows="4"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isLoading}
              />
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <button
                    type="submit"
                    disabled={isLoading || !prompt.trim() || !hasStoredKey}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 disabled:cursor-not-allowed text-white rounded font-medium shadow-sm transition-colors flex items-center justify-center min-w-[120px]"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Send to AI'
                    )}
                  </button>
                  <div className="flex items-center">
                    <input
                      id="streaming-toggle"
                      type="checkbox"
                      checked={isStreaming}
                      onChange={() => setIsStreaming(!isStreaming)}
                      disabled={isLoading}
                      className="mr-2 h-4 w-4 rounded border-slate-400 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-800"
                    />
                    <label htmlFor="streaming-toggle" className="text-sm text-slate-300 select-none">Enable streaming</label>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeApiKey}
                  className="text-slate-400 hover:text-red-400 text-sm underline hover:no-underline transition-colors"
                >
                  Change API Key
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

// Generic TabButton component - can be moved to a shared components file
const TabButton = ({ active, onClick, children, isFirst, isLast }) => (
  <button
    className={`px-4 py-2.5 -mb-px font-medium text-sm focus:outline-none transition-all duration-150 ease-in-out
      ${isFirst ? 'rounded-tl-md' : ''}
      ${isLast ? 'rounded-tr-md' : ''}
      ${active
        ? 'bg-slate-700 text-slate-100 border-x border-t border-slate-600' // Active tab connected to content below
        : 'bg-slate-800 text-slate-400 hover:bg-slate-750 hover:text-slate-300 border-b border-slate-600' // Inactive tabs form the top bar
      }`}
    onClick={onClick}
  >
    {children}
  </button>
);


const EditorLayout = () => {
  const { selectedElement, updateElement } = useEditor();
  const [activeTab, setActiveTab] = useState('properties'); // Default to properties
  const [viewport, setViewport] = useState('desktop');

  const handleAIPrompt = (promptText, aiSuggestion) => {
    console.log("AI Prompt Submitted:", promptText);
    console.log("AI Suggestion:", aiSuggestion);
    // Here you would implement logic to parse aiSuggestion and apply it
    // For example, if aiSuggestion is HTML, you might update an element's innerHTML
    // Or if it's a list of style changes, apply them to selectedElement
    if (selectedElement && aiSuggestion) {
      // This is a placeholder. Actual implementation depends on AI response format.
      // Example: updateElement(selectedElement.id, { content: aiSuggestion });
      alert(`AI suggested changes for element ${selectedElement.id}. See console for details.`);
    } else if (aiSuggestion) {
        alert(`AI suggested general changes. See console for details.`);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-slate-300 antialiased">
      <Toolbar viewport={viewport} setViewport={setViewport} />
      <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
        {/* Left Panel: Tabs (Properties & AI Assistant) */}
        <div className="w-full max-w-[360px] md:w-2/5 lg:w-1/3 h-1/2 md:h-full overflow-hidden flex flex-col bg-slate-800 border-r border-slate-600">
          {/* Tab Navigation */}
         

          {/* Tab Content */}
          <div className="flex-grow overflow-y-auto custom-scrollbar"> 
            {activeTab === 'properties' && (
              <div className="h-full"> 
                <PropertiesPanel />
                {!selectedElement && (
                  <div className="flex items-center justify-center h-full text-center p-8">
                    <div className="max-w-sm">
                      <svg className="mx-auto h-12 w-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h3 className="mt-2 text-lg font-medium text-slate-100">No element selected</h3>
                      <p className="mt-1 text-sm text-slate-400">
                        Click on an element in the preview canvas to see and edit its properties.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'ai' && (
              <AIAssistant onSubmit={handleAIPrompt} />
            )}
          </div>
        </div>
        <div className="w-full md:w-3/5 lg:w-full h-1/2 md:h-full overflow-auto bg-slate-700">
          <Preview viewport={viewport} />
        </div>
      </div>
    </div>
  );
};

export default EditorLayout;
