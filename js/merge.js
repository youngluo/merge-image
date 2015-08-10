var Merge = function() {
	this.padding = 5;
	this.fontSize = 14;
	this.lineHeight = 20;
}
Merge.prototype.getImage = function(img, words, callback) {
	var _this = this,
		myImg = new Image();
	myImg.src = img;
	myImg.onload = function() {
		var ratio = this.width / 800;
		var width = 800,
			height = this.height / ratio;
		var canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;
		var ctx = canvas.getContext('2d');
		ctx.drawImage(this, 0, 0, width, height);
		//绘制矩形背景
		ctx.fillStyle = 'rgba(0, 0, 0, .7)';
		var lines = Math.ceil(_this._getStringLength(words) * _this.fontSize / 2 / (width - _this.padding * 2));
		var wordsHeight = lines * _this.fontSize + _this.padding * 2 + (lines -1) * ( _this.lineHeight - _this.fontSize);
		ctx.fillRect(0, height - wordsHeight, width, wordsHeight);
		//填充文字
		_this._addText(ctx, width, height, words, wordsHeight);
		callback(canvas.toDataURL("image/jpeg"));
	}
}
Merge.prototype._addText = function(ctx, width, height, words, wordsHeight) {
	ctx.font = this.fontSize + "px 宋体";
	ctx.fillStyle = "#fff";
	ctx.textBaseline = 'top';
	var text = words;
	var lineLength = (width - this.padding * 2) / (this.fontSize / 2);
	for (var i = 0; this._getStringLength(text) > 0; i++) {
		var index = this._cutString(text, lineLength);
		ctx.fillText(text.substr(0, index), this.padding, i * this.lineHeight + height - wordsHeight + this.padding);
		text = text.substr(index);
	}
}
Merge.prototype._getStringLength = function(str) {
	var len = str.length,
		trueLen = 0;
	for (var i = 0; i < len; i++) {
		if (str.charCodeAt(i) > 128) {
			trueLen += 2;
		} else {
			trueLen += 1;
		}
	}
	return trueLen;
}
Merge.prototype._cutString = function(str, lineLength) {
	var len = str.length,
		index = len,
		curLen = 0;
	for (var i = 0; i < len; i++) {
		if (str.charCodeAt(i) > 128) {
			if (curLen + 2 < lineLength) {
				curLen += 2;
			} else {
				index = i;
				break;
			}
		} else {
			if (curLen + 1 < lineLength) {
				curLen += 1;
			} else {
				index = i;
				break;
			}
		}
	}
	return index;
}