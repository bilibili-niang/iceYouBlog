"use strict";(self.webpackChunkblogfront=self.webpackChunkblogfront||[]).push([[577],{6577:function(e,t,s){s.r(t),s.d(t,{default:function(){return k}});var i=s(4535),a=s(60);t=e=>((0,i.dD)("data-v-689c6767"),e=e(),(0,i.Cn)(),e);const l={class:"log container"},n={key:0},o={class:"infinite-list",style:{overflow:"auto"}},r={class:"title"},g=t((()=>(0,i._)("pre",null,"id",-1))),u=t((()=>(0,i._)("pre",null,"time",-1))),c=t((()=>(0,i._)("br",null,null,-1))),d={class:"detail"},h=t((()=>(0,i._)("pre",null,"ip",-1))),m=t((()=>(0,i._)("br",null,null,-1))),f=t((()=>(0,i._)("pre",null,"fileNameAndPath",-1)));s(4119);var p=s(9510),w=s(1112),k=(t={name:"Log",data(){return{count:0,logList:[],lastId:0,notIsAdmin:!1}},methods:{alertMessage(e,t,s){s=s||"red",(0,w.z8)({message:(0,i.h)("p",null,[(0,i.h)("span",null,e),(0,i.h)("i",{style:"color: "+s},t)]),grouping:!0})},async initData(){var e=Object.keys(this.logList).length;0==e?await p.Z.$axios({url:"/admin/getLogs",method:"POST",headers:{token:!0}}).then((e=>{this.logList=e.result,e.success||(this.alertMessage(e.message),this.notIsAdmin=!0)})).catch((e=>{this.alertMessage(e)})):await p.Z.$axios({url:"/admin/getLogs",method:"POST",headers:{token:!0},data:{offset:e}}).then((e=>{e.success||this.alertMessage(e.message),this.logList.push(...e.result),(0,w.z8)({message:e.message,grouping:!0,type:"success"})})).catch((e=>{this.alertMessage(e)}))},getLogInfo(){}},created(){this.initData(),this.getLogInfo()}},(0,s(8696).Z)(t,[["render",function(e,t,s,p,w,k){var v=(0,i.up)("el-text"),_=(0,i.Q2)("infinite-scroll");return(0,i.wg)(),(0,i.iD)("div",l,[w.notIsAdmin?((0,i.wg)(),(0,i.iD)("div",n,[(0,i.Wm)(v,{class:"mx-1"},{default:(0,i.w5)((()=>[(0,i.Uk)("不是admin用户,无法查看")])),_:1})])):(0,i.kq)("",!0),(0,i.wy)(((0,i.wg)(),(0,i.iD)("ul",o,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(w.logList,((e,t)=>((0,i.wg)(),(0,i.iD)("li",{key:t,class:"infinite-list-item"},[(0,i._)("div",r,[g,(0,i.Uk)(" "+(0,a.zw)(e.id)+" | ",1),u,(0,i.Uk)(" "+(0,a.zw)(e.time),1)]),c,(0,i._)("div",d,[h,(0,i.Uk)(" "+(0,a.zw)(e.ip)+" ",1),m,f,(0,i.Uk)(" "+(0,a.zw)(e.fileNameAndPath),1)])])))),128))])),[[_,k.initData]])])}],["__scopeId","data-v-689c6767"]]))}}]);