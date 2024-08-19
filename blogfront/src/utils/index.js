import {iceMessage} from 'icepro'

export const errorRes = (e) => {
  iceMessage({
    message: e.message,
    type: 'danger'
  })
}
