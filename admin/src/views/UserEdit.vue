<template>
    <div>
        <h1>{{id ? '修改' : '创建'}}管理员</h1>
        <el-form @submit.native.prevent="save" label-width="120px">

            <el-form-item label="用户名">
                <el-input v-model="modal.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="modal.password"></el-input>
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
                    username: '',
                    password: ''
                },
            }
        },
        mounted() {
             this.id && this.fetch() //默认读取修改的内容
        },
        watch: {
            $route: {
                handler: function (val, oldVal) {
                    if (val.name === 'UserCreate') {
                        this.modal= {}
                    }
                },
                // 深度观察监听
                deep: true
            },
        },
        methods: {
            async save() {
                if (!this.modal.parent) {
                    delete this.modal.parent //删除parent属性
                }
                let result;
                if (this.id) {
                    result = await this.$http.put(`/reset/users/${this.id}`, this.modal)
                } else {
                    result = await this.$http.post('/reset/users', this.modal)
                }


                if (result.status === 200) {
                    this.$router.push('/users/list')
                    this.$message({
                        type: 'success',
                        message: '成功'
                    })
                }
            },
            async fetch() {
                //获取某一个id下的item 信息
                const result = await this.$http.get(`/reset/users/${this.id}`)
                this.modal = result.data
            }
        }
    }
</script>

<style>

</style>