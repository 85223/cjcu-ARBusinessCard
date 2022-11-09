const showInfo = () => {
  let y = 0;
  // 利用 document.querySelector html element 元素  id前面要加 " # " , class前面要加 " . "
  const profileButton = document.querySelector("#profile-button");
  const webButton = document.querySelector("#web-button");
  const emailButton = document.querySelector("#email-button");
  const locationButton = document.querySelector("#location-button");
  const text = document.querySelector("#text");

  // setAttribute 可以賦予元素新的屬性數值
  // visible 為 true 代表物件顯示 , false 代表物件不顯示
  profileButton.setAttribute("visible", true);
  // setTimeout 是計時器
  // setTimeout(functionRef, delay)
  // 這邊要注意delay的時間是毫秒  EX: 1秒 就等於 1000毫秒
  setTimeout(() => {
    webButton.setAttribute("visible", true);
  }, 300);
  setTimeout(() => {
    emailButton.setAttribute("visible", true);
  }, 600);
  setTimeout(() => {
    locationButton.setAttribute("visible", true);
  }, 900);

  let currentTab = "";
  // 利用 addEventListener 為html element 註冊觸發事件
  webButton.addEventListener("click", function (evt) {
    text.setAttribute("value", "https://softmind.tech");
    currentTab = "web";
  });
  emailButton.addEventListener("click", function (evt) {
    text.setAttribute("value", "hello@softmind.tech");
    currentTab = "email";
  });
  profileButton.addEventListener("click", function (evt) {
    text.setAttribute("value", "AR, VR solutions and consultation");
    currentTab = "profile";
  });
  locationButton.addEventListener("click", function (evt) {
    console.log("loc");
    text.setAttribute("value", "Vancouver, Canada | Hong Kong");
    currentTab = "location";
  });

  text.addEventListener("click", function (evt) {
    //  window.location.href 指的是當前的網址
    // 這邊把當前網址改掉後就會直接導向到賦予的url中
    // 建議還是不要這樣直接用，新網頁用瀏覽器開新分頁的方式會比較好
    if (currentTab === "web") {
      window.location.href = "https://google.com";
      // window.open("https://google.com"); 這個方式就可以開新分頁
    }
  });
};

//  顯示上方的Portfolio 版面 function()
const showPortfolio = (done) => {
  const portfolio = document.querySelector("#portfolio-panel");
  const portfolioLeftButton = document.querySelector("#portfolio-left-button");
  const portfolioRightButton = document.querySelector(
    "#portfolio-right-button"
  );
  const paintandquestPreviewButton = document.querySelector(
    "#paintandquest-preview-button"
  );

  let y = 0;
  let currentItem = 0;
  // 顯示上方的Portfolio 的 <a-entity>
  portfolio.setAttribute("visible", true);

  const showPortfolioItem = (item) => {
    for (let i = 0; i <= 2; i++) {
      document
        .querySelector("#portfolio-item" + i)
        .setAttribute("visible", i === item);
    }
  };
  const id = setInterval(() => {
    y += 0.008;
    console.log(y);
    if (y >= 0.6) {
      clearInterval(id);
      portfolioLeftButton.setAttribute("visible", true);
      portfolioRightButton.setAttribute("visible", true);
      portfolioLeftButton.addEventListener("click", () => {
        console.log(currentItem);
        currentItem = (currentItem + 1) % 3;
        console.log(currentItem);
        showPortfolioItem(currentItem);
      });
      portfolioRightButton.addEventListener("click", () => {
        currentItem = (currentItem - 1 + 3) % 3;
        showPortfolioItem(currentItem);
      });

      //賦予video element  影片資源
      paintandquestPreviewButton.addEventListener("click", () => {
        paintandquestPreviewButton.setAttribute("visible", false);
        const testVideo = document.createElement("video");
        const canplayWebm = testVideo.canPlayType(
          'video/webm; codecs="vp8, vorbis"'
        );
        if (canplayWebm == "") {
          alert("您的設備不能播放webm格式");
        } else {
          document
            .querySelector("#paintandquest-video-link")
            .setAttribute("src", "#paintandquest-video-webm");
          document.querySelector("#paintandquest-video-webm").play();
        }
      });

      setTimeout(() => {
        done();
      }, 500);
    }
    portfolio.setAttribute("position", "0 " + y + " -0.01");
  }, 10);
};

const showAvatar = (onDone) => {
  const avatar = document.querySelector("#avatar");
  let z = -0.3;
  const id = setInterval(() => {
    z += 0.008;
    if (z >= 0.3) {
      clearInterval(id);
      onDone();
    }
    avatar.setAttribute("position", "0 -0.25 " + z);
  }, 10);
};

AFRAME.registerComponent("mytarget", {
  init: function () {
    this.el.addEventListener("targetFound", (event) => {
      console.log("target found");
      showAvatar(() => {
        setTimeout(() => {
          showPortfolio(() => {
            setTimeout(() => {
              showInfo();
            }, 300);
          });
        }, 300);
      });
    });
    this.el.addEventListener("targetLost", (event) => {
      console.log("target found");
    });
    // this.el.emit("targetFound");
  },
});
