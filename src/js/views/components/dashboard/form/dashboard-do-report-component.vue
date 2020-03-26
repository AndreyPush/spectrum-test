<template>

  <section class="dashboard_doReport">

    <h2 class="dashboard_doReport_head">Создать отчёт</h2>

    <form class="dashboard_doReport_form" @submit.prevent="trySubmit">

      <div class="dashboard_doReport_form_col">
        <h4 class="dashboard_doReport_form_title">Идентификатор</h4>
        <input
          type="text"
          v-model="carID"
          class="dashboard_doReport_form_input"
          :class="{'dashboard_doReport_form_input--incorrect':incorrectSelect}"
          :placeholder="idPlaceholder"
          @keyup="validate"
        />
      </div>
      <div class="dashboard_doReport_form_col">
        <h4 class="dashboard_doReport_form_title">Тип идентификатора</h4>
        <div class="dashboard_doReport_form_selectBlock">
          <span class="dashboard_doReport_form_selectBlock_value" @click="openSelect">{{selectedValue.title}}</span>
          <div class="dashboard_doReport_form_select" v-if="showSelect">
            <span
              class="dashboard_doReport_form_select_item"
              v-for="(item, i) in select"
              :key="i"
              @click="doSelect(item.value)"
            >
              {{item.title}}
            </span>
          </div>
        </div>
      </div>
      <div class="dashboard_doReport_form_col">
        <input
          type="submit"
          class="dashboard_doReport_form_submit"
          :class="{'dashboard_doReport_form_submit--disabled':incorrectSelect}"
          value="Создать"
          :disabled="incorrectSelect"
        />
      </div>

    </form>

  </section>

</template>

<script>
  import {db} from '@db/database'
  import moment from 'moment'

  export default {
    data: ()=>({
      carID: '',
      incorrectSelect: false,
      showSelect: false,
      selectedValue: {
        name: 'grz',
        title: 'ГРЗ'
      },
      select: {
        grz: {
          title: 'ГРЗ',
          value: 'grz',
          placeholder: 'А007АА197',
          validation: {
            rule: /^([АВЕКМНОРСТУХ][0-9]{3}[АВЕКМНОРСТУХ]{2}[0-9]{2,3})$/,
            length: {
              min: 8,
              max: 9
            }
          }
        },
        vin: {
          title: 'VIN',
          value: 'vin',
          placeholder: '4F2YU08102KM26251',
          validation: {
            rule: /^[A-HJ-NPR-Z0-9]{17}$/,
            length: {
              min: 17,
              max: 17
            }
          }
        },
      }
    }),
    computed:{
      idPlaceholder(){
        return this.select[this.selectedValue.name].placeholder;
      }
    },
    methods:{
      doSelect(v){
        this.selectedValue.name = this.select[v].value;
        this.selectedValue.title = this.select[v].title;
        this.showSelect = false;
        this.carID = '';
      },
      openSelect(){
        this.showSelect = true;
      },
      validate(){

        const v = this.carID;

        const validationObj = this.select[this.selectedValue.name].validation;

        const rule = validationObj.rule;

        if(v.length>validationObj.length.max){
          this.carID = this.carID.substr(0, v.length-1);
        }

        if(v.length>=validationObj.length.min && v.length<=validationObj.length.max){

          if(!v.match(rule)){
            this.incorrectSelect = true
          }
          else{
            this.incorrectSelect = false;
          }
        }

        if(v.length<validationObj.length.min&&v.length>0){
          this.incorrectSelect = true
        }

      },
      trySubmit(){
        let th = this;

        if(!th.incorrectSelect && !!th.carID){
          db.reports.unshift({
            reportID: `${db.reports.length+1}`,
            id: th.carID,
            type: th.selectedValue.title,
            date: moment(moment()).format('YYYY-MM-DD HH:mm:ss'),
            status: 'progress',
          });

          db.exportDataBus.$emit('changeList');

        }
      }
    },
    mounted(){
      let th = this;
      document.addEventListener('click', e=>{
        let el = document.querySelector('.dashboard_doReport_form_selectBlock');
        if(!!el&&!el.contains(e.target)){
          th.showSelect = false
        }
      });
    }
  }

</script>
