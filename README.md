# merge
##### 简介
  通过html5 canvas来实现在图片添加文字，文字下面的背景层可根据文字的高度自动伸缩，文字默认添加在图片底层，可根据图片的宽度自动换行。
##### example
  ```
    var merge = new Merge()
    merge.getImage('1.jpg', '在图片在叠加文字', function(img){
      console.log(img)
    })
  ```
