# Personal Website

This is my personal website.

## About

This site was generated using [Cursor](https://cursor.sh), an AI-powered code editor.

## Design Philosophy

The site is designed to be intentionally minimalistic, and to mirror the sorts of web development and tools from the time period I learned to code for the internet (2007-2008). This reflects a preference for simplicity, performance, and the foundational web technologies that shaped my early development experience.

## Technologies

- HTML5
- CSS3
- JavaScript (vanilla)
- GitHub Pages for hosting

## Quote Avatar Image Fallback

For profile images in the homepage Philosophy quote carousel, use this order:

1. Wikimedia image URL when available.
2. Official artist/person site image when no Wikimedia image is available.
3. Local placeholder avatar when no usable image source is found.

When using non-Wikimedia images, download and store the files in `media/` and reference them from `quotes-carousel.js` so quote avatars are stable and not dependent on third-party hotlinking.

The Lucky Boys Confusion quote avatar (`media/lucky-boys-confusion.jpg`) is sourced from [Concert Live Wire](http://www.concertlivewire.com/jpegs/shows/lbc7.jpg).
