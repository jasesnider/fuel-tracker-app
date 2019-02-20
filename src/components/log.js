import React from 'react';
import { Table, Button, Icon } from 'antd';
import moment from 'moment';

const renderColumns = () => [
  {
    title: 'Cost',
    dataIndex: 'cost',
    key: 'cost',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Odometer',
    dataIndex: 'odometer',
    key: 'odometer',
  },
  {
    title: 'Full Tank',
    dataIndex: 'fullTank',
    key: 'fullTank',
  },
  {
    title: 'Date Created',
    dataIndex: 'dateCreated',
    key: 'dateCreated',
  },
  {
    title: '',
    key: 'action',
    render: ({ item, onEditClick, deleteEntry }) => {
      return (
        <React.Fragment>
          <Button
            className="edit-icon"
            type="default"
            onClick={() => onEditClick(item)}
          >
            <Icon type="edit" />
          </Button>
          <Button
            className="delete-icon"
            type="default"
            onClick={() => deleteEntry(item)}
          >
            <Icon type="delete" />
          </Button>
        </React.Fragment>
      );
    },
  },
];

const denormLogData = (data, onEditClick, deleteEntry) => {
  let denormedData = [];
  for (let i = 0; i < data.length; i++) {
    const { id, cost, quantity, price, odometer, fullTank, dateCreated } = data[
      i
    ];
    denormedData.push({
      key: id,
      cost,
      quantity,
      price,
      odometer,
      fullTank: fullTank ? `Yes` : `No`,
      dateCreated: moment(dateCreated).format('LL'),
      item: data[i],
      onEditClick,
      deleteEntry,
    });
  }

  return denormedData;
};

const Log = ({ log, onEditClick, deleteEntry }) => (
  <div>
    <Table
      dataSource={denormLogData(log, onEditClick, deleteEntry)}
      columns={renderColumns()}
    />
  </div>
);

export default Log;
