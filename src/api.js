/**
 * @flow
 */

import axios from 'axios';

export default axios.create({
  baseURL: 'https://hoangpham.quickbase.com/db',
  headers: { 'Content-Type': 'application/xml' },
});
