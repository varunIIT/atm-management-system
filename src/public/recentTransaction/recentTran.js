$(()=>{
    console.log(1)
    $.get('/recentTransaction',(data)=>{
        if(!data){
            return location.replace("/login")
        }
        console.log(data)
        for(let rt of data){
            let val='No'
            if(rt.receipt){
                val='Yes'
            }
            $('.list-group').append(` <li class="list-group-item"><div><b>Withdrawal amount</b> : <i>Rs. ${rt. withdrawalAmount}</i></div><div><b>Receipt taken</b> : <i>${val}</i></div></li>`)
        }
    })
})