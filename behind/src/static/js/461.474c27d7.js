"use strict";(self["webpackChunkblogfront"]=self["webpackChunkblogfront"]||[]).push([[461],{5461:function(e,l,o){o.r(l),o.d(l,{default:function(){return m}});var s=o(4535);const n={class:"register container"},t={class:"form"},a={class:"btns"};function r(e,l,o,r,i,u){const c=(0,s.up)("el-input"),g=(0,s.up)("el-button");return(0,s.wg)(),(0,s.iD)("div",n,[(0,s._)("div",t,[(0,s.Wm)(c,{class:"m-b",modelValue:i.login.email,"onUpdate:modelValue":l[0]||(l[0]=e=>i.login.email=e),placeholder:"Please input email",clearable:""},null,8,["modelValue"]),(0,s.Wm)(c,{class:"m-b",modelValue:i.login.username,"onUpdate:modelValue":l[1]||(l[1]=e=>i.login.username=e),placeholder:"Please input username",clearable:""},null,8,["modelValue"]),(0,s.Wm)(c,{class:"m-b",modelValue:i.login.password,"onUpdate:modelValue":l[2]||(l[2]=e=>i.login.password=e),placeholder:"Please input pwd",clearable:""},null,8,["modelValue"]),(0,s._)("div",a,[(0,s.Wm)(g,{onClick:u.submit},{default:(0,s.w5)((()=>[(0,s.Uk)("submit")])),_:1},8,["onClick"]),(0,s.Wm)(g,{onClick:u.getToken},{default:(0,s.w5)((()=>[(0,s.Uk)("get")])),_:1},8,["onClick"])])])])}o(4119);var i=o(9510),u=o(7115),c={name:"Register",data(){return{login:{email:"demo@demo.com",username:"username",password:"password"}}},methods:{async submit(){(this.login.username.length<1||this.login.password.length<1)&&console.log("data error"),await i.Z.$axios({url:"/user/register/",method:"POST",data:this.login}).then((e=>{if(console.log("res:"),console.log(e),e.success){const l=e.result||"";localStorage.setItem("userInfo",JSON.stringify(l))}})).catch((e=>{console.log("e:"),console.log(e)}))},getToken(){const e=JSON.parse(localStorage.getItem("userInfo"));JSON.stringify(e)>10?(console.log(e),console.log(e.id)):console.log("token is null")},verifyLogin(){const e=this.$store.state.userInfo||"";console.log("JSON.stringify(user).length:"),console.log(JSON.stringify(e).length),console.log(JSON.stringify(e)),JSON.stringify(e).length<10||(console.log("3s后跳转user"),u.Z.push({path:"/user"}))}},created(){this.verifyLogin()}},g=o(8696);const d=(0,g.Z)(c,[["render",r],["__scopeId","data-v-0bd7d076"]]);var m=d}}]);
//# sourceMappingURL=461.474c27d7.js.map