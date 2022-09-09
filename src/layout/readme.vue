<template>
  <div class="box-readme">
    <!-- <div v-if="this.isLoading==true"> -->
    <el-skeleton :rows="15" animated v-if="this.isLoading == true" />
    <!-- </div> -->

    <el-card
      class="box-card"
      v-for="p in readme"
      :key="p + 0"
      v-else-if="this.isLoading == false"
    >
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
    <el-card class="box-card" v-if="this.files != ''">
          <div slot="header" class="clearfix">
            <b> Download</b>
          </div>
          <div v-for="f in files" :key="f" class="links">
            <div @click="clickdownload(f)">
              <el-link>{{ f }}</el-link>
            </div>
          </div>
        </el-card>
  </div>
</template>

<script>
import { download } from "../api/api";
import eventBus from "../bus.js";
import axios from "axios";
export default {
  name: "details",
  data() {
    return {
      readme: "",
      Stag: [],
      Nlink: [],
      jumpTo: "",
      files: "",
      dataobj: "",
      lis: [],
      path: "",
      url: "",
      isLoading: false,
      str: "\\\\SHA-FS-01A\\WinComm-ADOS\\Readiness\\Team\\Tool",
      downloadlink: "",
    };
  },
  created() {
    this.getContent();
  },
  // beforeUpdate() {
  //   this.isLoading = true;
  // },
  // updated() {
  //   this.isLoading = false;
  // },
  mounted() {},
  methods: {
    getContent() {
      //子组件B通过eventBus.$on注册自定义事件接收子组件A的传值
      eventBus.$on("getContent", (data) => {
        // this.files = ''
        this.files = data.sub_files;
        // .replace(/\//g, "\\")
        // this.dataobj = data
        this.path = data.current_path;
        console.log("传过来的", data);
      });
      // this.isLoading = true
      eventBus.$on("isloading", (data) => {
        this.isLoading = data;
      });
      eventBus.$on("getReadme", (data) => {
        console.log("resss", data);
        if (data) {
          this.isLoading = false;
        }

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
    clickdownload(p) {
      // if(this.msg[p])
      this.url = this.path + "\\" + p;
      download(this.url);

      // this.downloadlink = 'http://10.168.174.68:5000/tools/'+this.url+'?data-src='+this.str
      // console.log('this.downloadlink',this.downloadlink)
      // let link = document.createElement("a");
      // link.href = this.downloadlink;
      // document.body.appendChild(link);
      // link.click();
      eventBus.$on("download", (url) => {
        // console.log("99", url);
        this.url = url;
        let link = document.createElement("a");
        link.href = url;
        document.body.appendChild(link);
        link.click();
      });

      // download().then((url) => {
      // let blob = new Blob([res])

      // console.log("uuuuuuurl",url);
      // let link = document.createElement("a");
      // link.href = url;
      // document.body.appendChild(link);
      // link.click();
      // });
      // eventBus.$on("download", (url) => {
      // this.url = url;
      // let link = document.createElement("a");
      // link.href = url;
      // document.body.appendChild(link);
      // link.click();
      // });
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
  width: 96%;
  margin-bottom: 20px;
}
.links {
  margin-bottom: 20px;
}
</style>