#! /usr/bin/env node

/*
Copyright © Adobe, Inc. All rights reserved.
See COPYING.txt for license details.
*/

import dotenv from 'dotenv';
dotenv.config();

import fetch from "node-fetch";

const fetchData = async (url, token, type) => {
  try {
    const headers = {
      Authorization: type === 'github' ? `Bearer ${token}` : `Basic ${token}`,
      'Content-Type': 'application/json',
    };

    if (type !== 'github' && type !== 'jira') {
      throw new Error(`Invalid request type: ${type}`);
    }
    console.log(url, headers)
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(`Fetching ${type} data failed: ${response.statusText}`);
    }

    return (await response.json())[type === 'github' ? 'items' : 'issues'];

  } catch (error) {
    console.error(error);
  }
};

export default fetchData;
