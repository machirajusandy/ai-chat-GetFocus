import React, { useRef } from 'react'
import clsx from 'clsx'
import sendIcon from '../../assets/send.png'
import cancelIcon from '../../assets/stop-button.png'
import styles from './PromptInput.module.css'

type PromptInputProps = {
  handleSubmit: (message: string) => void
  cancelPrompt?: () => void
  isFetching?: boolean
}

const PromptInput = ({
  handleSubmit,
  cancelPrompt,
  isFetching
}: PromptInputProps) => {
  const inputRef = useRef<HTMLDivElement>(null)
  const [prompt, setPrompt] = React.useState('')
  const [showPlaceholder, setShowPlaceholder] = React.useState(true)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    setShowPlaceholder(false)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleClickSubmit()
    } else {
      setTimeout(
        () =>
          setPrompt(
            inputRef.current?.innerText || inputRef.current?.textContent || ''
          ),
        0
      )
    }
  }

  const handleClickSubmit = () => {
    if (prompt) {
      handleSubmit(prompt)
      if (inputRef.current) {
        inputRef.current.innerText = '' // Clear input
      }
      setPrompt('')
      setShowPlaceholder(true)
    }
  }

  return (
    <div className={styles.container}>
      <div
        ref={inputRef}
        className={clsx(styles.prompt, showPlaceholder && styles.placeholder)}
        data-placeholder="Type your message..."
        contentEditable
        onKeyDown={handleKeyDown}
        aria-label="prompt"
      ></div>
      {isFetching ? (
        <button
          className={styles.buttonSubmit}
          onClick={cancelPrompt}
          aria-label="cancel"
        >
          <img src={cancelIcon} alt="" height={25} />
        </button>
      ) : (
        <button
          className={styles.buttonSubmit}
          onClick={handleClickSubmit}
          aria-label="submit"
        >
          <img src={sendIcon} alt="" height={25} />
        </button>
      )}
    </div>
  )
}

export default PromptInput
