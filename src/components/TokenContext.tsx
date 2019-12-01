import React, { useState, Dispatch, SetStateAction } from "react";

const TokenContext = React.createContext<
  [String, Dispatch<SetStateAction<String>>] | undefined
>(undefined);

interface IProps {
  children: React.ReactNode;
}

const TokenProvider = ({ children }: IProps) => {
  const [token, setToken] = useState<String>("");

  return (
    <TokenContext.Provider value={[token, setToken]}>
      {children}
    </TokenContext.Provider>
  );
};

export { TokenContext, TokenProvider };
