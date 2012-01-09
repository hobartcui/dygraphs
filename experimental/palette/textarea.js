// Copyright (c) 2012 Google, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

/** 
 * @fileoverview Dygraphs options palette text area.
 *
 * @author konigsberg@google.com (Robert Konigsberg)
 */
"use strict";

function TextArea(parent) {
  var body = document.getElementsByTagName("body")[0];
  if (!parent) {
    parent = body;
  }
  this.elem = Palette.createChild("div", parent, "textarea");
  this.title = Palette.createChild("div", this.elem, "title");
  this.textarea = Palette.createChild("textarea", this.elem, "editor");
  this.buttons = Palette.createChild("div", this.elem, "buttons");
  this.ok = Palette.createChild("button", this.buttons);
  this.ok.textContent = "OK";
  this.cancel = Palette.createChild("button", this.buttons);
  this.cancel.textContent = "Cancel";

  var textarea = this;
  this.ok.onclick = function() {
    textarea.hide();
    textarea.okCallback(textarea.textarea.value);
  };
  this.cancel.onclick = function() {
    textarea.hide();
    textarea.cancelCallback();
  };
  this.reposition = function() {
    var left = (document.documentElement.clientWidth - textarea.elem.offsetWidth) / 2;
    var top = (document.documentElement.clientHeight - textarea.elem.offsetHeight) / 2;
    console.log("reposition", left, top);
    textarea.elem.style.left = Math.max(left, 0) + "px";
    textarea.elem.style.top = Math.max(top, 0) + "px";
  }

  this.background = Palette.createChild("div", body, "background");
  this.background.id = "modalBackground";
  this.hide();
}

TextArea.prototype.cancelCallback = function() {
};

TextArea.prototype.okCallback = function(content) {
};

TextArea.prototype.show = function(title, content) {
  this.title.textContent = title;
  this.textarea.value = content;

  var height = 315;
  var width = 445;


  var sums = function(adds, subtracts, field) {
    var total = 0;
    for (var idx in adds) {
      total += parseInt(adds[idx][field]);
    }
    for (var idx2 in subtracts) {
      total -= parseInt(subtracts[idx2][field]);
    }
    return total;
  }
  this.elem.style.display = "block";
  this.background.style.display = "block";

  this.elem.style.height = height + "px";
  this.elem.style.width = width + "px";

  this.textarea.style.height = (-18 + sums([this.elem], [this.title, this.buttons], "offsetHeight")) + "px";
  this.textarea.style.width = (-16 + sums([this.elem], [ ], "offsetWidth")) + "px";

  this.reposition();
  window.addEventListener('resize', this.reposition, false);
  document.documentElement.addEventListener('onscroll', this.reposition);
}

TextArea.prototype.hide = function() {
  this.elem.style.display = "none";
  this.background.style.display = "none";
  window.removeEventListener("resize", this.reposition);
  document.documentElement.removeEventListener("onscroll", this.reposition);
}
