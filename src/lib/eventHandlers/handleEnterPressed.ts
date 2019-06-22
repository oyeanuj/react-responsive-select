import * as actionTypes from '../../constants/actionTypes';
import ReactResponsiveSelect from '../../ReactResponsiveSelect';
import { IProps, IState } from '../../types/';

interface IArgs {
  event: KeyboardEvent;
  state: IState;
  props: IProps;
  RRSClassRef: ReactResponsiveSelect;
}

export function handleEnterPressed({ event, state, props, RRSClassRef }: IArgs): void {
  const {
    disabled,
    isOptionsPanelOpen,
    multiselect,
    nextPotentialSelectionIndex,
    options,
  } = state;

  if (disabled) return;

  const value = parseFloat((event.target as any).getAttribute('data-key'));

  if (options[value] && (options[value].disabled === true || options[value].optHeader === true)) {
    return;
  }

  if (multiselect) {
    RRSClassRef.updateState({
      type: actionTypes.SET_MULTISELECT_OPTIONS,
      value: nextPotentialSelectionIndex,
    });
  } else {
    RRSClassRef.updateState({
      type: actionTypes.SET_SINGLESELECT_OPTIONS,
      value: nextPotentialSelectionIndex,
    });
  }

  if (isOptionsPanelOpen) {
    event.stopPropagation(); // Do not submit form
  } else {
    // tslint:disable-next-line
    props.onSubmit && props.onSubmit(event); // Submit the form
  }
}
