<template>
    <div>
        <h1>{{id ? '修改' : '创建'}}分类</h1>
        <el-form @submit.native.prevent="save" label-width="120px">
            <el-form-item label="上级分类">
                <el-select v-model="modal.parent">
                    <el-option v-for="item in parentOptions" :key="item._id" :label="item.name" :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="名称">
                <el-input v-model="modal.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        props: ['id'],
        data() {
            return {
                modal: {
                    name: '',
                    parent: ''
                },
                parentOptions: []
            }
        },
        mounted() {
            this.fetchParents() //获取parents选项的内容
            this.id && this.fetch() //默认读取修改的内容
            // thsi.getParentName()//查询对应id的parentname
        },
        watch: {
            $route: {
                handler: function (val, oldVal) {
                    if (val.name === 'CategoryCreate') {
                        this.modal.name = ''
                        this.modal.parent =''
                    }
                },
                // 深度观察监听
                deep: true
            },
        },
        methods: {
            async fetchParents() {
                const result = await this.$http.get('/reset/categories')
                if (result.status === 200) {
                    this.parentOptions = result.data
                }
            },
            async save() {

                if (!this.modal.parent) {
                    delete this.modal.parent //删除parent属性
                }
                let result;
                if (this.id) {
                    result = await this.$http.put(`/reset/categories/${this.id}`, this.modal)
                } else {
                    result = await this.$http.post('/reset/categories', this.modal)
                }


                if (result.status === 200) {
                    this.$router.push('/categories/list')
                    this.$message({
                        type: 'success',
                        message: '成功'
                    })
                }
            },
            async fetch() {
                //获取某一个id下的item 信息
                const result = await this.$http.get(`/reset/categories/${this.id}`)
                this.modal = result.data
            },
        }
    }
</script>

<style>

</style>