<template>
  <div>
    <el-col>
      <el-row :gutter="20">
        <el-col :span="14"
          ><el-input
            placeholder="Tools Filter"
            v-model="filterText"
            prefix-icon="el-icon-set-up"
          >
          </el-input>
        </el-col>
        <!-- datasource -->
        <el-col :span="8">
          <el-select v-model="value" placeholder="Data" @change="change">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <div class="tree">
        <el-row :gutter="20"
          >
          <el-skeleton :rows="8" animated v-if="this.treeLoading == true" />
          <el-tree
          v-else-if="this.treeLoading == false"
            class="filter-tree"
            :data="data"
            :props="defaultProps"
            :filter-node-method="filterNode"
            @node-click="handleNodeClick"
            ref="tree"
          >
          </el-tree>
        </el-row>
      </div>
       <!-- <el-skeleton :rows="15" animated v-if="this.treeLoading == true" /> -->
    </el-col>
  </div>
</template>

<script>
import { getAllData, getDetail, readme } from "../api/api";
import eventBus from "../bus.js";
export default {
  data() {
    return {
      filterText: "",
      value: "",
      data1: [
        //test
        {
          label: "Tool",
          path: "123123",
          children: [
            {
              label: "DS",

              children: [
                {
                  label: "ADperf",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          label: "OS",
          children: [
            {
              label: "DND",
              children: [
                {
                  label: "Bootstat",
                },
                {
                  id: 10,
                  label: "Fvebootlog",
                },
                {
                  id: 11,
                  label: "NetFxRepairTool",
                },
                {
                  id: 12,
                  label: "Verbose.Windows",
                },
                {
                  id: 13,
                  label: "WuLog",
                },
              ],
            },
            {
              id: 6,
              label: "Perf",
            },
            {
              id: 7,
              label: "UEX",
            },
          ],
        },
        {
          id: 3,
          label: "Other",
          children: [
            {
              id: 7,
              label: "Procmon",
            },
            {
              id: 8,
              label: "Script",
            },
          ],
        },
      ],
      tree1: [
        //测试
        {
          label: "DataSource-2",
          children: [
            {
              label: "DS",
              children: [
                { label: "ADperf", children: [] },
                { label: "ADS_DatabaseAnalyzer_public", children: [] },
                { label: "AD_ESR", children: [] },
                { label: "AD_GetRemoteToken", children: [] },
                { label: "AD_NAT", children: [] },
                { label: "AD_PERF", children: [] },
                { label: "AD_Replfix", children: [] },
                { label: "AD_usnmon", children: [] },
                { label: "AD_Utils", children: [] },
                { label: "AUTH", children: [{ label: "Auth", children: [] }] },
                { label: "DFSRMiner", children: [] },
                { label: "IdnaIdentify", children: [] },
                { label: "MilkTea", children: [] },
                { label: "PKI_Credential_Roaming", children: [] },
                {
                  label: "PKI_CRUtil",
                  children: [
                    {
                      label: "Sample_Output",
                      children: [{ label: "CredRoamLogs", children: [] }],
                    },
                  ],
                },
                {
                  label: "PKI_Tools",
                  children: [{ label: "PKITools", children: [] }],
                },
                { label: "Script_Logcollection", children: [] },
                {
                  label: "TSSv2",
                  children: [
                    { label: "ADS_Videos", children: [] },
                    {
                      label: "Archive",
                      children: [
                        {
                          label: "Beta_Signed_210708",
                          children: [
                            { label: "BIN", children: [] },
                            { label: "BINx64", children: [] },
                            { label: "BINx86", children: [] },
                            { label: "config", children: [] },
                            { label: "scripts", children: [] },
                            { label: "xray", children: [] },
                          ],
                        },
                      ],
                    },
                    { label: "For_TSSv2_Devs", children: [] },
                    {
                      label: "Hackathon_2021",
                      children: [{ label: "TrainingSessions", children: [] }],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      options: [
        {
          value: "opt1",
          label: "TestSource",
        },
        {
          value: "opt2",
          label: "Tools",
        },
      ],
      data: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      curPath: "",
      toolName: "",
      treeLoading:false
    };
  },
  mounted() {
    
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    // value(val){
    //   console.log('val',val)
    // }
  },
  methods: {
    change(data) {
      this.treeLoading=true
      if (data === "opt1") {
        this.data = [];
        // eventBus.$emit("getDataSource", "opt1");
        // getAllData().then((res) => {
        //   this.data.push(res.data);
        //   // console.log(data);
        // });
        this.data = this.data1
        this.treeLoading = false
        console.log("111", this.data);
      }
      if (data === "opt2") {
        this.data = [];
        eventBus.$emit("getDataSource", "opt2");
        getAllData().then((res) => {
          if(res){
            this.treeLoading = false
          }
          this.data.push(res.data);
          // console.log(data);
        });
        console.log("222", this.data);
      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

    handleNodeClick(data) {
      eventBus.$emit("isloading", true);
      console.log("clickData", data.label);
      this.curPath = data.current_path;
      this.toolName = data.label;
      readme(this.toolName).then((res) => {
        console.log("toolName", res.data);
        eventBus.$emit("getReadme", res.data);
      });
      getDetail(this.curPath).then((res2) => {
        console.log('res2',res2)
        eventBus.$emit("getContent", res2.data);
      });
      // eventBus.$emit("getContent", data.label);
    },
  },
};
</script>

<style>
.tree {
  overflow-x: hidden;
  /* height: 500px;  */
  margin: 0;
  padding: 0;
  overflow: auto;
  height: 80vh;
}
/* .el-tree{
 display: inline-block;
  min-width: 100%;
  overflow: hidden;
}
.el-tree>.el-tree-node{
  display:inline-block;
  min-width: 100%;
  overflow: hi;
} */

.el-input {
  margin-bottom: 6px;
  margin-top: 10px;
}
.tree {
  height: 500px;
}
</style>