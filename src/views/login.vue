<template>
  <div class="login-container">
    <a-form class="view" :form="form" @submit="handleSubmit">
      <a-form-item label="用户名" :validate-status="userNameError() ? 'error' : ''" :help="userNameError() || ''">
        <a-input v-decorator="userNameRules" placeholder="Username">
          <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
        </a-input>
      </a-form-item>
      <a-form-item label="密码" :validate-status="passwordError() ? 'error' : ''" :help="passwordError() || ''">
        <a-input v-decorator="passwordRules" type="password" placeholder="Password">
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button class="submit" type="primary" html-type="submit" :disabled="hasErrors(form.getFieldsError())">
          Log in
        </a-button>
      </a-form-item>
    </a-form>
    <canvas ref="canvas1"/>
  </div>
</template>

<script>
import { Form, Input, Icon, Button } from 'ant-design-vue'
import md5 from 'js-md5'
import loginBg from '@assets/canvas'

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export default {
  name: 'login',
  components: {
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-input': Input,
    'a-icon': Icon,
    'a-button': Button,
  },
  data() {
    return {
      hasErrors,
      form: this.$form.createForm(this, { name: 'horizontal_login' }),
      userNameRules: ['userName', { rules: [{ required: true, message: 'Please input your username!' }] }],
      passwordRules: ['password', { rules: [{ required: true, message: 'Please input your Password!' }] }],
    };
  },
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields();

      loginBg(this.$refs.canvas1)
    });
  },
  methods: {
    // Only show error after a field is touched.
    userNameError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('userName') && getFieldError('userName');
    },
    // Only show error after a field is touched.
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('password') && getFieldError('password');
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          sessionStorage.userName = values.userName
          sessionStorage.sessionID = md5(values.userName + values.password)
          console.log(this.$route.query.path)
          this.$router.push(this.$route.query.path || '/')
        }
      });
    },
  },
}
</script>

<style scoped lang="stylus">
  .login-container
    width 100vw
    height 100vh
    display flex
    justify-content center
    align-items center

    canvas
      position absolute
      top 0
      z-index -1

    .view
      width 35%
      border 2px solid rgba(0, 0, 0, .1)
      border-radius 10px
      background rgba(0, 0, 0, .7)
      color #fff
      font-size 16px

      .ant-form-item
        max-width 80%
        margin 15px auto
        color #fff

        >>> label
          color #fff

        >>> input.ant-input
          min-height 50px
          background rgba(0, 0, 0, .3)
          color #fff

        .submit
          min-height 50px
          width 100%
          font-size 20px
</style>
