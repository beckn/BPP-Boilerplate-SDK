import React, { useCallback, useEffect } from 'react'
import useForceUpdate from '../../../hooks/useForceUpdate'

function useFormHandler({
  schema,
  defaultState
}: {
  schema: {
    [key: string]: any
  }
  defaultState: {
    [key: string]: any
  }
  selectedID?: string
}) {
  const [formState, setFormState] = React.useState<null | {
    [key: string]: any
  }>(null)

  const update = useForceUpdate()

  const initFormSchema = useCallback((schema: { [key: string]: any }) => {
    let state: {
      [key: string]: any
    } = {}

    if (!schema) return state

    Object.keys(schema).map(value => {
      const isArray = schema[value].type.split('[]').length > 1
      const type = schema[value].type.split('[]')[0]
      if (type === 'string') {
        state = isArray ? { ...state, [value]: [] } : { ...state, [value]: '' }
      }
      if (type === 'boolean') {
        state = isArray ? { ...state, [value]: [false] } : { ...state, [value]: false }
      }
      if (type === 'object') {
        state = isArray
          ? { ...state, [value]: [initFormSchema(schema[value].children)] }
          : { ...state, [value]: initFormSchema(schema[value].children) }
      }
      if (type === 'upload') {
        state = isArray ? { ...state, [value]: [''] } : { ...state, [value]: '' }
      }
      if (type === 'enum') {
        state = isArray ? { ...state, [value]: [''] } : { ...state, [value]: '' }
      }
    })
    return state
  }, [])

  useEffect(() => {
    if (defaultState && Object.keys(defaultState).length > 0) {
      setFormState({ ...defaultState })
      update()
      return
    }

    setFormState(initFormSchema(schema))
    update()
  }, [initFormSchema, schema, defaultState, update])

  const getFormStateByLabel = useCallback(
    (label: string) => {
      const helper = (value: string[], pos: number, obj: any) => {
        if (pos == value.length) return obj

        obj = helper(value, pos + 1, obj[value[pos]])
        return obj
      }

      return helper(label.split('.'), 0, formState) as {
        [key: string]: any
      }
    },
    [formState]
  )

  const updateFormStateByLabel = useCallback(
    (label: string, value: any) => {
      console.log('Updating form state', label, value)
      const helper = (lable_arr: string[], pos: number, obj: any) => {
        if (pos == lable_arr.length - 1) {
          obj[lable_arr[pos]] = value
          return obj
        }
        obj[lable_arr[pos]] = helper(lable_arr, pos + 1, obj[lable_arr[pos]])
        return obj
      }

      const updated = helper(label.split('.'), 0, formState)

      setFormState(updated)
    },
    [formState]
  )

  const addFormBySchema = useCallback(
    (
      label: string,
      schema: {
        [key: string]: any
      }
    ) => {
      const helper = (value: string[], pos: number, obj: any) => {
        if (pos == value.length) {
          console.log('addFormSchema', obj, value, pos, schema)
          obj.push(initFormSchema(schema))
          return obj
        }
        obj[value[pos]] = helper(value, pos + 1, obj[value[pos]])
        return obj
      }

      const updated = helper(label.split('.'), 0, formState)

      console.log('addFormSchemaUpdated', updated)
      setFormState(updated)
    },
    [formState, initFormSchema]
  )

  const getSchemaByLabel = useCallback(
    (label: string) => {
      const helper = (value: string[], pos: number, obj: any) => {
        if (pos == value.length) return obj

        obj = helper(value, pos + 1, obj[value[pos]])

        return obj
      }

      return helper(label.split('.'), 0, schema) as {
        [key: string]: any
      }
    },
    [schema]
  )

  const getValueByLabel = useCallback(
    (label: string) => {
      const helper = (value: string[], pos: number, obj: any) => {
        if (pos == value.length) return obj

        obj = helper(value, pos + 1, obj[value[pos]])

        return obj
      }

      const value = helper(label.split('.'), 0, formState) as {
        [key: string]: any
      }

      // console.log('getValueByLabel', value)

      return value
    },
    [formState]
  )

  return {
    formState,
    setFormState,
    getFormStateByLabel,
    getSchemaByLabel,
    addFormBySchema,
    updateFormStateByLabel,
    getValueByLabel
  }
}

export default useFormHandler
