import React from "react";
import styled from "styled-components";

// 1.
// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//
//   height: 500px;
//   background-color: seagreen;
// `;

// const Item = styled.div`
//   background-color: red;
//   padding: 10px;
// `;

// 2.
// const Container = styled.div`
//   position: relative;
//   width: 100%;
//   height: 500px;
//
//   background-color: seagreen;
// `;
//
// export const Item = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//
//   background-color: red;
//   padding: 10px;
// `;

// 3.
// const Container = styled.div`
//   display: grid;
//   place-items: center;
//
//   height: 500px;
//   background-color: seagreen;
// `;
// const Item = styled.div`
//   background-color: red;
//   padding: 10px;
// `;

// 4.
// const Container = styled.div`
//   display: table;
//
//   height: 100vh;
//   width: 100%;
//   background-color: seagreen;
// `;
// const Item = styled.div`
//   display: table-cell;
//   vertical-align: middle;
//   text-align: center;
//
//   background-color: red;
// `;

export const CenterDiv = () => {
  return (
    <Container>
      <Item>CenterDiv</Item>
    </Container>
  );
};
