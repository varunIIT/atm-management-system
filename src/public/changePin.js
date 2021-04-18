$(() => {
  $(".num").click((event) => {
    let number = parseInt($(event.target).text());
    let pin = $("#floatingInput").val();
    pin = pin + number;
    $("#floatingInput").val(pin);
  });
  let y = $("#flexCheckDefault");
  y.click(() => {
    let x = document.getElementById("floatingInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  });
  $(".reset").click((event) => {
    $("#floatingInput").val("");
  });
  $(".backspace").click((event) => {
    let pin = $("#floatingInput").val();
    $("#floatingInput").val(pin.substring(0, pin.length - 1));
  });
});
