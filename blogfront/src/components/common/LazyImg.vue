<template>
  <div class="lazyImg">
    <img :src="src" alt="" v-if="validateImage(src)">
    <img :src="defaultImg" alt="" v-else>
  </div>
</template>
<script>
export default {
  name: "LazyImg",
  props: {
    src: {
      type: String
    },
    defaultImg: {
      type: String,
      default: '/images/headImg/defaultHeadImg.png',
    }
  },
  data () {
    return {}
  },
  methods: {
    checkImgExists (imgurl) {
      const ImgObj = new Image() // 判断图片是否存在
      ImgObj.src = imgurl
      // 存在图片
      if (ImgObj.fileSize > 0 || ( ImgObj.width > 0 && ImgObj.height > 0 )) {
        console.log('图片存在')
        return true
      } else {
        console.log("不存在")
        return false
      }
    },
    validateImage (url) {
      let xmlHttp
      if (window.ActiveXObject) {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP")
      } else if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest()
      }
      xmlHttp.open("Get", url, false)
      xmlHttp.send()
      if (xmlHttp.status == 404)
        return false
      else
        return true
    }
  },
}
</script>

<style scoped lang="less">
.lazyImg {
  display: flex;
  width: 100%;
  height: 100%;
}

img {
  display: flex;
  width: 100%;
  height: auto;
}
</style>
