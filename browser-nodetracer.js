window.onload = function(){
  var row,
      intervalTime = 20,
      wrap = document.getElementById('nodeTracer'),
      tracer = new AsciiTracer(300, 100),
      interval,
      prevPos,
      tracerInProgress,
      cp0, cp1, cp2=cp1=cp0=0,
      camPos = [-3.3, 0.2, 0.7];

  document.body.addEventListener('keydown', function(evt){
    var dArr;
    function delta(d0,d1,d2) {
      if(d0) cp0+=d0;
      if(d1) cp1+=d1;
      if(d2) cp2+=d2;
      return !!(d0||d1||d2);
    }
    switch(evt.keyCode) {
      //LEFT key
      case 37: dArr = [0, 0, 0.2]; break;

      //RIGHT key
      case 39: dArr = [0, 0, -0.2]; break;

      //UP key
      case 38: dArr = [0.2, 0, 0]; break;

      //DOWN key
      case 40: dArr = [-0.2, 0, 0]; break;
    }
    if(dArr) {
      if(evt.shiftKey) {
        if(evt.keyCode===40) {
          dArr[0] = 0;
          dArr[1] -= 0.2;
        } else if(evt.keyCode===38) {
          dArr[0] = 0;
          dArr[1] += 0.2;
        }
      }
    }
    if(delta.apply(this, dArr)) {
      tracer.camera.position = tracer.vectorAdd(tracer.camera.position, [cp0,cp1,cp2]);
      cp0=cp1=cp2=0;
      // prevent window from scrolling...
      return false;
    }
  })
  function tracerIntervalFn() {
    if(prevPos !== tracer.camera.position) {

      // i don't know tracerInProgress helps here...
      if(!tracerInProgress) {
        tracerInProgress = true;
        prevPos = tracer.camera.position;
        renderTracerString(tracer.traceTo(scene));
        tracerInProgress = false;
      }
    }
  }
  function renderTracerString(tstr) {
    wrap.innerHTML = "<pre>"+tstr+"</pre>";
    /* splitting the text into DOM elements was sooooo slooooow... :( */
    // var output = "",
    //     trows = tstr.split("\n"),
    //     ri=0, trl = trows.length,
    //     ci, cr, cl;
    // for(;ri<trl; ri++) {
    //   output += "<p>";
    //   cr = trows[ri];
    //   // output += cr;
    // 
    //   // for(ci=0, cl=cr.length; ci < cl; ci++) {
    //   //   output += "<span>" + cr[ci] + "</span>";
    //   // }
    //   output += "</p>";
    // }
    // wrap.innerHTML=output;
  }
  interval = window.setInterval(tracerIntervalFn, intervalTime);

  //run once before setInterval kicks in...
  tracerIntervalFn();
};