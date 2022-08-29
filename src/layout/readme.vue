<template>
  <div class="box-readme">
    <el-card class="box-card" v-for="p in readme" :key="p">
      <div slot="header" class="clearfix">
        <b> {{ p.meta_name }}</b>
      </div>
      <div class="text item">
        <div v-if="p.meta_name === 'Scenarios Tag'">
          <div v-for="t in Stag" :key="t" class="links">
            <div @click="tag(t)">
              <el-link>{{ t }}</el-link>
            </div>
          </div>
        </div>
        <div v-else-if="p.meta_name === 'Refer Link'">
          <div v-for="l in Nlink" :key="l" class="links">
            <div @click="link(l)">
              <i class="el-icon-document"></i>
              <el-link target="_blank">{{ l }}</el-link>
            </div>
          </div>
        </div>
        <div v-else @click="info(p)">
          {{ p.content }}
        </div>

        <!-- {{ p.content }} -->
      </div>
    </el-card>
    <!-- <el-card class="box-card">
        <ul v-for="p in readme" :key="p">

          <el-card class="box-card">
            {{ p.meta_name }}： {{ p.content }}
          </el-card>
        </ul>
      </el-card> -->

    <!-- <el-card class="box-card">
        <h3>{{ "Link " }}</h3>
        <li v-for="(p, index) in msg" :key="p" v-on:click="download(index)">

          {{ p }}
        </li>
      </el-card> -->
  </div>
</template>

<script>
import { download } from "../api/api";
import eventBus from "../bus.js";
export default {
  name: "details",
  data() {
    return {
      readme: "",
      Stag: [],
      Nlink: [],
      jumpTo: "",
      msg: "",
      dataobj: "",
      lis: [],
      path: "",
      url: "",
    };
  },
  created() {
    this.getContent();
  },
  methods: {
    getContent() {
      //子组件B通过eventBus.$on注册自定义事件接收子组件A的传值
      // eventBus.$on("getContent", (data) => {
      //   this.msg = data.sub_files;
      //   this.dataobj = data
      //   this.path= data.current_path
      //   console.log("传过来的", data);
      // });
      eventBus.$on("getReadme", (data) => {
        console.log("resss", data);
        this.readme = data;
        data.map((r) => {
          if (r.meta_name == "Scenarios Tag") {
            this.Stag = r.content.split("\r\n");
          }
          if (r.meta_name == "Refer Link") {
            this.Nlink = r.content.split("\r\n");
          }
        });
        // console.log("tag", this.tag);
      });
    },
    download(p) {
      // if(this.msg[p])

      download(this.path + "/" + this.msg[p]);
      eventBus.$on("download", (url) => {
        this.url = url;
        let link = document.createElement("a");
        link.href = url;
        document.body.appendChild(link);
        link.click();
      });
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
    tag(t) {
      eventBus.$emit("tagSelect", t);
    },
    link(l) {
      console.log("lll", l);
      this.jumpTo = l;
      // window.location.href(l)
      window.open(l, "_blank");
    },
  },
};
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 30px;
  /* font-size: 16px; */
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-readme {
  overflow: hidden;
  white-space: pre-wrap;
  font-size: 20px;
}
.box-card {
  width: 70%;
  margin-bottom: 20px;
}
.links {
  margin-bottom: 20px;
}
</style>