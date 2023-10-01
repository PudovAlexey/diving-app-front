function getSize(initialSize?: number | string) {
  switch(typeof initialSize) {
    case 'number': return `${initialSize}px`
    case 'string': return initialSize
    default: return '100%'
  }
}

export {
  getSize
}