
export const ESCAPE_KEY = 27
export const ENTER_KEY = 13
export const MAX_MEMBERS_COUNT = 3
export const MAX_ENTITIES_COUNT = 3
export const MAX_TAGS_COUNT = 3

export function uuid () {
  function s4 () {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4()
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
