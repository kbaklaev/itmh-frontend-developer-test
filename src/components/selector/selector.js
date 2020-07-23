import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'

const Selector = ({ groups, getSelectedGroup }) => {
  const [selectedGroup, setSelectedGroup] = useState(null) 

  useEffect(() => {
    getSelectedGroup(selectedGroup)
  }, [getSelectedGroup, selectedGroup])

  return (
    <Form>
      <Form.Group controlId="exampleForm.SelectCustom">
        <Form.Control as="select" custom onChange={(e) => setSelectedGroup(e.target.value)}>
          {
            groups.map(group => (
              <option key={group.id}>{group.name}</option>
            ))
          }
        </Form.Control>
      </Form.Group>
    </Form>
  )
}

export default Selector