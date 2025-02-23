"use client";

import { ReactNode, useCallback, useMemo, useState } from "react";
import { ErrorContext } from "./ErrorContext";
import { ResponseError } from "@/app/types";

type ErrorProviderPropTypes = {
  children: ReactNode;
};

function ErrorProvider({ children }: ErrorProviderPropTypes) {
  const [error, setError] = useState<ResponseError | null>(null);

  const handleSetError = useCallback((errorObject: ResponseError | null) => {
    setError(errorObject);
  }, []);

  const handleResetError = useCallback(() => {
    setError(null);
  }, []);

  const contextValue = useMemo(() => {
    return {
      status: error?.status,
      statusText: error?.statusText,
      setError: handleSetError,
      resetError: handleResetError,
    };
  }, [error, handleSetError, handleResetError]);

  return (
    <ErrorContext.Provider value={contextValue}>
      {children}
    </ErrorContext.Provider>
  );
}

export default ErrorProvider;
