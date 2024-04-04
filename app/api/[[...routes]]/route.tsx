/** @jsxImportSource frog/jsx */

import { Button, Frog } from 'frog'
import { Box,  Text,  vars, Columns, Column,   Image } from './ui'
import { devtools } from 'frog/dev'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'

const randomAnswers = [
  'It is certain',
  'Hazy, try again',
  'Don’t count on it',
  'It is decidedly so',
  'Ask again later',
  'My reply is no',
  'Without a doubt',
  'Better not tell you now',
  'My sources say no',
  'Yes definitely',
  'Cannot predict now',
  'Outlook not so good',
  'You may rely on it',
  'Concentrate and ask again',
  'Very doubtful',
  'As I see it, yes',
  'Most likely',
  'Outlook good',
  'Yes',
  'Signs point to yes',

]

const getRandomAnswer = () => {
  return randomAnswers[Math.floor(Math.random() * randomAnswers.length)]
}

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
            backgroundColor="purple300"
            padding="32"
          >
            <Text color="text300" size="20">
              Ask me any yes or no question.
            </Text>
            <Image 
              src="https://nfts-dataw.s3.amazonaws.com/magic-8-ball/froggie-face-left.png" 
              height="256"
              />  
          </Box>
    ),
    intents: [
      <Button value="next">Click for answer</Button>,
    ],
  })
})

app.frame('/part-2', (c) => {
  const { status } = c
  const answer = getRandomAnswer()
  return c.res({
    image: (
      <Columns gap="1" alignVertical='center' grow>
        <Column width='1/4'>
          <Box
            grow
            alignHorizontal="center"
            backgroundColor="purple100"
            padding="16"
          >
            <Text color="text300" size="14">
              Froggie says...
            </Text>
            <Image 
              src="https://nfts-dataw.s3.amazonaws.com/magic-8-ball/froggie-face-right.png" 
              height="256"
              />  
          </Box>
        </Column>
        <Column width='3/4'>
          <Box
            grow
            alignHorizontal="center"
            alignVertical='center'
            backgroundColor="purple300"
            textAlign='center'
            padding="32"
          >
            <Text color="text300" size="64">
              {answer}
            </Text>
          </Box>
        </Column>
      </Columns>
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
