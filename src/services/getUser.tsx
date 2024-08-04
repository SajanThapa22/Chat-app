import axios from "axios";
import React, { useEffect, useState } from "react";

const getUser = (id?: string) => {
  const access = localStorage.getItem("access");
  const url = `http://127.0.0.1:8000/chat/${id}`;

  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export default getUser;
