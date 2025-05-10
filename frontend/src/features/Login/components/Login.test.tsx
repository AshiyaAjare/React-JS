// import { describe, it, expect, vi } from "vitest";
// import React from "react";
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import * as Yup from "yup";
// import Login from "./Login";

// describe("Login Component", () => {
//   const mockOnSubmit = vi.fn();

//   const validationSchema = Yup.object({
//     email: Yup.string().email("Invalid email").required("Email is required"),
//     password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
//   });

//   it("renders email and password inputs and login button", () => {
//     render(<Login validationSchema={validationSchema} onSubmit={mockOnSubmit} isLoading={false} />);

//     expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
//     expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
//   });

//   it("validates empty fields on submit", async () => {
//     render(<Login validationSchema={validationSchema} onSubmit={mockOnSubmit} isLoading={false} />);

//     fireEvent.click(screen.getByRole("button", { name: /login/i }));

//     expect(await screen.findByText("Email is required")).toBeInTheDocument();
//     expect(await screen.findByText("Password is required")).toBeInTheDocument();
//   });

//   it("calls onSubmit with valid values", async () => {
//     render(<Login validationSchema={validationSchema} onSubmit={mockOnSubmit} isLoading={false} />);

//     fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "test@example.com" } });
//     fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "password123" } });

//     fireEvent.click(screen.getByRole("button", { name: /login/i }));

//     await waitFor(() => {
//       expect(mockOnSubmit).toHaveBeenCalledWith(
//         { email: "test@example.com", password: "password123" },
//         expect.anything()
//       );
//     });
//   });
// });
