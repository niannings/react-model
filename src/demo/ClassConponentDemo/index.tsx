import React, { Component } from "react";
import { useBothWayBinding } from "../../react-model/packages/both-way-binding";
import { withClassModel } from "../../react-model/packages/both-way-binding/withModel";
import { IModelUser } from "../../react-model/packages/both-way-binding/useModel";

interface IClassComponentDemoProps {
  MODEL: IModelUser;
}

class ClassComponentDemo extends Component<IClassComponentDemoProps> {
  model = this.props.MODEL[0];
  setModel = this.props.MODEL[1];

  Form = () =>
    useBothWayBinding(
      <>
        <label>姓名：</label>
        <input _modelname="name" _byevent="true" />
        <label>年龄：</label>
        <input _modelname="age" _byevent="true" />
      </>
    );

  render() {
    return (
      <div>
        {<this.Form />}
        <pre className="code-wrap">
          <code className="code">{JSON.stringify(this.model, null, 2)}</code>
        </pre>
      </div>
    );
  }
}

export default withClassModel(ClassComponentDemo);
