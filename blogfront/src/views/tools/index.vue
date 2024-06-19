<template>
  <div class="tools">

    <ice-row>
      <ice-button size="l" @click="parseData">解析</ice-button>
      <ice-button size="l" @click="saveToLocal">保存至本地</ice-button>
    </ice-row>

    <ice-row class="textContainer">
      <textarea class="textarea" v-model="data"></textarea>
      <div class="result">
        <!--<pre v-if="parsedData">{{ // tsInterface }}</pre>-->
        <!--<pre v-if="parsedData">{{ parsedData }}</pre>-->

        <v-md-editor
            v-if="parsedData"
            :include-level="[1,2,3,4,5]"
            v-model="parsedData"
            mode="preview"
            @copy-code-success="handleCopyCodeSuccess"/>
        <div v-else>请解析数据以查看TypeScript接口</div>
      </div>
    </ice-row>

  </div>
</template>

<script setup>
import {ref} from 'vue'
import {alert} from "@/hook/function";

const data = ref(`{
  "id": "1801526079629627393",
  "merchantId": "1717732945099657218",
  "tenantId": "247970",
  "name": "ikun文化传媒",
  "images": [
    "https://dev-cdn.kacat.cn/upload/20240612/183dec07fdf5099182a875c227c534e1.webp"
  ],
  "description": "ikun之家,,,,哒哒哒哒哒哒",
  "type": "户外探险",
  "province": "厦门市",
  "address": {
    "address": "福建省厦门市集美区石鼓路153号",
    "longitude": "118.099454",
    "latitude": "24.576935"
  },
  "administrativeDivisionCode": "350211",
  "longitude": "118.099454",
  "latitude": "24.576935",
  "location": {
    "lng": "118.099454",
    "lat": "24.576935"
  },
  "openingAt": null,
  "closingAt": null,
  "sort": 0,
  "readings": 0,
  "status": true,
  "createUser": "1774630575618764802",
  "createTime": "2024-06-14 16:04:23",
  "updateUser": "1774630575618764802",
  "updateTime": "2024-06-14 16:36:16",
  "isDeleted": 0
}`)
const parsedData = ref(null)

const parseData = () => {
  try {
    parsedData.value = jsonToTs(JSON.parse(data.value))
  } catch (error) {
    alert('输入数据不是有效的 JSON 格式')
  }
}

const saveToLocal = () => {
  localStorage.setItem('data', data.value)
}

/**
 * 将 JSON 数据转换为 TypeScript 类型定义
 * @param {Object} object - 要转换的 JSON 对象
 * @param {string} [name=JsonType] - 转换后的类型名称
 * @param {string} [namespace] - 转换后的命名空间
 * @returns {string} - 转换后的 TypeScript 类型定义字符串
 */
function jsonToTs(object, name = 'JsonType', namespace) {
  const getType = value => {
    let typeRes = ``;
    if (Array.isArray(value)) {
      value.forEach(item => {

        let subType = getType(item);
        if (typeRes.split('|').indexOf(subType) < 0) {
          typeRes += subType
          typeRes += "|"
        }
      })
      typeRes = typeRes.substring(0, typeRes.length - 1)
      if (typeRes.split('|').length > 1) {
        return `(${typeRes})[]`;
      } else {
        return `${typeRes}[]`;
      }
    }
    if (typeof value === 'object' && value !== null) {
      const props = Object.entries(value)
          .map(([key, val]) => `${key}: ${getType(val)}`)
          .join('; ');
      return `{ ${props} }`;
    }
    return typeof value;
  };

  const type = getType(object);

  const declaration = `interface ${name} ${type}`;

  return namespace ? `namespace ${namespace} { \r\n ${declaration} \r\n}` : declaration;
}

const handleCopyCodeSuccess = (code) => {
  alert("复制成功");
}

</script>

<style scoped lang="less">
.tools {
  display: flex;
  height: 100vh;
  width: 90vw;
  margin: 0 auto;
  flex-direction: column;
}

.textContainer {
  display: flex;
  height: 90vh;
}

.textarea {
  display: flex;
  width: 50%;
  height: 100%;
}

.result {
  width: 50%;
  padding: 10px;
  border: 1px solid #ccc;
  overflow: auto;
}
</style>
