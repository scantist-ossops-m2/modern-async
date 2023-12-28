
import { expect, test } from '@jest/globals'
import snapshot from './snapshot.mjs'
import delay from './delay.mjs'

test('snapshot base test', async () => {
  const res1 = await snapshot(async () => {
    await delay()
    return 3
  })

  expect(typeof (res1) === 'object').toBeTruthy()
  expect(res1.status).toStrictEqual('fulfilled')
  expect(res1.value).toStrictEqual(3)
  expect(res1.reason).toBeUndefined()
})

test('snapshot falure', async () => {
  const res1 = await snapshot(async () => {
    await delay()
    throw new Error('error')
  })

  expect(typeof (res1) === 'object').toBeTruthy()
  expect(res1.status).toStrictEqual('rejected')
  expect(res1.value).toBeUndefined()
  expect(res1.reason).toBeInstanceOf(Error)
  expect(res1.reason.message).toStrictEqual('error')
})
