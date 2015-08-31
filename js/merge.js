var Merge = (function() {
	var defaults = {
			'imgUrl': '',
			'words': '',
			'padding': 5,
			'fontSize': 14,
			'lineHeight': 20
		},
		options

	var getImage = function(newOptions, callback) {

			options = _extend(defaults, newOptions)

			if (!options.imgUrl && !options.words) {
				console.log('参数imgUrl和words不能为空')
				return
			}

			var newImg = new Image()
			newImg.src = options.imgUrl
			newImg.onload = function() {
				var width = options.width ? options.width : this.width,
					ratio = this.width / width,
					height = this.height / ratio

				var canvas = document.createElement('canvas')
				canvas.width = width
				canvas.height = height

				var ctx = canvas.getContext('2d')
				ctx.drawImage(this, 0, 0, width, height)
					//绘制矩形背景
				ctx.fillStyle = 'rgba(0, 0, 0, .7)'
				var lines = Math.ceil(_getStringLength(options.words) * options.fontSize / 2 / (width - options.padding * 2))
				var wordsHeight = lines * options.fontSize + options.padding * 2 + (lines - 1) * (options.lineHeight - options.fontSize)
				ctx.fillRect(0, height - wordsHeight, width, wordsHeight)
					//填充文字
				_addText(ctx, width, height, wordsHeight)

				if (callback) {
					callback(canvas.toDataURL("image/jpeg"))
				}
			}
		},
		_addText = function(ctx, width, height, wordsHeight) {
			ctx.font = options.fontSize + "px 宋体"
			ctx.fillStyle = "#fff"
			ctx.textBaseline = 'top'
			var text = options.words
			var lineLength = (width - options.padding * 2) / (options.fontSize / 2)
			for (var i = 0; _getStringLength(text) > 0; i++) {
				var index = _cutString(text, lineLength)
				ctx.fillText(text.substr(0, index), options.padding, i * options.lineHeight + height - wordsHeight + options.padding)
				text = text.substr(index)
			}
		},
		_getStringLength = function(str) {
			var len = str.length,
				trueLen = 0
			for (var i = 0; i < len; i++) {
				if (str.charCodeAt(i) > 128) {
					trueLen += 2
				} else {
					trueLen += 1
				}
			}
			return trueLen
		},
		_cutString = function(str, lineLength) {
			var len = str.length,
				index = len,
				curLen = 0
			for (var i = 0; i < len; i++) {
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
			return index;
		},
		_extend = function(defaultOpts, newOpts) {
			if (typeof newOpts == 'object') {

				if (newOpts instanceof Array)
					return

				for (var newKey in newOpts) {
					for (var oldKey in defaultOpts) {
						defaultOpts[newKey] = newOpts[newKey]
					}
				}

				return defaultOpts
			}
		}
	return {
		getImage: getImage,
	}
}())