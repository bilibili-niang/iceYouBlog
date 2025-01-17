import { iceMessage } from 'icepro'

export const errorRes = e => {
  iceMessage({
    message: e.message,
    type: 'danger'
  })
}

export const throwException = e => {
  console.log('e--->', e)
  iceMessage({
    title: e?.message || e,
    type: 'danger'
  })
}
