import React, { Component } from "react";
import Container from "./Components/Container";
import Form from "./Components/Form";
import ContactsList from "./Components/BanksList";
import shortid from "shortid";
import PropTypes from "prop-types";
import Filter from "./Components/Filter";
import initialBanks from "./Data/initialBanks.json";

class App extends Component {
  static defaultProps = {
    banks: initialBanks,
    filter: "",
  };

  static propTypes = {
    banks: PropTypes.array,
    filter: PropTypes.string,
  };

  state = {
    banks: this.props.banks,
    filter: this.props.filter,
  };

  addBank = ({
    name,
    country,
    currency,
    interestRate,
    maxLoan,
    minDownPayment,
    loanTerm,
  }) => {
    const { banks } = this.state;
    const bank = {
      id: shortid.generate(),
      name: name,
      country: country,
      currency: currency,
      interestRate: interestRate,
      maxLoan: maxLoan,
      minDownPayment: minDownPayment,
      loanTerm: loanTerm,
    };
    banks.some(({ name }) => name.toLowerCase() === bank.name.toLowerCase())
      ? alert(`${name} is already in contacts`)
      : this.setState(({ banks }) => ({ banks: [bank, ...banks] }));
  };

  deleteBank = (bankName) => {
    this.setState((prevState) => ({
      banks: prevState.banks.filter((bank) => bank.name !== bankName),
    }));
  };

  changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleBanks = () => {
    const { filter, banks } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return banks.filter((bank) =>
      bank.name.toLowerCase().includes(normalizedFilter)
    );
  };

  componentDidMount() {
    const banks = localStorage.getItem("banks");
    const parseBanks = JSON.parse(banks);

    if (parseBanks) {
      this.setState({ banks: parseBanks });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.banks !== prevState.banks) {
      console.log("updated bank information");
      localStorage.setItem("banks", JSON.stringify(this.state.banks));
    }
  }

  render() {
    const { filter } = this.state;
    const visibleBanks = this.getVisibleBanks();
    const MonthlyPaymant = ({ banks }) => (
      <h3>
        MonthlyPaymant:
        {banks.reduce(
          (sum, i) =>
            (sum =
              (((i.maxLoan * i.interestRate) / 12) *
                ((1 + i.interestRate / 12) ^ i.loanTerm)) /
              ((1 + i.interestRate / 12) ^ (i.loanTerm - 1))),
          0
        )}
      </h3>
    );

    return (
      <Container>
        <Form onSubmit={this.addBank} />
        <h2>Banks</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactsList banks={visibleBanks} onDeleteBank={this.deleteBank} />
        <MonthlyPaymant banks={this.state.banks} />
      </Container>
    );
  }
}

export default App;
