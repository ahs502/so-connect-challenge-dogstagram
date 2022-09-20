# 🐶 Dogstagram!

###  Front-end Challenge &mdash; SO Connect &mdash; Hessamoddin A Shokravi

----------------

<br/>

## Important tips

A live version of the application is served under [this address](https://dogstagram.zettel.ai).

You may sign in with any arbitrary ***User ID***.
This will act like the user name who has signed in the app.

The ***Password*** is the same as **User ID** with **`"zoot"`** as postfix.

> For example you may sign in with a credential like:
<br/>
**User ID**: **`joe-dalton`**
<br/>
**Passeord**: **`joe-daltonzoot`**

The UI is pretty _responsive and mobile-friendly_, so it works fine on different screen sizes.

To access the **Settings** page, click on the user avatar on top-right of the screen.

It still has so much room for improvement, but I eventually had to stop somewhere!
I hope you have fun with it!

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

- Serve `dist` locally:

   ```sh
   $ npm run serve
   ```
   > It serves the build artifacts in `dist` under [`http://localhost:9712`](http://localhost:9712).

<br/>

## Development guide

Thanks to the `husky` package, every changes are checked previously before being committed.
This includes _linting_ and _testing_.
Therefore, in order to have a convenient committing experience, you can do both checks manually right before committing to make sure everthing is alright:

```sh
$ npm run lint-stage   # Do not forget to stage changes first!
$ npm test
```

<br/>

## Remaining work

- [ ] More tests, improve test coverage
- [ ] Accessibility

<br/>

## Contact me

* Hessamoddin A Shokravi
* ahs502@gmail.com

