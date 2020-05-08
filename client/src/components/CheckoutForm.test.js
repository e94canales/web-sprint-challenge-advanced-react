import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
    const form = render(<CheckoutForm />);

    const header = form.getByText('Checkout Form');

    expect(header).toBeInTheDocument();
});

test("form shows success message on submit with form details", () => {
    const { getByLabelText, getByText, getByTestId } = render(<CheckoutForm />);

    const firstNameInput = getByLabelText(/First Name:/i)
    const lastNameInput = getByLabelText(/Last Name:/i)
    const addressInput = getByLabelText(/Address:/i)
    const cityInput = getByLabelText(/City:/i)
    const stateInput = getByLabelText(/State:/i)
    const zipInput = getByLabelText(/Zip:/i)

    fireEvent.change(firstNameInput, {target: {value: 'Erick'} } )
    fireEvent.change(lastNameInput, {target: {value: 'Canales'} } )
    fireEvent.change(addressInput, {target: {value: '123 Road Drive'} } )
    fireEvent.change(cityInput, {target: {value: 'Los Angeles'} } )
    fireEvent.change(stateInput, {target: {value: 'CA'} } )
    fireEvent.change(zipInput, {target: {value: '90001'} } )

    const button = getByText('Checkout')

    fireEvent.click(button)

    const success = getByTestId(/successMessage/i)
    expect(success).toBeInTheDocument();
});
