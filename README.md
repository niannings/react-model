# react-model

## Preview

[codeSandbox](https://codesandbox.io/embed/lucid-ritchie-j85hn?fontsize=14&hidenavigation=1&theme=dark)

## Install

```shell
npm i @wlxm/react-model -S
```

## Usage

### Basic

```jsx
import React from "react";
import { useModel, TwoWayBingding, withModel } from "@wlxm/react-model";

function App() {
  const [model, setModel] = useModel({ name: "小明" }); // default values

  return (
    <div>
      <TwoWayBingding>
        <label>姓名：</label>
        <input _modelname="name" _byevent="true" />
      </TwoWayBingding>
    </div>
  );
}

export default withModel(App);
```

## use fine grit

**TwoWayBinding.Item component only accepts one child.**

```jsx
import React from "react";
import { useModel, TwoWayBingding, withModel } from "@wlxm/react-model";

const { Item: TwoWayBingdingItem } = TwoWayBingding;

function App() {
  const [model, setModel] = useModel({ name: "小明" });

  return (
    <div>
      <label>姓名：</label>
      <TowWayBindingItem rModel="name">
        <input _byevent="true" />
      </TowWayBindingItem>
      <label>年龄：</label>
      <TowWayBindingItem rModel="age">
        <input _byevent="true" />
      </TowWayBindingItem>
    </div>
  );
}

export default withModel(App);
```

### use class component

```jsx
import React from 'react';
import { useModel, TwoWayBingding, withModel, withClassModel } from '@wlxm/react-model';

const { Item: TowWayBindingItem } = TowWayBinding;

class ClassComponentDemo extends Component {
    useEffect(() => {
        this.props.setModel({
            'msg': 'welcome'
        })
    }, []);

  render() {
    return (
      <div>
        <TowWayBinding>
          <label>姓名：</label>
          <input _modelname="name" _byevent="true" />
          <label>年龄：</label>
          <input _modelname="age" _byevent="true" />
        </TowWayBinding>
        <pre className="code-wrap">
          <code className="code">{JSON.stringify(this.props.model, null, 2)}</code>
        </pre>
      </div>
    );
  }
}

export default withClassModel(ClassComponentDemo);
```

### use validator

```jsx
import React from "react";
import {
  useModel,
  TwoWayBingding,
  withModel,
  useModelValidator,
} from "@wlxm/react-model";

function App() {
  const [model, setModel] = useModel({ name: "小明" });
  const error = useModelValidator({
    name: [(value) => !value && "name is required!"],
    age: [
      (value, setValue, model, setModel) =>
        !/^[0-9]{1,3}$/.test(value) && setValue(parseInt(value) || 0),
    ],
  });

  return (
    <div>
      <TwoWayBingding>
        <label>name：</label>
        <div
          data-error={error.name}
          className={"error" + error.name ? "show-error" : ""}
        >
          <input _modelname="name" _byevent />
        </div>
        <label>age：</label>
        <input _modelname="age" _byevent />
      </TwoWayBingding>
      <pre>
        <code>{JSON.stringify(model, null, 2)}</code>
      </pre>
      <pre>
        <code>{JSON.stringify(error, null, 2)}</code>
      </pre>
    </div>
  );
}

export default withModel(App);
```
