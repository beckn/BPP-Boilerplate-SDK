import React from 'react'
import StringFormHandler from './TypeHandler/String.handler'
import BooleanFormHandler from './TypeHandler/Boolean.handler'
import ObjectHandler from './TypeHandler/Object.handler'
import UploadHandler from './TypeHandler/Upload.handler'
import EnumHandler from './TypeHandler/Enum.handler'
import ReferenceHandler from './TypeHandler/Ref.handler'
import UUIDHandler from './TypeHandler/UUID.handler'

function FormHandler({
  schema,
  label,
  value
}: {
  schema: {
    [key: string]: any
  }
  label: string
  value?: any
}) {
  const isArray = schema.type.split('[]').length > 1
  const type = schema.type.split('[]')[0]

  if (type == 'string') {
    return <StringFormHandler schema={schema} label={label} isArray={isArray} value={value} />
  }

  if (type == 'boolean') {
    return <BooleanFormHandler schema={schema} label={label} isArray={isArray} />
  }

  if (type == 'upload') {
    return <UploadHandler label={label} schema={schema} isArray={isArray} />
  }

  if (type == 'enum') {
    return <EnumHandler label={label} schema={schema} isArray={isArray} />
  }

  if (type == 'ref') {
    return <ReferenceHandler label={label} schema={schema} isArray={isArray} />
  }

  if (type == 'object') {
    return <ObjectHandler schema={schema} label={label} isArray={isArray} />
  }

  if (type == 'uuid') {
    return <UUIDHandler schema={schema} label={label} isArray={isArray} />
  }

  return <React.Fragment>{schema.type}</React.Fragment>
}

export default FormHandler
