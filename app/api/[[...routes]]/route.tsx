/** @jsxImportSource frog/jsx */

import { Button, Frog } from 'frog'
import { Box, Heading, Text, VStack, vars } from './ui'
import { devtools } from 'frog/dev'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  ui: { vars },
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.frame('/', (c) => {
  const { buttonValue, inputText, status } = c
  const fruit = inputText || buttonValue
  return c.res({
    action: '/part-2',
    image: (
      <Box
        grow
        alignHorizontal="center"
        backgroundColor="background"
        padding="32"
      >
        <VStack gap="10">
          <Heading>FrogUI 🐸</Heading>
          <Text color="text300" size="20">
            Build consistent Kenny experiences
          </Text>
        </VStack>
        
        
      </Box>
    ),
    intents: [

      <Button value="next">Next</Button>,


    ],
  })
})

app.frame('/part-2', (c) => {
  const { status } = c
  // const fruit = inputText || buttonValue
  return c.res({
    image: (
      <Box
        grow
        alignHorizontal="center"
        backgroundColor="background"
        padding="32"
      >
        <VStack gap="10">
          <Heading>Hey there. 🐸</Heading>
          <Text color="text300" size="20">
            You made it.
          </Text>
        </VStack>
        
        
      </Box>
    ),
    intents: [

      <Button value="retry">Try again</Button>,
      status === 'response' && <Button.Reset>Reset</Button.Reset>,
    ],
  })
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
