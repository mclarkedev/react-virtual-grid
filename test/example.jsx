import React from 'react';
import cx from 'classnames';
import Grid from '../src/grid';

import ucd from './unicodeDatabase.json';

const CELL_SIZE = 100;

// function toColor(number) {
//   const num = number >>> 0;

//   const b = num & 0xFF;
//   const g = (num & 0xFF00) >>> 8;
//   const r = (num & 0xFF0000) >>> 16;

//   return [ r, g, b ];
// }

// Our Unicode Grid -------------------------------------------------------------------------------
export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columnCount: 16,
      rowCount: ucd.length,
      fixedLeftColumnCount: 0,
      fixedRightColumnCount: 0,
      fixedHeaderCount: 0,
      fixedFooterCount: 0
    };
  }

  render() {
    const {styles} = Example;

    const rowHeight = CELL_SIZE;
    const columnWidth = CELL_SIZE;

    return (
      <div ref="table-view" className={cx('table-view', styles.container)}>
        <Grid ref={this.bindGrid}
              columnCount={this.state.columnCount}
              rowCount={this.state.rowCount}
              estimatedColumnWidth={columnWidth}
              estimatedRowHeight={rowHeight}
              fixedLeftColumnCount={this.state.fixedLeftColumnCount}
              fixedRightColumnCount={this.state.fixedRightColumnCount}
              fixedHeaderCount={this.state.fixedHeaderCount}
              fixedFooterCount={this.state.fixedFooterCount}
              renderCell={this.renderCell}
              columnWidth={this.calculateColumnWidth}
              rowHeight={this.calculateRowHeight} />
      </div>
    );
  }

  calculateColumnWidth = (column) => {
    return CELL_SIZE;
  }

  calculateRowHeight = (row) => {
    return CELL_SIZE;
  }

  renderCell = (pane, row, rowData, column, columnData) => {
    const [ colIndex, colLeft, width ] = columnData;
    const [ rowIndex, rowTop, height ] = rowData;

    const {styles} = Example;

    const backgroundColor = 'blue';

    const isFixed = column === 0 || row === 0 || column === this.state.columnCount - 1 || row === this.state.rowCount - 1;

    const left = column < 1 ? 0 : colLeft;
    const top = 0;

    const attrs = { left, top, width, height, backgroundColor };
    const cellKey = rowIndex + '-' + colIndex;

    // Express our multiplier
    const rowMultiplier = this.state.columnCount * rowIndex;
    // Use the multiplier to calculate the left-to-right matrix sequence
    const leftToRightIdx = rowMultiplier + colIndex;
    // console.log(leftToRightIdx);

    const classes = cx(styles.cell,
                       column === 0 && styles.cellLeft,
                       column === 1 && styles.bodyLeft,
                       row === 0 && column > 1 && styles.cellTop,
                       row === 0 && column === 1 && styles.cellTopFirst,
                       row === this.state.rowCount - 1 && column > 1 && styles.cellBottom,
                       row === this.state.rowCount - 1 && column === 0 && styles.cellBottomFixed,
                       row === this.state.rowCount - 1 && column === 1 && styles.cellBottomFirst,
                       column === this.state.columnCount - 1 && styles.cellRight,
                       isFixed && styles.fixed);

    const ucHex = ucd[leftToRightIdx]._0;
    // TODO: Reload with headers: _1
    // const ucName = ucd[leftToRightIdx]._2;

    function rawHexToCharacter(x) {
      const prefix = '0x';
      const hex = `${prefix}${x}`;

      const ucStringOutput = String.fromCodePoint(hex);
      return ucStringOutput;
    }

    const uc = rawHexToCharacter(ucHex);

    return (
      <div key={cellKey}
           style={attrs}
           className={classes}>{uc}</div>
    );
  }
}

// const color = {
//   primary: 'white'
// };

const styles = cssInJS({
  container: {
    backgroundColor: 'black',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    border: '1px solid transparent',
    boxSizing: 'border-box',
    overflow: 'hidden'
  },

  cell: {
    position: 'absolute',
    overflow: 'hidden',
    borderBottom: '1px solid transparent',
    borderLeft: '1px solid white',
    borderRight: '1px solid transparent',
    borderTop: '1px solid white',
    padding: 3,
    textAlign: 'center',
    fontFamily: 'sans-serif',
    paddingTop: 35,
    fontSize: 40,
    boxSizing: 'border-box',
    color: 'white'
  },

  // fixed: {
  //   color: '#F8A104'
  // },

  bodyLeft: {
    borderLeft: '1px solid transparent'
  },

  cellTopFirst: {
    borderTop: '1px solid white'
  },

  cellTop: {
    borderTop: '1px solid white'
    // borderBottom: '1px solid #F8A104',
    // borderLeft: '1px solid #F8A104'
  },

  cellLeft: {
    borderRight: '1px solid white'
    // borderTop: '1px solid white',
    // borderLeft: '1px solid #F8A104'
  },

  cellRight: {
    // borderLeft: '1px solid #F8A104',
    // borderBottom: '1px solid #F8A104',
    borderRight: '1px solid white'
  }

  // cellBottomFixed: {
  //   borderTop: '1px solid #F8A104'
  // },

  // cellBottomFirst: {
  //   borderTop: '1px solid #F8A104',
  //   borderBottom: '1px solid transparent'
  // },

  // cellBottom: {
  //   borderTop: '1px solid #F8A104',
  //   borderLeft: '1px solid #F8A104',
  //   borderBottom: '1px solid transparent'
  // }
});

Example.styles = styles;
