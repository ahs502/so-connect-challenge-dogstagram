# 🐶 Dogstagram!

###  Front-end Challenge &mdash; SO Connect &mdash; Hessamoddin A Shokravi

----------------

<br/>

## Important notes

A live version of the application is served under [this address](https://???.zettel.ai).

You may use any arbitrary ***User ID*** to sign in.

The ***Password*** is hard-coded to **`"zoot"`**.

The UI is pretty responsive, so it works fine on different screen sizes.

<br/>

## Technical stack

- TypeScript
- React
- MUI
- Webpack (Create-React-App)

> It's strongly recommended to use [VS Code](https://code.visualstudio.com/) to develope this repository.

<br/>

## Setup locally

1. Clone the repository:

   ```sh
   $ git clone https://github.com/ahs502/so-connect-challenge-dogstagram
   $ cd so-connect-challenge-dogstagram
   ```

1. Install the dependencies:

   ```sh
   $ npm install
   ```

1. Start the development server:

   ```sh
   $ npm start
   ```
   > You need to open the app manually from [`http://localhost:3000`](http://localhost:3000).

<br/>

## Available commands

- Run tests:

   ```sh
   $ npm test            # Runs all the tests at once
   $ npm test.watch      # Watch for changes to run tests
   $ npm test.coverage   # Report test coverage
   ```
   > Tests are still under development!

- Lint all the staged changes before commit:

   ```sh
   $ npm run lint-staged
   ```

- Create a production build:

   ```sh
   $ npm run build
   ```
   > Build artifacts are placed inside the `dist` folder.

<br/>

## Development guide

Thanks to the `husky` package, every changes are checked before being committed.
This includes linting and testing.
Therefore, in order to have a convenient committing experience, you may do both checks manually right before committing to make sure everthing is alright:

```sh
$ npm run lint-stage   # Do not forget to stage changes first!
$ npm test
```

<br/>

## Contact me

* Hessamoddin A Shokravi
* ahs502@gmail.com

