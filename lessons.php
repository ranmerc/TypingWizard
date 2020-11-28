<?php
    include("header.html");
?>
<title>Lessons</title>
<link rel="stylesheet" href="Styles/lessons.css">

<div class="lessons_container">
  
  <div id="sidebar" class="row">
    <div class="lesson_title_div column-1">
        <p class="lesson_title" data-lesson="1">Lesson 1</p>
        <p class="lesson_title" data-lesson="2">Lesson 2</p>
        <p class="lesson_title" data-lesson="3">Lesson 3</p>
        <p class="lesson_title" data-lesson="4">Lesson 4</p>
        <p class="lesson_title" data-lesson="5">Lesson 5</p>
        <p class="lesson_title" data-lesson="6">Lesson 6</p>
        <p class="lesson_title" data-lesson="7">Lesson 7</p>
        <p class="lesson_title" data-lesson="8">Lesson 8</p>
        <p class="lesson_title" data-lesson="9">Lesson 9</p>
        <p class="lesson_title" data-lesson="10">Lesson 10</p>
        <p class="lesson_title" data-lesson="11">Lesson 11</p>
        <p class="lesson_title" data-lesson="12">Lesson 12</p>
        <p class="lesson_title" data-lesson="13">Lesson 13</p>
        <p class="lesson_title" data-lesson="14">Lesson 14</p>
        <p class="lesson_title" data-lesson="15">Lesson 15</p>
    </div>

    <div class="lesson_content_div  hidden column-2" >
    </div> 
  </div>
  <!-- lessons_container end -->

  <div class="typing_container">
    <div class="lessonTitle"></div>

    <div class="subLessonTitle"></div>

    <div class="displayText">

    </div>

    <div class="typingSpace"><textarea type="text" name="typeSpace" class="typingSpaceTextarea"  spellcheck="false"></textarea></div>

    <div id="keyboard">
        <div class="row">
            <div class="key key-tilde">
                <div class="key-top">~</div>
                <div class="key-bottom">`</div>
            </div>
            <div class="key key-one">
                <div class="key-top">!</div>
                <div class="key-bottom">1</div>
            </div>
            <div class="key key-two">
                <div class="key-top">@</div>
                <div class="key-bottom">2</div>
            </div>
            <div class="key key-three">
                <div class="key-top">#</div>
                <div class="key-bottom">3</div>
            </div>
            <div class="key key-four">
                <div class="key-top">$</div>
                <div class="key-bottom">4</div>
            </div>
            <div class="key key-five">
                <div class="key-top">%</div>
                <div class="key-bottom">5</div>
            </div>
            <div class="key key-six">
                <div class="key-top">^</div>
                <div class="key-bottom">6</div>
            </div>
            <div class="key key-seven">
                <div class="key-top">&</div>
                <div class="key-bottom">7</div>
            </div>
            <div class="key key-eight">
                    <div class="key-top">*</div>
                    <div class="key-bottom">8</div>
            </div>
            <div class="key key-nine">
                    <div class="key-top">(</div>
                    <div class="key-bottom">9</div>
            </div>
            <div class="key key-zero">
                <div class="key-top">)</div>
                <div class="key-bottom">0</div>
            </div>
            <div class="key key-minus">
                <div class="key-top">_</div>
                <div class="key-bottom">-</div>
            </div>
            <div class="key key-equal">
                <div class="key-top">+</div>
                <div class="key-bottom">=</div>
            </div>
            <div class="key key-backspace key-special">
                <div class="key-title">Backspace</div>
            </div>
        </div>
        <div class="row">
            <div class="key key-tab key-special">
                <div class="key-title">Tab</div>
            </div>
            <div class="key key-q key-alpha">
                <div class="key-title">q</div>
            </div>
            <div class="key key-w key-alpha">
                <div class="key-title">w</div>
            </div>
            <div class="key key-e key-alpha">
                <div class="key-title">e</div>
            </div>
            <div class="key key-r key-alpha">
                <div class="key-title">r</div>
            </div>
            <div class="key key-t key-alpha">
                <div class="key-title">t</div>
            </div>
            <div class="key key-y key-alpha">
                <div class="key-title">y</div>
            </div>
            <div class="key key-u key-alpha">
                <div class="key-title">u</div>
            </div>
            <div class="key key-i key-alpha">
                <div class="key-title">i</div>
            </div>
            <div class="key key-o key-alpha">
                <div class="key-title">o</div>
            </div>
            <div class="key key-p key-alpha">
                <div class="key-title">p</div>
            </div>
            <div class="key key-bracketstart">
                <div class="key-top">{</div>
                <div class="key-bottom">[</div>
            </div>
            <div class="key key-bracketend">
                <div class="key-top">}</div>
                <div class="key-bottom">]</div>
            </div>
            <div class="key key-backslash">
                <div class="key-top">|</div>
                <div class="key-bottom">\</div>
            </div>
        </div>
        <div class="row">
            <div class="key key-CapsLock key-special">
                <div class="key-title">CapsLock</div>
            </div>
            <div class="key key-a key-alpha">
                <div class="key-title">a</div>
            </div>
            <div class="key key-s key-alpha">
                <div class="key-title">s</div>
            </div>
            <div class="key key-d key-alpha">
                <div class="key-title">d</div>
            </div>
            <div class="key key-f key-alpha">
                <div class="key-title">f</div>
            </div>
            <div class="key key-g key-alpha">
                <div class="key-title">g</div>
            </div>
            <div class="key key-h key-alpha">
                <div class="key-title">h</div>
            </div>
            <div class="key key-j key-alpha">
                <div class="key-title">j</div>
            </div>
            <div class="key key-k key-alpha">
                <div class="key-title">k</div>
            </div>
            <div class="key key-l key-alpha">
                <div class="key-title">l</div>
            </div>
            <div class="key key-colon ">
                <div class="key-top">:</div>
                <div class="key-bottom">;</div>
            </div>
            <div class="key key-quotes">
                <div class="key-top">"</div>
                <div class="key-bottom">'</div>
            </div>
            <div class="key key-Enter key-special">
                <div class="key-title">Enter</div>
            </div>
        </div>
        <div class="row">
            <div class="key key-Shift key-special">
                <div class="key-title">Shift</div>
            </div>
            <div class="key key-z key-alpha">
                <div class="key-title">z</div>
            </div>
            <div class="key key-x key-alpha">
                <div class="key-title">x</div>
            </div>
            <div class="key key-c key-alpha">
                <div class="key-title">c</div>
            </div>
            <div class="key key-v key-alpha">
                <div class="key-title">v</div>
            </div>
            <div class="key key-b key-alpha">
                <div class="key-title">b</div>
            </div>
            <div class="key key-n key-alpha">
                <div class="key-title">n</div>
            </div>
            <div class="key key-m key-alpha">
                <div class="key-title">m</div>
            </div>
            <div class="key key-comma">
                <div class="key-top"><</div>
                <div class="key-bottom">,</div>
            </div>
            <div class="key key-fullstop">
                <div class="key-top">></div>
                <div class="key-bottom">.</div>
            </div>
            <div class="key key-forwardslash">
                <div class="key-top">?</div>
                <div class="key-bottom">/</div>
            </div>
            <div class="key key-Shift key-special">
                <div class="key-title">Shift</div>
            </div>
        </div>
        <div class="row">
            <div class="key key-space key-special key-" ">
                <div class="key-title"></div>
            </div>
        </div>
    </div><!-- keyboard end -->

  </div>
<!-- typing container end -->

  <div class="stats_container">
    <div class="timerContainer">
        <div class="statsTitle">Time</div>
        <div class="timer">00 : 00</div>    
    </div>

    <div class="stats">
        <div class="statsError">
            <div class="statsTitle">Error</div>
            <div id="error">0</div>
        </div>
        <div class="statsSpeed">
            <div class="statsTitle">Speed</div>
            <div id="speed">0 WPM</div>
        </div>     
    </div>

  </div>

</div>

<script src="Js/lessons.js"></script>
<?php
  include("footer.html");
?>