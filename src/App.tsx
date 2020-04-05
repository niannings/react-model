import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { withModel, useBothWayBinding, useModel } from "@wlxm/react-model";
import AntdDemo from "./demo/AntdDemo";
import ValidateDemo from "./demo/ValidateDemo";
import ClassComponentDemo from "./demo/ClassConponentDemo";

function App() {
  const [model] = useModel<any>({ name: "小明" });

  const form = useBothWayBinding(
    <>
      <h2>使用原生表单</h2>
      <label>姓名：</label>
      <input _modelname="name" _byevent="true" />
      <label>年龄：</label>
      <input _modelname="age" _byevent="true" />
      <label>嵌套：</label>
      <input _modelname="a.b.c[0]" _byevent="true" />
      <label>城市：</label>
      <select _modelname="city" _byevent="true">
        <option>选择城市</option>
        <option value="beijing">北京</option>
        <option value="chengdu">成都</option>
      </select>
    </>
  );

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="container">
        <h1>React Model</h1>
        <h3>HOC</h3>
        <ul>
          <li>
            withModel：useModel hook必须在该高阶组件内部使用，如：withModel(App)
          </li>
        </ul>
        <h3>Hooks</h3>
        <ul>
          <li>
            useBothWayBinding：接受一个jsx element；如：useBothWayBinding(
            {`<><input _modelname="name" /></>`})
          </li>
          <li>
            useModel：接受一个Object对象，用以初始化model
            <span className="red">useModel只能在withModel高阶组件下使用～</span>
          </li>
        </ul>
        <h3>Options</h3>
        <ul>
          <li>
            _modelname: （字符串）要绑定的键名，如(name, name.firstName,
            name.firstName[0])【必须】
          </li>
          <li>_prop: （字符串，默认为value）绑定的值</li>
          <li>_event: （字符串，默认为onChange）更新值的事件</li>
          <li>
            _byevent: （字符串true表示使用，默认false）取值时是否使用event对象
          </li>
          <li>_deps: （数组）依赖的值，这些值变化时会更新该组件</li>
        </ul>
        <details>
          <summary>示例代码如下：</summary>

          <pre className="code-wrap">
            <code className="code">
              {`
import { withModel, useBothWayBinding, useModel } from "./hooks/bothWayBinding";

// ...
  const [model, setModel] = useModel({ name: "小明" });
// ...
{useBothWayBinding(
  <>
  <label>姓名：</label>
<input `}
              <span className="red">_modelname="name" _byevent="true"}</span>
              {` />
  <FormItem label="Input">
    <Input `}
              <span className="red">_modelname="email" _byevent="true"</span>
              {` placeholder="Your email" />
  </FormItem>
  <pre>{JSON.stringify(model, null, 2)}</pre>
  </>
)}
// ...
`}
            </code>
          </pre>
        </details>
        <div className="container">
          <div className="form">{form}</div>
          <div className="result">
            <pre>{JSON.stringify(model, null, 2)}</pre>
          </div>
        </div>
        <h2>Antd表单</h2>
        <AntdDemo />
        <div style={{ height: 200 }}>
          <h2>使用校验</h2>
          <ValidateDemo />
        </div>
        <h2>使用类组件</h2>
        <ClassComponentDemo />
      </div>
    </div>
  );
}

export default withModel(App);
