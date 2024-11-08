import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styles from './UserMessage.module.css'

type userMessageProps = {
  message: string
}

const UserMessage = ({ message }: userMessageProps) => {
  return (
    <div className={styles.container} aria-label="user-message">
      <ReactMarkdown children={message} remarkPlugins={[remarkGfm]} />
    </div>
  )
}

export default UserMessage
