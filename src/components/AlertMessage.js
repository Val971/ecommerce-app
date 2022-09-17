import React from 'react'
import Alert from "@mui/material/Alert";

import './styles/alertMessage.scss'

export default function AlertMessage({error}) {
  return (
    <Alert className="error" severity="error">
          {error}
        </Alert>
  )
}
