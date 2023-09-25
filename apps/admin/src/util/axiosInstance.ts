import axios from 'axios'

export const instance = axios.create({
  baseURL: import.meta.env['VITE_SERVER'] ? import.meta.env['VITE_SERVER'] : 'http://localhost:4000/'
})
