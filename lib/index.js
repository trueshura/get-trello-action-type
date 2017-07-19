"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTrelloActionType = getTrelloActionType;
class InvalidTrelloActionError extends Error {}

exports.InvalidTrelloActionError = InvalidTrelloActionError;
class UnknownTrelloActionTypeError extends Error {}

exports.UnknownTrelloActionTypeError = UnknownTrelloActionTypeError;
const trelloActionTypes = exports.trelloActionTypes = ["CHANGE_CARD_POSITION", "ADD_CARD_ATTACHMENT", "REMOVE_CARD_ATTACHMENT", "REMOVE_CARD_CHECKLIST", "MOVE_CARD_TO_BOARD", "CHANGE_CARD_DUE", "CREATE_CARD", "REMOVE_CARD", "MOVE_CARD_BETWEEN_LISTS", "RENAME_CARD", "ADD_MEMBER_TO_CARD", "REMOVE_MEMBER_FROM_CARD", "ADD_LABEL_TO_CARD", "REMOVE_LABEL_FROM_CARD", "ADD_CHECKLIST_TO_CARD", "REMOVE_CHECKLIST_FROM_CARD", "ADD_CARD_COMMENT", "EDIT_CARD_COMMENT", "REMOVE_CARD_COMMENT", "UNKNOWN"].reduce((obj, name) => Object.assign(obj, { [name]: Symbol(name) }), {});

function getTrelloActionType(action = {}) {
  let { type, data } = action;

  if (!type || !data) throw new InvalidTrelloActionError();

  switch (type) {
    case "createCard":
      return trelloActionTypes.CREATE_CARD;
    case "deleteCard":
      return trelloActionTypes.REMOVE_CARD;
    case "updateCard":
      if (data.listBefore && data.listAfter && data.old && data.old.idList) {
        return trelloActionTypes.MOVE_CARD_BETWEEN_LISTS;
      }

      if (data.old && data.old.hasOwnProperty('name')) {
        return trelloActionTypes.RENAME_CARD;
      }

      if (data.old && data.old.hasOwnProperty('due')) {
        return trelloActionTypes.CHANGE_CARD_DUE;
      }

      if (data.old && data.old.hasOwnProperty('pos')) {
        return trelloActionTypes.CHANGE_CARD_POSITION;
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
    case "addChecklistToCard":
      return trelloActionTypes.ADD_CHECKLIST_TO_CARD;
    case "removeChecklistFromCard":
      return trelloActionTypes.REMOVE_CHECKLIST_FROM_CARD;
    case "commentCard":
      return trelloActionTypes.ADD_CARD_COMMENT;
    case "updateComment":
      return trelloActionTypes.EDIT_CARD_COMMENT;
    case "deleteComment":
      return trelloActionTypes.REMOVE_CARD_COMMENT;
    case "moveCardToBoard":
      return trelloActionTypes.MOVE_CARD_TO_BOARD;
    case "addAttachmentToCard":
      return trelloActionTypes.ADD_CARD_ATTACHMENT;
    case "deleteAttachmentFromCard":
      return trelloActionTypes.REMOVE_CARD_ATTACHMENT;
    case "removeChecklistFromCard":
      return trelloActionTypes.REMOVE_CARD_CHECKLIST;
    default:
      return trelloActionTypes.UNKNOWN;
  }
}
