/**
@license
Copyright (c) 2016 The StartPolymer Project Authors. All rights reserved.
This code may only be used under the MIT License found at https://github.com/StartPolymer/license
The complete set of authors may be found at https://github.com/StartPolymer/authors
The complete set of contributors may be found at https://github.com/StartPolymer/contributors
*/
import '@polymer/polymer/polymer-legacy.js';

import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="s-html">
<template strip-whitespace="">

<style>

:host {
  display: inline-block;
}

:host > style:first-of-type + * {
  @apply --shtml-firstchild;
}

h1 {
  @apply --shtml-h1;
}

h2 {
  @apply --shtml-h2;
}

h3 {
  @apply --shtml-h3;
}

h4 {
  @apply --shtml-h4;
}

h5 {
  @apply --shtml-h5;
}

h6 {
  @apply --shtml-h6;
}

</style>

<slot></slot>

</template>

</dom-module>`;

document.head.appendChild($_documentContainer.content);

Polymer({

  is: 's-html',

  properties: {
	/**
	 * Text with HTML elements.
	 */
	html: {
	  type: String,
	  observer: '_htmlChanged'
	},

	/**
	 * Set to true for unescape escaped HTML (e.g. "&lt;br&gt;"), we get ("<br>").
	 */
	unescape: {
	  type: Boolean,
	  value: false
	}
  },

  _htmlChanged: function(html) {
	var child = dom(this).queryDistributedElements('span')[0];

	if (this.unescape) {
	  html = this._unescapeHtml(html);
	}

	if (child) {
	  dom(child).innerHTML = html;
	} else {
	  dom(this.root).innerHTML = html;
	}
  },

  _unescapeHtml: function(html) {
	var textarea = document.createElement('textarea');
	textarea.innerHTML = html;
	return textarea.textContent;
  }

});
