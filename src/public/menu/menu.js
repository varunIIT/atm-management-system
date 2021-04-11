$(()=>{
    $.get('/user',(data)=>{
        $('#heading').text(`Welcome ${data.user}!`)
    })
})