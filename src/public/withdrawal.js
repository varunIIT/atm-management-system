$(() => {
  $.get("/denomination", (data) => {
    $("#denomination")
      .html(`<div class="text-center"><button type="button" class="note btn btn-primary m-2">100</button><input class="inp " id="100" type="number" min="0" max="${data.note100}" value="0" name="note100"></div>
        <div class="text-center"><button type="button" class="note btn btn-primary m-2">200</button><input class="inp " id="200" type="number" min="0" max="${data.note200}" value="0" name="note200"></div>
        <div class="text-center"><button type="button" class="note btn btn-primary m-2">500</button><input class="inp " id="500" type="number" min="0" max="${data.note500}" value="0" name="note500"></div>
        <div class="text-center"><button type="button" class="note btn btn-primary m-2">1000</button><input class="inp " id="1000" type="number" min="0" max="${data.note1000}" value="0" name="note1000"></div>
        <div class="text-center"><button type="button" class="note btn btn-primary m-2">2000</button><input class="inp " id="2000" type="number" min="0" max="${data.note2000}"  value="0" name="note2000"></div>`);

    $(".inp").on("input", (event) => {
      let note100 = parseInt($("#100").val()) * 100;
      let note200 = parseInt($("#200").val()) * 200;
      let note500 = parseInt($("#500").val()) * 500;
      //new denomination
      let note1000 = parseInt($("#1000").val()) * 1000;
      let note2000 = parseInt($("#2000").val()) * 2000;
      let newSum = note100 + note200 + note500 + note1000 + note2000;

      $("#totalCash").val(newSum);

      $("#totalCash").val(newSum);
    });
  });
});
