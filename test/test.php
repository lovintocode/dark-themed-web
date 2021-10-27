<!DOCTYPE html>
<html>
<head>
  <style>
    .select-wrapper {
     position: relative;
     user-select: none;
     width: 100%;
   }
   .select {
     position: relative;
     display: flex;
     flex-direction: column;
     border-width: 0 2px 0 2px;
     border-style: solid;
     border-color: #394a6d;
   }
   .selection-box {
     position: relative;
     display: flex;
     align-items: center;
     justify-content: space-between;
     padding: 0 22px;
     font-size: 20px;
     font-weight: 300;
     color: #3b3b3b;
     height: 60px;
     line-height: 60px;
     background: #ffffff;
     cursor: pointer;
     border-width: 2px 0 2px 0;
     border-style: solid;
     border-color: #394a6d;
   }
   .custom-options {
     position: absolute;
     display: block;
     top: 100%;
     left: 0;
     right: 0;
     border: 2px solid #394a6d;
     border-top: 0;
     background: #fff;
     transition: all 0.5s;
     opacity: 0;
     visibility: hidden;
     pointer-events: none;
     z-index: 2;
   }
   .select.open .custom-options {
     opacity: 1;
     visibility: visible;
     pointer-events: all;
   }
   .option-box {
     position: relative;
     display: block;
     padding: 0 22px 0 22px;
     font-size: 22px;
     font-weight: 300;
     color: #3b3b3b;
     line-height: 60px;
     cursor: pointer;
     transition: all 0.5s;
   }
   .option-box:hover {
     cursor: pointer;
     background-color: #b2b2b2;
   }
   .option-box.selected {
     color: #ffffff;
     background-color: #305c91;
   }

   /* Arrow */
   .arrow {
     position: relative;
     height: 15px;
     width: 15px;
   }
   .arrow::before, .arrow::after {
     content: "";
     position: absolute;
     bottom: 0px;
     width: 0.15rem;
     height: 100%;
     transition: all 0.5s;
   }
   .arrow::before {
     left: -5px;
     transform: rotate(45deg);
     background-color: #394a6d;
   }
   .arrow::after {
     left: 5px;
     transform: rotate(-45deg);
     background-color: #394a6d;
   }
   .open .arrow::before {
     left: -5px;
     transform: rotate(-45deg);
   }
   .open .arrow::after {
     left: 5px;
     transform: rotate(45deg);
   }

 </style>
</head>
<body>
  <div class="select-wrapper">
    <div class="select">
      <div class="select_trigger"><span>Tesla</span>
        <div class="arrow"></div>
      </div>
      <div class="custom-options">
        <span class="custom-option selected" data-value="tesla">Tesla</span>
        <span class="custom-option" data-value="volvo">Volvo</span>
        <span class="custom-option" data-value="mercedes">Mercedes</span>
      </div>
    </div>
  </div>
  <div class="select-wrapper">
    <div class="select">
      <div class="select_trigger"><span>Tesla</span>
        <div class="arrow"></div>
      </div>
      <div class="custom-options">
        <span class="custom-option selected" data-value="tesla">Tesla</span>
        <span class="custom-option" data-value="volvo">Volvo</span>
        <span class="custom-option" data-value="mercedes">Mercedes</span>
      </div>
    </div>
  </div>
  <script
  src="https://code.jquery.com/jquery-3.6.0.min.js"
  integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
  crossorigin="anonymous"></script>
  <script>
    $('.select-wrapper').click(function() {
      $(this).find('.select').toggleClass('open')
    })

    $(window).click(function(e){
      for (const select of document.querySelectorAll('.select')) {
        if (!select.contains(e.target)) {
          select.classList.remove('open');
        }
      }
    })
    $('.custom-option').click(function() {
      if (!$(this).hasClass('selected')) {
        $(this).parent().find('.custom-option.selected').removeClass('selected')
        $(this).addClass('selected')
        $(this).closest('.select').find('.select_trigger span').text($(this).text())
      }
      console.log($(this).data())
    })
    // for (const option of document.querySelectorAll(".custom-option")) {
    //   option.addEventListener('click', function() {
    //     if (!this.classList.contains('selected')) {
    //       this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
    //       this.classList.add('selected');
    //       this.closest('.select').querySelector('.select_trigger span').textContent = this.textContent;
    //     }
    //   })
    // }




  </script>
</body>
</html>
