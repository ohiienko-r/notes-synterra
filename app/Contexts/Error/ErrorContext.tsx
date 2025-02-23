"use client";

import { createContext } from "react";
import { ResponseError } from "@/app/types";

type ErrorContext = ResponseError & {
  setError: (error: ResponseError | null) => void;
  resetError: () => void;
};

export const ErrorContext = createContext<ErrorContext | null>(null);
