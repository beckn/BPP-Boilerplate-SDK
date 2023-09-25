import { Button } from 'antd'
import React from 'react'
import FormHandler from './FormHandler'
import useFormHandler from './hooks/useFormHandler'
import { SaveOutlined } from '@ant-design/icons'

export const FormBuilderContext = React.createContext<{
  formState: any
  setFormState: (state: any) => void
  getFormStateByLabel: (label: string) => any
  addFormBySchema: (
    label: string,
    schema: {
      [key: string]: any
    }
  ) => void
  getSchemaByLabel: (label: string) => any
  updateFormStateByLabel: (label: string, value: any) => void
  getValueByLabel: (label: string) => any
}>({
  formState: {},
  setFormState: (state: any) => {
    console.log(state)
  },
  getFormStateByLabel: (label: string) => {
    console.log(label)
  },
  addFormBySchema: (schema: any) => {
    console.log(schema)
  },
  getSchemaByLabel: (label: string) => {
    console.log(label)

    return {}
  },
  updateFormStateByLabel: (label: string, value: any) => {
    console.log(label, value)
  },
  getValueByLabel: (label: string) => {
    console.log(label)
  }
})

function FormBuilder({
  schema,
  className,
  onSubmit,
  defaultState,
  selectedID = 'default'
}: {
  schema: {
    [key: string]: any
  }
  className?: string
  onSubmit: (state: any) => Promise<void>
  defaultState?: any
  selectedID?: string
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const {
    formState,
    setFormState,
    getFormStateByLabel,
    addFormBySchema,
    getSchemaByLabel,
    updateFormStateByLabel,
    getValueByLabel
  } = useFormHandler({ schema, defaultState, selectedID })

  if (formState == null) return <React.Fragment>Loading...</React.Fragment>

  console.log('FormBuilder', { selectedID, defaultState })

  return (
    <React.Fragment>
      <div className={className}>
        <FormBuilderContext.Provider
          value={{
            formState,
            setFormState,
            getFormStateByLabel,
            addFormBySchema,
            getSchemaByLabel,
            updateFormStateByLabel,
            getValueByLabel
          }}
        >
          <div>{selectedID}</div>
          {Object.keys(schema).map((value, key) => {
            return <FormHandler key={key} schema={schema[value]} label={value} />
          })}
          <div className="w-full flex justify-center gap-2">
            <Button
              icon={<SaveOutlined />}
              className="mt-4"
              type="primary"
              onClick={async () => {
                console.log(formState)
                setIsLoading(true)
                await onSubmit(formState)
                setIsLoading(false)
              }}
              disabled={isLoading}
              loading={isLoading}
            >
              {selectedID != 'default' ? 'Update' : 'Create'}
            </Button>
            <Button
              className="mt-4"
              onClick={() => {
                console.log('LOG FORM STATE', formState)
              }}
            >
              Log
            </Button>
          </div>
        </FormBuilderContext.Provider>
      </div>
    </React.Fragment>
  )
}

export default FormBuilder
