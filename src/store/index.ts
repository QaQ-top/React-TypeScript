import { createContext, useContext } from "react";
import { configure } from "mobx";

import counter from "./modules/counter";
import getRequest from "./modules/getRequest";

configure({ enforceActions: "observed" });

const storesContext = createContext({
  counter
});

const storeGetRequest = createContext({
  getRequest
})


export const useStores = () => useContext(storesContext);
export const useGetRequest = () => useContext(storeGetRequest);