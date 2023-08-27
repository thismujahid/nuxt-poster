import Vue from "vue";

function date(date){
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var formated  = new Date(date);
    return formated.toLocaleDateString("en-US", options)

}
Vue.filter("d",date);