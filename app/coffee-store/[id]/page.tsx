import React from "react";

export default function Page(props: { params: { id: string } }) {
  const {
    params: { id },
  } = props;
  console.log("id: ", id);

  return <div>Coffee Store Page: {id}</div>;
}
