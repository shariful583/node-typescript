import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "../pages/login";
export default function Router() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element='<p>hello</p>' />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </div>
  );
}