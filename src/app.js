/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var internetUsageURL = 'http://mc.inoxx.net/telstra_usage/internet_usage';

var UI = require('ui');
var Vector2 = require('vector2');
var Ajax = require('ajax');

var splashWindow = new UI.Window();
var splashText = new UI.Text({
    position: new Vector2(0, 50),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Fetching!',
    textAlign: 'center'
});

splashWindow.add(splashText);
splashWindow.show();

Ajax({
    url: internetUsageURL,
    type: 'json'

}, function(data) {
    splashWindow.hide();
    
    var infoWindow = new UI.Window();
    
    var rectWidth  = 141;
    var rectHeight = 24;
    
    var usage = data.Usage;
    var usagePercentage = usage.ratedUsage / usage.usageLimit;
    
    var usageText   = Math.round(usage.ratedUsage) + usage.ratedUsageUnit + " / " + Math.round(usage.usageLimit) + usage.usageLimitUnit;
    
    var todaysDate     = new Date();
    var nextBillDate   = new Date(usage.nextBillDate);
    
    var billDateDifference     = nextBillDate.getTime() - todaysDate;
    var billDateDifferenceDays = Math.round(billDateDifference / (24 * 3600 * 1000));
    
    var daysRemainText = billDateDifferenceDays + " days remain.";
    var usageWidth  = Math.round(rectWidth  * usagePercentage);
    
    console.log(data);
    console.log(usagePercentage);
    
    // outer border rect
    var outerRect = new UI.Rect({
        position: new Vector2(0, 60),
        size: new Vector2(144, 30),
        borderColor: 'white',
        backgroundColor: 'black'
    });
    
    // inner usage rect
    var innerRect = new UI.Rect({
        position: new Vector2(3, 63),
        size: new Vector2(0, rectHeight),
        borderColor: 'clear',
        backgroundColor: 'white'
    });
    
    // usage amt
    var usageTextDisplay = new UI.Text({
        position: new Vector2(0, 30),
        size: new Vector2(144, 30),
        font: 'gothic-24-bold',
        text: usageText,
        textAlign: 'center'
    });
    
    // usage amt
    var daysRemainDisplay = new UI.Text({
        position: new Vector2(0, 90),
        size: new Vector2(144, 30),
        font: 'gothic-18-bold',
        text: daysRemainText,
        textAlign: 'center'
    });
    
    infoWindow.add(outerRect);
    infoWindow.add(innerRect);
    infoWindow.add(usageTextDisplay);
    infoWindow.add(daysRemainDisplay);
    infoWindow.show();
    
    var innerSize = innerRect.size();
    innerSize.addSelf(new Vector2(usageWidth, 0));
    
    innerRect.animate({ size: innerSize });
    
}, function(error) {
   console.log("An error! " + error); 
});

/*

main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Pebble.js',
        icon: 'images/menu_icon.png',
        subtitle: 'Can do Menus'
      }, {
        title: 'Second Item',
        subtitle: 'Subtitle Text'
      }]
    }]
  });
  menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  });
  menu.show();
});

main.on('click', 'select', function(e) {
  var wind = new UI.Window();
  var textfield = new UI.Text({
    position: new Vector2(0, 50),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Text Anywhere!',
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
});

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Pebble.js.');
  card.show();
});

*/
