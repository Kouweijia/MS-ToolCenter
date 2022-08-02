<template>
  <el-row>
    <el-col :span="24">
      <el-card class="box-card">
        <h3>{{ " Description " }}</h3>
        <el-skeleton />
        <el-skeleton />
      </el-card>

      <el-card class="box-card">
        <h3>{{ "Link " }}</h3>
        <li v-for="(p, index) in msg" :key="p" v-on:click="download(index)">
          <!-- 插值语法 p还可以来自属性 -->
          {{ p }}
        </li>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { download } from "../api/api";
import eventBus from "../bus.js";
export default {
  name: "details",
  data() {
    return {
      msg: "",
      dataobj:'',
      lis:[],
      path:'',
      url:''
    };
  },
  created() {
    this.getContent();
  },
  methods: {
    getContent() {
      //子组件B通过eventBus.$on注册自定义事件接收子组件A的传值
      eventBus.$on("getContent", (data) => {
        this.msg = data.sub_files;
        this.dataobj = data
        this.path= data.current_path
        console.log("传过来的", data);
      });
    },
    download(p) {
      // if(this.msg[p])

      download(this.path+'/'+this.msg[p])
      eventBus.$on("download", url=>{
        this.url=url
        let link = document.createElement('a')
        link.href = url
        document.body.appendChild(link)
        link.click()
      })
      // .then((res)=>{

        
        // this.url=request.getRequestURL()
        // console.log('request.getRequestURL()',this.url);
        // if(res.status==200){
        //   let blob = new Blob([res]);
        //   console.log('rrrrres',blob);
        //   let url = window.URL.createObjectURL(blob)
        //   let link = document.createElement('a')
        //   link.style.display = 'none'
        //   link.download = this.msg[p] 
        //   link.href = url
        //   document.body.appendChild(link)
        //   link.click()
        // }
      // })
    },
  },
};
</script>

<style>
.text {
  font-size: 14px;
}
.el-card {
  min-height: 400px;
}
li {
  line-height: 40px;
}
</style>