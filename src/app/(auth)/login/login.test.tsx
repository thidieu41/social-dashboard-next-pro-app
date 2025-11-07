import { render, screen } from "@testing-library/react";
import FormLogin from "./login-form";
import userEvent from "@testing-library/user-event";
import { handleLoginForm } from "@/actions/auth-action";

jest.mock("@/actions/auth-action", () => ({
  handleLoginForm: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("Login Form", () => {
  let button: HTMLElement;
  let emailInput: HTMLElement;
  let passwordInput: HTMLElement;

  beforeEach(() => {
    render(<FormLogin />);
    button = screen.getByRole("button", { name: /submit/i });
    emailInput = screen.getByLabelText(/email/i);
    passwordInput = screen.getByLabelText(/password/i);
  });

  describe("check render ui", () => {
    test("render login form correctly", () => {
      render(<FormLogin />);
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });
  });

  describe("check validation", () => {
    test("email validation", async () => {
      render(<FormLogin />);
      await userEvent.click(button);
      expect(
        await screen.findByText(/Email is required!/i)
      ).toBeInTheDocument();
    });

    test("incorrect format email", async () => {
      render(<FormLogin />);
      await userEvent.type(emailInput, "abc");
      await userEvent.click(button);
      expect(
        await screen.findByText(/Incorrect email format!/i)
      ).toBeInTheDocument();
    });

    test("password validation", async () => {
      render(<FormLogin />);
      await userEvent.type(emailInput, "abc@gmail.com");
      await userEvent.click(button);
      expect(
        await screen.findByText(/Password is required!/i)
      ).toBeInTheDocument();
    });
  });

  describe("submit form ", () => {
    test("click on submit button and redirect", async () => {
      const mockLogin = handleLoginForm as jest.Mock;
      mockLogin.mockResolvedValueOnce({});
      await userEvent.type(emailInput, "a@gmail.com");
      await userEvent.type(passwordInput, "12345678");
      await userEvent.click(button);

      expect(mockLogin).toHaveBeenCalledWith({
        email: "a@gmail.com",
        password: "12345678",
      });
      expect(mockLogin).toHaveBeenCalledTimes(1);
    });
  });
});
