$(() => {
  console.log(1);
  $.get("/recentTransaction", (data) => {
    if (!data) {
      return location.replace("/");
    }

    //console.log(data);
    if (data.lang == "hindi") {
      $("#heading").text("आपका शीर्ष 10 हाल ही में लेनदेन!");
      $("#logout").text("लॉग आउट");
      for (let rt of data.recentTran) {
        let val = "नहीं ";
        if (rt.receipt) {
          val = "हाँ";
        }
        $(".list-group").append(
          ` <li class="list-group-item" style="border:solid 1px black;"><div><b>निकाली गयी राशि</b> : <i>रु. ${rt.withdrawalAmount}</i></div><div><b>रसीद ली गई</b> : <i>${val}</i></div></li>`
        );
      }
    } else {
      for (let rt of data.recentTran) {
        let val = "No";
        if (rt.receipt) {
          val = "Yes";
        }
        $(".list-group").append(
          ` <li class="list-group-item" style="border:solid 1px black;"><div><b>Withdrawal amount</b> : <i>Rs. ${rt.withdrawalAmount}</i></div><div><b>Receipt taken</b> : <i>${val}</i></div></li>`
        );
      }
    }
  });
});
