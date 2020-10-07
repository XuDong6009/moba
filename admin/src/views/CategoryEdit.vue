<template>
    <div>
        <h1>创建分类</h1>
        <el-form @submit.native.prevent="save" label-width="120px">
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
        data() {
            return {
                modal: {}
            }
        },
        methods: {
            save() {
                this.$http.post('/categories', {
                    name: '龙飞'
                }).then(res => console.log(res))

            }
        }
    }
</script>

<style>

</style>