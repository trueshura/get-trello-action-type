export class InvalidTrelloActionError extends Error {}

export class UnknownTrelloActionTypeError extends Error {}

export const trelloActionTypes = [
  "MOVE_CARD_BETWEEN_LISTS",
  "RENAME_CARD"
].reduce((obj, name) => (
  Object.assign(obj, { [name]: Symbol(name) })
), {});

export function getTrelloActionType(action = {}) {
  let { type, data } = action;

  if (!type || !data) throw new InvalidTrelloActionError();

  switch (type) {
    case "updateCard":
      if (data.listBefore && data.listAfter && data.old && data.old.idList) {
        return trelloActionTypes.MOVE_CARD_BETWEEN_LISTS;
      }

      if (data.old && data.old.name) {
        return trelloActionTypes.RENAME_CARD;
      }

      break;
  }

  throw new UnknownTrelloActionTypeError();
}
