# get-trello-action-type [![NPM version](http://img.shields.io/npm/v/get-trello-action-type.svg?style=flat-square)](https://www.npmjs.org/package/get-trello-action-type)

> Determine the granular "type" of a [Trello](https://trello.com) action.

When a Trello webhook POSTs to your server, the payload contains an "action" with a designated "type". However, the action's type can be a little too high-level and abstract for one's tastes / use cases.

For example, moving a card between two lists is classified by Trello as an `updateCard` action type, and so is simply renaming a card. Wouldn't it be nice if the type was something more meaningful like `moveCardBetweenLists` or `renameCard`?

This package analyzes the structure of an action to find out its low-level, granular type.

## Installation

Install the package with NPM:

```bash
$ npm install get-trello-action-type
```

## Usage

TODO.

## Related

Some thanks to [websitesfortrello/trello-webhooks](https://github.com/websitesfortrello/trello-webhooks), for providing a comprehensive list of Trello webhook payload examples.
