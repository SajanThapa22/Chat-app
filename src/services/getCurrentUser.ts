import axios from "axios";
import React, { useEffect, useState } from "react";

interface User {
  id: string;
  username: string;
  email: string;
}

const url = `http://127.0.0.1:8000/auth/loggedin_user_details/`;
const accessToken = localStorage.getItem("access");

const getCurrentUser = async () => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};

export default getCurrentUser;
