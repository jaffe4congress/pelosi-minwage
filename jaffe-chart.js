WebFontConfig = {
  google:{ families: ['Oswald'] },
  active: function(){start();},
};
(function(){
  var wf = document.createElement("script");
  wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.5.10/webfont.js';
  wf.async = 'true';
  document.head.appendChild(wf);
})();

// taken from solution in  https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
var browser = function() {
    // Return cached result if avalible, else get result then cache it.
    if (browser.prototype._cachedResult)
        return browser.prototype._cachedResult;

    // Opera 8.0+
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';

    // Safari 3.0+ "[object HTMLElementConstructor]"
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

    // Internet Explorer 6-11
    var isIE = /*@cc_on!@*/false || !!document.documentMode;

    // Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;

    // Chrome 1+
    var isChrome = !!window.chrome && !!window.chrome.webstore;

    // Blink engine detection
    var isBlink = (isChrome || isOpera) && !!window.CSS;

    return browser.prototype._cachedResult =
        isOpera ? 'Opera' :
        isFirefox ? 'Firefox' :
        isSafari ? 'Safari' :
        isChrome ? 'Chrome' :
        isIE ? 'IE' :
        isEdge ? 'Edge' :
        "bad";
};

browser = browser();

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
// the following 5 lines fixes the blur on Retina monitors
c.width=1560;
c.height=1040;
c.style.width="780px";
c.style.height="520px";
ctx.scale(2,2);
var wageIncrease = [7.25, 9.25, 10.10, 11.00, 12.00, 13.00, 13.50, 14.20, 15.00];
var inflation = document.getElementById("inflation").value / 100;
var w = 50;
var h = 0;
var spacing = 9;
var swidth = 80;

if (browser == "bad") {
  var test = setInterval(drawAxis, 100);

} else {
  drawAxis();
}

pelosiBars(wageIncrease, w, h, spacing, swidth);


function drawAxis() {
  // x-axis (year axis)
  ctx.strokeStyle = '#484f59';
  ctx.setLineDash([1,4]);
  //ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(700,475);
  ctx.lineTo(0,475);
  ctx.stroke();

  i=0;
  for(year=2016; year < 2025; year++) {
    ctx.font = ".9em Oswald";
    ctx.fillStyle= '#fffde5';
    if (year == 2016) {
      ctx.fillText("Current",15+i,490);
    } else {
      ctx.fillText(year,20+i,490);
    }
    i=i+80;
  }


  // y-axis (money axis)
  ctx.strokeStyle = 'black';
  ctx.beginPath();
  ctx.moveTo(700,10);
  ctx.lineTo(700,475);
  ctx.stroke();

  // money lines
  i=0;
  for(wage=15; wage > 6; wage--) {
    ctx.font = "0.9em Oswald";
    ctx.fillStyle= '#fffde5';
    ctx.fillText("$"+wage,705,25+i);



    ctx.strokeStyle = '#5d5e5e';
    //ctx.setLineDash([1,4]);
    ctx.beginPath();
    ctx.moveTo(700,19+i);
    ctx.lineTo(0,19+i);
    ctx.stroke();

    i=i+50;
  }
  // labels
  ctx.font = ".9em Oswald";
  ctx.fillStyle="#fffde5";
  ctx.fillText("Years",300,515);

  ctx.save();
  ctx.translate(0,300);
  ctx.rotate(-Math.PI/2);
  ctx.font = ".9em Oswald";
  ctx.fillStyle="#fffde5";
  ctx.fillText("Minimum Wage in US Dollars",0,760);
  ctx.restore();
}


function pelosiBars(wageIncrease, w, h, spacing, swidth) {
  // tickers are 50 pixels / 100 cents in a dollar = 0.5 pixels / cent (* 100 because
  // Math.floor leaves the decimal point)
  // begins 2017 and ends 2024


  for(i=0; i < 9; i++) {
    if (wageIncrease[i] < 7) {
      h = 50*(wageIncrease[i])/7 + 5;
    } else {
      h = 50*(Math.floor(wageIncrease[i])-6) + 50*(wageIncrease[i] % 1).toFixed(2) + 5;
    }

    ctx.fillStyle = "#71b1d6";
    ctx.fillRect(spacing,474-h,w,h);

    spacing = spacing + swidth;

  }

}

function fadedPelosiBars(wageIncease, w, h, spacing, swidth) {
  for(i=0; i < 9; i++) {
    if (wageIncrease[i] < 7) {
      h = 50*(wageIncrease[i])/7 + 5;
    } else {
      h = 50*(Math.floor(wageIncrease[i])-6) + 50*(wageIncrease[i] % 1).toFixed(2) + 5;
    }

    ctx.fillStyle = "#71b1d6";
    ctx.setLineDash([4,2]);
    ctx.strokeRect(spacing,474-h,w,h);
    ctx.fillRect(spacing,474-h,w,h);
    spacing = spacing + swidth;
  }
}

function draw() {
  //console.log(h);
  var spacing = 9;
  var wageIncrease = [7.25, 9.25, 10.10, 11.00, 12.00, 13.00, 13.50, 14.20, 15.00];
  var max = [];
  for(i=0; i < 9; i++) {
    if (i < 2) {
      inflated = wageIncrease[i];
    } else {
      inflated = wageIncrease[i]/Math.pow((1+inflation),(i-1));
    }
    /*ctx.font = "12px Helvetica";
    ctx.fillStyle= '#2f75d8';
    ctx.fillText(inflated.toFixed(3),15+(spacing-12),100);*/
    if (inflated < 7) {
      max.push(50*(wageIncrease[i])/7 + 5);
    } else {
      max.push(50*(Math.floor(inflated)-6) + 50*(inflated % 1).toFixed(3) + 5);
    }

  }
  //console.log(max[0]);

  for (j = 0; j < 9; j++) {
    if (h < max[j]) {
      h=h+0.1;
      ctx.fillStyle = "#ff3a3a";
      ctx.fillRect(spacing,474-h,50,h);
       }
      spacing = spacing + swidth;
  }

  window.requestAnimationFrame(draw);

}

function inflationBars(inflation, wageIncrease, w, h, spacing, swidth) {
  for(i=0; i < 9; i++) {
    if (i < 2) {
      inflated = wageIncrease[i];
    } else {
      inflated = wageIncrease[i]/Math.pow((1+inflation),(i-1));
    }
    /*ctx.font = "12px Helvetica";
    ctx.fillStyle= '#2f75d8';
    ctx.fillText(inflated.toFixed(3),15+(spacing-12),100);*/
    if (inflated < 7) {
      h = 50*(wageIncrease[i])/7 + 5;
    } else {
      h = 50*(Math.floor(inflated)-6) + 50*(inflated % 1).toFixed(3) + 5;
    }
    //ctx.fillStyle = 'black';
    //ctx.fillRect(spacing,474-h,w,h);
    spacing = spacing + swidth;

    var minwage = inflated;
    document.getElementById("minwage").innerHTML = minwage.toFixed(2);



  }
  // create a legend
  ctx.setLineDash([0,0]);
  ctx.strokeRect(15,42,140,55);

  ctx.fillStyle="#ff3a3a";
  ctx.fillRect(20,50,25,15);
  ctx.font = ".7em Oswald";
  ctx.fillStyle="#fffde5";
  ctx.fillText("Actual Minimum Wage",50,60);

  ctx.fillStyle="#71b1d6";
  ctx.fillRect(20,75,25,15);
  ctx.font = ".7em Oswald";
  ctx.fillStyle="#fffde5";
  ctx.fillText("Pelosi Minimum Wage",50,87);

  window.requestAnimationFrame(draw);

}





/* ------------------------ EVENT LISTENERS FOR PAGE ------------------ */
document.getElementById("inflate_btn").addEventListener("click",function(){
  //document.getElementById("test").innerHTML="clicked";
  //document.getElementById("footer_blank").style.display = 'none';
  ctx.clearRect(0, 0, c.width, c.height);
  h=0;
  //ctx.beginPath();
  inflation = document.getElementById("inflation").value / 100;
  drawAxis();
  fadedPelosiBars(wageIncrease, w, h, spacing, swidth);
  //draw();
  inflationBars(inflation,wageIncrease, w, h, spacing, swidth);
  document.getElementById("footer").style.display = 'block';
  //document.getElementById("increase").style.display = 'none';
  window.scrollTo(0,200);


})
