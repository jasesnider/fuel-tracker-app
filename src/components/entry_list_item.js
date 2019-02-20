import React from 'react';
import { Button, Icon } from 'antd';

const EntryListItem = ({ entry, onEditClick, deleteEntry }) => {
  const { id, cost, quantity, price, odometer, fullTank } = entry;
  return (
    <React.Fragment>
      <div>
        {`Cost: ${cost}`} | {`Quantity: ${quantity}`} | {`Price: ${price}`} |{' '}
        {`Odometer: ${odometer}`} | {`Full Tank: ${fullTank ? 'Yes' : 'No'}`}
        <Button
          className="edit-icon"
          type="default"
          onClick={() => onEditClick(entry)}
        >
          <Icon type="edit" />
        </Button>
        <Button
          className="delete-icon"
          type="default"
          onClick={e => deleteEntry(e, id)}
        >
          <Icon type="delete" />
        </Button>
      </div>

      <style jsx global>
        {`
          .edit-icon,
          .delete-icon {
            margin-left: 10px;
          }
        `}
      </style>
    </React.Fragment>
  );
};

export default EntryListItem;

// Odometer: 100

// 20 Capacity

// + 6 G

// Odometer: 150

// 50 / 6 = 8.333 MPG

// Full Tank - TRUE
