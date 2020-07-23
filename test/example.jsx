import React, { setState } from 'react';
import cx from 'classnames';
import lunr from 'lunr';

import Grid from '../src/grid';
import unicodeJSON from './unicodeDatabase.json';
import lunrIndex from './index.json';

const ucd = unicodeJSON;

const UCD_COUNT = Object.keys(ucd).length;
const GRID_CELL_SIZE = 100;
const GRID_COL_COUNT = 16;
const GRID_CELL_MIN = 32;

const UCD_ROW_COUNT = UCD_COUNT / GRID_COL_COUNT;

console.info('Grid initialized: ', UCD_ROW_COUNT + ' x ' + GRID_COL_COUNT + ' with ' + UCD_COUNT + ' cells.');

// Index Lunr Search --------------------------------------------------------------------------------

// const idx = lunr(function() {
//   this.ref('_0');
//   this.field('_0');
//   this.field('_2');

//   ucd.forEach(function(x) {
//     this.add(x);
//   }, this);
//   console.info('UCD indexed for search');
//   console.info(ucd.slice(0, 20));
// });

// var serializedIdx = JSON.stringify(idx);
// console.log(serializedIdx);

const idx = lunr.Index.load(lunrIndex);

// Our Unicode Grid -------------------------------------------------------------------------------
export default class Example extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      columnCount: GRID_COL_COUNT,
      rowCount: UCD_ROW_COUNT,
      fixedLeftColumnCount: 0,
      fixedRightColumnCount: 0,
      fixedHeaderCount: 0,
      fixedFooterCount: 0,
      userInput: '',
      results: ucd,
      resultsCount: null
    };
  }

  componentDidUpdate() {
    console.log(this.state.userInput, this.state.results);
    console.log(this.state.results.length);
  }

  handleSubmit = event => {
    event.preventDefault();

    // If no query then reset data to all ucd
    if (this.state.userInput === '') {
      console.log("User Input is ''");
      this.setState({ results: ucd, rowCount: UCD_ROW_COUNT });
    } else {
      // If query then search Lunr and set results to UCD hits
      const searchResults = idx.search(this.state.userInput);

      // Use Lunr index to filter the UCD
      const ucdResults = searchResults.map(({ref}) => {
        const filteredHit = ucd.filter((e) => {
          return e._0 === ref;
        });

        // TODO: Extra array appear here, removing with [0]
        return filteredHit[0];
      });

      const rawRowCount = (ucdResults.length / GRID_COL_COUNT);
      const newRowCount = rawRowCount < 1 ? 1 : rawRowCount;

      this.setState({ results: ucdResults, rowCount: newRowCount });
    }
  }

  handleChange = event => {
    // Set the user input from DOM event
    this.setState({ userInput: event.target.value });
  };

  render() {
    const {styles} = Example;

    const rowHeight = GRID_CELL_SIZE;
    const columnWidth = GRID_CELL_SIZE;

    return (
      <div
        // ref="table-view"
        className={cx('table-view', styles.container)}>
        <form
          onSubmit={this.handleSubmit}
          style={{ position: 'absolute', zIndex: '9', backgroundColor: 'white' }} >
          <input
            type="search"
            name="q"
            value={this.state.userInput}
            onChange={this.handleChange} />
          <input
            type="submit"
            value="search" />
        </form>
        <Grid
            ref={this.bindGrid}
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
    return GRID_CELL_SIZE;
  }

  calculateRowHeight = (row) => {
    return GRID_CELL_SIZE;
  }

  renderCell = (pane, row, rowData, column, columnData) => {
    const [ colIndex, colLeft, width ] = columnData;
    const [ rowIndex, rowTop, height ] = rowData;

    const {styles} = Example;

    const backgroundColor = 'white';

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

    // const ucHex = ucd[leftToRightIdx]._0 || '0021'; // !

    // Results state flips between ucd and post-search results
    const ucObj = this.state.results[leftToRightIdx] || { _0: '0021' }; //
    const ucHex = ucObj._0; // !

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
    borderLeft: '1px solid lightgray',
    borderRight: '1px solid transparent',
    borderTop: '1px solid lightgray',
    padding: 3,
    textAlign: 'center',
    fontFamily: 'sans-serif',
    paddingTop: 35,
    fontSize: 40,
    boxSizing: 'border-box',
    color: 'black'
  },

  // fixed: {
  //   color: '#F8A104'
  // },

  bodyLeft: {
    borderLeft: '1px solid transparent'
  },

  cellTopFirst: {
    borderTop: '1px solid lightgray'
  },

  cellTop: {
    borderTop: '1px solid lightgray'
    // borderBottom: '1px solid #F8A104',
    // borderLeft: '1px solid #F8A104'
  },

  cellLeft: {
    borderRight: '1px solid lightgray'
    // borderTop: '1px solid white',
    // borderLeft: '1px solid #F8A104'
  },

  cellRight: {
    // borderLeft: '1px solid #F8A104',
    // borderBottom: '1px solid #F8A104',
    borderRight: '1px solid lightgray'
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
