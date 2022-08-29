<template>
  <div>
    <el-col>
      <el-row :gutter="20">
        <el-col :span="22"
          ><el-input
            placeholder="Scenario Searching"
            v-model="filterText"
            clearable
            prefix-icon="el-icon-search"
            @keyup.enter.native="search"
          >
          </el-input> </el-col
      ></el-row>
      <div class="tree">
        <ul class="box-card" v-for="p in tableData" :key="p">
          <div @click="info(p)">
            <el-link>{{ p }}</el-link>
          </div>
        </ul>
      </div>
    </el-col>
  </div>
</template>

<script>
import { getAllData, getDetail, senarioSearch, readme } from "../api/api";
import eventBus from "../bus.js";
export default {
  data() {
    return {
      filterText: "",
      data: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      curPath: "",
      tableData: [],
    };
  },
  mounted() {
   eventBus.$on("tagSelect", this.tagReceived);
    console.log('t3',t)
  },
  // watch() {
  //    eventBus.$on("tagSelect", (t) => {
  //     console.log("tagSelect", t);
  //   });
  // },
  methods: {
    search() {
      console.log("enter", this.filterText);
      this.tableData = [];
      senarioSearch(this.filterText).then((res) => {
        this.tableData = res.data;
        console.log("senarioSearch", this.tableData);
      });
    },

    info(data) {
      readme(data).then((res) => {
        console.log("toolName", res.data);
        eventBus.$emit("getReadme", res.data);
      });
    },
    tagReceived(t){
      console.log('ttt',t)
      this.filterText = t
      this.search()
    },

    
  },
};
</script>

<style>
/* .tree {
  overflow: auto;
  height: 400px;
} */
.el-input {
  margin-bottom: 6px;
  margin-top: 10px;
}
.tree {
  height: 300px;
}
</style>