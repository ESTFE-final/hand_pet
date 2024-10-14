import React from "react";
import styled from "styled-components";
import SaveButton from "../components/AddProductComponents/SaveButton";
import InputTotal from "../components/AddProductComponents/InputTotal";

import { NavigationBar } from "../components/SharedComponents/CommonComponents";

const StyledDiv = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  align-content: center;
  justify-items: center;
  margin-bottom: 0px;
`;

const AddProductPage = () => (
  <StyledDiv>
    <NavigationBar title={"상품 등록"} />
    <SaveButton />
    <InputTotal />
  </StyledDiv>
);

export default AddProductPage;
