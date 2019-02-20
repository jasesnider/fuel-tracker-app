import React from 'react';
import { InputNumber, Checkbox, DatePicker, Row, Col } from 'antd';

const EntryForm = ({
  currency,
  fuelEconomy,
  cost,
  date,
  quantity,
  odometer,
  isFullTank,
  price,
  onChangeHandler,
  onDateChangeHandler,
  toggleChecked,
}) => {
  return (
    <div className="form-wrapper">
      <form>
        <Row>
          <Col span={6}>Date:</Col>
          <Col span={18}>
            <DatePicker
              showTime={{ format: 'HH:mm' }}
              value={date}
              format="YYYY-MM-DD HH:mm"
              placeholder="Select Time"
              onChange={(value, dateString) =>
                onDateChangeHandler(value, dateString, 'date')
              }
              onOk={value => onDateChangeHandler(value)}
            />
          </Col>
        </Row>
        <Row>
          <Col span={6}>Cost:</Col>
          <Col span={18}>
            <InputNumber
              min={0}
              name="cost"
              value={cost}
              formatter={value =>
                `${currency} ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              onChange={value => onChangeHandler(value, 'cost')}
            />
          </Col>
        </Row>
        <Row>
          <Col span={6}>Quantity:</Col>
          <Col span={18}>
            <InputNumber
              min={0}
              name="quantity"
              value={quantity}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              onChange={value => onChangeHandler(value, 'quantity')}
            />
          </Col>
        </Row>
        <Row>
          <Col span={6}>Odometer:</Col>
          <Col span={18}>
            <InputNumber
              min={0}
              name="odometer"
              value={odometer}
              size="100%"
              onChange={value => onChangeHandler(value, 'odometer')}
            />
          </Col>
        </Row>
        <Row>
          <Col span={6}>Full Tank?</Col>
          <Col span={18}>
            <Checkbox
              name="isFullTank"
              type="checkbox"
              checked={isFullTank}
              value={isFullTank}
              onChange={e => toggleChecked(e)}
            />
          </Col>
        </Row>
        <Row>
          <Col span={6}>{`Price Per Gallon (${currency})`}</Col>
          <Col span={18}>
            <InputNumber value={price} readOnly />
          </Col>
        </Row>
        <Row>
          <Col span={12}>{`Fuel Economy: ${fuelEconomy}`}</Col>
        </Row>
      </form>
      <style jsx>{`
        .form-wrapper input {
          margin: 20px auto;
        }
      `}</style>
    </div>
  );
};

export default EntryForm;
