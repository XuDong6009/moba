<template>
    <div>
        <h1>{{id ? '修改' : '创建'}}文章</h1>
        <el-form @submit.native.prevent="save" label-width="120px">
            <el-form-item label="所属分类">
                <el-select v-model="modal.categories" multiple>
                    <el-option v-for="item in categoriesOptions" :key="item._id" :label="item.name" :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题">
                <el-input v-model="modal.title"></el-input>
            </el-form-item>
            <el-form-item label="详情">
                <vue-editor v-model="modal.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {
        VueEditor
    } from "vue2-editor";
    export default {
        components: {
            VueEditor
        },
        props: ['id'],
        data() {
            return {
                modal: {
                    title: '',
                    categories: [],
                    body: ''
                },
                categoriesOptions: []
            }
        },
        mounted() {
            this.fetchParents() //获取parents选项的内容
            this.id && this.fetch() //默认读取修改的内容
        },
        watch: {
            $route: {
                handler: function (val, oldVal) {
                    if (val.name === 'ArticleCreate') {
                        this.modal.title = ''
                        this.modal.categories = []
                    }
                },
                // 深度观察监听
                deep: true
            },
        },
        methods: {
            async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
                var formData = new FormData();
                formData.append("file", file);
                const result = await this.$http.post('/upload', formData)
                Editor.insertEmbed(cursorLocation, "image", result.data.imgSrc);
                resetUploader();
            },
            async fetchParents() {
                const result = await this.$http.get('/reset/categories')
                if (result.status === 200) {
                    this.categoriesOptions = result.data
                }
            },
            async save() {
                let result;
                if (this.id) {
                    result = await this.$http.put(`/reset/articles/${this.id}`, this.modal)
                } else {
                    result = await this.$http.post('reset/articles', this.modal)
                }

                if (result.status === 200) {
                    this.$router.push('/articles/list')
                    this.$message({
                        type: 'success',
                        message: '成功'
                    })
                }
            },
            async fetch() {
                //获取某一个id下的item 信息
                const result = await this.$http.get(`/reset/articles/${this.id}`)
                this.modal = result.data
            },
        }
    }
</script>

<style>

</style>