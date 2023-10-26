<template>
  <!--单个用户的评论-->
  <ice-row>
    <div class="avatar m-r">
      <Avatar :imgUrl="avatar"></Avatar>
    </div>
    <ice-column>
      <div class="ice-row">
        <ice-row>
          <ice-tag>nickName</ice-tag>
          <ice-text>
            {{ item.nickName }}
          </ice-text>
        </ice-row>
        <div v-if="item.email">
          <ice-tag>email</ice-tag>
          <ice-text>
            {{ item.email }}
          </ice-text>
        </div>
        <div v-if="item.webSite">
          <ice-tag ice->webSite</ice-tag>
          <ice-text>
            {{ item.webSite }}
          </ice-text>
        </div>
      </div>
      <v-md-editor
          :include-level="[3,4]"
          :mode="editMod"
          v-model="copyItem.content"></v-md-editor>
      <div v-if="email===item.email" class="m-b m-t options">
        <ice-button @click="editMod=editMod==='editable'?'preview':'editable'">
          编辑
        </ice-button>
        <ice-button @click="save" v-if="editMod=='editable'">save</ice-button>
      </div>
    </ice-column>
  </ice-row>
</template>

<script>
import Avatar from "@/components/common/Avatar.vue";
import markdown from "@/common/api/markdownFiles";

const fun = require("@/hook/function");

export default {
  name: "Acomment",
  components: {Avatar},
  props: {
    item: {},
    email: ""
  },
  data() {
    return {
      avatar: "/images/avatars/defaultAvatar.png",
      editMod: "preview",
      copyItem: ""
    };
  },
  methods: {
    async save() {
      const res = await markdown.updateComment({data: this.copyItem});
      if (res.success) {
        this.$emit("refresh", true);
        this.editMod = "preview";
        fun.alert(res.message, "成功辣");
      } else {
        fun.alert(res.message, "失败辣");
      }
    }
  },
  created() {

    const email = this.item.email || null;
    if (email) {
      markdown.getUserInfo({email})
          .then(res => {
            this.avatar = res.result.avatar;
          });

    } else {
    }
    this.copyItem = this.item;
  },
};
</script>