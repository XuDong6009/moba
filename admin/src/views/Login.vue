<template>
    <div class="login-container">
        <el-card header="登录">
            <el-form @submit.native.prevent="submit">
                <el-form-item label="用户名">
                    <el-input v-model="username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" native-type="submit" class="save-btn">保存</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            async submit() {
                const {
                    username,
                    password
                } = this
                const result = await this.$http.post('/login', {
                    username,
                    password
                })
                if(result.data.token) {
                    localStorage.token = result.data.token
                    this.$router.push('/')
                    this.$message.success('登录成功')
                }
            }
        }
    }
</script>

<style>
    .login-container {
        width: 500px;
        margin: 120px auto;
    }
</style>