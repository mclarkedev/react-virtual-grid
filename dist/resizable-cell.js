'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactProptypes = require('react-proptypes');

var _reactProptypes2 = _interopRequireDefault(_reactProptypes);

var _resizeHandle = require('./resize-handle');

var _resizeHandle2 = _interopRequireDefault(_resizeHandle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var ResizableCell = function (_React$Component) {
  _inherits(ResizableCell, _React$Component);

  function ResizableCell() {
    var _temp, _this, _ret;

    _classCallCheck(this, ResizableCell);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleColumnResizeDoubleClick = function () {
      if (_this.props.onColumnResizeDoubleClick) {
        _this.props.onColumnResizeDoubleClick(_this.props);
      }
    }, _this.handleColumnResizeStart = function (widthChange, heightChange) {
      if (_this.props.onColumnResizeStart) {
        _this.props.onColumnResizeStart(_this.props.columnIndex, _this.props.width + widthChange);
      }
    }, _this.handleColumnResize = function (widthChange, heightChange) {
      if (_this.props.onColumnResize) {
        _this.props.onColumnResize(_this.props.columnIndex, _this.props.width + widthChange);
      }
    }, _this.handleRowResizeDoubleClick = function () {
      if (_this.props.onRowResizeDoubleClick) {
        _this.props.onRowResizeDoubleClick(_this.props);
      }
    }, _this.handleColumnResizeEnd = function () {
      if (_this.props.onColumnResizeEnd) {
        _this.props.onColumnResizeEnd();
      }
    }, _this.handleRowResizeStart = function (widthChange, heightChange) {
      if (_this.props.onRowResizeStart) {
        _this.props.onRowResizeStart(_this.props.rowIndex, _this.props.height + heightChange);
      }
    }, _this.handleRowResize = function (widthChange, heightChange) {
      if (_this.props.onRowResize) {
        _this.props.onRowResize(_this.props.rowIndex, _this.props.height + heightChange);
      }
    }, _this.handleRowResizeEnd = function () {
      if (_this.props.onRowResizeEnd) {
        _this.props.onRowResizeEnd();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  ResizableCell.prototype.renderColumnResizeHandle = function renderColumnResizeHandle() {
    return _react2.default.createElement(_resizeHandle2.default, { onResizeStart: this.handleColumnResizeStart,
      onResize: this.handleColumnResize,
      onResizeEnd: this.handleColumnResizeEnd,
      onResizeDoubleClick: this.handleColumnResizeDoubleClick });
  };

  ResizableCell.prototype.renderRowResizeHandle = function renderRowResizeHandle() {
    return _react2.default.createElement(_resizeHandle2.default, { onResizeStart: this.handleRowResizeStart,
      onResize: this.handleRowResize,
      onResizeEnd: this.handleRowResizeEnd,
      onResizeDoubleClick: this.handleRowResizeDoubleClick,
      dimension: 'height' });
  };

  return ResizableCell;
}(_react2.default.Component);

ResizableCell.propTypes = {
  onColumnResizeStart: _reactProptypes2.default.func,
  onColumnResize: _reactProptypes2.default.func,
  onColumnResizeEnd: _reactProptypes2.default.func,
  onColumnResizeDoubleClick: _reactProptypes2.default.func,
  onRowResizeStart: _reactProptypes2.default.func,
  onRowResize: _reactProptypes2.default.func,
  onRowResizeEnd: _reactProptypes2.default.func,
  onRowResizeDoubleClick: _reactProptypes2.default.func,
  width: _reactProptypes2.default.number.isRequired,
  height: _reactProptypes2.default.number.isRequired,
  rowIndex: _reactProptypes2.default.number.isRequired,
  columnIndex: _reactProptypes2.default.number.isRequired
};
exports.default = ResizableCell;
//# sourceMappingURL=resizable-cell.js.map