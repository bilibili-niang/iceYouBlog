<template>
    <div class='markdowncard hover'>
        <div class="desList">
            <div class="row">
                <markdownTags :click=false tag="标题"></markdownTags>
                <el-text>{{ item.title }}</el-text>
            </div>
            <div class="row">
                <markdownTags :click=false tag="描述"></markdownTags>
                <el-text>{{ item.description }}</el-text>
            </div>
            <div class="row">
                <markdownTags :click=false tag="read"></markdownTags>
                <div class="btns">
                    <el-button round @click="goToRead(item.id)">read</el-button>
                </div>
            </div>
            <div class="row">
                <markdownTags :click=false tag="文章内容" @click="showContent = !showContent"></markdownTags>
                <v-md-editor :include-level="[3, 4]" v-model="item.content" mode="preview"
                    @copy-code-success="handleCopyCodeSuccess" v-if="showContent"></v-md-editor>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import markdownTags from '@/components/common/MarkdownTags'
import { useRouter } from 'vue-router';


const prop = defineProps({
    item: {
        type: Object,
        default: () => { }
    }
})
const showContent = ref(false)
const router = useRouter()
const goToRead = (id) => {
    const routeUrl = router.resolve({
        path: "/read",
        query: { id }
    })
    window.open(routeUrl.href, '_blank')
}
</script>
<style lang='less' scoped>
.markdowncard {
    margin-bottom: 2rem;
    padding: 0.5rem;
    margin-left: .5rem;
    margin-right: .5rem;
    border-radius: .3rem;

    .desList {
        display: flex;
        flex-direction: column;
        justify-content: start;

        .row {
            user-select: none;
        }
    }
}
</style>