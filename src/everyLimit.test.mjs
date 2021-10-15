
import { expect, test } from '@jest/globals'
import everyLimit from './everyLimit.mjs'
import Deferred from './Deferred.mjs'
import { range } from 'itertools'

test('everyLimit compatibility', async () => {
  let d = new Deferred()
  let p = everyLimit([...range(3)], async (v) => {
    await d.promise
    return true
  }, 1)
  d.resolve()
  expect(await p).toBe([...range(3)].every((v) => true))

  d = new Deferred()
  p = everyLimit([...range(3)], async (v) => {
    await d.promise
    return v !== 2
  }, 1)
  d.resolve()
  expect(await p).toBe([...range(3)].every((v) => v !== 2))

  d = new Deferred()
  p = everyLimit([...range(3)], async (v) => {
    await d.promise
    return false
  }, 1)
  d.resolve()
  expect(await p).toBe([...range(3)].every((v) => false))

  d = new Deferred()
  p = everyLimit([], async (v) => {
    await d.promise
    return false
  }, 1)
  d.resolve()
  expect(await p).toBe([].every((v) => false))

  d = new Deferred()
  p = everyLimit([], async (v) => {
    await d.promise
    return true
  }, 1)
  d.resolve()
  expect(await p).toBe([].every((v) => true))
})

test('everyLimit parallel', async () => {
  let d = new Deferred()
  let p = everyLimit([...range(3)], async (v) => {
    await d.promise
    return true
  }, 10)
  d.resolve()
  expect(await p).toBe([...range(3)].every((v) => true))

  d = new Deferred()
  p = everyLimit([...range(3)], async (v) => {
    await d.promise
    return v !== 2
  }, 10)
  d.resolve()
  expect(await p).toBe([...range(3)].every((v) => v !== 2))

  d = new Deferred()
  p = everyLimit([...range(3)], async (v) => {
    await d.promise
    return false
  }, 10)
  d.resolve()
  expect(await p).toBe([...range(3)].every((v) => false))

  d = new Deferred()
  p = everyLimit([], async (v) => {
    await d.promise
    return false
  }, 10)
  d.resolve()
  expect(await p).toBe([].every((v) => false))

  d = new Deferred()
  p = everyLimit([], async (v) => {
    await d.promise
    return true
  }, 10)
  d.resolve()
  expect(await p).toBe([].every((v) => true))
})

test('everyLimit first in time', async () => {
  const ds = [...range(3)].map(() => new Deferred())
  const p = everyLimit(range(3), async (v, i) => {
    await ds[i]
    return false
  }, 3)
  ds[2].resolve()
  const res = await p
  expect(res).toBe(false)
})
