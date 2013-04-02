var menuBarModel = {

    members : [
        {   name : "file", state : "closed" },
        {   name : "print", state : "closed" },
        {   name : "tools", state : "closed" },
        {   name : "help", state : "closed" }
    ]
};

$('#menu .file-button').click(function () {

    console.log("click on file button")
    $('.dropdown').tween({
       top:{
          start: -650,
          stop: 50,
          time: 0,
          units: 'px',
          duration: 1,
          effect:'easeInOut'
       }
    });
    $.play();
});




