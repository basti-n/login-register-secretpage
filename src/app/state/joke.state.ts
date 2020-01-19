import { Joke } from '../models';
import { State, Action, StateContext } from '@ngxs/store';
import { AddJoke } from './joke.actions';

export interface JokeStateModel {
  count: number;
  jokes: Joke[];
  lastChanged: string;
}

@State<JokeStateModel>({
  name: 'Jokes',
  defaults: {
    count: 0,
    jokes: [],
    lastChanged: new Date().toISOString(),
  },
})
export class JokeState {
  @Action(AddJoke)
  addJoke(stateCtx: StateContext<JokeStateModel>, action: AddJoke) {
    const state = stateCtx.getState();
    stateCtx.setState({
      ...state,
      count: state.count + 1,
      jokes: [{ joke: action.payload }, ...state.jokes],
      lastChanged: new Date().toISOString(),
    });
  }
}
