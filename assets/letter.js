/**
 * Envelope + Letter — logic sau quả cầu ảnh (từ cricle)
 */
(function () {
  var envelopeOverlay = document.getElementById("envelope-overlay");
  var letterStage = document.getElementById("letter-stage");
  var letterTrigger = document.getElementById("letter-trigger");
  var letterForm = document.querySelector(".wrapperLetterForm");
  var letterCloseBtn = document.getElementById("letter-close-btn");
  var titleEl = document.querySelector(".textLetter h2");
  var contentEl = document.getElementById("letter-content-text");
  var titleTimer = null;
  var contentTimer = null;
  var openTimer = null;

  var fallbackTitle = "Gửi em !";
  var fallbackMessage =
    "Hôm nay 20/10, anh muốn chúc em có một ngày thật vui vẻ, luôn xinh xắn và hạnh phúc nhé 💗 Anh cũng chẳng biết phải nói sao cho hay, chỉ là anh thấy mình ngày càng muốn quan tâm em nhiều hơn một chút. Anh biết hiện tại chúng ta chưa là gì của nhau, nên anh không muốn vội vàng hay khiến em khó xử. Anh chỉ muốn nói rằng anh thích em, muốn được tìm hiểu em nhiều hơn và hy vọng một ngày nào đó, anh có thể trở thành người đặc biệt với em. Còn bây giờ, anh chỉ mong em luôn vui vẻ và nếu được thì hãy cho anh cơ hội để bước gần em hơn một chút nhé. 🌷";

  window.showEnvelope = function () {
    if (envelopeOverlay) envelopeOverlay.classList.add("show");
    if (letterStage) {
      letterStage.classList.remove("opening");
      letterStage.classList.add("show");
      letterStage.setAttribute("aria-hidden", "false");
    }
  };

  window.hideEnvelope = function () {
    if (envelopeOverlay) envelopeOverlay.classList.remove("show");
    if (letterStage) {
      letterStage.classList.remove("show", "opening");
      letterStage.setAttribute("aria-hidden", "true");
    }
  };

  function openLetterForm() {
    if (!letterStage || !letterForm) return;
    letterStage.classList.add("opening");
    openTimer = setTimeout(function () {
      window.hideEnvelope();
      letterForm.classList.add("show");
      letterForm.setAttribute("aria-hidden", "false");
      startLetterText();
    }, 520);
  }

  function getLetterTitle() {
    if (window.Heartlove && window.Heartlove.data && window.Heartlove.data.titleMessage) {
      return window.Heartlove.data.titleMessage;
    }
    if (window.dataChristmasTree && window.dataChristmasTree.data && window.dataChristmasTree.data.title) {
      return window.dataChristmasTree.data.title;
    }
    return fallbackTitle;
  }

  function getLetterMessage() {
    if (window.Heartlove && window.Heartlove.data && window.Heartlove.data.popupMessage) {
      return window.Heartlove.data.popupMessage;
    }
    return fallbackMessage;
  }

  function clearTypewriterTimers() {
    if (titleTimer) clearTimeout(titleTimer);
    if (contentTimer) clearTimeout(contentTimer);
    if (openTimer) clearTimeout(openTimer);
    titleTimer = null;
    contentTimer = null;
    openTimer = null;
  }

  function typeText(el, value, speed, done) {
    var index = 0;
    function tick() {
      if (index < value.length) {
        el.textContent += value.charAt(index);
        index++;
        var timer = setTimeout(tick, speed);
        if (el === titleEl) titleTimer = timer;
        else contentTimer = timer;
      } else if (done) {
        done();
      }
    }
    tick();
  }

  function startLetterText() {
    if (!titleEl || !contentEl) return;
    clearTypewriterTimers();
    titleEl.textContent = "";
    contentEl.textContent = "";
    typeText(titleEl, getLetterTitle(), 75, function () {
      contentTimer = setTimeout(function () {
        typeText(contentEl, getLetterMessage(), 28);
      }, 250);
    });
  }

  function closeLetter() {
    clearTypewriterTimers();
    if (letterForm) {
      letterForm.classList.remove("show");
      letterForm.setAttribute("aria-hidden", "true");
    }
    if (window.resetToSphere) window.resetToSphere();
  }

  if (letterTrigger) {
    letterTrigger.addEventListener("click", function (e) {
      e.stopPropagation();
      openLetterForm();
    });
    letterTrigger.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLetterForm();
      }
    });
  }

  if (letterCloseBtn) {
    letterCloseBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      closeLetter();
    });
  }

  if (letterForm) {
    letterForm.addEventListener("click", function (e) {
      if (e.target === letterForm) closeLetter();
    });
  }
})();
