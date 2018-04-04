// import '../src/assign.js'

class MergeImage {
  constructor (options, callback) {
    this.options = Object.assign({}, {
      backgroundColor: 'rgba(0, 0, 0, .7)',
      lineHeight: 20,
      color: '#fff',
      fontSize: 14,
      padding: 5,
      imgUrl: '',
      text: '',
      width: 0
    }, options)

    if (!this.options.imgUrl || !this.options.text) {
      throw new Error('The imgUrl and text parameters cannot be empty.')
    }

    this.callback = callback
    this.render()
  }

  render () {
    const { imgUrl, width: imgWidth, text, fontSize, padding, lineHeight, backgroundColor } = this.options
    const img = new Image()
    const self = this

    img.src = imgUrl
    img.setAttribute('crossOrigin', 'Anonymous')
    img.onload = function () {
      const width = imgWidth || this.width
      const ratio = this.width / width
      const height = this.height / ratio

      const canvas = document.createElement('canvas')

      canvas.width = width
      canvas.height = height

      self.ctx = canvas.getContext('2d')
      self.ctx.drawImage(this, 0, 0, width, height)

      // 绘制矩形背景
      self.ctx.fillStyle = backgroundColor

      const lines = Math.ceil(self.getStringLength(text) * fontSize / 2 / (width - padding * 2))
      const textHeight = lines * fontSize + padding * 2 + (lines - 1) * (lineHeight - fontSize)

      self.ctx.fillRect(0, height - textHeight, width, textHeight)

      // 填充文字
      self.addText(width, height, textHeight)

      self.callback && self.callback(canvas.toDataURL('image/jpeg'))
    }
  }

  addText (width, height, textHeight) {
    let { text, fontSize, padding, lineHeight, color } = this.options

    this.ctx.font = fontSize + 'px 宋体'
    this.ctx.textBaseline = 'top'
    this.ctx.fillStyle = color

    const lineLength = (width - padding * 2) / (fontSize / 2)

    for (let i = 0; this.getStringLength(text) > 0; i++) {
      const index = this.cutString(text, lineLength)

      this.ctx.fillText(text.substr(0, index), padding, i * lineHeight + height - textHeight + padding)
      text = text.substr(index)
    }
  }

  getStringLength (str) {
    const len = str.length
    let trueLen = 0

    for (let i = 0; i < len; i++) {
      if (str.charCodeAt(i) > 128) {
        trueLen += 2
      } else {
        trueLen += 1
      }
    }

    return trueLen
  }

  cutString (str, lineLength) {
    const len = str.length
    let index = len
    let curLen = 0

    for (let i = 0; i < len; i++) {
      if (str.charCodeAt(i) > 128) {
        if (curLen + 2 < lineLength) {
          curLen += 2
        } else {
          index = i
          break
        }
      } else {
        if (curLen + 1 < lineLength) {
          curLen += 1
        } else {
          index = i
          break
        }
      }
    }

    return index
  }
}
