var birthcalc = {
  startDate:null,
  now:null,
  diff:null,
  live:null,
  input:{
    year:null,
    day:null,
    month:null,
    hour:null,
    minute:null
  },
  cal:{
    year:null,
    day:null,
    month:null,
    hour:null,
    minute:null
  },
  init:function(){
    this.input.year = $("#year");
    this.input.day = $("#day");
    this.input.month = $("#month");
    this.input.hour = $("#hour");
    this.input.minute = $("#minute");
    this.fillCalendar();  
    this.updateNow();
    this.liveUpdate("on");
  },
  liveUpdate:function(action){
    switch(action){
      case "on":
        this.live = setInterval(function(){
          birthcalc.generateStats();
        }, 1000);
        break;
      case "off":
        clearInterval(this.live);
        break;
    }
  },
  updateNow:function(){
    var tempdate = new Date();
    //Get now normalized to 0 seconds.
    this.now = new Date(
      tempdate.getFullYear(),
      tempdate.getMonth(),
      tempdate.getDate(),
      tempdate.getHours(),
      tempdate.getMinutes(),
      tempdate.getSeconds()
    );
  },
  fillCalendar:function(){
    var startyear = new Date().getFullYear()
    //Go back 200 years
    var endyear = startyear - 200;
    for(var i = startyear; i > endyear; i--){
      this.input.year.append('<option value="'+i+'">'+i+'</option>');
    }
    for(var ii = 1; ii <= 31; ii++){
      this.input.day.append('<option value="'+ii+'">'+ii+'</option>');
    }
    for(var iii = 0; iii <= 23; iii++){
      this.input.hour.append('<option value="'+iii+'">'+iii+'</option>');
    }
    for(var iiii = 0; iiii <= 59; iiii++){
      this.input.minute.append('<option value="'+iiii+'">'+iiii+'</option>');
    }
  },
  setBirthday:function(){
    this.cal.year = this.input.year.val();
    this.cal.month = this.input.month.val();
    this.cal.day = this.input.day.val();
    this.cal.hour = this.input.hour.val();
    this.cal.minute = this.input.minute.val();
    this.startDate = new Date(this.cal.year, this.cal.month, this.cal.day, this.cal.hour, this.cal.minute, 0);
    this.diff = parseInt(this.now.getTime()/1000) - parseInt(this.startDate.getTime()/1000);
  },
  generateStats:function(){
    this.updateNow();
    this.setBirthday();
    
    var diff = this.diff;
    
    var years = (diff /(86400*365.25)).toFixed(2);
    var weeks = (diff /(86400*7)).toFixed(0);
    var hours = this.numberWithCommas((diff /(3600)).toFixed(1));
    var days = this.numberWithCommas((diff /(86400)).toFixed(1));
    var hours = this.numberWithCommas((diff /(3600)).toFixed(1));
    var min = (diff /(60)).toFixed(0);
    var minutes = this.numberWithCommas(min);
    var seconds = this.numberWithCommas(this.diff);
    
  $("#result").html("\
    <h2>"+this.startDate+"</h2>\
    <h3>You have been around for</h3>\
    <p>"+years+" Years.</p>\
    <p>"+weeks+" Weeks.</p>\
    <p>"+days+" Days.</p>\
    <p>"+hours+" Hours.</p>\
    <p>"+minutes+" Minutes.</p>\
    <p>"+seconds+" Seconds.</p>\
    <h3>Milestones</h3>\
   ");
  },
  numberWithCommas:function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};

$(document)
.ready(function(){
  birthcalc.init();
})
.on("change", "#calendar select", function(){
  birthcalc.generateStats();
})
;