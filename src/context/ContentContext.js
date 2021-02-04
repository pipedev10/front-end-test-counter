import React, { createContext, useState } from "react";
import apiConfig from "config/apiConfig";

export const ContentContext = createContext();

// This context provider is passed to any component requiring the context
export const ContentContextProvider = ({ children }) => {
  const URL_CONTENT = apiConfig.content();
  const [contentList, setContentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fetchContents = async () => {
    try {
      setLoading(true);
      const res = await fetch(URL_CONTENT);
      const data = await res.json();
      setLoading(false);
      setContentList(data);
    } catch (error) {
      setLoading(false);
      setContentList([]);
      setHasError(true);
    }
  };

  const increaseCounter = async ({ id }) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id }),
      };

      const resp = await fetch(`${URL_CONTENT}/inc`, requestOptions);
      const data = await resp.json();
      return data;
    } catch (error) {}
  };

  const decreaseCounter = async ({ id }) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id }),
      };

      const resp = await fetch(`${URL_CONTENT}/dec`, requestOptions);
      const data = await resp.json();
      return data;
    } catch (error) {}
  };

  return (
    <ContentContext.Provider
      value={{
        contentList,
        fetchContents,
        loading,
        hasError,
        increaseCounter,
        decreaseCounter,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};