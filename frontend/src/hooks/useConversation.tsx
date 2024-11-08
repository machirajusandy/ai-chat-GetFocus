import { useState } from 'react'

export type Conversation = {
  user: {
    timestamp: number
    message: string
  }
  assistant: {
    timestamp: number
    message: string
  }
}

const useConversation = () => {
  const [conversation, setConversationState] = useState<Conversation[]>(() => {
    const data = localStorage.getItem('conversation')
    if (data) {
      return JSON.parse(data)
    }
    return []
  })

  const setConversation = (
    newConversation:
      | Conversation[]
      | ((prevConversation: Conversation[]) => Conversation[])
  ) => {
    setConversationState((prevConversation) => {
      const updatedConversation =
        typeof newConversation === 'function'
          ? newConversation(prevConversation)
          : newConversation
      localStorage.setItem('conversation', JSON.stringify(updatedConversation))
      return updatedConversation
    })
  }

  const clearConversation = () => {
    setConversation([])
    localStorage.removeItem('conversation')
  }
  return { conversation, setConversation, clearConversation }
}

export default useConversation
