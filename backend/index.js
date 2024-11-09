const express = require('express')
const axios = require('axios')
const cors = require('cors')

const PORT = 4005

const app = express()
app.use(cors())

app.get('/stream', async (req, res) => {
  try {
    const response = await axios.get(
      'https://jaspervdj.be/lorem-markdownum/markdown.txt?reference-links=on&no-external-links=on'
    )
    const markdownContent = response.data

    // Set headers for SSE
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    // Split content into chunks, e.g., 50 characters each
    const chunkSize = 50
    const chunks = []
    for (let i = 0; i < markdownContent.length; i += chunkSize) {
      chunks.push(markdownContent.slice(i, i + chunkSize))
    }

    // Send chunks as individual SSE messages
    chunks.forEach((chunk, index) => {
      setTimeout(() => {
        res.write(
          `data: ${JSON.stringify({
            data: chunk,
            status: 'data',
            message: ''
          })}\n\n`
        )
        if (index === chunks.length - 1)
          res.write(
            `data: ${JSON.stringify({
              data: null,
              status: 'end',
              message: ''
            })}\n\n`
          ) // End event
      }, index * 200) // Adjust delay as needed
    })
  } catch (error) {
    console.error('API fetch error:', error)
    res.status(500).send('Failed to retrieve file')
  }
})

app.listen(PORT, () => console.log('Server running on port ' + PORT))
