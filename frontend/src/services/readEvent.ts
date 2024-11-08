const url = import.meta.env.VITE_READ_EVENT_URL as string

export function readEvent({
  prompt,
  onGetData,
  onEnd
}: {
  prompt: string
  onGetData: (data: string) => void
  onEnd: () => void
}) {
  const eventSource = new EventSource(`${url}?prompt=${prompt}`)

  eventSource.onopen = () => {
    console.log('Connection opened')
  }

  eventSource.onmessage = (event) => {
    const parsedData = JSON.parse(event.data)

    switch (parsedData.status) {
      case 'start':
        console.log('Start of data stream')
        break
      case 'data':
        onGetData(parsedData.data)
        break
      case 'end':
        console.log('End of data stream')
        onEnd()
        eventSource.close()
        break
      case 'error':
        console.error(parsedData.message)
        onEnd()
        eventSource.close()
        break
      default:
        console.warn('Unknown status:', parsedData.status)
    }
  }

  eventSource.onerror = (error) => {
    console.error('EventSource error:', error)
    onEnd()
    eventSource.close()
  }
  return { cancelEvent: () => eventSource.close() }
}
