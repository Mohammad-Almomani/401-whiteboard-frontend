import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import '@testing-library/jest-dom'
import App from "../App";
import AppRoutes from "../components/Routes";
import LoginContextProvider from "../Context/Login_Context";

test("Check title", async () => {
  render(<App />);
  const title = await waitFor(() => screen.findByTestId("title"));
  expect(title).toHaveTextContent("Facebook Ultra Lite");
});

test("Check Context and Auth", async () => {
  render( <LoginContextProvider ><AppRoutes /></LoginContextProvider>);

  const signInButton = await waitFor(() => screen.findByTestId("signInButton"));
  const homePage = await waitFor(() => screen.findByTestId("homePage"));

  fireEvent.click(signInButton)
  expect(homePage).toHaveTextContent("Please enter your email and password");

// const username = screen.getByTestId("username");
// // await userEvent.type((username, 'mohammad'));
// await fireEvent.change(username, { target: { value: "mohammad" } });

// const password = screen.getByTestId("password");
// await fireEvent.change(password, { target: { value: "mohammad" } });
// expect(password.value).toBe("mohammad");
// console.log(username)

//  fireEvent.click(signInButton)
//   expect(homePage).toHaveTextContent("Please enter your email and password");

  // expect(username.value).toBe("mohammad");

  // expect(password.value).toBe("mohammad");

});

test("Check Routes", async () => {
  render( <LoginContextProvider ><AppRoutes /></LoginContextProvider>);

  const signUpRoute = await waitFor(() => screen.findByTestId("signUpRoute"));
  const signUpButton = await waitFor(() => screen.findByTestId("signInButton"));
  const homePage = await waitFor(() => screen.findByTestId("homePage"));

  fireEvent.click(signUpRoute)
  fireEvent.click(signUpButton)
  expect(homePage).toHaveTextContent("Sign Up");

});
