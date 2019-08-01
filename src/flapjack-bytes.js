(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.GenotypeRenderer = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var Nucleotide = function Nucleotide(allele, colorLight, colorDark) {
    _classCallCheck(this, Nucleotide);

    this.allele = allele;
    this.colorLight = colorLight;
    this.colorDark = colorDark;
  };

  var Marker = function Marker(name, chromosome, position) {
    _classCallCheck(this, Marker);

    this.name = name;
    this.chromosome = chromosome;
    this.position = position;
  };

  var ColorState = function ColorState(buffer) {
    _classCallCheck(this, ColorState);

    this.buffer = buffer;
  };

  var ScrollBar =
  /*#__PURE__*/
  function () {
    function ScrollBar(parentWidth, parentHeight, width, height, vertical) {
      _classCallCheck(this, ScrollBar);

      this.parentWidth = parentWidth;
      this.parentHeight = parentHeight;
      this.width = width;
      this.height = height;
      this.vertical = vertical;
      this.x = vertical ? parentWidth - width : 0;
      this.y = vertical ? 0 : parentHeight - height;
      this.widget = new ScrollBarWidget(this.x, this.y, this.vertical ? this.width : 20, this.vertical ? 20 : this.height);
    }

    _createClass(ScrollBar, [{
      key: "render",
      value: function render(ctx) {
        ctx.fillStyle = '#eee';
        ctx.strokeStyle = '#eee';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        this.widget.render(ctx);
      }
    }, {
      key: "move",
      value: function move(x, y) {
        this.widget.move(x, y);
      }
    }]);

    return ScrollBar;
  }();

  var ScrollBarWidget =
  /*#__PURE__*/
  function () {
    function ScrollBarWidget(x, y, width, height) {
      _classCallCheck(this, ScrollBarWidget);

      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.corner_radius = 5;
    }

    _createClass(ScrollBarWidget, [{
      key: "render",
      value: function render(ctx) {
        // Set faux rounded corners
        ctx.lineJoin = 'round';
        ctx.lineWidth = this.corner_radius;
        ctx.fillStyle = '#aaa';
        ctx.strokeStyle = '#aaa'; // Change origin and dimensions to match true size (a stroke makes the shape a bit larger)

        ctx.strokeRect(this.x + this.corner_radius / 2, this.y + this.corner_radius / 2, this.width - this.corner_radius, this.height - this.corner_radius);
        ctx.fillRect(this.x + this.corner_radius / 2, this.y + this.corner_radius / 2, this.width - this.corner_radius, this.height - this.corner_radius);
      }
    }, {
      key: "move",
      value: function move(x, y) {
        this.x = x;
        this.y = y;
      }
    }]);

    return ScrollBarWidget;
  }();

  var GenotypeCanvas =
  /*#__PURE__*/
  function () {
    function GenotypeCanvas(width, height, boxSize, fontSize) {
      _classCallCheck(this, GenotypeCanvas);

      this.canvas = document.createElement('canvas');
      this.canvas.width = width;
      this.canvas.height = height;
      this.drawingContext = this.canvas.getContext('2d');
      this.backBuffer = document.createElement('canvas');
      this.backBuffer.width = width;
      this.backBuffer.height = height;
      this.backContext = this.backBuffer.getContext('2d');
      this.qtlCanvasHeight = 30;
      this.mapCanvasHeight = 30;
      this.lineNamesWidth = 100;
      this.alleleCanvasWidth = width - this.lineNamesWidth;
      this.alleleCanvasHeight = height - this.mapCanvasHeight - this.qtlCanvasHeight;
      this.backContext.lineWidth = 1;
      this.boxSize = boxSize;
      this.fontSize = fontSize;
      this.verticalScrollbar = new ScrollBar(width, this.alleleCanvasHeight - 10, 10, this.alleleCanvasHeight - 10, true);
      this.horizontalScrollbar = new ScrollBar(width - this.lineNamesWidth - 10 - 1, height, width - this.lineNamesWidth - 10 - 1, 10, false);
      this.translatedX = 0;
      this.translatedY = 0;
      this.maxCanvasWidth = 0;
      this.maxCanvasHeight = 0;
      this.totalMarkers = 0;
      this.totalLines = 0;
      this.markerData = [];
      this.lineNames = [];
      this.lineData = [];
      this.qtls = [];
      this.redraw = true;
      this.colorStamps = [];
      this.markerUnderMouse = undefined;
      this.lineUnderMouse = undefined;
    }

    _createClass(GenotypeCanvas, [{
      key: "init",
      value: function init(markerData, lineNames, lineData, qtls, colorStamps) {
        this.totalMarkers = markerData.length === 0 ? lineData[0].length : markerData.length;
        this.totalLines = lineNames.length;
        this.maxCanvasWidth = this.totalMarkers * this.boxSize;
        this.maxCanvasHeight = this.totalLines * this.boxSize;
        this.markerData = markerData;
        this.lineNames = lineNames;
        this.lineData = lineData;
        this.qtls = qtls;
        this.colorStamps = colorStamps;
      }
    }, {
      key: "prerender",
      value: function prerender() {
        this.drawingContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.redraw) {
          var lineStart = Math.floor(this.translatedY / this.boxSize);
          var lineEnd = Math.min(lineStart + Math.floor(this.canvas.height / this.boxSize), this.totalLines);
          var alleleStart = Math.floor(this.translatedX / this.boxSize);
          var alleleEnd = Math.min(alleleStart + Math.floor(this.alleleCanvasWidth / this.boxSize), this.totalMarkers);
          var markers = this.markerData.slice(alleleStart, alleleEnd);
          this.mapCanvasHeight = typeof markers[0] === 'undefined' ? 0 : this.mapCanvasHeight;
          this.qtlCanvasHeight = typeof this.qtls[0] === 'undefined' ? 0 : this.qtlCanvasHeight;
          this.alleleCanvasHeight = this.canvas.height - this.mapCanvasHeight - this.qtlCanvasHeight;
          this.verticalScrollbar = new ScrollBar(this.canvas.width, this.alleleCanvasHeight - 10, 10, this.alleleCanvasHeight - 10, true);
          var names = this.lineNames.slice(lineStart, lineEnd);
          var alleleData = [];

          for (var i = lineStart; i < lineEnd; i += 1) {
            alleleData.push(this.lineData[i].slice(alleleStart, alleleEnd));
          }

          this.render(markers, names, alleleData, this.qtls);
        }

        this.drawingContext.drawImage(this.backBuffer, 0, 0);

        if (this.lineUnderMouse && this.markerUnderMouse) {
          this.drawingContext.translate(this.lineNamesWidth, this.mapCanvasHeight);
          this.drawingContext.globalAlpha = 0.4;
          this.drawingContext.fillStyle = '#fff';
          this.drawingContext.fillRect(this.markerUnderMouse * this.boxSize, 0, this.boxSize, this.alleleCanvasHeight);
          this.drawingContext.fillRect(0, this.lineUnderMouse * this.boxSize, this.alleleCanvasWidth, this.boxSize);
          this.drawingContext.translate(-this.lineNamesWidth, -this.mapCanvasHeight);
          this.drawingContext.globalAlpha = 1;
        }

        this.redraw = false;
      }
    }, {
      key: "render",
      value: function render(markerData, lineNames, lineData, qtls) {
        this.backContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.renderQtls(qtls, markerData);
        this.renderMap(markerData);
        this.renderGermplasmNames(lineNames);
        this.renderGermplasm(lineData);
        this.renderScrollbars();
      }
    }, {
      key: "renderQtls",
      value: function renderQtls(qtlData, markerData) {
        if (typeof markerData[0] !== 'undefined' && typeof qtlData[0] !== 'undefined') {
          this.backContext.translate(this.lineNamesWidth, 0);
          var firstMarkerPos = markerData[0].position;
          var lastMarkerPos = markerData[markerData.length - 1].position;
          var dist = lastMarkerPos - firstMarkerPos;

          for (var i = 0; i < qtlData.length; i += 1) {
            var qtl = qtlData[i];

            if (qtl.max > firstMarkerPos && qtl.min < lastMarkerPos) {
              var start = Math.max(firstMarkerPos, qtl.min);
              var end = Math.min(lastMarkerPos, qtl.max);
              start = (start - firstMarkerPos) * (this.alleleCanvasWidth / dist);
              end = (end - firstMarkerPos) * (this.alleleCanvasWidth / dist);
              this.backContext.lineWidth = 1;
              this.backContext.strokeStyle = 'gray';
              this.backContext.fillStyle = this.rainbowColor(this.qtls.length, i);
              this.backContext.strokeRect(start, 5, end - start + 1, 10);
              this.backContext.fillRect(start, 5, end - start + 1, 10);
            }
          }

          this.backContext.translate(-this.lineNamesWidth, 0);
        }
      }
    }, {
      key: "renderMap",
      value: function renderMap(alleles) {
        if (typeof alleles[0] !== 'undefined') {
          var firstMarkerPos = alleles[0].position;
          var lastMarkerPos = alleles[alleles.length - 1].position;
          var dist = lastMarkerPos - firstMarkerPos;
          this.backContext.lineWidth = 1;
          this.backContext.strokeStyle = 'gray';
          this.backContext.translate(this.lineNamesWidth, this.qtlCanvasHeight);

          for (var i = 0; i < alleles.length; i += 1) {
            var pos = i * this.boxSize;
            pos += this.boxSize / 2;
            var marker = alleles[i];
            var markerPos = (marker.position - firstMarkerPos) * (this.alleleCanvasWidth / dist);
            this.backContext.beginPath();
            this.backContext.moveTo(markerPos, 0);
            this.backContext.lineTo(pos, 20);
            this.backContext.lineTo(pos, this.mapCanvasHeight);
            this.backContext.stroke();
          }

          this.backContext.translate(-this.lineNamesWidth, -this.qtlCanvasHeight);
        }
      }
    }, {
      key: "renderGermplasmNames",
      value: function renderGermplasmNames(lineNames) {
        this.backContext.fillStyle = '#333';
        this.backContext.translate(0, this.mapCanvasHeight + this.qtlCanvasHeight);

        for (var i = 0; i < lineNames.length; i += 1) {
          this.backContext.fillText(lineNames[i], 0, i * this.boxSize + (this.boxSize - this.fontSize / 2));
        }

        this.backContext.translate(0, -(this.mapCanvasHeight + this.qtlCanvasHeight));
      }
    }, {
      key: "renderGermplasm",
      value: function renderGermplasm(lineData) {
        this.backContext.translate(this.lineNamesWidth, this.mapCanvasHeight + this.qtlCanvasHeight);

        for (var i = 0; i < lineData.length; i += 1) {
          for (var j = 0; j < lineData[i].length; j += 1) {
            this.backContext.drawImage(this.colorStamps[lineData[i][j]].buffer, j * this.boxSize, i * this.boxSize);
          }
        }

        this.backContext.translate(-this.lineNamesWidth, -(this.mapCanvasHeight + this.qtlCanvasHeight));
      }
    }, {
      key: "renderScrollbars",
      value: function renderScrollbars() {
        this.backContext.translate(0, this.mapCanvasHeight + this.qtlCanvasHeight);
        this.verticalScrollbar.render(this.backContext);
        this.backContext.translate(0, -(this.mapCanvasHeight + this.qtlCanvasHeight));
        this.backContext.translate(this.lineNamesWidth, 0);
        this.horizontalScrollbar.render(this.backContext);
        this.backContext.translate(-this.lineNamesWidth, 0);
        this.backContext.translate(this.lineNamesWidth, this.mapCanvasHeight + this.qtlCanvasHeight);
        this.backContext.fillStyle = '#aaa';
        this.backContext.strokeRect(this.alleleCanvasWidth - 10, this.alleleCanvasHeight - 10, 10, 10);
        this.backContext.fillRect(this.alleleCanvasWidth - 10, this.alleleCanvasHeight - 10, 10, 10);
        this.backContext.translate(-this.lineNamesWidth, -(this.mapCanvasHeight + this.qtlCanvasHeight));
      }
    }, {
      key: "move",
      value: function move(diffX, diffY) {
        var mapToRange = function mapToRange(num, inMin, inMax, outMin, outMax) {
          return (num - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
        };

        if (this.maxCanvasWidth > this.canvas.width) {
          this.translatedX -= diffX;

          if (this.translatedX < 0) {
            this.translatedX = 0;
          }

          if (this.translatedX / this.boxSize >= this.maxCanvasWidth / this.boxSize - this.alleleCanvasWidth / this.boxSize) {
            this.translatedX = this.maxCanvasWidth - this.alleleCanvasWidth;
          }

          var scrollWidth = this.alleleCanvasWidth - 10 - 20;
          var scrollX = Math.floor(mapToRange(this.translatedX, 0, this.maxCanvasWidth - this.alleleCanvasWidth, 0, scrollWidth));
          this.horizontalScrollbar.move(scrollX, this.horizontalScrollbar.y);
        }

        if (this.maxCanvasHeight > this.canvas.height) {
          this.translatedY -= diffY;

          if (this.translatedY < 0) {
            this.translatedY = 0;
          }

          if (this.translatedY / this.boxSize >= this.maxCanvasHeight / this.boxSize - this.alleleCanvasHeight / this.boxSize) {
            this.translatedY = this.maxCanvasHeight - this.alleleCanvasHeight;
          }

          var scrollHeight = this.alleleCanvasHeight - 10 - 20;
          var scrollY = Math.floor(mapToRange(this.translatedY, 0, this.maxCanvasHeight - this.alleleCanvasHeight, 0, scrollHeight));
          this.verticalScrollbar.move(this.verticalScrollbar.x, scrollY);
        }

        this.redraw = true;
        this.prerender();
      }
    }, {
      key: "mouseOver",
      value: function mouseOver(x, y) {
        if (x >= this.lineNamesWidth && x < this.backBuffer.width && y >= this.mapCanvasHeight && y < this.backBuffer.height) {
          this.markerUnderMouse = Math.floor((x - this.lineNamesWidth) / this.boxSize);
          this.lineUnderMouse = Math.floor((y - this.mapCanvasHeight) / this.boxSize);
        } else {
          this.lineUnderMouse = undefined;
          this.markerUnderMouse = undefined;
        }

        this.prerender();
      }
    }, {
      key: "zoom",
      value: function zoom(size, colorStamps) {
        this.boxSize = size;
        this.colorStamps = colorStamps;
        this.maxCanvasWidth = Math.max(this.totalMarkers * this.boxSize, this.canvas.width);
        this.maxCanvasHeight = Math.max(this.totalLines * this.boxSize, this.canvas.height);
        this.redraw = true;
        this.prerender();
      }
    }, {
      key: "rainbowColor",
      value: function rainbowColor(numOfSteps, step) {
        // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
        // Adam Cole, 2011-Sept-14
        // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
        var r, g, b;
        var h = step / numOfSteps;
        var i = ~~(h * 6);
        var f = h * 6 - i;
        var q = 1 - f;

        switch (i % 6) {
          case 0:
            r = 1;
            g = f;
            b = 0;
            break;

          case 1:
            r = q;
            g = 1;
            b = 0;
            break;

          case 2:
            r = 0;
            g = 1;
            b = f;
            break;

          case 3:
            r = 0;
            g = q;
            b = 1;
            break;

          case 4:
            r = f;
            g = 0;
            b = 1;
            break;

          case 5:
            r = 1;
            g = 0;
            b = q;
            break;
        }

        var c = "#" + ("00" + (~~(r * 255)).toString(16)).slice(-2) + ("00" + (~~(g * 255)).toString(16)).slice(-2) + ("00" + (~~(b * 255)).toString(16)).slice(-2);
        return c;
      }
    }]);

    return GenotypeCanvas;
  }();

  var CanvasController = function CanvasController(genotypeCanvas) {
    var _this = this;

    _classCallCheck(this, CanvasController);

    this.genotypeCanvas = genotypeCanvas;
    this.dragStartX = null;
    this.dragStartY = null;
    this.dragging = false;
    this.genotypeCanvas.canvas.addEventListener('mousedown', function (e) {
      _this.dragStartX = e.pageX;
      _this.dragStartY = e.pageY;
      _this.dragging = true;
    });
    this.genotypeCanvas.canvas.addEventListener('mousemove', function (e) {
      var rect = _this.genotypeCanvas.canvas.getBoundingClientRect();

      var x = (e.clientX - rect.left) / (rect.right - rect.left) * _this.genotypeCanvas.backBuffer.width;
      var y = (e.clientY - rect.top) / (rect.bottom - rect.top) * _this.genotypeCanvas.backBuffer.height;

      _this.genotypeCanvas.mouseOver(x, y);
    });
    this.genotypeCanvas.canvas.addEventListener('mouseleave', function () {
      _this.genotypeCanvas.mouseOver(undefined, undefined);
    });
    window.addEventListener('mouseup', function () {
      _this.dragging = false;
    });
    window.addEventListener('mousemove', function (e) {
      if (_this.dragging) {
        var diffX = e.pageX - _this.dragStartX;
        var diffY = e.pageY - _this.dragStartY;
        _this.dragStartX = e.pageX;
        _this.dragStartY = e.pageY;

        _this.genotypeCanvas.move(diffX, diffY);
      }
    });
  };

  var Qtl = function Qtl(name, chromosome, position, min, max) {
    _classCallCheck(this, Qtl);

    this.name = name;
    this.chromosome = chromosome;
    this.position = position;
    this.min = min;
    this.max = max;
  };

  function GenotypeRenderer() {
    var genotypeRenderer = {};

    var genotypeCanvas;
    var canvasController;
    var boxSize = 16;
    var fontSize = 100;
    var stateTable = new Map();
    var lineNames = [];
    var markerNames = [];
    var lineData = [];
    var markerData = [];
    var chromosomes = new Set();
    var qtls = [];
    var qtlMap = new Map();
    var colorStamps = [];
    var colors = {
      greenLight: 'rgb(171,255,171)',
      greenDark: 'rgb(86,179,86)',
      redLight: 'rgb(255,171,171)',
      redDark: 'rgb(179,86,86)',
      blueLight: 'rgb(171,171,255)',
      blueDark: 'rgb(86,86,179)',
      orangeLight: 'rgb(255,228,171)',
      orangeDark: 'rgb(179,114,86)',
      white: 'rgb(255,255,255)'
    };
    var nucleotides = new Map();
    nucleotides.set('A', new Nucleotide('A', colors.greenLight, colors.greenDark));
    nucleotides.set('G', new Nucleotide('G', colors.redLight, colors.redDark));
    nucleotides.set('T', new Nucleotide('T', colors.blueLight, colors.blueDark));
    nucleotides.set('C', new Nucleotide('C', colors.orangeLight, colors.orangeDark));
    nucleotides.set('', new Nucleotide('', colors.white, colors.white));

    genotypeRenderer.renderGenotypesBrapi = function (domParent, width, height, server, matrixId, mapId) {
      console.log(mapId);
      var brapiJs = BrAPI(server, '1.3', null, null);
      var params = {
        'mapsDbId': mapId
      }; // let positions = [];

      brapiJs.maps_positions(params).each(function (marker) {
        markerNames.push(marker.markerName);
        var m = new Marker(marker.markerName, marker.linkageGroupName, parseInt(marker.location));
        markerData.push(m);
        chromosomes.add(marker.linkageGroupName);
      });
      var matrixParams = {
        'matrixDbId': [matrixId],
        'format': 'flapjack'
      };
      brapiJs.allelematrices_search(matrixParams).each(function (matrixObject) {
        console.log('wotsit');
        genotypeRenderer.renderGenotypesUrl(domParent, width, height, undefined, matrixObject.__response.metadata.datafiles[0]);
      });
      return genotypeRenderer;
    };

    genotypeRenderer.renderGenotypesUrl = function (domParent, width, height, mapFileURL, genotypeFileURL) {
      createRendererComponents(domParent, width, height);

      if (typeof mapFileURL !== 'undefined') {
        fetch(mapFileURL).then(function (response) {
          if (response.status !== 200) {
            console.log("Couldn't load file: " + filepath + ". Status code: " + response.status);
            return;
          }

          response.text().then(function (data) {
            var lines = data.split(/\r?\n/);

            for (var line = 0; line < lines.length; line += 1) {
              processMapFileLine(lines[line]);
            }
          });
        }).catch(function (err) {
          console.log('Fetch Error :-S', err);
        });
      }

      fetch(genotypeFileURL).then(function (response) {
        if (response.status !== 200) {
          console.log("Couldn't load file: " + filepath + ". Status code: " + response.status);
          return;
        }

        response.text().then(function (data) {
          var lines = data.split(/\r?\n/);

          for (var line = 0; line < lines.length; line += 1) {
            processFileLine(lines[line]);
          }

          setupColorStamps(boxSize);
          genotypeCanvas.init(markerData, lineNames, lineData, qtls, colorStamps);
          genotypeCanvas.prerender();
        });
      }).catch(function (err) {
        console.log('Fetch Error :-S', err);
      });
      return genotypeRenderer;
    };

    genotypeRenderer.renderGenotypesFile = function (domParent, width, height, mapFileDom, genotypeFileDom, qtlFileDom) {
      createRendererComponents(domParent, width, height);
      loadMapData(mapFileDom);
      loadQTLData(qtlFileDom);
      loadGenotypeData(genotypeFileDom);
      return genotypeRenderer;
    };

    function createRendererComponents(domParent, width, height) {
      var canvasHolder = document.getElementById(domParent.slice(1));
      genotypeCanvas = new GenotypeCanvas(width, height, boxSize, fontSize);
      canvasHolder.append(genotypeCanvas.canvas);
      var zoomDiv = document.createElement('div');
      zoomDiv.id = 'zoom-holder';
      var zoomLabel = document.createElement('label');
      zoomLabel.setAttribute('for', 'zoom-control');
      zoomLabel.innerHTML = 'Zoom:';
      var range = document.createElement('input');
      range.setAttribute('type', 'range');
      range.min = 2;
      range.max = 64;
      range.value = 16;
      range.addEventListener('change', function () {
        zoom(range.value);
      });
      range.addEventListener('input', function () {
        zoom(range.value);
      });
      zoomDiv.appendChild(zoomLabel);
      zoomDiv.appendChild(range);
      canvasHolder.appendChild(zoomDiv);
      canvasController = new CanvasController(genotypeCanvas);
    }

    function loadQTLData(qtlFileDom) {
      var file = document.getElementById(qtlFileDom.slice(1)).files[0];

      if (typeof file !== 'undefined') {
        var reader = new FileReader();

        reader.onloadend = function (data) {
          var qtlData = data.target.result.split(/\r?\n/);

          for (var qtl = 0; qtl < qtlData.length; qtl += 1) {
            processQtlFileLine(qtlData[qtl]);
          }

          qtls = Array.from(qtlMap.values());
          qtls.sort(compareQtl);
          qtls.forEach(function (qtl) {
            return console.log(qtl);
          });
        };

        reader.readAsText(file);
      }
    }

    function compareQtl(qtlA, qtlB) {
      if (qtlA.min < qtlB.min) {
        return -1;
      }

      if (qtlA.min > qtlB.min) {
        return 1;
      }

      return 0;
    }

    function processQtlFileLine(line) {
      if (line.startsWith('#') || !line || line.length === 0 || line.startsWith('\t')) {
        return;
      }

      var tokens = line.split('\t');

      if (chromosomes.has(tokens[1]) === false) {
        return;
      }

      var name = tokens[0];
      name = name.slice(0, name.lastIndexOf('.'));
      var qtl;

      if (qtlMap.has(name)) {
        qtl = qtlMap.get(name);
      } else {
        qtl = new Qtl(name, tokens[1], parseInt(tokens[2].replace(/,/g, '')), parseInt(tokens[3].replace(/,/g, '')), parseInt(tokens[4].replace(/,/g, '')));
      }

      if (qtl.min > tokens[3]) {
        qtl.min = parseInt(tokens[3].replace(/,/g, ''));
      }

      if (qtl.max < tokens[4]) {
        qtl.max = parseInt(tokens[4].replace(/,/g, ''));
      }

      qtlMap.set(name, qtl);
    }

    function loadMapData(mapFileDom) {
      var file = document.getElementById(mapFileDom.slice(1)).files[0];

      if (typeof file !== 'undefined') {
        var reader = new FileReader();

        reader.onloadend = function (data) {
          var markers = data.target.result.split(/\r?\n/);

          for (var marker = 0; marker < markers.length; marker += 1) {
            processMapFileLine(markers[marker]);
          }
        };

        reader.readAsText(file);
      }
    }

    function processMapFileLine(line) {
      if (line.startsWith('#') || !line || line.length === 0 || line.startsWith('\t')) {
        return;
      }

      var tokens = line.split('\t');

      if (tokens.length === 2) {
        return;
      }

      var markerName = tokens[0];
      markerNames.push(markerName);
      var marker = new Marker(markerName, tokens[1], parseInt(tokens[2].replace(/,/g, '')));
      markerData.push(marker);
      chromosomes.add(tokens[1]);
    }

    function loadGenotypeData(genotypeFileDom) {
      var file = document.getElementById(genotypeFileDom.slice(1)).files[0];
      var reader = new FileReader();

      reader.onloadend = function (data) {
        var lines = data.target.result.split(/\r?\n/);

        for (var line = 0; line < lines.length; line += 1) {
          processFileLine(lines[line]);
        }

        setupColorStamps(boxSize);
        genotypeCanvas.init(markerData, lineNames, lineData, qtls, colorStamps);
        genotypeCanvas.prerender();
      };

      reader.readAsText(file);
    }

    function processFileLine(line) {
      if (line.startsWith('#') || !line || line.length === 0 || line.startsWith('Accession') || line.startsWith('\t')) {
        return;
      }

      var tokens = line.split('\t');
      var lineName = tokens[0];
      lineNames.push(lineName);
      lineData.push(tokens.slice(1).map(getState));
    }

    function getState(allele) {
      if (allele === '-' || !allele || allele.length === 0) {
        allele = '';
      }

      if (!stateTable.has(allele)) {
        stateTable.set(allele, stateTable.size);
      }

      return stateTable.get(allele);
    }

    function calculateFontSize(text, fontface, size) {
      var fontCanvas = document.createElement('canvas');
      fontCanvas.width = size;
      fontCanvas.height = size;
      var fontContext = fontCanvas.getContext('2d');
      fontSize = 100;
      fontContext.font = "".concat(fontSize, "px ").concat(fontface);

      while (fontContext.measureText(text).width > fontCanvas.width) {
        fontSize -= 1;
        fontContext.font = "".concat(fontSize, "px ").concat(fontface);
      }

      var _genotypeCanvas = genotypeCanvas,
          backContext = _genotypeCanvas.backContext;
      backContext.font = fontContext.font;
      genotypeCanvas.fontSize = fontSize;
      return fontContext.font;
    } // Generates a set of homozygous and heterozygous color stamps from the stateTable


    function setupColorStamps(size) {
      colorStamps = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = stateTable.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          if (key.length <= 1) {
            // If we fail to find a key for whatever reason, get the blank stamp
            var nucleotide = nucleotides.get(key);

            if (nucleotide === undefined) {
              nucleotide = nucleotides.get('');
            }

            var buffer = drawGradientSquare(size, nucleotide);
            var stamp = new ColorState(buffer);
            colorStamps.push(stamp);
          } else {
            var alleles = key.split('/');
            var nucleotide1 = nucleotides.get(alleles[0]);
            var nucleotide2 = nucleotides.get(alleles[1]);

            var _buffer = drawHetSquare(size, nucleotide1, nucleotide2);

            var _stamp = new ColorState(_buffer);

            colorStamps.push(_stamp);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    function drawGradientSquare(size, nucleotide) {
      var gradCanvas = document.createElement('canvas');
      gradCanvas.width = size;
      gradCanvas.height = size;
      var gradientCtx = gradCanvas.getContext('2d');
      var lingrad = gradientCtx.createLinearGradient(0, 0, size, size);
      lingrad.addColorStop(0, nucleotide.colorLight);
      lingrad.addColorStop(1, nucleotide.colorDark);
      gradientCtx.fillStyle = lingrad;
      gradientCtx.fillRect(0, 0, size, size);

      if (size >= 10) {
        gradientCtx.fillStyle = 'rgb(0,0,0)';
        gradientCtx.font = calculateFontSize('C/G', 'sans-serif', size);
        var textWidth = gradientCtx.measureText(nucleotide.allele).width;
        gradientCtx.fillText(nucleotide.allele, (size - textWidth) / 2, size - fontSize / 2);
      }

      return gradCanvas;
    }

    function drawHetSquare(size, nucleotide1, nucleotide2) {
      var gradCanvas = document.createElement('canvas');
      gradCanvas.width = size;
      gradCanvas.height = size;
      var gradientCtx = gradCanvas.getContext('2d');
      var lingrad = gradientCtx.createLinearGradient(0, 0, size, size);
      lingrad.addColorStop(0, nucleotide1.colorLight);
      lingrad.addColorStop(1, nucleotide1.colorDark);
      gradientCtx.fillStyle = lingrad;
      gradientCtx.beginPath();
      gradientCtx.lineTo(size, 0);
      gradientCtx.lineTo(0, size);
      gradientCtx.lineTo(0, 0);
      gradientCtx.fill();
      var lingrad2 = gradientCtx.createLinearGradient(0, 0, size, size);
      lingrad2.addColorStop(0, nucleotide2.colorLight);
      lingrad2.addColorStop(1, nucleotide2.colorDark);
      gradientCtx.fillStyle = lingrad2;
      gradientCtx.beginPath();
      gradientCtx.moveTo(size, 0);
      gradientCtx.lineTo(size, size);
      gradientCtx.lineTo(0, size);
      gradientCtx.lineTo(size, 0);
      gradientCtx.fill();

      if (size >= 10) {
        gradientCtx.fillStyle = 'rgb(0,0,0)';
        gradientCtx.font = calculateFontSize('C/G', 'sans-serif', size);
        var allele1Width = gradientCtx.measureText(nucleotide1.allele).width;
        gradientCtx.fillText(nucleotide1.allele, (size / 2 - allele1Width) / 2, fontSize);
        var allele2Width = gradientCtx.measureText(nucleotide2.allele).width;
        gradientCtx.fillText(nucleotide2.allele, size - (size / 2 + allele2Width) / 2, size - fontSize / 4);
      }

      return gradCanvas;
    }

    function zoom(size) {
      setupColorStamps(size);
      genotypeCanvas.zoom(size, colorStamps);
    }

    return genotypeRenderer;
  }

  return GenotypeRenderer;

})));
