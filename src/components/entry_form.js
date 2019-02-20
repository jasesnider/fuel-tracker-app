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
  const labelColumn = 8;
  const inputColumn = 16;
  return (
    <div className="form-wrapper">
      <form>
        <div className="field-input">
          <Row>
            <Col span={labelColumn}>Date:</Col>
            <Col span={inputColumn}>
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
        </div>
        <div className="field-input">
          <Row>
            <Col span={labelColumn}>Cost:</Col>
            <Col span={inputColumn}>
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
          </Row>{' '}
        </div>
        <div className="field-input">
          <Row>
            <Col span={labelColumn}>Quantity:</Col>
            <Col span={inputColumn}>
              <InputNumber
                min={0}
                name="quantity"
                value={quantity}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                onChange={value => onChangeHandler(value, 'quantity')}
              />
            </Col>
          </Row>{' '}
        </div>
        <div className="field-input">
          <Row>
            <Col span={labelColumn}>Odometer:</Col>
            <Col span={inputColumn}>
              <InputNumber
                min={0}
                name="odometer"
                value={odometer}
                size="100%"
                onChange={value => onChangeHandler(value, 'odometer')}
              />
            </Col>
          </Row>{' '}
        </div>
        <div className="field-input">
          <Row>
            <Col span={labelColumn}>Full Tank?</Col>
            <Col span={inputColumn}>
              <Checkbox
                name="isFullTank"
                type="checkbox"
                checked={isFullTank}
                value={isFullTank}
                onChange={e => toggleChecked(e)}
              />
            </Col>
          </Row>{' '}
        </div>
        <div className="field-input">
          <Row>
            <Col span={labelColumn}>{`Price Per Gallon (${currency})`}</Col>
            <Col span={inputColumn}>
              <InputNumber value={price} readOnly />
            </Col>
          </Row>
          <Row>
            <Col span={12}>{`Fuel Economy: ${fuelEconomy}`}</Col>
          </Row>
        </div>
      </form>
      <style jsx>{`
        .form-wrapper .field-input {
          margin: 10px auto;
          line-height: 32px;
        }
      `}</style>
    </div>
  );
};

export default EntryForm;
