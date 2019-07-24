import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useCurrency } from "../helpers/helpers";
import "./Form-styles.scss";

function AppForm({ contract, proposal, endDate, maxBet }) {
  const [currency, setCurrency] = useCurrency("");

  const handleSubmit = async e => {
    e.preventDefault();
    // convert to pennies (integer) for solidity
    const pennies = Number(currency.replace(",", "")) * 100;

    await contract.methods.wager.call(pennies);
  };

  const handleChange = (e, blur) => {
    setCurrency(e.target.value, blur);
  };

  return proposal ? (
    <div>
      <h5>
        <div>{proposal},</div>
        <div>
          {" "}
          on {endDate.format("LL")} at {endDate.format("hh:mm:ss A")}
        </div>
      </h5>
      <hr />
      <p>
        <label>Wager amount:</label>
        <span className="wager-amount"> {maxBet} ETH</span>
      </p>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="prediction">Enter Your Prediction:</label>
        <div className="formRow">
          <span className="currency">$</span>
          <input
            name="prediction"
            type="text"
            maxLength="15"
            id="prediction"
            aria-label="Prediction"
            value={currency}
            onChange={handleChange}
            onKeyUp={handleChange}
            onBlur={e => handleChange(e, "blur")}
            placeholder="1,000,000.00"
          />
        </div>
        <Button
          variant="outline-secondary"
          type="submit"
          className="submitButton"
        >
          Submit Wager
        </Button>
      </Form>
    </div>
  ) : null;
}

export default AppForm;
