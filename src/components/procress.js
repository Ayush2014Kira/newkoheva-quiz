import React from "react";
import { Progress, Space } from "antd";

export default function CProcress(props) {
  const { percent } = props;
  return (
    <div>
      <Progress percent={percent} />
    </div>
  );
}
