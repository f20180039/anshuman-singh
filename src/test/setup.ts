// Registers jest-dom matchers (toBeInTheDocument, toHaveAttribute, ...) on
// vitest's `expect` for every test file.
import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Testing Library only auto-unmounts after each test when `afterEach` is a
// global; vitest runs without `globals`, so register it explicitly or renders
// pile up across tests and "found multiple elements" errors follow.
afterEach(cleanup);
