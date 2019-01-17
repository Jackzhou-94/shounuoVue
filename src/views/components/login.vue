<template>
    <div class="login">
        <div class="user">
            <p class="userTitle">首诺供应链管理系统</p>
            <el-input
                    class="user_input"
                    prefix-icon="fontFamily hhtx-iconzh1"
                    placeholder="账号"
                    v-model="username"
            >
            </el-input>
            <el-input
                    class="user_input"
                    prefix-icon="fontFamily hhtx-mimaffffffpx"
                    placeholder="密码"
                    type="password"
                    v-model="password"
                    @keyup.enter.native="login">
            </el-input>

            <el-button class="user_loginbtn" type="primary" @click="login">登录</el-button>
        </div>


    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                username: '',
                password: '',
            }
        },
        methods: {
            login() {
                if (this.username=='admin'&&this.password=='admin'){
                    this.$router.push('Home')
                }else {
                    alert('用户名或者密码不正确')
                }
                let formData = new FormData()
                formData.append('username', this.username)
                formData.append('password', this.password)
                console.log(formData)
                // this.$axios.post(this.$store.state.login,formData).then(res=>{
                //     console.log(res)
                // }).catch(err=>{
                //     console.log(err)
                // })
            }
        }
    }
</script>

<style scoped>
    html, body {
        width: 100%;
        height: 100%;
    }

    .login {
        width: 100%;
        height: 100%;
        background: url("../../assets/banner.png") no-repeat;
        background-size: 100%, 100%
    }

    .user {
        width: 20%;
        height: 25%;
        background-color: rgba(0, 0, 0, 0.2);
        padding: 3%;
        color: #ffffff;
        position: absolute;
        margin-top: 10%;
        margin-left: 60%;
    }

    .user_input {
        margin-top: 3%
    }

    .user_loginbtn {
        margin-top: 3%;
        width: 100%
    }

    .userTitle {
        font-weight: bold;
        font-size: 1.2em;
    }
</style>