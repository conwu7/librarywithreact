import React from 'react';
import Header from "./components/mainapp/Header";
import NewBookButton from "./components/mainapp/NewBookButton";
import Cabinet from "./components/mainapp/Cabinet";


function BookLibrary() {
  return (
    <div className="App">
      <Header />
      <NewBookButton />
      <Cabinet />
    </div>
  );
}

export default BookLibrary;
