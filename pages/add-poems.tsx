import React from 'react'

import Dante, { AddButtonConfig } from 'dante3/package/esm'

function AddPoems() {
  return (
    <div>
      <Dante
        readOnly={false}
        tooltips={[
          AddButtonConfig({
            fixed: true
          })
        ]}
        onUpdate={(editor) => {
          console.log(editor.getJSON())
        }}
        content={'hello this is a non editable content'}
      />
    </div>
  )
}

export default AddPoems
