import { useRef, useState } from 'react'
import PromptInput from './components/promptInput'
import { services } from './services'
import useConversation from './hooks/useConversation'
import ConversationList from './components/conversationList'
import styles from './App.module.css'
import wipeIcon from './assets/broom.png'

function App() {
  const { conversation, setConversation, clearConversation } = useConversation()
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState(false)

  const cancelPrompt = useRef<() => void>()

  const updateConversation = (data: string) => {
    setConversation((oldConversation) => {
      const updatedConversation = [...(oldConversation || [])]
      const lastIndex = updatedConversation.length - 1
      if (updatedConversation[lastIndex] !== undefined) {
        updatedConversation[lastIndex].assistant.message += data
      }
      return updatedConversation
    })
  }

  function handleCancel() {
    cancelPrompt.current?.()
    setIsFetching(false)
  }

  function handleSubmit(prompt: string) {
    if (!prompt) {
      return
    }
    const updatedConversation = conversation ? [...conversation] : []
    updatedConversation.push({
      user: { message: prompt, timestamp: Date.now() },
      assistant: { message: '', timestamp: Date.now() }
    })
    setConversation(updatedConversation)
    setIsFetching(true)
    setError(false)
    const { cancelEvent } = services.readEvent({
      prompt,
      onGetData: updateConversation,
      onEnd: () => setIsFetching(false),
      onError: () => setError(true)
    })
    cancelPrompt.current = cancelEvent
  }
  return (
    <div className={styles.container}>
      <div className={styles.clearConversationWrapper}>
        <button
          className={styles.clearConversation}
          onClick={clearConversation}
          disabled={isFetching || conversation.length === 0}
        >
          <img src={wipeIcon} alt="" height={25} />
          Clear
        </button>
      </div>
      <ConversationList conversation={conversation} />
      {error && (
        <div className={styles.errorContainer}>
          <p>There was an error processing your request</p>
        </div>
      )}
      <div className={styles.promptContainer}>
        <PromptInput
          handleSubmit={handleSubmit}
          cancelPrompt={handleCancel}
          isFetching={isFetching}
        />
      </div>
    </div>
  )
}

export default App
