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
import React from 'react';
import { useModel, useBothWayBinding, withModel } from '@wlxm/react-model';

function App() {
    const [model, setModel] = useModel({ name: '小明' });

    const form = useBothWayBinding(
        <>
            <label>姓名：</label>
            <input _modelname="name" _byevent />
        </>
    );

    return (
        <div>{form}</div>
    )
}

export default withModel(App);
```

### use validator

```jsx
import React from 'react';
import { useModel, useBothWayBinding, withModel, useModelValidator } from '@wlxm/react-model';

function App() {
    const [model, setModel] = useModel({ name: '小明' });
    const error = useModelValidator({
        name: [
            value => !value && 'name is required!'
        ],
        age: [
            (value, setValue, model, setModel) =>
                !/^[0-9]{1,3}$/.test(value) && setValue(parseInt(value) || 0)
        ]
    })

    const form = useBothWayBinding(
        <>
            <label>name：</label>
            <div
                data-error={error.name}
                className={"error" + error.name ? 'show-error' : ''}>
                <input _modelname="name" _byevent />
            </div>
            <label>age：</label>
            <input _modelname="age" _byevent />
        </>
    );

    return (
        <div>
            {form}
            <pre><code>{JSON.stringify(model, null, 2)}</code></pre>
            <pre><code>{JSON.stringify(error, null, 2)}</code></pre>
        </div>
    )
}

export default withModel(App);
```
