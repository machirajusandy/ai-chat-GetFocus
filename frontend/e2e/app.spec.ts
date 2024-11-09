import { test, expect } from '@playwright/test'


test('has a prompt', async ({ page, baseURL }) => {
  if(!baseURL){
    throw new Error('You must pass a baseUrl')
  }
  await page.goto(baseURL)
  const prompt = page.getByLabel(/prompt/i)
  expect(prompt).not.toBeNull()
  const cancelButton = page.getByLabel(/cancel/i)
  expect(cancelButton).not.toBeNull()
})

test('should show the conversation', async ({ page , baseURL}) => {
  if(!baseURL){
    throw new Error('You must pass a baseUrl')
  }
  await page.goto(baseURL)

  const input = page.getByLabel('prompt')
  const message = 'Hello World'
  message.split('').forEach(async (char) => {
    await input.press(char)
  })
  await input.press(' ')
  await page.getByLabel(/submit/i).click()
  const userMessage = page.getByLabel('user-message')
  await userMessage.waitFor({ state: 'visible' })
  const assistantMessage = page.getByLabel('assistant-message')
  await assistantMessage.waitFor({ state: 'visible' })
  await expect(userMessage).toHaveText(message)
})

test('should cancel the prompt', async ({ page, baseURL }) => {
  if(!baseURL){
    throw new Error('You must pass a baseUrl')
  }
  await page.goto(baseURL)
  const input = page.getByLabel('prompt')
  const message = 'Hello World'
  message.split('').forEach(async (char) => {
    await input.press(char)
  })
  await input.press(' ')

  const submitButton = page.getByLabel(/submit/i)
  await submitButton.click()

  const userMessage = page.getByLabel('user-message')
  await userMessage.waitFor({ state: 'visible' })

  const assistantMessage = page.getByLabel('assistant-message')
  await assistantMessage.waitFor({ state: 'visible' })

  const cancelButton = page.getByLabel(/cancel/i)
  await cancelButton.click()

  await cancelButton.waitFor({ state: 'hidden' })

  await submitButton.waitFor({ state: 'visible' })
})

test('should save the conversation to local storage ', async ({ page,baseURL }) => {
  if(!baseURL){
    throw new Error('You must pass a baseUrl')
  }
  await page.goto(baseURL)
  const input = page.getByLabel('prompt')
  const message = 'Hello World'
  message.split('').forEach(async (char) => {
    await input.press(char)
  })
  await input.press(' ')

  const submitButton = page.getByLabel(/submit/i)
  await submitButton.click()

  const userMessage = page.getByLabel('user-message')
  await userMessage.waitFor({ state: 'visible' })

  const assistantMessage = page.getByLabel('assistant-message')
  await assistantMessage.waitFor({ state: 'visible' })

  const localStorageValue = await page.evaluate(() => {
    return localStorage.getItem('conversation')
  })

  expect(localStorageValue).toContain(message)
})

test('should load the conversation from local storage', async ({ page,baseURL }) => {
  if(!baseURL){
    throw new Error('You must pass a baseUrl')
  }
  await page.goto(baseURL)

  await page.evaluate(() => {
    localStorage.setItem(
      'conversation',
      JSON.stringify([
        {
          user: { message: 'Hello World' },
          assistant: { message: 'You Are Awesome' }
        }
      ])
    )
  })

  await page.reload()

  const userMessage = page.getByLabel('user-message')
  await userMessage.waitFor({ state: 'visible' })
  
  const assistantMessage = page.getByLabel('assistant-message')
  await assistantMessage.waitFor({ state: 'visible' })

  await expect(userMessage).toHaveText('Hello World')
  await expect(assistantMessage).toHaveText('You Are Awesome')
})

test('should clear the conversation', async ({ page,baseURL }) => {
  if(!baseURL){
    throw new Error('You must pass a baseUrl')
  }
  await page.goto(baseURL)

  await page.evaluate(() => {
    localStorage.setItem(
      'conversation',
      JSON.stringify([
        {
          user: { message: 'Hello World' },
          assistant: { message: 'You Are Awesome' }
        }
      ])
    )
  })

  await page.reload()

  const clearButton = page.getByRole('button', { name: /clear/i })
  await clearButton.isEditable()
  await clearButton.click()

  const localStorageValue = await page.evaluate(() => {
    return localStorage.getItem('conversation')
  })

  expect(localStorageValue).toBeNull()
})
