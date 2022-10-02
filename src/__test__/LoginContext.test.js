import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";
import userEvent from "@testing-library/user-event";

test("Check title", async () => {
  render(<App />);
  const title = await waitFor(() => screen.findByTestId("title"));
  expect(title).toHaveTextContent("Facebook Ultra Lite");
});

// test("Check display info", async () => {
//   render(<App />);
//   const signInButton = await waitFor(() => screen.findByTestId("signInButton"));
//   const homePage = await waitFor(() => screen.findByTestId("homePage"));

//   fireEvent.click(signInButton)
//   // console.log(personInfo.textContent);
//   expect(homePage).toHaveTextContent("Please enter your email and password");

//   const username = screen.getByTestId("username");
// //   console.log(username)
// fireEvent.change(username, { target: { value: "mohammad" } });
//   expect(username.value).toBe("mohammad");

//   const password = screen.getByTestId("password");
//   fireEvent.change(password, { target: { value: "mohammad" } });
//   expect(password.value).toBe("mohammad");

// });
