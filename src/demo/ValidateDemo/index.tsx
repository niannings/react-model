import React from "react";
import { Row, Col } from "antd";
import {
  useBothWayBinding,
  useModel,
  withModel,
} from "../../react-model/packages/both-way-binding/both-way-binding";
import useModelValidator from "../../react-model/packages/model-validator/useModelValidator";
import { validators } from "./config";
import { classlist } from "../../react-model/utils/dom";

function ValidateDemo() {
  const [model, setModel] = useModel();
  const error = useModelValidator([model, setModel], validators);

  const form = useBothWayBinding(
    <>
      <label>姓名：</label>
      <div
        data-error={error.name}
        className={classlist({
          error: true,
          "show-error": error.name,
        })}
      >
        <input _modelname="name" _byevent="true" />
      </div>

      <label>年龄：</label>
      <div
        data-error={error.age}
        className={classlist({
          error: true,
          "show-error": error.age,
        })}
      >
        <input _modelname="age" _byevent="true" />
      </div>

      <label>邮箱：</label>
      <div
        data-error={error.email}
        className={classlist({
          error: true,
          "show-error": error.email,
        })}
      >
        <input _modelname="email" _byevent="true" />
      </div>
    </>
  );

  return (
    <div>
      <Row>
        <Col span={12}>{form}</Col>
        <Col span={6}>
          <pre className="code-wrap">
            <code className="code">{JSON.stringify(model, null, 2)}</code>
          </pre>
        </Col>
        <Col span={6}>
          <pre className="code-wrap">
            <code className="code">{JSON.stringify(error, null, 2)}</code>
          </pre>
        </Col>
      </Row>
    </div>
  );
}

export default withModel(ValidateDemo);
