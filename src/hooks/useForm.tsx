import React, { useState } from 'react'

export const useForm = <T extends Object>(initialValues: T) => {
  const [formValues, setFormValues] = useState(initialValues)

  const onChange = (value: string, campo: string) => {
    setFormValues({
      ...formValues,
      [campo]: value,
    })
  }

  return { ...formValues, formValues, onChange }
}
