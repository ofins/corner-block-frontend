# Block-by-Block

## Project Overview

Block-by-Block is a web application that allows users to manage and track their cryptocurrency investments. The application connects to the CoinGecko API to fetch real-time price data and provides a responsive interface for users to view and edit their investment blocks.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/ofins/block-dev.git
   ```
2. Navigate to the project directory:
   ```sh
   cd block-dev
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

## Usage

To start the development server, run:

```sh
npm start
```

Open your browser and navigate to `http://localhost:3000` to view the application.

## Versions Log

### 2023.11.28

- feat: home page
- feat: my blocks
- connect coingecko api
- responsive web 375px & 1024px
- added mainBlock css and sideBlock border colors

### 2023.12.4

- feat: TickerTableModal
  - Allow multi-editing of existing block through modal
- increase block number from 5 to 11
- prices updates correctly
- block border glow style added
- when blockDetail is toggled, corresponding block will glow to indicate which block is selected
- fix minor bugs

### 2023.12.6

- redesign theme color and style
- fix search queries with hyphens
- added percentage change stats to block detail when clicked
- block detail style changed to fit dark mode
- fix minor bugs
