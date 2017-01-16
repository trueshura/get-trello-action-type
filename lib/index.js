export class InvalidTrelloActionError extends Error {}

export class UnknownTrelloActionTypeError extends Error {}

export const trelloActionTypes = [
  "CREATE_CARD",
  "MOVE_CARD_BETWEEN_LISTS",
  "RENAME_CARD",
  "ADD_MEMBER_TO_CARD",
  "REMOVE_MEMBER_FROM_CARD",
  "ADD_LABEL_TO_CARD",
  "REMOVE_LABEL_FROM_CARD",
  "ADD_CARD_COMMENT",
  "EDIT_CARD_COMMENT",
  "REMOVE_CARD_COMMENT"
].reduce((obj, name) => (
  Object.assign(obj, { [name]: Symbol(name) })
), {});

export function getTrelloActionType(action = {}) {
  let { type, data } = action;

  if (!type || !data) throw new InvalidTrelloActionError();

  switch (type) {
    case "createCard":
      return trelloActionTypes.CREATE_CARD;
    case "updateCard":
      if (data.listBefore && data.listAfter && data.old && data.old.idList) {
        return trelloActionTypes.MOVE_CARD_BETWEEN_LISTS;
      }

      if (data.old && data.old.name) {
        return trelloActionTypes.RENAME_CARD;
      }

      break;
    case "addMemberToCard":
      return trelloActionTypes.ADD_MEMBER_TO_CARD;
    case "removeMemberFromCard":
      return trelloActionTypes.REMOVE_MEMBER_FROM_CARD;
    case "addLabelToCard":
      return trelloActionTypes.ADD_LABEL_TO_CARD;
    case "removeLabelFromCard":
      return trelloActionTypes.REMOVE_LABEL_FROM_CARD;
    case "commentCard":
      return trelloActionTypes.ADD_CARD_COMMENT;
    case "updateComment":
      return trelloActionTypes.EDIT_CARD_COMMENT;
    case "deleteComment":
      return trelloActionTypes.REMOVE_CARD_COMMENT;
  }

  throw new UnknownTrelloActionTypeError();
}
