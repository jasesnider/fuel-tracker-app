import React, { Component } from 'react';
import { Link } from 'gatsby';
import EntryForm from '../components/entry_form';
import { Button, Icon, Skeleton, notification } from 'antd';
import CommonModal from '../components/modal';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Log from '../components/log';

class IndexPage extends Component {
  state = {
    isFormOpen: false,
    formType: '',
    currency: '$',
    isFullTank: false,
    fuelEconomy: 'MPG',
    id: null,
    date: null,
    formattedDate: null,
    odometer: 0,
    cost: 0,
    quantity: 0,
    price: 0,
    log: [],
  };

  openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  onEditClick = ({
    id,
    fullTank,
    odometer,
    cost,
    quantity,
    date,
    formattedDate,
  }) => {
    this.setState(state => ({
      id,
      isFullTank: fullTank,
      odometer,
      cost,
      quantity,
      date,
      formattedDate,
      visible: true,
      modalTitle: 'Edit Entry',
      formType: 'Update',
      isFormOpen: true,
    }));
  };

  toggleEntryForm = () => {
    this.setState(state => ({
      isFormOpen: true,
      formType: 'Add',
      visible: true,
      modalTitle: 'Create Entry',
    }));
    this.clearForm();
  };

  setPrice = (cost, quantity) => {
    const calc = cost / quantity;
    return !isFinite(calc) ? 0 : calc;
  };

  saveEntry = e => {
    e.preventDefault();
    this.setState(state => ({
      log: [
        ...state.log,
        {
          id: state.log.length + 1,
          date: state.date,
          formattedDate: state.formattedDate,
          cost: state.cost,
          fullTank: state.isFullTank,
          odometer: state.odometer,
          quantity: state.quantity,
          price: state.price,
          dateCreated: state.date,
          dateUpdated: Date.now(),
        },
      ],
      modalTitle: '',
      modalBody: null,
      visible: false,
      isFormOpen: false,
    }));
    this.openNotificationWithIcon(
      'success',
      'Success!',
      'Entry successfully added'
    );
    this.clearForm();
  };

  updateEntry = e => {
    e.preventDefault();

    const {
      log,
      id,
      date,
      formattedDate,
      cost,
      isFullTank,
      odometer,
      quantity,
      price,
    } = this.state;
    const index = log.findIndex(x => x.id === id);

    if (index === -1) {
    } else {
      this.setState({
        log: [
          ...log.slice(0, index),
          Object.assign({}, log[index], {
            id,
            date,
            formattedDate,
            cost,
            fullTank: isFullTank,
            odometer,
            quantity,
            price,
            dateUpdated: Date.now(),
          }),
          ...log.slice(index + 1),
        ],
        isFormOpen: false,
        visible: false,
      });
    }
    this.clearForm();
    this.openNotificationWithIcon(
      'success',
      'Success!',
      'Entry successfully updated'
    );
  };

  clearForm = () => {
    this.setState({
      date: null,
      formattedDate: null,
      isFullTank: false,
      odometer: 0,
      cost: 0,
      quantity: 0,
      price: 0,
    });
  };

  deleteEntry = item => {
    this.setState(state => ({
      log: [...state.log.filter(entry => entry.id !== item.id)],
    }));
    this.openNotificationWithIcon(
      'success',
      'Success!',
      'Entry successfully deleted'
    );
  };

  toggleChecked = () => {
    this.setState({ isFullTank: !this.state.isFullTank });
  };

  onDateChangeHandler = (date, formattedDate, type) => {
    this.setState({
      date,
      formattedDate: type ? formattedDate : this.state.formattedDate,
    });
  };

  onChangeHandler = (value, name) => {
    const trueCost = name === 'cost' ? value : this.state.cost;
    const trueQuantity = name === 'quantity' ? value : this.state.quantity;

    this.setState(state => ({
      [name]: value,
      price: this.setPrice(trueCost, trueQuantity),
    }));
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleModalConfirm = () => {
    this.setState({
      visible: false,
    });
  };

  handleModalCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const {
      currency,
      fuelEconomy,
      isFullTank,
      isFormOpen,
      cost,
      odometer,
      price,
      quantity,
      log,
      date,
      formattedDate,
      visible,
      modalTitle,
      formType,
    } = this.state;

    const modalBodyForm = isFormOpen && (
      <EntryForm
        currency={currency}
        cost={cost}
        price={price}
        date={date}
        formattedDate={formattedDate}
        quantity={quantity}
        isFullTank={isFullTank}
        odometer={odometer}
        fuelEconomy={fuelEconomy}
        onChangeHandler={this.onChangeHandler}
        onDateChangeHandler={this.onDateChangeHandler}
        toggleChecked={this.toggleChecked}
      />
    );

    const disabled = !cost || !quantity || isNaN(price);

    return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <Button type="default" onClick={this.toggleEntryForm}>
          Create Entry
          <Icon type="plus" />
        </Button>
        {log ? (
          <Log
            log={log}
            onEditClick={this.onEditClick}
            deleteEntry={this.deleteEntry}
          />
        ) : (
          <Skeleton active />
        )}

        <Link to="/settings/">Go to Settings</Link>
        <CommonModal
          wrappedComponentRef={this.saveFormRef}
          visible={visible}
          modalTitle={modalTitle}
          modalBody={modalBodyForm}
          disabled={disabled}
          confirmButtonLabel={formType}
          handleModalCancel={this.handleModalCancel}
          handleModalConfirm={
            formType === 'Update' ? this.updateEntry : this.saveEntry
          }
        />
      </Layout>
    );
  }
}

export default IndexPage;
