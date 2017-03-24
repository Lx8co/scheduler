var app = new Vue({
  el: '#test4',
  data: {
    appointments: []
  }
});

app.$on('appointments', function (data) {
    console.log(data)
    this.appointments = data;
});