import type {
  BuilderProps,
  Config,
  ImmutableTree,
  JsonGroup,
} from "@react-awesome-query-builder/ui";
import {
  BasicConfig,
  Builder,
  Utils as QbUtils,
  Query,
} from "@react-awesome-query-builder/ui";
import "@react-awesome-query-builder/ui/css/styles.css";
import "./style.css";
import { useCallback, useState } from "react";
import { JsonViewer } from "~/components";
const InitialConfig = BasicConfig;

console.log({ InitialConfig });

const queryValue: JsonGroup = { id: QbUtils.uuid(), type: "group" };

const config: Config = {
  ...InitialConfig,
  settings: {
    ...InitialConfig.settings,
    showNot: true,
    liteMode: false,
  },
  fields: {
    qty: {
      label: "Qty",
      type: "number",
      fieldSettings: {
        min: 0,
      },
      valueSources: ["value"],
      preferWidgets: ["number"],
    },
    price: {
      label: "Price",
      type: "number",
      valueSources: ["value"],
      fieldSettings: {
        min: 10,
        max: 100,
      },
      preferWidgets: ["slider", "rangeslider"],
    },
    name: {
      label: "Name",
      type: "text",
    },
    color: {
      label: "Color",
      type: "select",
      valueSources: ["value"],
      fieldSettings: {
        listValues: [
          { value: "yellow", title: "Yellow" },
          { value: "green", title: "Green" },
          { value: "orange", title: "Orange" },
        ],
      },
    },
    is_promotion: {
      label: "Promo?",
      type: "boolean",
      operators: ["equal"],
      valueSources: ["value"],
    },
  },
};

export function QueryBuilder() {
  const onChange = useCallback(
    (immutableTree: ImmutableTree, config: Config) => {
      // Tip: for better performance you can apply `throttle` - see `packages/examples/src/demo`
      setState((prevState) => ({
        ...prevState,
        tree: immutableTree,
        config: config,
      }));

      const jsonTree = QbUtils.getTree(immutableTree);
      console.log(jsonTree);
      // `jsonTree` can be saved to backend, and later loaded to `queryValue`
    },
    []
  );

  const renderBuilder = useCallback(
    (props: BuilderProps) => (
      <div className="query-builder-container" style={{ padding: "10px" }}>
        <div className="query-builder qb-lite">
          <Builder {...props} />
        </div>
      </div>
    ),
    []
  );

  const [state, setState] = useState({
    tree: QbUtils.loadTree(queryValue),
    config: config,
  });

  return (
    <div>
      <Query
        {...config}
        value={state.tree}
        onChange={onChange}
        renderBuilder={renderBuilder}
      />
      <div className="query-builder-result">
        <div>
          <JsonViewer
            value={QbUtils.jsonLogicFormat(state.tree, state.config)}
          />
        </div>
      </div>
    </div>
  );
}
