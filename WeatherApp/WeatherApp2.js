$(document).ready(function () {
  $("#words").hide();
  $("#timegeneral").hide();
  $("#tip").hide();
  $("#searchbar").after($("<button> </button>").attr("id", "searchbutton"));
  $("#searchbutton")
    .html($("<img>", { id: "picture", src: "Utils/Search.png" }))
    .addClass("searchbutton bg-transparent border border-0");
  $("#picture").css({
    width: "25px",
    position: "relative",
    top: "-2px",
    opacity: "0.5",
  });

  function mainCalc(city) {
    if (currentInterval > 0) {
      clearInterval(currentInterval);
    }
    event.preventDefault();
    document.getElementById("Form").reset();
    var url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=9aab6fc5372a05a9b9579dee92514753`;

    $.get(url, function (data) {
      var Lat = data[0]["lat"];
      var Long = data[0]["lon"];
      var nurl = `https://api.openweathermap.org/data/2.5/weather?lat=${Lat}&lon=${Long}&appid=9aab6fc5372a05a9b9579dee92514753`;

      $.get(nurl, function (actual) {
        var temperature = actual.main.temp - 273.15;
        var temperaturedisplay = temperature.toFixed(2) + " C";
        var icon = actual.weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";

        $("#temp").text(temperaturedisplay);
        $("#icon").html($("<img>", { id: "iconpic", src: iconurl }));
        $("#iconpic").css({
          width: "70px",
        });
        $("#cityname").text(city.toUpperCase());

        $("#timegeneral").show();
        $("#tip").show();

        currentInterval = setInterval(function () {
          var hdate = new Date();
          var offset = 0 - hdate.getTimezoneOffset() / 60;
          var hmin = hdate.getMinutes();
          var hsec = hdate.getSeconds();
          var diff = Math.round(Long / 15) - offset;
          if (hdate.getHours() + diff > 23) {
            disphour = hdate.getHours() + diff - 24;
            var formattedNumberh = ("0" + disphour).slice(-2);
            $("#hour").text(formattedNumberh);
          } else if (hdate.getHours() + diff < 0) {
            disphour = 24 + (hdate.getHours() + diff);
            var formattedNumberh = ("0" + disphour).slice(-2);
            $("#hour").text(formattedNumberh);
          } else {
            disphour = hdate.getHours() + diff;
            var formattedNumberh = ("0" + disphour).slice(-2);
            $("#hour").text(formattedNumberh);
          }
          var formattedNumberm = ("0" + hmin).slice(-2);
          var formattedNumbers = ("0" + hsec).slice(-2);
          $("#minute").text(formattedNumberm);
          $("#second").text(formattedNumbers);
        }, 1000);

        if (actual.weather[0].main == "Snow") {
          $("video").attr("src", "Utils/Snow.mp4");
        } else if (actual.weather[0].main == "Rain") {
          $("video").attr("src", "Utils/Rain.mp4");
        } else if (actual.weather[0].main == "Clouds") {
          $("video").attr("src", "Utils/Clouds.mp4");
        } else if (
          actual.weather[0].main == "Fog" ||
          actual.weather[0].main == "Haze" ||
          actual.weather[0].main == "Mist"
        ) {
          $("video").attr("src", "Utils/Haze.mp4");
        } else if (
          actual.weather[0].main == "Clear" &&
          actual.weather[0].icon == "01d"
        ) {
          $("video").attr("src", "Utils/Blue.mp4");
        } else if (actual.weather[0].main == "Clear") {
          $("video").attr("src", "Utils/Clear.mp4");
        }

        var message = null;
        if (temperature <= -10) {
          message = `Wow, it's really cold in ${city}! Make sure to wear a thermal jacket!`;
        } else if (-10 < temperature && temperature <= 0) {
          message = `Look at that; ${city} is in the negatives! Stay warm!`;
        } else if (0 < temperature && temperature <= 10) {
          message = `Brrr...it's looking a little chilly in ${city}! A nice wind-breaker will do!`;
        } else if (10 < temperature && temperature <= 20) {
          message = `Nice weather in ${city} today! Embrace it while it lasts...`;
        } else if (20 < temperature && temperature <= 35) {
          message = `It is super warm in ${city}! Go for a walk, or a picnic!`;
        } else {
          message = `It's looking like a heat-stroke might be possible ${city} today! Be careful and drink water!`;
        }
        $("#words").text(message);

        $("#tip")
          .addClass("jumpan")
          .on("mouseenter", function (e) {
            $("#words").show();
            $(this).removeClass("jumpan");
          })
          .on("mouseleave", function (e) {
            $("#words").hide();
            $(this).addClass("jumpan");
          });

        var weatherMain = actual.weather[0].main;
        $("#weathermain").text(weatherMain);
        var weatherDisc = actual.weather[0].description;
        var weatherDiscDisp =
          weatherDisc[0].toUpperCase() +
          weatherDisc.slice(1, weatherDisc.length);
        $("#weatherdisc").text(weatherDiscDisp);
        var feelsLike = actual.main.feels_like - 273.15;
        feelsLikeDisp = feelsLike.toFixed(2) + " C";
        $("#feelslike").text(feelsLikeDisp);
        var maxTemp = actual.main.temp_max - 273.15;
        maxTempDisp = maxTemp.toFixed(2) + " C";
        $("#maxtemp").text(maxTempDisp);
        var minTemp = actual.main.temp_min - 273.15;
        minTempDisp = minTemp.toFixed(2) + " C";
        $("#mintemp").text(minTempDisp);
        var pressure = actual.main.pressure + " HPa";
        $("#pressure").text(pressure);
        var windSpeed = actual.wind.speed + " m/s";
        $("#windspeed").text(windSpeed);
        var windDirection = actual.wind.deg;
        $("#winddegree").text(windDirection);
        var windGust = actual.wind.gust + " m/s";
        $("#windgust").text(windGust);
      });
    });
  }

  var currentInterval = null;
  $(document).on("click", ".searchbutton", function (e) {
    var city = $("#searchbar").val();
    mainCalc(city);
  });

  $(document).on("click", "#shortcut1", function (e) {
    var city = $("#shortcut1").text();
    mainCalc(city);
  });

  $(document).on("click", "#shortcut2", function (e) {
    var city = $("#shortcut2").text();
    mainCalc(city);
  });

  $(document).on("click", "#shortcut3", function (e) {
    var city = $("#shortcut3").text();
    mainCalc(city);
  });

  $(document).on("click", "#shortcut4", function (e) {
    var city = $("#shortcut4").text();
    mainCalc(city);
  });
});
