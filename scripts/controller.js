// basic functionalities


$(document).ready(function () {
    var subscribe = true;
    var connected = true;

   var address =$("#address").val();
    client = mqtt.connect(address);
    
    $("#btn-connect").click(function () {
        connected=true;
        
      
        client.on("connect", function () {
            console.log("successfully connected!")
        })
        $("#status").val("connected")
        



        $("#btnPublish").click(function(){
            var topic =$("input[name=topic]").val();
            var payload=$("input[name=payload]").val();
                client.publish(topic,payload)
                var info ='<tr><td>'+ topic+'<td><td>'+payload+'</td><td>'+moment().format('MMMM Do YYYY, h:mm:ss a')+'</td></tr>'
                $('#tbody1').append(info);
            })
            

        });

        $("#btnUnsubscribe").click(function(){
            subscribe  = false;
        });

        $("#btnDisconnect").click(function(){
            client.end()
        });





        $("#btnSubscribe").click(function(){
            subscribe  = true;
            var topic =$("input[name=topic]").val();
            var payload =$("input[name=payload]").val();
            var topicS=$("input[name=topicS]").val();
            client.subscribe(topic);
            if(topicS==topic){
                
                $('#tbody2').append('<tr><td>'+ topic+'<td><td>'+'</td><td>'+moment().format('MMMM Do YYYY, h:mm:ss a')+'</td></tr>');
                $('#tbodyB').append('<tr><td>'+ topic+'<td><td>'+payload+'</td><td>'+moment().format('MMMM Do YYYY, h:mm:ss a')+'</td></tr>');
                client.on("message", function (topic, payload) {
                console.log([topic, payload].join(": "))
                
            });
            } else {
                $('#tbody2').append('<tr><td>'+ topicS+'<td><td>'+moment().format('MMMM Do YYYY, h:mm:ss a')+'</td></tr>');

            }
            
            

          


        



     
       

    });


  

})






// // advance functionalities
// client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")
// client.subscribe("mqtt/demo", function (err){
//   if (err){
//     console.log(err);
//   } else {
//     console.log("subscribed")
//   }
// })

// client.on("connect", function(){
//     console.log("Successfully connected");
// })

// client.on("message", function (topic, payload) {
//   console.log([topic, payload].join(": "));
//   client.end();
// })

// client.publish("mqtt/demo", "hello world!", function(err){
//   if (err){
//     console.log(err)
//   } else {
//     console.log("published")
//   }
// })