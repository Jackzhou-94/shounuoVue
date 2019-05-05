<template>
    <div class="login">
        <el-card class="user">
            <div>

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
                >
                </el-input>
                <!--验证码-->
                <div class="Verification">
                    <el-input placeholder="请输入验证码" @keyup.enter.native="login" style="width: 150px"
                              v-model="validation"></el-input>
                    <img :src="getImg" @click="getImage()">
                    <!--<div class="verify-box" @click="refreshCode">-->
                    <!--<Sidentify :identifyCode="identifyCode"></Sidentify>-->
                    <!--</div>-->
                </div>


                <el-button class="user_loginbtn" type="primary" @click="login">登录</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>

    import Sidentify from '../public/identify'
    import CryptoJS from 'crypto-js';//AES加密
    let Base64 = require('js-base64').Base64;


    export default {

        name: "login",
        components: {Sidentify},
        data() {
            return {

                username: '',
                password: '',
                validation: '',//用户输入验证码
                identifyCode: '',//生成的验证码
                identifyCodes: "1234567890",
                getImg: '',//验证码图片文件
                Imgcontent: '',//验证码图片内容
            }
        },
        methods: {

            randomNum(min, max) {
                return Math.floor(Math.random() * (max - min) + min)
            },
            refreshCode() {
                //静态验证码
                this.identifyCode = "";
                this.makeCode(this.identifyCode, 4)
            },
            getImage() {
                //通过后台接口获取验证码
                this.$axios.get(this.$store.state.getImage).then(res => {
                    console.log(res)
                    // console.log(Base64.encode('65kg'))
                    this.getImg = `data:image/gif;base64,${res.data.data.img}`
                    this.Imgcontent = res.data.data.code //验证码内容
                    console.log(this.Imgcontent)
                })
            },
            makeCode(o, l) {
                for (let i = 0; i < l; i++) {
                    this.identifyCode += this.identifyCodes[
                        this.randomNum(0, this.identifyCodes.length)
                        ]
                }
            },
            uuid(len, radix) {
                var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
                var uuid = [], i;
                radix = radix || chars.length;

                if (len) {
                    // Compact form
                    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
                } else {
                    // rfc4122, version 4 form
                    var r;

                    // rfc4122 requires these characters
                    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
                    uuid[14] = '4';

                    // Fill in random data.  At i==19 set the high bits of clock sequence as
                    // per rfc4122, sec. 4.1.5
                    for (i = 0; i < 36; i++) {
                        if (!uuid[i]) {
                            r = 0 | Math.random() * 16;
                            uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                        }
                    }
                }

                return uuid.join('');
            },
            login() {
                /**
                 * 登录流程：
                 *在用户密码后加入随机生成UUID
                 * 加入uuid的密码进行md5加密
                 *将MD5加密完成密钥再次进行AES加密
                 * */
                // let uuid=this.uuid(16, 10)
                // let pass=this.$md5(this.password+uuid)
                // let mys = CryptoJS.AES.encrypt(pass, 'secret key 123').toString()
                // console.log(mys)
                // console.log(pass)
                /**
                 * 加密
                 * **/

                /*
                * 验证码信息转为base64位
                * **/
                let imgcode = Base64.encode(this.validation.toLowerCase())

                if (imgcode !== this.Imgcontent) {
                    this.$message.error('验证码输入有误')
                    // console.log(Base64.encode(this.validation))

                } else {
                    let uuid = this.uuid(16, 10)
                    let pass = this.password + uuid

                    let encrypt = CryptoJS.AES.encrypt(pass, CryptoJS.enc.Utf8.parse('548dssa26s2s4s8s'), {
                        mode: CryptoJS.mode.ECB,
                        padding: CryptoJS.pad.Pkcs7
                    }).toString();

                    this.$axios.post(this.$store.state.login, {
                            username: this.username,
                            password: encrypt,
                            imageCode: imgcode
                        }
                    ).then(res => {
                        if (res.data.code != 200) {
                            return this.$message.error(res.data.msg)
                        }

                        /**
                         * 将用户token，用户权限保存至cookies
                         * **/
                        console.log(res)
                        this.$cookies.set('nickname', res.data.data.nickname)
                        this.$cookies.set('token', res.data.token)
                        this.$cookies.set('state', res.data.data.state)
                        sessionStorage.setItem('A', JSON.stringify(res.data.data))
                        this.$router.push('Home')
                    }).catch(err => {
                        throw err
                    })
                }


            }
        },

        created: function () {
            this.refreshCode()
            this.getImage()

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
        background: url("../../assets/b.png") no-repeat;
        display: flex;
        justify-content: center;

        background-size: cover;
    }

    .user {
        margin-top: 160px;
        width: 350px;
        height: 250px;
        /*background-color: rgba(0, 0, 0, 0.2);*/
        background-color: white;
        padding: 20px 50px 50px 50px;
        color: #093e66;
        /*position: absolute;*/
        /*margin-top: 10%;*/
        /*margin-left: 35%;*/
    }

    .user div .el-input, .user div .el-button {
        width: 305px;
    }

    .user_input {
        margin-top: 0.5em;
        width: 300px;
    }

    .user_loginbtn {
        margin-top: 0.5em;
        width: 305px;
    }

    .userTitle {
        font-weight: bold;
        font-size: 1.2em;
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        width: 305px;
    }

    .Verification {
        width: 305px;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        margin-top: 0.5em;
    }

    .Verification .el-input {
        width: 300px;
        margin-left: 0.25em;
    }
</style>