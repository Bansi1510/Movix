import { type ReactNode } from "react";

import { Provider } from "react-redux";

import {
  store,
  persistor,
} from "../store/store";

import { PersistGate } from "redux-persist/integration/react";

interface Props {
  children: ReactNode;
}

const ReduxProvider = ({
  children,
}: Props) => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;