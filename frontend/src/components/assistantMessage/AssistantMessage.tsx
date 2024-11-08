import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import assistantIcon from '../../assets/secretary.png'

import styles from './AssistantMessage.module.css'
import { transformTextToMarkdownLink } from '../../utils'

type AssistantMessageProps = {
  message: string
}

const AssistantMessage = ({ message }: AssistantMessageProps) => {
  const transformedData = transformTextToMarkdownLink(
    message,
    'markdownum',
    'https://en.wikipedia.org/wiki/Markdown'
  )
  return (
    <div className={styles.container}>
      <div>
        <img src={assistantIcon} alt="Assistant" />
        <div aria-label="assistant-message">
          <ReactMarkdown
            children={transformedData}
            remarkPlugins={[remarkGfm]}
            components={{
              code(props) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { children, className, ref, ...rest } = props
                return (
                  <SyntaxHighlighter
                    {...rest}
                    PreTag="div"
                    children={String(children).replace(/\n$/, '')}
                    language="javascript"
                    style={docco}
                  />
                )
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default AssistantMessage
