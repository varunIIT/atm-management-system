$(()=>{
    let data={
        hundred:4,
        hundred2:4,
        hundred5:6,
        thousand2:2
    }
    $('.inp')
    // $.get('/denomination',(data)=>{
        $('#denomination').html(`<div class="text-center"><button class="note btn btn-success m-2">100</button><input class="inp" type="number" min="0" max="${data.hundred}"></div>
        <div class="text-center"><button class="note btn btn-success m-2">200</button><input class="inp" type="number" min="0" max="${data.hundred2}"></div>
        <div class="text-center"><button class="note btn btn-success m-2">500</button><input class="inp" type="number" min="0" max="${data.hundred5}"></div>
        <div class="text-center"><button class="note btn btn-success m-2">2000</button><input class="inp" type="number" min="0" max="${data.thousand2}"></div>`)
    // })
})