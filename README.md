# merge-image

> 利用canvas在图片上合成文字，文字内容可根据图片宽度自适应。

## 示例

[点击查看](http://youngluo.github.io/merge-image/example)

## 使用

  ```
    <img id="img" src="" />
    <script src="../dist/merge-image.min.js"></script>
    <script>
      new MergeImage(
        {
          text: '关关雎鸠，在河之洲。窈窕淑女，君子好逑。参差荇菜，左右流之。窈窕淑女，寤寐求之。',
          imgUrl: 'demo.jpg',
          width: 480,
        },
        function (dataURL) {
          document.getElementById('img').src = dataURL
        }
      )
    </script>
  ```

## options

* imgUrl：*（必选）* 图片路径
* text：*（必选）* 文字内容
* width：*（可选）* 合成的图片宽度，默认为图片原始大小（高度自适应）
* backgroundColor：*（可选）* 背景层颜色，默认为`rgba(0, 0, 0, .7)`
* padding：*（可选）* 文字相对背景层的padding值，默认为5
* lineHeight：*（可选）* 文字的lineHeigh值，默认为20
* fontSize：*（可选）* 文字大小，默认为14px
* color：*（可选）* 文字颜色，默认为`#fff`

## callback(dataURL)
  * dataURL：合成图片的dataURL
