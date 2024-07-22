<template>
  <div class="tools">

    <ice-tabs v-model="activeName">

      <ice-tab-item label="interfaceParse" name="interfaceParse解析">
        <ice-row>
          <ice-button size="l" @click="parseData">解析</ice-button>
          <ice-button size="l" @click="saveToLocal">保存至本地</ice-button>
        </ice-row>

        <ice-row class="textContainer">
          <textarea class="textarea" v-model="data"></textarea>
          <div class="result">
            <MdRender
                :content='parsedData'
                mode="preview"
                v-if="parsedData"
            />
            <div v-else>请解析数据以查看TypeScript接口</div>
          </div>
        </ice-row>
      </ice-tab-item>


    </ice-tabs>


  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { alert } from '@/hook/function'
import MdRender from '@/components/MdRener/index.vue'

const activeName = ref('interfaceParse')

// 初始化data值，尝试从localStorage读取
const data = ref(localStorage.getItem('data') || `{"id": "18015260796293"}`)
const parsedData = ref(null)

const parseData = () => {
  try {
    parsedData.value = jsonToTs(JSON.parse(data.value))
    // 解析数据后，同时保存到localStorage
    saveToLocal()
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
    let typeRes = ``
    if (Array.isArray(value)) {
      value.forEach(item => {

        let subType = getType(item)
        if (typeRes.split('|').indexOf(subType) < 0) {
          typeRes += subType
          typeRes += '|'
        }
      })
      typeRes = typeRes.substring(0, typeRes.length - 1)
      if (typeRes.split('|').length > 1) {
        return `(${typeRes})[]`
      } else {
        return `${typeRes}[]`
      }
    }
    if (typeof value === 'object' && value !== null) {
      const props = Object.entries(value)
          .map(([key, val]) => `${key}: ${getType(val)}`)
          .join('; ')
      return `{ ${props} }`
    }
    return typeof value
  }

  const type = getType(object)

  const declaration = `interface ${name} ${type}`

  return namespace ? `namespace ${namespace} { \r\n ${declaration} \r\n}` : declaration
}


const init = () => {
  const storedData = localStorage.getItem('data')
  if (storedData) {
    data.value = storedData
  }
}
onMounted(init)

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
