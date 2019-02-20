import React from 'react';
import renderer from 'react-test-renderer';
import EntryForm from '../../src/components/entry_form';

describe('EntryForm', () => {
  it('renders correctly', () => {
    const props = {
      currency: '$',
      saveEntry: () => {},
      fuelEconomy: 'MPG',
      cost: '34.23',
      quantity: '12',
      odometer: '1321321',
      isFullTank: true,
      onChangeHandler: () => {},
    };

    const tree = renderer
      .create(
        <EntryForm
          currency={props.currency}
          cost={props.cost}
          price={props.cost / props.quantity}
          quantity={props.quantity}
          isFullTank={props.isFullTank}
          odometer={props.odometer}
          fuelEconomy={props.fuelEconomy}
          saveEntry={props.saveEntry}
          onChangeHandler={props.onChangeHandler}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
