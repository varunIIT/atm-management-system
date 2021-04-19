$(() => {
  $.get("/user", (data) => {
    if (data.lang == "english") {
      $("#heading").text(`Welcome ${data.user}!`);
    } else {
      $("#heading").text(`स्वागत हे ${data.user}!`);
      $("#cash").text(`नकद निकासी`);
      $("#changePin").text("पिन बदलिए");
      $("#recentTran").text("हाल ही के लेनदेन");
      $("#chequeBook").text("चेक बुक निवेदन");
      $("#balance").text("बैलेंस पूछताछ");
      $("#about").text("एटीएम के बारे में");
      $("#logout").text("लॉग आउट");
    }
  });
});
