# merge
##### 简介
  通过html5 canvas实现在图片添加文字，文字下面的背景层可根据文字的高度自动伸缩，文字默认添加在图片底层，可根据图片的宽度自动换行。
##### 方法
getImage(obj, callback)
##### 示例
  ```
    Merge.getImage({
				'imgUrl': '1.jpg',
				'words': '合成文字图片',
				'width': 1000
			}, function(img) {
				console.log(img)
			})
  ```
##### 参数
* imgUrl：*（必选）*被合成的图片路径
* words：*（必选）*需要合成的文字
* width：*（可选）*设置生成图片的宽度，默认为图片原始大小（高度自适应）
* fontSize：*（可选）*设置文字大小，默认为14px
* padding：*（可选）*设置文字与背景层的padding值，默认为5
* lineHeight：*（可选）*设置文字的lineHeigh值，默认为20
* callback：*（必选）*接收合成图片的回调
