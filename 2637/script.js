/**
 * @param {Function} fn
 * @param {number} t
 * @return {Function}
 */

const timeLimit = (fn, t) => {
  return (...args) => {
    const { promise, resolve, reject } = Promise.withResolvers()

    const timeoutId = setTimeout(() => {
      reject(`Time Limit Exceeded`)
    }, t)

    fn(...args)
      .then(resolve)
      .catch(reject)
      .finally(() => {
        timeoutId && clearTimeout(timeoutId)
      })

    return promise
  }
}

// const timeLimit = (fn, t) => {
//   return (...args) => {
//     const timeoutId = null
//     return Promise.race([
//       fn(...args),
//       new Promise((res, rej) => {
//         timeoutId = setTimeout(() => {
//           rej(`Time Limit Exceeded`)
//         }, t)
//       }),
//     ]).finally(() => {
//       timeoutId && clearTimeout(timeoutId)
//     })
//   }
// }

/**
 * const limited = timeLimit((t) => new Promise(res => setTimeout(res, t)), 100);
 * limited(150).catch(console.log) // "Time Limit Exceeded" at t=100ms
 */

const limited = timeLimit(t => new Promise(res => setTimeout(res, t)), 100)
limited(150).catch(console.error).then(console.log) // "Time Limit Exceeded" at t=100ms
const limited2 = timeLimit(async n => {
  await new Promise(res => setTimeout(res, 100))
  return n * n
}, 50)
limited2(5).catch(console.error).then(console.log) // "Time Limit Exceeded" at t=100ms
const limited3 = timeLimit(async n => {
  await new Promise(res => setTimeout(res, 100))
  return n * n
}, 150)
limited3(5).catch(console.error).then(console.log) // "Time Limit Exceeded" at t=100ms
