<template>
  <form class="login_form" @submit.prevent="submit">
    <h2 class="login_head">Авторизация</h2>
    <div class="login_inputBlock">
      <p class="login_inputBlock_title">Логин</p>
      <input type="text" class="login_inputBlock_input" v-model="models.username">
    </div>
    <div class="login_inputBlock">
      <p class="login_inputBlock_title">Пароль</p>
      <input type="text" class="login_inputBlock_input" v-model="models.password">
    </div>
    <input type="submit" class="login_form_submit">
  </form>
</template>

<script>
  import {db} from '@db/database'
  import md5 from 'md5'
  import Cookies from 'js-cookie'

  export default{
    data: ()=>({
      models: {
        username: '',
        password: ''
      }
    }),
    methods:{
      submit(){
        let th = this;
        for(let item in db.users){
          if(db.users[item].login===th.models.username&&db.users[item].password===md5(th.models.password)){
            Cookies.set('sessionID', md5(db.users[item].id))
            this.$router.push('/dashboard');
          }
        }
      }
    }

  }

</script>
