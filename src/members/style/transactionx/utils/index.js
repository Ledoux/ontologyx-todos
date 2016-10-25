
export const ESCAPE_KEY = 27
export const ENTER_KEY = 13
export const MAX_MEMBERS_COUNT = 3
export const MAX_ENTITIES_COUNT = 3
export const MAX_TAGS_COUNT = 3

export function uuid () {
  /* jshint bitwise:false */
  let i, random
  let uuid = ''
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-'
    }
    uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
    .toString(16)
  }
  return uuid
}
export function pluralize (count, word) {
  return count === 1 ? word : word + 's'
}

// from http://stackoverflow.com/questions/1484506/random-color-generator-in-javascript
export function getRandomColor () {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
