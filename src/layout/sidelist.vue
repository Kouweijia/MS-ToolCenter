<template>
  <div>
    <el-col>
      <el-row :gutter="20">
        <el-col :span="22"
          ><el-input placeholder="Scenario Searching" v-model="filterText">
          </el-input> </el-col
      ></el-row>
      <div class="tree">
        <!-- <el-row :gutter="20"
          ><el-tree
            class="filter-tree"
            :data="data"
            :props="defaultProps"
            :filter-node-method="filterNode"
            ref="tree"
            @node-click="handleNodeClick"
          >
          </el-tree>
        </el-row> -->
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="scenariao"  label="Related Scenarios" width="300px">
          </el-table-column>

        </el-table>
      </div>
    </el-col>
  </div>
</template>

<script>
import { getAllData, getDetail } from "../api/api";
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
      tableData: [{
            scenariao: '1bsldbckljsndfkj    nwefj'
          }, {
           scenariao: ' wefjkskljdnckjas1'
          }, {
            scenariao: '1sdfkjasdlkjfnklsdjv'
          }, {
           scenariao: '1kldfhkjSD'
          }, {
           scenariao: '1dsfipwuheiufhw  '
          }, {
           scenariao: '1sdkms'
          }, {
            scenariao: 'SDFd1'
          }]
    };
  },
  mounted() {
    // getAllData().then((res) => {
    //   this.data.push(res.data);
    //   // console.log(data);
    // });
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

    handleNodeClick(data) {
      console.log("clickData", data);
      this.curPath = data.current_path;
      getDetail(this.curPath).then((res2) => {
        eventBus.$emit("getContent", res2.data);
      });
      // eventBus.$emit("getContent", data.label);
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