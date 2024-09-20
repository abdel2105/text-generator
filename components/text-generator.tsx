"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { Moon, Sun } from "lucide-react"



function useTypingEffect(text: string, speed: number =25 ) {
  const [returnedText, setReturnedText] = useState("");
  useEffect(() => {
    let i = -1; // Índice para los caracteres

    const type = () => {
      if (i < text.length) {
        setReturnedText((prev) => prev + text.charAt(i)); // Añadir el carácter
        setTimeout(() => {
          i++;
          requestAnimationFrame(type); // Continuar la animación
        }, speed); // Llamada recursiva para el siguiente carácter
      }
    };

    setReturnedText(""); // Reiniciar el texto mostrado
    type(); // Iniciar el proceso de escritura

    return () => {}; // Opcional: se puede limpiar si es necesario
  }, [text, speed]);
  
  return returnedText;
}

async function query(inputText: string) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/google/gemma-2-2b-it",
    {
      method: "POST",
      
      headers: {
        Authorization: `Bearer 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`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: inputText,
        parameters: {
          temperature: 0.8,
          max_new_tokens: 100
        },
      }),
    }
  );
  const result = await response.json();
  return result;
}



export function TextGeneratorComponent() {
  const [input, setInput] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [isInputMode, setIsInputMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const displayedText = useTypingEffect(generatedText);
  
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    setIsDarkMode(prefersDark)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    
    e.preventDefault()
    setIsLoading(true)
    // Simulate text generation with a delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    //checkModelStatus();
    query(input).then((response) => {
      console.log(JSON.stringify(response, null, 2))
      setGeneratedText(response[0]?.generated_text);
    });
    setIsLoading(false);
    setIsInputMode(false);
    setInput("");
  }

  const handleReset = () => {
    setInput("");
    setGeneratedText("");
    setIsInputMode(true);
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  }

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-4 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      <Card className={`w-full max-w-2xl shadow-lg transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 text-white border-0' : 'bg-white border border-gray-200'}`}>
        <CardHeader className="text-center relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardTitle className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Text Generator</CardTitle>
          </motion.div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          <AnimatePresence mode="wait">
            {isInputMode ? (
              <motion.form
                key="input"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Enter your prompt here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className={`w-full text-lg p-4 rounded-lg transition-colors ${
                      isDarkMode
                        ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-400'
                        : 'bg-white text-gray-800 border-gray-300 focus:border-blue-500'
                    }`}
                    maxLength={100}
                  />
                  <span className={`absolute right-2 bottom-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {input.length}/100
                  </span>
                </div>
                <Button
                  type="submit"
                  className={`w-full font-semibold py-3 rounded-lg transition-all duration-300 ${
                    isDarkMode
                      ? 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                      : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-[0_0_15px_rgba(37,99,235,0.5)]'
                  }`}
                  disabled={input.length === 0}
                >
                  Generate Text
                </Button>
              </motion.form>
            ) : (
              <motion.div
                key="output"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className={`p-6 rounded-lg min-h-[150px] shadow-inner transition-colors ${
                  isDarkMode
                    ? 'bg-gray-700 text-white'
                    : 'bg-white border border-gray-200 text-gray-800'
                }`}>
                  <p className="text-lg leading-relaxed">
                    {displayedText}
                    <span className="animate-pulse">|</span>
                  </p>
                </div>
                <Button
                  onClick={handleReset}
                  className={`w-full font-semibold py-3 rounded-lg transition-all duration-300 ${
                    isDarkMode
                      ? 'bg-green-600 hover:bg-green-700 text-white hover:shadow-[0_0_15px_rgba(22,163,74,0.5)]'
                      : 'bg-green-600 hover:bg-green-700 text-white hover:shadow-[0_0_15px_rgba(21,128,61,0.5)]'
                  }`}
                >
                  Submit Another Prompt
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg"
            >
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}