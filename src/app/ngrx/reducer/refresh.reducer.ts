import {State, RefreshState} from "../store/refresh.store";
import {Action} from "@ngrx/store";
import {REFRESH} from "../action/option";
/**
 * Created by Xposean on 2017-9-29.
 */

export function refreshReducer(state:State = RefreshState,action:Action):State {
  const {type,payload} = action;

  switch (type){
    case REFRESH:{
      return{
        number:state.number + payload
      }
    }
    default:
      return state;
  }
}

export const getNumber = (state:State) => state.number;
