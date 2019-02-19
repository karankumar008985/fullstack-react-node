import React from "react";

//Libs

//Local
import OptionButtonGroup from "./../Common/OptionButtonGroup";
import Selection from "./../Common/Selection";
import {
  useFormInput,
  useFormCheckbox,
  useFormInputSelection
} from "./../Common/FormHooks";

//style component
import { Row, Column } from "./../style/grid";

const sizeItems = [
  {
    value: 1,
    description: "Small"
  },
  {
    value: 2,
    description: "Medium"
  },
  {
    value: 3,
    description: "Large"
  }
];

export default function ProductForm(props) {
  const nameField = useFormInput(props.name);
  const categoryField = useFormInputSelection({
    value: props.category_id,
    label: props.category.name
  });
  const expiryField = useFormInput(props.expiry_date);
  const isExpiryField = useFormCheckbox(props.is_expiry);
  const priceField = useFormInput(props.price);
  const sizeField = useFormInput(props.size);
  const descriptionField = useFormInput(props.description);

  function handleSubmit(e) {
    e.preventDefault();
    const values = {
      name: nameField.value,
      category: categoryField.value.value,
      expiryDate: expiryField.value,
      isExpiry: isExpiryField.checked,
      price: priceField.value,
      size: sizeField.value,
      description: descriptionField.value
    };
    props.SubmitClick(values);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Column span="3">
          <label htmlFor="name">Name</label>
        </Column>
        <Column span="9">
          <input type="text" id="name" name="name" {...nameField} required />
        </Column>
      </Row>

      <Row>
        <Column span="3">
          <label htmlFor="category">Category</label>
        </Column>
        <Column span="9">
          <Selection
            ApiUrl="category/search"
            id="category"
            name="category"
            {...categoryField}
          />
        </Column>
      </Row>

      <Row>
        <Column span="3">
          <label htmlFor="expiryDate">Expiry Date</label>
        </Column>
        <Column span="9">
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            {...expiryField}
          />
        </Column>
      </Row>

      <Row>
        <Column span="3">
          <label htmlFor="isExpiry">Is Expiry</label>
        </Column>
        <Column span="9">
          <input
            type="checkbox"
            id="isExpiry"
            name="isExpiry"
            {...isExpiryField}
          />
        </Column>
      </Row>

      <Row>
        <Column span="3">
          <label htmlFor="price">Price:</label>
        </Column>
        <Column span="9">
          <input
            type="number"
            id="price"
            name="price"
            step="0.25"
            min="0.25"
            max="99999"
            {...priceField}
          />
        </Column>
      </Row>

      <Row>
        <Column span="3">
          <label htmlFor="size">Size:</label>
        </Column>
        <Column span="9">
          <OptionButtonGroup name="size" items={sizeItems} {...sizeField} />
        </Column>
      </Row>

      <Row>
        <Column span="3">
          <label htmlFor="description">Description:</label>
        </Column>
        <Column span="9">
          <textarea id="description" name="description" {...descriptionField} />
        </Column>
      </Row>

      <Row>
        <Column span="3">-</Column>
        <Column span="9">
          <button type="submit">{props.mode}</button>
        </Column>
      </Row>
    </form>
  );
}