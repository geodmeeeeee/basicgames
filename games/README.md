# Game directory

This folder is reserved for future game modules or pages.

A simple pattern is to keep each game in its own file or folder and add it to the game list in `app.js`.

Example:

```js
{
  title: "Your New Game",
  tag: "Category",
  icon: "Y",
  description: "Short description of the game."
}
```

Then add the new object to the `games` array in `app.js` and the card will appear automatically.
