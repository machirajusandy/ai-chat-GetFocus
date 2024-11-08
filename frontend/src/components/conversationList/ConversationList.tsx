import { type Conversation } from '../../hooks/useConversation'
import AssistantMessage from '../assistantMessage'
import UserMessage from '../userMessage'
import styles from './ConversationList.module.css'
import { useEffect, useRef } from 'react'
import useScrollListener from '../../hooks/useScrollListener'

type ConversationProps = {
  conversation: Conversation[]
}

const ConversationList = ({ conversation }: ConversationProps) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null)
  const autoScrollEnabled = useScrollListener()

  useEffect(() => {
    if (autoScrollEnabled) {
      endOfMessagesRef.current?.scrollIntoView({ behavior: 'instant' })
    }
  }, [conversation, autoScrollEnabled])

  return (
    <div>
      {conversation?.map((item, index) => (
        <div key={index} className={styles.container}>
          <UserMessage message={item.user.message} />
          <AssistantMessage message={item.assistant.message} />
        </div>
      ))}
      <div ref={endOfMessagesRef} />
    </div>
  )
}

export default ConversationList
