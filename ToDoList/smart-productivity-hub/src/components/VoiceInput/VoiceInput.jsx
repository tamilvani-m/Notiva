import { Mic, MicOff } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import { useAppData } from '../../hooks/useAppData'
import { parseTaskCommand } from '../../utils/voiceCommands'

function VoiceInput() {
  const { addTask } = useAppData()
  const [status, setStatus] = useState('')
  const [isListening, setIsListening] = useState(false)
  const finalTranscriptRef = useRef('')
  const hasSavedRef = useRef(false)

  const SpeechRecognition = useMemo(
    () => window.SpeechRecognition || window.webkitSpeechRecognition,
    [],
  )

  const startListening = () => {
    if (isListening) return

    if (!SpeechRecognition) {
      setStatus('Voice input is not supported in this browser. Try Chrome or Edge.')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.continuous = false
    recognition.interimResults = false
    recognition.maxAlternatives = 1
    finalTranscriptRef.current = ''
    hasSavedRef.current = false

    recognition.onstart = () => {
      setIsListening(true)
      setStatus('Listening. Speak one task clearly, then pause.')
    }

    recognition.onerror = () => {
      setIsListening(false)
      setStatus('Could not hear that clearly. Try again.')
    }

    recognition.onend = () => {
      setIsListening(false)

      const transcript = finalTranscriptRef.current.trim()

      if (!transcript || hasSavedRef.current) return

      const task = parseTaskCommand(transcript)
      addTask(task)
      hasSavedRef.current = true
      setStatus(`Added: ${task.title}`)
    }

    recognition.onresult = (event) => {
      const finalParts = []

      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        if (event.results[index].isFinal) {
          finalParts.push(event.results[index][0].transcript)
        }
      }

      if (finalParts.length) {
        finalTranscriptRef.current = finalParts.join(' ')
        setStatus(`Heard: ${finalTranscriptRef.current}`)
      }
    }

    recognition.start()
  }

  return (
    <div className="voice-control">
      <button
        type="button"
        className={`secondary-action ${isListening ? 'listening' : ''}`}
        onClick={startListening}
        disabled={isListening}
      >
        {isListening ? <MicOff size={18} /> : <Mic size={18} />}
        <span>{isListening ? 'Listening' : 'Voice Add'}</span>
      </button>
      {status && <span className="voice-status">{status}</span>}
    </div>
  )
}

export default VoiceInput
