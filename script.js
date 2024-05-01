

var myButton = document.querySelector('#button');

var home = document.querySelector(home)
// Add a click event listener to the button
myButton.addEventListener('click', function() {
    // Use fullPage.js's moveTo method to scroll to the first section
    fullpage_api.moveTo(1);
});

new fullpage('#fullpage', {
    // options here
    autoScrolling: true,
    scrollHorizontally: true,
    anchors: ['home' , 'about' , 'projects'],

    afterLoad: function(origin, destination, direction){
        var loadedSection = this;

        //using index
        if(destination.index !== 0){
            // show your button when not in the first section
            document.querySelector('#button').style.position = 'fixed';
            document.querySelector('#button').style.display = 'flex';
            document.querySelector('#button').style.opacity = '1';
        } else {
            // hide your button when in the first section
            document.querySelector('#button').style.display = 'none';
            document.querySelector('#button').style.opacity = '0';
        }
    },

    onLeave: function(origin, destination, direction){
        var leavingSection = this;

        //using index
        if(origin.index === 0 && direction =='down'){
            // stick the button to the second section when scrolling down from the first section
            //document.querySelector('#button').style.position = 'absolute';
            document.querySelector('#button').style.opacity = '1';

        } else if(origin.index === 1 && direction =='up'){
            // hide the button when scrolling up to the first section
            //document.querySelector('#button').style.display = 'none';
            document.querySelector('#button').style.opacity = '0';
        }
    }

});





