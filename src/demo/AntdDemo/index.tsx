import React from "react";
import {
  Row,
  Col,
  Form,
  AutoComplete,
  Input,
  InputNumber,
  Checkbox,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  DatePicker,
  TimePicker,
  Cascader,
  Mentions,
  TreeSelect,
  Upload,
  Transfer,
  Pagination,
  Button,
} from "antd";
import {
  formItemLayout,
  hobbiesOptions,
  selectOption,
  sliderMarks,
  cascaderOptions,
  mentionOptions,
  uplodConfig,
  transferData,
  defaultValues,
  validators,
} from "./config";
import {
  useBothWayBinding,
  useModel,
  withModel,
} from "../../react-model/packages/both-way-binding";
import useModelValidator from "../../react-model/packages/model-validator";

const { Item: FormItem } = Form;
const { Option: MentionsOption } = Mentions;
const { TreeNode } = TreeSelect;
const options = [
  { value: "Burns Bay Road" },
  { value: "Downing Street" },
  { value: "Wall Street" },
];

function AntdDemo() {
  const [model, setModel] = useModel(defaultValues);
  const error = useModelValidator([model, setModel], validators);

  const form = useBothWayBinding(
    <Form {...formItemLayout} style={{ padding: 20 }}>
      <FormItem label="AutoComplete">
        <AutoComplete
          _modelname="AutoComplete"
          style={{ width: 200 }}
          options={options}
          placeholder="try to type `b`"
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </FormItem>
      <FormItem label="Input">
        <div data-error={error.email} className="error show-error">
          <Input _byevent="true" _modelname="email" placeholder="Your email" />
        </div>
        {/* <div data-error={error.email} className="error" /> */}
      </FormItem>
      <FormItem label="InputNumber">
        <InputNumber style={{ width: 200 }} _modelname="InputNumber" />
      </FormItem>
      <FormItem label="Checkbox">
        <Checkbox _byevent="true" _prop="checked" _modelname="checkbox.single">
          I agree
        </Checkbox>
      </FormItem>
      <FormItem label="Checkbox.Group">
        <Checkbox.Group
          _modelname="checkbox.multiple"
          options={hobbiesOptions}
        />
      </FormItem>
      <FormItem label="Rate">
        <Rate _modelname="rate" allowHalf />
      </FormItem>
      <FormItem label="Radio">
        <Radio.Group
          _byevent="true"
          _modelname="radio.single"
          options={hobbiesOptions}
        />
      </FormItem>
      <FormItem label="Radio.Button">
        <Radio.Group _byevent="true" _modelname="radio.button">
          {hobbiesOptions.map((item) => (
            <Radio.Button value={item.value} key={item.value}>
              {item.label}
            </Radio.Button>
          ))}
        </Radio.Group>
      </FormItem>
      <FormItem label="Select.single">
        <Select
          _modelname="select.single"
          showSearch
          style={{ width: "100%" }}
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
          placeholder="Please select"
        >
          {selectOption}
        </Select>
      </FormItem>
      <FormItem label="Select.multiple">
        <Select
          _modelname="select.multiple"
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Please select"
        >
          {selectOption}
        </Select>
      </FormItem>
      <FormItem label="Slider.single">
        <Slider _modelname="Slider.single" marks={sliderMarks} />
      </FormItem>
      <FormItem label="Slider.range">
        <Slider _modelname="Slider.range" range marks={sliderMarks} />
      </FormItem>
      <FormItem label="Switch">
        <Switch
          _modelname="Switch"
          _prop="checked"
          checkedChildren="yes"
          unCheckedChildren="no"
        />
      </FormItem>
      <FormItem label="DatePicker">
        <DatePicker _modelname="datepicker.single" />
      </FormItem>
      <FormItem label="MonthPicker">
        <DatePicker.MonthPicker _modelname="datepicker.month" />
      </FormItem>
      <FormItem label="RangePicker">
        <DatePicker.RangePicker _modelname="datepicker.range" />
      </FormItem>
      <FormItem label="TimePicker">
        <TimePicker _modelname="TimePicker" />
      </FormItem>
      <FormItem label="Cascader">
        <Cascader
          _modelname="Cascader"
          options={cascaderOptions}
          placeholder="Please select"
        />
      </FormItem>
      <FormItem label="Mention">
        <Mentions
          _modelname="Mention"
          placeholder="input @ to mention sth"
          style={{ width: "100%" }}
          placement="top"
        >
          {mentionOptions.map((item) => (
            <MentionsOption key={item} value={item}>
              {item}
            </MentionsOption>
          ))}
        </Mentions>
      </FormItem>
      <FormItem label="TreeSelect">
        <TreeSelect
          _modelname="TreeSelect"
          showSearch
          style={{ width: "100%" }}
          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
          placeholder="Please select"
          allowClear
          treeDefaultExpandAll
        >
          <TreeNode value="parent 1" title="parent 1">
            <TreeNode value="parent 1-0" title="parent 1-0">
              <TreeNode value="leaf1" title="my leaf" />
              <TreeNode value="leaf2" title="your leaf" />
            </TreeNode>
            <TreeNode value="parent 1-1" title="parent 1-1">
              <TreeNode
                value="sss"
                title={<b style={{ color: "#08c" }}>sss</b>}
              />
            </TreeNode>
          </TreeNode>
        </TreeSelect>
      </FormItem>
      <FormItem label="Upload">
        <Upload _modelname="Upload" _prop="fileList" {...uplodConfig}>
          <Button> Click to Upload</Button>
        </Upload>
      </FormItem>
      <FormItem label="Transfer">
        <Transfer
          _modelname="Transfer"
          dataSource={transferData}
          titles={["Source", "Target"]}
          render={(item) => item.title}
        />
      </FormItem>
      <FormItem label="Pagination">
        <Pagination _modelname="Pagination" pageSize={10} total={100} />
      </FormItem>
      <Row>
        <Col sm={{ offset: 8 }}>
          <Button type="primary" block htmlType="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );

  return (
    <Row>
      <Col lg={12}>{form}</Col>
      <Col lg={6} style={{ padding: 20 }}>
        <pre className="code-wrap">
          <code className="code">{JSON.stringify(model, null, 2)}</code>
        </pre>
      </Col>
      <Col lg={6} style={{ padding: 20 }}>
        <pre className="code-wrap">
          <code className="code">{JSON.stringify(error, null, 2)}</code>
        </pre>
      </Col>
    </Row>
  );
}

export default withModel(AntdDemo);
