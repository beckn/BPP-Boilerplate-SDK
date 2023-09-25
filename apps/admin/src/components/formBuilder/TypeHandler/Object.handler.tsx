import { Button, Collapse } from 'antd'
import React, { useMemo } from 'react'
import { FormBuilderContext } from '..'
import FormHandler from '../FormHandler'
import useForceUpdate from '../../../hooks/useForceUpdate'
import { PlusOutlined } from '@ant-design/icons'

function ObjectHandler({
  schema,
  label,
  isArray
}: {
  schema: {
    [key: string]: any
  }
  label: string
  isArray?: boolean
}) {
  const { getFormStateByLabel, addFormBySchema } = React.useContext(FormBuilderContext)
  const update = useForceUpdate()

  const formData = useMemo(() => {
    if (!isArray) return []

    return getFormStateByLabel(label) as any
  }, [getFormStateByLabel, isArray, label])

  return (
    <React.Fragment>
      <Collapse
        accordion={true}
        items={[
          {
            label: label,
            children: (
              <React.Fragment>
                <div className="flex gap-2 flex-col">
                  {isArray && (
                    <Button
                      onClick={() => {
                        console.log(formData)
                        addFormBySchema(label, schema.children)
                        update()
                      }}
                      type="text"
                      className="flex flex-col items-center justify-center"
                      icon={<PlusOutlined className="self-center" />}
                    />
                  )}

                  {isArray ? (
                    <React.Fragment>
                      <Collapse
                        accordion={true}
                        items={formData.map((_: any, objectKey: number) => {
                          return {
                            label: `${label}.${objectKey}`,
                            children: (
                              <React.Fragment>
                                {Object.keys(schema.children).map((value, key) => {
                                  return (
                                    <FormHandler
                                      key={key}
                                      schema={schema.children[value]}
                                      label={`${label}.${objectKey}.${value}`}
                                    />
                                  )
                                })}
                              </React.Fragment>
                            )
                          }
                        })}
                      />
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      {Object.keys(schema.children).map((value, key) => {
                        return <FormHandler key={key} schema={schema.children[value]} label={`${label}.${value}`} />
                      })}
                    </React.Fragment>
                  )}
                </div>
              </React.Fragment>
            )
          }
        ]}
      />
    </React.Fragment>
  )
}

export default ObjectHandler
