// import React, { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
//   const [accountId, setAccountId] = useState("");
//   const [token, setToken] = useState("");

//   // Initialize values from local storage
//   useEffect(() => {
//     const storedAccountId = localStorage.getItem("accountId");
//     const storedToken = localStorage.getItem("token");

//     if (storedAccountId && storedToken) {
//       setAccountId(storedAccountId);
//       setToken(storedToken);
//     }
//   }, []);

//   // Set values and update local storage when they change
//   useEffect(() => {
//     localStorage.setItem("accountId", accountId);
//     localStorage.setItem("token", token);
//   }, [accountId, token]);

//   return (
//     <AuthContext.Provider value={{ accountId, token, setAccountId, setToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
// export { AuthContext };

import React from "react";

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountId: "",
      token: "",
    };
  }

  componentDidMount() {
    const storedAccountId = localStorage.getItem("accountId");
    const storedToken = localStorage.getItem("token");

    if (storedAccountId && storedToken) {
      this.setState({
        accountId: storedAccountId,
        token: storedToken,
      });
    }
  }

  componentDidUpdate() {
    const { accountId, token } = this.state;
    localStorage.setItem("accountId", accountId);
    localStorage.setItem("token", token);
  }

  render() {
    const { accountId, token } = this.state;
    const contextValue = {
      accountId,
      token,
      setAccountId: (newAccountId) =>
        this.setState({ accountId: newAccountId }),
      setToken: (newToken) => this.setState({ token: newToken }),
    };

    return (
      <AuthContext.Provider value={contextValue}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const useAuth = () => {
  return React.useContext(AuthContext);
};

export { AuthProvider, useAuth, AuthContext };
